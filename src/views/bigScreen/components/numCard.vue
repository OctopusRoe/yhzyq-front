<script>
/**
 * @description 数字卡片容器
 * @author OctopusRoe
 */
export default {
  props: {
    background: {
      type: Object,
      default: () => { }
    },
    color: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    data: {
      type: [Number, String],
      default: ''
    }
  }
}
</script>
<template>
  <div
    class="num-card"
    :style="{background: `url(${background}) no-repeat center / contain`}"
  >
    <div
      :style="{color: color}"
      class="number-font-box"
    >
      {{data}}
    </div>
    <div class="font-box">
      {{label}}
    </div>
  </div>
</template>
<style lang='scss' scoped>
.num-card {
  width: 97px;
  height: 92px;
  margin: 5px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  align-items: center;

  .number-font-box {
    font-size: 38px;
    font-family: Impact;
    font-weight: 400;
    padding-bottom: 5px;
  }

  .font-box {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
    padding-bottom: 10px;
  }
}
</style>
