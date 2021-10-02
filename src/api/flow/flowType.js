import request from "@/utils/request";

const url = {
  queryFlowType: "/workflow/flowType/queryFlowType",
  queryFlowTypeByType: "/workflow/flowType/queryFlowTypeByType",
  queryFlowTypeTree:"/workflow/flowType/queryFlowTypeTree",
  saveOrUpdateFlowType:"/workflow/flowType/saveOrUpdateFlowType",
  deleteFlowType:"/workflow/flowType/deleteFlowType",
};
// 查询流程类型树
export function queryFlowTypeTree(data) {
  return request({
    url: url.queryFlowTypeTree,
    method: "get",
    params:data
  });
}
// 查询流程类型列表
export function queryFlowType(data) {
  return request({
    url: url.queryFlowType,
    method: "get",
    params: data
  });
}

// 查询流程类型列表
export function queryFlowTypeByType(data) {
  return request({
    url: url.queryFlowTypeByType,
    method: "get",
    params: data
  });
}

// 新增流程类型列表
export function saveOrUpdateFlowType(data) {
  return request({
    url: url.saveOrUpdateFlowType,
    method: "post",
    params: data
  });
}

// 新增流程类型列表
export function deleteFlowType(data) {
  return request({
    url: url.deleteFlowType,
    method: "post",
    params: data
  });
}



