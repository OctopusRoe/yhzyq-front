<template>
  <el-dialog
    v-if="isExist"
    title="新增扩展配置类型"
    :visible="dialogShow"
    :append-to-body="true"
    :close-on-click-modal="false"
    width="30%"
    style="height: 400px;"
    class="dialog-common"
    @close="closeDialog"
  >
    <div class="app-container">
      <el-row>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="编码" prop="code">
                <el-input
                  v-model="form.code"
                  placeholder="请输入编码"
                  onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" placeholder="请输入名称" />
              </el-form-item>
            </el-col>
          </el-row>
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
import { saveExtConfigType } from "@/api/system/extConfig/index";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "addExtConfigType",
  components: {},
  props: {
    commonTypeId: {
      type: String
    }
  },
  data() {
    return {
      dialogShow: false,
      isExist: false,
      loading: false,
      isdisabled: false,
      //
      form: {
        id: undefined,
        commonTypeId: undefined,
        code: undefined,
        name: undefined
      },
      // 表单校验
      rules: {
        code: [{ required: true, message: "编码不能为空", trigger: "blur" }],
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }]
      }
    };
  },
  watch: {},
  created() {},
  methods: {
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          saveExtConfigType(this.form).then(response => {
            if (response.rtnCode === 200) {
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
    showModal(commonTypeId) {
      this.form.commonTypeId = commonTypeId;
      this.dialogShow = true;
      this.isExist = true;
    },

    // 取消按钮
    cancel() {
      this.$emit("cancel");
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
        commonTypeId: undefined,
        code: undefined,
        name: undefined
      };
      this.resetForm("form");
    }
  }
};
</script>
