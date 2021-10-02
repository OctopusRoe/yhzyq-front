import request from '@/utils/request'
import { praseStrEmpty } from "@/utils/ruoyi";

const url = {
  queryOrgId: "/system/user/queryOrgId",
  getUserGroupTree:"/system/user/getUserGroupTree",
  queryUserGroupId:"/system/user/queryUserGroupId",
  getPositionTree:"/system/user/getPositionTree",
  queryPositionId:"system/user/queryPositionId",
  queryAllDuty:"system/duty/queryAllDuty",
  getSourceSystem:"system/user/getSourceSystem",
  getUserByIds:"system/user/getUserByIds",
  addUserService:"system/user/addUser",
  updatePassService:"system/user/resetPasswd",
  stateUserNormal:"system/user/stateUserNormal",
  deleteUserById:"system/user/deleteUserById",
  updateUserPwd:"system/user/changePasswd",
  updateUserService:"system/user/editUser",
  queryNation:"system/user/queryNation",
  locking:"system/user/locking",
  getRoleTree:"/system/user/getRoleTree",
  queryRoleId:"/system/user/queryRoleId"
};

// 查询用户列表
export function listUser(query) {
  return request({
    url: '/Ajax.jsonServlet?service=ucUserResourcesAction&serviceMethod=getUserList&_type=save',
    method: 'post',
    data:query
  })
}

// 查询用户详细
export function getUser(userId) {
  return request({
    url: '/system/user/' + praseStrEmpty(userId),
    method: 'get'
  })
}

// 新增用户
export function addUser(data) {
  return request({
    url: '/system/user',
    method: 'post',
    data: data
  })
}

// 修改用户
export function updateUser(data) {
  return request({
    url: '/system/user',
    method: 'put',
    data: data
  })
}

// 删除用户
export function delUser(userId) {
  return request({
    url: '/system/user/' + userId,
    method: 'delete'
  })
}

// 导出用户
export function exportUser(query) {
  return request({
    url: '/system/user/export',
    method: 'get',
    params: query
  })
}

// 用户密码重置
export function resetUserPwd(userId, password) {
  const data = {
    userId,
    password
  }
  return request({
    url: '/system/user/resetPwd',
    method: 'put',
    data: data
  })
}

// 用户状态修改
export function changeUserStatus(userId, status) {
  const data = {
    userId,
    status
  }
  return request({
    url: '/system/user/changeStatus',
    method: 'put',
    data: data
  })
}

// 查询用户个人信息
export function getUserProfile() {
  return request({
    url: '/system/user/profile',
    method: 'get'
  })
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: '/system/user/profile',
    method: 'put',
    data: data
  })
}

// 用户密码重置
export function updateUserPwd(data) {
  return request({
    url: url.updateUserPwd,
    method: 'post',
    data: data
  })
}

// 用户头像上传
export function uploadAvatar(data) {
  return request({
    url: '/system/user/profile/avatar',
    method: 'post',
    data: data
  })
}

// 下载用户导入模板
export function importTemplate() {
  return request({
    url: '/system/user/importTemplate',
    method: 'get'
  })
}

export function getSourceSystem(){
  return request({
    url:url.getSourceSystem,
    method:"get"
  })
}
//获取民族字典
export function queryNation(){
  return request({
    url:url.queryNation,
    method:"get"
  })
}


export function getAreaTree(query){
  return request({
    url:"/Ajax.jsonServlet?service=ucForbidResAction&serviceMethod=getRegByCountry&_type=save",
    method:"post",
    data:query
  })
}


export function getAreaName(query){
  return request({
    url:"/Ajax.jsonServlet?service=ucForbidResAction&serviceMethod=getRegParentName&_type=save",
    method:"post",
    data:query
  })
}


export function getRcTreeData(query){
  return request({
    url:"/Ajax.jsonServlet?service=ucForbidResAction&serviceMethod=addForbid&_type=save",
    method:"post",
    data:query
  })
}

export function getYyRourceTree(query){
  return request({
    url:"/Ajax.jsonServlet?service=ucUserAction&serviceMethod=findAllTree&_type=save",
    method:"post",
    data:query
  })
}
export function getJzRourceTree(query){
  return request({
    url:"/Ajax.jsonServlet?service=ucForbidResService&serviceMethod=getUserForBid&_type=save",
    method:"post",
    data:query
  })
}

export function addUserService(query){
  return request({
    url:url.addUserService,
    method:"post",
    data:query
  })
}
export  function getUserById(query){
  return request({
    url:"/Ajax.jsonServlet?service=ucRoleGroupAction&serviceMethod=getUserById&_type=save",
    method:"post",
    params:query
  })
}

export  function updateUserService(query){
  return request({
    url:url.updateUserService,
    method:"post",
    data:query
  })
}

export  function deleteUserByIdService(query){
  return request({
    url:"/Ajax.jsonServlet?service=ucUserService&serviceMethod=del&_type=save",
    method:"post",
    params:query
  })
}

export function getDetailById(id){
  return request({
    url:"/Ajax.jsonServlet?service=ucRoleGroupAction&serviceMethod=getUserById&id="+id,
    method:"get"
  })
}
export function updatePassService(query){
  return request({
    url:url.updatePassService,
    method:"post",
    params:query
  })
}

export function checkedSaveService(query){
  return request({
    url:"/Ajax.jsonServlet?service=ucForbidResAction&serviceMethod=addForbidResources&_type=save",
    method:"post",
    params:query
  })
}


// 用户组资源树
export function getRoleTree(data) {
  return request({
    url: url.getRoleTree,
    method: "get",
    params: data
  });
}
// 用户角色树
export function getUserGroupTree(data) {
  return request({
    url: url.getUserGroupTree,
    method: "get",
    params: data
  });
}

//查询当前角色下的用户
export function queryUserGroupId(data) {
  return request({
    url:url.queryUserGroupId,
    method: "get",
    params:data

  });
}

//获取岗位资源树
export function getPositionTree(data) {
  return request({
    url: url.getPositionTree,
    method: "get",
    params: data
  });
}

//查询当前岗位下的用户
export function queryPositionId(data) {
  return request({
    url:url.queryPositionId,
    method: "get",
    params:data
  });
}
//查询当前角色下的用户
export function queryRoleId(data) {
  return request({
    url:url.queryRoleId,
    method: "get",
    params:data
  });
}

//查询当前组织下的用户
export function queryOrgId(data) {
  return request({
    url:url.queryOrgId,
    method: "post",
    params:data
  });
}

//职务下拉框数据
export function queryAllDuty(data) {
  return request({
    url:url.queryAllDuty,
    method: "get",
    params: data,
  });
}
//查询用户详情
export function getUserByIds(data) {
  return request({
    url:url.getUserByIds,
    method: "post",
    data: data
  });
}

//修改用户状态
export function stateUserNormal(data) {
  return request({
    url:url.stateUserNormal,
    method: "get",
    params:data
  });
}

//修改用户状态
export function locking(data) {
  return request({
    url:url.locking,
    method: "get",
    params:data
  });
}

//删除用户
export function deleteUserById(data) {
  return request({
    url:url.deleteUserById,
    method: "post",
    data: data
  });
}
