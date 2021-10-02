<template>
  <el-dialog
    title="角色已关联用户组"
    :visible.sync="groupShow"
    width="50%"
    :before-close="handleClose"
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :id="roleId"
    class="dialog-common"
    style="margin-top: -3%"
  >
    <div>
      <el-row>
        <el-col :span="14">
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
        <el-col :span="10">
          <div align="right">
            <el-button
              type="primary"
              @click="handleAdd"
              icon="el-icon-plus"
              style="margin-left: 10px"
              >关联用户组</el-button
            >
            <el-button type="danger" @click="handleDelete" icon="el-icon-minus"
              >解除关联</el-button
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
      style="width: 100%; margin-top: 5px"
      border
      height="536px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column
        type="index"
        width="55"
        align="center"
        label="序号"
      ></el-table-column>
      <el-table-column prop="name" label="名称" minWidth="100" align="center">
      </el-table-column>
      <el-table-column
        prop="descrption"
        label="描述"
        minWidth="200"
        align="center"
      >
      </el-table-column>

      <!--        <el-table-column prop="roleType" label="角色类型" width="150" align="center">-->
      <!--        </el-table-column>-->
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
    <allUserGroupForm
      ref="allUserGroupForm"
      @ok="getUserByGroupId"
    ></allUserGroupForm>
  </el-dialog>
</template>

<script>
import allUserGroupForm from "./allUserGroupForm";
import { queryGroupByRoleId, deleteUserGroupRole } from "@/api/system/role";
export default {
  data() {
    return {
      pageSize: 10,
      pageCurrent: 1,
      total: 0,
      showType: false,
      multipleSelection: [],
      count: 0,
      title: "",
      page: 1,
      size: 10,
      roleId: "",
      groupShow: false,
      form: {
        keyValue: ""
      },
      req: {
        roleId: "",
        userIds: []
      },
      tableData: []
    };
  },
  components: {
    allUserGroupForm
  },
  methods: {
    showModal(data) {
      this.roleId = data.id;
      this.getUserByGroupId();
      this.groupShow = true;
    },
    handleSizeChange(val) {
      this.size = val;
      this.getUserByGroupId();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getUserByGroupId();
    },
    handleSearch() {
      this.getUserByGroupId();
    },
    reset() {
      this.pageSize = 10;
      this.pageCurrent = 1;
      this.form.keyValue = "";
      this.getUserByGroupId();
    },
    handleAdd() {
      console.log(this.roleId);
      this.$refs.allUserGroupForm.showModal(this.roleId);
    },
    handleDelete() {
      let ids = this.multipleSelection.map((res) => res.id).join(",");

      if (this.multipleSelection.length === 0) {
        this.$message({
          message: "请勾选要解除关联的用户",
          type: "warning"
        });
        return false;
      }

      deleteUserGroupRole({ roleId: this.roleId, groupIds: ids }).then(
        (res) => {
          if (res.success) {
            this.$message({
              message: "解除成功",
              type: "success"
            });
            this.getUserByGroupId();
          } else {
            this.$message({
              message: "解除失败",
              type: "danger"
            });
          }
        }
      );

      // deleteUserGroupRole(this.req).then(response => {
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
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.count = val.length;
    },
    getUserByGroupId() {
      this.count = 0;
      queryGroupByRoleId({
        id: this.roleId,
        pageNo: this.page,
        pageSize: this.size,
        keyValue: this.form.keyValue
      }).then((response) => {
        this.tableData = response.rows;
        this.total = response.total;
      });
    }
  }
  // filters: {
  //   stateFilter(data) {
  //     if (data === 1) {
  //       return `<el-tag>启用</el-tag>`;
  //     } else {
  //       return `<el-tag type="danger">禁用</el-tag>`;
  //     }
  //   }
  // }
};
</script>

<style></style>
