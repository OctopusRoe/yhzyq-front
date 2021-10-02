<template>
    <el-row>
        <el-col :span="24">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="right" size="mini">
                <el-form-item label="被调用者" prop="callElement">
                    <el-input v-model="form.callElement" clearable></el-input>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="24">
            <el-row type="flex" justify="center">
                <el-col :span="2">
                    <el-button type="primary" icon="el-icon-edit" @click="saveEvent('form')">保存</el-button>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Message from "../../common/Message";
export default {
  data() {
    return {
      form: {
        callElement: ""
      },
      rules: {}
    };
  },
  methods: {
    ...mapActions(["saveCallActivity"]),
    loadCallActivity() {
      let task = this.$store.state.selectedTask;
      this.form.callElement = task.callElement;
    },
    saveEvent(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        } else {
          this.saveCallActivity(this.form);
          Message.success("保存成功！");
        }
      });
    }
  },
  mounted() {
    this.loadCallActivity();
  }
};
</script>
