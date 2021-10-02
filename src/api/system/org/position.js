import request from "@/utils/request";

const url = {
  pagedatalist: "/system/position/pagedatalist",
  addsOrModify: "/system/position/addsOrModify",
  deleteById: "/system/position/deleteById",
  queryNewRoleByPositionId: "/system/queryRole/queryNewRoleByPositionId",
  queryRoleByPositionId: "/system/queryRole/queryRoleByPositionId",
  savePositionRole: "/system/queryRole/savePositionRole",
  deletePositionRole: "/system/queryRole/deletePositionRole"
};

// 获取机构岗位列表数据
export function getPositionPageData(data) {
  return request({
    url: url.pagedatalist,
    method: "get",
    params: data
  });
}

// 获取机构岗位详情
export function getPositionById(id) {
  return request({
    url: "/orgPositionAction-getById.do?id=" + id,
    method: "get"
  });
}

// 保存机构岗位详情
export function savePosition(data) {
  return request({
    url: url.addsOrModify,
    method: "post",
    data: data
  });
}
// 删除机构岗位详情
export function delOrgPositionById(data) {
  return request({
    url: url.deleteById,
    data: data,
    method: "post"
  });
}

// 获取当前岗位下没有的角色
export function queryNewRoleByPositionId(data) {
  return request({
    url: url.queryNewRoleByPositionId,
    method: "get",
    params: data
  });
}

// 获取当前岗位下已有的角色
export function queryRoleByPositionId(data) {
  return request({
    url: url.queryRoleByPositionId,
    method: "get",
    params: data
  });
}

// 绑定岗位角色
export function savePositionRole(data) {
  return request({
    url: url.savePositionRole,
    method: "post",
    data: data,
    params: data
  });
}

// 解绑岗位角色
export function deletePositionRole(data) {
  return request({
    url: url.deletePositionRole,
    method: "post",
    data: data,
    params: data
  });
}
