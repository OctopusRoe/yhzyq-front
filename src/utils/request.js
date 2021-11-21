/*
 * @Description: 文件内容描述
 * @Author: 陈偲
 * @Date: 2021-04-15 09:34:04
 */
import axios from "axios";
import store from "@/store";
import { getToken } from "@/utils/auth";
import errorCode from "@/utils/errorCode";
import { logout } from "@/config/sso";

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  // baseURL: 'http://172.17.24.171:8030',
  baseURL: process.env.VUE_APP_BASE_API,
  // baseURL: "/api",
  //process.env.VUE_APP_BASE_API,
  // 超时
  timeout: 10000000
});
// request拦截器
service.interceptors.request.use(
  config => {
    // 是否需要设置 token
    //debugger
    const isToken = false; // (config.headers || {}).isToken === false
    let token = getToken();
    if (!!token && !isToken) {
      config.headers["authorization"] = "" + token; // 让每个请求携带自定义token 请根据实际情况自行修改
    }

    updateHeaders(config);

    // verifyUrl(config);

    return config;
  },
  error => {
    console.log(error);
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  res => {
    return res.data
    // 未设置状态码则默认成功状态
    // const code = res.data.rtnCode || res.data.code || 200;
    // // 获取错误信息
    // const msg = errorCode[code] || res.data.msg || errorCode["default"];
    // if (code === 401) {
    //   window.$msgbox
    //     .confirm(
    //       "登录状态已过期，您可以继续留在该页面，或者重新登录",
    //       "系统提示",
    //       {
    //         confirmButtonText: "确定",
    //         type: "warning"
    //       }
    //     )
    //     .then(() => {
    //       logout();
    //     });
    // } else if (code === 500) {
    //   window.$message({
    //     message: msg,
    //     type: "error"
    //   });
    //   return Promise.reject(new Error(msg));
    // } else if (code !== 200) {
    //   window.$message.error(msg);
    //
    //   return Promise.reject("error");
    // } else {
    //   return res.data;
    // }
  },
  error => {
    console.log("err" + error);
    let { message, request } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      if (request.status === 401) {
        message = "登录已超时";
      } else {
        message = "系统接口" + message.substr(message.length - 3) + "异常";
      }
    }

    window.$message({
      message: message,
      type: "error",
      duration: 3 * 1000
    });

    if (request.status === 401) {
      setTimeout(() => {
        logout();
      }, 3 * 1000);
    }

    return Promise.reject(error);
  }
);

/**
 * 验证url
 * @param {*} config
 */
function verifyUrl(config) {
  const prefix = config.url
    .replace(/^(http(s)?:\/\/[^/]+\/)?/i, "")
    .split("/")[0];
  Object.keys(MODULES).forEach(key => {
    if (prefix === key) {
      if (!MODULES[key]) {
        config.url = process.env.VUE_APP_LOCAL_URL + config.url;
        return false;
      }
    }
  });
}

/**
 * 改变头文件
 * @param {*} config
 */
function updateHeaders(config) {
  // if (config.method.toLowerCase() === "post") {
  //   config.headers["Content-Type"] = "application/x-www-form-urlencoded";
  // }
}

export default service;
