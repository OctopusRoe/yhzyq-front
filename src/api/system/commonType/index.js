/**
 * 资金监管-预算配置
 */
import request from "@/utils/request";

/**
 * 通用类型查询分页数据
 * @param {Object} queryParams [查询条件]
 */
export function queryCommonPageList(queryParams) {
  return request({
    url: "/system/exprop/commonType/pageDataList",
    method: "post",
    data: queryParams
  });
}

/**
 * 通用类型保存数据
 * @param {Object} queryParams [请求数据]
 */
export function saveCommonType(queryParams) {
  return request({
    url: "/system/exprop/commonType/saveData",
    method: "post",
    data: queryParams
  });
}
/**
 * 通用类型修改数据
 * @param {Object} queryParams [请求数据]
 */
export function updateData(queryParams) {
  return request({
    url: "/system/exprop/commonType/updateData",
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
    url: "/system/exprop/commonType/delDataById",
    method: "post",
    data: queryParams
  });
}

export function getDataById(id) {
  return request({
    url: "/system/exprop/commonType/getById?id=" + id,
    method: "get"
  });
}
/**
 * 查询通用类型type
 */
export function queryCommonTypeList() {
  return request({
    url: "/system/exprop/commonType/queryCommonTypeList",
    method: "get"
  });
}
