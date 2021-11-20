import router from "./router";
import store from "./store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from "@/utils/auth";
import Vue from "vue";

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

router.beforeEach((to, from, next) => {
  
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
                next({ path: "/bigScreen" });
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
      next({ path: "/login", replace: true });
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
