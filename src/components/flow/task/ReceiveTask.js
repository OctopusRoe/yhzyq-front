import ESTDesigner from "../node/Packages"
import "../node/Application"
import Config from "../node/Config"

/*
 * receive task类型结点对应的类
 */
ESTDesigner.task.ReceiveTask = ESTDesigner.task.BaseTask.extend({
  init: function (attr, setter, getter) {
    this._super($.extend({
      type: "ESTDesigner.task.ReceiveTask",
      title: "",
      iconPath: Config.Image.Receive_Task_Ico
    }, attr), setter, getter);
  },
  getStartElementXML: function () {
    var xml = '<receiveTask ';
    xml = xml + this.getGeneralXML();
    xml = xml + '>\n';
    return xml;
  },
  getEndElementXML: function () {
    var xml = '</receiveTask>\n';
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
    return new ESTDesigner.task.ReceiveTask(attr, setter, getter);
  }
}
