import request from '@/utils/request'


// 获取列表数据
export function getConfigPageData(queryParams) {
  return request({
    url: '/Ajax.jsonServlet?service=sysConfigAction&serviceMethod=pagedatalist',
    method: 'post',
    data: queryParams
  })
}

// 删除数据
export function delConfigById(id) {
  const data={
    id:id
  }
  return request({
    url: '/Ajax.jsonServlet?service=sysConfigAction&serviceMethod=del',
    method: 'post',
    data: data
  })
}

// 根据id获取数据
export function getConfigData(id) {
  const data={
    id:id
  }
  return request({
    url: '/Ajax.jsonServlet?service=sysConfigAction&serviceMethod=getById',
    method: 'post',
    data: data
  })
}

// 保存数据
export function saveConfigData(object) {
  return request({
    url: '/Ajax.jsonServlet?service=sysConfigAction&serviceMethod=addOrModefy',
    method: 'post',
    data: object
  })
}
