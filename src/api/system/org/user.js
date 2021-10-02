import request from '@/utils/request'




// 获取机构用户列表数据
export function getUserPageData(queryParams) {
  return request({
    url: '/ucUserResourcesAction-getUserList.do',
    method: 'post',
    params: queryParams
  })
}

// 获取机构用户详情
export function getUserById(id) {
  return request({
    url: '/orgUserAction-getById.do?id='+id,
    method: 'get'
  })
}

// 保存机构用户详情
export function saveUser(object) {
  return request({
    url: '/ucRoleGroupAction-addUser.do',
    method: 'post',
    params:object
  })
}
// 保存机构用户详情
export function editUser(object) {
  return request({
    url: '/ucRoleGroupAction-editUser.do',
    method: 'post',
    params:object
  })
}
// 删除机构用户详情
export function delOrgUserById(id) {
  return request({
    url: '/Ajax.jsonServlet?service=ucUserService&serviceMethod=del&id='+id,
    method: 'post'
  })
}

// 删除机构用户详情
export function getUserDuty(id) {
  const object={id:id}
  return request({
    url: '/orgDutyAction-getAllDuty.do',
    method: 'post',
    params:object
  })
}

// 用户修改密码
export function modifyPassword(object) {
  return request({
    url: '/Ajax.jsonServlet?service=ucUserService&serviceMethod=changeOtherPassWord',
    method: 'post',
    params:object
  })
}










