<template>
  <div>
    <el-card class="box-card" :style="{ height: siderHeigth }">
      <div>
        <el-row :gutter="1">
          <el-col :span="20">
            <el-form :inline="true" :model="form" class="demo-form-inline">
              <el-form-item label="系统名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleSearch" icon="el-icon-search">查询</el-button>
                <el-button @click="reset" icon="el-icon-refresh-right">重置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="4">
            <div align="right">
              <el-button type="primary" @click="handleAdd" icon="el-icon-plus">新增</el-button>
              <el-button type="danger" @click="handleBatchDelete" icon="el-icon-delete">批量删除</el-button>
            </div>
          </el-col>

          <el-col>
            <div>
              <el-tag style="width: 100%; height: 40px"
                ><div style="margin-top: 6px; font-size: 13px">
                  <i class="el-icon-warning"></i>&nbsp; 已选择<span>{{ selectRecords.length }}项</span>
                </div></el-tag
              >
            </div>
            <vxe-grid
              ref="xGrid"
              v-bind="gridOptions"
              @checkbox-change="checkboxChangeEvent"
              @checkbox-all="checkboxChangeEvent"
              @page-change="handlePageChange"
              style="margin-top: 5px"
              height="576px"
            >
              <template #operate="{ row }">
                <template>
                  <vxe-button type="text" status="primary" title="编辑" @click="editRowEvent(row)">修改</vxe-button>
                  <el-divider direction="vertical"></el-divider>
                  <vxe-button type="text" status="primary" title="删除" @click="handleDeleteClick(row)"
                    >删除</vxe-button
                  >
                </template>
              </template>
            </vxe-grid>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <systemOperation ref="systemOperation" @refresh="loadData"></systemOperation>
  </div>
</template>

<script>
import systemOperation from './module/systemOperation'
import { systemByPage, deleteSystemById } from '@/api/system/system'

export default {
  name: 'SystemSystemManagerIndex',
  data() {
    return {
      systemId: '',
      selectRecords: [],
      siderHeigth: 'calc(100% - 3px)',
      form: {
        name: ''
      },
      gridOptions: {
        border: true,
        resizable: true,
        keepSource: true,
        showOverflow: true,
        height: 530,
        loading: false,
        pagerConfig: {
          total: 0,
          currentPage: 1,
          pageSize: 10,
          pageSizes: [10, 20, 50, 100, 200, 500],
          layouts: ['Sizes', 'PrevPage', 'Number', 'NextPage', 'FullJump', 'Total'],
          perfect: true
        },
        editConfig: {
          trigger: 'manual',
          mode: 'row',
          showStatus: true,
          icon: 'fa fa-file-text-o'
        },
        columns: [
          { type: 'checkbox', width: 50, align: 'center' },
          { type: 'seq', title: '序号', width: 60, align: 'center' },
          {
            field: 'name',
            title: '系统名称',
            width: 120,
            align: 'center'
          },
          {
            field: 'urlPath',
            title: 'HTTP路径',
            width: 200,
            align: 'center'
          },
          {
            field: 'contextPath',
            title: '上下文路径',
            width: 200,
            align: 'center'
          },
          {
            field: 'description',
            title: '系统描述',
            minWidth: 200,
            align: 'center'
          },
          {
            field: 'createTime',
            title: '创建时间',
            width: 200,
            align: 'center'
          },
          {
            field: 'createUser',
            title: '创建人',
            width: 150,
            align: 'center'
          },
          {
            field: 'sortedNum',
            title: '排序',
            showOverflow: true,
            width: 100,
            align: 'center'
          },
          {
            title: '操作',
            width: 250,
            slots: { default: 'operate' },
            align: 'center'
          }
        ],
        data: []
      }
    }
  },
  components: {
    systemOperation
  },
  created() {
    this.loadData()
  },
  methods: {
    // 删除
    handleDeleteClick(data) {
      this.$confirm('是否要删除该系统?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteSystemById(data.id).then((res) => {
          if (res.success) {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.selectRecords = []
            this.loadData()
          }
        })
      })
    },
    // 修改
    editRowEvent(row) {
      this.$refs.systemOperation.edit(row)
    },
    loadData() {
      this.gridOptions.loading = true
      systemByPage({
        name: this.form.name,
        pageNo: this.gridOptions.pagerConfig.currentPage,
        pageSize: this.gridOptions.pagerConfig.pageSize
      }).then((res) => {
        this.gridOptions.pagerConfig.total = res.total
        this.gridOptions.data = res.rows
        this.gridOptions.loading = false
      })
    },
    handleSearch() {
      this.selectRecords = []
      this.loadData()
    },
    reset() {
      this.form.name = ''
      this.gridOptions.pagerConfig.currentPage = 1
      this.gridOptions.pagerConfig.pageSize = 10
      this.handleSearch()
    },
    // 新增
    handleAdd() {
      this.$refs.systemOperation.add()
    },
    // 批量删除
    handleBatchDelete() {
      if (this.selectRecords.length === 0) {
        this.$message({
          message: '请勾选要删除的系统',
          type: 'warning'
        })
        return false
      }
      let ids = this.selectRecords.map((res) => res.id).join(',')
      this.$confirm('是否要删除该系统?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteSystemById(ids).then((res) => {
          if (res.success) {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.selectRecords = []
            this.loadData()
          }
        })
      })
    },
    checkboxChangeEvent({ records }) {
      this.selectRecords = records
    },
    handlePageChange({ currentPage, pageSize }) {
      this.gridOptions.pagerConfig.currentPage = currentPage
      this.gridOptions.pagerConfig.pageSize = pageSize
      this.loadData()
    }
  }
}
</script>

<style scoped></style>
