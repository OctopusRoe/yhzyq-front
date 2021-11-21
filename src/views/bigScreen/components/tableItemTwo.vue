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
    <!-- :class="{['background-url']: item.endTime === '' || item.endTime === null }" -->
    <div class="table-item-box">
      <div
        class="item-column center-box"
        style="width: 80px"
      >
        {{item.roadName.split('-')[2]}}
      </div>
      <div
        class="item-column center-box"
        style="width: 130px"
      >
        {{`${~~item.landmarkStartId} - ${~~item.landmarkEndId}`}}
      </div>
      <div
        class="item-column center-box"
        style="width: 100px"
      >
        <div class="date-box">
          <div>{{item.startTime.split(' ')[0]}}</div>
          <div>{{item.startTime.split(' ')[1]}}</div>
        </div>
      </div>
      <div
        class="item-column center-box"
        style="width: 100px"
      >
        <div
          v-if="item.endTime"
          class="date-box"
        >
          <div>{{item.endTime.split(' ')[0]}}</div>
          <div>{{item.endTime.split(' ')[1]}}</div>
        </div>
        <div v-else>{{ '-' }}</div>
      </div>
    </div>
    <img src="../assets/images/list-line.png" />
  </div>
</template>
<style lang='scss' scoped>
.center-box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.date-box {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

.table-item {
  width: 418px;
  height: 50px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  color: #ffffff;

  &:hover {
    cursor: pointer;
  }

  .table-item-box {
    display: flex;
    width: 418px;
    height: 44px;
  }
  img {
    width: 416;
  }

  .background-url {
    background: url('~../assets/images/list-item.png') no-repeat center /
      contain;
    background-size: 100% 44px;
    margin-bottom: 3px;
    color: #0a243c;
  }
}
</style>
