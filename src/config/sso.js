/**
 * SSO的服务配置js
 */
import storage from "store";

/**
 * 验证登录
 * author:陈偲
 * time:20200730
 * @param {String} params 参数
 */
export const validateLoginFunc = params => {
  return new Promise((resolve, reject) => {
    const token = params.token;

    if (token) {
      resolve(token);
    } else {
      window.location = `${process.env.VUE_APP_SSO_BASE_API}/portal/v1/ssologin?redirect_url=${process.env.VUE_APP_SSO_BASE_API}`
    }
  });
};

/**
 * SSO的登出
 */
export const logout = () => {
  storage.clearAll();
  window.location = `${process.env.VUE_APP_SSO_BASE_API}/portal/v1/logout`
};
