<template>
  <el-dialog
    class="dialog-common"
    :title="title"
    :visible.sync="showHistory"
    :append-to-body="true"
  >
    <div class="table-box">
      <el-table ref="daiBanList" :data="historyData" height="60%" row-key="id">
        <el-table-column type="index" label="序号" align="center" width="50">
        </el-table-column>
        <el-table-column prop="finishTime" label="审核时间" width="200">
        </el-table-column>
        <el-table-column prop="operator" label="审核人"> </el-table-column>
        <el-table-column prop="displayName" label="审核节点"> </el-table-column>
        <el-table-column prop="result" label="审核结果"> </el-table-column>
        <el-table-column prop="remark" label="备注"> </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script>
import { queryHistory } from "@/api/flow/daiBanTask";

export default {
  name: "historyFlow",
  created() {},
  data() {
    return {
      title: "流程记录",
      showHistory: false,
      historyData: []
    };
  },
  methods: {
    showModal(orderId) {
      this.showHistory = true;
      const data = {
        orderId: orderId
      };
      queryHistory(data).then(response => {
        debugger;
        this.historyData = response.data;
      });
    }
  }
};
</script>

<style scoped></style>
