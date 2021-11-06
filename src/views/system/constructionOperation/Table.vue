<template>
  <div>
    <el-button
      type='primary'
      @click="openDialog(0)"
    >新增</el-button>
    <el-button
      type='danger'
      @click="deleteWor()"
    >删除</el-button>
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
    >
      <vxe-table-column
        type="checkbox"
        align="center"
      ></vxe-table-column>
      <!-- <vxe-table-column
        field="deviceName"
        title="违规提醒"
      >
      </vxe-table-column> -->
      <vxe-table-column
        field="jobName"
        title="施工作业名称"
      >
      </vxe-table-column>
      <!-- <vxe-table-column
        field=""
        title="施工区域"
      >
      </vxe-table-column> -->
      <vxe-table-column
        field="planStartTime"
        title="计划开始时间"
      >
        <template v-slot="{row}">
          {{row.planStartTime.substr(0,10)}}
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="planEndTime"
        title="计划结束时间"
      >
        <template v-slot="{row}">
          {{row.planEndTime.substr(0,10)}}
        </template>
      </vxe-table-column>
      <vxe-table-column
        title="联系人"
      >
        <template slot-scope="scope">
          {{`${scope.row.contactName}--${scope.row.contactPhone}`}}
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="deviceType"
        title="施工状态"
      >
        <template slot-scope="scope">
          {{selectDictLabelEx(worStaOptions,scope.row.jobStatus.toString(),'vals')}}
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="jobTimeStart"
        title="开始时间"
      >
      </vxe-table-column>
      <vxe-table-column
        field="jobTimeEnd"
        title="结束时间"
      >
      </vxe-table-column>
      <vxe-table-column title="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click.stop="openDialog(1,scope.row)"
          >编辑</el-button>
          <el-button
            type="text"
            size="mini"
            @click.stop="deleteWor([scope.row.id])"
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
import { getListWor, deleteWor } from '@/api/system/constructionOperation';
import optionMixin from './mixins/optionMixin';
export default {
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
  mixins: [optionMixin],
  mounted() {
    this.getListWor();
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
      this.$emit("update:selWorInfo", row.row)
    },
    async getListWor(pageNumber = this.pagination.pageNumber, pageSize = this.pagination.pageSize) {
      try {
        this.loading = true
        const { code, result } = await getListWor({ ...this.form, pageNumber, pageSize })
        this.loading = false
        if (code === 200) {
          this.tableData = result.list
        }
      } catch (error) {
        this.loading = false
      }

    },
    async deleteWor(ids = this.selIds) {
      try {
        this.loading = true
        const { code, message } = await deleteWor(ids)
        this.loading = false
        if (code === 200) {
          this.$message.success(message)
          this.getListWor()
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