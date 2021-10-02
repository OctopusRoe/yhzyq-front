<template>
  <div
    id="flowDesign"
    :style="{ height: screenHeight }"
    title="编辑流程"
    style="border-bottom:1px solid #E4E7ED"
  >
    <el-container style="height:100%">
      <el-header
        style="height:auto;padding:20px;border-bottom:1px solid #E4E7ED"
      >
        <el-button icon="el-icon-download" @click="exportXml">导出 </el-button>
        <el-button icon="el-icon-upload2" @click="importXml">导入 </el-button>
        <el-button type="primary" icon="el-icon-edit" @click="saveFlow"
        >保存
        </el-button>
      </el-header>
      <el-container>
        <el-aside
          width="220px"
          style="background-color: #fff;border-right:1px solid #E4E7ED"
        >
          <node-bar @addNode="handleAddNode" />
        </el-aside>
        <el-main class="design-main">
          <draggable
            class=""
            v-bind="{
              group: { name: 'people', put: false },
              ghostClass: 'ghost',
              animation: 200,
              sort: false
            }"
          >
            <div
              id="paintarea"
              onselectstart="javascript:/*IE8 hack*/return false"
              class="paint-area"
            ></div>
          </draggable>
        </el-main>
      </el-container>
    </el-container>
    <exportXML ref="ExportXml"></exportXML>
    <importXml ref="ImportXml"></importXml>
    <connectionProperties ref="ConnectionProperties"></connectionProperties>
    <userTask ref="UserTaskProperties"></userTask>
    <processProperties ref="ProcessProperties"></processProperties>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from "vuex";
  import NodeBar from "../../components/flow/node/NodeBar";
  import Draggable from "vuedraggable";
  import "../../components/flow/node/Application";
  import "../../components/flow/node/Parser";

  import Canvas from "../../components/flow/node/Canvas";
  import { createTask } from "../../components/flow/node/Task";
  import Event from "../../components/flow/node/Event";
  import Container from "../../components/flow/node/Container";
  import Gateway from "../../components/flow/node/Gateway";
  import ExportXml from "../../components/flow/page/ExportXML";
  import ImportXml from "../../components/flow/page/ImportXML";
  import ConnectionProperties from "../../components/flow/page/connection/ConnectionProperties";
  import UserTaskProperties from "../../components/flow/page/task/UserTaskProperties";
  import ProcessProperties from "../../components/flow/page/ProcessProperties";
  import { deployByJson, authorize, listFlow } from "../../api/flow/flowManage";
  import ESTDesigner from "../../components/flow/node/Packages";

  export default {
    name: "flowDesign",
    data() {
      return {
        token: "",
        orgIds: "",
        type: "",
        screenHeight: "",
        tabContentHeight: "",
        tabContentWidth: "",
        activeName: "workflow",
        canvas: null,
        modelType: "",
        dialogTitle: "",
        dialogVisible: false,
        xml: "",
        taskData: "",
        id: "",
        originalContent: ""
      };
    },
    components: {
      "node-bar": NodeBar,
      Draggable,
      exportXML: ExportXml,
      importXml: ImportXml,
      connectionProperties: ConnectionProperties,
      userTask: UserTaskProperties,
      processProperties: ProcessProperties
    },
    computed: {},
    created() {
      this.parser();
    },
    mounted() {
      this.init();
      if (this.originalContent) {
        let canvas = this.$store.state.canvas;
        canvas.clear();
        let parser = new ESTDesigner.tool.Parser(canvas, this.originalContent);
        parser.parse();
      }
    },
    watch: {},
    methods: {
      ...mapActions([
        "loadCanvas",
        "setProcess",
        "setSelectedTask",
        "setSelectedConnection",
        "setSubProcess"
      ]),
      parser() {
        const query = this.$route.params;
        const id = query.id;
        this.id = id;
        this.orgIds = query.orgIds;
        this.type = query.type;
        this.originalContent = query.originalContent;
      },
      init() {
        let _this = this;
        this.screenHeight = document.documentElement.clientHeight - 50 + "px";
        this.tabContentHeight =
          document.documentElement.clientHeight - 200 + "px";
        this.tabContentWidth = document.documentElement.clientWidth - 400 + "px";
        let canvas = new Canvas.render("paintarea");

        $("#paintarea")
          .children("svg")
          .css("position", "inherit");
        this.canvas = canvas;
        let start = new Event.Start();
        let end = new Event.End();
        canvas.add(start, 100, 50);
        canvas.add(end, 100, 400);
        this.bindContextMenu();
        this.loadCanvas(this.canvas);
      },
      bindContextMenu() {
        this.bindCanvasContextMenu();
        this.bindTaskContextMenu();
        this.bindConnectionContextMenu();
        this.bindSubProcessContextMenu();
      },
      bindCanvasContextMenu() {
        let self = this;
        //注册canvas右键菜单处理回调函数
        this.canvas.callback = function(evt) {
          self.setProcess(self.canvas.process);
          self.$refs.ProcessProperties.showModal(self.canvas.process);
        };
      },
      bindTaskContextMenu() {
        let self = this;
        const orgId = this.orgIds;
        this.canvas.taskCallback = function(task, key) {
          self.dialogVisible = true;
          self.setSelectedTask(task);
          switch (task.type) {
            case "ESTDesigner.task.UserTask":
              self.$refs.UserTaskProperties.showModal(task, orgId);
              break;
            case "ESTDesigner.task.ManualTask":
              self.dialogTitle = "Manual Task属性";
              self.$router.replace({ name: "manualTaskProp" });
              break;
            case "ESTDesigner.task.ServiceTask":
              self.dialogTitle = "Service Task属性";
              self.$router.replace({ name: "serviceTaskProp" });
              break;
            case "ESTDesigner.task.ScriptTask":
              self.dialogTitle = "Script Task属性";
              self.$router.replace({ name: "scriptTaskProp" });
              break;
            case "ESTDesigner.task.ReceiveTask":
              self.dialogTitle = "Receive Task属性";
              self.$router.replace({ name: "recieveTaskProp" });
              break;
            case "ESTDesigner.task.MailTask":
              self.dialogTitle = "Mail Task属性";
              self.$router.replace({ name: "mailTaskProp" });
              break;
            case "ESTDesigner.task.BusinessRuleTask":
              self.dialogTitle = "Business Rule Task属性";
              self.$router.replace({ name: "businessRuleTaskProp" });
              break;
            case "ESTDesigner.task.CallActivityTask":
              self.dialogTitle = "Call Activity Task属性";
              self.$router.replace({ name: "callActivityTaskProp" });
              break;
            default:
              break;
          }
        };
      },
      bindConnectionContextMenu() {
        let self = this;
        this.canvas.connectionCallback = function(connection) {
          self.setSelectedConnection(connection);
          self.$refs.ConnectionProperties.showModal(
            connection.id,
            connection.name
          );
        };
      },
      bindSubProcessContextMenu() {
        let self = this;
        this.canvas.containerCallback = function(subProcess) {
          self.dialogVisible = true;
          self.dialogTitle = "子流程属性";
          self.setSubProcess(subProcess);
          self.$router.replace({
            name: "subProcessProp"
          });
        };
      },
      handleAddNode(evt) {
        let node = evt.item;
        let modelType = node.dataset.model;
        let model = this.createModel(modelType);
        if (model != null) {
          let cvx = this.canvas.getAbsoluteX();
          let cvy = this.canvas.getAbsoluteY();
          let scrollLeft = this.canvas.getScrollLeft();
          let scrollTop = this.canvas.getScrollTop();
          let x = evt.originalEvent.clientX - cvx + scrollLeft;
          let y = evt.originalEvent.clientY - cvy + scrollTop;
          this.canvas.add(model, x, y);
        }
      },
      evil(js) {
        let fn = Function;
        return new fn("return " + js);
      },
      createModel(type) {
        //console.log("task类型", type, type.indexOf("Task."));
        if (type.indexOf("Task.") !== -1) {
          return createTask(type);
        } else {
          if (type === "Event.Start") {
            return new Event.Start();
          }
          if (type === "Event.End") {
            return new Event.End();
          }
          if (type === "Gateway.Parallel") {
            var model = new Gateway.ParallelGateway();
            model.name = "并行网关";
            return model;
          }
          if (type === "Gateway.Exclusive") {
            var model = new Gateway.ExclusiveGateway();
            model.name = "排他网关";
            return model;
          }
          if (type === "Task.SubProcess") {
            return new Container.SubProcess();
          }
        }
        return null;
      },
      exportXml() {
        this.$refs.ExportXml.showModal();
      },
      importXml() {
        this.$refs.ImportXml.showModal();
      },
      saveFlow() {
        let canvas = this.$store.state.canvas;
        this.taskData = canvas.toXML1();
        console.log(this.taskData);
        let taskName = this.taskData.taskName;
        this.xml = canvas.toXML();
        const query = this.$route.params;
        const id = query.id;
        const data = {
          json: this.taskData,
          id: id,
          taskName: taskName,
          orgIds: this.orgIds,
          taskType: this.type,
          originalXml: this.xml
        };
        deployByJson(data).then(response => {
          this.$message({
            type: "success",
            message: "保存成功!"
          });
          this.$store.state.tagsView.visitedViews.splice(
            this.$store.state.tagsView.visitedViews.findIndex(
              item => item.path === this.$route.path
            ),
            1
          );
          this.$router.push(
            this.$store.state.tagsView.visitedViews[
            this.$store.state.tagsView.visitedViews.length - 1
              ].path
          );
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  aside {
    margin-bottom: 0;
  }
  .design-main {
    background: url(../../assets/image/grid.png) #f9f9f9;
    div{
      height: 100%;
      div {
        height: 100%;
        svg{
          height: 100%;
        }
      }
    }
  }
</style>

<style>
  #context-menu-layer {
    z-index: 1000 !important;
  }

  .context-menu-list {
    z-index: 1000 !important;
  }
</style>
