<template>
  <div class="dev-man-contianer">
    <template v-if="!selWorInfo">
      <Form @submitForm="submitForm"></Form>
      <Table
        :form="form"
        :selWorInfo.sync="selWorInfo"
        @openDialog="openDialog"
        ref="tableRef"
      ></Table>
      <Dialog
        ref="dialogRef"
        @submitSucc="submitSucc"
      ></Dialog>
    </template>
    <template v-else>
      <WorkInfo :selWorInfo.sync="selWorInfo"></WorkInfo>
    </template>
  </div>
</template>

<script>
import WorkInfo from './WorkInfo';
import Form from './Form';
import Table from './Table';
import Dialog from './Dialog';
import { initForm } from './initData';
export default {
  name: "",
  components: {
    WorkInfo,
    Form,
    Table,
    Dialog
  },
  props: {},
  model: "",
  data() {
    return {
      form: initForm,
      selWorInfo: null
    };
  },
  created() { },
  mounted() { },
  beforeDestroy() { },
  watch() { },
  computed: {},
  filter: {},
  methods: {
    openDialog(isEdit, info) {
      this.$refs.dialogRef.open(isEdit, info)
    },
    submitSucc() {
      this.$refs.tableRef.getListWor()
    },
    submitForm(form) {
      this.form = form
      this.$refs.tableRef.getListWor({ ...form, pageNumber: initForm.pageNumber, pageSize: initForm.pageSize })
    }
  }
};
</script>

<style lang="scss" scoped>
.dev-man-contianer {
  padding: 10px;
}
</style>