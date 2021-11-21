<script>
/**
 * @description 表头
 * @author OctopusRoe
 */
export default {
  props: {
    labelArray: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<template>
  <div class="title-box">
    <div
      v-for="(item, index) in labelArray"
      :key="index"
      :style="{width: item.width}"
      class="label-box"
    >
      {{item.label}}
    </div>
  </div>
</template>
<style lang='scss' scoped>
.title-box {
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  background: url('~../assets/images/list-title.png') no-repeat center / contain;
  background-size: 100% 100%;
  font-size: 13px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #fffc2c;

  .label-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
