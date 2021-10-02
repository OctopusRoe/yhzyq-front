<template>
    <el-row>
        <el-col :span="24">
            <el-tabs type="border-card" v-model="tabActiveName">
                <el-tab-pane label="常规" name="general">
                    <task-general></task-general>
                </el-tab-pane>
                <el-tab-pane label="邮件配置" name="mail">
                    <mail-cfg></mail-cfg>
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
import MailCfg from "./MailCfg";
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
    MailCfg
  }
};
</script>
