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
        <el-form-item label="上下行">
          {{selWorInfo.lane==='1'?'上行':'下行'}}
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
          <div id="player"></div>
        </el-form-item> -->
        <!-- <el-form-item label="违规消息">
        </el-form-item>
        <el-form-item label="施工作业评价">
        </el-form-item> -->
      </el-form>
    </el-scrollbar>
  </div>
</template>

<script>
import mapMixin from './mixins/mapMixin';
import { queryLonAndLatByZH } from '../../bigScreen/api'
export default {
  props: {
    selWorInfo: {
      type: Object | null,
      default: null
    },
  },
  mixins: [mapMixin],
  data() {
    return {
      player: null,
      IS_MOVE_DEVICE: false,
      urls: {
        realplay: '',
        talk: '',
        playback: ''
      },
      model: 0,
    }
  },
  // mounted() {
  //   // this.$el.style.setProperty('display', 'block')
  //   this.init()
  //   this.createPlayer()
  // },
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
      handler(info) {
        // if (info) {
        //   setTimeout(() => {
        //     this.init()
        //     this.createPlayer()
        //     this.realplay()
        //   }, 1000)
        // }
        if (info) {
          this.backValue(info)
        }
      }
    }
  },
  methods: {
    closeWorInf() {
      this.$emit("update:selWorInfo", null)
    },
    splitStrArr(roadGeo) {
      const arr = []
      const resArr = roadGeo.split(',').map((item) => {
        const arr = item.split(' ')
        return [arr[0], arr[1]]
      })
      arr.push(resArr)
      return arr
    },
    setMapCenter(center = [115.904642, 28.680854]) {
      this.map.setCenter(center)
      this.map.setZoom(10)
    },
    createPolygon(point = [
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
    },
    createLine(options) {
      this.map.removeLayer(this.map.searchLayers('line'))
      this.line = this.map.Line({ name: 'line', style: { color: 'red', width: 3 } })
      this.map.addLayer(this.line.layer)

      if (Array.isArray(options)) {
        options.forEach(item => {
          this.line.create({ point: item.point })
        })
      } else {
        this.line.create({ point: options.point })
      }
    },
    async backValue(item) {
      const back = await queryLonAndLatByZH({ endNum: item.landmarkEndId, startNum: item.landmarkStartId, lxbm: item.roadCode, direction: item.lane })
      this.setMapCenter(back.result[0])
      this.createLine({ point: back.result })
    },
    init() {
      // 设置播放容器的宽高并监听窗口大小变化
      window.addEventListener('resize', () => {
        this.player.JS_Resize()
      })
    },
    createPlayer() {
      this.player = new JSPlugin({
        szId: 'player',
        szBasePath: "/",
        iMaxSplit: 1,
        iCurrentSplit: this.IS_MOVE_DEVICE ? 1 : 2,
        openDebug: true,
        oStyle: {
          borderSelect: this.IS_MOVE_DEVICE ? '#000' : '#FFCC00',
        }
      })

      // 事件回调绑定
      this.player.JS_SetWindowControlCallback({
        windowEventSelect: function (iWndIndex) {  //插件选中窗口回调
          console.log('windowSelect callback: ', iWndIndex);
        },
        pluginErrorHandler: function (iWndIndex, iErrorCode, oError) {  //插件错误回调
          console.log('pluginError callback: ', iWndIndex, iErrorCode, oError);
        },
        windowEventOver: function (iWndIndex) {  //鼠标移过回调
          //console.log(iWndIndex);
        },
        windowEventOut: function (iWndIndex) {  //鼠标移出回调
          //console.log(iWndIndex);
        },
        windowEventUp: function (iWndIndex) {  //鼠标mouseup事件回调
          //console.log(iWndIndex);
        },
        windowFullCcreenChange: function (bFull) {  //全屏切换回调
          console.log('fullScreen callback: ', bFull);
        },
        firstFrameDisplay: function (iWndIndex, iWidth, iHeight) {  //首帧显示回调
          console.log('firstFrame loaded callback: ', iWndIndex, iWidth, iHeight);
        },
        performanceLack: function () {  //性能不足回调
          console.log('performanceLack callback: ');
        }
      });
    },
    realplay() {
      let { player, mode, urls } = this,
        index = player.currentWindowIndex,
        playURL = urls.realplay

      player.JS_Play(playURL, { playURL, mode }, index).then(
        () => { console.log('realplay success') },
        e => { console.error(e) }
      )
    },
    stopPlay() {
      this.player.JS_Stop().then(
        () => { this.playback.rate = 0; console.log('stop realplay success') },
        e => { console.error(e) }
      )
    },
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
  padding-bottom: 100px;
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
#player {
  width: 200px;
  height: 200px;
  border: 1px solid black;
}
</style>