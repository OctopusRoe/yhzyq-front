<template>
  <el-dialog :title="title" :visible.sync="connection" width="500px" append-to-body>
    <el-row>
        <el-col :span="24">
            <el-tabs type="border-card" v-model="tabActiveName">
                <el-tab-pane label="常规" name="general">
                    <general-cfg :form="form" ></general-cfg>
                </el-tab-pane>
                <el-tab-pane label="条件" name="condition">
                    <condition-cfg></condition-cfg>
                </el-tab-pane>
                <el-tab-pane label="事件监听" name="executionListener">
                    <listener-cfg></listener-cfg>
                </el-tab-pane>
            </el-tabs>
        </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
  import {mapActions, mapGetters} from "vuex";
  import GeneralCfg from "./ConnectionGeneral";
  import ConditionCfg from "./ConnectionCondition";
  import ListenerCfg from "./ConnectionListener";

  export default {
    data() {
      return {
        title:"Connection属性",
        connection:false,
        tabActiveName: "general",
        form:{
          id:"",
          name:""
        }
      };
    },
    components: {
      GeneralCfg,
      ConditionCfg,
      ListenerCfg
    },
    methods:{
      showModal(id,name) {
        this.connection = true;
        this.form ={id:id,name:name}
      }
    }
  };
</script>
