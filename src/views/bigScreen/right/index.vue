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
    nameList: {
      type: Array,
      default: () => []
    },
    valueList: {
      type: Array,
      default: () => []
    },
    tableList: {
      type: Array,
      default: () => []
    },
    backValue: {
      type: Function,
      default: () => { }
    },
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
  },
  mounted () {
  },
  methods: {
  }

}
</script>
<template>
  <div
    class="big-screen-right-box"
    :style="{width: `${itemWidth}px`, height: `${itemHeight}px`}"
  >
    <Top
      :tableList="tableList"
      @backvalue="backValue"
      :width="itemWidth"
      :height="itemHeight"
    />
    <Bottom
      :nameList="nameList"
      :valueList="valueList"
      :width="itemWidth"
      :height="itemHeight"
    />
  </div>
</template>
<style lang="scss" scoped>
.big-screen-right-box {
  padding-top: 10px;
  position: absolute;
  right: 16px;
}
</style>