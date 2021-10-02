<template>
  <div>
    <el-row>
      <el-col :span="24">
        <vxe-toolbar setting>
          <template v-slot:buttons>
            <el-button @click="insertEvent">新增</el-button>
          </template>
        </vxe-toolbar>
        <vxe-table ref="xTable" class="vxe-table-element" border auto-resize show-overflow :data.sync="tableData">
          <vxe-table-column field="listenerImplimentation" title="实现类"></vxe-table-column>
          <vxe-table-column field="type" title="类型" :formatter="formatType"></vxe-table-column>
          <vxe-table-column field="event" title="事件" :formatter="formatEvenType"></vxe-table-column>
          <vxe-table-column field="fields" title="Fields"></vxe-table-column>
          <vxe-table-column title="操作" fixed="right">
            <template v-slot="{ row }">
              <vxe-button @click="removeRowEvent(row)">删除</vxe-button>
              <vxe-button @click="updateRowEvent(row)">编辑</vxe-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </el-col>
    </el-row>
    <el-dialog v-if="exeDialogVisible" :visible.sync="exeDialogVisible" :close-on-click-modal="false" append-to-body>
      <template slot="title">
        <i class="el-icon-setting"></i>{{dialogTitle}}
      </template>
      <execution-listener-cfg :listenerId="listenerId" @close="closeDialog"></execution-listener-cfg>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import ExecutionListenerCfg from "./ExecutionListenerCfg";
export default {
  components: {
    ExecutionListenerCfg
  },
  data() {
    return {
      listenerId: "",
      tableData: [],
      exeDialogVisible: false,
      dialogTitle: "Execution事件监听"
    };
  },
  computed: {
    ...mapGetters(["executionListeners"])
  },
  watch: {
    executionListeners: {
      deep: true,
      handler(val, oldVal) {
        this.loadListener();
      }
    }
  },
  mounted() {
    this.loadListener();
  },
  methods: {
    ...mapActions(["delExecutionListener"]),
    formatEvenType({ cellValue, row, column }) {
      if (cellValue === "start") {
        return "开始";
      } else if (cellValue === "end") {
        return "结束";
      } else {
        return "";
      }
    },
    formatType({ cellValue, row, column }) {
      if (cellValue === "javaClass") {
        return "java类";
      } else if (cellValue === "expression") {
        return "表达式";
      } else {
        return "";
      }
    },
    closeDialog() {
      this.exeDialogVisible = false;
    },
    loadListener() {
      let listeners = this.$store.state.selectedTask.listeners;
      let tableData = [];
      for (let i = 0; i < listeners.getSize(); i++) {
        let listener = listeners.get(i);
        let record = {
          id: listener.getId(),
          listenerImplimentation: listener.getServiceImplementation(),
          type: listener.serviceType,
          event: listener.event,
          fields: listener.getFieldsString()
        };
        tableData.push(record);
      }
      //console.log("加载监听列表", tableData);
      this.tableData = tableData;
    },
    insertEvent() {
      this.exeDialogVisible = true;
    },
    updateRowEvent(row) {
      //console.log('修改',row);
      this.listenerId = row.id;
      this.exeDialogVisible = true;
    },
    removeRowEvent(row) {
      this.delExecutionListener(row.id);
    }
  }
};
</script>