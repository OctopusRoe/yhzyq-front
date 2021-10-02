<template>
  <div>
    <el-row :gutter="1" class="row-bg">
      <el-col :span="24">
        <el-card class="box-card" :style="{ height: siderHeigth }">
          <el-form :model="queryParams" ref="queryForm" :inline="true">
            <el-form-item label="岗位名称" prop="name">
              <el-input
                v-model="queryParams.name"
                placeholder="请输入岗位名称"
                clearable
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="handleQuery">查询</el-button>
              <el-button icon="el-icon-refresh-right" @click="resetQuery">重置</el-button>
            </el-form-item>
            <div style="float: right">
              <div>
                <el-button type="primary" @click="handleAdd" icon="el-icon-plus">新增 </el-button>
              </div>
            </div>
          </el-form>
          <vxe-grid
            ref="xTable"
            border
            resizable
            height="578px"
            :loading="loading"
            :seq-config="{
              startIndex: (tablePage.currentPage - 1) * tablePage.pageSize
            }"
            :pager-config="tablePage"
            :columns="tableColumn"
            :data="tableData"
            @page-change="handlePageChange"
            :edit-config="editConfig"
            :edit-rules="editRules"
            :show-overflow="true"
          >
            <template v-slot:nameEdit="{ row }">
              <el-input v-model="row.name" style="width: 100%"></el-input>
            </template>
            <template v-slot:descrptionEdit="{ row }">
              <el-input v-model="row.descrption" style="width: 100%"></el-input>
            </template>
            <template v-slot:operate="{ row }">
              <template v-if="$refs.xTable.isActiveByRow(row)">
                <vxe-button type="text" status="primary" title="保存" @click="saveRowEvent(row)">保存</vxe-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="text" @click="handleCancel(row)">取消</el-button>
              </template>
              <!-- <el-button type="text" circle @click="handleView(row)">详情</el-button>
            <span>|</span> -->
              <template v-else>
                <el-button type="text" @click="handleUpdate(row)">编辑</el-button>
                <el-divider direction="vertical" v-if="row.id === undefined"></el-divider>
                <el-button v-if="row.id === undefined" type="text" @click="handleCancel(row)">取消</el-button>
                <el-divider direction="vertical" v-if="row.id !== undefined"></el-divider>
                <el-button type="text" @click="handleDelete(row)" v-if="row.id !== undefined">删除</el-button>
                <el-divider direction="vertical" v-if="row.id !== undefined"></el-divider>
                <el-button type="text" @click="handleAuth(row)" v-if="row.id !== undefined">关联角色 </el-button>
              </template>
            </template>
          </vxe-grid>
        </el-card>
      </el-col>
    </el-row>

    <!--新增或编辑的弹框-->
    <el-dialog :title="title" :visible.sync="dialogOpen" width="40%" :append-to-body="true">
      <PositionLibInput @cancel="cancel" :id="currentId"> </PositionLibInput>
    </el-dialog>

    <!--查看详情的弹框-->
    <el-dialog :title="title" :visible.sync="detailOpen" width="40%">
      <OrgPositionDetail @cancel="cancel" :id="currentId"> </OrgPositionDetail>
    </el-dialog>

    <!--岗位用户管理的弹框-->
    <!-- <el-dialog
      :title="title"
      :visible.sync="roleOpen"
      width="60%"
      :append-to-body="true"
    >
      <PositionLibRole @cancel="cancel" :id="currentId"> </PositionLibRole>
    </el-dialog> -->
    <PositionLibRole ref="PositionLibRole"></PositionLibRole>
  </div>
</template>

<script>
import { delOrgPositionById } from '@/api/system/org/position'
import { getOrgPositionLib, delPositionLibById, saveOrUpdatePositionLib } from '@/api/system/org/positionLib'
import PositionLibInput from '@/views/system/org/positionLib/positionLibInput'
import OrgPositionDetail from '@/views/system/org/position/detail'
import PositionLibRole from '@/views/system/org/positionLib/positionLibRole'
import TreeEx from '@/components/common/TreeEx/index'

export default {
  name: 'SystemOrgPositionLibIndex',
  components: { PositionLibInput, OrgPositionDetail, PositionLibRole, TreeEx },
  props: {},
  data() {
    return {
      siderHeigth: 'calc(100% - 3px)',
      // 遮罩层
      loading: false,
      // 弹出层标题
      title: '新增',
      // 弹出层状态
      dialogOpen: false,
      detailOpen: false,
      roleOpen: false,
      currentId: undefined,
      editConfig: {
        trigger: 'manual',
        mode: 'row',
        showStatus: true,
        icon: 'fa fa-file-text-o'
      },
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
        // { field: "id", title: "岗位库编码", align: "center" },
        {
          field: 'name',
          title: '岗位名称',
          align: 'center',
          width: '300',
          editRender: { name: 'input' },
          slots: { edit: 'nameEdit' }
        },
        {
          field: 'descrption',
          title: '描述',
          align: 'center',
          editRender: { name: 'input' },
          slots: { edit: 'descrptionEdit' }
        },
        {
          title: '操作',
          width: 500,
          align: 'center',
          slots: { default: 'operate' }
        }
      ],
      editRules: {
        name: [{ required: true, message: '岗位名称不能为空' }]
        // descrption: [
        //   { required: true, message: "排序必须填" },
        //   { type: "number", min: 1, message: "必须大于0" }
        // ]
        // roleName: [{ required: true, message: "邮件必须填写" }],
        // role: [{ required: true, message: "角色必须填写" }]
      },
      tableData: [],
      // 查询参数
      queryParams: {
        pageNumber: 1,
        pageSize: 10,
        name: ''
      }
    }
  },
  watch: {},
  created() {
    this.searchPage()
  },
  methods: {
    // 取消
    handleCancel(row) {
      this.$refs.xTable.reloadData(this.$refs.xTable.getData())
    },
    saveRowEvent(data) {
      this.$refs.xTable.validate(data, async (res) => {
        if (res === undefined) {
          // if (data.id === undefined) {
          console.log(data)
          await saveOrUpdatePositionLib(data).then((res) => {
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
          // } else {
          //   console.log(data);
          //   await saveOrUpdatePositionLib({
          //     id: data.id,
          //     descrption: data.descrption,
          //     name: data.name
          //   }).then(res => {
          //     if (res.success) {
          //       this.$notify({
          //         title: "提示",
          //         message: res.msg,
          //         type: "success"
          //       });
          //       this.loading = true;
          //     } else {
          //       this.$notify({
          //         title: "提示",
          //         message: res.msg,
          //         type: "danger"
          //       });
          //     }
          //   });
          // }

          this.$refs.xTable.clearActived().then(() => {
            this.loading = false
            this.searchPage()
          })
        }
      })
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
      getOrgPositionLib(this.queryParams).then((res) => {
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
        pageSize: 10,
        name: ''
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
          return delPositionLibById({ id: row.id })
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
      // this.title = "编辑";
      // this.currentId = row.id;
      // this.dialogOpen = true;
      this.$refs.xTable.setActiveRow(row)
    },
    handleAdd() {
      let row
      let record = {}
      this.$refs.xTable.insertAt(record, row).then(({ row }) => {
        this.$refs.xTable.setActiveRow(row)
      })
      this.$refs.xTable.setActiveRow(1)
      // this.title = "新增";
      // this.currentId = undefined;
      // this.dialogOpen = true;
    },
    handleAuth(row) {
      // this.title = "岗位授权";
      // this.currentId = row.id;
      // this.roleOpen = true;
      this.$refs.PositionLibRole.showModal(row)
    },
    cancel() {
      this.dialogOpen = false
      this.detailOpen = false
      this.roleOpen = false
      this.searchPage()
    }
  }
}
</script>
<style lang="scss" src="@/assets/styles/tabletree.scss" scoped />
