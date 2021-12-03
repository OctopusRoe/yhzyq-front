<script>
/**
 * @description 底部容器
 * @author OctopusRoe
 */

import TitleBox from '../components/titleBox'
import LineComponent from './Line.vue'

export default {
  components: {
    TitleBox,
    LineComponent
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
      width: 0,
      height: 0
    }
  },
  computed: {
    itemHeight () {
      return this.height * 0.38
    },
    itemWidth () {
      return this.width
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
    class="big-screen-right-buttom-box"
    :style="{height: `${itemHeight}px`}"
  >
    <TitleBox title="月度施工情况" />
    <div class="echarts-box">
      <LineComponent
        :nameList="nameList"
        :valueList="valueList"
        :width="itemWidth - 30"
        :height="itemHeight - 50 - 10"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.big-screen-right-buttom-box {
  width: 100%;
  background: url('~../assets/images/two.png') no-repeat center / contain;
  background-size: 100% 100%;
  margin-top: 8px;

  .echarts-box {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 15px;
  }
}
</style>
