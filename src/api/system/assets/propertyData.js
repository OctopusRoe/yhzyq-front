/**
 * 扩展配置及扩展配置类型
 */
import request from "@/utils/request";

/**
 * 根据通用分类id查询扩展配置类型
 */
export function queryExtConfigTypeList(commonTypeId) {
  return request({
    url:
      "/system/exprop/extConfigType/queryExtConFigTypeList?commonTypeId=" +
      commonTypeId,
    method: "get"
  });
}

/**
 * 获取扩展属性详情
 * @param {Object} queryParams
 */
export function queryDetailInfo(queryParams) {
  return request({
    url: "/system/exprop/propertyData/queryDetailInfo",
    method: "post",
    data: queryParams
  });
}

/**
 * 保存或者更新数据
 * @param {Object} queryParams
 */
export function saveOrUpdate(queryParams) {
  return request({
    url: "/system/exprop/propertyData/saveOrUpdate",
    method: "post",
    data: queryParams
  });
}
