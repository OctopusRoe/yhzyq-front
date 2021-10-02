import request from "@/utils/request";

const url = {
  allSystem: "/system/system/allSystem",
  addSystem: "/system/system/addSystem",
  updateSystem: "/system/system/updateSystem",
  deleteSystemById: "/system/system/deleteSystemById",
  systemByPage: "/system/system/systemByPage",
  getSystemById: "/system/system/getSystemById",
  getDictByTypeId: "/system/system/getDictByTypeId"
};

export function allSystem(data) {
  return request({
    url: url.allSystem,
    method: "get",
    params: data
  });
}

// 添加系统
export function addSystem(data) {
  return request({
    url: url.addSystem,
    method: "post",
    data: data
  });
}

// 修改系统
export function updateSystem(data) {
  return request({
    url: url.updateSystem,
    method: "post",
    data: data
  });
}

// 根据id删除系统
export function deleteSystemById(data) {
  return request({
    url: url.deleteSystemById,
    method: "post",
    data: data
  });
}

// 根据分页获取系统
export function systemByPage(data) {
  return request({
    url: url.systemByPage,
    method: "get",
    params: data
  });
}

// 根据id获取系统
export function getSystemById(data) {
  return request({
    url: url.getSystemById,
    method: "get",
    params: data
  });
}

// 根据typeid获取dict
export function getDictByTypeId(data) {
  return request({
    url: url.getDictByTypeId,
    method: "get",
    params: data
  });
}
