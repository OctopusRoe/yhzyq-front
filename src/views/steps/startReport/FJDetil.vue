<template>
  <el-dialog
    v-if="isExist"
    title="附件"
    :visible.sync="dialogShow"
    :append-to-body="true"
    :close-on-click-modal="false"
    width="45%"
    class="dialog-common"
    @close="closeDialog"
  >
    <UploadManageFrame
      showuploader="true"
      sortCode="draw"
      :orgId="orgId"
      :businessID="id"
      :isShow="false"
      :showDel="false"
    ></UploadManageFrame>

    <div slot="footer" class="dialog-footer" style="text-align: center">
      <el-button type="primary" @click="cancel" style="margin-left: 50px"
        >关闭</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import UploadManageFrame from "@/components/fileUploader/UploadManageFrame";
export default {
  name: "",
  components: { UploadManageFrame },
  data() {
    return {
      dialogShow: false,
      isExist: false,
      id: undefined,
      orgId: undefined //组织机构ID
    };
  },
  created() {},
  methods: {
    showModal(id, oid) {
      // this.wbsIdForm.wbsId = addParams.wbsIdAdd;
      this.id = id;
      this.orgId = oid;
      this.dialogShow = true;
      this.isExist = true;
    },
    //关闭按钮
    cancel() {
        // this.$emit("cancel");
      this.showAddReport = false;
      this.isExist = false;
    },
    closeDialog() {
      this.isExist = false;
      // this.$emit("cancel");
    },
    reset() {}
  }
};
</script>
