<template>
  <div class="app-container">
    <el-row>
      <el-col>
        <el-form :model="queryParams" ref="queryForm" :inline="true" >
          <el-form-item label="机构编码" prop="id" >
            <el-input v-model="queryParams.id" placeholder="请输入机构编码" clearable size="small" 
                      @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item label="机构名称" prop="name" >
            <el-input v-model="queryParams.id" placeholder="请输入机构名称" clearable size="small" 
                      @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item>
            <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">查询</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增
            </el-button>
            <!-- <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit">编辑
            </el-button>
            <el-button type="primary" icon="el-icon-delete" size="mini" @click="handleDel">删除
            </el-button> -->
          </el-form-item>
        </el-form>
        <vxe-grid ref="xTable" border resizable height="auto" :loading="loading"
                  :seq-config="{  startIndex: (tablePage.currentPage - 1) * tablePage.pageSize,  }"
                  :pager-config="tablePage" :columns="tableColumn" :data="tableData" @page-change="handlePageChange">
          <template v-slot:operate="{ row }">
            <el-button type="text" circle @click="handleView(row)">详情</el-button>
            <span>|</span>
            <el-button type="text" circle @click="handleUpdate(row)">修改</el-button>
            <span>|</span>
            <el-button type="text" circle @click="handleDelete(row)">删除</el-button>
          </template>
        </vxe-grid>
      </el-col>
    </el-row>

    <!--新增或编辑的弹框-->
    <el-dialog :title="title" :visible.sync="dialogOpen" width="40%">
      <OrgInput @cancel="cancel" :id="currentId" :parentId="id">
      </OrgInput>
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

  import { getAllOrgTreeData } from '@/api/system/org/org'
  import OrgInput from '@/views/system/org/org/input'
  import UserDetail from '@/views/system/org/positionUser/userDetail'
  import ModifyPassword from '@/views/system/org/user/password'
  import UserChooseRole from '@/views/system/org/user/role'

  export default {
    name: 'Org',
    components: { OrgInput },
    props: {
      parentId: {
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
          { field: 'parentId', title: '父机构编码' },
          { field: 'name', title: '机构名称' },
          { field: 'shortName', title: '机构简称' },
          { field: 'principal', title: '第一负责人' },
          { field: 'id', title: '机构编码' },
          { field: 'virtualed', title: '是否虚机构' },
          { field: 'organizationType', title: '机构组织类型' },
          { field: 'buzType', title: '机构业务类型' },
          { field: 'address', title: '机构所在地点' },
          { title: '操作', width: 240, align: 'center', slots: { default: 'operate' } }
        ],
        tableData: [],
        // 查询参数
        queryParams: {
          pageNumber: 1,
          pageSize: 15,
          ocuth: 'data_all',
          id: undefined,
          name: undefined,
          loginName: undefined,
          mobileNum: undefined
        }
      }
    },
    watch: {
      id(val) {
        this.queryParams.id = val
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
        getAllOrgTreeData().then((res) => {
          console.log(res)
          this.tableData = res
          console.log(this.tableData)
          //this.tablePage.total = res.total
          //console.log(this.tablePage.total)
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
          id: undefined,
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

