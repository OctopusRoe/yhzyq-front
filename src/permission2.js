// return next({ path: "/index", replace: true })
// return next('/home')
// if (to.path.includes('/logout/setToken')) {
//   // 删除 token
//   store.commit("SET_TOKEN", "");
//   store.commit("SET_REAL_NAME", "");
//   store.commit("SET_USERID", "");
//   store.commit("SET_ROLES", []);
//   store.commit("SET_PERMISSIONS", []);
//   removeToken();
//   return
// }

import {tokenValidate, tpTokenValidate} from "@/api/login";
import {getToken} from "@/utils/auth";
import Cookies from "js-cookie";

if (to.path.includes('tpToken')) {
  const { tpToken } = to.query
  const { code, obj } = await tpTokenValidate({tpToken, redirect_url: `${location.origin}/logout/setToken`})
  console.log(obj, 'tpTokenValidate')
  if (code === 200) {
    await setLocalToken(obj)
  } else {
    // window.location = `https://yh.jxgsgl.com:6443/portal/v1/ssologin?redirect_url=${to.path}`
  }
}

if (getToken()) {
  next()
} else {
  const oldLoginTokens = Cookies.get('loginTokens')
  console.log(oldLoginTokens)
  if (oldLoginTokens) {
    const {code, obj} = await tokenValidate({ loginToken: oldLoginTokens })
    console.log(obj, 'tokenValidate')
    if (code === 200) {
      await setLocalToken(obj)
      next()
    } else {
      // window.location = `https://yh.jxgsgl.com:6443/portal/v1/ssologin?redirect_url=${to.path}`
    }
  } else {
    // window.location = `https://yh.jxgsgl.com:6443/portal/v1/ssologin?redirect_url=${to.path}`
  }
}

