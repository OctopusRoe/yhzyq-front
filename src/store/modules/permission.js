import { constantRoutes, customerRoutes } from "@/config/router.config";
import { getRouters } from "@/api/menu";

import {
  actualRoutersHandler,
  filterAsyncRouter,
  addRedirectTo
} from "@/router/generator-routers";

import storage from "store";
import {
  ADD_ROUTERS,
  ADD_ACTUAL_ROUTERS,
} from "@/store/mutation-types";
//permission.threeRouter
const permission = {
  state: {
    routes: [],
    actualRoutes: [],
    addRoutes: [],
    addActualRoutes: [],
    threeRouter: [],
    secondRouter: []
  },
  mutations: {
    SET_ROUTES: (state, routers) => {
      state.addRoutes = routers;
      state.routes = constantRoutes.concat(routers);

      storage.set(ADD_ROUTERS, routers);
    },
    SET_ACTUAL_ROUTES: (state, routers) => {
      state.addActualRoutes = routers;
      state.actualRoutes = constantRoutes.concat(routers);

      storage.set(ADD_ACTUAL_ROUTERS, routers);
    }
  },
  actions: {
    // 生成路由
    GenerateRoutes({ commit }) {
      return new Promise(resolve => {
        // 向后端请求路由数据
        getRouters().then(res => {
          // eval(res);
          let navTreeData = res.data;

          // navTreeData = actualRoutersHandler(navTreeData);

          navTreeData.push(...customerRoutes);

          // const accessedRoutes = generator(navTreeData);
          let accessedRoutes = filterAsyncRouter(navTreeData);

          // console.log("22222222", accessedRoutes);

          accessedRoutes.forEach(item => addRedirectTo(item));
          // addRedirectTo(accessedRoutes);

          accessedRoutes.push({
            path: "*",
            redirect: "/404",
            hidden: true
          });

          commit("SET_ROUTES", accessedRoutes);

          accessedRoutes = actualRoutersHandler(accessedRoutes);

          commit("SET_ACTUAL_ROUTES", accessedRoutes);

          resolve(accessedRoutes);
        });
      });
    }
  }
};

export default permission;
