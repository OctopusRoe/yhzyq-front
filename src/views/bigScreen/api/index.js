import Axios from "axios"
import request from "@/utils/request"

export const tileBaseUrl = 'https://yhxt.jxgsgl.com:7031/arcgis/rest/services/jx/JxMapblue2021/MapServer'

export const mentListUrl = 'https://yh.jxgsgl.com:6443/portal/uum/v1/getSubSystem'

const path = {
  manageCenter: '/yhzyq/workJob/queryMangeCenter',
  typeCount: '/yhBigScreen/selectDeviceByTypeCount',
  deviceManager: '/yhDevice/selectDeviceByMangeCenter',
  centerCount: '/yhBigScreen/selectDeviceByCenterCount',
  workJobCount: '/yhBigScreen/selectCenterWorkJobCount',
  workJobInfo: '/yhBigScreen/selectWorkJobInfo',
  MonthWorkJobCount: '/yhBigScreen/selectMonthWorkJobCount',
  queryLonAndLatByZH: '/yhzyq/workJob/queryLonAndLatByZH',
  getCameraPreviewURL: '/camera/getCameraPreviewURL'
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
export function workJobInfo (params) {
  return request.get(path.workJobInfo, { params: params })
}

// 月度施工信息
export function monthWorkJobCount (params) {
  return request.get(path.MonthWorkJobCount, { params: params })
}

// 查询施工路段的经纬度
export function queryLonAndLatByZH (params) {
  return request.get(path.queryLonAndLatByZH, { params: params })
}

// 查询摄像头流地址
export function getCameraPreviewURL (params) {
  return request.get(path.getCameraPreviewURL, { params: params })
}

// 获取转跳列表
export function getMenuList (params) {
  return request.post(mentListUrl,
    { data: params },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
}