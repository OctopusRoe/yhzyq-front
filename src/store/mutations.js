import ESTDesigner from '../components/flow/node/Packages'
import '../components/flow/node/Application'
import '../components/flow/node/Task'

export const loadCanvas = (state, canvas) => {
  state.canvas = canvas

}

export const setProcess = (state, process) => {
  state.process = process
}

export const setSelectedTask = (state, task) => {
  state.selectedTask = task
}

//保存流程常规属性
export const saveProcessGeneral = (state, prop) => {
  state.process.id = prop.id
  state.process.name = prop.name
  state.process.category = prop.category
  state.process.documentation = prop.documentation
  state.process.callBack = prop.callBack
}


export const loadProcessProp = (state, model) => {
  //console.log("vuex更新state", model)
  state.process = model
}

export const saveProcessVariable = (state, rowData) => {
  var variable = new ESTDesigner.model.Variable()
  variable.name = rowData.name
  variable.type = rowData.type
  variable.scope = rowData.scope
  variable.defaultValue = rowData.defaultValue
  variable.remark = rowData.remark
  state.process.addVariable(variable)
}

export const delProcessVariable = (state, id) => {
  state.process.deleteVariable(id)
}

export const updateProcessVariable = (state, rowData) => {
  let variable = state.process.getVariable(rowData.id)
  variable.name = rowData.name
  variable.type = rowData.type
  variable.scope = rowData.scope
  variable.defaultValue = rowData.defaultValue
  variable.remark = rowData.remark
}

export const saveProcessDataObj = (state, rowData) => {
  var dataObject = new ESTDesigner.model.DataObject()
  dataObject.name = rowData.name
  dataObject.type = rowData.type
  dataObject.value = rowData.value
  state.process.addDataObject(dataObject)
}

export const delProcessDataObj = (state, id) => {
  state.process.deleteDataObject(id)
}

export const updateProcessDataObj = (state, rowData) => {
  let oldDataObj = state.process.getDataObject(rowData.id)
  oldDataObj.name = rowData.name
  oldDataObj.type = rowData.type
  oldDataObj.value = rowData.value
}

export const saveProcessListener = (state, payload) => {
  let form = payload.form
  let insertFields = payload.insertFields
  let updateFields = payload.updateFields
  let delFields = payload.delFields
  let listener = state.process.getListener(form.id)
  if (listener == null) {
    listener = new ESTDesigner.model.Listener()
    listener.event = form.listenerEventType
    listener.serviceType = form.listenerServiceType
    listener.serviceClass = form.listenerServiceClass
    listener.serviceExpression = form.listenerServiceExpression

    if (insertFields != null && insertFields != undefined) {
      insertFields.forEach(rowData => {
        let field = new ESTDesigner.model.Field()
        field.name = rowData.fieldName
        field.type = rowData.type
        field.value = rowData.value
        listener.setField(field)
      })
    }
    state.process.addListener(listener)
  } else {
    listener.event = form.listenerEventType
    listener.serviceType = form.listenerServiceType
    listener.serviceClass = form.listenerServiceClass
    listener.serviceExpression = form.listenerServiceExpression
    if (insertFields != null && insertFields != undefined) {
      insertFields.forEach(rowData => {
        let field = new ESTDesigner.model.Field()
        field.name = rowData.fieldName
        field.type = rowData.type
        field.value = rowData.value
        listener.setField(field)
      })
    }
    if (updateFields != null && updateFields != undefined) {
      updateFields.forEach(rowData => {
        let field = listener.getField(rowData.id)
        field.name = rowData.fieldName
        field.type = rowData.type
        field.value = rowData.value
      })
    }
    if (delFields != null && delFields != undefined) {
      delFields.forEach(rowData => {
        listener.deleteField(rowData.id)
      })
    }
  }
}

export const delProcessListener = (state, id) => {
  state.process.deleteListener(id)
}

export const saveTaskGeneral = (state, form) => {
  state.selectedTask.id = form.id
  state.selectedTask.setTaskName($.trim(form.name))
  state.selectedTask.asynchronous = form.asynchronous
  state.selectedTask.exclusive = form.exclusive
}

export const saveTaskPerformer = (state, form) => {
  let task = state.selectedTask
  task.performerType = form.performerType
  task.expression = form.expression
  task.isUseExpression = form.useExpression
  task.formKey = form.formKey
  task.dueDate = form.dueDate
  task.priority = form.priority
  task.documentation = form.documentation
}

export const saveTaskForm = (state, payload) => {
  let task = state.selectedTask
  let form = payload.form
  let insertFields = payload.insertFields
  let updateFields = payload.updateFields
  let delFields = payload.delFields
  let formProp = task.getFormProperties(form.propertyId)
  if (formProp == null) {
    formProp = new ESTDesigner.model.FormProperty()
    formProp.id = form.propertyId
    formProp.name = form.propertyName
    formProp.type = form.propertyType
    formProp.expression = form.expressionValue
    formProp.variable = form.variable
    formProp.defaultValue = form.default
    formProp.datePattern = form.datePattern
    formProp.readable = form.readable
    formProp.writeable = form.writeable
    formProp.required = form.required
    if (insertFields != null && insertFields != undefined) {
      insertFields.forEach(rowData => {
        var nv = new ESTDesigner.model.FormValue()
        nv.id = rowData.fid
        nv.name = rowData.name
        formProp.addValues(nv)
      })
    }
    state.selectedTask.addFormProperties(formProp)
  } else {
    formProp.id = form.propertyId
    formProp.name = form.propertyName
    formProp.type = form.propertyType
    formProp.expression = form.expressionValue
    formProp.variable = form.variable
    formProp.defaultValue = form.default
    formProp.datePattern = form.datePattern
    formProp.readable = form.readable
    formProp.writeable = form.writeable
    formProp.required = form.required
    if (insertFields != null && insertFields != undefined) {
      insertFields.forEach(rowData => {
        var nv = new ESTDesigner.model.FormValue()
        nv.id = rowData.fid
        nv.name = rowData.name
        formProp.addValues(nv)
      })
    }
    if (updateFields != null && updateFields != undefined) {
      updateFields.forEach(rowData => {
        var old = formProp.getFormValue(rowData.fid)
        old.name = rowData.name
        old.id = rowData.id
      })
    }
    if (delFields != null && delFields != undefined) {
      delFields.forEach(rowData => {
        formProp.deleteFormValue(rowData.fid)
      })
    }
  }
}
export const delTaskForm = (state, id) => {
  let task = state.selectedTask
  task.deleteFormProperties(id)
}

export const delTaskListener = (state, id) => {
  let task = state.selectedTask
  task.deleteTaskListener(id)
}

export const delExecutionListener = (state, id) => {
  let task = state.selectedTask
  task.deleteListener(id)
}

export const saveTaskListener = (state, payload) => {
  let form = payload.form
  let insertFields = payload.insertFields
  let updateFields = payload.updateFields
  let delFields = payload.delFields
  let listener = state.selectedTask.getTaskListener(form.id)
  if (listener == null) {
    listener = new ESTDesigner.model.Listener()
    listener.event = form.listenerEventType
    listener.serviceType = form.listenerServiceType
    listener.serviceClass = form.listenerServiceClass
    listener.serviceExpression = form.listenerServiceExpression

    if (insertFields != null && insertFields != undefined) {
      insertFields.forEach(rowData => {
        let field = new ESTDesigner.model.Field()
        field.name = rowData.fieldName
        field.type = rowData.type
        field.value = rowData.value
        listener.setField(field)
      })
    }
    state.selectedTask.addTaskListener(listener)
  } else {
    listener.event = form.listenerEventType
    listener.serviceType = form.listenerServiceType
    listener.serviceClass = form.listenerServiceClass
    listener.serviceExpression = form.listenerServiceExpression
    if (insertFields != null && insertFields != undefined) {
      insertFields.forEach(rowData => {
        let field = new ESTDesigner.model.Field()
        field.name = rowData.fieldName
        field.type = rowData.type
        field.value = rowData.value
        listener.setField(field)
      })
    }
    if (updateFields != null && updateFields != undefined) {
      updateFields.forEach(rowData => {
        let field = listener.getField(rowData.id)
        field.name = rowData.fieldName
        field.type = rowData.type
        field.value = rowData.value
      })
    }
    if (delFields != null && delFields != undefined) {
      delFields.forEach(rowData => {
        listener.deleteField(rowData.id)
      })
    }
  }
}

export const saveExecutionListener = (state, payload) => {
  let form = payload.form
  let insertFields = payload.insertFields
  let updateFields = payload.updateFields
  let delFields = payload.delFields
  let listener = state.selectedTask.getListener(form.id)
  if (listener == null) {
    listener = new ESTDesigner.model.Listener()
    listener.event = form.listenerEventType
    listener.serviceType = form.listenerServiceType
    listener.serviceClass = form.listenerServiceClass
    listener.serviceExpression = form.listenerServiceExpression

    if (insertFields != null && insertFields != undefined) {
      insertFields.forEach(rowData => {
        let field = new ESTDesigner.model.Field()
        field.name = rowData.fieldName
        field.type = rowData.type
        field.value = rowData.value
        listener.setField(field)
      })
    }
    state.selectedTask.addListener(listener)
  } else {
    listener.event = form.listenerEventType
    listener.serviceType = form.listenerServiceType
    listener.serviceClass = form.listenerServiceClass
    listener.serviceExpression = form.listenerServiceExpression
    if (insertFields != null && insertFields != undefined) {
      insertFields.forEach(rowData => {
        let field = new ESTDesigner.model.Field()
        field.name = rowData.fieldName
        field.type = rowData.type
        field.value = rowData.value
        listener.setField(field)
      })
    }
    if (updateFields != null && updateFields != undefined) {
      updateFields.forEach(rowData => {
        let field = listener.getField(rowData.id)
        field.name = rowData.fieldName
        field.type = rowData.type
        field.value = rowData.value
      })
    }
    if (delFields != null && delFields != undefined) {
      delFields.forEach(rowData => {
        listener.deleteField(rowData.id)
      })
    }
  }
}

export const saveTaskMultiInstance = (state, form) => {
  state.selectedTask.isSequential = form.sequential
  state.selectedTask._loopCardinality = form.loopCardinality
  state.selectedTask._collection = form.collection
  state.selectedTask._elementVariable = form.elementVariable
  state.selectedTask._completionCondition = form.completionCondition
}

export const delCandidateUser = (state, id) => {
  let task = state.selectedTask
  task.deleteCandidateUser(id)
}

export const delCandidateGroup = (state, name) => {
  let task = state.selectedTask
  task.deleteCandidateGroup(name)
}

export const delCandidateRole = (state, id )=> {
  let task = state.selectedTask
  task.deleteCandidateRole(id)
}

export const saveCandidateGroups = (state) => {
  let task = state.selectedTask
  task.candidateGroups.clear()
  state.selectedUserGroups.forEach(e => {
    task.addCandidateGroup(e)
  })
}

export const saveCandidateUsers = (state) => {
  let task = state.selectedTask
  task.candidateUsers.clear()
  state.selectedUsers.forEach(e => {
    task.addCandidateUser(e)
  })
}

export const saveCandidateRoles = (state) => {
  let task = state.selectedTask
  task.candidateRoles.clear()
  state.selectedUserRoles.forEach(e => {
    task.addCandidateRole(e)
  })
}


//保存流程前置拦截器
export const saveProposeInterceptor = (state, prop) => {
  let task = state.selectedTask
  task.addTaskProposeInterceptor(prop)
}


//保存流程后置拦截器
export const savePostPositionInterceptor = (state, prop) => {
  let task = state.selectedTask
  task.addTaskPostPositionInterceptor(prop)
}


export const initSelectedUsers = (state, users) => {
  let candidateUsers = users
  let selectedUsers = []
  for (var i = 0; i < candidateUsers.getSize(); i++) {
    var candidateUser = candidateUsers.get(i)
    var user = {
      userId: candidateUser.userId,
      taskId: candidateUser.taskId,
      sso: candidateUser.sso,
      name: candidateUser.name
    }
    selectedUsers.push(user)
  }
  state.selectedUsers = selectedUsers
}

export const addSelectedUsers = (state, users) => {
  for (let k = 0; k < users.length; k++) {
    let user = users[k]
    // let loginName = user.loginName
    // let isExisting = false
    // for (let i = 0; i < state.selectedUsers.length; i++) {
    //   let record = state.selectedUsers[i];
    //   if (record.sso === loginName) {
    //     isExisting = true;
    //     break;
    //   }
    // }
    // if (!isExisting) {
    state.selectedUsers.push({
      userId: user.userId,
      sso: user.loginName,
      name: user.userName,
      taskId: user.taskId
    })
    // }
  }
}
export const delSelectedUsers = (state, user) => {
  let index = -1
  for (let i = 0; i < state.selectedUsers.length; i++) {
    let record = state.selectedUsers[i]
    if (record.sso === user.sso) {
      index = i
      break
    }
  }
  if (index >= 0) {
    state.selectedUsers.splice(index, 1)
  }
}

export const initSelectedUserGroups = (state, groups) => {
  let candidateGroups = groups
  let selectedGroups = []
  for (var i = 0; i < candidateGroups.getSize(); i++) {
    var candidateGroup = candidateGroups.get(i)

    var group = {
      name: candidateGroup.name,
      id: candidateGroup.id,
      taskId: candidateGroup.taskId
    }
    selectedGroups.push(group)
  }
  state.selectedUserGroups = selectedGroups
}

export const addSelectedUserGroups = (state, groups) => {
  for (let k = 0; k < groups.length; k++) {
    let group = groups[k]
    // let name = group.groupName
    // let isExisting = false
    // for (let i = 0; i < state.selectedUserGroups.length; i++) {
    //   let record = state.selectedUserGroups[i]
    //   if (record.name === name) {
    //     isExisting = true
    //     break
    //   }
    // }
    // if (!isExisting) {
    state.selectedUserGroups.push({
      name: group.name,
      id: group.id,
      taskId: group.taskId
    })
    // }
  }
}
export const delSelectedUserGroups = (state, group) => {
  let index = -1
  for (let i = 0; i < state.selectedUserGroups.length; i++) {
    let record = state.selectedUserGroups[i]
    if (record.id === group.id) {
      index = i
      break
    }
  }
  if (index >= 0) {
    state.selectedUserGroups.splice(index, 1)
  }
}

//-----------------------------------------
export const initSelectedUserRoles = (state, roles) => {
  let candidateRoles = roles
  let selectedRoles = []
  for (let i = 0; i < candidateRoles.getSize(); i++) {
    let candidateRole = candidateRoles.get(i)

    let role = {
      name: candidateRole.name,
      id: candidateRole.id,
      roleType:candidateRole.roleType,
      taskId: candidateRole.taskId
    }
    selectedRoles.push(role)
  }
  state.selectedUserRoles = selectedRoles
}

export const addSelectedUserRoles = (state, roles) => {
  for (let k = 0; k < roles.length; k++) {
    let role = roles[k]
    state.selectedUserRoles.push({
      name: role.name,
      id: role.id,
      roleType:role.roleType,
      taskId: role.taskId
    })
  }
}
export const delSelectedUserRoles = (state, role) => {
  let index = -1
  for (let i = 0; i < state.selectedUserRoles.length; i++) {
    let record = state.selectedUserRoles[i]
    if (record.id === role.id) {
      index = i
      break
    }
  }
  if (index >= 0) {
    state.selectedUserRoles.splice(index, 1)
  }
}
export const saveTaskScript = (state, form) => {
  let task = state.selectedTask
  task.scriptLanguage = form.scriptLanguage
  task.script = form.script
}
export const saveTaskMail = (state, form) => {
  let task = state.selectedTask
  task.to = form.to
  task.from = form.from
  task.subject = form.subject
  task.cc = form.cc
  task.bcc = form.bcc
  task._charset = form.charset
  task._text = form.nonhtmlText
  task._html = form.htmlText
}

export const saveTaskService = (state, payload) => {
  let form = payload.form
  let task = state.selectedTask
  let insertFields = payload.insertFields
  let updateFields = payload.updateFields
  let delFields = payload.delFields
  task._type = form._type
  task._javaClass = form.serviceClass
  task._expression = form._expression
  task.delegateExpression = form.delegateExpression
  task.resultVariable = form.resultVariable
  task.documentation = form.documentation
  if (insertFields != null && insertFields != undefined) {
    insertFields.forEach(rowData => {
      let field = new ESTDesigner.model.Field()
      field.name = rowData.fieldName
      field.type = rowData.type
      field.value = rowData.value
      task.fields.add(field)
    })
  }
  if (updateFields != null && updateFields != undefined) {
    updateFields.forEach(rowData => {
      let field = task.getField(rowData.id)
      field.name = rowData.fieldName
      field.type = rowData.type
      field.value = rowData.value
    })
  }
  if (delFields != null && delFields != undefined) {
    delFields.forEach(rowData => {
      task.deleteField(rowData.id)
    })
  }
}

export const saveBusinessRule = (state, form) => {
  let task = state.selectedTask
  task.ruleName = form.ruleName
  task.inputVariable = form.inputVariable
  task.resultVariable = form.resultVariable
  task.excluded = form.excluded
}

export const saveCallActivity = (state, form) => {
  let task = state.selectedTask
  task.callElement = form.callElement
}

export const saveInputParams = (state, payload) => {
  let task = state.selectedTask
  let insertParams = payload.insertParams
  let updateParams = payload.updateParams
  let delParams = payload.delParams
  if (insertParams != null && insertParams != undefined) {
    insertParams.forEach(rowData => {
      var param = new ESTDesigner.task.CallActivityTask.Parameter.InputParameter()
      param.source = rowData._source
      param.sourceExpression = rowData.sourceExpression
      param.target = rowData._target
      task.inputParams.add(param)
    })
  }
  if (updateParams != null && updateParams != undefined) {
    updateParams.forEach(rowData => {
      let oldParam = task.getInputParam(rowData.id)
      oldParam.source = rowData._source
      oldParam.sourceExpression = rowData.sourceExpression
      oldParam.target = rowData._target
    })
  }
  if (delParams != null && delParams != undefined) {
    delParams.forEach(rowData => {
      task.deleteInputParam(rowData.id)
    })
  }
}

export const saveOutputParams = (state, payload) => {
  let task = state.selectedTask
  let insertParams = payload.insertParams
  let updateParams = payload.updateParams
  let delParams = payload.delParams
  if (insertParams != null && insertParams != undefined) {
    insertParams.forEach(rowData => {
      var param = new ESTDesigner.task.CallActivityTask.Parameter.OutputParameter()
      param.source = rowData._source
      param.sourceExpression = rowData.sourceExpression
      param.target = rowData._target
      task.outputParams.add(param)
    })
  }
  if (updateParams != null && updateParams != undefined) {
    updateParams.forEach(rowData => {
      let oldParam = task.getOutputParam(rowData.id)
      oldParam.source = rowData._source
      oldParam.sourceExpression = rowData.sourceExpression
      oldParam.target = rowData._target
    })
  }
  if (delParams != null && delParams != undefined) {
    delParams.forEach(rowData => {
      task.deleteOutputParam(rowData.id)
    })
  }
}

export const setSelectedConnection = (state, connection) => {
  state.selectedConnection = connection
}

export const saveConnectionGeneral = (state, form) => {
  let line = state.selectedConnection
  line.id = form.id
  line.name = form.name
  line.setLabel(form.name)
}

export const saveConnectionCondition = (state, form) => {
  let line = state.selectedConnection
  line.condition = form.condition
}

export const delConnectionListener = (state, id) => {
  let connection = state.selectedConnection
  connection.deleteListener(id)
}

export const saveConnectionListener = (state, payload) => {
  let form = payload.form
  let insertFields = payload.insertFields
  let updateFields = payload.updateFields
  let delFields = payload.delFields
  let listener = state.selectedConnection.getListener(form.id)
  if (listener == null) {
    listener = new ESTDesigner.model.Listener()
    listener.event = form.listenerEventType
    listener.serviceType = form.listenerServiceType
    listener.serviceClass = form.listenerServiceClass
    listener.serviceExpression = form.listenerServiceExpression

    if (insertFields != null && insertFields != undefined) {
      insertFields.forEach(rowData => {
        let field = new ESTDesigner.model.Field()
        field.name = rowData.fieldName
        field.type = rowData.type
        field.value = rowData.value
        listener.setField(field)
      })
    }
    state.selectedConnection.addListener(listener)
  } else {
    listener.event = form.listenerEventType
    listener.serviceType = form.listenerServiceType
    listener.serviceClass = form.listenerServiceClass
    listener.serviceExpression = form.listenerServiceExpression
    if (insertFields != null && insertFields != undefined) {
      insertFields.forEach(rowData => {
        let field = new ESTDesigner.model.Field()
        field.name = rowData.fieldName
        field.type = rowData.type
        field.value = rowData.value
        listener.setField(field)
      })
    }
    if (updateFields != null && updateFields != undefined) {
      updateFields.forEach(rowData => {
        let field = listener.getField(rowData.id)
        field.name = rowData.fieldName
        field.type = rowData.type
        field.value = rowData.value
      })
    }
    if (delFields != null && delFields != undefined) {
      delFields.forEach(rowData => {
        listener.deleteField(rowData.id)
      })
    }
  }
}

export const setSubProcess = (state, subProcess) => {
  state.process = subProcess
}

export const saveSubProcessGeneral = (state, form) => {
  let process = state.process
  process.id = form.id
  process.name = form.name
  process.documentation = form.documentation
  process.setContainerName(form.name)
}

export const saveSubProcessMultilInstance = (state, form) => {
  let process = state.process
  process.isSequential = form.sequential
  process._loopCardinality = form.loopCardinality
  process._collection = form.collection
  process._elementVariable = form.elementVariable
  process._completionCondition = form.completionCondition
}
