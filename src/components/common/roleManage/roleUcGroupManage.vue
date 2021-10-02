<template>
  <div style="display:inline-block;margin:0 5px">
    <el-button
      icon="el-icon-user"
      type="primary"
      size="small"
      @click="showDialog"
    ></el-button>
    <el-dialog
      title="角色用户组管理"
      :visible="dialogFlag"
      width="60%"
      @close="dialogFlag = false"
      :append-to-body="true"
    >
      <el-form :model="queryParams" ref="queryForm" :inline="true">
        <el-form-item label="用户组名称">
          <el-input
            v-model="queryParams.name"
            placeholder="名称"
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
            @click="queryParams.name = ''"
            >重置</el-button
          >
          <el-button icon="el-icon-refresh" size="mini" @click="del">删除</el-button>
          <el-button icon="el-icon-plus" size="mini" type="primary" @click="showSelectDialog"
            >角色选择用户组</el-button
          >
        </el-form-item>
      </el-form>
      <div class="dTableWrap">
        <el-table   :data="tableData"   @selection-change="checkChange">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="用户组名称" prop="name" />
          <el-table-column label="用户组描述" prop="descrption" />
        </el-table>

        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.pageNumber"
          :limit.sync="queryParams.pageSize"
        />
      </div>
    </el-dialog>


       <el-dialog
      title="角色选择用户组"
      :visible="selectDialogFlag"
      width="50%"
      @close="selectDialogFlag = false"
      :append-to-body="true"
    >
      <el-form :model="selectParams" :inline="true">
        <el-form-item label="用户组名称">
          <el-input
            v-model="selectParams.name"
            placeholder="用户组名称"
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
            @click="queryGroup"
            >搜索</el-button
          >
          <el-button
            icon="el-icon-refresh"
            size="mini"
            @click="selectParams.name = ''"
            >重置</el-button
          >
          <el-button
            icon="el-icon-plus"
            size="mini"
            type="primary"
            @click="addGroup"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
      <div class="dTableWrap">
        <el-table
          :data="addGroupTableData"
          @selection-change="addGroupCheckChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="用户组名称" prop="posId" />
          <el-table-column label="用户组描述" prop="name" />
        </el-table>

        <el-pagination
          background
          layout="prev, pager, next"
          :total="addGroupTableTotal"
          @current-change="addGroupChange"
        >
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getUcGroup,delRoleGroup,getRoleGroupList,addGroupList } from "@/api/authmanage/role";
export default {
  name: "roleUcGroupManage",
  data() {
    return {
      dialogFlag: false,
      selectDialogFlag:false,
      queryParams: {
        pageNumber: 1,
        pageSize: 20,
        name: "",
        descrption: "",
        roleid: "",
      },
      total: 0,
      tableData: [],
      addGroupTableTotal:0,
      delParams:{},
      selectParams:{"pageNumber":0,"pageSize":10,"name":"","descrption":""},
      addGroupTableData:[],
      addParams:{}
    };
  },
  props: ["scope"],
  methods: {
    //搜索
    // manageGroupQuery() {
    //   getUcGroup(this.getUcGroupParams).then((response) => {
    //     console.log(response);
    //     this.ucGroupTableData = response.rows;
    //     this.ucGroupTableDataTotal = response.total;
    //   });
    // },
    showDialog() {
      this.dialogFlag = true;
      this.queryParams.roleid = this.scope.row.id;
      this.addParams.roleid=this.scope.row.id;
      getUcGroup(this.queryParams).then((response) => {
        this.total = response.total;
        this.tableData = response.rows;
      });
    },
    query(){
      getUcGroup(this.queryParams).then((response) => {
        this.total = response.total;
        this.tableData = response.rows;
      });
    },
    queryGroup(){
       getRoleGroupList(this.selectParams).then((response)=>{
        console.log(response);
        this.addGroupTableData=response.rows;
        this.addGroupTableTotal=response.total;
      })
    },
    del(){
      delRoleGroup(this.delParams).then((response)=>{
        console.log(response);
        if(response.success){
          this.$message("删除成功")
          getUcGroup(this.queryParams).then((response) => {
        this.total = response.total;
        this.tableData = response.rows;
      });
        }
        else{
          this.$message("删除失败");
        }
      })
    },
    checkChange(selectedList){
      this.delParams.str = "";
      for (let i = 0; i < selectedList.length; i++) {
        if (i == selectedList.length - 1)
          this.delParams.str += selectedList[i].id;
        else this.delParams.str += selectedList[i].id + ",";
      }
    },
    addGroupChange(pageIndex){
      this.selectParams.pageNumber=pageIndex;
    },
    showSelectDialog(){
      this.selectDialogFlag=true;
      getRoleGroupList(this.selectParams).then((response)=>{
        console.log(response);
        this.addGroupTableData=response.rows;
        this.addGroupTableTotal=response.total;
      })
    },
    addGroup(){
      addGroupList(this.addParams).then((response)=>{
        console.log(response);
        if(response.success){
          this.$message("添加成功");
          this.selectDialogFlag=false;
          getUcGroup(this.queryParams).then((response) => {
        this.total = response.total;
        this.tableData = response.rows;
      });
        }
        else{
          this.$message("添加失败");
        }
      })
    },
    addGroupCheckChange(selectedList) {
      this.addParams.str = "";
      for (let i = 0; i < selectedList.length; i++) {
        if (i == selectedList.length - 1)
          this.addParams.str += selectedList[i].id;
        else this.addParams.str += selectedList[i].id + ",";
      }
    },
  },
};
</script>
