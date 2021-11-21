<script>
/**
 * @description 大屏的主页面
 * @author OctopusRoe
 * @version 0.0.1
*/

import MapInit from 'octopus-map-one'

import Head from './head'
import Left from './left'
import Right from './right'

import Example from './components/example'
import DropDownTree from './components/dropDownTree'

import {
  getMapData,
  tileBaseUrl,
  queryMangeCenter,
  querySelectDeviceByTypeCount,
  selectDeviceByMangeCenter,
  monthWorkJobCount,
  workJobInfo,
  queryLonAndLatByZH
} from './api/index'
import controlMap from './controlMap'
import VideoDialog from './VideoDialog.vue'

export default {
  components: {
    Head,
    Left,
    Right,
    Example,
    DropDownTree,
    VideoDialog
  },
  mixins: [controlMap],
  props: {
  },
  data () {
    return {
      treeList: null,
      map: null,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      treeName: '',
      nameList: [],
      valueList: [],
      tableList: []
    }
  },
  computed: {
  },
  watch: {
  },
  beforeDestroy () {
    document.getElementById('app').style.cssText = 'transform: scale(1, 1.125)'
  },
  mounted () {
    // 神TMD写法哦, app 设置个 cssText: "transform: scale(1, 1.125);" 在用脚写代码的嘛
    document.getElementById('app').style.cssText = 'width: 100% !important; height: 100% !important'
    this.getMap()
    this.getManagerCenter()
    this.workJobInfo()
    this.monthWorkJobCount()
    setTimeout(() => {
      this.selectDeviceByMangeCenter()
    }, 1000)
  },
  methods: {

    async getMap () {
      try {
        const back = await getMapData()
        this.mapInit(back.data)
      } catch (e) {
        console.error(e)
        console.error(e.error)
      }
    },

    // 初始化地图
    mapInit (data) {
      this.map = new MapInit({
        target: this.$refs.map,
        useControl: false
      })

      this.map.addView({
        center: [115.69319722700004, 27.36884229800006],
        proj: 'EPSG:4326',
        zoom: 8,
        minZoom: 7,
        maxZoom: 22
      })

      this.map.useGLKF({
        url: tileBaseUrl,
        data: data,
        proj: 'EPSG: 4326'
      })

      // this.map.useTianDiTu({
      //   type: ['vec', 'cva'],
      //   proj: 'EPSG:4326',
      //   key: 'a3f0bbf7db728e8db4ebbe860679d4bb',
      //   url: 'http://t{0-7}.tianditu.gov.cn/'
      // })
    },

    // 获取管理中心
    async getManagerCenter () {
      const back = await queryMangeCenter()
      this.treeName = back.result[0].name
      this.treeList = back.result
    },

    // 获取全部设备信息
    async selectDeviceByMangeCenter (id = '') {
      const back = await selectDeviceByMangeCenter({ id: id })
      this.createMark(back.result)
    },

    // 施工列表
    async workJobInfo (id = 'A01') {
      const { result } = await workJobInfo({ centerId: id, jobStatus: 1 })
      this.tableList = result
      if (result.length === 0) return
      // result.forEach(async item => {
      //   const point = JSON.parse(item.roadGeo)
      //   this.createLine({ point: point })
      // })

      for (let i = 0; i < result.length; i++) {
        if (result[i].roadGeo === '') continue
        const point = JSON.parse(result[i].roadGeo)
        this.createLine({ point: point })
      }
    },

    // 月度施工情况
    async monthWorkJobCount (id = 'A01') {
      const { result } = await monthWorkJobCount({ centerId: id })
      if (result.length === 0) {
        this.nameList = []
        this.valueList = []
      }

      result.forEach((item, index) => {
        // if (index > 7) return
        this.$set(this.nameList, index, item.name)
        this.$set(this.valueList, index, ~~item.mileSum)
      })
    },

    // 点击树形
    nodeClick (data, node) {
      // this.selectDeviceByMangeCenter(data.id)
      this.workJobInfo(data.id)
      this.monthWorkJobCount(data.id)
    },

    async backValue (item) {
      if (item.roadGeo === '') return
      const point = JSON.parse(item.roadGeo)
      this.createLine({ point: point })
      this.map.setCenter(point[~~(point.length / 2)])
      this.map.setZoom(15)
    },

    // 转跳意见反馈
    goToYJFK () {

    },
  }

}
</script>
<template>
  <div class="big-screen-box">

    <Head class="head-box" />
    <div
      ref="map"
      class="map-box"
      id="map"
    />
    <Example class="position-box" />
    <DropDownTree
      class="tree-box"
      :data="treeList"
      :props="defaultProps"
      :title="treeName"
      @node-click="nodeClick"
    />
    <Left />
    <Right
      :nameList="nameList"
      :valueList="valueList"
      :tableList="tableList"
      :backValue="backValue"
    />

    <img
      src="./assets/images/yjfk.png"
      class="yjfk"
      @clcik="goToYJFK"
    />
    <video-dialog ref="videoDialogRef" />
  </div>
</template>
<style lang="scss" scoped>
::v-deep .content-box {
  width: 100%;
  height: 40px;
  display: flex;
}

::v-deep .line-box {
  border-bottom: 1px solid #cbebec;
}

::v-deep .overlayer-box {
  width: 324px;
  height: 269px;
  background: url('~./assets/images/five.png') no-repeat center / contain;
  background-size: 324px 269px;
  position: relative;
}

::v-deep .title-box {
  width: 100%;
  height: 50px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

::v-deep .title {
  padding: 10px 0 0 0;
  width: 150px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

::v-deep .big-screen-box {
  // height: 1080px;
  width: 100%;
  background-color: rgb(4, 2, 44);
  position: relative;
  z-index: 0;
}
::v-deep .close {
  padding: 22px 20px 0 0;
}

::v-deep .close:hover {
  cursor: pointer;
}

::v-deep .center-box-box {
  width: 324px;
  height: 219px;
  padding: 5px 5px;
}

::v-deep .item-box {
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 0 13px;
  width: 100%;
  height: 40px;
}

::v-deep .center-title {
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #ffffff;
}

::v-deep .center-center {
  font-size: 16px;
  font-family: Microsoft YaHei;
  color: #ffffff;
  display: flex;
  align-items: center;
}

::v-deep .one-zindex {
  z-index: 100;
}

::v-deep .camera {
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/*************************************/
.map-box {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: -1;
}

.position-box {
  position: absolute;
  top: 12%;
  right: 25%;
}

.tree-box {
  position: absolute;
  top: 12%;
  left: 25%;
}

.yjfk {
  position: absolute;
  right: 0;
  bottom: 218px;
  width: 28px;
  height: 92px;
}

::v-deep #checkVideo {
  cursor: pointer;
  text-decoration: underline;
}
</style>
