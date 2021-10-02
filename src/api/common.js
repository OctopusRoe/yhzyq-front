import request from "@/utils/request";

const url = {
  WBS_TREE: "/subitem/wbs/wbsTree",   // 工程树
  BASE_CONFIG: "/subitem/base/BaseConfigData",  // 系统配置
  BASE_ORG_CONFIG: "/subitem/baseOrg/orgBaseConfig",  //项目配置
  BASE_ORG_REPORT: "/subitem/baseOrg/orgBaseReportItem",  //报表配置
  BASE_ORG_PARAMETER: "/subitem/baseOrg/orgBaseParameterConfig", // 查询参数配置
  getSnowflakeId: "/system/Common/getSnowflakeId"
};

const methods = {
  getBaseList(groupId){
    let params = {"organize":"5", "defineCode":groupId};
    return request({url: url.BASE_CONFIG, method: "post", params: params});
  },
  getBaseOrgList(orgId, groupId){
    let params = {"orgId":orgId, "defineCode":groupId};
    return request({url: url.BASE_ORG_CONFIG, method: "post", params: params});
  },
  getBaseOrgReport(orgId, code){
    return request({url: url.BASE_ORG_REPORT+"?orgId="+orgId+"&reportCode="+code, method: "post"});
  },
  getBaseOrgParameter(orgId, code){
    return request({url: url.BASE_ORG_PARAMETER+"?orgId="+orgId+"&treeCode="+code, method: "post"});
  },
  getWbsTree(orgId){
    return request({url: url.WBS_TREE+"?orgId="+orgId, method: "post"});
  },
  getSnowflakeId(workerId) {
    return request({url: url.getSnowflakeId+"?workerId="+workerId+"&dataCenterId=1", method: "get"});
  }
};

export function getSnowflakeId(workerId) {
  return request({
    url: url.getSnowflakeId + "?workerId=" + workerId + "&dataCenterId=1",
    method: "get"
  });
}

export { methods };
