<template>
  <div>
    <el-row :gutter="1">
      <!--左树:组织结构基础数据-->
      <el-col :span="4" :xs="24">
        <el-card class="box-card" :style="{ height: siderHeigth, overflow: 'auto' }">
          <div>
            <!-- <TreeEx
              :queryParams="treeSet.queryParams"
              :serviceMethods="treeSet.serviceMethods"
              :extraParams="treeSet.extraParams"
              :menuTitle="treeSet.menuTitle"
              @clickMethod="refreshTab"
              :editable="false"
            ></TreeEx> -->
            <orgTree @orgTreeClick="refreshTab"></orgTree>
          </div>
        </el-card>
      </el-col>
      <el-col :span="20" :xs="24">
        <el-card class="box-card" :style="{ height: siderHeigth }">
          <el-form :model="queryParams" ref="queryForm" :inline="true">
            <el-form-item label="岗位库" prop="posLib">
              <el-select v-model="queryParams.posLib" placeholder="岗位库" clearable>
                <el-option label="全部" value=""> </el-option>
                <el-option v-for="item in positionOptions" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="handleQuery">查询</el-button>
              <el-button icon="el-icon-refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
            <div style="float: right">
              <div>
                <el-button type="primary" @click="handleAdd">新增 </el-button>
              </div>
            </div>
          </el-form>
          <vxe-grid
            ref="xTable"
            border
            resizable
            height="578"
            :loading="loading"
            :seq-config="{
              startIndex: (tablePage.currentPage - 1) * tablePage.pageSize
            }"
            :edit-rules="editRules"
            :pager-config="tablePage"
            :columns="tableColumn"
            :data="tableData"
            @page-change="handlePageChange"
            :edit-config="editConfig"
            :show-overflow="true"
          >
            <template #descrptionEdit="{ row }">
              <el-input v-model="row.descrption" style="width: 100%"></el-input>
            </template>
            <template v-slot:operate="{ row }">
              <!-- <el-button type="text" circle @click="handleView(row)">详情</el-button>
            <span>|</span> -->
              <template v-if="$refs.xTable.isActiveByRow(row)">
                <vxe-button type="text" status="primary" title="保存" @click="saveRowEvent(row)">保存</vxe-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="text" @click="handleCancel(row)">取消</el-button>
              </template>
              <template v-else>
                <el-button type="text" @click="handleUpdate(row)">编辑</el-button>
                <el-divider direction="vertical" v-if="row.id === undefined"></el-divider>
                <el-button v-if="row.id === undefined" type="text" @click="handleCancel(row)">取消</el-button>
                <template v-if="row.id !== undefined">
                  <el-divider direction="vertical"></el-divider>
                  <el-button type="text" @click="handleDelete(row)">删除</el-button>
                  <el-divider direction="vertical"></el-divider>
                  <el-dropdown>
                    <el-button type="text"> 关联<i class="el-icon-arrow-down el-icon--right"></i> </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        ><el-button type="text" @click="handleAuth(row)">角色</el-button></el-dropdown-item
                      >
                      <el-dropdown-item
                        ><el-button type="text" @click="handleUser(row)">用户</el-button></el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </template>

              <!-- <el-divider direction="vertical"></el-divider> -->
            </template>
          </vxe-grid>
        </el-card>
      </el-col>
    </el-row>

    <!--新增或编辑的弹框-->
    <!-- <el-dialog
      :title="title"
      :visible.sync="dialogOpen"
      width="40%"
      :append-to-body="true"
    >
      <OrgPositionInput @cancel="cancel" :id="currentId" :org="orgId">
      </OrgPositionInput>
    </el-dialog> -->

    <!--查看详情的弹框-->
    <el-dialog :title="title" :visible.sync="detailOpen" width="40%">
      <OrgPositionDetail @cancel="cancel" :id="currentId"> </OrgPositionDetail>
    </el-dialog>

    <!--岗位角色管理的弹框-->
    <el-dialog
      :title="title"
      :visible.sync="roleOpen"
      width="800px"
      @close="roleOpen = false"
      v-if="roleOpen"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      class="dialog-common"
      style="margin-top: -3%"
    >
      <PositionRole @cancel="cancel" :id="currentId" :org="currentId"> </PositionRole>
    </el-dialog>

    <!--岗位用户管理的弹框-->
    <el-dialog
      :title="title"
      :visible.sync="userOpen"
      v-if="userOpen"
      width="1000px"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      class="dialog-common"
      style="margin-top: -3%"
    >
      <OrgPositionUser @cancel="cancel" :id="currentId"> </OrgPositionUser>
    </el-dialog>
  </div>
</template>

<script>
import { delOrgPositionById, getPositionPageData, savePosition } from '@/api/system/org/position'
import { getOrgPositionLib, allPositionLib } from '@/api/system/org/positionLib'
import OrgPositionInput from '@/views/system/org/position/input'
import OrgPositionDetail from '@/views/system/org/position/detail'
import PositionRole from '@/views/system/org/position/positionRole'
import TreeEx from '@/components/common/TreeEx/index'
import OrgPositionUser from '@/views/system/org/position/positionUser'
import orgTree from '@/components/common/orgTree/index'

export default {
  name: 'SystemOrgPositionIndex',
  components: {
    OrgPositionInput,
    OrgPositionDetail,
    PositionRole,
    TreeEx,
    OrgPositionUser,
    orgTree
  },
  props: {
    // orgId: {
    //   type: String,
    //   required: true
    // }
  },
  data() {
    return {
      orgCode: '',
      isLeaf: false,
      // 遮罩层
      loading: false,
      orgId: '',
      // 弹出层标题
      title: '新增',
      // 弹出层状态
      dialogOpen: false,
      detailOpen: false,
      roleOpen: false,
      userOpen: false,
      currentId: '',
      siderHeigth: 'calc(100%)',
      positionOptions: [],
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        align: 'right',
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
      tableColumn: [
        { type: 'seq', title: '序号', width: 55, align: 'center' },
        {
          field: 'org.orgCode',
          title: '机构编码',
          align: 'center'
        },
        {
          field: 'descrption',
          title: '描述',
          align: 'center',
          editRender: { name: 'input' },
          slots: { edit: 'descrptionEdit' }
        },
        {
          field: 'posLib',
          title: '岗位库',
          align: 'center',
          editRender: { name: 'select', option: [] }
          // slots: { edit: "posLib" }
        },
        {
          title: '操作',
          width: 300,
          align: 'center',
          slots: { default: 'operate' }
        }
      ],
      editConfig: {
        trigger: 'manual',
        mode: 'row',
        showStatus: true,
        icon: 'fa fa-file-text-o'
      },
      editRules: {
        posLib: [{ required: true, message: '请选择岗位库' }],
        descrption: [{ required: true, message: '描述不能为空' }]
      },
      tableData: [],
      // 查询参数
      queryParams: {
        pageNumber: 1,
        pageSize: 10,
        org: this.orgId,
        posLib: ''
      },
      treeSet: {
        serviceMethods: {
          queryMethod: '/orgDutyAction-getTreeData.do',
          deleteMethod: '/orgOrgAction-del.do?id=',
          nameKey: 'text',
          addPage: 'org/orgManager/input',
          updatePage: 'org/orgManager/input'
        },
        queryParams: {
          type: this.$route.query.type
        },
        menuTitle: {
          topNodeTitle: '新增一级机构',
          addNodeTitle: '新增子机构',
          updNodeTitle: '编辑当前机构',
          delNodeTitle: '删除当前机构'
        },
        extraParams: {
          multiOrgType: this.$route.query.type
        }
      }
    }
  },
  watch: {
    orgId(val) {
      this.queryParams.orgId = val
      this.searchPage()
    }
  },
  created() {
    // getOrgPositionLib({ name: undefined }).then(res => {
    //   this.positionOptions = res.rows;
    // });
    allPositionLib().then((res) => {
      this.positionOptions = res.data
      const column = this.$refs.xTable.getColumnByField('posLib')
      column.editRender.options = [{ label: '请选择', value: '' }]
      this.positionOptions.forEach((item) => {
        column.editRender.options.push({ label: item.name, value: item.id })
      })
    })
    this.searchPage()
  },
  methods: {
    // 取消
    handleCancel(row) {
      this.$refs.xTable.reloadData(this.$refs.xTable.getData())
    },
    handlePageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.queryParams.pageSize = pageSize
      this.queryParams.pageNumber = currentPage
      this.searchPage()
    },
    /** 查询列表 */
    searchPage() {
      if (this.orgId !== '') {
        console.log(this.queryParams)
        getPositionPageData(this.queryParams).then((res) => {
          this.tableData = res.rows
          this.tablePage.total = res.total
        })
      }
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
        pageSize: 10,
        orgId: this.orgId,
        posLib: undefined
      }
      this.searchPage()
    },
    handleDelete(row) {
      this.$confirm('是否确认删除该条记录?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return delOrgPositionById(row.id)
        })
        .then((res) => {
          if (res.success) {
            this.searchPage()
            this.msgSuccess('删除成功')
          } else {
            this.msgError(res.msg)
          }
        })
        .catch(function () {
          this.msgError('删除失败')
        })
    },
    // handleView(row) {
    //   this.title = '详情'
    //   this.currentId = row.id
    //   this.detailOpen = true
    // },
    handleUpdate(row) {
      console.log(row)
      this.positionOptions.forEach((item) => {
        if (item.name === row.posLib) {
          row.posLib = item.id
        }
      })
      this.$refs.xTable.setActiveRow(row)
      // this.title = "编辑";
      // this.currentId = row.id;
      // this.dialogOpen = true;
    },
    saveRowEvent(data) {
      console.log(data)
      this.$refs.xTable.validate(data, async (res) => {
        if (res === undefined) {
          if (data.id === '' && data.id === undefined) {
            data.org = this.orgId
          }
          await savePosition({ ...data, orgId: this.orgId }).then((res) => {
            if (res.success) {
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this.loading = true
            } else {
              this.$message({
                message: res.msg,
                type: 'danger'
              })
            }
          })

          this.$refs.xTable.clearActived().then(() => {
            this.loading = false
            this.searchPage()
          })
        }
      })
    },
    handleAdd() {
      if (this.orgId === '') {
        this.$message({
          message: '请选择组织机构树',
          type: 'warning'
        })
        return false
      }
      if (this.isLeaf) {
        this.$message({
          message: '请选择组织机构树叶子节点',
          type: 'warning'
        })
        return false
      }
      let row
      let record = { org: { orgCode: this.orgCode } }
      this.$refs.xTable.insertAt(record, row).then(({ row }) => {
        this.$refs.xTable.setActiveRow(row)
        // this.$refs.xTable.setActiveCell(row, "org.id");
      })
      // this.title = "新增";
      // this.currentId = undefined;
      // this.dialogOpen = true;
    },
    handleAuth(row) {
      this.title = '岗位关联角色'
      this.currentId = row.id
      this.roleOpen = true
    },
    handleUser(row) {
      this.title = '岗位用户管理'
      this.currentId = row.id
      this.userOpen = true
    },
    cancel() {
      this.dialogOpen = false
      this.detailOpen = false
      this.roleOpen = false
      this.userOpen = false
      this.searchPage()
    },
    /** 刷新当前所选机构编号 */
    refreshTab(data) {
      if (data.children === null || data.children.length === 0) {
        this.isLeaf = false
      } else {
        this.isLeaf = true
      }
      this.orgId = data.id
      this.orgCode = data.orgCode
    }
  }
}
</script>
<style lang="scss" src="@/assets/styles/tabletree.scss" scoped />
