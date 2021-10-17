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
    <el-table
      v-loading="loading"
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
      <!-- <el-table-column
        prop="deviceName"
        label="违规提醒"
        width="50"
      >
      </el-table-column> -->
      <el-table-column
        prop=""
        label="施工作业名称"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="deviceType"
        label="施工区域"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="planTimeStart"
        label="计划开始时间"
        width="200"
      >
      </el-table-column>
      <el-table-column
        label="联系人"
        width="200"
      >
        <template slot-scope="scope">
          {{`${scope.row.contactName}--${scope.row.contactPhone}`}}
        </template>
      </el-table-column>
      <el-table-column
        prop="deviceType"
        label="施工状态"
        width="200"
      >
        <template slot-scope="scope">
          {{selectDictLabelEx(worStaOptions,scope.row.jobStatus,'val')}}
        </template>
      </el-table-column>
      <el-table-column
        prop="jobTimeStart"
        label="开始时间"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="jobTimeEnd"
        label="结束时间"
        width="200"
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
import { getListWor, deleteWor } from '@/api/system/constructionOperation';
import optionMixin from './mixins/optionMixin';
import { initForm } from './initData';
export default {
  data() {
    return {
      tableData: [],
      selIds: [],
      loading: false
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
    async getListWor(form = initForm) {
      try {
        this.loading = true
        const { code, result } = await getListWor(form)
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
          this.getListWor(initForm)
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
</style>