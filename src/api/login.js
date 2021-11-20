import request from "@/utils/request";
import Qs from 'qs'

const url = {
  getUserInfo: "/sso/getUserInfo",
  landCode: "/sso/qrcode/landCode",
  findQrcodeLandDetail: "/sso/findQrcodeLandDetail"
};

// 登录方法
export function login(data) {
  // const data = {
  //   loginName,
  //   passWord
  // }
  // return request({
  //   url: '/ucAdmin-loginForJson.do?loginName='+loginName+'&passWord='+passWord+'',
  //   method: 'get'
  // })
  return request({
    url: "/sso/loginForJson",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    data: data
  });
}

// 获取用户详细信息
export function getInfo(userId, token) {
  console.log(userId + "," + token + ",getInfo");
  // alert(userId+","+token+",getInfo")
  return request({
    url: url.getUserInfo,
    // url: "/ucAdmin-getUserInfo.do",
    // url: "/ucAdmin-getUserInfo.do?userId=" + userId + "&token=" + token,
    method: "post"
  });
}

// 退出方法
export function logout() {
  return request({
    url: "/logout",
    method: "post"
  });
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: "/captchaImage",
    method: "get"
  });
}

// 生成登录二维码
export function landCode(data) {
  return request({
    url: url.landCode,
    method: "get",
    params: data,
    responseType: "blob"
  });
}

// 监听登录信息
export function findQrcodeLandDetail(data) {
  return request({
    url: url.findQrcodeLandDetail,
    method: "post",
    data: data
  });
}

/**
 * 单点登录认证URL
 * @param data
 * @returns {AxiosPromise}
 */
export function tokenValidate(data) {
  return request({
    url: 'https://yh.jxgsgl.com:6443/portal/v1/tokenValidate',
    method: "post",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: Qs.stringify(data)
  });
}


/**
 * 临时令牌校验接口
 * @param data
 * @returns {AxiosPromise}
 */
export function tpTokenValidate(data) {
  return request({
    url: 'https://yh.jxgsgl.com:6443/portal/v1/tpTokenValidate',
    method: "post",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: Qs.stringify(data)
  });
}
