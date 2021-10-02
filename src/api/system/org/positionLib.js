import request from "@/utils/request";

const url = {
  getOrgPositionLib: "/system/positionLib/getOrgPositionLib",
  saveOrUpdatePositionLib: "/system/positionLib/saveOrUpdatePositionLib",
  delPositionLibById: "/system/positionLib/delPositionLibById",
  queryNewRoleByPositionLibId: "/system/queryRole/queryNewRoleByPositionLibId",
  queryRoleByPositionLibId: "/system/queryRole/queryRoleByPositionLibId",
  savePositionLibRole: "/system/queryRole/savePositionLibRole",
  deletePositionLibRole: "/system/queryRole/deletePositionLibRole",
  allPositionLib: "/system/positionLib/allPositionLib"
};

// 获取岗位库列表
export function getOrgPositionLib(object) {
  return request({
    url: url.getOrgPositionLib,
    method: "get",
    // data:object,
    params: object
  });
}

// 通过id获取岗位库列表
export function getPositionLibById(id) {
  return request({
    url: "/positionLib/getPositionLibById?id=" + id,
    method: "get"
  });
}

// 保存岗位库详情
export function saveOrUpdatePositionLib(object) {
  return request({
    url: url.saveOrUpdatePositionLib,
    method: "post",
    data: object
  });
}

// 保存岗位库详情
export function delPositionLibById(data) {
  return request({
    url: url.delPositionLibById,
    method: "post",
    data: data,
    params: data
  });
}

// 获取当前岗位库下没有的角色
export function queryNewRoleByPositionLibId(data) {
  return request({
    url: url.queryNewRoleByPositionLibId,
    method: "get",
    params: data
  });
}

// 获取当前岗位库下已有的角色
export function queryRoleByPositionLibId(data) {
  return request({
    url: url.queryRoleByPositionLibId,
    method: "get",
    params: data
  });
}

// 绑定岗位库角色
export function savePositionLibRole(data) {
  return request({
    url: url.savePositionLibRole,
    method: "post",
    data: data,
    params: data
  });
}

// 解绑岗位库角色
export function deletePositionLibRole(data) {
  return request({
    url: url.deletePositionLibRole,
    method: "post",
    data: data,
    params: data
  });
}

// 获取所有岗位库
export function allPositionLib(data) {
  return request({
    url: url.allPositionLib,
    method: "get",
    params: data
  });
}
