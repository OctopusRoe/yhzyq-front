<script>
/**
 * @description 图标示例
 * @author OctopusRoe
 */
export default {
  data () {
    return {
      example: [
        {
          label: '智能锥桶',
          icon: require('../assets/images/1.png')
        },
        {
          label: '摄像机',
          icon: require('../assets/images/2.png')
        },
        {
          label: '雷达',
          icon: require('../assets/images/3.png')
        },
        {
          label: '智能标识牌',
          icon: require('../assets/images/4.png')
        },
      ]
    }
  }
}
</script>
<template>
  <div class="example-box">
    <div class="example-title">
      图例
    </div>
    <div class="example-list">
      <div
        class="example-item"
        v-for="(item, index) in example"
        :key="index"
      >
        <img :src="item.icon" />
        <div>{{item.label}}</div>
      </div>
    </div>

  </div>
</template>
<style lang='scss' scoped>
.example-box {
  width: 133px;
  height: 206px;
  border: 2px solid #0376ad;
  background-color: #0a243c;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  .example-title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 133px;
    height: 40px;
    background-color: #0376ad;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ddffff;
  }
}

.example-list {
  width: 100px;
  height: 166px;
  padding: 5px 0;
  color: #ffffff;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;

  .example-item {
    width: 110px;
    display: flex;
    align-items: center;
  }

  img {
    width: 25px;
    height: 31px;
  }

  div {
    margin-left: 5px;
  }
}
</style>
