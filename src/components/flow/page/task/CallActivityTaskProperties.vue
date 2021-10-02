<template>
    <el-row>
        <el-col :span="24">
            <el-tabs type="border-card" v-model="tabActiveName">
                <el-tab-pane label="常规" name="general">
                    <task-general></task-general>
                </el-tab-pane>
                <el-tab-pane label="调用" name="call">
                    <call-cfg></call-cfg>
                </el-tab-pane>
                <el-tab-pane label="输入参数" name="input">
                    <input-params-cfg></input-params-cfg>
                </el-tab-pane>
                <el-tab-pane label="输出参数" name="output">
                    <output-params-cfg></output-params-cfg>
                </el-tab-pane>
                <el-tab-pane label="事件监听" name="executionListener">
                    <execution-listener></execution-listener>
                </el-tab-pane>
                <el-tab-pane label="多实例" name="multiInstance">
                    <task-multi-instance></task-multi-instance>
                </el-tab-pane>
            </el-tabs>
        </el-col>
    </el-row>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import TaskGeneral from "./TaskGeneral";
import ExecutionListener from "./ExecutionListener";
import TaskMultiInstance from "./TaskMultiInstance";
import CallCfg from "./CallCfg";
import InputParamsCfg from "./InputParamsCfg";
import OutputParamsCfg from "./OutputParamsCfg";
export default {
  data() {
    return {
      tabActiveName: "general"
    };
  },
  components: {
    TaskGeneral,
    ExecutionListener,
    TaskMultiInstance,
    CallCfg,
    InputParamsCfg,
    OutputParamsCfg
  }
};
</script>
