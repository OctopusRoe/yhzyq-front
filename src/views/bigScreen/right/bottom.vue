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
    }
  },
  data () {
    return {
      width: 0,
      height: 0
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
    const width = document.getElementById('app').offsetWidth
    const height = document.getElementById('app').offsetHeight
    this.height = height * 0.95 * 0.3 - 20
    this.width = width * 0.23 - 30
  },
  mounted () {
  },
  methods: {
  }

}
</script>
<template>
  <div class="big-screen-right-buttom-box">
    <TitleBox title="月度施工情况" />
    <div
      class="echarts-box"
      :style="{height: `${this.height}px`, width: `${this.width}px`}"
    >
      <LineComponent
        :nameList="nameList"
        :valueList="valueList"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.big-screen-right-buttom-box {
  width: 100%;
  height: 30%;
  background: url('~../assets/images/two.png') no-repeat center / contain;
  background-size: 100% 100%;
  margin-top: 18px;

  .echarts-box {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 15px;
  }
}
</style>
