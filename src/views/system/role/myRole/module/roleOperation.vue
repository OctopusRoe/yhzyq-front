<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
    :modal-append-to-body="false"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="角色类型" prop="RoleCategory">
        <el-select v-model="ruleForm.RoleCategory">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <!-- <el-input
          v-model="ruleForm.RoleCategory"
          :disabled="isRoleCategory"
        ></el-input> -->
      </el-form-item>
      <el-form-item label="角色名称" prop="RoleName">
        <el-input v-model="ruleForm.RoleName"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="Sort">
        <el-input-number v-model="ruleForm.Sort"></el-input-number>
      </el-form-item>
      <el-form-item label="备注" prop="Remark">
        <el-input type="textarea" v-model="ruleForm.Remark"></el-input>
      </el-form-item>
      <!-- <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item> -->
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
export default {
  data() {
    return {
      title: "",
      isRoleCategory: true,
      ruleForm: {
        RoleCategory: "",
        RoleName: "",
        Sort: "",
        Remark: ""
      },
      rules: {
        RoleCategory: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        RoleName: [{ required: true, message: "不能为空", trigger: "blur" }],
        Sort: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      dialogVisible: false,
      options: [
        {
          value: "1",
          label: "管理员"
        },
        {
          value: "2",
          label: "员工"
        },
        {
          value: "3",
          label: "监理"
        },
        {
          value: "4",
          label: "承包商"
        },
        {
          value: "5",
          label: "质检"
        },
        {
          value: "6",
          label: "试验"
        },
        {
          value: "7",
          label: "进度"
        },
        {
          value: "8",
          label: "安全"
        },
        {
          value: "9",
          label: "征拆"
        }
      ]
    };
  },
  methods: {
    handleClose(done) {
      done();
    },
    add() {
      this.title = "新增";
      this.isRoleCategory = false;
      this.ruleForm.RoleCategory = "";
      this.ruleForm.RoleName = "";
      this.ruleForm.Sort = "";
      this.ruleForm.Remark = "";
      this.dialogVisible = true;
    },
    edit(data) {
      this.title = "修改";
      this.isRoleCategory = true;
      this.ruleForm = data;
      this.dialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
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
