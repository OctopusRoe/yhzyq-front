<template>
  <div class="layout">
    <organizTree
      ref="organizTree"
      :checkable="checkable"
      :showLine="true"
      @select="handlerOrgSelect"
      @check="handlerOrgCheck"
      typeAndLevel="00,102,110,12,13,210,23,03"
      @loaded="onOrgTreeLoaded"
      :onlySelectLeaf="true"
      parentCode="0"
      @get-before-load-data="getBeforeLoadOrgData"
      :filter-node-method="filterOrgNode"
    ></organizTree>
    <div class="layout-l">
      <div class="tree-title">流程分类</div>
      <div class="tree-box">
        <el-tree
          :data="flowType"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultProps"
          :check-strictly="true"
          @check="currentTypeChecked"
        >
        </el-tree>
      </div>
    </div>
    <div class="layout-r">
      <div style="border-bottom: 1px solid #e9e9eb">
        <div class="select-box">
          <div>
            <span>名称</span>
            <el-input v-model="input" placeholder="请输入内容"></el-input>
            <el-button type="primary" size="mini" style="margin-left: 10px" @click="queryDaiBan">查询
            </el-button>
          </div>
        </div>
        <div class="table-box">
          <el-table ref="daiBanList" :data="daiBanDate" height="100%" row-key="menuId">
            <el-table-column
              type="selection"
              align="center"
              width="46"
            ></el-table-column>
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="50"
            >
            </el-table-column>
            <el-table-column prop="orderId" label="流程id" width="190" v-if="showId">
            </el-table-column>
            <el-table-column prop="id" label="任务id" width="190" v-if="showId">
            </el-table-column>
            <el-table-column prop="operator" label="操作人原id" width="190" v-if="showId">
            </el-table-column>
            <el-table-column prop="orderId" label="流程id" width="190" v-if="showId">
            </el-table-column>
            <el-table-column prop="processName" label="流程名称" width="190">
            </el-table-column>
            <el-table-column prop="taskName" label="当前节点" align="center">
            </el-table-column>
            <el-table-column prop="operatorName" label="审核人" align="center">
            </el-table-column>
            <el-table-column prop="orderCreateTime" label="创建时间" width="200">
            </el-table-column>
            <el-table-column prop="creatorName" label="申请人" align="right">
            </el-table-column>
            <el-table-column prop="result" label="状态" align="right">
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              width="200"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <a href="#" class="edit-btn" @click="examine(scope.row)">审核</a>
                <a href="#" class="edit-btn" @click="viewRow(scope.row)">查看历史</a>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="detail-pages-wrap" style="text-align: right">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[20, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="currentTotal">
          </el-pagination>
        </div>
      </div>
    </div>
    <history-flow ref="historyFlow"></history-flow>
  </div>
</template>

<script>
  import { queryDaiBanTask, queryHistory } from '@/api/flow/daiBanTask'
  import { queryFlowTypeTree } from '@/api/flow/flowType'
  import OrganizTree from '@/components/system/OrganizTree'
  import historyFlow from '@/components/flow/page/examine/historyFlow'

  export default {
    name: 'daiBanModel',
    components: { historyFlow, OrganizTree },
    data() {
      return {
        checkable: false,
        data: [],
        showId: false,
        orgIds: '',
        typeId: '',
        currentPage: 1,
        pageSize: 20,
        currentTotal: 0,
        input: '',
        daiBanDate: [],
        flowType: [],
        defaultProps: {
          children: 'children',
          label: 'label',
          id: ''
        }
      }
    },
    created() {
      this.queryTypeTree()
      this.queryDaiBan()
    },
    methods: {
      examine() {

      },
      viewRow(row) {
        this.$refs.historyFlow.showModal(row.orderId)
      },
      queryDaiBan() {
        const data = {
          pageNo: this.currentPage,
          pageSize: this.pageSize,
          displayName: this.input,
          orgIds: this.orgIds,
          type: this.typeId
        }
        console.log(data)
        queryDaiBanTask(data).then(response => {
          this.daiBanDate = response.data.result
          this.currentTotal = response.data.totalCount
        })
      },
      handleSizeChange(val) {
        this.pageSize = val
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        this.currentPage = val
        console.log(`当前页: ${val}`)
      },
      handlerOrgSelect(data) {
        this.orgIds = data.key
      },
      handlerOrgCheck(data, node) {
        console.log(data, node)
      },
      // 发树形被加载完
      onOrgTreeLoaded(treeData, checkednode) {
      },
      getBeforeLoadOrgData(treeData) {
      },
      filterOrgNode(value, data) {
        if (!value) {
          return true
        }
        return data.label.indexOf(value) !== -1
      },
      queryTypeTree() {
        queryFlowTypeTree().then(response => {
          this.flowType = response
        })
      },
      currentChecked(nodeObj, SelectedObj) {
        if (SelectedObj.checkedKeys.length > 1) {
          this.$message({
            type: 'error',
            message: '只能单选!'
          })
          SelectedObj.checkedKeys = []
          this.orgIds = ''
        } else {
          if (!SelectedObj.checkedKeys[0]) {
            this.orgIds = ''
          } else {
            this.orgIds = SelectedObj.checkedKeys[0]
          }
        }
      },
      currentTypeChecked(nodeObj, SelectedObj) {
        if (SelectedObj.checkedKeys.length > 1) {
          this.$message({
            type: 'error',
            message: '只能单选!'
          })
          SelectedObj.checkedKeys = []
          this.typeId = '0'
        } else {
          if (!SelectedObj.checkedKeys[0]) {
            this.typeId = '0'
          } else {
            this.typeId = SelectedObj.checkedKeys[0]
          }
        }

      }
    }
  }
</script>

<style lang="less" scoped>
  .layout {
    display: flex;
    height: 100%;

    .tree-title {
      line-height: 40px;
      padding-left: 15px;
      border-bottom: 1px solid #ececec;
      font-size: 14px;
    }

    .layout-l {
      width: 260px;
      border-right: 1px solid #eaeaec;
      height: 100%;
    }

    .layout-r {
      flex-grow: 1;
      padding: 10px;

      .tabs-box {
        display: flex;
        border-bottom: 1px solid #e9eaec;

        > div {
          margin-right: 48px;
          line-height: 36px;
          font-size: 14px;
          cursor: pointer;
        }

        > div.active {
          color: #308ae7;
          border-bottom: 1px solid #308ae7;
        }
      }
    }

    .tree-box {
      padding-left: 16px;
      padding-top: 16px;
    }

    .select-box {
      padding: 15px 0;
      display: flex;
      justify-content: space-between;

      > div {
        display: flex;
        align-items: center;

        > span {
          margin-right: 5px;
          color: #333;
          white-space: nowrap;
          font-size: 14px;
        }
      }
    }

    .money-box {
      display: flex;
      background-color: #ebf3fe;
      border: 1px solid #c7dfff;
      padding: 10px;
      border-radius: 3px;

      i {
        width: 15px;
        height: 15px;
        line-height: 15px;
        font-style: normal;
        background-color: #308ae7;
        text-align: center;
        color: #fff;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 5px;
      }

      span {
        color: #308ae7;
        margin: 0 2px;
      }

      > div {
        display: flex;
        margin-right: 45px;
        align-items: center;
      }
    }

    .table-box {
      margin-top: 10px;
    }
  }
</style>
