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
      {{item.name}}
    </div>
    <div class="item-column-two center-box">
      {{item.zhuitong}}
    </div>
    <div class="item-column-two center-box">
      {{item.shexiangji}}
    </div>
    <div class="item-column-two center-box">
      {{item.biaoshipai}}
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
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;

  .item-column-one {
    width: 31%;
    color: #cbebec;
    margin: 0 5px;
  }

  .item-column-two {
    width: 23%;
    font-size: 24px;
    font-family: Impact;
    font-weight: 400;
    color: #ffffff;
    margin: 0 5px;
  }
}
</style>
