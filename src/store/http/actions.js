import axios from 'axios'
import rest from './restful'

export const loadUserGroups = ({
  commit
}, result) => commit("loadUserGroups", result)

export const getUserGroups = ({
  commit
}, search) => {
  return axios({
    method: 'post',
    url: rest.api.getUserGroups,
    data: search
  })
}

export const loadUsers = ({
  commit
}, result) => commit("loadUsers", result)

export const getUsers = ({
  commit
}, search) => {
  return axios({
    method: 'post',
    url: rest.api.getUsers,
    data: search
  })
}
