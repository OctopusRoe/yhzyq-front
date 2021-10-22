<script>
/**
 * @description 左侧列表项
 * @author OctopusRoe
 */
export default {
  props: {
    item: {
      type: Object,
      default: () => { }
    }
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
  <div class="table-item-box">
    <div class="item-column-one center-box">
      {{item.colOne}}
    </div>
    <div class="item-column-two center-box">
      {{item.colTwo}}
    </div>
    <div class="item-column-two center-box">
      {{item.colThree}}
    </div>
    <div class="item-column-two center-box">
      {{item.colFour}}
    </div>
  </div>
</template>
<style lang='scss' scoped>
.center-box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-item-box {
  width: 420px;
  height: 45px;
  display: flex;
  align-items: center;

  .item-column-one {
    width: 137px;
    color: #cbebec;
    margin: 0 5px;
  }

  .item-column-two {
    width: 82px;
    font-size: 24px;
    font-family: Impact;
    font-weight: 400;
    color: #ffffff;
    margin: 0 5px;
  }
}
</style>
