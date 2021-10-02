import request from "@/utils/request";

/**
 * 查询数据列表
 * @param {Object} queryParams [请求数据]
 */
export function queryDataList(queryParams) {
  return request({
    url: "/assets/titleMapping/queryDataList",
    method: "post",
    data: queryParams
  });
}

/**
 * 根据id获取详情
 * @param {*} id
 */
export function getDataById(id) {
  return request({
    url: "/assets/titleMapping/getDataById?id=" + id,
    method: "get"
  });
}
/**
 * 修改数据
 * @param {Object} queryParams [请求数据]
 */
export function updateData(queryParams) {
  return request({
    url: "/assets/titleMapping/updateData",
    method: "post",
    data: queryParams
  });
}

/**
 * 保存数据
 * @param {Object} queryParams [请求数据]
 */
export function saveData(queryParams) {
  return request({
    url: "/assets/titleMapping/saveData",
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
    url: "/assets/titleMapping/delDataById",
    method: "post",
    data: queryParams
  });
}
