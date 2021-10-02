import request from '@/utils/request'


// 获取列表数据
export function getAccountPageData(queryParams) {
  return request({
    url: '/Ajax.jsonServlet?service=msgWechatMenuAction&serviceMethod=weChatNumLists',
    method: 'post',
    params: queryParams
  })
}

// 删除数据
export function delAccountById(id) {
  const data={
    id:id
  }
  return request({
    url: '/Ajax.jsonServlet?service=msgWechatMenuAction&serviceMethod=delChatNum',
    method: 'post',
    data: data
  })
}

// 根据id获取数据
export function getAccountData(id) {
  const data={
    id:id
  }
  return request({
    url: '/Ajax.jsonServlet?service=msgWechatMenuAction&serviceMethod=getChatNumById',
    method: 'post',
    data: data
  })
}

// 保存数据
export function addAccountData(object) {
  return request({
    url: '/Ajax.jsonServlet?service=msgWechatMenuAction&serviceMethod=add',
    method: 'post',
    data: object
  })
}

// 保存数据
export function updateAccountData(object) {
  return request({
    url: '/Ajax.jsonServlet?service=msgWechatMenuAction&serviceMethod=updataChatNum',
    method: 'post',
    data: object
  })
}
