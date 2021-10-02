<template>
  <el-row>
    <el-col :span="24">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="right" size="mini">
        <el-form-item label="事件" prop="listenerEventType">
          <el-select v-model="form.listenerEventType" clearable>
            <el-option v-for="item in evens" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="listenerServiceType" label="类型">
          <el-radio-group v-model="form.listenerServiceType" @change="changeServiceType">
            <el-radio label="javaClass" border>java类</el-radio>
            <el-radio label="expression" border>表达式</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.listenerServiceType==='javaClass'" prop="listenerServiceClass" label="java类">
          <el-input v-model="form.listenerServiceClass" clearable></el-input>
        </el-form-item>
        <el-form-item v-if="form.listenerServiceType==='expression'" prop="listenerServiceExpression" label="表达式">
          <el-input v-model="form.listenerServiceExpression" clearable></el-input>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24">
      <vxe-toolbar setting>
        <template v-slot:buttons>
          <el-button @click="insertEvent">添加Field</el-button>
        </template>
      </vxe-toolbar>
      <vxe-table ref="xTable" class="vxe-table-element" border auto-resize show-overflow :data.sync="tableData" :edit-rules="validRules" :edit-config="{key: 'id', trigger: 'click', mode: 'row'}">
        <vxe-table-column field="fieldName" title="名称" :edit-render="{name: 'ElInput'}"></vxe-table-column>
        <vxe-table-column field="type" title="类型" :edit-render="{name: 'ElSelect',options: typeList}"></vxe-table-column>
        <vxe-table-column field="value" title="值" :edit-render="{name: 'ElInput'}"></vxe-table-column>
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
          <el-button type="primary" icon="el-icon-edit" @click="saveEvent('form')">保存</el-button>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Message from "../../common/Message";
export default {
  props: {
    listenerId: String
  },
  data() {
    var validateServiceClass = (rule, value, callback) => {
      if (this.form.listenerServiceType === "javaClass" && value === "") {
        callback(new Error("java类必须填写"));
      } else {
        callback();
      }
    };
    var vaidateServiceExpression = (rule, value, callback) => {
      if (this.form.listenerServiceType === "expression" && value === "") {
        callback(new Error("表达式必须填写"));
      } else {
        callback();
      }
    };
    return {
      evens: [
        {
          value: "start",
          label: "开始"
        },
        {
          value: "end",
          label: "结束"
        }
      ],
      form: {
        id: "",
        listenerEventType: "",
        listenerServiceType: "javaClass",
        listenerServiceClass: "",
        listenerServiceExpression: ""
      },
      rules: {
        listenerEventType: [
          {
            required: true,
            message: "事件必须填写",
            trigger: "change"
          }
        ],
        listenerServiceClass: [
          {
            validator: validateServiceClass,
            trigger: "blur"
          }
        ],
        listenerServiceExpression: [
          {
            validator: vaidateServiceExpression,
            trigger: "blur"
          }
        ]
      },
      tableData: [],
      validRules: {
        fieldName: [
          {
            required: true,
            message: "名称必须填写"
          }
        ],
        type: [
          {
            required: true,
            message: "类型必须填写"
          }
        ],
        value: [
          {
            required: true,
            message: "值必须填写"
          }
        ]
      },
      typeList: [
        {
          value: "string",
          label: "string"
        },
        {
          value: "expression",
          label: "expression"
        }
      ]
    };
  },
  mounted() {
    let id = this.listenerId;
    if (id !== "" && id != null && id != undefined) {
      this.loadListener(id);
    }
  },
  methods: {
    ...mapActions(["saveExecutionListener"]),
    loadListener(id) {
      let task = this.$store.state.selectedTask;
      let listener = task.getListener(id);
      this.form.id = listener.id;
      this.form.listenerEventType = listener.event;
      this.form.listenerServiceType = listener.serviceType;
      this.form.listenerServiceClass = listener.serviceClass;
      this.form.listenerServiceExpression = listener.serviceExpression;
      this.loadFields(listener);
    },
    loadFields(listener) {
      let fields = listener.fields;
      let fieldTabData = [];
      for (let i = 0; i < fields.getSize(); i++) {
        let field = {
          id: fields.get(i).id,
          fieldName: fields.get(i).name,
          type: fields.get(i).type,
          value: fields.get(i).value
        };
        fieldTabData.push(field);
      }
      this.tableData = fieldTabData;
    },
    changeServiceType(val) {
      this.form.listenerServiceType = val;
    },
    editRowEvent(row) {
      this.$refs.xTable.setActiveRow(row);
    },
    insertEvent() {
      let record = {
        fieldName: "",
        type: "",
        value: ""
      };
      this.$refs.xTable
        .insert(record)
        .then(({ row }) => this.$refs.xTable.setActiveRow(row));
    },
    removeRowEvent(row) {
      this.$refs.xTable.remove(row);
    },
    saveEvent(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        } else {
          this.$refs.xTable.fullValidate((valid, errMap) => {
            if (!valid) {
              let msgList = [];
              Object.values(errMap).forEach(errList => {
                errList.forEach(params => {
                  let { rowIndex, column, rules } = params;
                  rules.forEach(rule => {
                    msgList.push(
                      `第 ${rowIndex} 行 ${column.title} 校验错误：${
                        rule.message
                      }`
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
                form: this.form,
                insertFields: insertRecords,
                updateFields: updateRecords,
                delFields: removeRecords
              };
              this.saveExecutionListener(payload);
              let self = this;
              Message.success("保存成功！", function() {
                self.$emit("close");
              });
            }
          });
        }
      });
    }
  }
};
</script>
