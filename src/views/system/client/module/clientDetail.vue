<template>
  <el-dialog
    title="详情"
    :visible.sync="dialogVisible"
    width="800"
    :before-close="handleClose"
    :modal-append-to-body="false"
    class="dialog-common"
  >
    <table class="view-table" cellspacing="0" cellpadding="0">
      <tr>
        <td class="label">客户端类型</td>
        <td class="content">{{ form.clienttype | clientTypeFilter }}</td>
        <td class="label">客户端描述</td>
        <td class="content">{{ form.clientcescription }}</td>
      </tr>
      <tr>
        <td class="label">clientUrl</td>
        <td class="content" colspan="3">
          {{ form.clienturi }}
        </td>
      </tr>
      <tr>
        <td class="label">回调url</td>
        <td class="content" colspan="3">{{ form.callbackurl }}</td>
      </tr>
      <tr>
        <td class="label">iosUrl</td>
        <td class="content" colspan="3">{{ form.iosUrl }}</td>
      </tr>
      <tr>
        <td class="label">androidUrl</td>
        <td class="content" colspan="3">{{ form.androidUrl }}</td>
      </tr>
      <tr>
        <td class="label">苹果版本</td>
        <td class="content">{{ form.iosVersion }}</td>
        <td class="label">安卓版本</td>
        <td class="content">{{ form.androidVersion }}</td>
      </tr>
      <tr>
        <td class="label">包名</td>
        <td>{{ form.packageName }}</td>
        <td class="label">类名</td>
        <td class="content">{{ form.className }}</td>
      </tr>
      <tr>
        <td class="label">修饰符</td>
        <td class="content" colspan="3">{{ form.allowedscopes }}</td>
      </tr>
    </table>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">关 闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
let clientType = ['手机端', 'C/S类型', '服务类型', 'B/S端', '第三方APP']

export default {
  data() {
    return {
      dialogVisible: false,
      form: {}
    }
  },
  filters: {
    clientTypeFilter(data) {
      return clientType[data]
    }
  },
  methods: {
    handleClose(done) {
      this.resetForm('ruleForm')
      done()
    },
    showModal(data) {
      this.form = data
      this.dialogVisible = true
    }
  }
}
</script>

<style></style>
