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
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
    }
  },
  computed: {
    itemWidth () {
      return this.width * 0.23
    },
    itemHeight () {
      if (this.height === 657) {
        return this.height * 0.90
      } else {
        return this.height * 0.93
      }
    }
  },
  watch: {
  },
  beforeDestroy () {
  },
  activated () {
  },
  created () {
    console.log(this.$echarts)
  },
  mounted () {
  },
  methods: {
  }

}
</script>
<template>
  <div
    class="big-screen-left-box"
    :style="{width: `${itemWidth}px`, height: `${itemHeight}px`}"
  >
    <Top
      :width="itemWidth"
      :height="itemHeight"
    />
    <Bottom
      :width="itemWidth"
      :height="itemHeight"
    />
  </div>
</template>
<style lang="scss" scoped>
.big-screen-left-box {
  padding-top: 10px;
  position: absolute;
  left: 16px;
}
</style>
