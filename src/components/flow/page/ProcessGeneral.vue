<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="right" size="mini">
    <el-form-item label="流程ID" prop="id">
      <el-input v-model="form.id" clearable></el-input>
    </el-form-item>
    <el-form-item prop="name" label="流程名">
      <el-input v-model="form.name" clearable></el-input>
    </el-form-item>
    <el-form-item prop="category" label="分类">
      <el-input v-model="form.category" clearable></el-input>
    </el-form-item>
    <el-form-item prop="documentation" label="说明">
      <el-input type="textarea" :rows="2" v-model="form.documentation" clearable></el-input>
    </el-form-item>
    <el-form-item prop="callBack" label="流程启动回调">
      <el-input  v-model="form.callBack" clearable></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" icon="el-icon-edit" @click="submitForm('form')">保存</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Message from "../common/Message";
export default {
  props:{
    form:{
      type:Object,
      default:''
    }
  },
  data() {
    return {
      rules: {
        id: [
          {
            required: true,
            message: "请输入流程id",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "请输入流程名称",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    //console.log("加载流程通用属性");
    this.setFormVal();
  },
  methods: {
    ...mapActions(["saveProcessGeneral"]),
    setFormVal() {
      console.log(this.form)
      this.form.id = this.$store.state.process.id;
      this.form.name = this.$store.state.process.name;
      this.form.category = this.$store.state.process.category;
      this.form.documentation = this.$store.state.process.documentation;
      this.form.callBack = this.$store.state.process.callBack;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveProcessGeneral(this.form);
          this.msgSuccess('保存成功！')
        } else {
          return false;
        }
      });
    }
  }
};
</script>
