import request from "@/utils/request";

const url = {
  findAll: "/system/resources/findAll",
  getByIdForVue: "/system/resources/getByIdForVue",
  saveResForVue: "/system/resources/saveResForVue",
  deleteById: "/system/resources/deleteById",
  getClientByProps: "/system/client/getClientByProps"
};

// 查询菜单列表
export function listMenu(data) {
  return request({
    url: url.findAll,
    method: "get",
    params: data
  });
}

// 查询菜单详细
export function getMenu(data) {
  return request({
    url: url.getByIdForVue,
    method: "get",
    params: data
  });
}

// 查询菜单下拉树结构
export function treeselect() {
  return request({
    url: "/system/menu/treeselect",
    method: "get"
  });
}

// 根据角色ID查询菜单下拉树结构
export function roleMenuTreeselect(roleId) {
  return request({
    url: "/system/menu/roleMenuTreeselect/" + roleId,
    method: "get"
  });
}

// 新增菜单
export function saveMenu(data) {
  return request({
    url: url.saveResForVue,
    method: "post",
    data: data,
    params: {
      menuType: data.menuType,
      saveFlag: data.saveFlag
    }
  });
}

// 修改菜单
export function updateMenu(data) {
  return request({
    url: "/system/menu",
    method: "put",
    data: data
  });
}

// 删除菜单
export function delMenu(data) {
  return request({
    url: url.deleteById,
    method: "post",
    data: data,
    params: data
  });
}

// 所有客户端类型
export function findAllClientType(data) {
  return request({
    url: url.getClientByProps,
    method: "get",
    params: data
  });
}
