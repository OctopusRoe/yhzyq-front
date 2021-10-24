import Axios from "axios"
import request from "@/utils/request"

export const tileBaseUrl = 'http://106.225.147.187:7890/arcgis/rest/services/jx/JxMapblue2021/MapServer'

// 获取地图数据
export function getMapData () {
  return Axios.get(tileBaseUrl + '?f=pjson')
}

// 查询管理中心
export function queryMangeCenter () {
  return request.get('/yhzyq/workJob/queryMangeCenter')
}

// 查询设备总量
export function querySelectDeviceByTypeCount () {
  return request.get('/yhBigScreen/selectDeviceByTypeCount')
}

// 查询全部设备信息
export function selectDeviceByMangeCenter (params) {
  return request.get('/yhDevice/selectDeviceByMangeCenter', { params: params })
}