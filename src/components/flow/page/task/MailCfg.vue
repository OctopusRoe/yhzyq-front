<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="right" size="mini">
        <el-form-item label="收件人" prop="to">
            <el-input v-model="form.to" clearable></el-input>
        </el-form-item>
        <el-form-item prop="from" label="发件人">
            <el-input v-model="form.from" clearable></el-input>
        </el-form-item>
        <el-form-item prop="subject" label="标题">
            <el-input v-model="form.subject" clearable></el-input>
        </el-form-item>
        <el-form-item prop="cc" label="抄送">
            <el-input v-model="form.cc" clearable></el-input>
        </el-form-item>
        <el-form-item prop="bcc" label="密送">
            <el-input v-model="form.bcc" clearable></el-input>
        </el-form-item>
        <el-form-item prop="charset" label="字符集">
            <el-input v-model="form.charset" clearable></el-input>
        </el-form-item>
        <el-form-item prop="htmlText">
            <template slot="label">
                <div>邮件内容</div>
                <div>（HTML）</div>
            </template>
            <el-input type="textarea" :rows="5" v-model="form.htmlText" clearable></el-input>
        </el-form-item>
        <el-form-item prop="nonhtmlText">
            <template slot="label">
                <div>邮件内容</div>
                <div>（非HTML）</div>
            </template>
            <el-input type="textarea" :rows="5" v-model="form.nonhtmlText" clearable></el-input>
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
        to: "",
        from: "",
        subject: "",
        cc: "",
        bcc: "",
        charset: "",
        htmlText: "",
        nonhtmlText: ""
      },
      rules: {}
    };
  },
  methods: {
    ...mapActions(["saveTaskMail"]),
    loadMail() {
      let task = this.$store.state.selectedTask;
      this.form.to = task.to;
      this.form.from = task.from;
      this.form.subject = task.subject;
      this.form.cc = task.cc;
      this.form.bcc = task.bcc;
      this.form.charset = task._charset;
      this.form.nonhtmlText = task._text;
      this.form.htmlText = task._html;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveTaskMail(this.form);
          Message.success("保存成功！");
        } else {
          return false;
        }
      });
    }
  },
  mounted() {
    this.loadMail();
  }
};
</script>
