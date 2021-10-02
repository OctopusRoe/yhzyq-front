<template>
  <div>
    <vxe-toolbar setting>
      <template v-slot:buttons>
        <el-button @click="insertEvent">新增</el-button>
      </template>
    </vxe-toolbar>
    <vxe-table ref="xTable" class="vxe-table-element" border resizable show-overflow :data.sync="tableData">
      <vxe-table-column field="fid" title="Id" width="100"></vxe-table-column>
      <vxe-table-column field="name" title="名称" width="100"></vxe-table-column>
      <vxe-table-column field="type" title="类型" width="100"></vxe-table-column>
      <vxe-table-column field="expression" title="表达式" width="100"></vxe-table-column>
      <vxe-table-column field="variable" title="变量" width="100"></vxe-table-column>
      <vxe-table-column field="defaultValue" title="默认值" width="100"></vxe-table-column>
      <vxe-table-column field="datePattern" title="日期格式" width="100"></vxe-table-column>
      <vxe-table-column field="readable" title="只读" :formatter="formatTrueAndFalse" width="100"></vxe-table-column>
      <vxe-table-column field="writeable" title="可写" :formatter="formatTrueAndFalse" width="100"></vxe-table-column>
      <vxe-table-column field="required" title="必填" :formatter="formatTrueAndFalse" width="100"></vxe-table-column>
      <vxe-table-column field="formValues" title="可选值" width="100"></vxe-table-column>
      <vxe-table-column title="操作" width="200">
        <template v-slot="{ row }">
          <div style="justify-content:flex-start">
            <vxe-button @click="removeRowEvent(row)">删除</vxe-button>
            <vxe-button @click="updateRowEvent(row)">编辑</vxe-button>
          </div>
        </template>
      </vxe-table-column>
    </vxe-table>
    <el-dialog v-if="dialogVisible" :visible.sync="dialogVisible" :close-on-click-modal="false" append-to-body>
      <template slot="title">
        <i class="el-icon-setting"></i>{{dialogTitle}}
      </template>
      <task-form-cfg :propId="propId" @close="closeDialog"></task-form-cfg>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import TaskFormCfg from "./TaskFormCfg";
export default {
  components: {
    TaskFormCfg
  },
  data() {
    return {
      propId: "",
      tableData: [],
      dialogVisible: false,
      dialogTitle: "添加表单域"
    };
  },
  computed: {
    ...mapGetters(["taskFormProps"])
  },
  watch: {
    taskFormProps: {
      deep: true,
      handler(val, oldVal) {
        this.loadTaskForm();
      }
    }
  },
  methods: {
    ...mapActions(["delTaskForm"]),
    formatTrueAndFalse({ cellValue, row, column }) {
      if (cellValue === "true") {
        return "是";
      } else if (cellValue === "false") {
        return "否";
      } else {
        return "";
      }
    },
    loadTaskForm() {
      let task = this.$store.state.selectedTask;
      if (task != null && task != undefined) {
        let props = task.formProperties;
        let tableData = [];
        for (var i = 0; i < props.getSize(); i++) {
          var prop = props.get(i);
          var nprop = {
            fid: prop.id,
            name: prop.name,
            type: prop.type,
            expression: prop.expression,
            variable: prop.variable,
            defaultValue: prop.defaultValue,
            datePattern: prop.datePattern,
            readable: prop.readable,
            writeable: prop.writeable,
            required: prop.required,
            formValues: prop.getValuesString()
          };
          tableData.push(nprop);
        }
        this.tableData = tableData;
      }
    },
    insertEvent() {
      this.dialogVisible = true;
      //this.$router.push({ name: "formCfg", params: { id: "" } });
      //this.$router.push({ path: "/userTask/formCfg" });
    },
    updateRowEvent(row) {
      this.dialogVisible = true;
      this.propId = row.fid;
      //this.$router.push({ name: "formCfg", params: { id: row.fid } });
    },
    removeRowEvent(row) {
      this.delTaskForm(row.fid);
    },
    closeDialog() {
      this.dialogVisible = false;
    }
  },
  mounted() {
    this.loadTaskForm();
  }
};
</script>