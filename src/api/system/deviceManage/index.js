/**
 * 设备管理
 */
import request from '@/utils/request'

const url = {
    pageDataList: '/yhDevice/pageDataList',
    delete: '/yhDevice/delete',
    save: '/yhDevice/save',
    selectById: '/yhDevice/selectById'
}

// 删除设备
export function deleteDev(data) {
    return request({
        url: url.delete,
        method: "delete",
        data
    });
}
// 获取设备列表
export function getListDev(params) {
    return request({
        url: url.pageDataList,
        method: "get",
        params
    });
}
// 新增/修改设备
export function saveDev(data) {
    return request({
        url: url.save,
        method: "post",
        data
    });
}
// 根据id查询详情
export function selectByIdDev(params) {
    return request({
        url: url.selectById,
        method: "get",
        params
    });
}