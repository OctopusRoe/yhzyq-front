import request from '@/utils/request'

const url = {
  listFlow: '/workflow/process/list',
  deleteFlow: '/workflow/process/del',
  deployByJson: '/workflow/process/deployByJson',
  copyFlow: '/workflow/process/copyFlow',
  saveBusinessFlowRelation: '/workflow/process/saveBusinessFlowRelation'
}

// 查询流程定义
export function listFlow(data) {
  return request({
    url: url.listFlow,
    method: 'post',
    params: data
  })
}

// 删除流程定义
export function deleteFlow(data) {
  return request({
    url: url.deleteFlow,
    method: 'post',
    data: data
  })
}

// 部署流程
export function deployByJson(data) {
  return request({
    url: url.deployByJson,
    method: 'post',
    data: data
  })
}

// 保存业务流程关系
export function saveBusinessFlowRelation(data) {
  return request({
    url: url.saveBusinessFlowRelation,
    method: 'post',
    data: data
  })
}

export function copyFlow(data) {
  return request({
    url: url.copyFlow,
    method: 'post',
    data: data
  })
}
