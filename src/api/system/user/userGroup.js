import request from '@/utils/request'

const url = {
  userGroupList: "/system/group/pagedatalist",
  addUserGroup:"/system/group/saveOrUpdateGroup",
  deleteUserGroup:"/system/group/delGroupId",
  getUserGroupById:"/system/group/getGroupId"
};


export function userGroupList(data) {
  return request({
    url: url.userGroupList,
    method: 'get',
    params:data
  });
}

export function addUserGroup(data) {
  return request({
    url: url.addUserGroup,
    method: 'post',
    data:data
  });
}
export function deleteUserGroup(data) {
  return request({
    url: url.deleteUserGroup,
    method: 'post',
    data:data
  });
}
export function getUserGroupById(data) {
  return request({
    url: url.getUserGroupById,
    method: 'post',
    data:data
  });
}
