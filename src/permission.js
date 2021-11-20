import router from "./router";
import store from "./store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import {getToken, removeToken, setToken} from "@/utils/auth";
import Cookies from 'js-cookie'
import {tpTokenValidate, login, tokenValidate} from '@/api/login'

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

router.beforeEach((to, from, next) => {
  if (to.path.includes('/logout/setToken')) {
    // 删除 token
    store.commit("SET_TOKEN", "");
    store.commit("SET_REAL_NAME", "");
    store.commit("SET_USERID", "");
    store.commit("SET_ROLES", []);
    store.commit("SET_PERMISSIONS", []);
    removeToken();
    return
  }

  if (to.path.includes('tpToken')) {
    const { tpToken } = to.query
    tpTokenValidate({tpToken, redirect_url: `${location.origin}/logout/setToken`}).then(res => {
      const { code, obj } = res
      if (code === 200) {
        setWebToken(obj)
      } else {
        window.location = `https://yh.jxgsgl.com:6443/portal/v1/ssologin?redirect_url=${to.path}`
      }
    })
  }

  NProgress.start();
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
            // alert("permission GetInfo")
            // 拉取user_info
            //debugger
            console.log(res, "GetInfo");
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
                next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
              } else {
                // next({ path: "/index" });
                next({ path: "/bigScreen" })
              }
            });
          })
          .catch(err => {
            store.dispatch("FedLogOut").then(() => {
              window.$message.error(err);
              next({ path: "/" });
            });
          });
      } else {
        next();
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        // if (hasPermission(store.getters.roles, to.meta.roles)) {
        //   next()
        // } else {
        //   next({ path: '/401', replace: true, query: { noGoBack: true }})
        // }
        // 可删 ↑
      }
    }
  } else {
    const oldLoginTokens  = Cookies.get('loginTokens')
    if (oldLoginTokens) {
      tokenValidate({ loginToken: oldLoginTokens }).then(res => {
        const { code, obj } = res
        if (code === 200) {
          // 生成 token ,存在前端本地
          setWebToken(obj)
        } else {
          window.location = `https://yh.jxgsgl.com:6443/portal/v1/ssologin?redirect_url=${to.path}`
        }
      })
    } else {
      window.location = `https://yh.jxgsgl.com:6443/portal/v1/ssologin?redirect_url=${to.path}`
    }


    // if (to.path === '/home') {
    //   next();
    //   return;
    // }
    //
    // if (to.path === '/home1') {
    //   next();
    //   return;
    // }
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      // next({ path: "/login", replace: true });
      // next(`/login`); // 否则全部重定向到登录页
      // next(`/login?redirect=${to.fullPath}`); // 否则全部重定向到登录页
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

router.onError(err => {
  console.log("err", err);

  if (err.code === "MODULE_NOT_FOUND") {
    window.$message.error("您要加载的页面不存在");
  } else {
    console.log("error", err);
  }
});

/**
 * 设置本地 token
 * @param userInfo
 */
function setWebToken (userInfo) {
  store.commit('SET_REAL_NAME', obj.REAL_NAME)
  store.commit('USER_NAME', obj.USER_NAME)
  store.commit('SET_USERID', obj.USER_ID)
  login({
    loginName: userInfo.USER_NAME,
    passWord: 'Zhzyq#2021',
    redirect_uri: location.origin,
    client_id: '08d69d53-6003-b0f7-c79a-523744000005'
  }).then(res => {
    // 生成 token ,存在前端本地
    setToken(res.data.token);
    store.commit("SET_TOKEN", res.data.token);
  })
}
