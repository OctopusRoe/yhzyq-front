<template>
  <el-row>
    <el-col :span="24">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="right" size="mini">
        <el-form-item label="Id" prop="propertyId">
          <el-input v-model="form.propertyId" clearable></el-input>
        </el-form-item>
        <el-form-item prop="propertyName" label="名称">
          <el-input v-model="form.propertyName" clearable></el-input>
        </el-form-item>
        <el-form-item prop="propertyType" label="类型">
          <el-select v-model="form.propertyType" clearable>
            <el-option v-for="item in propertyTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="expressionValue" label="表达式">
          <el-input v-model="form.expressionValue" clearable></el-input>
        </el-form-item>
        <el-form-item prop="variable" label="变量">
          <el-input v-model="form.variable" clearable></el-input>
        </el-form-item>
        <el-form-item prop="default" label="默认值">
          <el-input v-model="form.default" clearable></el-input>
        </el-form-item>
        <el-form-item prop="datePattern" label="日期格式">
          <el-input v-model="form.datePattern" clearable></el-input>
        </el-form-item>
        <el-form-item prop="readable" label="是否只读">
          <el-select v-model="form.readable" clearable>
            <el-option v-for="item in yesAndNo" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="writeable" label="是否可写">
          <el-select v-model="form.writeable" clearable>
            <el-option v-for="item in yesAndNo" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="required" label="是否必填">
          <el-select v-model="form.required" clearable>
            <el-option v-for="item in yesAndNo" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24">
      <el-card header="可选值">
        <vxe-toolbar setting>
          <template v-slot:buttons>
            <el-button @click="insertEvent">新增</el-button>
          </template>
        </vxe-toolbar>
        <vxe-table ref="xTable" class="vxe-table-element" border auto-resize show-overflow :data.sync="tableData" :edit-rules="validRules" :edit-config="{key: 'id', trigger: 'click', mode: 'row'}">
          <vxe-table-column field="fid" title="Id" :edit-render="{name: 'ElInput'}"></vxe-table-column>
          <vxe-table-column field="name" title="名称" :edit-render="{name: 'ElInput'}"></vxe-table-column>
          <vxe-table-column title="操作">
            <template v-slot="{ row }">
              <vxe-button @click="removeRowEvent(row)">删除</vxe-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </el-card>
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
    propId: String
  },
  data() {
    return {
      form: {
        propertyId: "",
        propertyName: "",
        propertyType: "",
        expressionValue: "",
        variable: "",
        default: "",
        datePattern: "",
        readable: "",
        writeable: "",
        required: ""
      },
      rules: {
        propertyId: [
          {
            required: true,
            message: "Id必须填写",
            trigger: "blur"
          }
        ],
        propertyName: [
          {
            required: true,
            message: "名称必须填写",
            trigger: "blur"
          }
        ],
        propertyType: [
          {
            required: true,
            message: "类型必须填写",
            trigger: "change"
          }
        ]
      },
      propertyTypes: [
        {
          value: "string",
          label: "string"
        },
        {
          value: "long",
          label: "long"
        },
        {
          value: "enum",
          label: "enum"
        },
        {
          value: "date",
          label: "date"
        },
        {
          value: "boolean",
          label: "boolean"
        }
      ],
      yesAndNo: [
        {
          value: "true",
          label: "是"
        },
        {
          value: "false",
          label: "否"
        }
      ],
      tableData: [],
      validRules: {
        fid: [
          {
            required: true,
            message: "Id必须填写"
          }
        ],
        name: [
          {
            required: true,
            message: "名称必须填写"
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions(["saveTaskForm"]),
    loadTaskFormProp() {
      let task = this.$store.state.selectedTask;
      if (task != null && task != undefined) {
        let id = this.propId;
        if (id != null && id != undefined && id != "") {
          let formProp = task.getFormProperties(id);
          this.form.propertyId = formProp.id;
          this.form.propertyName = formProp.name;
          this.form.propertyType = formProp.type;
          this.form.expressionValue = formProp.expression;
          this.form.variable = formProp.variable;
          this.form.default = formProp.defaultValue;
          this.form.datePattern = formProp.datePattern;
          this.form.readable = formProp.readable;
          this.form.writeable = formProp.writeable;
          this.form.required = formProp.required;
          let fvs = formProp.values;
          let formValTbData = [];
          for (var i = 0; i < fvs.getSize(); i++) {
            var v = {
              fid: fvs.get(i).id,
              name: fvs.get(i).name
            };
            formValTbData.push(v);
          }
          this.tableData = formValTbData;
        }
      }
    },
    insertEvent() {
      let record = {
        id: "",
        name: ""
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

              let payload = {
                form: this.form,
                insertFields: insertRecords,
                updateFields: updateRecords,
                delFields: removeRecords
              };
              this.saveTaskForm(payload);
              let self = this;
              Message.success("保存成功！", function() {
                self.$emit("close");
              });
            }
          });
        }
      });
    }
  },
  mounted() {
    console.log("form配置", this.$route);
    this.loadTaskFormProp();
  }
};
</script>
