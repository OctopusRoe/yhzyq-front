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
  <div class="big-screen-right-buttom-box">
    <TitleBox title="月度施工情况" />
    <div
      class="echarts-box"
      :style="{height: 'calc((100vh * 95% * 30%) - 20px)', width: 'calc((100vw * 23%) - 30px)', maxHeight: '287px', maxWidth: '411px', mixHeight: '200px', minWidth: '300px'}"
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
