<template>
  <el-dialog
    title="用户组已关联用户"
    :visible.sync="dialogVisible"
    width="50%"
    height="100%"
    class="dialog-common"
    :before-close="handleClose"
    :modal-append-to-body="false"
    :id="groupId"
  >
    <div>
      <el-row>
        <el-col :span="16">
          <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item>
              <el-input
                v-model="form.keyValue"
                placeholder="真实姓名"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="handleSearch"
                icon="el-icon-search"
              >查询
              </el-button
              >
              <el-button @click="reset" icon="el-icon-refresh-right"
              >重置
              </el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <div align="right">
            <el-button type="primary" @click="handleAdd" icon="el-icon-plus"
            >关联新用户
            </el-button
            >
            <el-button type="danger" @click="handleDelete" icon="el-icon-minus"
            >解除关联
            </el-button
            >
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-if="count !== 0">
      <el-tag style="width: 100%;height:40px;"
      >
        <div style="margin-top: 6px;font-size: 13px;">
          <i class="el-icon-warning"></i>已选择<span>{{ count }}项</span>
        </div>
      </el-tag
      >
    </div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-top: 5px;"
      height="536px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column type="index" width="50" align="center">
        <el-table-column
          prop="id"
          label="ID"
          width="100"
          align="center"
          v-if="isShowId"
        >
        </el-table-column>
        <el-table-column
          prop="loginName"
          label="登录账号"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="真实姓名"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="userState" label="状态" width="70" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.State === USERSTATE_NORMAL ? 'success' : 'danger'"
              disable-transitions
            >{{ scope.row.State === USERSTATE_NORMAL ? '启用' : '禁用' }}
            </el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="mobileNum" label="手机号码" width="150" align="center">
        </el-table-column>
        <el-table-column
          prop="position"
          label="职位"
          min-width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          min-width="150"
          align="center"
        >
        </el-table-column>
      </el-table-column>
    </el-table>
    <div class="block" align="right">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="0"
      >
      </el-pagination>
    </div>
    <allUserForm ref="allUserForm"></allUserForm>
  </el-dialog>
</template>

<script>
  import allUserForm from './allUserFrom'
  import { queryUserByGroupId, deleteUserGroup } from '@/api/system/role/role'

  export default {
    data() {
      return {
        multipleSelection: [],
        isShowId: false,
        count: 0,
        title: '',
        page: 1,
        size: 10,
        groupId: '',
        dialogVisible: false,
        form: {
          keyValue: ''
        },
        req: {
          roleId: '',
          userIds: []
        },
        tableData: [
          {
            id: '',
            loginName: '',
            name: '',
            mobileNum: '',
            userState: '',
            position: '',
            remark: ''
          }
        ]
      }
    },
    components: {
      allUserForm
    },
    created() {
      // this.getUserByRoleId()
    },
    methods: {
      showModal(groupId) {
        this.dialogVisible = true
        this.groupId = groupId.id
        this.handleSearch()
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.size = val
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.page = val
      },
      handleSearch() {
        queryUserByGroupId({
          id: this.groupId,
          keyValue: this.form.keyValue,
          pageNo: this.page,
          pageSize: this.size
        }).then(response => {
          this.tableData = response.rows
          this.total = response.total
        })
      },
      reset() {
        this.form.keyValue = ''
      },
      handleAdd() {
        this.$refs.allUserForm.showModal(this.groupId)
      },
      handleDelete() {
        // this.$set(this.req,'groupId',this.groupId);
        // this.$set(this.req,'userIds',this.multipleSelection.join(","));
        let ids = this.multipleSelection.map(res => res.id).join(',')
        if (this.multipleSelection.length === 0) {
          this.$message({
            message: '请勾选要添加的用户',
            type: 'warning'
          })
          return false
        }
        deleteUserGroup({ groupId: this.groupId, userIds: ids }).then(response => {
          if (response.success) {
            this.$notify({
              title: '提示',
              message: '解除关联成功',
              type: 'success'
            })
            this.handleSearch()
          } else {
            this.$notify({
              title: '提示',
              message: '解除关联失败',
              type: 'danger'
            })
          }
        })
      },
      handleClose(done) {
        done()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
        this.count = val.length
      },
      getUserByRoleId() {
        queryUserByGroupId({
          id: this.groupId,
          keyValue: this.form.keyValue,
          pageNo: this.page,
          pageSize: this.size
        }).then(response => {
          this.tableData = response.rows
        })
      }
    }
    // filters: {
    //   stateFilter(data) {
    //     if (data === 1) {
    //       return `<el-tag>启用</el-tag>`;
    //     } else {
    //       return `<el-tag type="danger">禁用</el-tag>`;
    //     }
    //   }
    // }
  }
</script>

<style></style>
