import ESTDesigner from '../node/Packages'
import '../node/Application'
import draw2d from 'draw2d'
import Config from '../node/Config'

/*
 * User Task类型的结点对应的类
 */
ESTDesigner.task.UserTask = ESTDesigner.task.BaseTask.extend({
  init: function(attr, setter, getter) {
    this._super($.extend({
      type: 'ESTDesigner.task.UserTask',
      title: '',
      iconPath: Config.Image.User_Task_Ico
    }, attr), setter, getter)
    this.performerType = null
    this.dueDate = null
    this.priority = null
    this.formKey = null
    this.expression = null
    this.isUseExpression = null
    this.assignee = null
    this.candidateUsers = new draw2d.util.ArrayList()
    this.candidateGroups = new draw2d.util.ArrayList()
    this.candidateRoles = new draw2d.util.ArrayList()
    this.formProperties = new draw2d.util.ArrayList()
    this.taskListeners = new draw2d.util.ArrayList()
    this.taskProposeInterceptor = null
    this.taskPostPositionInterceptor = null
    this.node = {
      'order': '',
      'id': '',
      'name': '',
      'assignee': '',
      'layout': '',
      'taskType': '',
      'performType': '',
      'form': '',
      'assignmentHandler': '',
      'taskProposeInterceptor': '',
      'taskPostPositionInterceptor': '',
      'transition': {
        'id': '',
        'offset': '',
        'to': '',
        'name': ''
      }
    }
  },
  addCandidateRole: function(role) {
    this.candidateRoles.add(role)
  },
  addCandidateGroup: function(group) {
    this.candidateGroups.add(group)
    // if (!this.candidateGroups.contains(name)) {
    //   this.candidateGroups.add(name)
    // }
  },
  addCandidateUser: function(user) {
    this.candidateUsers.add(user)
    // if (this.getCandidateUser(user.sso) == null) {
    //   this.candidateUsers.add(user)
    // }
  },
  addFormProperties: function(prop) {
    this.formProperties.add(prop)
  },
  addTaskListener: function(listener) {
    this.taskListeners.add(listener)
  },
  addTaskProposeInterceptor: function(listener) {
    this.taskProposeInterceptor = listener
  },
  addTaskPostPositionInterceptor: function(listener) {
    this.taskPostPositionInterceptor = listener
  },
  deleteCandidateRole: function(role) {
    var candidate = this.getCandidateGroup(role)
    this.candidateRoles.remove(candidate)
  },
  deleteCandidateGroup: function(name) {
    var candidate = this.getCandidateGroup(name)
    this.candidateGroups.remove(candidate)
  },
  deleteCandidateUser: function(sso) {
    var candidate = this.getCandidateUser(sso)
    this.candidateUsers.remove(candidate)
  },
  deleteFormProperties: function(id) {
    var prop = this.getFormProperties(id)
    this.formProperties.remove(prop)
  },
  deleteTaskListener: function(id) {
    var listener = this.getTaskListener(id)
    this.taskListeners.remove(listener)
  },
  setFormProperties: function(props) {
    this.formProperties = props
  },
  setTaskListeners: function(listeners) {
    this.taskListeners = listeners
  },
  getCandidateRole: function(name) {
    for (var i = 0; i < this.candidateRoles.getSize(); i++) {
      var candidate = this.candidateRoles.get(i)
      if (candidate === name) {
        return candidate
      }
    }
    return null
  },
  getCandidateGroup: function(name) {
    for (var i = 0; i < this.candidateGroups.getSize(); i++) {
      var candidate = this.candidateGroups.get(i)
      if (candidate === name) {
        return candidate
      }
    }
    return null
  },
  getCandidateUser: function(sso) {
    for (var i = 0; i < this.candidateUsers.getSize(); i++) {
      var candidate = this.candidateUsers.get(i)
      if (candidate.sso === sso) {
        return candidate
      }
    }
    return null
  },
  getFormProperties: function(id) {
    for (var i = 0; i < this.formProperties.getSize(); i++) {
      var prop = this.formProperties.get(i)
      if (prop.id == id) {
        return prop
      }
    }
  },
  getTaskListener: function(id) {
    for (var i = 0; i < this.taskListeners.getSize(); i++) {
      var listener = this.taskListeners.get(i)
      if (listener.getId() === id) {
        return listener
      }
    }
  },
  getIconClassName: function() {
    return 'user-task-icon'
  },
  getStartElementXML: function() {
    var xml = '<userTask '
    xml = xml + this.getGeneralXML()
    xml = xml + this.getPerformersXML()
    xml = xml + '>\n'
    return xml
  },
  getEndElementXML: function() {
    var xml = '</userTask>\n'
    return xml
  },
  getDocumentationXML: function() {
    if (this.documentation == null || this.documentation === '') {
      return ''
    }
    var xml = '<documentation>'
    xml = xml + this.documentation
    xml = xml + '</documentation>'
    return xml
  },
  getPerformersXML: function() {
    var xml = ''
    let taskId = this.id
    if (this.isUseExpression === true) {
      if (this.expression != null && this.expression != '') {
        if (this.performerType === 'assignee') {
          xml = xml + 'activiti:assignee="' + this.expression + '" '
        } else if (this.performerType === 'candidateUsers') {
          xml = xml + 'activiti:candidateUsers="' + this.expression + '" '
        } else if (this.performerType === 'candidateGroups') {
          xml = xml + 'activiti:candidateGroups="' + this.expression + '" '
        } else if (this.performerType === 'candidateRoles') {
          xml = xml + 'activiti:candidateRoles="' + this.expression + '" '
        }
      }
    } else {
      if (this.performerType === 'candidateUsers') {
        xml = xml + 'activiti:candidateUsers="'
        for (var i = 0; i < this.candidateUsers.getSize(); i++) {
          var user = this.candidateUsers.get(i)
          var users = ''
          if (taskId === user.taskId) {
            users = user.userId + ','
            xml = xml + user.userId + ','
          }
        }
        xml = xml + '" '
      } else if (this.performerType === 'candidateGroups') {
        xml = xml + 'activiti:candidateGroups="'
        for (var i = 0; i < this.candidateGroups.getSize(); i++) {
          var group = this.candidateGroups.get(i)
          var groups = ''
          if (taskId === group.taskId) {
            groups = group.id + ','
            xml = xml + group.id + ','
          }
        }
        xml = xml + '" '
      } else if (this.performerType === 'candidateRoles') {
        xml = xml + 'activiti:candidateRoles="'
        for (var i = 0; i < this.candidateRoles.getSize(); i++) {
          var role = this.candidateRoles.get(i)
          var roles = ''
          if (taskId === role.taskId) {
            roles = role.id + ','
            xml = xml + role.id + ','
          }
        }
        xml = xml + '" '
      }
    }
    if (this.dueDate != null && this.dueDate !== '') {
      xml = xml + 'activiti:dueDate="' + this.dueDate + '" '
    }
    if (this.formKey != null && this.formKey !== '') {
      this.node.form = this.formKey
      xml = xml + 'activiti:formKey="' + this.formKey + '" '
    }
    if (this.priority != null && this.priority !== '') {
      xml = xml + 'activiti:priority="' + this.priority + '" '
    }
    if (this.taskProposeInterceptor != null && this.taskProposeInterceptor !== '') {
      xml = xml + 'activiti:taskProposeInterceptor="'
      let taskProposeInterceptor = this.taskProposeInterceptor
      if (taskId === taskProposeInterceptor.taskId) {
        xml = xml + taskProposeInterceptor.interceptor
      }
      xml = xml + '" '
    }
    if (this.taskPostPositionInterceptor != null && this.taskPostPositionInterceptor !== '') {
      xml = xml + 'activiti:taskPostPositionInterceptor="'
      let taskPostPositionInterceptor = this.taskPostPositionInterceptor
      if (taskId === taskPostPositionInterceptor.taskId) {
        xml = xml + taskPostPositionInterceptor.interceptor
      }
      ``
      xml = xml + '" '
    }
    return xml
  },
  getPerformersXML1: function() {
    let assignee = ''
    let taskId = this.id
    if (this.isUseExpression === true) {
      if (this.expression) {
        this.node.assignee = this.expression
      }
    } else {
      if (this.performerType === 'candidateUsers') {
        for (let i = 0; i < this.candidateUsers.getSize(); i++) {
          let user = this.candidateUsers.get(i)
          if (taskId === user.taskId) {
            assignee = assignee + user.userId + ','
          }
        }
        this.node.assignee = assignee
      } else if (this.performerType == 'candidateGroups') {
        for (let i = 0; i < this.candidateGroups.getSize(); i++) {
          let group = this.candidateGroups.get(i)
          if (taskId === group.taskId) {
            assignee = assignee + group.id + ','
          }
        }
        this.node.assignee = assignee
      } else if (this.performerType == 'candidateRoles') {
        for (let i = 0; i < this.candidateRoles.getSize(); i++) {
          let role = this.candidateRoles.get(i)
          if (taskId === role.taskId) {
            assignee = assignee + role.id + ','
          }
        }
        this.node.assignee = assignee
      }
    }
    if (this.taskProposeInterceptor != null && this.taskProposeInterceptor !== '') {
      let taskProposeInterceptor = this.taskProposeInterceptor
      if (taskId === taskProposeInterceptor.taskId) {
        this.node.taskProposeInterceptor=taskProposeInterceptor.interceptor
      }
    }
    if (this.taskPostPositionInterceptor != null && this.taskPostPositionInterceptor !== '') {
      let taskPostPositionInterceptor = this.taskPostPositionInterceptor
      if (taskId === taskPostPositionInterceptor.taskId) {
        this.node.taskPostPositionInterceptor =taskPostPositionInterceptor.interceptor
      }
    }
  },
  getExtensionElementsXML: function() {
    if (this.listeners.getSize() == 0 && this.taskListeners.getSize() == 0 && this.formProperties.getSize() == 0) {
      return ''
    }
    var xml = '<extensionElements>\n'
    xml = xml + this.getFormPropertiesXML()
    xml = xml + this.getListenersXML()
    xml = xml + '</extensionElements>\n'
    return xml
  },
  getListenersXML: function() {
    var xml = this._super()
    for (var i = 0; i < this.taskListeners.getSize(); i++) {
      var listener = this.taskListeners.get(i)
      xml = xml + listener.toXML()
    }
    return xml
  },
  getListenersXML1: function() {
    for (var i = 0; i < this.taskListeners.getSize(); i++) {
      var listener = this.taskListeners.get(i)
      this.node.postInterceptors.push(listener)
    }
  },
  getFormPropertiesXML: function() {
    var xml = ''
    for (var i = 0; i < this.formProperties.getSize(); i++) {
      var formProperty = this.formProperties.get(i)
      xml = xml + formProperty.toXML()
    }
    return xml
  },
  toXML: function() {
    var xml = this.getStartElementXML()
    xml = xml + this.getDocumentationXML()
    xml = xml + this.getExtensionElementsXML()
    xml = xml + this.getMultiInstanceXML()
    xml = xml + this.getEndElementXML()
    return xml
  },
  toXML1: function(order) {
    this.node.id = this.id
    this.node.name = this.name
    this.node.order = order
    this.getPerformersXML1()
    // this.getDocumentationXML();
    // this.getExtensionElementsXML();
    this.getListenersXML1()
    // this.getMultiInstanceXML();
    // this.getEndElementXML();

    return this.node
  }
})
export default {
  newInstance(attr, setter, getter) {
    return new ESTDesigner.task.UserTask(attr, setter, getter)
  }
}
