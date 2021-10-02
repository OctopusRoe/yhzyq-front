import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import tagsView from './modules/tagsView'
import permission from './modules/permission'
import settings from './modules/settings'
import sys from "./modules/sys";
import getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'
import http from './http'
Vue.use(Vuex)

const state = {
  canvas: {},
  process: {},
  selectedTask: {},
  selectedUsers: [],
  selectedUserGroups: [],
  selectedUserRoles:[],
  selectedConnection: {}
}

const store = new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  modules: {
    http: http,
    app,
    user,
    tagsView,
    permission,
    settings,
    sys
  },
})

export default store
