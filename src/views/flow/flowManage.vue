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
            <el-button type="primary" size="mini" style="margin-left: 10px" @click="queryFlow">查询
            </el-button>
            <!--            <el-button type="primary" size="mini" style="margin-left: 10px" @click="openFlow">启动-->
            <!--            </el-button>-->
            <!--            <el-button type="primary" size="mini" style="margin-left: 10px" @click="examine">审核-->
            <!--            </el-button>-->
            <!--            <el-button type="primary" size="mini" style="margin-left: 10px" @click="reject">驳回-->
            <!--            </el-button>-->
          </div>
          <div>
            <el-button type="primary" @click="addNew">新增</el-button>
            <el-button type="primary" @click="deleteFlows">删除</el-button>
            <el-button type="primary" @click="setUpFlow">导入</el-button>
          </div>
        </div>
        <div class="table-box">
          <el-table ref="flowList" :data="flowDate" height="100%" row-key="menuId" border>
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
            <el-table-column prop="id" label="流程id" width="190" v-if="showId">
            </el-table-column>
            <el-table-column prop="name" label="流程名称" width="190">
            </el-table-column>
            <el-table-column prop="type" label="分类" align="center">
            </el-table-column>
            <el-table-column prop="orgName" label="机构" align="center">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间"  align="center">
            </el-table-column>
            <!--            <el-table-column prop="creator" label="创建人" align="right">-->
            <!--            </el-table-column>-->
            <el-table-column prop="status" label="状态" align="center ">
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              width="200"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <a href="#" class="edit-btn" @click="updateRow(scope.row)">修改</a>
                <a href="#" class="edit-btn" @click="deleteRow(scope.row)">删除</a>
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
    <designationFlow ref="designationFlow"></designationFlow>
    <!--    <examineFlow ref="examineFlow"></examineFlow>-->
    <!--    <rejectFlow ref="rejectFlow"></rejectFlow>-->
  </div>
</template>

<script>
  import { listFlow, deleteFlow } from '@/api/flow/flowManage'
  import { queryFlowTypeTree } from '@/api/flow/flowType'
  import designationFlow from '../../components/flow/page/examine/designationFlow'
  import OrganizTree from '@/components/system/OrganizTree'

  export default {
    name: 'flowModel',
    components: { OrganizTree, designationFlow },
    data() {
      return {
        checkable: false,
        showId: false,
        orgIds: '',
        typeId: '',
        token: '',
        currentPage: 1,
        pageSize: 20,
        currentTotal: 0,
        value: '',
        input: '',
        dialogFormVisible: false,
        dialogFormVisible1: false,
        formLabelWidth: '140px',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        tabIndex: 1,
        flowDate: [],
        data: [],
        flowType: [],
        defaultProps: {
          children: 'children',
          label: 'label',
          id: ''
        },
        orderId: '',
        businessId: '',
        orgType: '',
        orgId: '',
        allType: '',
        isLeaf: false
      }
    },
    created() {
      this.queryTypeTree()
    },
    methods: {
      setUpFlow() {
        const flowList = this.$refs.flowList.selection
        let ids = ''
        for (let flow of flowList) {
          ids += flow.id + ','
        }
        if (!this.leaf) {
          this.$message({
            type: 'error',
            message: '请选择流程叶子节点!'
          })
        } else {
          if (!ids  || !this.orgIds) {
            this.$message({
              type: 'error',
              message: '请选择流程模板，机构!'
            })
          } else {
            this.$refs.designationFlow.showModal(this.orgIds, this.allType, this.orgType, ids)
          }
        }

      },
      // examine() {
      //   //实例默认业务id为123
      //   this.$refs.examineFlow.showModal(this.businessId)
      // },
      // reject(){
      //   //实例默认业务id为123
      //   this.$refs.rejectFlow.showModal (this.businessId)
      // },
      handlerOrgSelect(data) {
        this.isLeaf=data.isLeaf
        if (data.data.children) {
          this.leaf = false
        } else {
          this.leaf = true
        }
        console.log(this.leaf)
        let orgType = data.data.organizationType + data.data.buzType
        let parents = data.data.pathNode
        let type = ''
        for (let i = 0; i < parents.length; i++) {
          let parent = parents[i]
          let parentType = parent.organizationType + parent.buzType
          type = type + parentType + ','
        }
        this.allType = type + orgType
        this.orgIds = data.key
        this.orgType = orgType
        this.queryFlow()
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
      handleSizeChange(val) {
        this.pageSize = val
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        this.currentPage = val
        console.log(`当前页: ${val}`)
      },
      queryTypeTree() {
        queryFlowTypeTree().then(response => {
          this.flowType = response
        })
      },
      currentTypeChecked(nodeObj, SelectedObj) {
        if (SelectedObj.checkedKeys.length > 1) {
          this.$message({
            type: 'error',
            message: '只能单选!'
          })
          SelectedObj.checkedKeys = []
          this.typeId = ''
        } else {
          if (!SelectedObj.checkedKeys[0]) {
            this.typeId = ''
          } else {
            this.typeId = SelectedObj.checkedKeys[0]
          }
        }
        this.queryFlow()
      },
      queryFlow() {
        const data = {
          pageNumber: this.currentPage,
          pageSize: this.pageSize,
          displayName: this.input,
          orgIds: this.orgIds,
          type: this.typeId
        }
        listFlow(data).then(response => {
          this.flowDate = response.rows
          this.currentTotal = response.total
        })
      },
      addNew() {
        if(this.isLeaf){
          this.$message({
            type: 'error',
            message: '请选择叶子节点添加流程模板!'
          })
        }
        if (this.orgIds && this.typeId) {
          this.$router.push({
            name: 'flowDesign',
            params: { 'token': this.token, 'orgIds': this.orgIds, 'type': this.typeId, 'id': '' }
          })
        } else {
          this.$message({
            type: 'error',
            message: '请选则机构和类型!'
          })
        }

      },
      deleteFlows() {
        const flowList = this.$refs.flowList.selection
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            let ids = ''
            for (let flow of flowList) {
              ids += flow.id + ','
            }
            const data = {
              ids: ids
            }
            deleteFlow(data).then(response => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.queryFlow()
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      },
      updateRow(row) {
        this.$router.push({
          name: 'flowDesign',
          params: {
            'token': this.token,
            'orgIds': row.orgIds,
            'type': row.type,
            id: row.id,
            'originalContent': row.originalContent
          }
        })
      },
      deleteRow(row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            const data = {
              ids: row.id
            }
            deleteFlow(data).then(response => {
              this.msgSuccess("删除成功")
              this.queryFlow()
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      },
      viewRow() {
        this.dialogFormVisible1 = true
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
      width: 100%;
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
      height: 70%;
      flex:1
    }
  }

</style>
