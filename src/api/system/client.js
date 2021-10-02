import request from "@/utils/request";

const url = {
  pageDataList: "/system/client/pageDataList",
  saveOrUpdateClient: "/system/client/saveOrUpdateClient",
  getClientById: "/system/client/getClientById",
  delClientById: "/system/client/delClientById",
  batchDeleteClient: "/system/client/batchDeleteClient"
};

// 分页获取客户端数据
export function pageDataList(data) {
  return request({
    url: url.pageDataList,
    method: "post",
    data: data,
    params: data
  });
}

// 添加与修改客户端数据
export function saveOrUpdateClient(data) {
  return request({
    url: url.saveOrUpdateClient,
    method: "post",
    data: data
  });
}

// 根据客户端id获取数据
export function getClientById(data) {
  return request({
    url: url.getClientById,
    method: "get",
    params: data
  });
}

// 根据客户端id删除数据
export function delClientById(data) {
  return request({
    url: url.delClientById,
    method: "post",
    data: data
  });
}

// 批量删除客户端
export function batchDeleteClient(data) {
  return request({
    url: url.batchDeleteClient,
    method: "post",
    data: data
  });
}
