<template>
  <div class="detail-info">
    <el-page-header
      content="施工作业详情"
      @back="closeWorInf"
    >
    </el-page-header>
    <h4>施工作业基本信息</h4>
    <el-form
      class="custom-form"
      label-width="100"
      label-position="left"
    >
      <el-form-item label="施工作业名称">
        {{selWorInfo.jobName}}
      </el-form-item>
      <el-form-item label="施工区域">
        {{`${selWorInfo.roadName}${selWorInfo.landmarkStart}至${selWorInfo.landmarkStartId}`}}
      </el-form-item>
      <el-form-item label="车道">
        {{selWorInfo.lane}}
      </el-form-item>
      <el-form-item label="计划施工时间">
        {{`${selWorInfo.planStartTime}至${selWorInfo.planEndTime}`}}
      </el-form-item>
      <el-form-item label="选择联系人">
        {{selWorInfo.electricity}}
      </el-form-item>
      <el-form-item label="管理中心">
        {{`${selWorInfo.contactName}-${selWorInfo.contactPhone}`}}
      </el-form-item>
      <el-form-item label="备注">
        {{`${selWorInfo.remark}`}}
      </el-form-item>
    </el-form>
    <h4>施工作业开工信息</h4>
    <el-form
      class="custom-form"
      label-width="100"
      label-position="left"
    >
      <el-form-item label="施工作业名称">
        <div>{{selWorInfo.jobStatus | jonFil }}</div>
        <div>开始施工&nbsp;&nbsp;&nbsp;&nbsp;{{ selWorInfo.startTime }}</div>
        <div>结束施工&nbsp;&nbsp;&nbsp;&nbsp;{{ selWorInfo.endTime }}</div>
      </el-form-item>
      <el-form-item label="施工作业平面图">
      </el-form-item>
      <el-form-item label="施工作业视频">
      </el-form-item>
      <el-form-item label="违规消息">
      </el-form-item>
      <el-form-item label="施工作业评价">
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    selWorInfo: {
      type: Object | null,
      default: null
    },
  },
  filters: {
    jonFil: (jobStatus) => {
      switch (jobStatus) {
        case 0:
          return '未开始施工'
        case 1:
          return '已开始施工'
        case 2:
          return '已结束施工'
        default:
          break;
      }
    }
  },
  methods: {
    closeWorInf() {
      this.$emit("update:selWorInfo", null)
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