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
      activeIndex: 4
    }
  },
  methods: {
    activeNav (index) {
      this.activeIndex = index
    },

    activeSeting (item) {
      switch (item.key) {
        case 'seting':
          this.$router.push(item.path)
          break;
        case 'jump':
          break;
        case 'logout':
          this.$router.push(item.path)
          break;
      }
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
        :style="{left: item.offset}"
      >
        {{item.label}}
      </div>
    </div>
    <div class="big-screen-head-three">
      <div
        v-for="(item, index) in setingList"
        :key="index"
        @click="activeSeting(item)"
        class="big-screen-seting-item"
      >
        <img :src="item.icon">
        {{item.label}}
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.nav-active {
  background: url('~../assets/images/four.png') no-repeat center / contain;
  background-size: 210px 70px;
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
    width: 990px;
    height: 62px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
    line-height: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;

    .big-screen-nav-item {
      position: relative;
      width: 220px;
      height: 62px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .big-screen-head-three {
    display: flex;
    justify-content: space-around;
    width: 370px;
    height: 50px;

    .big-screen-seting-item {
      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #c5f3ff;

      img {
        margin-right: 10px;
        width: 22px;
        height: 22px;
      }
    }
  }
}
</style>
