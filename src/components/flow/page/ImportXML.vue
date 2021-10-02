<template>
  <el-dialog :title="title" :visible.sync="isImport" width="50%" append-to-body>
    <el-row>
        <el-col :span="24">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="right" size="mini">
                <el-form-item label="XML" prop="xml">
                    <el-input type="textarea" :autosize="{minRows:10}" placeholder="请输入要导入的XML" v-model="form.xml"></el-input>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="24">
            <el-row type="flex" justify="center">
                <el-col :span="2">
                    <el-button type="primary" icon="el-icon-edit" @click="importXML('form')">导入</el-button>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import Message from "../common/Message";
import ESTDesigner from "../node/Packages";
import "../node/Application";
import "../node/Parser";
export default {
  data() {
    return {
      title:"导入xml",
      isImport:false,
      form: {
        xml: ""
      },
      rules: {
        xml: [
          {
            required: true,
            message: "XML必须填写",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    importXML(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        } else {
          let canvas = this.$store.state.canvas;
          canvas.clear();
          let parser = new ESTDesigner.tool.Parser(canvas, this.form.xml);
          parser.parse();
          this.msgSuccess("导入成功！")
          this.isImport=false
        }
      });
    },
    showModal() {
      this.isImport = true;
    }
  }
};
</script>
