<template>
  <el-dialog
    v-if="isExist"
    title="新增扩展属性"
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
            <p class="titlep">扩展属性</p>
            <el-row>
              <el-col :span="8">
                <el-form-item label="扩展配置类型：" prop="extConfigTypeId">
                  <el-select
                    v-model="extConfigTypeId"
                    placeholder="请选择"
                    style="width:100%"
                    @change="configTypeSelectChanged"
                  >
                    <el-option
                      v-for="item in propertyData.configTypes"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="扩展配置：" prop="extAttrId">
                  <el-select
                    v-model="form.extAttrId"
                    placeholder="请选择"
                    style="width:100%"
                    @change="configSelectChanged"
                  >
                    <el-option
                      v-for="item in extConfigs"
                      :key="item.id"
                      :label="item.attrName"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="字段类型" prop="fieldType">
                  <el-input
                    v-model="form.fieldType"
                    placeholder=""
                    :disabled="true"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="扩展属性代码：" prop="exAttrCode">
                  <el-input
                    v-model="form.exAttrCode"
                    placeholder=""
                    onkeyup="this.value = this.value.replace(/[\u4E00-\u9FA5\s+]/g,'');"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="扩展属性名称：" prop="exAttrName">
                  <el-input v-model="form.exAttrName" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="扩展属性长度：" prop="attrLen">
                  <el-input
                    v-model="form.attrLen"
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
                <el-form-item label="排序：" prop="sortedOrder">
                  <el-input
                    v-model="form.sortedOrder"
                    placeholder=""
                    onkeyup="value=value.replace(/[^\d]/g,'')"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="22">
                <el-form-item label="验证正则表达式：" prop="regExp">
                  <el-input
                    v-model="form.regExp"
                    placeholder=""
                    onkeyup="this.value = this.value.replace(/[\u4E00-\u9FA5\s+]/g,'');"
                  />
                </el-form-item>
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
import { saveData } from "@/api/system/assets/index";
import { pageDataList } from "@/api/system/extConfig/index";
export default {
  name: "addProperty",
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
      extConfigTypeId: "",
      //新增扩展配置
      addExtConfig: false,
      propertyData: {},
      //扩展类型
      extConfigTypeList: [],
      extConfigs: {},
      queryParam: {
        orgId: "",
        applyDate: ""
      },
      // 表单参数
      defaultForm: {
        id: undefined,
        exAttrCode: undefined,
        exAttrName: undefined,
        exAttrValue: undefined,
        attrLen: undefined,
        commonTypeId: undefined,
        commonTypeClz: undefined,
        extObjId: undefined,
        fieldType: undefined,
        needed: undefined,
        regExp: undefined,
        sortedOrder: undefined,
        extAttrId: undefined,
        readOnly: undefined
      },
      extConfigDto: {
        extConfigTypeId: "",
        code: "",
        defaultValue: "",
        dropdowns: []
      },
      form: {},

      // 表单校验
      rules: {
        exAttrCode: [
          { required: true, message: "扩展属性代码 不能为空", trigger: "blur" }
        ],
        exAttrName: [
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
      //如果有扩展配置
      if (this.addExtConfig) {
        if (
          this.extConfigDto.code == undefined ||
          this.extConfigDto.code == ""
        ) {
          this.$message({
            message: "扩展配置编码不能为空！",
            type: "error"
          });
          return;
        }
        this.form.extConfigDto = this.extConfigDto;
      }
      if (!this.addExtConfig) {
        this.extConfigDto = null;
      }
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          saveData(this.form).then(response => {
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
      this.extConfigDto.dropdowns.push({
        code: "",
        name: "",
        defaultvalue: ""
      });
    },
    delDropData(index, row) {
      console.log("index:" + index);
      this.extConfigDto.dropdowns.splice(index, 1);
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
      this.addExtConfig = true;
      this.initConfig();
    },
    initConfig() {
      this.extConfigDto = {
        extConfigTypeId: "",
        code: "",
        defaultValue: "",
        dropdowns: []
      };
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
      this.extConfigDto = null;
    },
    //扩展配置类型选择事件
    configTypeSelectChanged(value) {
      console.log(value);
      // let obj = this.propertyData.commonType.find(function(item) {
      //   return item.id === value;
      // });
      this.queryConfigType(value);
    },
    //扩展配置选择事件
    configSelectChanged(value) {
      console.log(value);
      this.extConfigs.forEach(element => {
        if (element.id === value) {
          this.form.readOnly = element.readOnly;
          this.form.exAttrCode = element.attrCode;
          this.form.exAttrName = element.attrName;
          this.form.exAttrValue = element.defaultValue;
          this.form.attrLen = element.attrLen;
          this.form.extAttrId = element.id;
          this.form.fieldType = element.fieldType;
          this.form.regExp = element.regExp;
          this.form.needed = element.needed;
          this.form.readOnly = element.readOnly;
        }
      });
    },
    queryConfigType(extConfigTypeId) {
      let params = {
        pageSize: 100,
        pageNumber: 1,
        extConfigTypeId: extConfigTypeId
      };
      pageDataList(params).then(res => {
        if (res && res.rows) {
          this.extConfigs = res.rows;
        }
      });
    },
    fieldTypeSelectChanged(value) {},

    //新增配置类型成功后
    addExtConfigTypeOk() {
      this.queryConfigType();
    },
    showModal(addParams, propertyData) {
      this.form.extObjId = addParams.extObjId;
      this.propertyData = propertyData;
      //默认第一个，都是否
      this.form.needed = this.propertyData.sfneed[0].vals;
      this.form.readOnly = this.propertyData.sfzd[0].vals;
      //排序默认0
      this.form.sortedOrder = 0;
      console.log("this.form.needed:" + this.form.needed);
      console.log("this.form.readOnly:" + this.form.readOnly);
      this.dialogShow = true;
      this.isExist = true;
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
      this.form = {
        id: undefined,
        exAttrCode: undefined,
        exAttrName: undefined,
        exAttrValue: undefined,
        attrLen: undefined,
        commonTypeId: undefined,
        commonTypeClz: undefined,
        extObjId: undefined,
        fieldType: undefined,
        needed: undefined,
        regExp: undefined,
        sortedOrder: undefined,
        extAttrId: undefined,
        readOnly: undefined
      };
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
