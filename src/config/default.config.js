/*
 * @Description: 公共配置文件
 * @Author: 陈偲
 * @Date: 2021-05-24
 */

import Vue from "vue";

const MODULES = {
  /**
   * 通用配置
   */
  common: {
    // 消息
    msg: {
      confirm: "您确认吗？"
    },
    // 颜色
    color: {}
  },
  /**完 */

  /**
   * 模块配置
   */
  assets: {
    msg: {},
    color: {}
  },
  change: {
    msg: {},
    color: {}
  },
  contract: {
    msg: {},
    color: {}
  },
  drawing: {
    msg: {},
    color: {}
  },
  final: {
    msg: {},
    color: {}
  },
  material: {
    msg: {},
    color: {}
  },
  meterage: {
    msg: {},
    color: {}
  },
  progress: {
    msg: {},
    color: {}
  },
  project: {
    msg: {},
    color: {}
  },
  steps: {
    msg: {},
    color: {}
  },
  subitem: {
    msg: {},
    color: {}
  },
  system: {
    msg: {
      validateComponentFail: ""
    },
    color: {}
  },
  tool: {
    msg: {},
    color: {}
  }
  /**完 */
};

let states = {
  1: "未开始",
  2: "进行中",
  3: "已结束"
};

let safeLevels = [
  {
    name: "低级",
    value: "1"
  },
  {
    name: "中级",
    value: "2"
  },
  {
    name: "高级",
    value: "3"
  }
];

export { states, safeLevels };

Vue.prototype.$CONFIG = MODULES;
window.$CONFIG = MODULES;
