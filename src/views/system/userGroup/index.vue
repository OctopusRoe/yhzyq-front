<template>
  <div class="app-container" style="padding-top: 10px">
    <div class="table-wrap">
      <el-form :model="queryParams" ref="queryForm" :inline="true">
        <div class="querybox">
          <el-form-item label="姓名" prop="name">
            <el-input
              v-model="queryParams.name"
              placeholder="请输入名称"
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
        v-loading="loading"
        :data="userGroupData"
        ref="userGroupTable"
        @selection-change="handleSelectionChange"
        :append-to-body="true"
        border
      >
        <vxe-table-column title="id" field="id" v-if="isShowId" align="center"></vxe-table-column>
        <vxe-table-column title="名称" field="name" align="center"></vxe-table-column>
        <vxe-table-column title="描述" field="descrption" align="center"></vxe-table-column>
        <vxe-table-column title="创建人" field="createUser" align="center"></vxe-table-column>
        <vxe-table-column title="创建时间" field="createTime" align="center"></vxe-table-column>
        <vxe-table-column
          title="操作"
          align="center"
          width="300"
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
              @click="handleAddUser(scope.row)"
              >关联用户</vxe-button
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
        :page.sync="queryParams.pageNumber"
        :limit.sync="queryParams.pageSize"
        @pagination="getUserGroupList"
        style="float: right; padding-right: 450px"
      />
    </div>
    <el-dialog
      title="增加用户组"
      :visible="userGroupDialogFlag"
      :append-to-body="true"
      width="40%"
      @close="userGroupDialogFlag = false"
    >
      <div class="usergroup">
        <div>
          <span>名称:</span>
          <div>
            <el-input
              v-model="addQueryParams.name"
              placeholder="请输入名称"
              clearable
              size="medium"
            />
          </div>
        </div>
        <div>
          <span>描述:</span>
          <div style="height: 100px">
            <el-input
              v-model="addQueryParams.descrption"
              type="textarea"
              size="medium "
              maxlength="50"
              show-word-limit
              placeholder="请输入描述"
              :autosize="{ minRows: 4, maxRows: 10 }"
            />
          </div>
        </div>
      </div>
      <div style="text-align: center; padding-top: 10px">
        <el-button type="primary" size="medium" @click="confirm"
          >提交</el-button
        >
        <el-button size="medium" @click="cancel">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="修改用户组"
      :visible="updateDialogFlag"
      width="40%"
      :append-to-body="true"
      @close="updateDialogFlag = false"
    >
      <div class="usergroup">
        <div>
          <span>名称:</span>
          <div>
            <el-input
              v-model="updateQueryParams.name"
              placeholder="请输入名称"
              clearable
              size="medium"
            />
          </div>
        </div>
        <div>
          <span>描述:</span>
          <div style="height: 100px">
            <el-input
              v-model="updateQueryParams.descrption"
              type="textarea"
              size="medium "
              maxlength="50"
              show-word-limit
              :autosize="{ minRows: 4, maxRows: 10 }"
              placeholder="请输入描述"
            />
          </div>
        </div>
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
    <userFrom ref="userFrom"></userFrom>
  </div>
</template>

<script>
import {
  userGroupList, 
  addUserGroup,
  getUserGroupById,
  deleteUserGroup,
} from "@/api/system/user/userGroup";
import userFrom from "./userFrom";
export default {
  name: "UserGroup",
  components: { userFrom },
  data() {
    return {
      isShowId: false,
      loading: true,
      userGroupDialogFlag: false,
      updateDialogFlag: false,
      manageDialogFlag: false,
      total: 0,
      multipleSelection: [],
      userGroupData: [],
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
    };
  },
  created() {
     this.getUserGroupList();
  },
  methods: {
    getUserGroupList() {
      this.loading = true;
      userGroupList(this.queryParams).then((response) => {
        this.loading = false;
        this.userGroupData = response.rows;
        this.total = response.total;
      });
    },
    confirm() {
      addUserGroup(this.addQueryParams).then((response) => {
        console.log(response);
        if (response.success) {
          this.$message("保存成功");
          this.userGroupDialogFlag = false;
          this.getUserGroupList();
        } else {
          this.$message("保存失败");
        }
      });
    },
    updateConfirm() {
      addUserGroup(this.updateQueryParams).then((response) => {
        console.log(response);
        if (response.success) {
          this.$message("保存成功");
          this.updateDialogFlag = false;
          this.getUserGroupList();
        } else {
          this.$message("保存失败");
        }
      });
    },
    updateUserGroup(index, row) {
      this.updateDialogFlag = true;
      getUserGroupById(row.id).then((response) => {
        if (response.success) {
          this.updateQueryParams.name = response.data.name;
          this.updateQueryParams.id = row.id;
          this.updateQueryParams.descrption = response.data.descrption;
        }
      });
    },
    deleteUserGroup(index, row) {
      this.$confirm("确定删除这条记录吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let ids = row.id;
          deleteUserGroup(ids).then((response) => {
            if (response.success) {
              this.$message("删除成功");
              this.getUserGroupList();
            } else {
              this.$message("删除失败");
            }
          });
        })
        .catch(() => {});
    },
    add() {
      this.userGroupDialogFlag = true;
    },
    query() {
      this.getUserGroupList();
    },
    reset() {
      this.queryParams.name = "";
    },
    cancel() {
      this.userGroupDialogFlag = false;
    },
    manageUserGroup(i, r) {
      this.manageDialogFlag = true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.count = val.length;
    },
    // 打开授权页面
    handleAddUser(row) {
      let groupId = { id: row.id };
      this.$refs.userFrom.showModal(groupId);
    },
  },
};
</script>
<style lang="scss" scoped>
.usergroup {
  textarea {
    height: 100% !important;
  }
  .el-textarea.el-input--medium {
    height: 100%;
  }
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
