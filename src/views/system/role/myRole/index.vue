<template>
  <div>
    <el-row :gutter="1" class="row-bg">
      <el-col :span="4"
        ><el-card class="box-card" :style="{ height: siderHeigth }">
          <el-select v-model="systemId" placeholder="请选择" style="width: 100%" @change="handleSelectSystem">
            <el-option v-for="item in systemOptions" :key="item.value" :label="item.name" :value="item.id"> </el-option>
          </el-select>
          <div style="margin-top: 10px">
            <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAddNode">新增</el-button>
            <el-button type="warning" size="small" icon="el-icon-edit" @click="handleEditNode" style="margin-left: 6px"
              >修改</el-button
            >
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              @click="handleDeleteNode"
              style="margin-left: 6px"
              >删除</el-button
            >
          </div>

          <el-tree
            :data="data"
            :props="defaultProps"
            @node-click="handleNodeClick"
            default-expand-all
            :highlight-current="true"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span style="font-size: small"> <i :class="data.icon"></i>{{ node.label }} </span>
            </span>
          </el-tree></el-card
        ></el-col
      >
      <el-col :span="20"
        ><div>
          <el-card class="box-card" :style="{ height: siderHeigth }">
            <div>
              <el-row>
                <el-col :span="20">
                  <el-form :inline="true" :model="form" class="demo-form-inline">
                    <el-form-item label="角色名称">
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
              </el-row>
            </div>
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
              @toolbar-button-click="toolbarButtonClickEvent"
              style="margin-top: 5px"
              height="578px"
            >
              <template #authorize="{ row }">
                <el-button type="text" icon="el-icon-document-copy" @click="handleAuthorize(row)"></el-button>
              </template>
              <template #nameEdit="{ row }">
                <el-input v-model="row.name" style="width: 100%"></el-input>
              </template>
              <template #SortEdit="{ row }">
                <el-input-number
                  controls-position="right"
                  v-model="row.sortedNum"
                  style="width: 100%"
                ></el-input-number>
              </template>
              <template #operate="{ row }">
                <template v-if="$refs.xGrid.isActiveByRow(row)">
                  <vxe-button type="text" status="primary" title="保存" @click="saveRowEvent(row)">保存</vxe-button>
                  <el-divider direction="vertical"></el-divider>
                  <el-button type="text" @click="handleCancel(row)">取消</el-button>
                </template>
                <template v-else>
                  <vxe-button type="text" status="primary" title="编辑" @click="editRowEvent(row)">编辑</vxe-button>
                  <el-divider direction="vertical" v-if="row.id === undefined"></el-divider>
                  <!-- <vxe-button
                    type="text"
                    status="primary"
                    title="保存"
                    v-if="row.id === undefined"
                    @click="saveRowEvent(row)"
                    >保存</vxe-button
                  > -->
                  <el-divider direction="vertical" v-if="row.id === undefined"></el-divider>
                  <el-button v-if="row.id === undefined" type="text" @click="handleCancel(row)">取消</el-button>
                  <el-divider direction="vertical" v-if="row.id !== undefined"></el-divider>
                  <span>
                    <vxe-button
                      type="text"
                      status="primary"
                      title="删除"
                      @click="handleDeleteClick(row)"
                      v-if="row.id !== undefined"
                      >删除</vxe-button
                    >
                    <el-divider direction="vertical" v-if="row.id !== undefined"></el-divider>
                    <el-dropdown v-if="row.id !== undefined">
                      <el-button type="text"> 关联<i class="el-icon-arrow-down el-icon--right"></i> </el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                          <vxe-button type="text" status="primary" title="用户" @click="handleUserClick(row)"
                            >用户</vxe-button
                          >
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <vxe-button type="text" status="primary" title="用户组" @click="handleUserGroupClick(row)"
                            >用户组</vxe-button
                          >
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <vxe-button type="text" status="primary" title="机构" @click="handleOrgClick(row)"
                            >机构</vxe-button
                          >
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </span>
                  <!-- <el-divider direction="vertical"></el-divider>
                  <vxe-button
                    type="text"
                    status="primary"
                    title="用户组"
                    @click="row;"
                    >用户组</vxe-button
                  > -->
                </template>
              </template>
            </vxe-grid>
          </el-card>
        </div></el-col
      >
    </el-row>
    <roleOperation ref="roleOperation"></roleOperation>
    <userForm ref="userForm"></userForm>
    <authorize ref="authorize"></authorize>
    <userGroupForm ref="userGroupForm"></userGroupForm>
    <orgForm ref="orgForm"></orgForm>
    <roleTypeOperation ref="roleTypeOperation" @ok="refreshRoleTypeTree"></roleTypeOperation>
  </div>
</template>

<script>
import roleOperation from './module/roleOperation'
import userForm from './module/userForm'
import userGroupForm from './module/userGroupFrom'
import orgForm from './module/orgForm'
import authorize from './module/authorize'
import roleTypeOperation from './module/roleTypeOperation'
import { findAllRoleType, deleteRoleTypeById, roleByPage, addRole, updateRole, deleteRole } from '@/api/system/role'
import { allSystem } from '@/api/system/system.js'

export default {
  name: 'SystemRoleMyRoleIndex',
  data() {
    return {
      systemId: '',
      systemOptions: [],
      selectRecords: [],
      gridOptions: {
        // toolbarConfig: {
        //   buttons: [
        //     {
        //       code: "insert_actived",
        //       name: "新增",
        //       status: "success",
        //       icon: "el-icon-plus"
        //     }
        //   ]
        // },
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
          layouts: [
            'Sizes',
            // "PrevJump",
            'PrevPage',
            'Number',
            'NextPage',
            // "NextJump",
            'FullJump',
            'Total'
          ],
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
            type: 'authorize',
            title: '授权资源',
            width: 120,
            slots: { default: 'authorize' },
            align: 'center'
          },
          {
            field: 'name',
            title: '角色名',
            minWidth: 200,
            editRender: { name: 'input' },
            align: 'center',
            slots: { edit: 'nameEdit' }
          },
          // {
          //   field: "roleTypeName",
          //   title: "角色类型",
          //   width: 200,
          //   editRender: { name: "select", options: [] },
          //   align: "center"
          // },
          {
            field: 'createTime',
            title: '创建时间',
            // showOverflow: true,
            minWidth: 200,
            align: 'center'
          },
          {
            field: 'createUser',
            title: '创建人',
            showOverflow: true,
            minWidth: 200,
            align: 'center'
          },
          {
            field: 'sortedNum',
            title: '排序号',
            width: 150,
            editRender: { name: 'input' },
            align: 'center',
            slots: { edit: 'SortEdit' }
          },
          {
            title: '操作',
            width: 250,
            slots: { default: 'operate' },
            align: 'center'
          }
        ],
        editRules: {
          name: [
            { required: true, message: '名字必须填' },
            { min: 2, max: 50, message: '名称长度在 2 到 50 个字符' }
          ],
          sortedNum: [
            { required: true, message: '排序必须填' },
            { type: 'number', min: 1, message: '必须大于0' }
          ]
          // roleName: [{ required: true, message: "邮件必须填写" }],
          // role: [{ required: true, message: "角色必须填写" }]
        },
        data: []
      },
      count: 0,
      siderHeigth: 'calc(100% - 3px)',
      siderWidth: window.innerWidth - 20 + 'px',
      form: {
        name: ''
      },
      data: [
        {
          label: '角色类型',
          value: '0',
          children: []
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      multipleSelection: [], // 选择多行集合
      roleTypeId: '',
      roleType: {}
    }
  },
  created() {
    this.findList()
    allSystem().then((res) => {
      this.systemOptions = res.data
      res.data.forEach((item) => {
        if (item.name === '当前系统') {
          this.systemId = item.id
        }
      })
      this.refreshRoleTypeTree()
    })
  },
  components: {
    roleOperation,
    userForm,
    userGroupForm,
    orgForm,
    authorize,
    roleTypeOperation
  },
  methods: {
    // 取消
    handleCancel(row) {
      this.$refs.xGrid.reloadData(this.$refs.xGrid.getData())
    },
    // 选中系统树
    handleSelectSystem() {
      this.refreshRoleTypeTree()
      console.log(this.systemId)
    },
    // 刷新类型树
    refreshRoleTypeTree() {
      findAllRoleType({ systemId: this.systemId }).then((res) => {
        // const column = this.$refs.xGrid.getColumnByField("RoleCategory");
        // column.editRender.options = [];
        // column.editRender.options.push({ value: "0", label: "全部" });
        this.data[0].children = []
        res.data.forEach((element) => {
          this.data[0].children.push({
            value: element.id,
            data: element,
            label: element.name
          })
          // column.editRender.options.push({
          //   value: element.id,
          //   data: element,
          //   label: element.name
          // });
        })
      })
    },
    // 选中类型树
    handleNodeClick(data) {
      this.roleType = data.data
      this.roleTypeId = data.value
      this.selectRecords = []
      this.findList()
    },
    onSubmit() {
      console.log(this.form)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.count = val.length
    },
    // 查询
    handleSearch() {
      this.count = 0
      this.selectRecords = []
      this.findList()
    },
    // 新增
    handleAdd() {
      if (this.roleTypeId === '') {
        this.$message({
          message: '请选择类型树',
          type: 'warning'
        })
        return false
      }
      if (this.roleTypeId === '0') {
        this.$message({
          message: '请选择类型树子节点',
          type: 'warning'
        })
        return false
      }
      let row
      let record = { name: '', sortedNum: 1 }
      this.$refs.xGrid.insertAt(record, row).then(({ row }) => {
        this.$refs.xGrid.setActiveCell(row, 'name')
      })
    },
    // 重置
    reset() {
      this.form.name = ''
      this.gridOptions.pagerConfig.currentPage = 1
      this.gridOptions.pagerConfig.pageSize = 10
      this.handleSearch()
    },
    // 打开授权抽屉
    handleAuthorize(data) {
      if (data.id == undefined || data.id == '') {
        this.$message({
          type: 'warning',
          message: '请先保存此数据'
        })
        return false
      }
      this.$refs.authorize.showModal(data)
    },
    // 查看用户
    handleUserClick(data) {
      this.$refs.userForm.showModal(data)
    },
    handleUserGroupClick(data) {
      this.$refs.userGroupForm.showModal(data)
    },
    handleOrgClick(data) {
      this.$refs.orgForm.showModal(data)
    },
    // 修改角色
    handleEditClick(row) {
      this.$refs.roleOperation.edit(row)
    },
    // 删除角色
    handleDeleteClick(row) {
      this.$confirm('是否要删除该角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole(row.id).then((res) => {
          if (res.success) {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.gridOptions.loading = true
            this.findList()
          } else {
            this.$message({
              message: res.msg,
              type: 'danger'
            })
          }
        })
      })
    },
    // 批量删除
    handleBatchDelete() {
      for (let item of this.selectRecords) {
        if (item.id === undefined) {
          this.$message({
            message: '存在未保存的角色',
            type: 'warning'
          })
          return false
        }
      }
      let ids = this.selectRecords.map((res) => res.id).join(',')
      if (this.selectRecords.length === 0) {
        this.$message({
          message: '请勾选要删除的角色',
          type: 'warning'
        })
        return false
      }
      this.$confirm('是否要删除多个角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole(ids).then((res) => {
          if (res.success) {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.gridOptions.loading = true
            this.findList()
          } else {
            this.$message({
              message: res.msg,
              type: 'danger'
            })
          }
        })
      })
    },
    findList() {
      this.gridOptions.loading = true
      roleByPage({
        roleTypeId: this.roleTypeId,
        name: this.form.name,
        pageNo: this.gridOptions.pagerConfig.currentPage,
        pageSize: this.gridOptions.pagerConfig.pageSize
      }).then((res) => {
        this.gridOptions.pagerConfig.total = res.total
        this.gridOptions.data = res.rows
        this.gridOptions.loading = false
        this.selectRecords = []
      })
    },
    searchEvent() {
      this.gridOptions.pagerConfig.currentPage = 1
      this.findList()
    },
    handlePageChange({ currentPage, pageSize }) {
      this.gridOptions.pagerConfig.currentPage = currentPage
      this.gridOptions.pagerConfig.pageSize = pageSize
      this.findList()
    },
    editRowEvent(row) {
      console.log(row)
      this.$refs.xGrid.setActiveRow(row)
    },
    // 添加角色
    saveRowEvent(data) {
      // this.$refs.xGrid
      console.log(data)
      this.$refs.xGrid.validate(data, async (res) => {
        if (res === undefined) {
          if (data.id === undefined) {
            await addRole({ ...data, roleTypeId: this.roleTypeId }).then((res) => {
              if (res.success) {
                this.$message({
                  message: res.msg,
                  type: 'success'
                })
                this.gridOptions.loading = true
              } else {
                this.$message({
                  message: res.msg,
                  type: 'danger'
                })
              }
            })
          } else {
            console.log(data)
            await updateRole({ ...data, name: data.name }).then((res) => {
              if (res.success) {
                this.$message({
                  message: res.msg,
                  type: 'success'
                })
                this.gridOptions.loading = true
              } else {
                this.$message({
                  message: res.msg,
                  type: 'danger'
                })
              }
            })
          }

          this.$refs.xGrid.clearActived().then(() => {
            this.gridOptions.loading = false
            this.findList()
          })
        }
      })
    },
    removeRowEvent(row) {
      this.$XModal.confirm('您确定要删除该数据?').then((type) => {
        if (type === 'confirm') {
          this.$refs.xGrid.remove(row)
        }
      })
    },
    checkboxChangeEvent({ records }) {
      // this.isAllChecked = this.$refs.xGrid.isAllCheckboxChecked()
      // this.isIndeterminate = this.$refs.xGrid.isCheckboxIndeterminate()
      console.log(records)
      this.selectRecords = records
    },
    changeAllEvent() {
      // this.$refs.xGrid.setAllCheckboxRow(this.isAllChecked)
      this.selectRecords = this.$refs.xGrid.getCheckboxRecords()
    },
    toolbarButtonClickEvent({ code }) {
      switch (code) {
        case 'delete':
          {
            console.log(111)
          }
          break
      }
    },
    delete() {
      console.log('asd')
    },
    // 添加类型
    handleAddNode() {
      this.$refs.roleTypeOperation.add(this.systemId)
    },
    // 修改类型
    handleEditNode() {
      if (this.roleTypeId === '') {
        this.$message({
          message: '请选择类型树',
          type: 'warning'
        })
        return false
      }
      if (this.roleTypeId === '0') {
        this.$message({
          message: '请选择类型树子节点',
          type: 'warning'
        })
        return false
      }
      this.$refs.roleTypeOperation.edit(this.roleType)
    },
    // 删除类型
    handleDeleteNode() {
      if (this.roleTypeId === '') {
        this.$message({
          message: '请选择类型树',
          type: 'warning'
        })
        return false
      }
      if (this.roleTypeId === '0') {
        this.$message({
          message: '请选择类型树子节点',
          type: 'warning'
        })
        return false
      }
      if (this.gridOptions.pagerConfig.total !== 0) {
        this.$message({
          message: '该节点还存在角色',
          type: 'warning'
        })
        return false
      }
      this.$confirm('确认要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteRoleTypeById(this.roleTypeId).then((res) => {
            if (res.success) {
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this.refreshRoleTypeTree()
            } else {
              this.$message.err({
                message: res.msg,
                type: 'error'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
/* .row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
} */

/* .container {
  display: flex;
  flex-direction: row;
} */
.test {
  font-size: small;
}

.tableBox {
  th {
    padding: 0 !important;
    height: 48px;
    line-height: 48px;
  }
  td {
    padding: 0 !important;
    font-size: 15px;
    height: 30px;
    line-height: 30px;
  }
}
</style>
