import router from "./router";
import store from "./store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import {getToken, removeToken, setToken} from "@/utils/auth";
import Cookies from 'js-cookie'
import {tpTokenValidate, login, tokenValidate } from '@/api/login'
import qs from "qs";

NProgress.configure({ showSpinner: false });

const whiteList = [
  "/login",
  "/auth-redirect",
  "/bind",
  "/register",
  "/sheet",
  "/loginPage",
  "/bigScreen"
];

// let userInfo = {
//   "LOGIN_TOKEN": "",
//   "USER_NAME": "",
//   "USER_ID": "",
//   "REAL_NAME": ""
// }

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  // if (to.path.includes('tpToken')) {
  //   const { tpToken } = to.query
  //   const { code, obj } = await tpTokenValidate({tpToken, redirect_url: `${location.origin}/logout/setToken`})
  //   if (code === '200') {
  //    return  await setLocalToken(obj, next)
  //   } else {
  //     window.location = `https://yh.jxgsgl.com:6443/portal/v1/ssologin?redirect_url=${to.path}`
  //   }
  // }

  if (getToken()) {
    /* has token*/
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      if (store.getters.roles.length === 0) {
        // 判断当前用户是否已拉取完user_info信息
        store
          .dispatch("GetInfo")
          .then(res => {
            const roles = res.roles;
            store.dispatch("GenerateRoutes", { roles }).then(accessRoutes => {
              // 测试 默认静态页面
              // store.dispatch('permission/generateRoutes', { roles }).then(accessRoutes => {
              // 根据roles权限生成可访问的路由表
              router.addRoutes(accessRoutes); // 动态添加可访问路由表

              // 当只有一个选项时，默认选择第一个
              if (store.getters.userOrgList.length == 1) {
                store.commit("SET_CHECKED_ORG", store.getters.userOrgList[0]);
              }

              if (store.getters.userCheckedOrgIndex >= 0) {
                next({ ...to, replace: true }); // hack方法 确保addRoutes已完成 确保addRoutes已完成
              } else {
                next()
              }
            });
          })
          .catch(err => {
            store.dispatch("FedLogOut").then(() => {
              window.$message.error(err);
              next()
            });
          });
      } else {
        next()
      }
    }
  } else {
    next()
    // const oldLoginTokens = Cookies.get('loginTokens')
    // if (oldLoginTokens) {
    //   tokenValidate({ loginToken: oldLoginTokens }).then(res => {
    //     const { code, obj } = res
    //     if (code === '200') {
    //       setLocalToken(obj, next)
    //     } else {
    //       window.location = `https://yh.jxgsgl.com:6443/portal/v1/ssologin?redirect_url=${to.path}`
    //     }
    //   })
    // } else {
    //   window.location = `https://yh.jxgsgl.com:6443/portal/v1/ssologin?redirect_url=${to.path}`
    // }
  }
});

router.afterEach(() => {
  NProgress.done();
});

router.onError(err => {
  if (err.code === "MODULE_NOT_FOUND") {
    window.$message.error("您要加载的页面不存在");
  } else {
    console.log("error", err);
  }
});

/**
 * 设置本地路由
 * @param obj
 * @param next
 * @returns {Promise<void>}
 */
async function setLocalToken (obj, next) {
  let qs = require('qs')
  const info = {
    loginName: obj.USER_NAME,
    passWord: 'Zhzyq#2021',
    redirect_uri: process.env.VUE_APP_SSO_REDIRECT_URL,
    client_id: process.env.VUE_APP_SSO_CLIENT_ID
  }
  const { data } = await login(qs.stringify(info))
  store.dispatch('validateLogin', {
    token: data.token,
    userId: obj.USER_ID,
    name: obj.USER_NAME
  }).then(() => {
    next && next({ path: '/bigScreen' });
  })
}

