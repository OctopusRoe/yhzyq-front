import ESTDesigner from "./Packages"
import draw2d from "draw2d";
import id from "element-ui/src/locale/lang/id";
ESTDesigner.tool.UUID = {
  create: function () {
    var segment = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return ('_' + segment() + segment() + segment() + segment() + segment() + segment() + segment() + segment());
  }
};
ESTDesigner.model.BaseModel = Class.extend({
  init: function () {

  }
});
ESTDesigner.model.Process = ESTDesigner.model.BaseModel.extend({
  init: function () {
    this._super();
    this.id = ESTDesigner.tool.UUID.create();
    this.name = '';
    this.category = null;
    this.documentation = null;
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
ESTDesigner.model.Variable = ESTDesigner.model.BaseModel.extend({
  init: function () {
    this.id = ESTDesigner.tool.UUID.create();
    this.name = null;
    this.type = null;
    this.scope = null;
    this.defaultValue = null;
    this.remark = null;
  }
});
ESTDesigner.model.DataObject = ESTDesigner.model.BaseModel.extend({
  init: function () {
    this.id = ESTDesigner.tool.UUID.create();
    this.name = null;
    this.type = null;
    this.value = null;
  },
  getValueXML: function () {
    var xml = "<activiti:value>" + this.value + "</activiti:value>\n";
    return xml;
  },
  getExtensionElementsXML: function () {
    var xml = '<extensionElements>\n';
    xml = xml + this.getValueXML();
    xml = xml + '</extensionElements>\n';
    return xml;
  },
  toXML: function () {
    var xml = '<dataObject id="' + this.id + '" name="' + this.name +
      '" itemSubjectRef="';
    if (this.type == 'string') {
      xml = xml + 'xsd:string';
    } else if (this.type == 'double') {
      xml = xml + 'xsd:double';
    } else if (this.type == 'boolean') {
      xml = xml + 'xsd:boolean';
    } else if (this.type == 'long') {
      xml = xml + 'xsd:long';
    } else if (this.type == 'int') {
      xml = xml + 'xsd:int';
    } else if (this.type == 'datetime') {
      xml = xml + 'xsd:datetime';
    }
    xml = xml + '">\n';
    xml = xml + this.getExtensionElementsXML();
    xml = xml + '</dataObject>\n'
    return xml;
  }
});
// excution listener object
ESTDesigner.model.Listener = ESTDesigner.model.BaseModel.extend({
  init: function () {
    this.id = ESTDesigner.tool.UUID.create();
    this.event = null;
    this.serviceType = null;
    this.serviceClass = null;
    this.serviceExpression = null;
    this.fields = new draw2d.util.ArrayList();
  },
  setId: function (id) {
    this.id = id;
  },
  getId: function () {
    return this.id;
  },
  setField: function (field) {
    this.fields.add(field);
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
  getServiceImplementation: function () {
    if (this.serviceType == 'javaClass')
      return this.serviceClass;
    else if (this.serviceType == 'expression')
      return this.serviceExpression;
  },
  getFieldsString: function () {
    var f = '';
    var v = '';
    for (var i = 0; i < this.fields.getSize(); i++) {
      var field = this.fields.get(i);
      f = f + field.name + ":" + field.value + ",";
    }
    return f;
  },
  toJSON: function () {
    var json = {
      id: this.id,
      event: this.event,
      serviceType: this.serviceType,
      serviceClass: this.serviceClass,
      serviceExpression: this.serviceExpression,
      fields: this.fields.data
    };
    return JSON.stringify(json);
  },
  parseJSON: function () {
    var jsonString = this.toJSON();
    return JSON._parse(jsonString);
  },
  getFieldsXML: function () {
    var xml = "";
    for (var i = 0; i < this.fields.getSize(); i++) {
      var field = this.fields.get(i);
      xml = xml + field.toXML();
    }
    return xml;
  },
  toXML: function () {
    var xml = '<activiti:executionListener event="' + this.event + '" ';
    if (this.serviceType == 'javaClass') {
      xml = xml + 'class="' + this.serviceClass + '" ';
    } else if (this.serviceType == 'expression') {
      xml = xml + 'expression="' + this.serviceExpression + '" ';
    }
    xml = xml + '>\n';
    xml = xml + this.getFieldsXML();
    xml = xml + '</activiti:executionListener>\n'
    return xml;
  }
});
/**
 * Process field object
 */
ESTDesigner.model.Field = ESTDesigner.model.BaseModel.extend({
  init: function () {
    this.id = ESTDesigner.tool.UUID.create();
    this.name = null;
    this.type = null;
    this.value = null;
  },
  toJSON: function () {
    var json = {
      id: this.id,
      name: this.name,
      type: this.type,
      value: this.value
    };
    return JSON.stringify(json);
  },
  toXML: function () {
    var xml = '<activiti:field name="' + this.name + '">\n';
    if (this.type == 'string') {
      xml = xml + '<activiti:string>' + this.value + '</activiti:string>\n';
    } else if (this.type = 'expression') {
      xml = xml + '<activiti:expression>' + this.value + '</activiti:expression>\n';
    }
    xml = xml + '</activiti:field>\n';
    return xml
  }
});
// form porperties object
ESTDesigner.model.FormProperty = ESTDesigner.model.BaseModel.extend({
  init: function () {
    this.id = null;
    this.name = null;
    this.type = null;
    this.expression = null;
    this.variable = null;
    this.defaultValue = null;
    this.datePattern = null;
    this.readable = null;
    this.writeable = null;
    this.required = null;
    this.values = new draw2d.util.ArrayList();
  },
  addValues: function (value) {
    this.values.add(value);
  },
  getPropValuesXML: function () {
    var xml = "";
    for (var i = 0; i < this.values.getSize(); i++) {
      var val = this.values.get(i);
      xml = xml + val.toXML();
    }
    return xml;
  },
  toXML: function () {
    var xml = '<activiti:formProperty id="' + this.id + '" name="' + this.name + '" ';
    if (this.type != null) {
      xml = xml + 'type="' + this.type + '" ';
    }
    if (this.expression != null && this.expression != '') {
      xml = xml + 'expression="' + this.expression + '" ';
    }
    if (this.variable != null && this.variable != '') {
      xml = xml + 'variable="' + this.variable + '" ';
    }
    if (this.defaultValue != null && this.defaultValue != '') {
      xml = xml + 'default="' + this.defaultValue + '" ';
    }
    if (this.datePattern != null && this.datePattern != '') {
      xml = xml + 'datePattern="' + this.datePattern + '" ';
    }
    if (this.readable != null && this.readable != '') {
      xml = xml + 'readable="' + this.readable + '" ';
    }
    if (this.writeable != null && this.writeable != '') {
      xml = xml + 'writeable="' + this.writeable + '" ';
    }
    if (this.required != null && this.required != '') {
      xml = xml + 'required="' + this.required + '" ';
    }
    xml = xml + '>\n';
    xml = xml + this.getPropValuesXML();
    xml = xml + '</activiti:formProperty>\n'
    return xml;
  },
  getFormValue: function (id) {
    for (var i = 0; i < this.values.getSize(); i++) {
      var v = this.values.get(i);
      if (v.id == id) {
        return v;
      }
    }
  },
  getFormValueByKey: function (key) {
    for (var i = 0; i < this.values.getSize(); i++) {
      var v = this.values.get(i);
      if (v.key == key) {
        return v;
      }
    }
  },
  deleteFormValue: function (id) {
    var field = this.getFormValue(id);
    this.values.remove(field);
  },
  deleteFormValueByKey: function (key) {
    var field = this.getFormValueByKey(key);
    this.values.remove(field);
  },
  getValuesString: function () {
    var f = '';
    for (var i = 0; i < this.values.getSize(); i++) {
      var v = this.values.get(i);
      f = f + v.id + ":" + v.name + ",";
    }
    return f;
  }
});
ESTDesigner.model.FormValue = ESTDesigner.model.BaseModel.extend({
  init: function () {
    this.key = null;
    this.id = null;
    this.name = null;
  },
  toXML: function () {
    var xml = '<activiti:value id="' + this.id + '" name="' + this.name +
      '"></activiti:value>\n';
    return xml
  }
});
/**
 * Task listener object definition
 */
ESTDesigner.model.TaskListener = ESTDesigner.model.Listener.extend({
  init: function () {
    this._super();
  },
  toXML: function () {
    var xml = '<activiti:taskListener event="' + this.event + '" ';
    if (this.serviceType == 'javaClass') {
      xml = xml + 'class="' + this.serviceClass + '" ';
    } else if (this.serviceType == 'expression') {
      xml = xml + 'expression="' + this.serviceExpression + '" ';
    }
    xml = xml + '>\n';
    xml = xml + this.getFieldsXML();
    xml = xml + '</activiti:taskListener>\n'
    return xml;
  }
});
/**
 * Line listener object definition
 */
ESTDesigner.model.ConnectionListener = ESTDesigner.model.Listener.extend({
  init: function () {
    this._super();
  },
  toXML: function () {
    var xml = '<activiti:executionListener ';
    if (this.serviceType == 'javaClass') {
      xml = xml + 'class="' + this.serviceClass + '" ';
    } else if (this.serviceType == 'expression') {
      xml = xml + 'expression="' + this.serviceExpression + '" ';
    }
    xml = xml + '>\n';
    xml = xml + this.getFieldsXML();
    xml = xml + '</activiti:executionListener>\n'
    return xml;
  }
});

export const formatXml = function (text) {
  // 去掉多余的空格
  text = '\n' + text.replace(/(<\w+)(\s.*?>)/g, function ($0, name, props) {
    return name + ' ' + props.replace(/\s+(\w+=)/g, " $1");
  }).replace(/>\s*?</g, ">\n<");

  // 把注释编码
  text = text.replace(/\n/g, '\r').replace(/<!--(.+?)-->/g, function ($0, text) {
    var ret = '<!--' + escape(text) + '-->';
    // alert(ret);
    return ret;
  }).replace(/\r/g, '\n');

  // 调整格式
  var rgx = /\n(<(([^\?]).+?)(?:\s|\s*?>|\s*?(\/)>)(?:.*?(?:(?:(\/)>)|(?:<(\/)\2>)))?)/mg;
  var nodeStack = [];
  var output = text.replace(rgx, function ($0, all, name, isBegin, isCloseFull1, isCloseFull2,
    isFull1, isFull2) {
    var isClosed = (isCloseFull1 == '/') || (isCloseFull2 == '/') || (isFull1 == '/') ||
      (isFull2 == '/');
    // alert([all,isClosed].join('='));
    var prefix = '';
    if (isBegin == '!') {
      prefix = getPrefix(nodeStack.length);
    } else {
      if (isBegin != '/') {
        prefix = getPrefix(nodeStack.length);
        if (!isClosed) {
          nodeStack.push(name);
        }
      } else {
        nodeStack.pop();
        prefix = getPrefix(nodeStack.length);
      }

    }
    var ret = '\n' + prefix + all;
    return ret;
  });

  var prefixSpace = -1;
  var outputText = output.substring(1);

  // 把注释还原并解码，调格式
  outputText = outputText.replace(/\n/g, '\r').replace(/(\s*)<!--(.+?)-->/g,
    function ($0, prefix, text) {
      // alert(['[',prefix,']=',prefix.length].join(''));
      if (prefix.charAt(0) == '\r')
        prefix = prefix.substring(1);
      text = unescape(text).replace(/\r/g, '\n');
      var ret = '\n' + prefix + '<!--' + text.replace(/^\s*/mg, prefix) + '-->';
      // alert(ret);
      return ret;
    });

  return outputText.replace(/\s+$/g, '').replace(/\r/g, '\r\n');
}

function getPrefix(prefixIndex) {
  var span = '    ';
  var output = [];
  for (var i = 0; i < prefixIndex; ++i) {
    output.push(span);
  }

  return output.join('');
}

function parseConnection(xmlNode, connectionList, canvas, edgeList) {
  var lines = xmlNode.find('sequenceFlow');
  lines.each(function (i) {
    var lid = $(this).attr('id');
    var name = $(this).attr('name');
    var condition = $(this).find('conditionExpression').text();
    var sourceRef = $(this).attr('sourceRef');
    var targetRef = $(this).attr('targetRef');
    var connectionEdge = null;
    for (var i = 0; i < edgeList.getSize(); i++) {
      var edge = edgeList.get(i);
      if (edge.id == lid) {
        connectionEdge = edge;
        break;
      }
    }
    var source = canvas.getFigure(sourceRef);
    var target = canvas.getFigure(targetRef);
    var sPorts = source.getPorts();
    var tPorts = target.getPorts();
    var startPort = null;
    var endPort = null;
    for (var i = 0; i < sPorts.getSize(); i++) {
      var s = sPorts.get(i);
      var x = s.getAbsoluteX();
      var y = s.getAbsoluteY();
      if (x == connectionEdge.startX && y == connectionEdge.startY) {
        startPort = s;
        break;
      }
    }
    for (var i = 0; i < tPorts.getSize(); i++) {
      var t = tPorts.get(i);
      var x = t.getAbsoluteX();
      var y = t.getAbsoluteY();
      if (x == connectionEdge.endX && y == connectionEdge.endY) {
        endPort = t;
        break;
      }
    }
    var connection = canvas.createConnection(startPort, endPort);
    connection.id = lid;
    connection.name = name;
    connection.condition = condition;
    connection.sourceRef = sourceRef;
    connection.targetRef = targetRef;
    connectionList.add(connection);
  });
}

function loadConnectionLocation(connection, edgeList) {
  for (var i = 0; i < edgeList.getSize(); i++) {
    var edge = edgeList.get(i);
    if (edge.id == connection.id) {
      connection.startX = edge.startX;
      connection.startY = edge.startY;
      connection.endX = edge.endX;
      connection.endY = edge.endY;
      return;
    }
  }
}

function loadFigureLocation(figure, shapeList) {
  for (var i = 0; i < shapeList.getSize(); i++) {
    var shape = shapeList.get(i);
    if (shape.id == figure.id) {
      figure.x = shape.x;
      figure.y = shape.y;
      figure.width = shape.width;
      figure.height = shape.height;
      return;
    }
  }
}

function parseTask(xmlNode, taskList, shapeList) {
  for (var i = 0; i < TASK_PARSER_MAP.length; i++) {
    var map = TASK_PARSER_MAP[i];
    var tasks = xmlNode.find(map.tagName);
    tasks.each(function (i) {
      var task = eval("new " + map.model + ".newInstance()");
      map.parser.parseTask($(this), task);
      // console.dir(task);
      taskList.add(task);
    });
  }
  for (var i = 0; i < taskList.getSize(); i++) {
    loadFigureLocation(taskList.get(i), shapeList);
  }
}

function parseGateway(xmlNode, gatewayList) {
  var exclusiveGateway = xmlNode.find('exclusiveGateway');
  var parallelGateway = xmlNode.find('parallelGateway');
  exclusiveGateway.each(function (i) {
    var gateway = new ESTDesigner.gateway.ParallelGateway();
    var id = $(this).attr('id');
    var name = $(this).attr('name');
    gateway.id = gtwid;
    gateway.name = gtwname;
    gatewayList.add(gateway);
  });
  parallelGateway.each(function (i) {
    var gateway = new ESTDesigner.gateway.ExclusiveGateway();
    var gtwid = $(this).attr('id');
    var gtwname = $(this).attr('name');
    gateway.id = gtwid;
    gateway.name = gtwname;
    gatewayList.add(gateway);
  });
}
ESTDesigner.model.BaseModel = Class.extend({
  init: function () {

  }
});
ESTDesigner.task.BaseTask = draw2d.shape.basic.Rectangle.extend({
  init: function (attr, setter, getter) {
    // additional attribute
    this.name = null;
    this.iconPath = null; // icon path
    this.listeners = new draw2d.util.ArrayList();
    this.type = null;
    this.title = null;
    this.documentation = null;
    this.asynchronous = null;
    // this.contextMenuHandler = null;
    this.exclusive = true;
    this.isSequential = false;
    this._loopCardinality = null;
    this._collection = null;
    this._elementVariable = null;
    this._completionCondition = null;
    this._super($.extend({
      id: ESTDesigner.tool.UUID.create()
    }, attr), $.extend({
      type: this.setType,
      title: this.setTitle,
      iconPath: this.setIconPath
    }, setter), $.extend({
      type: this.getType,
      title: this.getTitle,
      iconPath: this.getIconPath
    }, getter));
    this.setBackgroundColor("#93d7f3");
    this.setColor("#39b2e5");
    this.setStroke(1);
    this.setRadius(2);
    this.setDimension(130, 60);
    this.setResizeable(true);
    this.createPort("hybrid", new draw2d.layout.locator.LeftLocator());
    this.createPort("hybrid", new draw2d.layout.locator.RightLocator());
    this.createPort("hybrid", new draw2d.layout.locator.BottomLocator());
    this.createPort("hybrid", new draw2d.layout.locator.TopLocator());

    // task's icon
    this.ico = new draw2d.shape.basic.Image();
    this.ico.setDimension(20, 20);
    this.ico.path = this.iconPath == null ? "" : this.getIconPath();
    this.ico.on("contextmenu", function (emitter, event) {
      var task = emitter.getParent();
      task.onContextMenu(event.x, event.y);
    });
    // task type label
    //				this.taskTypeLabel = new draw2d.shape.basic.Label({
    //							bold : true,
    //							fontSize : 13
    //						});
    //				this.ico.add(this.taskTypeLabel, new draw2d.layout.locator.RightLocator());
    //				this.taskTypeLabel.setResizeable(false);
    //				this.taskTypeLabel.setText(this.title);
    //				this.taskTypeLabel.stroke = 0;
    //				this.taskTypeLabel.on("contextmenu", function(emitter, event) {
    //							var task = emitter.getParent().getParent();
    //							task.onContextMenu(event.x, event.y);
    //						});

    // task name label
    this.taskNameLabel = new draw2d.shape.basic.Label();
    this.taskNameLabel.setText('Task Name');
    this.taskNameLabel.setStroke(0);
    var editor = new draw2d.ui.LabelInplaceEditor({
      // called after the value has been set to the LabelFigure
      onCommit: $.proxy(function (value) {
        this.taskNameLabel.getParent().name = value;
      }, this)
    });
    this.taskNameLabel.installEditor(editor);
    this.taskNameLabel.on("contextmenu", function (emitter, event) {
      var task = emitter.getParent();
      task.onContextMenu(event.x, event.y);
    });
    this.taskNameLabel.add(this.ico, new draw2d.layout.locator.LeftLocator());
    this.add(this.taskNameLabel, new draw2d.layout.locator.CenterLocator());


  },
  getType: function () {
    return this.iconPath;
  },
  setType: function (type) {
    this.type = type;
    this.fireEvent("change:type", {
      value: this.type
    });
    return this;
  },
  getTitle: function () {
    return this.title;
  },
  setTitle: function (title) {
    this.title = title;
    this.fireEvent("change:title", {
      value: this.title
    });
    return this;
  },
  getIconPath: function () {
    return this.iconPath;
  },
  setIconPath: function (path) {
    this.iconPath = path;
    this.fireEvent("change:iconPath", {
      value: this.iconPath
    });
    return this;
  },
  setTaskName: function (name) {
    this.taskNameLabel.setText(name);
    this.name = name;
  },
  toXML: function () {
    return "";
  },
  toXML1: function (order) {
    return "";
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
  onContextMenu: function (x, y) {
    var canvas = this.getCanvas();
    $.contextMenu({
      selector: 'body',
      events: {
        hide: function () {
          $.contextMenu('destroy');
        }
      },
      callback: $.proxy(function (key, options) {
        switch (key) {
          case "Properties":
            if (canvas.taskCallback != null) {
              if (typeof canvas.taskCallback == "function")
                canvas.taskCallback(this, key);
            }
            break;
          case "Delete":
            // without undo/redo support
            // this.getCanvas().remove(this);

            // with undo/redo support
            var cmd = new draw2d.command.CommandDelete(this);
            this.getCanvas().getCommandStack().execute(cmd);
          default:
            break;
        }

      }, this),
      x: x,
      y: y,
      items: {
        "Properties": {
          name: "属性"
        },
        "sep1": "---------",
        "Delete": {
          name: "删除"
        }
      }
    });
  },
  getGeneralXML: function () {
    var name = this.id;
    var taskName = $.trim(this.name);
    if (taskName != null && taskName != "")
      name = taskName;
    var xml = ' id="' + this.id + '" name="' + name + '" ';
    if (this.asynchronous) {
      xml = xml + 'activiti:async="true" '
    }
    if (!this.exclusive) {
      xml = xml + 'activiti:exclusive="false" '
    }
    return xml;
  },

  getMultiInstanceXML: function () {
    var xml = '';
    if (this.isSequential) {
      xml = xml + '<multiInstanceLoopCharacteristics ';
      if (this._elementVariable != null && this._elementVariable != '')
        xml = xml + 'activiti:elementVariable="' + this._elementVariable + '" ';
      if (this._collection != null && this._collection != '')
        xml = xml + 'activiti:collection="' + this._collection + '" ';
      xml = xml + '>\n'
      if (this._loopCardinality != null && this._loopCardinality != '')
        xml = xml + '<loopCardinality>' + this._loopCardinality +
        '</loopCardinality>\n';
      if (this._completionCondition != null && this._completionCondition != '')
        xml = xml + '<completionCondition>' + this._completionCondition +
        '</completionCondition>\n'
      xml = xml + '</multiInstanceLoopCharacteristics>\n';
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
  getListenersXML: function () {
    var xml = '';
    for (var i = 0; i < this.listeners.getSize(); i++) {
      var listener = this.listeners.get(i);
      xml = xml + listener.toXML();
    }
    return xml;
  },
  toBpmnDI: function () {
    var w = Math.round(this.getWidth());
    var h = Math.round(this.getHeight());
    var x = Math.round(this.getAbsoluteX());
    var y = Math.round(this.getAbsoluteY());
    this.node.layout=x+","+y+","+w+","+h;
    var xml = '<bpmndi:BPMNShape bpmnElement="' + this.getId() + '" id="BPMNShape_' +
      this.getId() + '">\n';
    xml = xml + '<omgdc:Bounds height="' + h + '" width="' + w + '" x="' + x + '" y="' +
      y + '"/>\n';
    xml = xml + '</bpmndi:BPMNShape>\n';
    return xml;
  }
});
