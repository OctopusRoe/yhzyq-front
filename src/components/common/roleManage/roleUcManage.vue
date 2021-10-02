<template>
  <div style="display: inline-block; margin: 0 5px">
    <el-button
      icon="el-icon-s-check"
      type="primary"
      size="small"
      @click="showDialog"
    ></el-button>

    <el-dialog
      title="角色用户管理"
      :visible="dialogFlag"
      width="60%"
      @close="dialogFlag = false"
      :append-to-body="true"
    >
      <el-form :model="queryParams" ref="queryForm" :inline="true">
        <el-form-item label="用户姓名">
          <el-input
            v-model="queryParams.name"
            placeholder="名称"
            clearable
            size="small"
            style="width: 190px"
          />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input
            v-model="queryParams.mobileNum"
            placeholder="请输入手机号码"
            clearable
            size="small"
            style="width: 190px"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="cyan"
            icon="el-icon-search"
            size="mini"
            @click="query"
            >搜索</el-button
          >
          <el-button
            icon="el-icon-refresh"
            size="mini"
            @click="
              queryParams.mobileNum = '';
              queryParams.name = '';
            "
            >重置</el-button
          >
          <el-button icon="el-icon-refresh" size="mini" @click="del"
            >删除</el-button
          >
          <el-button
            icon="el-icon-plus"
            size="mini"
            type="primary"
            @click="selectUser"
            >角色选择用户</el-button
          >
        </el-form-item>
      </el-form>
      <div class="dTableWrap">
        <el-table :data="tableData" @selection-change="tableCheckChange">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="用户姓名" prop="name" />
          <el-table-column label="登录名" prop="loginName" />
          <el-table-column label="身份证号码" prop="cardNum" />
          <el-table-column label="手机号" prop="mobileNum" />
        </el-table>

        <el-pagination background layout="prev, pager, next" :total="total" @current-change="pageChange">
        </el-pagination>
      </div>
    </el-dialog>

    <el-dialog
      title="角色选择用户"
      :visible="userDialog"
      width="50%"
      @close="userDialog = false"
      :append-to-body="true"
    >
      <el-form :model="userParams" :inline="true">
        <el-form-item label="用户姓名">
          <el-input
            v-model="userParams.name"
            placeholder="用户姓名"
            clearable
            size="small"
            style="width: 190px"
          />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input
            v-model="userParams.mobileNum"
            placeholder="手机号码"
            clearable
            size="small"
            style="width: 190px"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="cyan"
            icon="el-icon-search"
            size="mini"
            @click="selectUser"
            >搜索</el-button
          >
          <el-button
            icon="el-icon-refresh"
            size="mini"
            @click="
              userParams.name = '';
              userParams.mobileNum = '';
            "
            >重置</el-button
          >
          <el-button icon="el-icon-plus" size="mini" type="primary" @click="add"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
      <div class="dTableWrap">
        <el-table :data="userTableData"  @selection-change="addUserCheckChange">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="用户姓名" prop="name" />
          <el-table-column label="登录名" prop="loginName" />
          <el-table-column label="身份证号码" prop="cardNum" />
          <el-table-column label="手机号码" prop="mobileNum" />
        </el-table>

   
      <el-pagination background layout="prev, pager, next" :total="userTotal" @current-change="pageUserChange">
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  roleUserList,
  roleUserListDel,
  roleSelectUserDataSr,
  addUserList
} from "@/api/authmanage/role";
export default {
  name: "roleUcGroupManage",
  data() {
    return {
      dialogFlag: false,
      userDialog: false,
      userTableData:[],
      queryParams: {
        pageNumber: 0,
        pageSize: 10,
        name: "",
        mobileNum: "",
        roleid: "",
      },
      total: 0,
      userTotal: 0,
      userParams: { name: "", mobileNum: "" },
      tableData: [],
      checkParams: {},
      addUserCheckParams:{}
    };
  },
  props: ["scope"],
  methods: {
    showDialog() {
      this.dialogFlag = true;
      this.queryParams.pageNumber=1;
      this.userParams.pageNumber=1;
      this.queryParams.roleid = this.scope.row.id;
      this.checkParams.id = this.scope.row.id;
       this.addUserCheckParams.roleid = this.scope.row.id;
      roleUserList(this.queryParams).then((response) => {
        this.total = response.total;
        this.tableData = response.rows;
      });
    },
    query() {
      roleUserList(this.queryParams).then((response) => {
        this.total = response.total;
        this.tableData = response.rows;
      });
    },
    del() {
      roleUserListDel(this.checkParams).then((response) => {
        if (response.success) {
          this.$message("删除成功");
          this.query();
        } else {
          this.$message("删除失败");
        }
      });
    },
    tableCheckChange(selectedList) {
      this.checkParams.arr1 = "";
      for (let i = 0; i < selectedList.length; i++) {
        if (i == selectedList.length - 1)
          this.checkParams.arr1 += selectedList[i].id;
        else this.checkParams.arr1 += selectedList[i].id + ",";
      }
    },
    selectUser() {
      this.userDialog = true;
      this.userParams.pageNumber = 0;
      this.userParams.pageSize = 10;
      this.userParams.roleid =  this.queryParams.roleid;
      this.userParams.ocuth = "data_org";
      roleSelectUserDataSr(this.userParams).then((response) => {
        this.userTableData = response.rows;
        this.userTotal = response.total;
      });
    },
    add() {
      addUserList(this.addUserCheckParams).then((response) => {
        if(response.success){
          this.$message("保存成功")
          this.userDialog=false;
          this.query();
        }
        else{
          this.$message("保存失败");
        }

      });

    },
    addUserCheckChange(selectedList){
      this.addUserCheckParams.arr1 = "";
      for (let i = 0; i < selectedList.length; i++) {
        if (i == selectedList.length - 1)
          this.addUserCheckParams.arr1 += selectedList[i].id;
        else this.addUserCheckParams.arr1 += selectedList[i].id + ",";
      }
    },
    pageChange(p){
      this.queryParams.pageNumber=p;
      this.query();
    },
    pageUserChange(p){
      this.userParams.pageNumber=p;
      roleSelectUserDataSr(this.userParams).then((response) => {
        this.userTableData = response.rows;
        this.userTotal = response.total;
      });
    }
  },
};
</script>
<style lang="scss">
.el-pagination{
  padding-top: 10px;
}
</style>
