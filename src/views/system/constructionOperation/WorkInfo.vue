<template>
  <div class="detail-info">
    <el-scrollbar style="height:100%">
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
          {{`${selWorInfo.roadName}${selWorInfo.landmarkStartId}至${selWorInfo.landmarkEndId}`}}
        </el-form-item>
        <el-form-item label="公路里程">
          {{`${selWorInfo.mile}`}}
        </el-form-item>
        <el-form-item label="车道">
          {{selWorInfo.lane}}
        </el-form-item>
        <el-form-item label="计划施工时间">
          {{`${selWorInfo.planStartTime.substr(0,10)}至${selWorInfo.planEndTime.substr(0,10)}`}}
        </el-form-item>
        <el-form-item label="管理中心">
          {{selWorInfo.centerName}}
        </el-form-item>
        <el-form-item label="联系人">
          {{`${selWorInfo.contactName}-${selWorInfo.contactPhone}`}}
        </el-form-item>
        <el-form-item label="备注">
          {{`${selWorInfo.remark}`}}
        </el-form-item>
      </el-form>
      <h4>施工作业开工信息</h4>
      <el-form
        class="custom-form"
        label-width="120"
        label-position="left"
      >
        <el-form-item label="施工作业名称">
          <div>{{selWorInfo.jobStatus | jonFil }}</div>
          <div>开始施工时间&nbsp;&nbsp;&nbsp;&nbsp;{{ selWorInfo.startTime }}</div>
          <div>结束施工时间&nbsp;&nbsp;&nbsp;&nbsp;{{ selWorInfo.endTime }}</div>
        </el-form-item>
        <el-form-item label="施工作业平面图">
          <div
            ref="map"
            class="map-box"
            id="map"
          />
        </el-form-item>
        <!-- <el-form-item label="施工作业视频">
        </el-form-item>
        <el-form-item label="违规消息">
        </el-form-item>
        <el-form-item label="施工作业评价">
        </el-form-item> -->
      </el-form>
    </el-scrollbar>
  </div>
</template>

<script>
import mapMixin from './mixins/mapMixin';
export default {
  props: {
    selWorInfo: {
      type: Object | null,
      default: null
    },
  },
  mixins: [mapMixin],
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
  watch: {
    selWorInfo: {
      immediate: true,
      handler (info) {
        if (info && info?.centerPoint?.length) {
          setTimeout(() => {
            // info.centerPoint
            this.setMapCenter(undefined)
            const points = this.splitStrArr(info.roadGeo)
            this.createPolygon(undefined)
          }, 1000)
        }
      }
    }
  },
  methods: {
    closeWorInf () {
      this.$emit("update:selWorInfo", null)
    },
    splitStrArr (roadGeo) {
      const arr = []
      const resArr = roadGeo.split(',').map((item) => {
        const arr = item.split(' ')
        return [arr[0], arr[1]]
      })
      arr.push(resArr)
      return arr
    },
    setMapCenter (center = [115.904642, 28.680854]) {
      this.map.setCenter(center)
      this.map.setZoom(15)
    },
    createPolygon (point = [
      [115.904642, 28.680854],
      [115.90469, 28.680417],
      [115.905204, 28.680444],
      [115.905222, 28.680264],
      [115.905566, 28.680263],
      [115.905616, 28.680216],
      [115.905634, 28.680041],
      [115.906109, 28.680052],
      [115.906133, 28.680499],
      [115.905709, 28.680494],
      [115.905693, 28.680914],
      [115.904642, 28.680854]
    ]) {
      const gridPolygon = this.map.GridPolygon({
        stroke: { color: 'rgba(255, 255, 255, 0.8)', width: 10, lineDash: [0, 0] }
      })
      gridPolygon.create({
        point: [point],
        color: '#fff'
      })
      this.map.addLayer(gridPolygon.layer)
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
  margin: 10px 40px 0;
}
h4 {
  margin: 10px 0;
  text-align: left;
  font-size: 18px;
}
.map-box {
  width: 90%;
  height: 400px;
}
</style>