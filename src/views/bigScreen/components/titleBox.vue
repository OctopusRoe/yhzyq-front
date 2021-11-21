<script>
/**
 * @description title 容器
 * @author OctopusRoe
 */
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<template>
  <div class="title-box">
    <div>
      {{title}}
    </div>
    <img src="../assets/images/line.png">
  </div>
</template>
<style lang='scss' scoped>
.title-box {
  width: 100%;
  height: 50px;
  font-size: 25px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ddffff;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;

  div {
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    padding: 0 20px;
  }

  img {
    width: 100%;
  }
}
</style>
