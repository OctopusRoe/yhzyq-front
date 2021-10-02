import request from "@/utils/request";

const url = {
  startFlow: "/workflow/process/start",
  examineFlow:"/workflow/process/examine",
  examineBatch:"/workflow/process/examineBatch",
  queryRelation:"/workflow/process/queryBusinessFlowRelation",
  rejectFlow:"/workflow/process/reject",
  queryNodeList:"/workflow/process/queryNodeList",

};
// 启动流程
export function startFlow(data) {
  return request({
    url: url.startFlow,
    method: "get",
    params:data
  });
}

// 查询业务与流程关系
export function queryRelation(data) {
  return request({
    url: url.queryRelation,
    method: "get",
    params:data
  });
}

// 审核流程
export function examineFlow(data) {
  return request({
    url: url.examineFlow,
    method: "get",
    params:data
  });
}
// 审核流程
export function batchExamineFlow(data) {
  return request({
    url: url.examineBatch,
    method: "get",
    params:data
  });
}
// 驳回
export function rejectFlow(data) {
  return request({
    url: url.rejectFlow,
    method: "get",
    params:data
  });
}

// 查询节点
export function queryNodeList(data) {
  return request({
    url: url.queryNodeList,
    method: "get",
    params:data
  });
}

