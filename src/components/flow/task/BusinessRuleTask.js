import ESTDesigner from "../node/Packages"
import "../node/Application"
import Config from "../node/Config"
/*
 * business rule task类型结点对应的类
 */
ESTDesigner.task.BusinessRuleTask = ESTDesigner.task.BaseTask.extend({
  init: function (attr, setter, getter) {
    this._super($.extend({
      type: "ESTDesigner.task.BusinessRuleTask",
      title: "",
      iconPath: Config.Image.Business_Rule_Ico
    }, attr), setter, getter);
    this.setDimension(170, 60);
    this.ruleName = null;
    this.inputVariable = null;
    this.excluded = null;
    this.resultVariable = null;
  },
  getStartElementXML: function () {
    var xml = '<businessRuleTask ';
    xml = xml + this.getGeneralXML();
    xml = xml + this.getMainConfigXML();
    xml = xml + '>\n';
    return xml;
  },
  getMainConfigXML: function () {
    var xml = '';
    if (this.inputVariable != null && this.inputVariable != '')
      xml = xml + ' activiti:ruleVariablesInput="' + this.inputVariable + '"';
    if (this.ruleName != null && this.ruleName != '')
      xml = xml + ' activiti:rules="' + this.ruleName + '"';
    if (this.resultVariable != null && this.resultVariable != '')
      xml = xml + ' activiti:resultVariable="' + this.resultVariable + '"';
    if (this.excluded != null && this.excluded != '')
      xml = xml + ' activiti:exclude="' + this.excluded + '"';
    return xml;
  },
  getEndElementXML: function () {
    var xml = '</businessRuleTask>\n';
    return xml;
  },
  toXML: function () {
    var xml = this.getStartElementXML();
    xml = xml + this.getExtensionElementsXML();
    xml = xml + this.getMultiInstanceXML();
    xml = xml + this.getEndElementXML();
    return xml;
  }
});
export default {
  newInstance(attr, setter, getter) {
    return new ESTDesigner.task.BusinessRuleTask(attr, setter, getter);
  }
}
