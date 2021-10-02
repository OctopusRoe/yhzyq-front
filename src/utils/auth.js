// import Cookies from 'js-cookie'

import { ACCESS_TOKEN } from "@/store/mutation-types";
import storage from "store";

// const TokenKey = 'Admin-Token'

export function getToken() {
  let token = storage.get(ACCESS_TOKEN);
  //  alert(token+"getToken")
  return token;
}

export function setToken(token) {
  //alert(token+"setToken")
  storage.set(ACCESS_TOKEN, token, 7 * 24 * 60 * 60 * 1000);
}

export function removeToken() {
  // storage.clearAll();
  storage.remove(ACCESS_TOKEN);
  // return Cookies.remove(TokenKey)
}
