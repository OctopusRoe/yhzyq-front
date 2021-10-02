/**
 * SSO的服务配置js
 */
import storage from "store";
import { LOGIN_STATE, ACCESS_TOKEN } from "@/store/mutation-types";
import { getToken, setToken, removeToken } from "@/utils/auth";

// const oidcObj = () => {
//     const config = {
//         authority: 'http://192.168.1.218:5003/',
//         client_id: '08d69d53-6003-b0f7-c79a-523744000003',
//         redirect_uri: 'http://localhost:8092/login',
//         response_type: 'token',
//         scope: 'API_AQ',
//         post_logout_redirect_uri: 'http://localhost:8092/'

//         // authority: process.env.SSO_AUTHORITY_URL,
//         // client_id: process.env.SSO_CLIENT_ID,
//         // redirect_uri: process.env.SSO_REDIRECT_URL,
//         // response_type: 'token',
//         // scope: 'API_AQ',
//         // post_logout_redirect_uri: process.env.SSO_LOGOUT_REDIRECT_URL
//     }

//     console.log(process.env.SSO_AUTHORITY_URL)

//     const mgr = new Oidc.UserManager(config)

//     return mgr
// }

const config = {
  // authority: 'http://192.168.1.218:5003/',
  // client_id: '08d67a0e-522f-50c5-045b-9d4638111118',
  // redirect_uri: 'http://localhost:778/OAuthPage.aspx',
  // response_type: 'token',
  // scope: 'API_AQ'

  base_url: process.env.VUE_APP_SSO_BASE_API,
  client_id: process.env.VUE_APP_SSO_CLIENT_ID,
  redirect_uri: process.env.VUE_APP_SSO_REDIRECT_URL
};

const getLoginUrl = () => {
  // const uuidState = UUID();
  // storage.set(LOGIN_STATE, uuidState, 60 * 60 * 1000);

  return `${config.base_url}/loginPage?cid=${
    config.client_id
  }&rurl=${encodeURIComponent(config.redirect_uri)}`;
};

// const mgr = new Oidc.UserManager(config)

// mgr.getUser().then(function(user) {
//   if (user) {
//     console.log('用户已登录', user)
//   } else {
//     console.log('用户未登录')
//   }
// })

/**
 * 验证登录
 * author:陈偲
 * time:20200730
 * @param {String} params 参数
 * @param {Function} func 验证成功后执行的回调函数
 */
export const validateLoginFunc = params => {
  return new Promise((resolve, reject) => {
    const token = params.token;

    if (token) {
      resolve(token);
    } else {
      window.location = getLoginUrl();
    }
  });
};

/**
 * SSO的登出
 */
export const logout = () => {
  let url;
  if (process.env.NODE_ENV === "development") {
    url = `${
      config.base_url
    }/api/sso/loginOut?token=${getToken()}&redirect_uri=${encodeURIComponent(
      getLoginUrl()
    )}`;
  } else {
    url = `${
      config.base_url
    }/sso/loginOut?token=${getToken()}&redirect_uri=${encodeURIComponent(
      getLoginUrl()
    )}`;
  }
  let data = {
    token: getToken(),
    redirect_uri: encodeURIComponent(getLoginUrl())
  };
  let qs = require("qs");
  let info = qs.stringify(data);
  removeToken();
  storage.clearAll();
  window.location = url;
};
