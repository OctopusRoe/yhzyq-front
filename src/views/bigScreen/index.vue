<script>
/**
 * @description 大屏的主页面
 * @author OctopusRoe
 * @version 0.0.1
*/

import Head from './components/head'
import Left from './components/left'
import Right from './components/right'

export default {
  components: {
    Head,
    Left,
    Right
  },
  data () {

  }
}
</script>

<style lang="scss" scoped>
.big-screen-box {
  height: 100%;
  width: 100%;
  background-color: red;
  position: relative;
}
</style>
<template>
  <div class="big-screen-box">

    <Head />
    <Left />
    <Right />
  </div>
</template>