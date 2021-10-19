<script>
/**
 * @description 大屏的主页面
 * @author OctopusRoe
 * @version 0.0.1
*/

import Head from './head'
import Left from './left'
import Right from './right'

export default {
  components: {
    Head,
    Left,
    Right
  },
  props: {
  },
  data () {
    return {
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
    // 神TMD写法哦, app 设置个 cssText: "transform: scale(1, 1.125);" 真尼玛会写，技术要不要这么菜
    document.getElementById('app').style.cssText = 'height: 1080px !important'
  },
  mounted () {
  },
  methods: {
  }

}
</script>
<template>
  <div class="big-screen-box">

    <Head />
    <Left />
    <Right />
  </div>
</template>
<style lang="scss" scoped>
.big-screen-box {
  height: 1080px;
  width: 1920px;
  background-color: red;
  position: relative;
}
</style>
