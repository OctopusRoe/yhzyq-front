import request from '@/utils/request'

// 查询列表
export function listLog(query) {
  return request({
    url: '/Ajax.jsonServlet?service=blOperateLogAction&serviceMethod=pagedatalist',
    method: 'post',
    params: query
  })
}


// 获取
export function getById(id) {
  return request({
    url: '/Ajax.jsonServlet?service=blOperateLogAction&serviceMethod=getById&id='+ id,
    method: 'post'
  })
}

// 删除
export function del(id) {
  return request({
    url: '/Ajax.jsonServlet?service=blOperateLogAction&serviceMethod=del&id=' + id,
    method: 'post'
  })
}
