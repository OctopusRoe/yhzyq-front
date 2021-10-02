<template>
  <el-dialog
    v-if="isExist"
    title="修改通用类型"
    :visible="dialogShow"
    :append-to-body="true"
    :close-on-click-modal="false"
    width="70%"
    class="dialog-common"
    @close="closeDialog"
  >
    <div class="app-container">
      <el-row>
        <el-input type="hidden" v-model="form.id" />
        <el-input type="hidden" v-model="form.type" />
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-row>
            <el-col>
              <el-form-item label="上级类型" prop="ptypename">
                {{ form.ptypename }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="编码" prop="code">
                <el-input
                  v-model="form.code"
                  placeholder="请输入类别编码"
                  onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="类别名称" prop="typename">
                <el-input
                  v-model="form.typename"
                  placeholder="请输入类型名称"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="类别" prop="code">
                <el-input
                  v-model="form.type"
                  placeholder="请输入类型"
                  :disabled="isdisabled"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="排序号" prop="sortedOrder">
                <el-input
                  v-model="form.sortedOrder"
                  placeholder="请输入排序号"
                  onkeyup="value=value.replace(/[^\d]/g,'')"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="描述" prop="remark">
                <el-input
                  v-model="form.remark"
                  size="medium"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                />
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
import { updateData, getDataById } from "@/api/system/commonType/index";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "editCommonType",
  components: {},
  props: {
    id: {
      type: String
    },
    pid: {
      type: String
    },
    dicttypeid: {
      type: String
    }
  },
  data() {
    return {
      dialogShow: false,
      isExist: false,
      loading: false,
      //是否添加一级，1是加一级，0不是
      istop: 0,
      isdisabled: true,
      //
      form: {
        id: undefined,
        pid: undefined,
        ptypename: "",
        type: "",
        code: undefined,
        typename: undefined,
        remark: undefined,
        sortedOrder: undefined
      },
      // 表单校验
      rules: {
        typename: [
          { required: true, message: "类型名称不能为空", trigger: "blur" }
        ],
        code: [
          { required: true, message: "类别编码不能为空", trigger: "blur" }
        ],
        sortedOrder: [
          {
            required: false,
            message: "排序不能为空",
            trigger: "blur"
          }
        ]
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
          updateData(this.form).then(response => {
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
    showModal(record) {
      this.form = { ...record };
      this.istop = record.pid === "" ? 1 : 0;
      if (record.pid !== "") {
        this.queryParentData();
      }
      this.dialogShow = true;
      this.isExist = true;
    },
    async queryParentData() {
      await getDataById(this.form.pid).then(res => {
        if (res && res.data) {
          this.form.ptypename = res.data.typename;
          this.$forceUpdate();
        } else {
          this.$message({
            message: res.message,
            type: "info"
          });
        }
      });
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
        pid: undefined,
        type: undefined,
        code: undefined,
        typename: undefined,
        remark: undefined,
        sortedOrder: undefined
      };
      this.resetForm("form");
    }
  }
};
</script>
