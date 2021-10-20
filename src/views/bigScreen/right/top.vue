<script>
/**
 * @description 顶部容器
 * @author OctopusRoe
 */

import TitleBox from '../components/titleBox'

export default {
  components: {
    TitleBox
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
  <div class="big-screen-right-top-box">
    <TitleBox title="施工信息" />
  </div>
</template>
<style lang="scss" scoped>
.big-screen-right-top-box {
  width: 100%;
  height: 644px;
  background: url('~../assets/images/one.png') no-repeat center / contain;
  background-size: 100% 644px;
}
</style>
