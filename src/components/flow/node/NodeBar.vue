<template>
  <div>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item name="event">
        <template slot="title">
          <div class="node-bar-title">事件</div>
        </template>
        <draggable tag="div" v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}" @end="handleMoveEnd" @start="handleMoveStart" :move="handleMove">
          <node ico="/static/icons/type.startevent.none.png" label="开始" model="Event.Start"></node>
          <node ico="/static/icons/type.endevent.none.png" label="结束" model="Event.End"></node>
        </draggable>
      </el-collapse-item>
      <el-collapse-item name="task">
        <template slot="title">
          <div class="node-bar-title">任务</div>
        </template>
        <draggable tag="div" v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}" @end="handleMoveEnd" @start="handleMoveStart" :move="handleMove">
          <node ico="/static/icons/type.user.png" label="User Task" model="Task.UserTask"></node>
          <node ico="/static/icons/type.manual.png" label="Manual Task" model="Task.ManualTask"></node>
          <node ico="/static/icons/type.script.png" label="Script Task" model="Task.ScriptTask"></node>
          <node ico="/static/icons/type.send.png" label="Mail Task" model="Task.MailTask"></node>
          <node ico="/static/icons/type.service.png" label="Service Task" model="Task.ServiceTask"></node>
          <node ico="/static/icons/type.receive.png" label="Recieve Task" model="Task.ReceiveTask"></node>
          <node ico="/static/icons/type.business.rule.png" label="Business Rule Task" model="Task.BusinessRuleTask"></node>
          <node ico="/static/icons/callactivity.png" label="Call Activity" model="Task.CallActivity"></node>
          <node ico="/static/icons/type.subprocess.expanded.png" label="Sub Process" model="Task.SubProcess"></node>
        </draggable>
      </el-collapse-item>
      <el-collapse-item name="gateway">
        <template slot="title">
          <div class="node-bar-title">Gateway</div>
        </template>
        <draggable tag="div" v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}" @end="handleMoveEnd" @start="handleMoveStart" :move="handleMove">
          <node ico="/static/icons/type.gateway.parallel.png" label="Parallel" model="Gateway.Parallel"></node>
          <node ico="/static/icons/type.gateway.exclusive.png" label="Exclusive" model="Gateway.Exclusive"></node>
        </draggable>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import Node from "./Node";
import Draggable from "vuedraggable";
export default {
  data() {
    return {
      activeName: "task"
    };
  },
  components: {
    node: Node,
    Draggable
  },
  methods: {
    handleMoveEnd(evt) {
      //console.log("end", evt);
      this.$emit("addNode", evt);
    },
    handleMoveStart(evt) {
      //console.log("start", evt);
    },
    handleMove() {
      return true;
    }
  }
};
</script>
<style lang="less">
.node-bar-title {
  padding-left: 1rem;
}
</style>


