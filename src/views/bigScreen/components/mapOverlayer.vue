<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: () => ({
        name: '1111111',
        number: '111111',
        add: '111111',
        time: '111111',
        error: '1111111'
      })
    }
  },
  data () {
    return {
      labelList: [
        {
          title: '路段名称',
          pops: 'name'
        },
        {
          title: `桩 号`,
          pops: 'number',
        },
        {
          title: '设备归属',
          pops: 'add'
        },
        {
          title: '摆放时间',
          pops: 'time'
        },
        {
          title: '违规情况',
          pops: 'error'
        }
      ]
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
  <div class="overlayer-box">
    <div class="title-box">
      <div class="title">
        1111111111
      </div>
      <div
        class="close"
        @click="$emit('close')"
      >
        <i class="el-icon-circle-close" />
      </div>
    </div>
    <div class="center-box">
      <div
        v-for="(item, index) in labelList"
        :key="index"
        class="item-box"
      >
        <div
          :class="{'line-box': index < 4}"
          class="content-box"
        >
          <div class="center-title">{{item.title}}</div>
          <div class="center-center">{{data[item.pops]}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang='scss' scoped>
.line-box {
  border-bottom: 1px solid #cbebec;
}

.content-box {
  width: 100%;
  height: 40px;
  display: flex;
}

.overlayer-box {
  width: 324px;
  height: 269px;
  background: url('~../assets/images/five.png') no-repeat center / contain;
  background-size: 324px 269px;
  position: relative;

  .title-box {
    width: 100%;
    height: 50px;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      padding: 10px 0 0 0;
      width: 150px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .close {
      padding: 22px 20px 0 0;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .center-box {
    width: 324px;
    height: 219px;
    padding: 5px 5px;

    .item-box {
      display: flex;
      align-items: center;
      padding: 0 13px;
      width: 100%;
      height: 40px;
    }

    .center-title {
      width: 120px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #ffffff;
    }

    .center-center {
      font-size: 16px;
      font-family: Microsoft YaHei;
      color: #ffffff;
      display: flex;
      align-items: center;
    }
  }
}
</style>
