<template>
  <div style="display: inline-block; margin: 0 5px">
    <el-button
      icon="el-icon-s-check"
      type="primary"
      size="small"
      @click="showDialog"
    ></el-button>

    <el-dialog
      title="角色岗位库管理"
      :visible="dialogFlag"
      width="60%"
      @close="dialogFlag = false"
      :append-to-body="true"
    >
      <el-form :model="queryParams" ref="queryForm" :inline="true">
        <el-form-item label="岗位名称">
          <el-input
            v-model="queryParams.name"
            placeholder="岗位名称"
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
          <el-button icon="el-icon-refresh" size="mini" @click="del"
            >删除</el-button
          >
          <el-button
            icon="el-icon-plus"
            size="mini"
            type="primary"
            @click="selectStation"
            >角色选择岗位库</el-button
          >
        </el-form-item>
      </el-form>
      <div class="dTableWrap">
        <el-table :data="tableData" @selection-change="tableCheckChange">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="岗位名称" prop="name" />
          <el-table-column label="岗位编码" prop="posId" />
        </el-table>
         <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="pageChange"
        >
        </el-pagination>
      </div>
    </el-dialog>

    <el-dialog
      title="角色选择岗位库"
      :visible="addStationDialog"
      width="50%"
      @close="addStationDialog = false"
      :append-to-body="true"
    >
      <el-form :model="addStationParams" :inline="true">
        <el-form-item label="岗位名称">
          <el-input
            v-model="addStationParams.name"
            placeholder="用户姓名"
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
            @click="queryStation"
            >搜索</el-button
          >
          <el-button
            icon="el-icon-refresh"
            size="mini"
            @click="addStationParams.name = ''"
            >重置</el-button
          >
          <el-button
            icon="el-icon-plus"
            size="mini"
            type="primary"
            @click="addStation"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
      <div class="dTableWrap">
        <el-table
          :data="addStationTableData"
          @selection-change="addStationCheckChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="岗位编码" prop="posId" />
          <el-table-column label="岗位名称" prop="name" />
        </el-table>

        <el-pagination
          background
          layout="prev, pager, next"
          :total="addStationTableTotal"
          @current-change="addStationChange"
        >
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getStationDb,
  delStationService,
  getAddStation,
  getAddStationDb,
} from "@/api/authmanage/role";
export default {
  name: "roleUcGroupManage",
  data() {
    return {
      dialogFlag: false,
      queryParams: {
        pageNumber: 0,
        pageSize: 10,
        name: "",
        roleid: "",
      },
      tableData: [],
      addStationTableData: [],
      total: 0,
      addStationTableTotal: 0,
      addStationDialog: false,
      checkParams: {},
      addStationParams: { pageNumber: 0, pageSize: 10, name: "", roleid: "" },
      addStationDbParams: {},
    };
  },
  props: ["scope"],
  methods: {
    showDialog() {
      this.dialogFlag = true;
      this.queryParams.roleid = this.scope.row.id;
      this.checkParams.roleid = this.scope.row.id;
      this.addStationDbParams.roleid = this.scope.row.id;
      this.addStationParams.roleid = this.scope.row.id;
      getStationDb(this.queryParams).then((respone) => {
        this.tableData = respone.rows;
        this.total = respone.total;
      });
    },
    query() {
      getStationDb(this.queryParams).then((respone) => {
        this.tableData = respone.rows;
        this.total = respone.total;
      });
    },
    queryStation() {
      getAddStation(this.addStationParams).then((respone) => {
        this.addStationTableData = respone.rows;
        this.addStationTableTotal = respone.total;
      });
    },
    del() {
      delStationService(this.checkParams).then((respone) => {
        if (respone.success) {
          this.$message("删除成功");
          getStationDb(this.queryParams).then((respone) => {
            this.tableData = respone.rows;
            this.total = respone.total;
          });
        } else {
          this.$message("删除失败");
        }
      });
    },
    tableCheckChange(selectedList) {
      this.checkParams.str = "";
      for (let i = 0; i < selectedList.length; i++) {
        if (i == selectedList.length - 1)
          this.checkParams.str += selectedList[i].id;
        else this.checkParams.str += selectedList[i].id + ",";
      }
    },
    selectStation() {
      this.addStationDialog = true;
      getAddStation(this.addStationParams).then((respone) => {
        this.addStationTableData = respone.rows;
        this.addStationTableTotal = respone.total;
      });
    },
    addStationCheckChange(selectedList) {
      this.addStationDbParams.str = "";
      for (let i = 0; i < selectedList.length; i++) {
        if (i == selectedList.length - 1)
          this.addStationDbParams.str += selectedList[i].id;
        else this.addStationDbParams.str += selectedList[i].id + ",";
      }
    },
    pageChange(){

    },
    addStationChange() {
      
    },
    addStation() {
      getAddStationDb(this.addStationDbParams).then((respone) => {
        if (respone.success) {
          this.$message("添加成功");
          this.addStationDialog = false;
          getStationDb(this.queryParams).then((respone) => {
            this.tableData = respone.rows;
          });
        } else {
          this.$message("添加失败");
        }
      });
    },
  },
};
</script>
<style lang="scss">
.el-pagination {
  padding-top: 10px;
}
</style>
