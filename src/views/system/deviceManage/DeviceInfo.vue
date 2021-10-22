<template>
  <div class="detail-info">
    <el-page-header
      content="设备详情"
      @back="closeDevInf"
    >
    </el-page-header>
    <el-form class="custom-form" label-width="100" label-position="left">
      <el-form-item label="设备名称">
        {{selDevInfo.deviceName}}
      </el-form-item>
      <el-form-item label="设备编号">
        {{selDevInfo.deviceNumber}}
      </el-form-item>
      <el-form-item label="设备类型">
        {{selDevInfo.deviceType}}
      </el-form-item>
      <el-form-item label="设备状态">
        {{selDevInfo.deviceStatus}}
      </el-form-item>
      <el-form-item label="电池电量">
        {{selDevInfo.electricity}}
      </el-form-item>
      <el-form-item label="管理中心">
        {{selDevInfo.centerName}}
      </el-form-item>
      <el-form-item label="当前位置">
        {{`${selDevInfo.longitude},${selDevInfo.latitude}`}}
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    selDevInfo: {
      type: Object | null,
      default: null
    },
  },
  methods: {
    closeDevInf() {
      this.$emit("update:selDevInfo", null)
    }
  },
}

</script>

<style lang="scss" scoped>
::v-deep .el-form-item {
  .el-form-item__content {
    text-align: left;
  }
}
.detail-info {
  width: 100%;
  height: 100%;
  text-align: center;
}
.custom-form {
  margin: 50px 40px 0;
}
</style>