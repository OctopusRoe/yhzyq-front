<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
    :modal-append-to-body="false"
    :close-on-click-modal="false"
    class="dialog-common"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="角色类型" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <div align="center">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </div>
    </span>
  </el-dialog>
</template>

<script>
import { addRoleType, updateRoleTypeById } from "@/api/system/role";

export default {
  data() {
    return {
      title: "",
      ruleForm: {
        id: "",
        name: "",
        createTime: "",
        createUser: "",
        systemId: ""
      },
      rules: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      dialogVisible: false
    };
  },
  methods: {
    handleClose(done) {
      done();
    },
    add(systemId) {
      this.title = "新增角色类型";
      this.ruleForm.id = "";
      this.ruleForm.createTime = "";
      this.ruleForm.createUser = "";
      this.ruleForm.name = "";
      this.ruleForm.systemId = systemId;
      this.dialogVisible = true;
    },
    edit(data) {
      this.title = "修改角色类型";
      this.ruleForm = data;
      console.log(this.ruleForm);
      this.dialogVisible = true;
    },
    submitForm(formName) {
      console.log(this.ruleForm);
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log({ ...this.ruleForm });
          if (this.ruleForm.id === "") {
            addRoleType(this.ruleForm).then(res => {
              if (res.success) {
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
                this.$emit("ok");
              } else {
                this.$message({
                  message: res.msg,
                  type: "danger"
                });
                this.$emit("ok");
              }
            });
          } else {
            updateRoleTypeById(this.ruleForm).then(res => {
              if (res.success) {
                this.$message({
                  title: "成功",
                  message: "修改成功",
                  type: "success"
                });
                this.$emit("ok");
              } else {
                this.$message({
                  message: res.msg,
                  type: "danger"
                });
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
        this.dialogVisible = false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style></style>
