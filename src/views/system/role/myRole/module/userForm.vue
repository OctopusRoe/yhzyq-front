<template>
  <el-dialog
    title="角色已关联用户"
    :visible.sync="dialogVisible"
    width="1000px"
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
                placeholder="真实姓名"
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
              >关联新用户</el-button
            >
            <el-button type="danger" @click="handleDelete" icon="el-icon-minus"
              >解除关联</el-button
            >
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="margin-bottom: 5px; margin-top: -20px">
      <el-tag style="width: 100%; height: 36px"
        ><div style="margin-top: 6px; font-size: 13px">
          <i class="el-icon-warning"></i>已选择<span>{{ count }}项</span>
        </div></el-tag
      >
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      border
      height="536px"
    >
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column type="index" width="55" align="center" label="序号">
      </el-table-column>
      <el-table-column
        prop="id"
        label="id"
        width="100"
        align="center"
        v-if="idShow"
      >
      </el-table-column>
      <el-table-column
        prop="loginName"
        label="登录账号"
        minWidth="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="真实姓名"
        minWidth="100"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="userState" label="状态" width="100" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="
              scope.row.userState === 'USERSTATE_NORMAL' ? 'success' : 'danger'
            "
            disable-transitions
            >{{
              scope.row.userState === "USERSTATE_NORMAL" ? "启用" : "禁用"
            }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="mobileNum"
        label="手机号码"
        minWidth="150"
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
    <allUserForm ref="allUserForm" @ok="getUserByRoleId"></allUserForm>
  </el-dialog>
</template>

<script>
import allUserForm from "./allUserForm";
import {
  queryUserByRoleId,
  deleteUserRole,
  saveRoleResource
} from "@/api/system/role";
export default {
  data() {
    return {
      pageSize: 10,
      pageCurrent: 1,
      total: 0,
      multipleSelection: [],
      count: 0,
      title: "",
      page: 1,
      size: 10,
      roleId: "",
      idShow: false,
      dialogVisible: false,
      form: {
        keyValue: ""
      },
      req: {
        roleId: "",
        userIds: []
      },
      tableData: [
        // {
        //   id: "",
        //   loginName: "",
        //   name: "",
        //   mobileNum: "",
        //   userState: ""
        // }
      ]
    };
  },
  components: {
    allUserForm
  },
  // created() {
  //   this.getUserByRoleId();
  // },
  methods: {
    showModal(data) {
      this.roleId = data.id;
      this.getUserByRoleId();
      this.dialogVisible = true;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val;
      this.getUserByRoleId();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getUserByRoleId();
    },
    handleSearch() {
      this.getUserByRoleId();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.count = val.length;
    },
    reset() {
      this.pageSize = 10;
      this.pageCurrent = 1;
      this.form.keyValue = "";
      this.getUserByRoleId();
    },
    // 查看未添加用户页面
    handleAdd() {
      this.$refs.allUserForm.showModal(this.roleId);
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

      deleteUserRole({ roleId: this.roleId, userIds: ids }).then((res) => {
        if (res.success) {
          this.$message({
            message: "解除成功",
            type: "success"
          });
          this.getUserByRoleId();
        } else {
          this.$message({
            message: "解除失败",
            type: "danger"
          });
        }
      });

      // deleteUserRole(this.req).then(response => {
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

    getUserByRoleId() {
      this.count = 0;
      queryUserByRoleId({
        id: this.roleId,
        keyValue: this.form.keyValue,
        pageNo: this.page,
        pageSize: this.size
      }).then((response) => {
        console.log(response);
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
