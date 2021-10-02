import request from '@/utils/request'




// 获取角色列表数据
export function getAllRolePageData(queryParams) {
  return request({
    url: '/ucRoleAction-getAllRoleList.do',
    method: 'post',
    params: queryParams
  })
}


// 保存岗位用户详情
export function saveUserRole(object) {
  return request({
    url: '/ucRoleAction-userChooseRole.do',
    method: 'post',
    params:object
  })
}










