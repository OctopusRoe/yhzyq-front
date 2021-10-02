import request from "@/utils/request";

const url = {
  boundOrgUser: "/system/org/boundOrgUser",
  unboundUser: "/system/position/unboundUser",
  boundUser: "/system/position/boundUser",
  addPositionUser: "/system/position/addPositionUser",
  deletePositionUser: "/system/position/deletePositionUser"
};

// 获取岗位用户列表数据
export function getPositionUserPageData(queryParams) {
  return request({
    url: "/orgPositionUserAction-getUser.do",
    method: "post",
    params: queryParams
  });
}

// 保存岗位用户详情
export function savePositionUser(object) {
  return request({
    url: "/orgPositionUserAction-addPositionUser.do",
    method: "post",
    params: object
  });
}

// 获取岗位已绑定用户
export function unboundUser(data) {
  return request({
    url: url.unboundUser,
    method: "get",
    params: data
  });
}

// 获取岗位未绑定用户
export function boundUser(data) {
  return request({
    url: url.boundUser,
    method: "get",
    params: data
  });
}

// 绑定岗位用户
export function addPositionUser(data) {
  return request({
    url: url.addPositionUser,
    method: "post",
    data: data,
    params: data
  });
}

// 解除岗位用户
export function deletePositionUser(data) {
  return request({
    url: url.deletePositionUser,
    method: "post",
    data: data,
    params: data
  });
}

// 根据组织部门返回用户
export function boundOrgUser(data) {
  return request({
    url: url.boundOrgUser,
    method: "get",
    params: data
  });
}
