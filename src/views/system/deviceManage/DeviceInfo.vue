<template>
  <div class="detail-info">
    <el-page-header
      content="设备详情"
      @back="closeDevInf"
    >
    </el-page-header>
    <el-form
      class="custom-form"
      label-width="100"
      label-position="left"
    >
      <el-form-item label="设备名称">
        {{selDevInfo.deviceName}}
      </el-form-item>
      <el-form-item label="设备编号">
        {{selDevInfo.deviceNumber}}
      </el-form-item>
      <el-form-item label="设备类型">
        {{selectDictLabelEx(devTypeOptions,scope.row.deviceType)}}
      </el-form-item>
      <el-form-item label="设备状态">
        {{selectDictLabelEx(devStaOptions,scope.row.deviceStatus)}}
      </el-form-item>
      <el-form-item label="电池电量">
        {{selDevInfo.electricity}}
      </el-form-item>
      <el-form-item label="管理中心">
        {{selDevInfo.centerName}}
      </el-form-item>
      <el-form-item label="当前位置">
        <div
          ref="map"
          class="map-box"
          id="map"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import mapMixin from '../constructionOperation/mixins/mapMixin';
export default {
  props: {
    selDevInfo: {
      type: Object | null,
      default: null
    },
  },
  watch: {
    selDevInfo: {
      immediate: true,
      handler(info) {
        if (info && info.longitude && info.latitude) {
          setTimeout(() => {
            this.setMapCenter([info.longitude, info.latitude])
            this.judDevTyp(info.deviceType)
            this.setMapIconMarker(undefined, [info.longitude, info.latitude], info.deviceName)
          }, 1000)
        }
      }
    }
  },
  data() {
    return {
      iconUrl: ''
    }
  },
  mixins: [mapMixin],
  methods: {
    closeDevInf() {
      this.$emit("update:selDevInfo", null)
    },
    judDevTyp(deviceType) {
      switch (deviceType) {
        case 'DEVICE_TYPE_TACHOMETER':
          this.iconUrl = require("@/views/bigScreen/assets/images/1.png")
          break;
        case 'DEVICE_TYPE_POSITIONER':
          this.iconUrl = require("@/views/bigScreen/assets/images/4.png")
          break;
        case 'DEVICE_TYPE_VIDEO_CAMERA':
          this.iconUrl = require("@/views/bigScreen/assets/images/2.png")
          break;
        case 'DEVICE_TYPE_LEI_DA':
          this.iconUrl = require("@/views/bigScreen/assets/images/3.png")
          break;
        default:
          break;
      }
    },
    setMapCenter(center) {
      this.map.setCenter(center)
      this.map.setZoom(11)
    },
    setMapIconMarker(iconUrl = this.iconUrl, point, name) {
      const marker = this.map.IconMarker({
        iconUrl,
        offset: [0, 30],
        fontStyle: '20px Microsoft YaHei',
        fontColor: '#fff'
      })
      marker.create({
        point: point,
        name: name,
        label: name
      })
      this.map.addLayer(marker.layer)
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
.map-box {
  width: 400px;
  height: 400px;
}
</style>