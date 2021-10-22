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

import { treeList } from './mock'


export default {
  components: {
    Head,
    Left,
    Right,
    Example,
    DropDownTree
  },
  props: {
  },
  data () {
    return {
      treeList: treeList,
      map: null
    }
  },
  computed: {
  },
  watch: {
  },
  beforeDestroy () {
    document.getElementById('app').style.cssText = 'transform: scale(1, 1.125)'
  },
  activated () {
  },
  created () {
    // 神TMD写法哦, app 设置个 cssText: "transform: scale(1, 1.125);" 在用脚写代码的嘛
    document.getElementById('app').style.cssText = 'height: 1080px !important'
  },
  mounted () {
    this.mapInit()
  },
  methods: {
    // 初始化地图
    mapInit () {
      this.map = new MapInit({
        target: this.$refs.map,
        useControl: false
      })

      this.map.addView({
        center: [115.904642, 28.680854],
        proj: 'EPSG:4326',
        zoom: 15,
        minZoom: 7,
        maxZoom: 19
      })

      this.map.useTianDiTu({
        type: ['vec', 'cva'],
        proj: 'EPSG:4326',
        key: 'a3f0bbf7db728e8db4ebbe860679d4bb',
        url: 'http://t{0-7}.tianditu.gov.cn/'
      })
    },

    // 转跳意见反馈
    goToYJFK () {

    }
  }

}
</script>
<template>
  <div class="big-screen-box">

    <Head class="head-box" />
    <div
      ref="map"
      class="map-box"
    />
    <Example class="position-box" />
    <DropDownTree
      class="tree-box"
      :data="treeList"
    />
    <Left />
    <Right />

    <img
      src="./assets/images/yjfk.png"
      class="yjfk"
      @clcik="goToYJFK"
    />

  </div>
</template>
<style lang="scss" scoped>
.big-screen-box {
  height: 1080px;
  width: 1920px;
  background-color: rgb(4, 2, 44);
  position: relative;
  z-index: 0;
}

.map-box {
  width: 1920px;
  height: 1080px;
  position: absolute;
  top: 0;
  z-index: -1;
}

.position-box {
  position: absolute;
  top: 108px;
  right: 480px;
}

.tree-box {
  position: absolute;
  top: 108px;
  left: 480px;
}

.yjfk {
  position: absolute;
  right: 0;
  bottom: 218px;
  width: 28px;
  height: 92px;
}
</style>
