<template>
  <div>
    <el-button
      type='primary'
      @click="openDialog(0)"
    >新增</el-button>
    <el-button
      type='danger'
      @click="deleteDev()"
    >删除</el-button>
    <el-table
      v-loading="loading"
      class="custom-table"
      :data="tableData"
      height="650"
      highlight-current-row
      @row-click="handleRowClick"
      @selection-change="selectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        prop="index"
        label="序号"
        width="50"
      >
      </el-table-column>
      <el-table-column
        prop="deviceName"
        label="设备名称"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="deviceNumber"
        label="设备编号（序列号）"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="deviceType"
        label="设备类型"
        width="200"
      >
        <template slot-scope="scope">
          {{selectDictLabelEx(devTypeOptions,scope.row.deviceType)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="deviceStatus"
        label="设备状态"
        width="200"
      >
        <template slot-scope="scope">
          {{selectDictLabelEx(devStaOptions,scope.row.deviceStatus)}}
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="isConnectPlatform"
        label="是否联接第三方平台"
        width="200"
      >
      </el-table-column> -->
      <el-table-column
        prop="address"
        label="当前位置"
        width=""
      >
      </el-table-column>
      <el-table-column
        prop="centerName"
        label="所属管理中心"
        width="150"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="success"
            @click.stop="openDialog(1,scope.row)"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.pageNumber"
      :page-sizes="[10,15,25,50]"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next"
      :total="pagination.total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { initPagination } from './initData';
import optionMixin from './mixins/optionMixin';
import { getListDev, deleteDev } from '@/api/system/deviceManage';
export default {
  mixins: [optionMixin],
  props: {
    selDevInfo: {
      type: Object | null,
      default: null
    },
    form: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      tableData: [],
      selIds: [],
      loading: false,
      pagination: initPagination,
    }
  },
  mounted() {
    this.getListDev();
  },
  methods: {
    selectionChange(selection) {
      this.selIds = selection.map((item) => item.id)
    },
    openDialog(isEdit, info) {
      this.$emit("openDialog", isEdit, info)
    },
    handleSizeChange(pageSize) {
      this.getListDev(1, pageSize)
    },
    handleCurrentChange(pageNumber) {
      this.getListDev(pageNumber, undefined)
    },
    handleRowClick(row) {
      this.$emit("update:selDevInfo", row)
    },
    async getListDev(pageNumber = this.pagination.pageNumber, pageSize = this.pagination.pageSize) {
      try {
        this.loading = true
        const { code, result } = await getListDev(pageNumber, pageSize, this.form)
        this.loading = false
        if (code === 200) {
          this.tableData = result.list
          this.pagination.total = result.total
        }
      } catch (error) {
        this.loading = false
      }

    },
    async deleteDev(ids = this.selIds) {
      try {
        this.loading = true
        const { code, message } = await deleteDev(ids)
        this.loading = false
        if (code === 200) {
          this.$message.success(message)
          this.getListDev()
        }
      } catch (error) {
        this.loading = false
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.custom-table {
  margin-top: 20px;
}
::v-deep .el-pagination {
  text-align: right;
}
</style>