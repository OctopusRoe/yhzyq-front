<script>
/**
 * @description 顶部容器
 * @author OctopusRoe
 */

import TitleBox from '../components/titleBox'
import TableTitleTwo from '../components/tableTitleTwo'
import TableItemTwo from '../components/tableItemTwo'

import { tableTitle } from './config'
import { workJobInfo } from '../api/index'

import ex from './mock'

export default {
  components: {
    TitleBox,
    TableTitleTwo,
    TableItemTwo
  },
  props: {
    tableList: {
      type: Array,
      default: () => []
    },
    backValue: {
      type: Function,
      default: () => { }
    },
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
      tableTitle
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
  },
  methods: {
  }

}
</script>
<template>
  <div
    class="big-screen-right-top-box"
    :style="{height: `${itemHeight}px`}"
  >
    <TitleBox title="施工信息" />

    <div
      class="table-box"
      :style="{height: `${itemHeight - 50}px`}"
    >
      <div class="table-title">
        <TableTitleTwo :label-array="tableTitle" />
      </div>
      <div
        class="table-content"
        :style="{height: `${itemHeight - 50 - 56 - 8 - 22}px`}"
      >
        <el-scrollbar style="height: 100%">
          <div
            v-for="(item, index) in tableList"
            :key="index"
            @click="$emit('backvalue', item)"
          >
            <TableItemTwo :item="item" />
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.big-screen-right-top-box {
  width: 100%;
  background: url('~../assets/images/one.png') no-repeat center / contain;
  background-size: 100% 100%;

  .table-box {
    width: 100%;
    padding: 12px 9px 10px 9px;
    background: url('~../assets/images/bg-one.png') no-repeat center / contain;
    background-size: 95% 95%;

    .table-title {
      width: 100%;
      height: 56px;
    }

    .table-content {
      margin-top: 8px;
      width: 100%;
      // height: 84%;
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
