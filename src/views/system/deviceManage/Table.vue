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
      class="custom-table"
      :data="tableData"
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
      </el-table-column>
      <el-table-column
        prop="deviceStatus"
        label="设备状态"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="deviceStatus"
        label="是否联接第三方平台"
        width="200"
      >
      </el-table-column>
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
            @click="openDialog(1,scope.row)"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getListDev, deleteDev } from '@/api/system/deviceManage';
import { initForm } from './initData';
export default {
  data() {
    return {
      tableData: [],
      selIds: []
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
    async getListDev() {
      const { code, result } = await getListDev(initForm)
      if (code === 200) {
        this.tableData = result.list
      }
    },
    async deleteDev(ids = this.selIds) {
      const { code, message } = await deleteDev(ids)
      if (code === 200) {
        this.$message.success(message)
        this.getListDev(initForm)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.custom-table {
  margin-top: 20px;
}
</style>