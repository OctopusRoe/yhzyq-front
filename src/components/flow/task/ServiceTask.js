import ESTDesigner from "../node/Packages"
import "../node/Application"
import Config from "../node/Config"
import draw2d from "draw2d"
/*
 * service task类型结点对应的类
 */
ESTDesigner.task.ServiceTask = ESTDesigner.task.BaseTask.extend({
  init: function (attr, setter, getter) {
    this._super($.extend({
      type: "ESTDesigner.task.ServiceTask",
      title: "",
      iconPath: Config.Image.Service_Task_Ico
    }, attr), setter, getter);
    this._type = null;
    this._javaClass = null;
    this._expression = null;
    this.delegateExpression = null;
    this.resultVariable = null;
    this.fields = new draw2d.util.ArrayList();
  },
  getField: function (id) {
    for (var i = 0; i < this.fields.getSize(); i++) {
      var field = this.fields.get(i);
      if (field.id == id) {
        return field;
      }
    }
  },
  deleteField: function (id) {
    var field = this.getField(id);
    this.fields.remove(field);
  },
  getStartElementXML: function () {
    var xml = '<serviceTask ';
    xml = xml + this.getGeneralXML();
    xml = xml + this.getServiceXML();
    xml = xml + '>\n';
    return xml;
  },
  getServiceXML: function () {
    var xml = '';
    if (this._type == 'javaClass') {
      if (this._javaClass != null && this._javaClass != '')
        xml = xml + ' activiti:class="' + this._javaClass + '" '
    } else if (this._type == 'expression') {
      if (this._expression != null && this._expression != '')
        xml = xml + ' activiti:expression="' + this._expression + '" '
    } else if (this._type == 'delegateExpression') {
      if (this.delegateExpression != null && this.delegateExpression != '')
        xml = xml + ' activiti:delegateExpression="' + this.delegateExpression +
        '" '
    }
    if (this.resultVariable != null && this.resultVariable != '') {
      xml = xml + 'activiti:resultVariableName="' + this.resultVariable + '" '
    }
    return xml;
  },
  getDocumentationXML: function () {
    if (this.documentation == null || this.documentation == '')
      return '';
    var xml = '<documentation>';
    xml = xml + this.documentation;
    xml = xml + '</documentation>';
    return xml;
  },
  getExtensionElementsXML: function () {
    if (this.listeners.getSize() == 0 && this.fields.getSize() == 0)
      return '';
    var xml = '<extensionElements>\n';
    xml = xml + this.getListenersXML();
    xml = xml + this.getFieldsXML();
    xml = xml + '</extensionElements>\n';
    return xml;
  },
  getFieldsXML: function () {
    var xml = "";
    for (var i = 0; i < this.fields.getSize(); i++) {
      var field = this.fields.get(i);
      xml = xml + field.toXML();
    }
    return xml;
  },
  getEndElementXML: function () {
    var xml = '</serviceTask>\n';
    return xml;
  },
  toXML: function () {
    var xml = this.getStartElementXML();
    xml = xml + this.getExtensionElementsXML();
    xml = xml + this.getMultiInstanceXML();
    xml = xml + this.getDocumentationXML();
    xml = xml + this.getEndElementXML();
    return xml;
  }
});
export default {
  newInstance(attr, setter, getter) {
    return new ESTDesigner.task.ServiceTask(attr, setter, getter);
  }
}
