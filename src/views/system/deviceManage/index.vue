<template>
  <div class="dev-man-contianer">
    <Form></Form>
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
    }
  }
};
</script>

<style lang="scss" scoped>
.dev-man-contianer {
  padding: 10px;
}
</style>