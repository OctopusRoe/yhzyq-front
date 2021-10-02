import request from "@/utils/request";

const url = {
  getCertificateList: "/steps/gxCompleteCertificate/pageDataList",
  addOrUpdateCertificate:
    "/steps/gxCompleteCertificate/saveOrUpdateGxCompleteCertificate",
    updateGxCompleteCertificate:
    "/steps/gxCompleteCertificate/updateGxCompleteCertificate",
  getCertificateById:
    "/steps/gxCompleteCertificate/getGxCompleteCertificateById",
  delCertificate: "/steps/gxCompleteCertificate/delGxCompleteCertificateById",
  getWbsTree: "/subitem/wbs/wbsTree",
  getProcessTree: "/subitem/wbs/getProcessByList",
  getUnitName: "/subitem/fjSection/findByOrgId",
  getProcessId: "/subitem/wbs/getProcessId",
  delProcess: "/steps/gxProcessCheck/delGxProcessCheckById",
  getSectionByList: "/subitem/wbs/getSectionByList",
  saveGxList: "/steps/gxList/saveGxList",
  updateGxList: "/steps/gxList/updateGxList",
  getRandomNumber: "/steps/gxList/getRandomNumber",
  getGxList: "/steps/gxList/pageDataList",
  getProcessByIds: "/subitem/wbs/getProcessListByIds",
  getGxListByWbsId: "/steps/gxList/getGxListByWbsId",
  getCompleteByFlowId: "/steps/gxCompleteCertificate/getGxCompleteCertificateByFlowId"
};

// 获取交工证书列表
export function getCertificateList(data) {
  return request({
    url: url.getCertificateList,
    data: data,
    method: "post"
  });
}

// 新增交工证书
export function addOrUpdateCertificate(data) {
  return request({
    url: url.addOrUpdateCertificate,
    data: data,
    method: "post"
  });
}

// 修改交工证书
export function updateGxCompleteCertificate(data) {
  return request({
    url: url.updateGxCompleteCertificate,
    data: data,
    method: "post"
  });
}

// 批量新增、交工证书从表
export function saveGxList(data) {
  return request({
    url: url.saveGxList,
    data: data,
    method: "post"
  });
}

// 批量修改、交工证书从表
export function updateGxList(data) {
  return request({
    url: url.updateGxList,
    data: data,
    method: "post"
  });
}

// 获取交工证书详情
export function getCertificateById(data) {
  return request({
    url: url.getCertificateById,
    params: data,
    method: "get"
  });
}

// 获取交工证书详情页面从表数据
export function getGxList(data) {
  return request({
    url: url.getGxList,
    data: data,
    method: "post"
  });
}

// 删除交工证书
export function delCertificate(data) {
  return request({
    url: url.delCertificate,
    params: data,
    method: "get"
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

export function getUnitName(data) {
  return request({
    url: url.getUnitName,
    params: data,
    method: "get"
  });
}

//根据标段实例编号wbsId获取挂接清单
export function getSectionByList(data) {
  return request({
    url: url.getSectionByList,
    params: data,
    method: "post"
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

// 获取一个19位随机ID
export function getRandomNumber() {
  return request({
    url: url.getRandomNumber,
    method: "post"
  });
}

// 根据ID获取工序详情
export function getProcessByIds(data) {
  return request({
    url: url.getProcessByIds,
    data: data,
    method: "post"
  });
}

// 获取交工证书详情页面从表数据
export function getGxListByWbsId(data) {
  return request({
    url: url.getGxListByWbsId,
    params: data,
    method: "get"
  });
}

// 获取交工证书详情
export function getCompleteByFlowId(data) {
  return request({
    url: url.getCompleteByFlowId,
    params: data,
    method: "get"
  });
}
