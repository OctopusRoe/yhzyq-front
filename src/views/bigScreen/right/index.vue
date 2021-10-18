<script>
/**
 * @description 左侧组件容器
 * @author OctopusRoe
 */

import Buttom from './buttom'
import Top from './top'

export default {
  components: {
    Buttom,
    Top
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
  },
  activated () {
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }

}
</script>
<style lang="scss" scoped>
.big-screen-right-box {
  width: 448px;
  height: 867px;
  padding-top: 10px;
  position: absolute;
  right: 16px;
}
</style>
<template>
  <div class="big-screen-right-box">
    <Top />
    <Buttom />
  </div>
</template>
