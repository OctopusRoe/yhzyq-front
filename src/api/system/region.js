import request from '@/utils/request'

// 查询列表
export function listRegion(query) {
  return request({
    url: '/Ajax.jsonServlet?service=ucRegionService&serviceMethod=pagelist',
    method: 'post',
    params: query
  })
}

// 国家查询列表
export function listCountry() {
  return request({
    url: '/Ajax.jsonServlet?service=ucCountryAction&serviceMethod=pagedatalist',
    method: 'post'
  })
}

// 保存
export function addRegion(data) {
  return request({
    url: '/Ajax.jsonServlet?service=ucRegionAction&serviceMethod=add',
    method: 'post',
    data: data
  })
}

// 获取
export function getById(id) {
  return request({
    url: '/Ajax.jsonServlet?service=ucRegionAction&serviceMethod=getById&id='+ id,
    method: 'post'
  })
}
// 导出
export function　export1(data) {
  return request({
    url: '/Ajax.jsonServlet?service=ucRegionAction&serviceMethod=export1',
    method: 'post'
  })
}
// 删除
export function del(id) {
  return request({
    url: '/Ajax.jsonServlet?service=ucRegionAction&serviceMethod&del=' + id,
    method: 'post'
  })
}

// 获取国家
export function getCountry() {
  return request({
    url: '/Ajax.jsonServlet?service=ucCountryService&serviceMethod=list',
    method: 'post'
  })
}

// 获取地区
export function getRegion(id) {
  return request({
    url: '/Ajax.jsonServlet?service=ucRegionService&serviceMethod=getCityByCode&cid='+id,
    method: 'post'
  })
}
