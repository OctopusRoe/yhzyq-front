import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

const state = {
  userGroups: [],
  users: [],
  userRoles:[]
}
const http = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}

export default http
