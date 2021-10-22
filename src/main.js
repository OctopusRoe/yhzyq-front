import Vue from "vue";
import Cookies from "js-cookie";
import "normalize.css/normalize.css"; // a modern alternative to CSS resets
import "./assets/styles/element-variables.scss";
import Element from "element-ui";

import "jquery";
import "jquery-migrate/dist/jquery-migrate.js";
import "jqueryui/jquery-ui.js";
import "draw2d/dist/draw2d";

import "@/assets/styles/index.scss"; // global css
import "@/assets/styles/ruoyi.scss"; // ruoyi css
import App from "./App";
import store from "./store";
import router from "./router";
import permission from "./directive/permission";
// import "./permission"; // permission control
Vue.use(permission);
import "./assets/icons"; // icon



import { getDictList } from "@/api/system/newDict";
import { getConfigKey } from "@/api/system/config";
import {
  parseTime,
  resetForm,
  addDateRange,
  selectDictLabel,
  selectDictLabelEx,
  selectDictLabels,
  download,
  handleTree
} from "@/utils/ruoyi";
import Pagination from "@/components/common/Pagination";

import "@/config/default.config";
import "@/config/db.config";

import "xe-utils";
import VXETable from "vxe-table";
import "vxe-table/lib/style.css";
import vbtTable from "vbt-table";
import ElTreeSelect from "el-tree-select";
Vue.use(ElTreeSelect);
Vue.use(vbtTable);

// 按需加载的方式默认是不带国际化的，需要自行导入
VXETable.use(VXETablePluginElement);
// VXETable.setup({
//   i18n: (key, value) => VXETable.t(zhCNLocat, key)
// })
Vue.use(VXETable);

// mount with global
//自定义表格工具扩展
import zhCNLocat from "vxe-table/lib/locale/lang/zh-CN";
import VXETablePluginElement from "vxe-table-plugin-element";
import VueHighlightJS from "vue-highlightjs";
import "highlight.js/styles/atom-one-dark.css";

import preventReClick from "./utils/directives";
Vue.use(preventReClick);

Vue.use(VueHighlightJS);
// 给 vue 实例挂载全局窗口对象，例如：
// Vue.prototype.$XModal = VXETable.modal

// 给 vue 实例挂载全局打印对象，例如：
// Vue.prototype.$XPrint = VXETable.print

// mount with global
import VueContextMenu from "vue-contextmenu";
Vue.use(VueContextMenu);

//自定义表格工具扩展
import RightToolbar from "@/components/common/RightToolbar";

// 全局方法挂载
Vue.prototype.getDicts = getDictList;
Vue.prototype.getConfigKey = getConfigKey;
Vue.prototype.parseTime = parseTime;
Vue.prototype.resetForm = resetForm;
Vue.prototype.addDateRange = addDateRange;
Vue.prototype.selectDictLabel = selectDictLabel;
Vue.prototype.selectDictLabelEx = selectDictLabelEx;
Vue.prototype.selectDictLabels = selectDictLabels;
Vue.prototype.download = download;
Vue.prototype.handleTree = handleTree;

Vue.prototype.msgSuccess = function (msg) {
  this.$message({ showClose: true, message: msg, type: "success" });
};

Vue.prototype.msgError = function (msg) {
  this.$message({ showClose: true, message: msg, type: "error" });
};

Vue.prototype.msgInfo = function (msg) {
  this.$message.info(msg);
};

// 全局组件挂载
Vue.component("Pagination", Pagination);
Vue.component("RightToolbar", RightToolbar);

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

Vue.use(Element, {
  size: Cookies.get("size") || "medium" // set element-ui default size
});

import shuttleBox from "@/components/system/ShuttleBox";
Vue.use(shuttleBox);

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
