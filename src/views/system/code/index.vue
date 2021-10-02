<template>
  <div>
    <el-card class="box-card" :style="{ height: siderHeigth }">
      <div>
        <el-row>
          <el-col :span="18">
            <el-form :inline="true" :model="form" class="demo-form-inline">
              <el-form-item label="名字">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="系统">
                <el-select v-model="form.sysName" style="width: 100%">
                  <el-option label="全部" value=""></el-option>
                  <el-option v-for="item in systemDatas" :key="item.name" :label="item.name" :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleSearch" icon="el-icon-search">查询</el-button>
                <el-button @click="reset" icon="el-icon-refresh-right">重置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="6">
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
        style="margin-top: 5px"
        height="578px"
      >
        <template #nameEdit="{ row }">
          <el-input v-model="row.name" style="width: 100%"></el-input>
        </template>
        <template #codeEdit="{ row }">
          <el-input v-model="row.code" style="width: 100%"></el-input>
        </template>
        <template #sysNameEdit="{ row }">
          <el-select
            v-model="row.sysName"
            style="width: 100%"
            class="systemTypeEdit"
            @change="systemChange($event, row)"
          >
            <el-option v-for="item in systemDatas" :key="item.name" :label="item.name" :value="item.name"> </el-option>
          </el-select>
        </template>
        <template #ruleEdit="{ row }">
          <el-input v-model="row.rule" style="width: 100%"></el-input>
        </template>
        <template #ruleLenEdit="{ row }">
          <el-input-number controls-position="right" v-model="row.ruleLen" style="width: 100%"></el-input-number>
        </template>
        <template #descriptionEdit="{ row }">
          <el-input v-model="row.description" style="width: 100%"></el-input>
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
            <el-button v-if="row.id === undefined" type="text" status="primary" @click="handleCancel(row)"
              >取消</el-button
            >
            <el-divider direction="vertical" v-if="row.id !== undefined"></el-divider>
            <vxe-button
              type="text"
              status="primary"
              title="删除"
              @click="handleDeleteClick(row)"
              v-if="row.id !== undefined"
              >删除</vxe-button
            >
          </template>
        </template>
      </vxe-grid>
    </el-card>
  </div>
</template>

<script>
import { allSystem } from '@/api/system/system'
import { pageDataList, saveOrUpdateXtNumRule, delXtNumRuleById, batchDeleteCode } from '@/api/system/code'

export default {
  name: 'SystemCodeIndex',
  data() {
    return {
      siderHeigth: 'calc(100%)',
      form: {
        name: '',
        sysName: ''
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
            field: 'name',
            title: '名字',
            width: 150,
            slots: { edit: 'nameEdit' },
            align: 'center',
            editRender: { name: 'input' }
          },
          {
            field: 'code',
            title: '编码',
            width: 150,
            slots: { edit: 'codeEdit' },
            align: 'center',
            editRender: { name: 'input' }
          },
          {
            field: 'sysName',
            title: '系统',
            width: 150,
            slots: { edit: 'sysNameEdit' },
            align: 'center',
            editRender: { name: 'input' }
          },
          {
            field: 'rule',
            title: '编号规则',
            minWidth: 200,
            slots: { edit: 'ruleEdit' },
            align: 'center',
            editRender: { name: 'input' }
          },
          {
            field: 'ruleLen',
            title: '编号长度',
            width: 100,
            slots: { edit: 'ruleLenEdit' },
            align: 'center',
            editRender: { name: 'input' }
          },
          {
            field: 'description',
            title: '描述',
            minWidth: 250,
            slots: { edit: 'descriptionEdit' },
            align: 'center',
            editRender: { name: 'input' }
          },
          {
            title: '操作',
            width: 150,
            slots: { default: 'operate' },
            align: 'center'
          }
        ],
        editRules: {
          code: [{ required: true, message: '编码不能为空' }],
          name: [{ required: true, message: '名字不能为空' }],
          sysName: [{ required: true, message: '系统不能为空' }],
          rule: [{ required: true, message: '编号规则不能为空' }]
        },
        data: []
      },
      selectRecords: [],
      systemDatas: [],
      modules: [],
      isDisabled: true
    }
  },
  mounted() {
    allSystem().then((res) => {
      this.systemDatas = res.data
      this.findList()
    })
  },
  methods: {
    // 取消
    handleCancel(row) {
      this.$refs.xGrid.reloadData(this.$refs.xGrid.getData())
    },
    systemChange(data, row) {
      // row.sysCode = data;
      // this.$refs.xGrid.updateData();
    },
    checkboxChangeEvent({ records }) {
      this.selectRecords = records
    },
    changeAllEvent() {
      this.selectRecords = this.$refs.xGrid.getCheckboxRecords()
    },
    // 删除
    handleDeleteClick(row) {
      this.$confirm('是否要删除该项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let id = row.id
        delXtNumRuleById(id).then((res) => {
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
    // 修改
    editRowEvent(row) {
      this.$refs.xGrid.setActiveRow(row)
    },
    // 保存
    saveRowEvent(data) {
      this.$refs.xGrid.validate(data, (res) => {
        if (!res) {
          saveOrUpdateXtNumRule(data).then((res) => {
            if (res.success) {
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this.findList()
            } else {
              this.$message({
                message: res.msg,
                type: 'danger'
              })
            }
          })
        }
      })
    },
    findList() {
      pageDataList({
        ...this.form,
        pageNumber: this.gridOptions.pagerConfig.currentPage,
        pageSize: this.gridOptions.pagerConfig.pageSize
      }).then((res) => {
        this.gridOptions.pagerConfig.total = res.total
        this.gridOptions.data = res.rows
        this.gridOptions.loading = false
        this.selectRecords = []
      })
    },
    // 查询
    handleSearch() {
      this.count = 0
      this.selectRecords = []
      this.findList()
    },
    // 新增
    handleAdd() {
      let row
      let record = {}
      this.$refs.xGrid.insertAt(record, row).then(({ row }) => {
        this.$refs.xGrid.setActiveRow(row)
      })
    },
    // 重置
    reset() {
      this.form = {
        businessType: '',
        systemType: '',
        module: ''
      }
      this.gridOptions.pagerConfig.currentPage = 1
      this.gridOptions.pagerConfig.pageSize = 10
      this.handleSearch()
    },
    // 批量删除
    handleBatchDelete() {
      for (let item of this.selectRecords) {
        if (item.id === undefined) {
          this.$message({
            message: '存在未保存的项',
            type: 'warning'
          })
          return false
        }
      }
      let ids = this.selectRecords.map((res) => res.id).join(',')
      if (this.selectRecords.length === 0) {
        this.$message({
          message: '请勾选要删除的编码规则',
          type: 'warning'
        })
        return false
      }
      this.$confirm('是否要删除多个编码规则?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        batchDeleteCode(ids).then((res) => {
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
    handlePageChange({ currentPage, pageSize }) {
      this.gridOptions.pagerConfig.currentPage = currentPage
      this.gridOptions.pagerConfig.pageSize = pageSize
      this.findList()
    }
  }
}
</script>

<style scoped></style>
