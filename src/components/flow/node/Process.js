import ESTDesigner from "./Packages"
import "./Application"
import draw2d from "draw2d"
ESTDesigner.model.Process = ESTDesigner.model.BaseModel.extend({
  init: function () {
    this._super();
    this.id = ESTDesigner.tool.UUID.create();
    this.name = null;
    this.category = null;
    this.documentation = null;
    this.callBack = null;
    this.listeners = new draw2d.util.ArrayList();
    this.variables = new draw2d.util.ArrayList();
    this.dataObjects = new draw2d.util.ArrayList();
  },
  getListener: function (id) {
    for (var i = 0; i < this.listeners.getSize(); i++) {
      var listener = this.listeners.get(i);
      if (listener.getId() === id) {
        return listener;
      }
    }
  },
  deleteListener: function (id) {
    var listener = this.getListener(id);
    this.listeners.remove(listener);
  },
  addListener: function (listener) {
    this.listeners.add(listener);
  },
  setListeners: function (listeners) {
    this.listeners = listeners;
  },
  getVariable: function (id) {
    for (var i = 0; i < this.variables.getSize(); i++) {
      var variable = this.variables.get(i);
      if (variable.id === id) {
        return variable;
      }
    }
  },
  deleteVariable: function (id) {
    var variable = this.getVariable(id);
    this.variables.remove(variable);
  },
  addVariable: function (variable) {
    this.variables.add(variable);
  },
  getVariablesJSONObject: function () {
    return JSON.stringify(this.variables.data);
  },
  getDataObject: function (id) {
    for (var i = 0; i < this.dataObjects.getSize(); i++) {
      var dataObject = this.dataObjects.get(i);
      if (dataObject.id === id) {
        return dataObject;
      }
    }
  },
  deleteDataObject: function (id) {
    var dataObject = this.getDataObject(id);
    this.dataObjects.remove(dataObject);
  },
  addDataObject: function (dataObject) {
    this.dataObjects.add(dataObject);
  },
  getListenersXML: function () {
    var xml = '';
    for (var i = 0; i < this.listeners.getSize(); i++) {
      var listener = this.listeners.get(i);
      xml = xml + listener.toXML();
    }
    return xml;
  },
  getExtensionElementsXML: function () {
    if (this.listeners.getSize() == 0)
      return '';
    var xml = '<extensionElements>\n';
    xml = xml + this.getListenersXML();
    xml = xml + '</extensionElements>\n';
    return xml;
  },
  getDocumentationXML: function () {
    var documentation = $.trim(this.documentation);
    if (documentation == null || documentation == '')
      return '';
    var xml = '<documentation>';
    xml = xml + this.documentation;
    xml = xml + '</documentation>';
    return xml;
  },
  getDataObjectsXML: function () {
    var xml = '';
    for (var i = 0; i < this.dataObjects.getSize(); i++) {
      var dataObject = this.dataObjects.get(i);
      xml = xml + dataObject.toXML();
    }
    return xml;
  }
});
