import request from '@/utils/request'

// 获取用户详细信息
export function getQueryDataSet() {
  return request({
    url: '/nocode/getQueryDataSet', method: 'post'
  })
}

export function getOperateDataSet() {
  return request({
    url: '/nocode/getOperateDataSet', method: 'post'
  })
}



export function getModelQuery() {
  return request({
    url: 'data/reDataCatalogModel/getTreeData', method: 'post'
  })
}

export function getTableQuery() {
  return request({
    url: '/data/reDataCatalogModel/getTableData', method: 'post'
  })
}

export function getTableData() {
  return request({
    url: '/data/reDataCatalogModel/getTableData',
    method: 'post'
  })
}

// export function getTreeData() {
//   return request({
//     url: '/data/reDataCatalogModel/getTreeData',
//     method: 'post'
//   })
// }

export function saveOrUpdateModel(data) {

  return request({
    url: '/data/reDataPhysicalEntity/saveOrUpdate',
    data: data,
    method: 'post'
  })
}






export function getAttributeList(data) {

  return request({
    url: '/data/reDataPhysicalEntity/getAttributeList',
    method: 'post',
    data:data
  })
}

