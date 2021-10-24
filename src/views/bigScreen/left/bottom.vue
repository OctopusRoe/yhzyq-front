<script>
/**
 * @description 底部容器
 * @author OctopusRoe
 */

import TitleBox from '../components/titleBox'
import Bar from './Bar.vue'

export default {
  components: {
    TitleBox,
    Bar
  },
  props: {
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
  <div class="big-screen-left-buttom-box">
    <TitleBox title="管理中心施工情况" />
    <div class="echarts-box">
      <Bar />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.big-screen-left-buttom-box {
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
