<template>
  <div class="app-container">
    <el-row>
      <el-col>
        <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="100px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="queryParams.name" placeholder="请输入角色名称" clearable size="small" style="width: 240px"
                      @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item>
            <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">添加到用户
            </el-button>
          </el-form-item>
        </el-form>
        <vxe-grid ref="xTable" border resizable height="auto" :loading="loading"
                  :checkbox-config="{checkField:'selected'}"
                  :seq-config="{  startIndex: (tablePage.currentPage - 1) * tablePage.pageSize,  }"
                  :pager-config="tablePage" :columns="tableColumn" :data="tableData" @page-change="handlePageChange">
          <template v-slot:operate="{ row }">
          </template>
        </vxe-grid>
      </el-col>
    </el-row>

  </div>
</template>

<script>

  import { getAllRolePageData, saveUserRole } from '@/api/system/org/userRole'

  export default {
    name: 'UserChooseRole',
    components: {},
    props: {
      id: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        loading: false,
        tablePage: {
          total: 0,
          currentPage: 1,
          pageSize: 15,
          align: 'left',
          pageSizes: [15, 30, 50, 100, 200, 500],
          layouts: ['Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump', 'Total'],
          perfect: true
        },
        tableColumn: [
          { type: 'checkbox', title: ' ', width: 50, align: 'center' },
          { field: 'id', title: '主键', visible: false },
          { field: 'name', title: '角色名称' },
          { field: 'roleType.name', title: '角色类型' }
        ],
        tableData: [],
        // 查询参数
        queryParams: {
          pageNumber: 1,
          pageSize: 15,
          userId: this.id,
          name: undefined
        }
      }
    },
    watch: {
      id(val) {
        this.queryParams.userId = val
        this.searchPage()
      }
    },
    created() {
      this.searchPage()
    },
    methods: {
      handlePageChange({ currentPage, pageSize }) {
        this.tablePage.currentPage = currentPage
        this.tablePage.pageSize = pageSize
        this.queryParams.pageSize = pageSize
        this.queryParams.pageNumber = currentPage
        this.searchPage()
      },
      /** 查询列表 */
      searchPage() {
        getAllRolePageData(this.queryParams).then((res) => {

          this.tableData = res.data
          this.tablePage.total = res.data.length
          /*this.tableData.forEach(item => {
            item.selected = item.selected === 'checked'
          })*/
        })
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNumber = 1
        this.searchPage()
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.queryParams = {
          pageNumber: 1,
          pageSize: 15,
          userId: this.id,
          name: undefined
        }
        this.searchPage()
      },
      handleAdd() {
        let selectedArray = this.$refs.xTable.getCheckboxRecords()
        if (selectedArray.length > 0) {
          let ids = []
          selectedArray.forEach(item => {
            ids.push(item.id)
          })
          saveUserRole({ roleIdList: ids.join(','), userId: this.id }).then((res) => {
            if (res.success) {
              this.msgSuccess('保存成功')
              this.searchPage()
            } else {
              this.msgError(res.msg)
            }
          })
        } else {
          this.msgError('请选择用户')
        }

      }

    }
  }
</script>

