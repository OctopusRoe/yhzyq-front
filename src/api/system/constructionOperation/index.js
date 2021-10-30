/**
 * 施工作业
 */
import request from '@/utils/request'

const url = {
  delete: '/yhzyq/workJob/deleteWorkJob',
  pageDataList: '/yhzyq/workJob/pageDataList',
  saveOrUpdate: '/yhzyq/workJob/saveOrUpdate',
  selectById: '/yhzyq/workJob/selectById',
  queryMangeCenter: '/yhzyq/workJob/queryMangeCenter',
  roadInfo: '/geo/getRoadInfo',
  mileagePile: '/geo/getMileagePile'
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

/**
 * @description 查询公路
 * @param {Object} params
 * @param {Number} params.pageNum 起始页面
 * @param {Number} params.pageSize 列表展示大小
 * @param {String} params.roadCode 路线编码,或者文字
 * @returns 
 */
export function getHighwayInfo (params) {
  return request({
    url: url.roadInfo,
    method: 'get',
    params
  })
}

/**
 * @description 查询桩号
 * @param {Object} params
 * @param {Number} params.pageNum 起始页面
 * @param {Number} params.pageSize 列表展示大小
 * @param {String} params.roadCode 路线编码,或者文字
 * @returns 
 */
export function getMileagePile (params) {
  return request({
    url: url.mileagePile,
    method: 'get',
    params
  })
}