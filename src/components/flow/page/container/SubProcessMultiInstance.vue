<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="right" size="mini">
        <el-form-item label="顺序执行" prop="sequential">
            <el-radio-group v-model="form.sequential">
                <el-radio label="true" border>是</el-radio>
                <el-radio label="false" border>否</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item prop="loopCardinality" label="循环次数">
            <el-input v-model="form.loopCardinality" clearable></el-input>
        </el-form-item>
        <el-form-item prop="collection" label="集合">
            <el-checkbox v-model="form.collection"></el-checkbox>
        </el-form-item>
        <el-form-item prop="elementVariable" label="变量">
            <el-checkbox v-model="form.elementVariable"></el-checkbox>
        </el-form-item>
        <el-form-item prop="completionCondition" label="完成条件">
            <el-checkbox v-model="form.completionCondition"></el-checkbox>
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
  data() {
    return {
      form: {
        sequential: "false",
        loopCardinality: "",
        collection: "",
        elementVariable: "",
        completionCondition: ""
      },
      rules: {}
    };
  },
  methods: {
    ...mapActions(["saveSubProcessMultilInstance"]),
    loadTaskProp() {
      let task = this.$store.state.process;
      if (task != null && task != undefined) {
        this.form.sequential = task.isSequential.toString();
        this.form.loopCardinality = task._loopCardinality;
        this.form.collection = task._collection;
        this.form.elementVariable = task._elementVariable;
        this.form.completionCondition = task._completionCondition;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveSubProcessMultilInstance(this.form);
          Message.success("保存成功！");
        } else {
          return false;
        }
      });
    }
  },
  mounted() {
    //console.log("当前选择的task", this.$store.state.selectedTask);
    this.loadTaskProp();
  }
};
</script>
