<script>
/**
 * @description 底部容器
 * @author OctopusRoe
 */

import TitleBox from '../components/titleBox'
import Bar from './Bar.vue'

import { workJobCount } from '../api/index'

export default {
  components: {
    TitleBox,
    Bar
  },
  props: {
  },
  data () {
    return {
      nameList: [],
      valueList: [],
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
    this.height = (height - 92) * 0.95 * 0.3 - 50 - 10
    this.width = width * 0.23 - 30
  },
  mounted () {
    this.workJobCount()
  },
  methods: {
    async workJobCount () {
      const { result } = await workJobCount()
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
  <div class="big-screen-left-buttom-box">
    <TitleBox title="管理中心施工情况" />
    <div
      class="echarts-box"
      :style="{height: `${this.height}px`, width: `${this.width}px`}"
    >
      <Bar
        :nameList="nameList"
        :valueList="valueList"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.big-screen-left-buttom-box {
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
