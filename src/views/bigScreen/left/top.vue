<script>
/**
 * @description 顶部容器
 * @author OctopusRoe
 */

import TitleBox from '../components/titleBox'
import NumCard from '../components/numCard'
import TableTitle from '../components/tableTitle'
import TableItemOne from '../components/tableItemOne'

import { numCardList, tableTitle } from './config'

import {
  querySelectDeviceByTypeCount,
  queryCenterCount
} from '../api/index'

export default {
  components: {
    TitleBox,
    NumCard,
    TableTitle,
    TableItemOne
  },
  props: {
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      numCardList,
      tableTitle,
      numCardData: {},
      centerList: []
    }
  },
  computed: {
    itemHeight () {
      return this.height * 0.6
    }
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
    this.querySelectDeviceByTypeCount()
    this.queryCenterCount()
  },
  methods: {
    // 获取设备总量列表
    async querySelectDeviceByTypeCount () {
      const { result } = await querySelectDeviceByTypeCount()
      this.numCardData = result
    },
    // 获取管理中心列表数据
    async queryCenterCount () {
      const { result } = await queryCenterCount()
      this.centerList = result
    }
  }

}
</script>
<template>
  <div
    class="big-screen-left-top-box"
    :style="{height: `${itemHeight}px`}"
  >
    <TitleBox title="设备总量" />

    <div class="num-card-box">
      <NumCard
        v-for="(item, index) in numCardList"
        :key="index"
        :background="item.src"
        :data="numCardData[item.key]"
        :label="item.label"
        :color="item.color"
      />
    </div>

    <div
      class="table-box"
      :style="{height: `${itemHeight - 50 - 92}px`}"
    >
      <div class="table-title">
        <TableTitle
          v-for="(item, index) in tableTitle"
          :key="index"
          :label="item.label"
          :width="item.width"
          :icon="item.icon"
        />
      </div>
      <div
        class="table-content"
        :style="{height: `${itemHeight - 50 - 92 - 33 - 20 - 25}px`}"
      >
        <el-scrollbar style="height:100%">
          <TableItemOne
            v-for="(item, index) in centerList"
            :key="index"
            :item="item"
          />
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.big-screen-left-top-box {
  width: 100%;
  background: url('~../assets/images/one.png') no-repeat center / contain;
  background-size: 100% 100%;

  .num-card-box {
    width: 100%;
    height: 92px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .table-box {
    width: 100%;
    padding: 15px 10px 10px 15px;

    .table-title {
      display: flex;
    }

    .table-content {
      margin-top: 20px;
      width: 100%;
      background-color: rgba(227, 227, 227, 0.08);
    }
  }
}

:v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}

:v-deep body::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/*滚动条的滑块*/
:v-deep body ::-webkit-scrollbar-thumb {
  background-color: #409eff;
  border-radius: 3px;
}
</style>
