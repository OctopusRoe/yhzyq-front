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
    <div class="echarts-box">
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
    width: 380px;
    height: 250px;
    padding: 5px 15px;
  }
}
</style>
