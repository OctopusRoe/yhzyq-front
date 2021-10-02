import ESTDesigner from "../node/Packages"
import "../node/Application"
import Config from "../node/Config"
import draw2d from "draw2d"
/*
 * call activity类型结点对应的类
 */
ESTDesigner.task.CallActivityTask = ESTDesigner.task.BaseTask.extend({
  init: function (attr, setter, getter) {
    this._super($.extend({
      width: 150,
      type: "ESTDesigner.task.CallActivityTask",
      title: "",
      iconPath: Config.Image.Call_Activity_Ico
    }, attr), setter, getter);
    this.setDimension(160, 60);
    this.callElement = null;
    this.inputParams = new draw2d.util.ArrayList();
    this.outputParams = new draw2d.util.ArrayList();
  },
  getStartElementXML: function () {
    var xml = '<callActivity ';
    xml = xml + this.getGeneralXML();
    if (this.callElement != null && this.callElement != '')
      xml = xml + ' calledElement="' + this.callElement + '"';
    xml = xml + '>\n';
    return xml;
  },
  getExtensionElementsXML: function () {
    if (this.listeners.getSize() == 0 && this.inputParams.getSize() == 0 &&
      this.outputParams.getSize() == 0)
      return '';
    var xml = '<extensionElements>\n';
    xml = xml + this.getListenersXML();
    xml = xml + this.getInputParamsXML();
    xml = xml + this.getOutputParamsXML();
    xml = xml + '</extensionElements>\n';
    return xml;
  },
  getInputParamsXML: function () {
    var xml = '';
    for (var i = 0; i < this.inputParams.getSize(); i++) {
      var param = this.inputParams.get(i);
      xml = xml + param.toXML();
    }
    return xml;
  },
  getOutputParamsXML: function () {
    var xml = '';
    for (var i = 0; i < this.outputParams.getSize(); i++) {
      var param = this.outputParams.get(i);
      xml = xml + param.toXML();
    }
    return xml;
  },
  getEndElementXML: function () {
    var xml = '</callActivity>\n';
    return xml;
  },
  toXML: function () {
    var xml = this.getStartElementXML();
    xml = xml + this.getExtensionElementsXML();
    xml = xml + this.getMultiInstanceXML();
    xml = xml + this.getEndElementXML();
    return xml;
  },
  getInputParam: function (id) {
    for (var i = 0; i < this.inputParams.getSize(); i++) {
      var param = this.inputParams.get(i);
      if (param.id == id) {
        return param;
      }
    }
  },
  deleteInputParam: function (id) {
    var param = this.getInputParam(id);
    this.inputParams.remove(param);
  },
  getOutputParam: function (id) {
    for (var i = 0; i < this.outputParams.getSize(); i++) {
      var param = this.outputParams.get(i);
      if (param.id == id) {
        return param;
      }
    }
  },
  deleteOutputParam: function (id) {
    var param = this.getOutputParam(id);
    this.outputParams.remove(param);
  }

});
ESTDesigner.task.CallActivityTask.Parameter = ESTDesigner.task.CallActivityTask.extend({
  init: function (attr) {
    this._super(attr);
    this.source = null;
    this.sourceExpression = null;
    this.target = null;
  },
  getStartElementName: function () {},
  getEndElementXML: function () {
    var xml = '</' + this.getStartElementName() + '>\n'
    return xml;
  },
  getStartElementXML: function () {
    var xml = '<' + this.getStartElementName();
    if (this.source != null && this.source != '')
      xml = xml + ' source="' + this.source + '"';
    if (this.source != null && this.sourceExpression != '')
      xml = xml + ' sourceExpression="' + this.sourceExpression + '"';
    xml = xml + ' target="' + this.target + '"';
    xml = xml + '>'
    return xml;
  },
  toXML: function () {
    var xml = ''
    xml = xml + this.getStartElementXML();
    xml = xml + this.getEndElementXML();
    return xml;
  }
});
ESTDesigner.task.CallActivityTask.Parameter.InputParameter = ESTDesigner.task.CallActivityTask.Parameter
  .extend({
    init: function (attr) {
      this._super(attr);
    },
    getStartElementName: function () {
      return 'activiti:in';
    }
  });
ESTDesigner.task.CallActivityTask.Parameter.OutputParameter = ESTDesigner.task.CallActivityTask.Parameter
  .extend({
    init: function (attr) {
      this._super(attr);
    },
    getStartElementName: function () {
      return 'activiti:out';
    }
  });
export default {
  newInstance(attr, setter, getter) {
    return new ESTDesigner.task.CallActivityTask(attr, setter, getter);
  },
  CallActivityTaskInputParameter(attr) {
    return new ESTDesigner.task.CallActivityTask.Parameter.InputParameter(attr);
  },
  CallActivityTaskOutputParameter(attr) {
    return new ESTDesigner.task.CallActivityTask.Parameter.OutputParameter(attr);
  }
}
