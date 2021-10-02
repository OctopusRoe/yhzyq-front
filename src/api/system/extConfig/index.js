/**
 * 资金监管-预算配置
 */
import request from "@/utils/request";

/**
 * 通用类型查询分页数据
 * @param {Object} queryParams [查询条件]
 */
export function pageDataList(queryParams) {
  return request({
    url: "/system/exprop/config/pageDataList",
    method: "post",
    data: queryParams
  });
}

/**
 * 保存新的扩展配置数据
 * @param {Object} queryParams
 */
export function saveData(queryParams) {
  return request({
    url: "/system/exprop/config/saveData",
    method: "post",
    data: queryParams
  });
}

/**
 * 删除扩展配置数据
 * @param {Object} queryParams
 */
export function delDataById(queryParams) {
  return request({
    url: "/system/exprop/config/delDataById",
    method: "post",
    data: queryParams
  });
}

/**
 * 修改扩展配置数据
 * @param {Object} queryParams
 */
export function updateData(queryParams) {
  return request({
    url: "/system/exprop/config/updateData",
    method: "post",
    data: queryParams
  });
}

/**
 * 获取配置详情加下拉属性
 * @param {String} pCode
 */
export function getConfigInfoById(id) {
  return request({
    url: "/system/exprop/config/getConfigInfoById?id=" + id,
    method: "get"
  });
}

/**
 * 获取通用分类以及扩展配置类型
 * @param {String} pCode
 */
export function getExtConfigTreeData(pCode) {
  return request({
    url: "/system/exprop/extConfigType/getExtConfigTreeData?pCode=" + pCode,
    method: "get"
  });
}

/**
 * 新增扩展配置类型
 * @param {Object} queryParams
 */
export function saveExtConfigType(queryParams) {
  return request({
    url: "/system/exprop/extConfigType/saveData",
    method: "post",
    data: queryParams
  });
}

/**
 * 修改扩展配置类型
 * @param {Object} queryParams
 */
export function updateExtConfigType(queryParams) {
  return request({
    url: "/system/exprop/extConfigType/updateData",
    method: "post",
    data: queryParams
  });
}
/**
 * 删除扩展配置类型
 * @param {Object} queryParams
 */
export function delExtConfigType(queryParams) {
  return request({
    url: "/system/exprop/extConfigType/delDataById",
    method: "post",
    data: queryParams
  });
}
