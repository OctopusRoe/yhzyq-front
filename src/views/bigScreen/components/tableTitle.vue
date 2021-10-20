<script>
/**
 * @description 表格的头部
 * @author OctopusRoe
 */
export default {
  props: {
    icon: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    }
  },
}
</script>
<template>
  <div
    class="title-base-style"
    :style="{width: width}"
  >
    <img :src="icon" />
    {{label}}
  </div>
</template>
<style lang='scss' scoped>
.title-base-style {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 33px;
  background: #ffffff;
  border-radius: 7px;
  border: 2px solid #ffffff;
  box-shadow: 0px 0px 4px 1px rgba(255, 255, 255, 0.4),
    0px 0px 18px 0px rgba(158, 158, 158, 0.75);
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #0a243c;

  img {
    margin-right: 2px;
    width: 21px;
    height: 21px;
  }
}
</style>
