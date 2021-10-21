<script>
/**
 * @description 列表项
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
  <div class="table-item">
    <div class="table-item-box">
      <div class="item-column-one">
        {{item.highway}}
      </div>
      <div class="item-column-one">
        {{item.start}}
      </div>
      <div class="item-column-one">
        {{item.startTime}}
      </div>
      <div class="item-column-one">
        {{item.endTime || '-'}}
      </div>
    </div>
    <img src="../assets/images/list-line.png" />
  </div>
</template>
<style lang='scss' scoped>
.table-item {
  width: 418px;
  height: 50px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  .table-item-box {
    display: flex;
    width: 418px;
    height: 44px;
  }
  img {
    width: 416;
  }
}
</style>
