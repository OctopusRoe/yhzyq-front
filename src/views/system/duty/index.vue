<template>
  <div class="app-container" style="padding-top: 10px">
    <div class="table-wrap">
      <el-form :model="queryParams" ref="queryForm" :inline="true">
        <div class="querybox">
          <el-form-item label="名称" prop="name">
            <el-input
              v-model="name"
              placeholder="请输入职务名称"
              clearable
              size="small"
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click="query"
              >搜索</el-button
            >
            <el-button icon="el-icon-refresh" size="mini" @click="reset"
              >重置</el-button
            >
          </el-form-item>
          <div class="addbtn-box">
            <el-button
              icon="el-icon-plus"
              size="mini"
              type="primary"
              @click="add"
              >添加</el-button
            >
          </div>
        </div>
      </el-form>
      <vxe-table
        :data="dutyData"
        @selection-change="handleSelectionChange"
        border
      >
        <vxe-table-column title="id" field="id" v-if="isShowId" align="center" ></vxe-table-column>
        <vxe-table-column title="名称" field="name" align="center"></vxe-table-column>
        <vxe-table-column title="描述" field="descrption" align="center"></vxe-table-column>
        <vxe-table-column title="创建人" field="createUser" align="center"></vxe-table-column>
        <vxe-table-column title="创建时间" field="createTime" align="center"></vxe-table-column>
        <vxe-table-column
          title="排序号"
          prop="sortedNum"
          align="center"
          v-if="isShowId"
        ></vxe-table-column>
        <vxe-table-column
          title="操作"
          align="center"
          width="200"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <vxe-button
              type="text"
              status="primary"
              size="small"
              @click="updateUserGroup(scope.$index, scope.row)"
              >修改</vxe-button
            >
            <vxe-button
              type="text"
              status="primary"
              size="small"
              @click="deleteUserGroup(scope.$index, scope.row)"
              >删除</vxe-button
            >
          </template>
        </vxe-table-column>
      </vxe-table>

      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="page"
        :limit.sync="size"

        @pagination="getDataList"
        style="float: right; padding-right: 450px"
      />
    </div>
    <el-dialog
      title="新增职务"
      :visible="DutyDialogFlag"
      :append-to-body="true"
      @close="DutyDialogFlag = false"
      width="30%"
    >
      <div class="dutyBox">
        <el-form ref="addFormRef" :rules="addFormRules" :model="addQueryParams">
          <el-form-item label="名称:" prop="name">
            <el-input
              placeholder="请输入职务名称"
              clearable
              size="medium"
              style="width: 450px"
              v-model="addQueryParams.name"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="描述:"
            prop="descrption"
            style="margin-left: 10px"
          >
          <div style="height: 100px">
            <el-input
              v-model="addQueryParams.descrption"
              type="textarea"
              size="medium "
              maxlength="50"
              show-word-limit
              placeholder="请输入描述"
              :autosize="{minRows: 4,maxRows: 10}"
              
              style="width: 450px;height: 100px"
            />
          </div>
          </el-form-item>
        </el-form>
      </div>
      <div style="text-align: center; padding-top: 10px">
        <el-button type="primary" size="medium" @click="confirm"
          >提交</el-button
        >
        <el-button size="medium" @click="cancel">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="修改职务"
      :visible="updateDialogFlag"
      width="35%"
      :append-to-body="true"
      @close="updateDialogFlag = false"
    >
      <div class="dutyBox">
        <el-form
          ref="addFormRef"
          :rules="addFormRules"
          :model="updateQueryParams"
        >
          <el-form-item label="名称:" prop="name">
            <el-input
              placeholder="请输入职务名称"
              clearable
              size="medium"
              style="width: 450px"
              v-model="updateQueryParams.name"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="描述:"
            prop="descrption"
            style="margin-left: 10px"
          >
            <el-input
              v-model="updateQueryParams.descrption"
              type="textarea"
              size="medium "
              maxlength="50"
              show-word-limit
              placeholder="请输入描述"
              :autosize="{minRows: 4,maxRows: 10}"
              style="width: 450px"
            />
          </el-form-item>
        </el-form>
      </div>
      <div style="text-align: center; padding-top: 10px">
        <el-button type="primary" size="medium" @click="updateConfirm"
          >提交</el-button
        >
        <el-button size="medium" @click="updateDialogFlag = false"
          >取消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { queryDutyb, addDuty, updateDuty, delDuty } from "@/api/system/duty";
export default {
  name: "duty",
  data() {
    return {
      isShowId: false,
      loading: true,
      DutyDialogFlag: false,
      updateDialogFlag: false,
      manageDialogFlag: false,
      total: 10,
      multipleSelection: [],
      dutyData: [],
      addQueryParams: {
        name: "",
        descrption: "",
      },
      updateQueryParams: {
        id: "",
        name: "",
        descrption: "",
      },
      queryParams: {
        pageNumber: 1,
        pageSize: 10,
        name: "",
      },
      total: 10,
      addFormRules: {
        name: [{ required: true, message: "名称不能为空", trigger: "change" }],
      },
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      // this.loading = true;
      queryDutyb(this.queryParams).then((response) => {
        this.loading = false;
        console.log(response.total);
        this.dutyData = response.rows;
        this.total = response.total;
      });
    },
    confirm() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        addDuty(this.addQueryParams).then((response) => {
          console.log(response);
          if (response.success) {
            this.$message("保存成功");
            this.DutyDialogFlag = false;
            this.$refs.addFormRef.resetFields(); // 重置表单项
            this.getDataList();
          } else {
            this.$message("保存失败");
          }
        });
      });
    },

    updateConfirm() {
      updateDuty(this.updateQueryParams).then((response) => {
        console.log(response);
        if (response.success) {
          this.$message("保存成功");
          this.updateDialogFlag = false;
          this.$refs.addFormRef.resetFields(); // 重置表单项
          this.getDataList();
        } else {
          this.$message("保存失败");
        }
      });
    },
    updateUserGroup(index, row) {
      console.log("sd", row);
      this.updateDialogFlag = true;
      this.updateQueryParams.id = row.id;
      this.updateQueryParams.name = row.name;
      this.updateQueryParams.descrption = row.descrption;
    },
    deleteUserGroup(index, row) {
      this.$confirm("确定删除这条记录吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let ids = row.id;
          console.log("112", ids);
          delDuty(ids).then((response) => {
            if (response.success) {
              this.$message("删除成功");
              this.getDataList();
            } else {
              this.$message("删除失败");
            }
          });
        })
        .catch(() => {});
    },
    add() {
      this.DutyDialogFlag = true;
    },
    query() {
      this.getDataList();
    },
    reset() {
      this.name = "";
    },
    cancel() {
      this.DutyDialogFlag = false;
      this.$refs.addFormRef.resetFields(); // 重置表单项
    },
    manageUserGroup(i, r) {
      this.manageDialogFlag = true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.count = val.length;
    },
  },
};
</script>
<style lang="scss" scoped>
.dutyBox {
  > div {
    display: flex;
    margin-bottom: 10px;
    align-items: center;

    > div {
      flex-grow: 1;
      margin-left: 10px;
    }
  }
}
</style>
