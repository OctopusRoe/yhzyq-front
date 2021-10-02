import request from "@/utils/request";

const url = {
  pageDataList: "/system/xtNumRule/pageDataList", // 获取编码规则
  saveOrUpdateXtNumRule: "/system/xtNumRule/saveOrUpdateXtNumRule", // 保存或修改编码规则
  delXtNumRuleById: "/system/xtNumRule/delXtNumRuleById", // 根据id删除
  batchDeleteCode: "/system/xtNumRule/batchDeleteCode" // 批量删除
};

// 获取缓存所有系统
export function pageDataList(data) {
  return request({
    url: url.pageDataList,
    method: "get",
    params: data
  });
}

// 保存或修改编码规则
export function saveOrUpdateXtNumRule(data) {
  return request({
    url: url.saveOrUpdateXtNumRule,
    method: "post",
    data: data
  });
}

// 根据id删除
export function delXtNumRuleById(data) {
  return request({
    url: url.delXtNumRuleById,
    method: "post",
    data: data
  });
}

// 保存或修改编码规则
export function batchDeleteCode(data) {
  return request({
    url: url.batchDeleteCode,
    method: "post",
    data: data
  });
}
