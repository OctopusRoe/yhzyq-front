<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="950px"
    :before-close="handleClose"
    :append-to-body="true"
    :close-on-click-modal="false"
    class="dialog-common"
    style="margin-top: -6%"
  >
    <div style="overflow-x: hidden; overflow-y: auto; height:75%; align:center">
      <iframe :src="startReportUrl" width="100%" height="95%"></iframe>
    </div>
  </el-dialog>
</template>

<script>

import { getOrgBaseReport } from "@/api/steps/startReport/startReport";

export default {
  data() {
    return {
      dialogVisible: false,
      title: "报表",
      startReportUrl: ""
    };
  },
  methods: {
    handleClose(done) {
      done();
    },
    showModal(id,oid) {
      const reportUrl = process.env.VUE_APP_REPORTURL;
      getOrgBaseReport({
        orgId: oid,
        reportCode: "JDGL.ZJJG.JGZS"
      }).then(res => {
        let reportAdress = res[0].reportAddresses;
        this.startReportUrl = `${reportUrl}${reportAdress}&id=${id}`;
        this.dialogVisible = true;
      });
    }
  }
};
</script>
<style lang="less" scoped></style>
