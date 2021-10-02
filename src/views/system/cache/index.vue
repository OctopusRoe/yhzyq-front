<template>
  <div>
    <el-card class="box-card" :style="{ height: siderHeigth }">
      <div>
        <el-row>
          <el-col :span="18">
            <el-form :inline="true" :model="form" class="demo-form-inline">
              <el-form-item label="业务类型">
                <el-input v-model="form.businessType"></el-input>
              </el-form-item>
              <el-form-item label="系统">
                <el-select v-model="form.systemType" style="width: 100%" @change="queryChange">
                  <el-option label="全部" value=""></el-option>
                  <el-option v-for="item in systemDatas" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="模块">
                <el-select v-model="form.module" style="width: 100%">
                  <el-option label="全部" value=""></el-option>
                  <el-option v-for="item in modules" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
              <el-button type="danger" @click="handleBatchClear" icon="el-icon-delete">批量清除</el-button>
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
        <template #systemType="{ row }">
          <span>{{ row.systemType | systemTypeFilter }}</span>
        </template>
        <template #module="{ row }">
          <span>{{ row.module | moduleFilter }}</span>
        </template>
        <template #dbIdEdit="{ row }">
          <el-select v-model="row.dbId" style="width: 100%" @change="systemChange($event, row)">
            <el-option v-for="item in redisDB" :key="item" :label="item" :value="item"> </el-option>
          </el-select>
        </template>
        <template #systemTypeEdit="{ row }">
          <el-select
            v-model="row.systemType"
            style="width: 100%"
            class="systemTypeEdit"
            @change="systemChange($event, row)"
          >
            <el-option v-for="item in systemDatas" :key="item.id" :label="item.name" :value="item.id"> </el-option>
          </el-select>
        </template>
        <template #moduleEdit="{ row }">
          <el-select v-model="row.module" style="width: 100%">
            <el-option
              v-for="item in row.modules"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              class="moduleEdit"
            >
            </el-option>
          </el-select>
        </template>
        <template #businessTypeEdit="{ row }">
          <el-input v-model="row.businessType" style="width: 100%"></el-input>
        </template>
        <template #keyValueEdit="{ row }">
          <el-input v-model="row.keyValue" style="width: 100%"></el-input>
        </template>
        <template #sortedOrderEdit="{ row }">
          <el-input-number controls-position="right" v-model="row.sortedOrder" style="width: 100%"></el-input-number>
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
            <el-button v-if="row.id === undefined" type="text" @click="handleCancel(row)">取消</el-button>
            <el-divider direction="vertical" v-if="row.id !== undefined"></el-divider>
            <vxe-button
              type="text"
              status="primary"
              title="删除"
              @click="handleDeleteClick(row)"
              v-if="row.id !== undefined"
              >删除</vxe-button
            >
            <el-divider direction="vertical" v-if="row.id !== undefined"></el-divider>
            <vxe-button
              type="text"
              status="primary"
              title="用户"
              v-if="row.id !== undefined"
              @click="handleClearClick(row)"
              >清除</vxe-button
            >
          </template>
        </template>
      </vxe-grid>
    </el-card>
  </div>
</template>

<script>
import {
  getListSystems,
  saveOrUpdateXtCache,
  pageDataList,
  getListModules,
  delXtCacheById,
  clearCache,
  batchDeleteCache
} from '@/api/system/cache'
import { getDicts } from '@/api/system/org/org'

const systemTypeMap = new Map()
const moduleMap = new Map()

export default {
  name: 'SystemCacheIndex',
  data() {
    return {
      redisDB: [],
      siderHeigth: 'calc(100%)',
      form: {
        businessType: '',
        systemType: '',
        module: ''
      },
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
            field: 'dbId',
            title: '缓存库',
            minWidth: 80,
            slots: { edit: 'dbIdEdit' },
            align: 'center',
            editRender: { name: 'input' }
          },
          {
            field: 'systemType',
            title: '系统',
            minWidth: 120,
            slots: { default: 'systemType', edit: 'systemTypeEdit' },
            align: 'center',
            editRender: { autofocus: '.systemTypeEdit' }
          },
          {
            field: 'module',
            title: '模块',
            minWidth: 120,
            slots: { default: 'module', edit: 'moduleEdit' },
            align: 'center',
            editRender: { autofocus: '.moduleEdit' }
          },
          {
            field: 'businessType',
            title: '业务类型',
            minWidth: 120,
            slots: { edit: 'businessTypeEdit' },
            align: 'center',
            editRender: { name: 'input' }
          },
          {
            field: 'keyValue',
            title: 'key前缀',
            minWidth: 120,
            slots: { edit: 'keyValueEdit' },
            align: 'center',
            editRender: { name: 'input' }
          },
          {
            field: 'sortedOrder',
            title: '排序',
            width: 120,
            slots: { edit: 'sortedOrderEdit' },
            align: 'center',
            editRender: { name: 'input' }
          },
          {
            title: '操作',
            minWidth: 150,
            slots: { default: 'operate' },
            align: 'center'
          }
        ],
        editRules: {
          systemType: [
            { required: true, message: '名字必须填' },
            { min: 2, max: 50, message: '名称长度在 2 到 50 个字符' }
          ],
          sortedOrder: [
            { required: true, message: '排序必须填' },
            { type: 'number', min: 1, message: '必须大于0' }
          ]
          // roleName: [{ required: true, message: "邮件必须填写" }],
          // role: [{ required: true, message: "角色必须填写" }]
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
    for (let i = 0; i < 16; i++) {
      this.redisDB.push(i)
    }
    getListSystems({ code: 'CACHE' }).then((res) => {
      this.systemDatas = res.data
      res.data.forEach((item) => {
        systemTypeMap.set(item.id, { label: item.name, value: item.id })
      })
    })
    getListModules({ code: 'CACHE' }).then((res) => {
      res.data.forEach((item) => {
        moduleMap.set(item.id, item)
      })
    })
    this.findList()
  },
  methods: {
    handleBatchClear() {
      let keys = this.selectRecords.map((res) => res.keyValue)
      this.$confirm('是否要清除缓存?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        clearCache(keys).then((res) => {
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
    // 取消
    handleCancel(row) {
      this.$refs.xGrid.reloadData(this.$refs.xGrid.getData())
    },
    queryChange(data) {
      getDicts({ type: data }).then((res) => {
        this.modules = res
        this.isDisabled = false
        this.form.module = ''
      })
    },
    systemChange(data, row) {
      getDicts({ type: data }).then((res) => {
        row.modules = res
        row.module = ''
        this.$refs.xGrid.updateData()
      })
    },
    checkboxChangeEvent({ records }) {
      this.selectRecords = records
    },
    changeAllEvent() {
      this.selectRecords = this.$refs.xGrid.getCheckboxRecords()
    },
    // 清除缓存
    handleClearClick(row) {
      this.$confirm('是否要清除缓存?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(row.keyValue)
        clearCache([row.keyValue]).then((res) => {
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
    // 删除
    handleDeleteClick(row) {
      this.$confirm('是否要删除该项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delXtCacheById({ id: row.id }).then((res) => {
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
      getDicts({ type: row.systemType }).then((res) => {
        row.modules = res
        this.$refs.xGrid.setActiveRow(row)
        // this.$refs.xGrid.updateData();
      })
    },
    // 保存
    saveRowEvent(data) {
      saveOrUpdateXtCache(data).then((res) => {
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
    },
    findList() {
      pageDataList({
        ...this.form,
        pageNumber: this.gridOptions.pagerConfig.currentPage,
        pageSize: this.gridOptions.pagerConfig.pageSize
      }).then((res) => {
        console.log(res)
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
          message: '请勾选要删除的缓存',
          type: 'warning'
        })
        return false
      }
      this.$confirm('是否要删除多个缓存?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        batchDeleteCache(ids).then((res) => {
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
  },
  filters: {
    systemTypeFilter(data) {
      if (!data) {
        return ''
      }
      return systemTypeMap.get(data).label
    },
    moduleFilter(data) {
      if (!data) {
        return ''
      }
      return moduleMap.get(data).name
    }
  }
}
</script>

<style scoped></style>
