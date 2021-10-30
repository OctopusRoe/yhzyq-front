import Axios from "axios"
import request from "@/utils/request"

export const tileBaseUrl = 'http://106.225.147.187:7890/arcgis/rest/services/jx/JxMapblue2021/MapServer'

const path = {
  manageCenter: '/yhzyq/workJob/queryMangeCenter',
  typeCount: '/yhBigScreen/selectDeviceByTypeCount',
  deviceManager: '/yhDevice/selectDeviceByMangeCenter',
  centerCount: '/yhBigScreen/selectDeviceByCenterCount',
  workJobCount: '/yhBigScreen/selectCenterWorkJobCount',
  workJobInfo: '/yhBigScreen/selectWorkJobInfo',
  MonthWorkJobCount: '/yhMonthWorkJobCountBigScreen/select'
}

// 获取地图数据
export function getMapData () {
  return Axios.get(tileBaseUrl + '?f=pjson')
}

// 查询管理中心
export function queryMangeCenter () {
  return request.get(path.manageCenter)
}

// 查询设备总量
export function querySelectDeviceByTypeCount () {
  return request.get(path.typeCount)
}

// 查询全部设备信息
export function selectDeviceByMangeCenter (params) {
  return request.get(path.deviceManager, { params: params })
}

// 查询管理中心设备
export function queryCenterCount () {
  return request.get(path.centerCount)
}

// 管理中心施工情况
export function workJobCount () {
  return request.get(path.workJobCount)
}

// 施工信息
export function workJobInfo () {
  return request.get(path.workJobInfo)
}

// 月度施工信息
export function monthWorkJobCount () {
  return request.get(path.MonthWorkJobCount)
}