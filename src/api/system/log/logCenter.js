import request from '@/utils/request'

//条件查询
export function getLogByConditions(queryData) {
    return request({
      url: '/meterage/xtOperateLog/getLogByConditions',
      method: 'post',
      data: queryData
    })
  }
  