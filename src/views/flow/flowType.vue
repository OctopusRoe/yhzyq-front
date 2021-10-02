<template>
  <div class="layout">
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
            <el-button type="primary" size="mini" style="margin-left: 10px" @click="queryType">查询
            </el-button>
          </div>
          <div>
            <el-button type="primary" @click="addNew">新增</el-button>
            <el-button type="primary" @click="deleteFlows">删除</el-button>
          </div>
        </div>
        <div class="table-box">
          <el-table ref="flowList" :data="flowTypeDate" height="100%" row-key="menuId">
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
            <el-table-column prop="id" label="流程类型id" width="190" v-if="showId">
            </el-table-column>
            <el-table-column prop="parentId" label="流程类型父级id" width="190" v-if="showId">
            </el-table-column>
            <el-table-column prop="flowType" label="流程类型" width="190">
            </el-table-column>
            <el-table-column prop="flowTypeName" label="流程类型名称" align="center">
            </el-table-column>
            <el-table-column prop="parentTypeName" label="流程类型父级名称" align="center">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="200">
            </el-table-column>
            <el-table-column prop="creator" label="创建人" align="right">
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
    </div>

    <el-dialog
      :title="title"
      :visible.sync="open"
      width="800px"
      append-to-body
      :close-on-click-modal="false"
      inline="true"
    >
      <div class="dialog-footers">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="流程类型名称" prop="flowTypeName">
                <el-input
                  v-model="form.flowTypeName"
                  placeholder="流程类型名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="流程类型标识" prop="flowType">
                <el-input
                  v-model="form.flowType"
                  controls-position="right"
                  :min="0"
                  :disabled="readonly"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer" align="center">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { queryFlowTypeTree, queryFlowType, saveOrUpdateFlowType, deleteFlowType } from '@/api/flow/flowType'
  import OrganizTree from '@/components/system/OrganizTree'

  export default {
    name: 'flowType',
    components: { OrganizTree },
    data() {
      return {
        readonly: false,
        checkable: false,
        showId: false,
        typeId: '',
        orgId: '',
        orgName: '',
        parentTypeName: '流程分类',
        parentId: '',
        id: '',
        type: '',
        token: '',
        currentPage: 1,
        pageSize: 20,
        currentTotal: 0,
        input: '',
        dialogFormVisible1: false,
        tabIndex: 1,
        flowTypeDate: [],
        flowType: [],
        defaultProps: {
          children: 'children',
          label: 'label',
          id: ''
        },
        title: '',
        open: false,
        form: {
          flowTypeName: '',
          flowType: '',
          typeDate: ''
        },
        // 表单校验
        rules: {
          flowTypeName: [
            { required: true, message: '流程类型名称不能为空', trigger: 'blur' }
          ],
          flowType: [
            { required: true, message: '流程类型标识不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this.queryTypeTree()
    },
    methods: {
      currentTypeChecked(nodeObj, SelectedObj) {
        if (SelectedObj.checkedKeys.length > 1) {
          this.$message({
            type: 'error',
            message: '只能单选!'
          })
          SelectedObj.checkedKeys = []
          this.typeId = ''
          return
        } else {
          if (!SelectedObj.checkedKeys[0]) {
            this.typeId = ''
            this.flowTypeDate = []
            this.currentTotal = 0
          } else {
            this.typeId = SelectedObj.checkedKeys[0]
            this.queryType()
          }
        }
        console.log(this.typeId)
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
      queryType() {
        const data = {
          pageNo: this.currentPage,
          pageSize: this.pageSize,
          flowTypeName: this.input,
          id: this.typeId,
          orgId: this.orgId
        }
        queryFlowType(data).then(response => {
          this.flowTypeDate = response.rows
          this.currentTotal = response.total
        })
      },
      selectFlowType() {

      },
      addNew() {
        if (!!this.typeId) {
          this.open = true
          this.readonly = false
          this.title = '新增流程类型'
        } else {
          this.msgError('请选择父级类型')
          return
        }

      },
      deleteFlows() {
        const flowList = this.$refs.flowList.selection
        let ids = ''
        for (let flow of flowList) {
          ids += flow.id + ','
        }
        const data = {
          ids: ids
        }
        deleteFlowType(data).then(response => {
          this.msgSuccess(response.data)
          this.queryType()
          this.queryTypeTree()
        })
      },
      updateRow(row) {
        this.open = true
        this.readonly = true
        this.title = '修改流程类型'
        this.form = {
          flowTypeName: row.flowTypeName,
          flowType: row.flowType
        }
        this.id = row.id
        this.parentId = row.parentId
      },
      deleteRow(row) {
        const data = {
          ids: row.id
        }
        deleteFlowType(data).then(response => {
          this.msgSuccess(response.data)
          this.typeId = ''
          this.queryType()
          this.queryTypeTree()
        })
      },
      viewRow() {
        this.dialogFormVisible1 = true
      },
      //保存
      submitForm: function() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            let parentId = this.parentId ? this.parentId : this.typeId
            let id = this.id
            const data = {
              parentId: parentId,
              flowType: this.form.flowType,
              flowTypeName: this.form.flowTypeName,
              id: id
            }
            saveOrUpdateFlowType(data).then(response => {
              this.msgSuccess(response.data)
              this.typeId = ''
              this.open = false
              this.queryType()
              this.queryTypeTree()
            })
          }
        })
      },
      // 取消按钮
      cancel() {
        this.open = false
        this.reset()
      },
      // 表单重置
      reset() {
        this.form = {
          flowTypeName: '',
          flowType: ''
        }
        this.resetForm('form')
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
