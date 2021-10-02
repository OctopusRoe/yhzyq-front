<template>
  <div class="app-container">
    <el-row>
      <el-col>
        <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="80px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="queryParams.name" placeholder="请输入姓名" clearable size="small" style="width: 160px"
                      @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="登录名" prop="loginName">
            <el-input v-model="queryParams.loginName" placeholder="请输入登录名" clearable size="small" style="width: 160px"
                      @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="手机号码" prop="mobileNum">
            <el-input v-model="queryParams.mobileNum" placeholder="请输入手机号码" clearable size="small" style="width: 160px"
                      @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item>
            <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增
            </el-button>
          </el-form-item>
        </el-form>
        <vxe-grid ref="xTable" border resizable height="auto" :loading="loading"
                  :seq-config="{  startIndex: (tablePage.currentPage - 1) * tablePage.pageSize,  }"
                  :pager-config="tablePage" :columns="tableColumn" :data="tableData" @page-change="handlePageChange">
          <template v-slot:operate="{ row }">
            <el-button type="success" icon="el-icon-view" circle @click="handleView(row)"/>
            <el-button type="success" icon="el-icon-edit" circle @click="handleUpdate(row)"/>
            <el-button type="danger" icon="el-icon-delete" circle @click="handleDelete(row)"/>
            <el-button type="danger" icon="el-icon-sunny" circle @click="handlePassword(row)"/>
            <el-button type="danger" icon="el-icon-question" circle @click="handleRole(row)"/>
          </template>
        </vxe-grid>
      </el-col>
    </el-row>

    <!--新增或编辑的弹框-->
    <el-dialog :title="title" :visible.sync="dialogOpen" width="40%">
      <OrgUserInput @cancel="cancel" :id="currentId" :orgId="orgId">
      </OrgUserInput>
    </el-dialog>

    <!--查看详情的弹框-->
    <el-dialog :title="title" :visible.sync="detailOpen" width="60%">
      <UserDetail @cancel="cancel" :id="currentId">
      </UserDetail>
    </el-dialog>

    <!--修改密码的弹框-->
    <el-dialog :title="title" :visible.sync="passwordOpen" width="40%">
      <ModifyPassword @cancel="cancel" :id="currentId">
      </ModifyPassword>
    </el-dialog>

    <!--选择角色的弹框-->
    <el-dialog :title="title" :visible.sync="roleOpen" width="60%">
      <UserChooseRole @cancel="cancel" :id="currentId">
      </UserChooseRole>
    </el-dialog>
  </div>
</template>

<script>

  import { delOrgUserById, getUserPageData } from '@/api/system/org/user'
  import OrgUserInput from '@/views/system/org/user/input'
  import UserDetail from '@/views/system/org/positionUser/userDetail'
  import ModifyPassword from '@/views/system/org/user/password'
  import UserChooseRole from '@/views/system/org/user/role'

  export default {
    name: 'OrgUser',
    components: { OrgUserInput, UserDetail, ModifyPassword,UserChooseRole },
    props: {
      orgId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        // 遮罩层
        loading: false,
        // 弹出层标题
        title: '新增',
        // 弹出层状态
        dialogOpen: false,
        detailOpen: false,
        passwordOpen: false,
        roleOpen: false,
        currentId: undefined,
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
          { type: 'seq', title: ' ', width: 50, align: 'center' },
          { field: 'id', title: '主键', visible: false },
          { field: 'name', title: '姓名' },
          { field: 'loginName', title: '登录名' },
          { field: 'mobileNum', title: '手机号码' },
          { field: 'regionId', title: '所在区域' },
          { title: '操作', width: 240, align: 'center', slots: { default: 'operate' } }
        ],
        tableData: [],
        // 查询参数
        queryParams: {
          pageNumber: 1,
          pageSize: 15,
          ocuth: 'data_all',
          org: this.orgId,
          name: undefined,
          loginName: undefined,
          mobileNum: undefined
        }
      }
    },
    watch: {
      orgId(val) {
        this.queryParams.org = val
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
        getUserPageData(this.queryParams).then((res) => {
          this.tableData = res.rows
          this.tablePage.total = res.total
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
          ocuth: 'data_all',
          org: this.orgId,
          name: undefined,
          loginName: undefined,
          mobileNum: undefined
        }
        this.searchPage()
      },
      handleDelete(row) {
        this.$confirm(
          '是否确认删除该条记录?',
          '警告',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          return delOrgUserById(row.id)
        }).then((res) => {
          if (res.success) {
            this.searchPage()
            this.msgSuccess('删除成功')
          } else {
            this.msgError(res.msg)
          }
        }).catch(function() {
          this.msgError('删除失败')
        })
      },
      handleView(row) {
        this.title = '详情'
        this.currentId = row.id
        this.detailOpen = true
      },
      handleUpdate(row) {
        this.title = '编辑'
        this.currentId = row.id
        this.dialogOpen = true
      },
      handleAdd() {
        this.title = '新增'
        this.currentId = undefined
        this.dialogOpen = true
      },
      handlePassword(row) {
        this.title = '修改密码'
        this.currentId = row.id
        this.passwordOpen = true
      },
      handleRole(row) {
        this.title = '选择角色'
        this.currentId = row.id
        this.roleOpen = true
      },
      cancel() {
        this.dialogOpen = false
        this.detailOpen = false
        this.passwordOpen = false
        this.searchPage()
      }
    }
  }
</script>

