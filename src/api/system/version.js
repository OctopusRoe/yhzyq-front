import request from '@/utils/request'

// 查询列表
export function listVersion(query) {
  return request({
    url: '/Ajax.jsonServlet?service=vsAppVersionAction&serviceMethod=pagedatalist',
    method: 'post',
    params: query
  })
}


// 保存
export function addVersion(data) {
  return request({
    url: '/Ajax.jsonServlet?service=vsAppVersionAction&serviceMethod=addOrModefy',
    method: 'post',
    data: data
  })
}

// 获取
export function getById(id) {
  return request({
    url: '/Ajax.jsonServlet?service=vsAppVersionAction&serviceMethod=getById&id='+ id,
    method: 'post'
  })
}

// 删除
export function del(id) {
  return request({
    url: '/Ajax.jsonServlet?service=vsAppVersionAction&serviceMethod=del&id=' + id,
    method: 'post'
  })
}

// 获取类型
export function getAppType() {
  return request({
    url: '/a.eui?s=xtDictService&m=getDistsByTypeId&id=AppType',
    method: 'post'
  })
}
