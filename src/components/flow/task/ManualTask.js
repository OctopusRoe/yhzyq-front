import ESTDesigner from "../node/Packages"
import "../node/Application"
import Config from "../node/Config"
/*
 * manual task类型结点对应的类
 */
ESTDesigner.task.ManualTask = ESTDesigner.task.BaseTask.extend({
  init: function (attr, setter, getter) {
    this._super($.extend({
      type: "ESTDesigner.task.ManualTask",
      title: "",
      iconPath: Config.Image.Manual_Task_Ico
    }, attr), setter, getter);
  },
  getStartElementXML: function () {
    var xml = '<task ';
    xml = xml + this.getGeneralXML();
    xml = xml + '>\n';
    return xml;
  },
  getEndElementXML: function () {
    var xml = '</task>\n';
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
    return new ESTDesigner.task.ManualTask(attr, setter, getter);
  }
}
