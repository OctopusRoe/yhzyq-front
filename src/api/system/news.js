import request from '@/utils/request'

// 树型
export function treeDatas(query) {
  return request({
    url: '/Ajax.jsonServlet?service=newsNewsAction&serviceMethod=treeDatas',
    method: 'post',
    params: query
  })
}
//保存目录
export  function addNode() {
  return request({
    url: '/Ajax.jsonServlet?service=xtCommonTypeAction&serviceMethod=modefy',
    method: 'post',
    data: data
  })
}

//获取目录
export  function getNodeById(id) {
  return request({
    url: '/Ajax.jsonServlet?service=xtCommonTypeAction&serviceMethod=getById&id='+ id,
    method: 'post'
  })
}
//删除目录
export  function delNode(id) {
  return request({
    url: '/Ajax.jsonServlet?service=xtCommonTypeAction&serviceMethod=del&id='+ id,
    method: 'post'
  })
}

// 查询列表
export function listNews(query) {
  return request({
    url: '/Ajax.jsonServlet?service=newsNewsAction&serviceMethod=pagedatalist',
    method: 'post',
    params: query
  })
}


// 保存
export function addNews(data) {
  return request({
    url: '/Ajax.jsonServlet?service=newsNewsAction&serviceMethod=addOrModefy',
    method: 'post',
    data: data
  })
}

// 获取
export function getById(id) {
  return request({
    url: '/Ajax.jsonServlet?service=newsNewsAction&serviceMethod=getById&id='+ id,
    method: 'post'
  })
}

// 删除
export function del(id) {
  return request({
    url: '/Ajax.jsonServlet?service=newsNewsAction&serviceMethod=del&id=' + id,
    method: 'post'
  })
}

