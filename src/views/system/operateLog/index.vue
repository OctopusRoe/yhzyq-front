<template>
  <div class="app-container">
    <div class="pd10">
      <el-form :model="queryParams" ref="queryForm" :inline="true">
        <el-form-item label="名称" prop="userName">
          <el-input
            v-model="queryParams.userName"
            placeholder="请输入名称"
            clearable
            size="small"
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="操作内容" prop="contents">
          <el-input
            v-model="queryParams.contents"
            placeholder="请输入操作内容"
            clearable
            size="small"
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="cyan"
            icon="el-icon-search"
            size="mini"
            @click="handleQuery"
          >搜索
          </el-button
          >
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置
          </el-button
          >
        </el-form-item>
      </el-form>

      <vxe-table border :data="tableData">
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column
          field="userName"
          title="操作用户名称"
        ></vxe-table-column>
        <vxe-table-column field="startTime" title="服务名"></vxe-table-column>
        <vxe-table-column
          field="contents"
          title="操作详细内容"
        ></vxe-table-column>
        <vxe-table-column field="opt" width="200" title="操作">
          <template slot-scope="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              :disabled="multiple"
              @click="handleDelete(scope.row)"
              circle
              v-hasPermi="['system:dict:remove']"
            ></el-button>
            <el-button
              icon="el-icon-view"
              type="info"
              @click="handleView(scope.row)"
              circle
            ></el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
      <vxe-pager
        :current-page="tablePage.currentPage"
        :page-size="tablePage.pageSize"
        :total="tablePage.total"
        :layouts="[
        'PrevPage',
        'JumpNumber',
        'NextPage',
        'FullJump',
        'Sizes',
        'Total',
      ]"
        @page-change="handlePageChange"
      >
      </vxe-pager>
    </div>


    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称" prop="userName">
              <el-input v-model="form.userName" placeholder="名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="操作时间" prop="startTime">
              <el-input v-model="form.startTime" placeholder="操作时间"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="详细内容" prop="contents">
              <el-input
                v-model="form.contents"
                placeholder="详细内容"
                maxlength="11"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { listLog, getById, del } from '@/api/system/operateLog'
  import ElPager from 'element-ui/packages/pagination/src/pager'

  export default {
    name: 'index',
    components: { ElPager },
    data() {
      return {
        // 查询参数
        queryParams: {
          pageNumber: 1,
          pageSize: 10,
          name: undefined,
          status: undefined
        },
        tablePage: {
          currentPage: 1,
          pageSize: 10,
          total: 0,
          align: 'center',
          pageSizes: [10, 20, 50, 100, 200, 500],
          perfect: true
        },
        // 显示搜索条件
        showSearch: true,
        //列表
        tableData: [],
        // 弹出层标题
        title: '',
        // 是否显示弹出层
        open: false,
        // 表单参数
        form: {},
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      /** 新增按钮操作 */
      handleAdd() {
        this.open = true
        this.title = '添加'
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1
        this.getList()
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm('queryForm')
      },
      getList() {
        this.loading = true
        listLog(this.addDateRange(this.queryParams)).then((response) => {
          this.tableData = response.rows
          this.total = response.total
          this.loading = false
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
          name: undefined,
          expr: undefined,
          serviceName: undefined,
          methodName: undefined
        }
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const id = row.jobName
        this.$confirm('是否确认删除角色编号为"' + id + '"的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(function() {
            return del(id)
          })
          .then(() => {
            this.getList()
            this.msgSuccess('删除成功')
          })
          .catch(function() {
          })
      },

      handleView(row) {
        this.reset()
        const id = row.id
        getById(id).then((response) => {
          this.form = response.data
          this.open = true
          this.title = '查看'
        })
      },

      handlePageChange({ currentPage, pageSize }) {
        this.tablePage.currentPage = currentPage
        this.tablePage.pageSize = pageSize
        this.queryParams.pageNumber = currentPage
        this.queryParams.pageSize = pageSize
        this.getList()
      }
    }
  }
</script>

