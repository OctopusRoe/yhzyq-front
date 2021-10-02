import request from '@/utils/request'


//条件查询
export function getMsgByConditions(queryData) {
  return request({
    url: '/meterage/msgMessages/getMsgByConditions',
    method: 'post',
    data: queryData
  })
}




//消息删除
export function deleteMsg(id) {
  return request({
    url: '/meterage/msgMessages/delMsgMessagesById',
    method: 'post',
    data: id
  })
}

//消息批量删除
export function deleteMsgMulti(ids) {
  return request({
    url: '/meterage/msgMessages/delMsgByIds',
    method: 'post',
    data: ids
  })
}