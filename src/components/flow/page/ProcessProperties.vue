<template>
  <el-dialog :title="title" :visible.sync="pop" width="500px" append-to-body>
    <el-row>
        <el-col :span="24">
            <el-tabs type="border-card" v-model="tabActiveName">
                <el-tab-pane label="常规" name="general">
                    <processGeneral :form="form"></processGeneral>
                </el-tab-pane>
<!--                <el-tab-pane label="流程变量" name="variable">-->
<!--                    <processVariable></processVariable>-->
<!--                </el-tab-pane>-->
<!--                <el-tab-pane label="数据对象" name="dataObject">-->
<!--                    <processDataObj></processDataObj>-->
<!--                </el-tab-pane>-->
<!--                <el-tab-pane label="事件监听" name="listener">-->
<!--                    <processListener></processListener>-->
<!--                </el-tab-pane>-->
            </el-tabs>
        </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import ProcessVariable from "./ProcessVariable";
import ProcessGeneral from "./ProcessGeneral";
import ProcessDataObj from "./ProcessDataObj";
import ProcessListener from "./ProcessListener";
export default {
  data() {
    return {
      title:"流程属性",
      pop:false,
      form: {
        id: "",
        name: "",
        category: "",
        documentation: "",
        callBack:""
      },
      tabActiveName: "general"
    };
  },
  components: {
    ProcessVariable,
    ProcessGeneral,
    ProcessDataObj,
    ProcessListener
  },
  created() {},
  mounted() {},
  activated() {},
  methods: {
    showModal(val){
      console.log(val.callBack)
      this.pop=true;
      this.form ={id:val.id,name:val.name,asynchronous:val.asynchronous,exclusive:val.exclusive,callBack:val.callBack}
    },
    // showModal(){
    //   this.pop=true;
    //   // this.form ={id:val.id,name:val.name,asynchronous:val.asynchronous,exclusive:val.exclusive}
    // }
  }
};
</script>
<style lang="less">
</style>
