import request from '@/utils/request'

const url = {
  addRoleType: '/system/roleType/addRoleType',
  updateRoleTypeById: '/system/roleType/updateRoleTypeById',
  deleteRoleTypeById: '/system/roleType/deleteRoleTypeById',
  findAllRoleType: '/system/roleType/findAllRoleType',
  roleByPage: '/system/role/roleByPage',
  addRole: '/system/role/addRole',
  updateRole: '/system/role/updateRole',
  deleteRole: '/system/role/deleteRole',
  queryResourceTree: 'system/queryRole/queryResourceTree',
  saveRoleResource: 'system/queryRole/saveRoleResource',
  saveUserResource: 'system/queryRole/saveUserResource',
  queryUserByRoleId: 'system/queryRole/queryUserByRoleId',
  queryNewUser: 'system/queryRole/queryNewUser',
  deleteUserRole: 'system/queryRole/deleteUserRole',
  saveUserRole: 'system/queryRole/saveUserRole',
  queryUserByGroupId: 'system/queryRole/queryUserByGroupId',
  queryNewUserGroup: 'system/queryRole/queryNewUserGroup',
  deleteUserGroup: 'system/queryRole/deleteUserGroup',
  saveUserGroup: 'system/queryRole/saveUserGroup',
  queryGroupByRoleId: 'system/queryRole/queryGroupByRoleId',
  queryNewGroupByRoleId: 'system/queryRole/queryNewGroupByRoleId',
  deleteUserGroupRole: 'system/queryRole/deleteUserGroupRole',
  saveUserGroupRole: 'system/queryRole/saveUserGroupRole',
  saveUserResourceList:'system/queryRole/saveUserResourceList',
  queryAllUserResources:'system/queryRole/queryAllUserResources',
  userloginName:"system/user/userloginName"
}


// // 查询角色列表
// export function listRole(query) {
//   return request({
//     url: "/system/role/list",
//     method: "get",
//     params: query
//   });
// }

// // 查询角色详细
// export function getRole(roleId) {
//   return request({
//     url: "/system/role/" + roleId,
//     method: "get"
//   });
// }

// // 新增角色
// export function addRole(data) {
//   return request({
//     url: '/system/role',
//     method: 'post',
//     data: data
//   })
// }

// 添加角色类型
export function addRoleType(data) {
  return request({
    url: url.addRoleType,
    method: 'post',
    data: data,
    params: data
  })
}

// 修改角色类型
export function updateRoleTypeById(data) {
  return request({
    url: url.updateRoleTypeById,
    method: 'post',
    data: data
    // params: data
  })
}

// 删除角色类型
export function deleteRoleTypeById(data) {
  return request({
    url: url.deleteRoleTypeById,
    method: 'post',
    data: data
    // params: data
  })
}

// 所有角色类型
export function findAllRoleType(data) {
  return request({
    url: url.findAllRoleType,
    method: 'get',
    params: data
  })
}

// 分页获取角色
export function roleByPage(data) {
  return request({
    url: url.roleByPage,
    method: 'get',
    params: data,
    data: data
  })
}

// 新增角色
export function addRole(data) {
  return request({
    url: url.addRole,
    method: 'post',
    data: data
  })
}

// 修改角色
export function updateRole(data) {
  return request({
    url: url.updateRole,
    method: 'post',
    data: data
  })
}

// 删除角色
export function deleteRole(data) {
  return request({
    url: url.deleteRole,
    method: 'post',
    data: data,
    params: data
  })
}

// // 修改角色
// export function updateRole(data) {
//   return request({
//     url: "/system/role",
//     method: "put",
//     data: data
//   });
// }

// 角色数据权限
// export function dataScope(data) {
//   return request({
//     url: "/system/role/dataScope",
//     method: "put",
//     data: data
//   });
// }

// 角色状态修改
// export function changeRoleStatus(roleId, status) {
//   const data = {
//     roleId,
//     status
//   };
//   return request({
//     url: "/system/role/changeStatus",
//     method: "put",
//     data: data
//   });
// }

// 删除角色
// export function delRole(roleId) {
//   return request({
//     url: "/system/role/" + roleId,
//     method: "delete"
//   });
// }

// // 导出角色
// export function exportRole(query) {
//   return request({
//     url: "/system/role/export",
//     method: "get",
//     params: query
//   });
// }

// 获取所有资源
export function queryResourceTree(data) {
  return request({
    url: url.queryResourceTree,
    method: 'get',
    params: data
  })
}

// 获取所有资源
export function queryAllUserResources(data) {
  return request({
    url: url.queryAllUserResources,
    method: 'get',
    params: data
  })
}
//保存角色-资源关系
export function saveRoleResource(data) {
  return request({
    url: url.saveRoleResource,
    method: 'post',
    params: data
  })
}

//保存用户-资源关系
export function saveUserResource(data) {
  return request({
    url: url.saveUserResource,
    method: 'post',
    params: data
  })
}

//查询当前角色下的用户
export function queryUserByRoleId(data) {
  return request({
    url: url.queryUserByRoleId,
    method: 'get',
    params: data
  })
}

//查询未绑定角色的用户
export function queryNewUser(data) {
  return request({
    url: url.queryNewUser,
    method: 'get',
    params: data
  })
}

//移除角色用户
export function deleteUserRole(data) {
  return request({
    url: url.deleteUserRole,
    method: 'post',
    params: data,
    data: data
  })
}

//保存角色用户
export function saveUserRole(data) {
  return request({
    url: url.saveUserRole,
    method: 'post',
    data: data,
    params: data
  })
}

//查询用户组用户
export function queryUserByGroupId(data) {
  return request({
    url: url.queryUserByGroupId,
    method: 'get',
    params: data
  })
}

//查询未关联用户组用户
export function queryNewUserGroup(data) {
  return request({
    url: url.queryNewUserGroup,
    method: 'get',
    params: data
  })
}

//移除用户组用户
export function deleteUserGroup(data) {
  return request({
    url: url.deleteUserGroup,
    method: 'get',
    params: data
  })
}

//保存用户组用户
export function saveUserGroup(data) {
  return request({
    url: url.saveUserGroup,
    method: 'post',
    params: data
  })
}

//查询角色下用户组
export function queryGroupByRoleId(data) {
  return request({
    url: url.queryGroupByRoleId,
    method: 'get',
    params: data
  })
}

//查询不在角色下用户组
export function queryNewGroupByRoleId(data) {
  return request({
    url: url.queryNewGroupByRoleId,
    method: 'get',
    params: data
  })
}

//移除用户组用户
export function deleteUserGroupRole(data) {
  return request({
    url: url.deleteUserGroupRole,
    method: 'post',
    params: data,
    data: data
  })
}

//保存用户组用户
export function saveUserGroupRole(data) {
  return request({
    url: url.saveUserGroupRole,
    method: 'post',
    params: data,
    data: data
  })
}


export function saveUserResourceList(data) {
  return request({
      url: url.saveUserResourceList,
      method: "post",
      data: data
  });
}
export function userloginName() {
  return request({
    url: url.userloginName,
    method: "get",

    // params: data
  });
}