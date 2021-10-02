<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="right" size="mini">
        <el-form-item label="条件" prop="condition">
            <el-input type="textarea" :rows="4" v-model="form.condition" clearable></el-input>
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
        condition: ""
      },
      rules: {}
    };
  },
  mounted() {
    this.loadProp();
  },
  methods: {
    ...mapActions(["saveConnectionCondition"]),
    loadProp() {
      let connection = this.$store.state.selectedConnection;
      this.form.condition = connection.condition;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveConnectionCondition(this.form);
          Message.success("保存成功！");
        } else {
          return false;
        }
      });
    }
  }
};
</script>
