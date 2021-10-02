<template>
    <el-row>
        <el-col :span="24">
            <el-tabs type="border-card" v-model="tabActiveName">
                <el-tab-pane label="常规" name="general">
                    <sub-process-general></sub-process-general>
                </el-tab-pane>
                <el-tab-pane label="流程变量" name="variable">
                    <sub-process-variable></sub-process-variable>
                </el-tab-pane>
                <el-tab-pane label="数据对象" name="dataObject">
                    <sub-process-data-obj></sub-process-data-obj>
                </el-tab-pane>
                <el-tab-pane label="事件监听" name="listener">
                    <sub-process-listener></sub-process-listener>
                </el-tab-pane>
                <el-tab-pane label="多实例" name="multiInstance">
                    <sub-process-multi-instance></sub-process-multi-instance>
                </el-tab-pane>
            </el-tabs>
        </el-col>
    </el-row>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import SubProcessVariable from "../ProcessVariable";
import SubProcessGeneral from "./SubProcessGeneral";
import SubProcessDataObj from "../ProcessDataObj";
import SubProcessListener from "../ProcessListener";
import SubProcessMultiInstance from "./SubProcessMultiInstance";
export default {
  data() {
    return {
      tabActiveName: "general"
    };
  },
  components: {
    SubProcessVariable,
    SubProcessGeneral,
    SubProcessDataObj,
    SubProcessListener,
    SubProcessMultiInstance
  },
  created() {},
  mounted() {},
  activated() {},
  methods: {}
};
</script>
<style lang="less">
</style>
