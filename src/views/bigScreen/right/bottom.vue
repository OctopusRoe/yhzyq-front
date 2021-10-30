<script>
/**
 * @description 底部容器
 * @author OctopusRoe
 */

import TitleBox from '../components/titleBox'
import LineComponent from './Line.vue'

import { monthWorkJobCount } from '../api/index'

export default {
  components: {
    TitleBox,
    LineComponent
  },
  props: {
  },
  data () {
    return {
      nameList: [],
      valueList: []
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
    async monthWorkJobCount () {
      const { result } = await monthWorkJobCount()
      result.forEach((item, index) => {
        if (index > 7) return
        this.$set(this.nameList, index, item.name)
        this.$set(this.valueList, index, ~~item.mileSum)
      })
    }
  }

}
</script>
<template>
  <div class="big-screen-right-buttom-box">
    <TitleBox title="月度施工情况" />
    <div class="echarts-box">
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
  height: 306px;
  background: url('~../assets/images/two.png') no-repeat center / contain;
  background-size: 100% 306px;
  margin-top: 18px;

  .echarts-box {
    width: 100%;
    height: 256px;
    padding: 5px 15px;
  }
}
</style>
