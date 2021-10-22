<script>
/**
 * @description 左侧组件容器
 * @author OctopusRoe
 */

import Bottom from './bottom'
import Top from './top'

export default {
  components: {
    Bottom,
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
<template>
  <div class="big-screen-left-box">
    <Top />
    <Bottom />
  </div>
</template>
<style lang="scss" scoped>
.big-screen-left-box {
  width: 448px;
  height: 867px;
  padding-top: 10px;
  position: absolute;
  left: 16px;
}
</style>
