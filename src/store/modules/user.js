// import { login, logout, getInfo } from "@/api/login";
import { login, getInfo } from "@/api/login";
import {getToken, setToken, removeToken, getUserId, setUserId} from "@/utils/auth";
import { validateLoginFunc, logout } from "@/config/sso";
import storage from "store";

import { USER_INFO, USER_CHECKED_ORG } from "@/store/mutation-types";

const user = {
  state: {
    token: getToken(),
    userId: getUserId(),
    realName: '',
    name: "",
    avatar: "",
    roles: [],
    permissions: [],
    info: {},
    orgList: [],
    checkedOrg: storage.get(USER_CHECKED_ORG) || {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USERID: (state, userId) => {
      state.userId = userId;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_REAL_NAME: (state, realName) => {
      state.realName = realName
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions;
    },
    SET_INFO: (state, info) => {
      state.info = info;
    },
    SET_ORG_LIST: (state, list) => {
      state.orgList = list;
    },
    SET_CHECKED_ORG: (state, i) => {
      state.checkedOrg = i;
      storage.set(USER_CHECKED_ORG, i);
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const loginName = userInfo.loginName.trim();
      const passWord = userInfo.passWord;
      return new Promise((resolve, reject) => {
        login(loginName, passWord)
          .then(res => {
            setToken(res.data.token);
            commit("SET_TOKEN", res.data.token);
            commit("SET_USERID", res.data.userId);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // alert("store user")
        getInfo(state.userId, getToken())
          .then(res => {
            if (res.success) {
              res = JSON.parse(res.data).data;
              const user = res.user;
              const orgList = res.orgList.filter(
                item => item.buzType === "2" && item.organizationType === "10"
              );

              if (user) {
                const avatar =
                  user.avatar == require("@/assets/image/profile.jpg");

                if (res.roles && res.roles.length > 0) {
                  // 验证返回的roles是否是一个非空数组
                  commit("SET_ROLES", res.roles);
                  commit("SET_PERMISSIONS", res.permissions);
                } else {
                  // commit("SET_ROLES", ["ROLE_DEFAULT"]);
                }

                storage.set(USER_INFO, res);

                commit("SET_NAME", user.loginName);
                commit("SET_AVATAR", avatar);
                commit("SET_INFO", user);
              } else {
                reject(new Error("用户不存在"));
              }

              if (orgList && orgList.length) {
                commit("SET_ORG_LIST", orgList);
              }

              resolve(res);
            } else {
              reject(res);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit("SET_TOKEN", "");
            commit("SET_ROLES", []);
            commit("SET_PERMISSIONS", []);
            removeToken();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        removeToken();
        resolve();
      });
    },
    validateLogin({ commit }, params) {
      return new Promise((resolve, reject) => {
        validateLoginFunc(params).then(
          token => {
            setToken(token);
            setUserId(params.userId)
            commit("SET_TOKEN", token);
            commit("SET_USERID", params.userId);
            commit("SET_NAME", params.name);

            resolve(token);
          },
          err => {
            reject(err);
          }
        );
      });
    },
    // 登出
    /**
     * update:修改登出逻辑使其从sso退出登录
     * author:陈偲
     * time:20200730
     */
    Logout({ commit, state }) {
      state.globalSpinning = true;

      return new Promise(resolve => {
        logout();

        resolve();
      });

      // return new Promise((resolve) => {
      //   logout(state.token).then(() => {
      //     resolve()
      //   }).catch(() => {
      //     resolve()
      //   }).finally(() => {
      //     commit('SET_TOKEN', '')
      //     commit('SET_ROLES', [])
      //     storage.remove(ACCESS_TOKEN)
      //   })
      // })
    }
  }
};

export default user;
