<template>
  <div>
    <vxe-toolbar setting>
      <template v-slot:buttons>
        <el-button
          type='primary'
          @click="openDialog(0)"
        >新增</el-button>
        <el-button
          type='danger'
          @click="deleteDev()"
        >批量删除</el-button>
      </template>
    </vxe-toolbar>
    <vxe-table
      v-loading="loading"
      :data="tableData"
      border
      auto-resize
      show-overflow
      highlight-current-row
      @cell-click="handleRowClick"
      @checkbox-change="selectionChange"
      @checkbox-all="selectionChange"
      row-id="id"
    >
      <vxe-table-column
        type="checkbox"
        align="center"
        width="50"
      ></vxe-table-column>
      <vxe-table-column
        field="deviceName"
        title="设备名称"
      >
      </vxe-table-column>
      <vxe-table-column
        field="deviceNumber"
        title="设备编号（序列号）"
      >
      </vxe-table-column>
      <vxe-table-column
        field="deviceType"
        title="设备类型"
      >
        <template slot-scope="scope">
          {{selectDictLabelEx(devTypeOptions,scope.row.deviceType)}}
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="deviceStatus"
        title="设备状态"
      >
        <template slot-scope="scope">
          {{selectDictLabelEx(devStaOptions,scope.row.deviceStatus)}}
        </template>
      </vxe-table-column>
      <!-- <vxe-table-column
        field="isConnectPlatform"
        title="是否联接第三方平台"
      >
      </vxe-table-column> -->
      <vxe-table-column
        field="address"
        title="当前位置"
      >
      </vxe-table-column>
      <vxe-table-column
        field="centerName"
        title="所属管理中心"
      >
      </vxe-table-column>
      <vxe-table-column
        title="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click.stop="openDialog(1,scope.row)"
          >编辑</el-button>
          <el-button
            type="text"
            size="mini"
            @click.stop="deleteDev([scope.row.id])"
          >删除</el-button>
        </template>
      </vxe-table-column>
    </vxe-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.pageNumber"
      :page-sizes="[10,15,25,50]"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next"
      background
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
      this.selIds = selection.records.map((item) => item.id)
    },
    openDialog(isEdit, info) {
      this.$emit("openDialog", isEdit, info)
      console.log('%c 🍻 info: ', 'font-size:20px;background-color: #7F2B82;color:#fff;', info);
    },
    handleSizeChange(pageSize) {
      this.getListDev(1, pageSize)
    },
    handleCurrentChange(pageNumber) {
      this.getListDev(pageNumber, undefined)
    },
    handleRowClick(row) {
      if (row.$columnIndex !== 0) {
        this.$emit("update:selDevInfo", row.row)
      }
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