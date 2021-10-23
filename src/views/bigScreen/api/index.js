import Axios from "axios"
import request from "@/utils/request"

export const tileBaseUrl = 'https://yhxt.jxgsgl.com:7031/arcgis/rest/services/jx/JxMapblue2021/MapServer'

export function getMapData () {
  return Axios.get(tileBaseUrl + '?f=pjson')
}