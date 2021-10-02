/**
 * 扩展属性
 */
import request from "@/utils/request";

/**
 * 扩展属性查询数据
 * @param {Object} queryParams [查询条件]
 */
export function queryDataList(queryParams) {
  return request({
    url: "/system/exprop/property/queryDataList",
    method: "post",
    data: queryParams
  });
}

/**
 * 扩展属性保存数据
 * @param {Object} queryParams [请求数据]
 */
export function saveData(queryParams) {
  return request({
    url: "/system/exprop/property/saveData",
    method: "post",
    data: queryParams
  });
}
/**
 * 扩展属性修改数据
 * @param {Object} queryParams [请求数据]
 */
export function updateData(queryParams) {
  return request({
    url: "/system/exprop/property/updateData",
    method: "post",
    data: queryParams
  });
}

/**
 * 根据id删除数据
 * @param {Object} queryParams [请求数据]
 */
export function delDataById(queryParams) {
  return request({
    url: "/system/exprop/property/delDataById",
    method: "post",
    data: queryParams
  });
}
/**
 * 根据id删除数据
 * @param {Object} queryParams [请求数据]
 */
export function delDataByIds(queryParams) {
  return request({
    url: "/system/exprop/property/delDataByIds",
    method: "post",
    data: queryParams
  });
}

export function getDataById(id) {
  return request({
    url: "/system/exprop/property/getDataById?id=" + id,
    method: "get"
  });
}

/**
 * 新增属性的预数据
 */
export function queryDataForNewProperty() {
  return request({
    url: "/system/exprop/property/queryDataForNewProperty",
    method: "get"
  });
}

/**
 * 复制属性数据
 * @param {Object} queryParams [请求数据]
 */
export function copyData(queryParams) {
  return request({
    url: "/system/exprop/property/copyData",
    method: "post",
    data: queryParams
  });
}

/**
 * 查询详情
 * @param {String} id [请求数据]
 */
export function getPropertyInfo(id) {
  return request({
    url: "/system/exprop/property/getPropertyInfo?id=" + id,
    method: "get"
  });
}
