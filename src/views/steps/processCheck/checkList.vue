<template>
  <el-dialog
    title="检查项"
    :visible.sync="dialogShow"
    :append-to-body="true"
    :close-on-click-modal="false"
    width="45%"
    class="dialog-common"
  >
    <vxe-table
      border
      highlight-hover-row
      :align="allAlign"
      :data="tableData"
    >
      <vxe-table-column type="seq" title="序号" width="10%"></vxe-table-column>
      <vxe-table-column field="checkItem" title="检查项" width="30%"></vxe-table-column>
      <vxe-table-column field="explain" title="说明"></vxe-table-column>
    </vxe-table>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="cancel">关 闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      currentId: undefined,
      dialogShow: false,
      allAlign: null,
      form: {
        checkItem: undefined, //检查项
        explain: undefined //说明
      },
      tableData: [
        {
          id: 10001,
          checkItem: "灌注桩桩底压浆实测项目",
          explain:
            "灌注桩桩底压浆实测项目应符合JTG F80/1-2017公路I程质量检验评定标准第一册土建工程表8.5.10的规定"
        },
        {
          id: 10002,
          checkItem: "灌注桩桩底压浆实测项目",
          explain:
            "灌注桩桩底压浆实测项目应符合JTG F80/1-2017公路I程质量检验评定标准第一册土建工程表8.5.10的规定"
        }
      ]
    };
  },
  methods: {
    showModal(id) {
      this.currentId = id;
      this.dialogShow = true;
    },
    //关闭按钮
    cancel() {
      this.reset();
      this.dialogShow = false;
    },
    //重置表单
    reset() {
      this.form = {
        checkItem: undefined, //检查项
        explain: undefined //说明
      };
    }
  }
};
</script>
