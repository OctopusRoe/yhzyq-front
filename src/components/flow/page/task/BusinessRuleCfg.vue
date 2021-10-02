<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="right" size="mini">
        <el-form-item label="规则名" prop="ruleName">
            <el-input v-model="form.ruleName" clearable></el-input>
        </el-form-item>
        <el-form-item prop="inputVariable" label="输入变量">
            <el-input v-model="form.inputVariable" clearable></el-input>
        </el-form-item>
        <el-form-item label="Excluded" prop="excluded">
            <el-radio-group v-model="form.excluded" @change="changeExcluded">
                <el-radio label="true" border>是</el-radio>
                <el-radio label="false" border>否</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item prop="resultVariable" label="结果变量">
            <el-input v-model="form.resultVariable" clearable></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" icon="el-icon-edit" @click="submitForm('form')">保存</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Message from "../../common/Message";
export default {
  data() {
    return {
      form: {
        ruleName: "",
        inputVariable: "",
        excluded: "",
        resultVariable: ""
      },
      rules: {},
      languages: [
        {
          value: "javaScript",
          label: "javaScript"
        },
        {
          value: "groovy",
          label: "groovy"
        }
      ]
    };
  },
  methods: {
    ...mapActions(["saveBusinessRule"]),
    changeExcluded(val) {
      this.form.excluded = val;
    },
    loadRule() {
      let task = this.$store.state.selectedTask;
      this.form.ruleName = task.ruleName;
      this.form.inputVariable = task.inputVariable;
      this.form.excluded = task.excluded == null ? "false" : task.excluded;
      this.form.resultVariable = task.resultVariable;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveBusinessRule(this.form);
          Message.success("保存成功！");
        } else {
          return false;
        }
      });
    }
  },
  mounted() {
    this.loadRule();
  }
};
</script>
