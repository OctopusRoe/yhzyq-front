<template>
  <div class="dev-man-contianer">
    <template v-if="!selDevInfo">
      <Form @submitForm="submitForm"></Form>
      <Table
        :form="form"
        :selDevInfo.sync="selDevInfo"
        @openDialog="openDialog"
        ref="tableRef"
      ></Table>
      <Dialog
        ref="dialogRef"
        @submitSucc="submitSucc"
      ></Dialog>
    </template>
    <template v-else>
      <DeviceInfo :selDevInfo.sync="selDevInfo"></DeviceInfo>
    </template>
  </div>
</template>

<script>
import DeviceInfo from './DeviceInfo';
import Dialog from './Dialog';
import Form from './Form';
import Table from './Table';
import { initForm } from './initData';
export default {
  name: "",
  components: {
    DeviceInfo,
    Dialog,
    Form,
    Table,
  },
  model: "",
  props: {},
  data() {
    return {
      form: initForm,
      selDevInfo: null
    };
  },
  computed: {},
  watch() { },
  created() { },
  mounted() { },
  beforeDestroy() { },
  methods: {
    openDialog(isEdit, info) {
      this.$refs.dialogRef.open(isEdit, info)
    },
    submitSucc() {
      this.$refs.tableRef.getListDev()
    },
    submitForm(form) {
      this.form = form
      this.$refs.tableRef.getListDev()
    }
  },
  filter: {},
};
</script>

<style lang="scss" scoped>
.dev-man-contianer {
  padding: 10px;
}
</style>