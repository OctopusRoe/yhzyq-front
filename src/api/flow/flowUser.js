import request from '@/utils/request'

const url = {
  queryUser: '/system/user/queryUserByOrgId',
  queryUserByIds: '/system/user/queryUserByIds',
  queryUserGroup: '/system/group/pagedatalist',
  queryGroupByIds: '/system/group/queryGroupByIds',
  queryUserRole: '/system/role/queryUserRole',
  queryRoleByIds: '/system/role/queryRoleByIds'
}

// 查询用户
export function queryUser(data) {
  return request({
    url: url.queryUser,
    method: 'post',
    params: data
  })
}

// 查询用户
export function queryUserByIds(data) {
  return request({
    url: url.queryUserByIds,
    method: 'post',
    params: data
  })
}

// 查询用户组
export function queryUserGroup(data) {
  return request({
    url: url.queryUserGroup,
    method: 'get',
    params: data
  })
}

// 查询用户组
export function queryGroupByIds(data) {
  return request({
    url: url.queryGroupByIds,
    method: 'post',
    params: data
  })
}

// 查询角色
export function queryUserRole(data) {
  return request({
    url: url.queryUserRole,
    method: 'post',
    params: data
  })
}

// 查询角色
export function queryRoleByIds(data) {
  return request({
    url: url.queryRoleByIds,
    method: 'post',
    params: data
  })
}
