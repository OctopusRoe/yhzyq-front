import request from "@/utils/request";

const url = {
  getProcessCheckList: "/steps/gxProcessCheck/pageDataList",
  addProcessCheck: "/steps/gxProcessCheck/saveGxProcessCheck",
  updateProcessCheck: "/steps/gxProcessCheck/updateGxProcessCheck",
  getProcessChecById: "/steps/gxProcessCheck/getGxProcessCheckById",
  delProcessCheck: "/steps/gxProcessCheck/delGxProcessCheckById",
  getWbsTree: "/subitem/wbs/wbsTree",
  getProcessTree: "/subitem/wbs/getProcessByList",
  getUnitName: "/subitem/fjSection/findByOrgId",
  getProcessId: "/subitem/wbs/getProcessId",
  delProcess: "/steps/gxProcessCheck/delGxProcessCheckById",
  getProcessByFlowId: "/steps/gxProcessCheck/getGxProcessCheckByFlowId"
};

// 获取开工报告列表
export function getProcessCheckList(data) {
  return request({
    url: url.getProcessCheckList,
    data: data,
    method: "post"
  });
}

// 根据orgId获取分部分项工程树
export function getWbsTree(data) {
  return request({
    url: url.getWbsTree,
    params: data,
    method: "post"
  });
}

// 新增工序报验
export function addProcessCheck(data) {
  return request({
    url: url.addProcessCheck,
    data: data,
    method: "post"
  });
}

// 修改工序报验
export function updateProcessCheck(data) {
  return request({
    url: url.updateProcessCheck,
    data: data,
    method: "post"
  });
}

// 通过wbsId 获取工序树
export function getProcessTree(data) {
  return request({
    url: url.getProcessTree,
    params: data,
    method: "post"
  });
}

// 根据ID获取工序报验详情
export function getProcessChecById(data) {
  return request({
    url: url.getProcessChecById,
    params: data,
    method: "get"
  });
}

export function getUnitName(data) {
  return request({
    url: url.getUnitName,
    params: data,
    method: "get"
  });
}

// 根据ID获取工序详情
export function getProcessId(data) {
  return request({
    url: url.getProcessId,
    params: data,
    method: "post"
  });
}
// 根据ID删除工序详情
export function delProcess(data) {
  return request({
    url: url.delProcess,
    params: data,
    method: "post"
  });
}

// 根据流程实例ID获取工序报验详情
export function getProcessByFlowId(data) {
  return request({
    url: url.getProcessByFlowId,
    params: data,
    method: "get"
  });
}
