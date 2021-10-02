import request from "@/utils/request";

const url = {
  queryDaiBanTask: "/workflow/process/queryDaiBanTask",
  queryHistory:"/workflow/process/queryHistory"
};

// 查询流程定义
export function queryDaiBanTask(data) {
  return request({
    url: url.queryDaiBanTask,
    method: "post",
    data: data
  });
}

// 查询审核记录
export function queryHistory(data) {
  return request({
    url: url.queryHistory,
    method: "get",
    params: data
  });
}
