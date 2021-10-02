<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="right" size="mini">
        <el-form-item label="脚本语言" prop="scriptLanguage">
            <el-select v-model="form.scriptLanguage" clearable>
                <el-option v-for="item in languages" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="script" label="脚本">
            <el-input type="textarea" :rows="3" v-model="form.script" clearable></el-input>
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
        scriptLanguage: "",
        script: ""
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
    ...mapActions(["saveTaskScript"]),
    loadScript() {
      let task = this.$store.state.selectedTask;
      this.form.scriptLanguage = task.scriptLanguage;
      this.form.script = task.script;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveTaskScript(this.form);
          Message.success("保存成功！");
        } else {
          return false;
        }
      });
    }
  },
  mounted() {
    this.loadScript();
  }
};
</script>
