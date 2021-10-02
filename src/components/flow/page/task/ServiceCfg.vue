<template>
    <el-row>
        <el-col :span="24">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="right" size="mini">
                <el-form-item label="类型" prop="_type">
                    <el-radio-group v-model="form._type" @change="changeServiceType">
                        <el-radio label="javaClass" border>java类</el-radio>
                        <el-radio label="expression" border>表达式</el-radio>
                        <el-radio label="delegateExpression" border>代理类</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="form._type==='javaClass'" prop="serviceClass" label="服务实现类">
                    <el-input v-model="form.serviceClass" clearable></el-input>
                </el-form-item>
                <el-form-item v-if="form._type==='expression'" prop="_expression" label="表达式">
                    <el-input v-model="form._expression" clearable></el-input>
                </el-form-item>
                <el-form-item v-if="form._type==='delegateExpression'" prop="delegateExpression" label="代理类">
                    <el-input v-model="form.delegateExpression" clearable></el-input>
                </el-form-item>
                <el-form-item prop="resultVariable" label="结果变量">
                    <el-input v-model="form.resultVariable" clearable></el-input>
                </el-form-item>
                <el-form-item prop="documentation" label="说明">
                    <el-input type="textarea" :rows="2" v-model="form.documentation" clearable></el-input>
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
  data() {
    var validateServiceClass = (rule, value, callback) => {
      if (this.form._type === "javaClass" && (value === "" || value === null)) {
        callback(new Error("java类必须填写"));
      } else {
        callback();
      }
    };
    var vaidateServiceExpression = (rule, value, callback) => {
      if (
        this.form._type === "expression" &&
        (value === "" || value === null)
      ) {
        callback(new Error("表达式必须填写"));
      } else {
        callback();
      }
    };
    var vaidateServiceDelegate = (rule, value, callback) => {
      if (
        this.form._type === "delegateExpression" &&
        (value === "" || value === null)
      ) {
        callback(new Error("代理类必须填写"));
      } else {
        callback();
      }
    };
    return {
      form: {
        _type: "",
        serviceClass: "",
        _expression: "",
        delegateExpression: "",
        resultVariable: "",
        documentation: ""
      },
      rules: {
        serviceClass: [
          {
            validator: validateServiceClass,
            trigger: "blur"
          }
        ],
        _expression: [
          {
            validator: vaidateServiceExpression,
            trigger: "blur"
          }
        ],
        delegateExpression: [
          {
            validator: vaidateServiceDelegate,
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
  methods: {
    ...mapActions(["saveTaskService"]),
    changeServiceType(val) {
      this.form._type = val;
    },
    loadService() {
      let task = this.$store.state.selectedTask;
      this.form._type = task._type == null ? "javaClass" : task._type;
      this.form.serviceClass = task._javaClass;
      this.form._expression = task._expression;
      this.form.delegateExpression = task.delegateExpression;
      this.form.resultVariable = task.resultVariable;
      this.form.documentation = task.documentation;
      this.form.nonhtmlText = task._text;
      this.form.htmlText = task._html;
      this.loadFields(task);
    },
    loadFields(task) {
      let fields = task.fields;
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
              this.saveTaskService(payload);
              let self = this;
              Message.success("保存成功！");
            }
          });
        }
      });
    }
  },
  mounted() {
    this.loadService();
  }
};
</script>
