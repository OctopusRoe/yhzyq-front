<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="right" size="mini">
        <el-form-item label="ID" prop="id">
            <el-input v-model="form.id" clearable></el-input>
        </el-form-item>
        <el-form-item prop="name" label="名称">
            <el-input v-model="form.name" clearable></el-input>
        </el-form-item>
        <el-form-item prop="documentation" label="说明">
            <el-input type="textarea" :rows="2" v-model="form.documentation" clearable></el-input>
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
        id: "",
        name: "",
        documentation: ""
      },
      rules: {
        id: [
          {
            required: true,
            message: "请输入id",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.setFormVal();
  },
  methods: {
    ...mapActions(["saveSubProcessGeneral"]),
    setFormVal() {
      this.form.id = this.$store.state.process.id;
      this.form.name = this.$store.state.process.name;
      this.form.documentation = this.$store.state.process.documentation;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveSubProcessGeneral(this.form);
          Message.success("保存成功！");
        } else {
          return false;
        }
      });
    }
  }
};
</script>
