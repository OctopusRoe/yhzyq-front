import request from '@/utils/request'

// 获取通用类型树状数据
export function getCommonTypeTree(url, query) {
  return request({
    url: url,
    method: 'get',
    params: query
  })
}

export function getCommTypeTree(params) {
  let url = '/xtCommonType-treeData.do'
  return request({
    url: url,
    method: 'get',
    params: query
  })
}

export function delTreeNode(url) {
  return request({
    url: url,
    method: 'get'
  })
}

export function getCommonTypeData(id) {
  return request({
    url: 'xtCommonTypeAction-getById.do?id=' + id,
    method: 'get'
  })
}

export function saveCommonType(object) {
  return request({
    url: 'xtCommonTypeAction-addCommtype.do',
    method: 'post',
    params: object
  })
}

