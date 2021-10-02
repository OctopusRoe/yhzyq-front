<template>
    <el-row>
        <el-col :span="24">
            <vxe-toolbar setting>
                <template v-slot:buttons>
                    <el-button @click="insertEvent">添加</el-button>
                </template>
            </vxe-toolbar>
            <vxe-table ref="xTable" class="vxe-table-element" border auto-resize show-overflow :data.sync="tableData" :edit-rules="validRules" :edit-config="{key: 'id', trigger: 'click', mode: 'row'}">
                <vxe-table-column field="_source" title="_source" :edit-render="{name: 'ElInput'}"></vxe-table-column>
                <vxe-table-column field="sourceExpression" title="表达式" :edit-render="{name: 'ElInput'}"></vxe-table-column>
                <vxe-table-column field="_target" title="目标" :edit-render="{name: 'ElInput'}"></vxe-table-column>
                <vxe-table-column title="操作">
                    <template v-slot="{ row }">
                        <vxe-button @click="removeRowEvent(row)">删除</vxe-button>
                    </template>
                </vxe-table-column>
            </vxe-table>
        </el-col>
        <el-col :span="24">
            <el-row type="flex" justify="center">
                <el-col :span="2">
                    <el-button type="primary" icon="el-icon-edit" @click="saveParams">保存</el-button>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Message from "../../common/Message";
export default {
  data() {
    return {
      tableData: [],
      validRules: {
        _source: [
          {
            required: true,
            message: "源必须填写"
          }
        ],
        sourceExpression: [
          {
            required: true,
            message: "表达式必须填写"
          }
        ],
        _target: [
          {
            required: true,
            message: "目标必须填写"
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions(["saveInputParams"]),
    loadParams() {
      let task = this.$store.state.selectedTask;
      let params = task.inputParams;
      let tableData = [];
      for (let i = 0; i < params.getSize(); i++) {
        let param = params.get(i);
        let nParam = {
          id: param.id,
          _source: param.source,
          sourceExpression: param.sourceExpression,
          _target: param.target
        };
        tableData.push(nParam);
      }
      this.tableData = tableData;
    },
    editRowEvent(row) {
      this.$refs.xTable.setActiveRow(row);
    },
    insertEvent() {
      let record = {
        _source: "",
        sourceExpression: "",
        _target: ""
      };
      this.$refs.xTable
        .insert(record)
        .then(({ row }) => this.$refs.xTable.setActiveRow(row));
    },
    removeRowEvent(row) {
      this.$refs.xTable.remove(row);
    },
    saveParams() {
      this.$refs.xTable.fullValidate((valid, errMap) => {
        if (!valid) {
          let msgList = [];
          Object.values(errMap).forEach(errList => {
            errList.forEach(params => {
              let { rowIndex, column, rules } = params;
              rules.forEach(rule => {
                msgList.push(
                  `第 ${rowIndex} 行 ${column.title} 校验错误：${rule.message}`
                );
              });
            });
          });
          let error = Message.render(msgList);
          Message.error(error);
          return false;
        } else {
          let {
            insertRecords,
            removeRecords,
            updateRecords
          } = this.$refs.xTable.getAllRecords();
          //console.log("监听fields", insertRecords, removeRecords, updateRecords);
          let payload = {
            insertParams: insertRecords,
            updateParams: updateRecords,
            delParams: removeRecords
          };
          this.saveInputParams(payload);
          Message.success("保存成功！");
        }
      });
    }
  },
  mounted() {
    this.loadParams();
  }
};
</script>
