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
  },
  data () {
    return {
      tableTitle,
      tableList: []
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
    this.workJobInfo()
  },
  methods: {
    async workJobInfo () {
      const { result } = await workJobInfo()
      this.tableList = result
    }
  }

}
</script>
<template>
  <div class="big-screen-right-top-box">
    <TitleBox title="施工信息" />

    <div class="table-box">
      <div class="table-title">
        <TableTitleTwo :label-array="tableTitle" />
      </div>
      <div class="table-content">
        <el-scrollbar style="height: 490px">
          <TableItemTwo
            v-for="(item, index) in tableList"
            :key="index"
            :item="item"
          />
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.big-screen-right-top-box {
  width: 100%;
  height: 644px;
  background: url('~../assets/images/one.png') no-repeat center / contain;
  background-size: 100% 644px;

  .table-box {
    width: 100%;
    height: 594px;
    padding: 15px 10px 10px 15px;
    background: url('~../assets/images/bg-one.png') no-repeat center / contain;
    background-size: 418px 564px;

    .table-title {
      width: 418px;
      height: 56px;
    }

    .table-content {
      margin-top: 8px;
      width: 418px;
      height: 550px;
    }
  }
}
</style>
