<template>
  <el-dialog
    title="关联用户组"
    :visible.sync="dialogVisible"
    width="50%"
    :modal="false"
    :before-close="handleClose"
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    class="dialog-common"
    style="margin-top: -3%"
  >
    <div>
      <el-row>
        <el-col :span="18">
          <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item>
              <el-input
                v-model="form.keyValue"
                placeholder="用户组名称"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="handleSearch"
                icon="el-icon-search"
                >查询</el-button
              >
              <el-button @click="reset" icon="el-icon-refresh-right"
                >重置</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <div align="right">
            <el-button
              type="primary"
              @click="handleAdd"
              icon="el-icon-plus"
              style="margin-left: 10px"
              >添加</el-button
            >
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="margin-bottom: 5px">
      <el-tag style="width: 100%; height: 36px"
        ><div style="margin-top: 6px; font-size: 13px">
          <i class="el-icon-warning"></i>已选择<span>{{ count }}项</span>
        </div></el-tag
      >
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      height="536px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column prop="name" label="名称" minWidth="100" align="center">
      </el-table-column>
      <el-table-column
        prop="descrption"
        label="描述"
        minWidth="200"
        align="center"
      >
      </el-table-column>
    </el-table>
    <div class="block" align="right">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 50, 100]"
        :page-size.sync="pageSize"
        :current-page.sync="pageCurrent"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </el-dialog>
</template>

<script>
import { queryNewGroupByRoleId, saveUserGroupRole } from "@/api/system/role";

export default {
  data() {
    return {
      pageSize: 10,
      pageCurrent: 1,
      count: 0,
      multipleSelection: [],
      total: 0,
      showType: false,
      dialogVisible: false,
      form: {
        keyValue: ""
      },
      page: "1",
      size: "10",
      roleId: "",
      req: {
        roleId: "",
        userIds: []
      },
      tableData: [
        {
          id: "",
          loginName: "",
          name: "",
          mobileNum: "",
          userState: "",
          position: "",
          remark: ""
        }
      ]
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.count = val.length;
    },
    showModal(roleId) {
      this.roleId = roleId;
      this.handleSearch();
      this.dialogVisible = true;
    },
    handleSizeChange(val) {
      this.size = val;
      this.handleSearch();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.handleSearch();
    },
    handleSearch() {
      this.count = 0;
      queryNewGroupByRoleId({
        keyValue: this.form.keyValue,
        id: this.roleId,
        pageNo: this.page,
        pageSize: this.size
      }).then((response) => {
        this.tableData = response.rows;
        this.total = response.total;
      });
    },
    reset() {
      this.pageSize = 10;
      this.pageCurrent = 1;
      this.form.keyValue = "";
      this.handleSearch();
    },
    handleAdd() {
      let ids = this.multipleSelection.map((res) => res.id).join(",");

      if (this.multipleSelection.length === 0) {
        this.$message({
          message: "请勾选要关联的用户组",
          type: "warning"
        });
        return false;
      }
      saveUserGroupRole({ roleId: this.roleId, groupIds: ids }).then((res) => {
        if (res.success) {
          this.$message({
            message: "关联成功",
            type: "success"
          });
          this.handleSearch();
          this.$emit("ok");
        } else {
          this.$message({
            message: "关联失败",
            type: "danger"
          });
        }
      });

      // let id = this.tableData.map(item => item.id);
      // this.$set(this.req, "roleId", this.roleId);
      // this.$set(this.req, "groupIds", id.join(","));
      // saveUserGroupRole(this.req).then(response => {
      //   if (response.rtnCode === 200) {
      //     this.msgSuccess("解除成功");
      //     this.isDrawer = false;
      //     this.getList();
      //   }
      // });
    },
    handleClose(done) {
      this.reset();
      done();
    }
  }
};
</script>

<style></style>
