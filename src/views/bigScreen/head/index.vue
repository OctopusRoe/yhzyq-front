<script>
export default {
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
<style lang="scss" scoped>
.big-screen-head-box {
  height: 89px;
  width: 1920px;
  display: flex;
  background: url('~../assets/images/three.png') no-repeat center / contain;
  background-size: 1920px 89px;

  .big-screen-head-one {
    width: 603px;
    height: 92px;
    display: flex;
    align-items: center;

    img {
      margin-left: 21px;
      width: 502px;
      height: 46px;
    }
  }

  .big-screen-head-two {
    width: 1009px;
    height: 62px;
  }
}
</style>
<template>
  <div class="big-screen-head-box">
    <div class="big-screen-head-one">
      <img src="../assets/images/logo.png" />
    </div>
    <div class="big-screen-head-two">

    </div>
    <div></div>
    <div></div>
  </div>
</template>