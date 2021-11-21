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
    }
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
  <div class="big-screen-right-box">
    <Top
      :tableList="tableList"
      @backvalue="backValue"
    />
    <Bottom
      :nameList="nameList"
      :valueList="valueList"
    />
  </div>
</template>
<style lang="scss" scoped>
.big-screen-right-box {
  width: 23%;
  height: 95%;
  padding-top: 10px;
  position: absolute;
  right: 16px;
}
</style>