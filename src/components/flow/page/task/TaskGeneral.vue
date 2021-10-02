<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="right" size="mini">
    <el-form-item label="Id" prop="id">
      <el-input v-model="form.id" clearable></el-input>
    </el-form-item>
    <el-form-item prop="name" label="名称">
      <el-input v-model="form.name" clearable></el-input>
    </el-form-item>
    <el-form-item prop="asynchronous" label="是否异步">
      <el-checkbox v-model="form.asynchronous"></el-checkbox>
    </el-form-item>
    <el-form-item prop="exclusive" label="是否独占">
      <el-checkbox v-model="form.exclusive"></el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" icon="el-icon-edit" @click="submitForm('form')">保存</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import Message from "../../common/Message";
import { mapState, mapActions, mapGetters } from "vuex";
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
  methods: {
    ...mapActions(["saveTaskGeneral"]),
    loadTaskProp() {
      let task = this.$store.state.selectedTask;
      if (task != null && task != undefined) {
        this.form.id = task.id;
        this.form.name = task.name;
        this.form.asynchronous = task.asynchronous;
        this.form.exclusive = task.exclusive;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveTaskGeneral(this.form);
          this.msgSuccess("保存成功！");
        } else {
          return false;
        }
      });
    }
  },
  mounted() {
    //console.log("当前选择的task", this.$store.state.selectedTask);
    // this.loadTaskProp();
  }
};
</script>
