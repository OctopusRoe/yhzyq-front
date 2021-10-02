import request from "@/utils/request";

const url = {
  getOrgTree: "/system/org/getOrgTree", //获取机构树
  getTreeDatasByConditions: "/system/org/getTreeDatasByConditions", //获取机构数据
  saveOrg: "/system/org/addOrg", //添加机构
  deleteById: "/system/org/deleteById", //根据id删除机构
  getOrgByid: "/system/org/getOrgByid",
  boundOrgUser: "/system/org/boundOrgUser",
  deleteOrgRole: "/system/queryRole/deleteOrgRole",
  saveOrgRole: "/system/queryRole/saveOrgRole",
  queryRoleByOrgId: "/system/queryRole/queryRoleByOrgId",
  queryNewRoleByOrgId: "/system/queryRole/queryNewRoleByOrgId",
  getDicts: "/system/org/getDicts",
  orgTree: "/system/org/orgTree",
  getOrgByRoleId: "/system/org/getOrgByRoleId",
  saveOrgRule:"/system/queryRole/saveOrgRule",
  deleteOrgRule: "/system/queryRole/deleteOrgRule",
};

// 获取所有机构的树状数据
export function getOrgByRoleId(val) {
  return request({
    url: url.getOrgByRoleId,
    method: "get",
    params:val
  });
}

// 获取所有机构的树状数据
export function orgTree() {
  return request({
    url: url.orgTree,
    method: "get"
  });
}

// 获取岗位用户列表数据
export function getPositionUserPageData(queryParams) {
  return request({
    url: "/ucUserAction-pagelist.do",
    method: "post",
    params: queryParams
  });
}

// 获取所有机构的树状数据
export function getAllOrgTreeData() {
  return request({
    url: "/ucRoleGroupAction-getOrg.do",
    method: "get"
  });
}

// 获取机构的树状数据
export function getOrgTreeData(type) {
  return request({
    url: "/orgDutyAction-getTreeData.do?type=" + type,
    method: "get"
  });
}

// 获取机构的树状数据
export function flowOrgTreeData() {
  return request({
      url: url.flowOrgTreeData,
      method: "get"
    });
  }

// 根据查询条件获取机构树状数据
export function getTreeDatasByConditions(data) {
  return request({
    url: url.getTreeDatasByConditions,
    method: "get",
    params: data
  });
}

// 获取用户详情
export function getUserById(id) {
  return request({
    url: "/ucRoleGroupAction-getUserById.do?id=" + id,
    method: "get"
  });
}

// 删除机构详情
export function deleteById(data) {
  return request({
    url: url.deleteById,
    method: "post",
    data: data
  });
}

// 获取机构人员列表详情
export function getOrgPositionMan(data) {
  return request({
    url: "/system/duty/getOrgPositionMan",
    method: "get",
    params: data
  });
}

// 保存机构详情
export function saveOrg(data) {
  return request({
    url: url.saveOrg,
    method: "post",
    data: data,
    params: { ids: data.ids }
  });
}

// 获取当前机构下没有的角色
export function queryNewRoleByOrgId(data) {
  return request({
    url: url.queryNewRoleByOrgId,
    method: "get",
    params: data
  });
}

// 获取当前机构下所有的角色
export function queryRoleByOrgId(data) {
  return request({
    url: url.queryRoleByOrgId,
    method: "get",
    params: data
  });
}

// 绑定机构角色
export function saveOrgRole(data) {
  return request({
    url: url.saveOrgRole,
    method: "post",
    params: data,
    data: data
  });
}


// 绑定机构角色
export function saveOrgRule(data) {
  return request({
    url: url.saveOrgRule,
    method: "post",
    params: data,
    data: data
  });
}

// 解绑机构角色
export function deleteOrgRole(data) {
  return request({
    url: url.deleteOrgRole,
    method: "post",
    data: data,
    params: data
  });
}

// 解绑机构角色
export function deleteOrgRule(data) {
  return request({
    url: url.deleteOrgRule,
    method: "post",
    data: data,
    params: data
  });
}

// 获取机构树
export function getOrgTree(params) {
  return request({
    url: url.getOrgTree,
    params: params,
    method: "get"
  });
}

export function getOrgByid(data) {
  return request({
    url: url.getOrgByid,
    method: "get",
    params: data
  });
}

export function boundOrgUser(data) {
  return request({
    url: url.boundOrgUser,
    method: "get",
    params: data
  });
}

export function getDicts(data) {
  return request({
    url: url.getDicts,
    method: "get",
    params: data
  });
}
