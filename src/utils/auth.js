// import Cookies from 'js-cookie'

import {ACCESS_TOKEN} from "@/store/mutation-types";
import storage from "store";

export function getToken() {
  return storage.get(ACCESS_TOKEN);
}

export function setToken(token) {
  storage.set(ACCESS_TOKEN, token, 7 * 24 * 60 * 60 * 1000);
}

export function removeToken() {
  storage.remove(ACCESS_TOKEN);
}

export function getUserId () {
  return storage.get('userId');
}

export function setUserId (userId) {
  storage.set('userId', userId, 7 * 24 * 60 * 60 * 1000);
}

export function removeUserId () {
  storage.remove('userId');
}
