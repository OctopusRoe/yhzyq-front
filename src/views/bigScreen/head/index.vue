<script>
/**
 * @description 顶部导航栏
 * @author OctopusRoe
 */

import { navList, setingList } from './navList'

export default {
  props: {
  },
  data () {
    return {
      navList,
      setingList,
      activeIndex: 0
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
    activeNav (index) {
      this.activeIndex = index
    }
  }

}
</script>
<template>
  <div class="big-screen-head-box">
    <div class="big-screen-head-one">
      <img src="../assets/images/logo.png" />
    </div>
    <div class="big-screen-head-two">
      <div
        v-for="(item, index) in navList"
        :key="index"
        class="big-screen-nav-item"
        :class="{'nav-active': index === activeIndex}"
        @click="activeNav(index)"
      >
        {{item.label}}
      </div>
    </div>
    <div></div>
    <div></div>
  </div>
</template>
<style lang="scss" scoped>
.big-screen-nav-item {
  width: 175px;
  height: 62px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav-active {
  background: url('~../assets/images/four.png') no-repeat center / contain;
  background-size: 175px 60px;
}

.big-screen-head-box {
  height: 89px;
  width: 1920px;
  display: flex;
  background: url('~../assets/images/three.png') no-repeat center / contain;
  background-size: 1920px 89px;

  .big-screen-head-one {
    width: 558px;
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
    width: 980px;
    height: 62px;
    padding: 0 40px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
    line-height: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
