import request from '@/utils/request'


// 获取列表数据
export function getPageData(queryParams) {
    return request({
        url: '/meterage/backlog/pageDataList',
        method: 'post',
        params: queryParams
    })
}

// 获取计量待办状态列表
export function getStateList() {
    return request({
        url: '/meterage/backlog/getStateList',
        method: 'get'
    })
}

// 删除数据
export function delById(id) {
    return request({
        url: '/meterage/backlog/delBacklogById/?id='+id,
        method: 'post'
    })
}

// 根据id获取数据
export function getById(id) {
    return request({
        url: '/meterage/backlog/getBacklogById?id='+id,
        method: 'get'
    })
}

// 保存数据
export function saveData(object) {
    return request({
        url: '/meterage/backlog/saveOrUpdateBacklog',
        method: 'post',
        data: object
    })
}
