import request from '@/utils/request'


//
export function download2(queryParams) {
  return request({
    responseType:'blob',
    url: '/meterage/luckysheet/download',
    method: 'post',
    data: queryParams
  })
}
//
export function getConfigData(periodId) {
  return request({
    url: '/meterage/luckysheet/getConfigData?periodId='+periodId,
    method: 'get'
  })
}

export function saveData(obj) {
  return request({
    url: '/meterage/luckysheet/saveData',
    method: 'post',
    data:obj
  })
}
