import request from '@/utils/request'

// 查询列表
export function listTiming(query) {
  return request({
    url: '/Ajax.jsonServlet?service=schedulerAction&serviceMethod=pagedatalist',
    method: 'post',
    params: query
  })
}

// 保存
export function addTiming(data) {
  return request({
    url: '/Ajax.jsonServlet?service=schedulerAction&serviceMethod=add',
    method: 'post',
    data: data
  })
}

// 暂停
export function pauseTiming(id) {
  return request({
    url: '/Ajax.jsonServlet?service=schedulerAction&serviceMethod=pause&id='+ id,
    method: 'post'
  })
}
// 恢复
export function playTiming(id) {
  return request({
    url: '/Ajax.jsonServlet?service=schedulerAction&serviceMethod=resume&id='+ id,
    method: 'post'
  })
}
// 删除
export function delTiming(id) {
  return request({
    url: '/Ajax.jsonServlet?service=schedulerAction&serviceMethod=del&id=' + id,
    method: 'post'
  })
}
