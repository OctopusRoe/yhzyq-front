/**
 * 施工作业
 */
import request from '@/utils/request'

const url = {
  delete: '/yhzyq/workJob/deleteWorkJob',
  pageDataList: '/yhzyq/workJob/pageDataList',
  saveOrUpdate: '/yhzyq/workJob/saveOrUpdate',
  selectById: '/yhzyq/workJob/selectById',
  queryMangeCenter: '/yhzyq/workJob/queryMangeCenter'
}

// 删除施工作业
export function deleteWor (data) {
  return request({
    url: url.delete,
    method: "delete",
    data
  });
}

// 分页查询施工作业
export function getListWor (params) {
  return request({
    url: url.pageDataList,
    method: "get",
    params
  });
}

// 新增/修改施工作业
export function saveWor (data) {
  return request({
    url: url.saveOrUpdate,
    method: "post",
    data
  });
}

// 根据id查询详情
export function selectByIdWor (params) {
  return request({
    url: url.selectById,
    method: "get",
    params
  });
}

// 查询管理中心
export function queryMangeCenter (params) {
  return request({
    url: url.queryMangeCenter,
    method: "get",
    params
  });
}

// export function getHighwayInfo() {
//   return request({
//     url: url.
//   })
// }