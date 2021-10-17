<template>
  <div class="dev-man-contianer">
    <Form @submitForm="submitForm"></Form>
    <Table
      @openDialog="openDialog"
      ref="tableRef"
    ></Table>
    <Dialog
      ref="dialogRef"
      @submitSucc="submitSucc"
    ></Dialog>
  </div>
</template>

<script>
import Form from './Form';
import Table from './Table';
import Dialog from './Dialog';
import { initForm } from './initData';
export default {
  name: "",
  components: {
    Form,
    Table,
    Dialog
  },
  props: {},
  model: "",
  data() {
    return {};
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
      this.$refs.tableRef.getListDev()
    },
    submitForm(form) {
      console.log('%c 🌽 form: ', 'font-size:20px;background-color: #465975;color:#fff;', form);
      this.$refs.tableRef.getListDev({ ...form, pageNumber: initForm.pageNumber, pageSize: initForm.pageSize })
    }
  }
};
</script>

<style lang="scss" scoped>
.dev-man-contianer {
  padding: 10px;
}
</style>