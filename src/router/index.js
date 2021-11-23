/*
 * @description: 文件内容描述
 * @author: 陈偲
 * @time:
 * @params:
 * @event:
 */
import Vue from "vue";
import Router from "vue-router";
import { constantRoutes } from "@/config/router.config";

Vue.use(Router);

export default new Router({
  mode: "history", // 去掉url中的#
  base: 'yhbi/',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
});
