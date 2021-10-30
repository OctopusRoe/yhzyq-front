<template>
  <el-dialog :title="title" :visible.sync="showHistory" append-to-body>
    <div>
      <el-steps  >
          <el-step  v-for="(itme, index) in nodeList" :key="index" :title="itme.name" :status="itme.order < order? 'success':itme.order===order?'process ':itme.order > order?'wait':'wait'" finish-status="finish">{{itme.name}}</el-step>
      </el-steps>

    </div>
    <div class="table-box">
      <el-table ref="daiBanList" :data="historyData" height="100%" row-key="id">
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="50"
        >
        </el-table-column>
        <el-table-column prop="finishTime" label="审核时间" width="200">
        </el-table-column>
        <el-table-column prop="operator" label="审核人">
        </el-table-column>
        <el-table-column prop="displayName" label="审核节点">
        </el-table-column>
        <el-table-column prop="result" label="审核结果">
        </el-table-column>
        <el-table-column prop="remark" label="备注">
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script>
  import { queryHistory } from '@/api/flow/daiBanTask'

  export default {
    name: 'historyFlow',
    created() {
    },
    data() {
      return {
        title: '流程记录',
        showHistory: false,
        historyData: [],
        nodeList: [],
        nextNode: '',
        order: ''
      }
    },
    methods: {
      showModal(orderId) {
        this.showHistory = true
        const data = {
          orderId: orderId
        }
        queryHistory(data).then(response => {
          this.historyData = response.data.historyTaskList
          this.nextNode = this.historyData[0].taskName
          this.nodeList = response.data.modelList
          this.nodeList.forEach(item => {
            if (item.name === this.nextNode) {
              this.order = item.order
            }
          })
        })
      }
    }

  }
</script>

<style scoped>

</style>
