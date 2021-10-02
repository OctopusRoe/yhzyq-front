import ESTDesigner from "../node/Packages"
import "../node/Application"
import Config from "../node/Config"
/*
 * script task类型结点对应的类
 */
ESTDesigner.task.ScriptTask = ESTDesigner.task.BaseTask.extend({
  init: function (attr, setter, getter) {
    this._super($.extend({
      type: "ESTDesigner.task.ScriptTask",
      title: "",
      iconPath: Config.Image.Script_Task_Ico
    }, attr), setter, getter);
    this.scriptLanguage = null;
    this.script = null;
  },
  getStartElementXML: function () {
    var xml = '<scriptTask ';
    xml = xml + this.getGeneralXML();
    xml = xml + this.getScriptLanguageXML();
    xml = xml + '>\n';
    return xml;
  },
  getScriptLanguageXML: function () {
    var xml = ''
    if (this.scriptLanguage != null && this.scriptLanguage != '')
      xml = xml + ' scriptFormat="' + this.scriptLanguage +
      '" activiti:autoStoreVariables="true" '
    return xml;
  },
  getScriptXML: function () {
    var xml = ''
    if (this.script != null && this.script != '')
      xml = xml + '<script>' + this.script + '</script>\n'
    return xml;
  },
  getEndElementXML: function () {
    var xml = '</scriptTask>\n';
    return xml;
  },
  toXML: function () {
    var xml = this.getStartElementXML();
    xml = xml + this.getScriptXML();
    xml = xml + this.getExtensionElementsXML();
    xml = xml + this.getMultiInstanceXML();
    xml = xml + this.getEndElementXML();
    return xml;
  }
});
export default {
  newInstance(attr, setter, getter) {
    return new ESTDesigner.task.ScriptTask(attr, setter, getter);
  }
}
