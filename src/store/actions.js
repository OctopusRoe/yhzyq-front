export const loadCanvas = ({
  commit
}, canvas) => commit("loadCanvas", canvas)

export const setSelectedTask = ({
  commit
}, task) => commit("setSelectedTask", task)

//保存流程常规属性
export const saveProcessGeneral = ({
  commit
}, prop) => commit("saveProcessGeneral", prop)

export const loadProcessProp = ({
  commit
}, model) => commit("loadProcessProp", model)

export const saveProcessVariable = ({
  commit
}, rowData) => {
  commit("saveProcessVariable", rowData)
}

export const delProcessVariable = ({
  commit
}, id) => {
  commit('delProcessVariable', id)
}

export const updateProcessVariable = ({
  commit
}, rowData) => {
  commit('updateProcessVariable', rowData)
}

export const saveProcessDataObj = ({
  commit
}, rowData) => {
  commit("saveProcessDataObj", rowData)
}

export const delProcessDataObj = ({
  commit
}, id) => {
  commit('delProcessDataObj', id)
}

export const updateProcessDataObj = ({
  commit
}, rowData) => {
  commit('updateProcessDataObj', rowData)
}

export const saveProcessListener = ({
  commit
}, payload) => {
  commit('saveProcessListener', payload)
}

export const saveTaskGeneral = ({
  commit
}, form) => {
  commit('saveTaskGeneral', form)
}

export const saveTaskPerformer = ({
  commit
}, form) => {
  commit('saveTaskPerformer', form)
}

export const delProcessListener = ({
  commit
}, id) => {
  commit('delProcessListener', id)
}

export const saveTaskForm = ({
  commit
}, payload) => {
  commit('saveTaskForm', payload)
}

export const delTaskForm = ({
  commit
}, id) => {
  commit('delTaskForm', id)
}

export const delTaskListener = ({
  commit
}, id) => {
  commit('delTaskListener', id)
}

export const delExecutionListener = ({
  commit
}, id) => {
  commit('delExecutionListener', id)
}

export const saveTaskListener = ({
  commit
}, payload) => {
  commit('saveTaskListener', payload)
}

export const saveExecutionListener = ({
  commit
}, payload) => {
  commit('saveExecutionListener', payload)
}

export const saveTaskMultiInstance = ({
  commit
}, form) => {
  commit('saveTaskMultiInstance', form)
}

export const delCandidateUser = ({
  commit
}, id) => {
  commit('delCandidateUser', id)
}

export const delCandidateGroup = ({
  commit
}, name) => {
  commit('delCandidateGroup', id)
}

export const delCandidateRole = ({
  commit
}, name) => {
  commit('delCandidateRole', id)
}

export const saveCandidateGroups = ({
  commit
}) => {
  commit('saveCandidateGroups')
}

export const saveCandidateUsers = ({
  commit
}) => {
  commit('saveCandidateUsers')
}

export const saveCandidateRoles = ({
  commit
}) => {
  commit('saveCandidateRoles')
}

export const initSelectedUsers = ({
  commit
}, users) => {
  commit('initSelectedUsers', users)
}

export const addSelectedUsers = ({
  commit
}, users) => {
  commit('addSelectedUsers', users)
}

export const delSelectedUsers = ({
  commit
}, user) => {
  commit('delSelectedUsers', user)
}

export const initSelectedUserGroups = ({
  commit
}, groups) => {
  commit('initSelectedUserGroups', groups)
}

export const addSelectedUserGroups = ({
  commit
}, groups) => {
  commit('addSelectedUserGroups', groups)
}

export const delSelectedUserGroups = ({
  commit
}, group) => {
  commit('delSelectedUserGroups', group)
}

export const initSelectedUserRoles = ({
  commit
}, roles) => {
  commit('initSelectedUserRoles', roles)
}

export const addSelectedUserRoles = ({
  commit
}, roles) => {
  commit('addSelectedUserRoles', roles)
}

export const delSelectedUserRoles = ({
  commit
}, roles) => {
  commit('delSelectedUserRoles', roles)
}

export const saveTaskScript = ({
  commit
}, form) => {
  commit('saveTaskScript', form)
}

export const saveTaskMail = ({
  commit
}, form) => {
  commit('saveTaskMail', form)
}

export const saveTaskService = ({
  commit
}, payload) => {
  commit('saveTaskService', payload)
}

export const saveBusinessRule = ({
  commit
}, form) => {
  commit('saveBusinessRule', form)
}

export const saveInputParams = ({
  commit
}, form) => {
  commit('saveInputParams', form)
}

export const saveOutputParams = ({
  commit
}, form) => {
  commit('saveOutputParams', form)
}

export const saveCallActivity = ({
  commit
}, form) => {
  commit('saveCallActivity', form)
}

export const setSelectedConnection = ({
  commit
}, connection) => {
  commit('setSelectedConnection', connection)
}

export const saveConnectionGeneral = ({
  commit
}, form) => {
  commit('saveConnectionGeneral', form)
}

export const saveConnectionCondition = ({
  commit
}, form) => {
  commit('saveConnectionCondition', form)
}

export const delConnectionListener = ({
  commit
}, form) => {
  commit('delConnectionListener', form)
}

export const saveConnectionListener = ({
  commit
}, payload) => {
  commit('saveConnectionListener', payload)
}

export const setProcess = ({
  commit
}, process) => {
  commit('setProcess', process)
}

export const setSubProcess = ({
  commit
}, subProcess) => {
  commit('setSubProcess', subProcess)
}

export const saveSubProcessGeneral = ({
  commit
}, form) => {
  commit('saveSubProcessGeneral', form)
}

export const saveSubProcessMultilInstance = ({
  commit
}, form) => {
  commit('saveSubProcessMultilInstance', form)
}


export const saveProposeInterceptor = ({
  commit
}, form) => {
  commit('saveProposeInterceptor', form)
}


export const savePostPositionInterceptor = ({
  commit
}, form) => {
  commit('savePostPositionInterceptor', form)
}
