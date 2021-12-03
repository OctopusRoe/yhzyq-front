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
      nameList: [],
      valueList: [],
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
  <div
    class="big-screen-left-buttom-box"
    :style="{height: `${itemHeight}px`}"
  >
    <TitleBox title="管理中心施工情况" />
    <div class="echarts-box">
      <Bar
        :nameList="nameList"
        :valueList="valueList"
        :width="itemWidth - 30"
        :height="itemHeight - 50 - 10"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.big-screen-left-buttom-box {
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
