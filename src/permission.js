import router from "./router";
import store from "./store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken, setToken } from "@/utils/auth";
import Cookies from 'js-cookie'
import { logout } from '@/config/sso'
import { tpTokenValidate, login, tokenValidate } from '@/api/login'

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
const redirectUrl = `${process.env.VUE_APP_SSO_BASE_API}/portal/v1/ssologin?redirect_url=${location.origin + location.pathname}`
router.beforeEach(async (to, from, next) => {

  return next()
  NProgress.start();

  if (to.path.includes('/logout/setToken')) {
    logout()
  }

  const { tpToken } = to.query
  if (Object.keys(to.query).length && tpToken) {
    const { code, obj } = await tpTokenValidate({ tpToken: tpToken, redirect_url: `${location.origin}/logout/setToken` })
    if (code === '200') {
      await setLocalToken(obj, next, to)
    } else {
      window.location = redirectUrl
    }
  }
  if (getToken()) {
    /* has token*/
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      if (store.getters.roles.length === 0) {
        // 判断当前用户是否已拉取完user_info信息
        store.dispatch("GetInfo").then(res => {
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
              redirectHome(to, next, true)
            } else {
              redirectHome(to, next)
            }
          });
        }).catch(err => {
          store.dispatch("FedLogOut").then(() => {
            window.$message.error(err);
            window.location = redirectUrl
          });
        });
      } else {
        redirectHome(to, next)
      }
    }
  } else {
    const oldLoginTokens = Cookies.get('loginTokens')
    if (oldLoginTokens) {
      const { code, obj } = await tokenValidate({ loginToken: oldLoginTokens })
      if (code === '200') {
        await setLocalToken(obj, next, to)
      } else {
        window.location = redirectUrl
      }
    } else {
      window.location = redirectUrl
    }
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
 * 默认登录，设置本地token
 * @param obj
 * @param next
 * @param to
 * @returns {Promise<void>}
 */
async function setLocalToken (obj, next, to) {
  let qs = require('qs')
  const info = {
    loginName: obj.USER_NAME,
    passWord: 'Zhzyq#2021',
    redirect_uri: process.env.VUE_APP_SSO_REDIRECT_URL,
    client_id: process.env.VUE_APP_SSO_CLIENT_ID
  }
  const { data } = await login(qs.stringify(info))
  await store.dispatch('validateLogin', {
    token: data.token,
    userId: obj.USER_ID,
    name: obj.USER_NAME
  })
  if (next) {
    redirectHome(to, next)
  }
}

/**
 * 重定向 主页
 */
function redirectHome (to, next, replace = false) {
  if (next) {
    if (to.name === 'PageWapper' || to.path === '/index' || to.path === '/') {
      // 特殊写法
      router.push('/bigScreen')
      // next({replace, name: 'bigScreen'})
    } else {
      next()
    }
  }
}
