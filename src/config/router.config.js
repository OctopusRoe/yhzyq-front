/* Layout */
import { Layout, PageWapper } from "@/layout";
import Vue from "vue";
import Router from "vue-router";
import ProcessProp from "../components/flow/page/ProcessProperties";
import ProcessListenerCfg from "../components/flow/page/ProcessListenerCfg";
import UserTaskProp from "../components/flow/page/task/UserTaskProperties";
import ManualTaskProp from "../components/flow/page/task/ManualTaskProperties";
import ScriptTaskProp from "../components/flow/page/task/ScriptTaskProperties";
import MailTaskProp from "../components/flow/page/task/MailTaskProperties";
import ServiceTaskProp from "../components/flow/page/task/ServiceTaskProperties";
import RecieveTaskProp from "../components/flow/page/task/RecieveTaskProperties";
import BusinessRuleTaskProp from "../components/flow/page/task/BusinessRuleTaskProperties";
import CallActivityTaskProp from "../components/flow/page/task/CallActivityTaskProperties";
import ConnectionProp from "../components/flow/page/connection/ConnectionProperties";
import SubProcessProp from "../components/flow/page/container/SubProcessProperties";
import ExportXML from "../components/flow/page/ExportXML";
import ImportXML from "../components/flow/page/ImportXML";
import flowDesign from "../views/flow/flowDesign";
import flowManage from "../views/flow/flowManage";
import flowType from "../views/flow/flowType";
import demoFlow from "../components/flow/page/examine/startFlow";
import daiBanTsk from "../views/flow/daiBanTask";
import BigScreen from '../views/bigscreen'

Vue.use(Router);

/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    noCache: true                // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
  }
 */

// 公共路由（不允许更改！！！）
export const constantRoutes = [
  {
    // 大屏静态路由
    path: "/bigScreen",
    name: 'bigScreen',
    component: BigScreen
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home")
  },
  {
    path: "/sheet",
    name: "sheet",
    component: () => import("@/views/luckysheet/demo")
  },
  {
    path: "/sheet2",
    name: "sheet2",
    component: () => import("@/views/luckysheet/demo2")
  },
  {
    path: "/home1",
    name: "home1",
    component: () => import("@/views/home")
  },
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: resolve => require(["@/views/redirect"], resolve)
      }
    ]
  },
  {
    path: "/login",
    component: resolve => require(["@/views/login"], resolve),
    hidden: true
  },
  {
    path: "/loginPage",
    component: resolve => require(["@/views/loginPage"], resolve),
    hidden: true
  },
  {
    path: "/404",
    component: resolve => require(["@/views/error/404"], resolve),
    hidden: true
  },
  {
    path: "/401",
    component: resolve => require(["@/views/error/401"], resolve),
    hidden: true
  },
  {
    path: "/contextMenu",
    component: resolve =>
      import(
        /* webpackChunkName: "tinymce-example" */
        "@/views/ContextMenuTest.vue"
      ),
    hidden: true
  },
  {
    path: "/",
    component: PageWapper,
    redirect: "/index",
    children: [
      {
        path: "index",
        component: resolve =>
          require(["@/views/plaf/company/home.vue"], resolve),
        name: "首页",
        meta: {
          title: "首页",
          icon: "dashboard",
          noCache: true,
          affix: true
        }
      }
    ]
  },
  {
    path: "/dict",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "type/data/:dictId(\\d+)",
        component: resolve => require(["@/views/system/dict/data"], resolve),
        name: "Data",
        meta: {
          title: "字典数据",
          icon: ""
        }
      }
    ]
  },
  {
    path: "/commonType",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "index",
        component: resolve =>
          require(["@/views/system/commonType/index"], resolve),
        name: "CommonType",
        meta: {
          title: "通用类型",
          icon: ""
        }
      }
    ]
  },
  {
    path: "/orgManager",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "index",
        component: resolve =>
          require(["@/views/system/org/orgManager/index"], resolve),
        name: "OrgManager",
        meta: {
          title: "机构管理",
          icon: ""
        }
      }
    ]
  },
  {
    path: "/updateModel",
    component: PageWapper,
    hidden: true,
    children: [
      {
        path: "index",
        component: resolve => require(["@/views/updateModel"], resolve),
        name: "listTemplate",
        meta: {
          title: "模版",
          icon: ""
        }
      }
    ]
  },
  {
    path: "/designModel",
    component: PageWapper,
    hidden: true,
    children: [
      {
        path: "index",
        component: resolve => require(["@/views/designModel"], resolve),
        name: "designModel",
        meta: {
          title: "模版",
          icon: ""
        }
      }
    ]
  }
];

// 自定义路由（可自定义更改，component字段请写字符串）
export const customerRoutes = [
  {
    path: "/contextMenu",
    component: "ContextMenuTest.vue",
    hidden: true
  },
  {
    path: "/dict",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "type/data/:dictId(\\d+)",
        component: "system/dict/data",
        name: "Data",
        meta: {
          title: "字典数据",
          icon: ""
        }
      }
    ]
  },
  {
    path: "/commonType",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "index",
        component: "system/commonType/index",
        name: "CommonType",
        meta: {
          title: "通用类型",
          icon: ""
        }
      }
    ]
  },
  {
    path: "/orgManager",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "index",
        component: "system/org/orgManager/index",
        name: "OrgManager",
        meta: {
          title: "机构管理",
          icon: ""
        }
      }
    ]
  },
  {
    path: "/gen",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "edit/:tableId(\\d+)",
        component: "tool/gen/editTable",
        name: "GenEdit",
        meta: {
          title: "修改生成配置"
        }
      }
    ]
  },

  // 以下是前端静态模板 by xiongyy
  {
    path: "/updateModel",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "index",
        component: "updateModel",
        name: "listTemplate",
        meta: {
          title: "模版",
          icon: ""
        }
      }
    ]
  },
  {
    path: "/luckysheet",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "index",
        component: "luckysheet",
        name: "luckysheet",
        meta: {
          title: "luckysheet",
          icon: ""
        }
      }
    ]
  },
  {
    path: "/designModel",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "index",
        component: "designModel",
        name: "designModel",
        meta: {
          title: "模版",
          icon: ""
        }
      }
    ]
  },
  {
    path: "/detailListModel",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "index",
        component: "detailListModel",
        name: "detailListModel",
        meta: {
          title: "模版",
          icon: ""
        }
      }
    ]
  },
  {
    path: "/gen",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "edit/:tableId(\\d+)",
        component: "tool/gen/editTable",
        name: "GenEdit",
        meta: {
          title: "修改生成配置"
        }
      }
    ]
  },
  {
    path: "/investment",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "index",
        component: "template/project/investment",
        name: "investment",
        meta: {
          title: "投资控制",
          icon: ""
        }
      }
    ]
  },
  {
    path: "/proIndex",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "index",
        component: "template/project/index",
        name: "proIndex",
        meta: {
          title: "平台首页",
          icon: ""
        }
      }
    ]
  },
  {
    path: "/progress",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "index",
        component: "template/project/progress",
        name: "progress",
        meta: {
          title: "进度控制首页",
          icon: ""
        }
      }
    ]
  },
  {
    path: "/quality",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "index",
        component: "plaf/project/quality",
        name: "quality",
        meta: {
          title: "质量管控",
          icon: ""
        }
      }
    ]
  },
  {
    path: "/agency",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "index",
        component: "plaf/project/agency",
        name: "agency",
        meta: {
          title: "代办事项",
          icon: ""
        }
      }
    ]
  },
  {
    path: "/jindukongzhi",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "index",
        component: "plaf/project/jindukongzhi",
        name: "jindukongzhi",
        meta: {
          title: "进度控制",
          icon: ""
        }
      }
    ]
  },
  {
    path: "/zhilaingkongzhi",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "index",
        component: "plaf/project/zhilaingkongzhi",
        name: "zhilaingkongzhi",
        meta: {
          title: "质量控制",
          icon: ""
        }
      }
    ]
  },
  {
    path: "/flow",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/flow",
        name: "home",
        component: flowManage
      },
      {
        path: "/flow/flowDesign",
        name: "flowDesign",
        component: flowDesign,
        meta: {
          title: "流程编辑",
          icon: ""
        }
      },
      {
        path: "/flow/flowType",
        name: "flowType",
        component: flowType
      },
      {
        path: "/flow/demoFlow",
        name: "demoFlow",
        component: demoFlow
      },
      {
        path: "/flow/daiBanTsk",
        name: "daiBanTsk",
        component: daiBanTsk
      }
    ]
  }
];
