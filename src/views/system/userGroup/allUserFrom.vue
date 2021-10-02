<template>
  <el-dialog
    title="关联用户"
    :visible.sync="dialogVisible"
    width="50%"
    class="dialog-common"
    :before-close="handleClose"
    :modal-append-to-body="false"
    :append-to-body="true"
  >
    <div>
      <el-row>
        <el-col :span="20">
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
        <el-col :span="4">
          <div align="right">
            <el-button type="primary" @click="handleAdd" icon="el-icon-plus"
              >添加</el-button
            >
          </div>
        </el-col>
      </el-row>
    </div>
    <el-table :data="tableData" border style="width: 100%;" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column prop="id" label="登录账号" width="100" align="center"  v-if="isShowId">
      </el-table-column>
      <el-table-column
        prop="loginName"
        label="登录账号"
        width="100"
        align="center"

      >
      </el-table-column>
      <el-table-column prop="name" label="真实姓名" width="100" align="center">
      </el-table-column>
      <el-table-column prop="userState" label="状态" width="70" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.State === USERSTATE_NORMAL ? 'success' : 'danger'"
            disable-transitions
            >{{ scope.row.State === USERSTATE_NORMAL ? "启用" : "禁用" }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="mobileNum"
        label="手机号码"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="position"
        label="职位"
        min-width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        min-width="150"
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
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </el-dialog>
</template>

<script>
import { queryNewUserGroup, saveUserGroup } from "@/api/system/role/role";

export default {
  data() {
    return {
      dialogVisible: false,
      isShowId:false,
      form: {
        keyValue: "",
      },
      page: 1,
      size: 10,
      groupId: "",
      req: {
        roleId: "",
        userIds: [],
      },
      total:0,
      multipleSelection: [],
      tableData: [
        {
          id: "",
          loginName: "",
          name: "",
          mobileNum: "",
          userState: "",
          position: "",
          remark: "",
        },
      ],
    };
  },
  methods: {
    showModal(groupId) {
      this.groupId = groupId;
      console.log("121", this.groupId);
      this.dialogVisible = true;
      this.handleSearch();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.count = val.length;
      console.log(val);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val;
      this.handleSearch();
      console.log(this.size);
    },
    created() {
      this.handleSearch();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.handleSearch();
      console.log(`当前页: ${val}`);
    },
    handleSearch() {
      queryNewUserGroup({
       id: this.groupId,
       keyValue: this.form.keyValue,
       pageNo: this.page,
       pageSize: this.size
      }
      ).then((response) => {
        this.tableData = response.rows;
        this.total = response.total;
      });
    },
    reset() {
      this.form.keyValue = "";
    },
    handleAdd() {
      console.log(this.tableData);
      let ids = this.multipleSelection.map((item) => item.id).join(",");
       if (this.multipleSelection.length === 0) {
        this.$message({
          message: "请勾选要添加的用户",
          type: "warning"
        });
        return false;
      }
      // let groupId=this.groupId;
      // this.$set(this.req,'groupId',groupId);
      // this.$set(this.req,'userIds',id.join(","));
      saveUserGroup({groupId:this.groupId,userIds:ids}).then((response) => {
        // if (response.rtnCode === 200) {
        //   this.msgSuccess("关联成功");
        //   this.isDrawer = false;
        //   this.getList();
        // }
        if (response.success) {
          this.$notify({
            title: "提示",
            message: "关联成功",
            type: "success",

          });
          this.$emit("ok");
          this.dialogVisible = false;
          this.handleSearch();
        } else {
          this.$notify({
            title: "提示",
            message: "关联失败",
            type: "danger",
          });
        }
      });
    },
    handleClose(done) {
      done();
    },
  },
};
</script>

<style></style>
