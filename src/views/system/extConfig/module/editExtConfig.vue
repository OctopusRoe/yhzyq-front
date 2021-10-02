<template>
  <el-dialog
    v-if="isExist"
    title="修改扩展配置"
    :visible="dialogShow"
    :append-to-body="true"
    :close-on-click-modal="false"
    width="70%"
    class="dialog-common"
    @close="closeDialog"
  >
    <!-- class="app-container" -->
    <div>
      <el-row>
        <el-form ref="form" :model="form" :rules="rules" label-width="160px">
          <div class="dashedDiv">
            <p class="titlep">扩展配置</p>
            <el-row>
              <el-col :span="8">
                <el-form-item label="编码：" prop="code">
                  <el-input
                    v-model="form.code"
                    placeholder=""
                    onkeyup="this.value = this.value.replace(/[\u4E00-\u9FA5\s+]/g,'');"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="扩展属性代码：" prop="attrCode">
                  <el-input
                    v-model="form.attrCode"
                    placeholder=""
                    onkeyup="this.value = this.value.replace(/[\u4E00-\u9FA5\s+]/g,'');"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="扩展属性名称：" prop="attrName">
                  <el-input v-model="form.attrName" placeholder="" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="默认值：" prop="defaultValue">
                  <el-input v-model="form.defaultValue" placeholder="" />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="字段类型" prop="fieldType">
                  <el-select
                    v-model="form.fieldType"
                    placeholder="请选择"
                    style="width:100%"
                    @change="fieldTypeSelectChanged"
                  >
                    <el-option
                      v-for="item in propertyData.zdlx"
                      :key="item.smallMark"
                      :label="item.name"
                      :value="item.smallMark"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="排序：" prop="sortedNum">
                  <el-input
                    v-model="form.sortedNum"
                    placeholder=""
                    onkeyup="value=value.replace(/[^\d]/g,'')"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="验证正则表达式：" prop="regExp">
                  <el-input
                    v-model="form.regExp"
                    placeholder=""
                    onkeyup="this.value = this.value.replace(/[\u4E00-\u9FA5\s+]/g,'');"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="扩展属性长度：" prop="AttrLen">
                  <el-input
                    v-model="form.AttrLen"
                    placeholder=""
                    onkeyup="value=value.replace(/[^\d]/g,'')"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="是否只读：" prop="readOnly">
                  <el-radio-group v-model="form.readOnly">
                    <el-radio
                      :label="item.vals"
                      :key="item.name"
                      v-for="item in propertyData.sfzd"
                      >{{ item.name }}</el-radio
                    >
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="是否必须：" prop="needed">
                  <el-radio-group v-model="form.needed">
                    <el-radio
                      :label="item.vals"
                      :key="item.name"
                      v-for="item in propertyData.sfneed"
                      >{{ item.name }}</el-radio
                    >
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="是否禁止：" prop="forbided">
                  <el-radio-group v-model="form.forbided">
                    <el-radio
                      :label="item.vals"
                      :key="item.name"
                      v-for="item in propertyData.sfjz"
                      >{{ item.name }}</el-radio
                    >
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-button
                  type="primary"
                  v-if="!addExtConfig"
                  @click="addPropConfigEvent"
                  >添加下拉属性</el-button
                >
                <el-button type="primary" v-else @click="cancelAddPropConfig">
                  取消下拉属性</el-button
                >
              </el-col>
            </el-row>
          </div>

          <div class="dashedDiv" v-if="addExtConfig">
            <p class="titlep">扩展配置下拉属性</p>

            <el-row>
              <el-col :span="24">
                <el-button type="primary" @click="addDropDown"
                  >新加下拉属性</el-button
                >
              </el-col>
              <el-col :span="24">
                <vxe-table
                  border
                  resizable
                  height="528px"
                  ref="vtable"
                  check-strictly="true"
                  row-id="id"
                  :data="form.dropdowns"
                  show-overflow
                >
                  > v-loading="loading" >
                  <vxe-table-column
                    field="name"
                    title="名称"
                    header-align="center"
                  >
                    <template slot-scope="scope">
                      <el-input
                        size="mini"
                        placeholder="名称"
                        v-model="scope.row.name"
                      ></el-input>
                    </template>
                  </vxe-table-column>
                  <vxe-table-column
                    field="des"
                    title="描叙"
                    header-align="center"
                  >
                    <template slot-scope="scope">
                      <el-input
                        size="mini"
                        placeholder="描叙(仅展示)"
                        v-model="scope.row.des"
                      ></el-input>
                    </template>
                  </vxe-table-column>
                  <vxe-table-column
                    field="defaultvalue"
                    title="值"
                    header-align="center"
                  >
                    <template slot-scope="scope">
                      <el-input
                        size="mini"
                        placeholder="值"
                        v-model="scope.row.defaultvalue"
                      ></el-input>
                    </template>
                  </vxe-table-column>
                  <vxe-table-column
                    field="sortedNum"
                    title="序号"
                    header-align="center"
                  >
                    <template slot-scope="scope">
                      <el-input
                        size="mini"
                        placeholder="序号"
                        v-model="scope.row.sortedNum"
                      ></el-input>
                    </template>
                  </vxe-table-column>
                  <vxe-table-column title="操作" header-align="center">
                    <template slot-scope="scope">
                      <el-button
                        type="primary"
                        @click="delDropData(scope.$rowIndex, scope.row)"
                        >删除</el-button
                      >
                    </template>
                  </vxe-table-column>
                </vxe-table>
              </el-col>
            </el-row>
          </div>

          <el-row>
            <el-col align="middle">
              <el-button type="primary" @click="submitForm">提 交</el-button>
              <el-button @click="cancel">取 消</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import { updateData, getConfigInfoById } from "@/api/system/extConfig/index";
export default {
  name: "editExtConfig",
  components: {},
  props: {
    id: {
      type: String
    },
    typeId: {
      type: String
    }
  },
  data() {
    return {
      dialogShow: false,
      isExist: false,
      loading: false,
      isabled: false,
      editDisabled: false,
      //通用类型id
      commonTypeId: undefined,
      //新增扩展配置
      addExtConfig: false,
      propertyData: {},
      // 表单参数
      defaultForm: {
        id: undefined,
        extConfigTypeId: undefined,
        code: "",
        attrCode: undefined,
        attrName: undefined,
        attrLen: undefined,
        fieldType: undefined,
        regExp: undefined,
        read_only: undefined,
        forbided: undefined,
        needed: undefined,
        sortedNum: undefined,
        extAttrId: undefined,
        readOnly: undefined,
        defaultValue: "",
        dropdowns: []
      },
      form: {},

      // 表单校验
      rules: {
        code: [{ required: true, message: "编码 不能为空", trigger: "blur" }],
        attrCode: [
          { required: true, message: "扩展属性代码 不能为空", trigger: "blur" }
        ],
        attrName: [
          { required: true, message: "扩展属性名称 不能为空", trigger: "blur" }
        ],
        commonTypeId: [
          { required: true, message: "通用分类 不能为空", trigger: "blur" }
        ],
        fieldType: [
          { required: true, message: "字段类型 不能为空", trigger: "blur" }
        ]
      }
    };
  },
  watch: {},
  created() {
    this.form = this.defaultForm;
  },
  methods: {
    /** 提交按钮 */
    submitForm: function() {
      if (!this.addExtConfig && this.form.dropdowns) {
        this.form.dropdowns = [];
      }
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          updateData(this.form).then(response => {
            this.loading = false;
            if (response.success) {
              this.msgSuccess("操作成功");
              this.reset();
              this.dialogShow = false;
              this.isExist = false;
              this.$emit("ok");
            }
          });
        } else {
          this.$message({
            message: "带星号的为必填项，请检查！",
            type: "error"
          });
        }
      });
    },
    addDropDown() {
      this.form.dropdowns.push({
        des: "描叙(仅展示)",
        code: "",
        name: "",
        defaultvalue: ""
      });
    },
    delDropData(index, row) {
      console.log("index:" + index);
      this.form.dropdowns.splice(index, 1);
    },
    //增加扩展配置
    addPropConfigEvent() {
      if (this.form.fieldType == null || this.form.fieldType == "") {
        this.$message({
          message: "请先选择字段类型！",
          type: "info"
        });
        return;
      }
      this.initConfig();
      if (this.form.fieldType == "TABLE_SELECT") {
        this.selectTableDropDowns();
      } else if (this.form.fieldType == "METHOD_SELECT") {
        this.methodSelectDropDowns();
      }
      this.addExtConfig = true;
    },
    initConfig() {
      this.form.dropdowns = [];
    },
    //取消扩展配置
    cancelAddPropConfig() {
      const str = "VARCHAR,DATE,NUMBER";
      if (str.indexOf(this.form.fieldType) < 0) {
        //展示扩展配置
        this.addExtConfig = true;
        this.$message({
          message: "该字段类型需要扩展配置！",
          type: "info"
        });
        return;
      }
      this.initConfig();
      this.addExtConfig = false;
    },

    fieldTypeSelectChanged(value) {
      const str = "VARCHAR,DATE,NUMBER";
      if (str.indexOf(value) < 0) {
        //展示扩展配置
        this.$nextTick(() => {
          this.addPropConfigEvent();
        });
      }
    },
    showModal(id, propertyData) {
      this.form.id = id;
      this.propertyData = propertyData;
      this.initData();
      this.dialogShow = true;
      this.isExist = true;
    },
    //下拉表格的
    selectTableDropDowns() {
      this.form.dropdowns.push({
        name: "tablename",
        des: "表名(涉及跨库的不行)",
        defaultvalue: "xt_dict",
        sortedNum: 1
      });
      this.form.dropdowns.push({
        name: "fieldnames",
        des: "选择的字段",
        defaultvalue: "",
        sortedNum: 2
      });
      this.form.dropdowns.push({
        name: "keyname",
        des: "后面的主键",
        defaultvalue: "",
        sortedNum: 3
      });
      this.form.dropdowns.push({
        name: "valuename",
        des: "显示的名称",
        defaultvalue: "",
        sortedNum: 4
      });
      this.form.dropdowns.push({
        name: "where",
        des: "查询条件",
        defaultvalue: "",
        sortedNum: 5
      });
      this.form.dropdowns.push({
        name: "selectset",
        des: "selectset(保留)",
        defaultvalue: "",
        sortedNum: 6
      });
    },
    //选择方法的
    methodSelectDropDowns() {
      this.form.dropdowns.push({
        name: "classname",
        des: "类名(已经注入的)",
        defaultvalue: "",
        sortedNum: 1
      });
      this.form.dropdowns.push({
        name: "methodname",
        des: "方法名",
        defaultvalue: "",
        sortedNum: 2
      });
      this.form.dropdowns.push({
        name: "keyname",
        des: "",
        defaultvalue: "",
        sortedNum: 3
      });
      this.form.dropdowns.push({
        name: "valuename",
        des: "",
        defaultvalue: "",
        sortedNum: 4
      });
      this.form.dropdowns.push({
        name: "param",
        des: "参数(非对象，多个参数用分号隔开)",
        defaultvalue: "",
        sortedNum: 5
      });
      this.form.dropdowns.push({
        name: "selectset",
        des: "",
        defaultvalue: "",
        sortedNum: 6
      });
    },
    async initData() {
      await getConfigInfoById(this.form.id).then(res => {
        if (res && res.data) {
          this.form = { ...res.data };
          if (this.form.dropdowns.length > 0) {
            this.addExtConfig = true;
          }
        } else {
          this.$message({
            message: "获取数据错误！",
            type: "error"
          });
        }
      });
    },
    // 取消按钮
    cancel() {
      this.reset();
      this.dialogShow = false;
    },
    closeDialog() {
      this.reset();
      this.isExist = false;
    },
    // 表单重置
    reset() {
      this.addExtConfig = false;

      this.$refs["form"].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.solidDiv {
  margin-bottom: 10px;
  border: 1px solid #000;
}
.dashedDiv {
  margin-bottom: 10px;
  border: 1px dashed #000;
}
.titlep {
  position: relative;
  width: 120px;
  padding-left: 10px;
  left: 40px;
  top: -10px;
  text-align: center;
  background-color: white;
}
::v-deep.el-radio {
  line-height: 36px;
}
</style>
