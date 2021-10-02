import request from "@/utils/request";

const url = {
  getListSystems: "/system/xtCache/getListSystems", // 获取缓存所有系统
  saveOrUpdateXtCache: "/system/xtCache/saveOrUpdateXtCache", // 保存与修改
  pageDataList: "/system/xtCache/pageDataList", // 分页获取数据
  getListModules: "/system/xtCache/getListModules", // 获取缓存所有模块
  delXtCacheById: "/system/xtCache/delXtCacheById", // 根据id删除
  clearCache: "/system/xtCache/clearCache", // 清除缓存
  batchDeleteCache: "/system/xtCache/batchDeleteCache" // 批量删除
};

// 获取缓存所有系统
export function getListSystems(data) {
  return request({
    url: url.getListSystems,
    method: "get",
    params: data
  });
}

export function saveOrUpdateXtCache(data) {
  return request({
    url: url.saveOrUpdateXtCache,
    method: "post",
    data: data
  });
}

// 分页查询数据
export function pageDataList(data) {
  return request({
    url: url.pageDataList,
    method: "get",
    params: data
  });
}

// 获取缓存所有模块
export function getListModules(data) {
  return request({
    url: url.getListModules,
    method: "get",
    params: data
  });
}

// 根据id删除
export function delXtCacheById(data) {
  return request({
    url: url.delXtCacheById,
    method: "get",
    params: data
  });
}

// 根据id删除
export function clearCache(data) {
  return request({
    url: url.clearCache,
    method: "post",
    data: data
  });
}

// 根据id删除
export function batchDeleteCache(data) {
  return request({
    url: url.batchDeleteCache,
    method: "post",
    data: data
  });
}
