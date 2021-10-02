const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permissions: state => state.user.permissions,
  permission_routes: state => state.permission.routes,
  userInfo: state => state.user.info,
  processModel: state => state.process,

  selectedTask: state => state.selectedTask,

  processVariable: state => state.process.variables,

  processDataObj: state => state.process.dataObjects,

  processListeners: state => state.process.listeners,

  taskFormProps: state => state.selectedTask.formProperties,

  taskListeners: state => state.selectedTask.taskListeners,

  executionListeners: state => state.selectedTask.listeners,

  candidateGroups: state => state.selectedTask.candidateGroups,

  candidateUsers: state => state.selectedTask.candidateUsers,

  candidateRoles: state => state.selectedTask.candidateRoles,

  selectedUsers: state => state.selectedUsers,

  selectedUserGroups: state => state.selectedUserGroups,

  selectedUserRoles: state => state.selectedUserRoles,

  connectionListeners: state => state.selectedConnection.listeners,

  userOrgList: state => state.user.orgList,
  userCheckedOrg: state => state.user.checkedOrg,
  userCheckedOrgIndex: state => {
    return state.user.orgList.findIndex(
      item => item.id === state.user.checkedOrg.id
    );
  },

  isShowPageView: state => state.sys.isShowPageView,
  proposeInterceptor: state => state.selectedTask.proposeInterceptor,

  postPositionInterceptor: state => state.selectedTask.postPositionInterceptor,

  isTagsDisplayNone: state => state.settings.isTagsDisplayNone
};

export default getters;
