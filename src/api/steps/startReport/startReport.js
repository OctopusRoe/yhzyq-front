import request from "@/utils/request";

const url = {
  getStartReportList: "/steps/gxStartReport/pageDataList",
  addStartReport: "/steps/gxStartReport/saveGxStartReport",
  updateStartReport: "/steps/gxStartReport/updateGxStartReport",
  getStartReportDetil: "/steps/gxStartReport/getGxStartReportById",
  delGxStartReportById: "/steps/gxStartReport/delGxStartReportById",
  getWbsTree: "/subitem/wbs/wbsTree",
  getUnitName: "/subitem/fjSection/findByOrgId",
  saveReportCode: "/steps/gxStartReport/getReportCode",
  getHistoryById: "/steps/gxStartReport/getHistoryById",
  getFjCount: "/file/attach/getCountByBussiness",
  getOrgBaseReport: "/subitem/baseOrg/orgBaseReport"
};

// 获取开工报告列表
export function getStartReportList(data) {
  return request({
    url: url.getStartReportList,
    data: data,
    method: "post"
  });
}
// 新增开工报告
export function addStartReport(data) {
  return request({
    url: url.addStartReport,
    data: data,
    method: "post"
  });
}

// 修改开工报告
export function updateStartReport(data) {
  return request({
    url: url.updateStartReport,
    data: data,
    method: "post"
  });
}

// 获取开工报告详情
export function getStartReportDetil(params) {
  return request({
    url: url.getStartReportDetil,
    params: params,
    method: "get"
  });
}

// 根据ID删除开工报告
export function delGxStartReportById(params) {
  return request({
    url: url.delGxStartReportById,
    params: params,
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

//获取开工报告编码（测试中待修改）
export function saveReportCode() {
  return request({
    url: url.saveReportCode,
    method: "get"
  });
}

//获取审批历史记录
export function getHistoryById(data) {
  return request({
    url: url.getHistoryById,
    params: data,
    method: "get"
  });
}

//获取附件数量
export function getFjCount(data) {
  return request({
    url: url.getFjCount,
    params: data,
    method: "get"
  });
}

//获取报表地址等信息
export function getOrgBaseReport(data) {
  return request({
    url: url.getOrgBaseReport,
    params: data,
    method: "get"
  });
}
