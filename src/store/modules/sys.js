/**
 * 向后端请求用户的菜单，动态生成路由
 */
// import { asyncRouterMap, constantRouterMap } from '@/config/router.config'
import storage from "store";
import * as api from "@/api/system/org/org";
import * as positionUserApi from "@/api/system/org/positionUser";
import { SYS_ORGANIZATION, SYS_DEPART } from "@/store/mutation-types";
import Vue from "vue";
import router from "@/router";

import md5 from "md5";

const store = {
  namespaced: true,
  state: {
    oneData: {},
    infos: null,
    orgInfos: [],
    departmentIds: [],
    organizationData: new Map(),
    themeColor: "",
    isShowPageView: true
  },
  getters: {
    orgType: state => {
      return state.orgInfos.filter(item => item.key === window.location.href)[0]
        ?.data.OrgType;
    },
    orgCode: state => {
      return state.orgInfos.filter(item => item.key === window.location.href)[0]
        ?.data.OrgCode;
    },
    parentCode: state => {
      return state.orgInfos.filter(item => item.key === window.location.href)[0]
        ?.data.ParentCode;
    },
    departmentId: state => {
      return state.departmentIds.filter(
        item => item.key === window.location.href
      )[0]?.id;
    }
    // permissions: state => {
    //   let result = []

    //   for (let key of Vue.$BUTTON_TEXT) {
    //     result.push(key.toLowerCase())
    //   }

    //   return result
    // }
  },
  mutations: {
    addOrgCodes(state, payload) {
      const orgMap = new Map(state.orgInfos.map(item => [item.key, item.data]));
      if (payload) {
        orgMap.set(window.location.href, payload);
      } else {
        orgMap.delete(window.location.href);
      }

      state.orgInfos = [...orgMap].map(item => {
        return { key: item[0], data: item[1] };
      });
    },
    addDepartmentIds(state, payload) {
      const departmentMap = new Map(
        state.departmentIds.map(item => [item.key, item.id])
      );
      if (payload) {
        departmentMap.set(window.location.href, payload);
      } else {
        departmentMap.delete(window.location.href);
      }

      state.departmentIds = [...departmentMap].map(item => {
        return { key: item[0], id: item[1] };
      });
    },
    updateThemeColor(state, color) {
      state.themeColor = color;
    },
    updateIsShowPageView(state, isShow) {
      state.isShowPageView = isShow;
    }
  },
  actions: {
    // 获取组织结构树的信息

    getUserRoleControlOrganizsTree({ commit, state, rootGetters }, params) {
      // if (!params.roleID) {
      //   params.roleID = rootGetters.currentRole.Id;
      // }

      return new Promise((resolve, reject) => {
        const storageName = SYS_ORGANIZATION + md5(JSON.stringify(params));
        // const organizationData = storage.get(storageName)

        if (state.organizationData.get(storageName)) {
          resolve(state.organizationData.get(storageName));
        } else {
          api.getOrgTree(params).then(res => {
            // api.getTreeDatasByConditions(params).then(res => {
            if (res.success) {
              // 使用非本地缓存
              state.organizationData.set(storageName, res.data);
              resolve(res.data);
            } else {
              reject(res);
            }

            // state.organizationData.set(storageName, res);
            // resolve(res);
          });
        }
      });
    },
    // 返回机构下的用户
    boundOrgUser({ commit, state, rootGetters }, params) {
      return new Promise((resolve, reject) => {
        positionUserApi.boundOrgUser(params).then(res => {
          resolve(res);
        });
      });
    }
    /**
     * 根据部门的code返回人员
     * @param {Object} params 参数orgCode,cnName,pageSize,page
     * author:陈偲
     * time:2020/11/2
     */
    // getUserByOrgCode({ commit, state }, params) {
    //   return new Promise((resolve, reject) => {
    //     api.GetOrganizUsers(params).then(res => {
    //       if (res.success) {
    //         resolve(res);
    //       } else {
    //         reject(res);
    //       }
    //     });
    //   });
    // },
    // 获取组织结构树的信息
    // GetOwnerDepart({ commit, state }, params) {
    //   return new Promise((resolve, reject) => {
    //     const storageName = SYS_DEPART + md5(JSON.stringify(params));
    //     // const organizationData = storage.get(storageName)

    //     if (state.organizationData.get(storageName)) {
    //       resolve(state.organizationData.get(storageName));
    //     } else {
    //       api.GetOwnerDepart(params).then(res => {
    //         if (res.success) {
    //           // 使用非本地缓存
    //           state.organizationData.set(storageName, res.data);
    //           resolve(res.data);
    //         } else {
    //           reject(res);
    //         }
    //       });
    //     }
    //   });
    // }
  }
};

export default store;
