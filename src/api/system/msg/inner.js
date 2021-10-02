import request from '@/utils/request'

//获取未读消息数量
export function countMsgUnread() {
    return request({
      url: '/meterage/msgRecvMessages/countMsgUnread',
      method: 'post',
    })
  }
  