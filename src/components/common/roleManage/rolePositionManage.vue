<template>
  <div style="display: inline-block; margin: 0 5px">
    <el-button
      icon="el-icon-s-management"
      type="primary"
      size="small"
      @click="showDialog"
    ></el-button>
    <el-dialog
      title="角色职位管理"
      :visible="dialogFlag"
      width="60%"
      @close="dialogFlag = false"
      :append-to-body="true"
    >
      <el-form :model="queryParams" ref="queryForm" :inline="true">
        <el-form-item label="职位名称">
          <el-input
            v-model="queryParams.name"
            placeholder="职位名称"
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
            @click="showDialog1"
            >角色选择职位</el-button
          >
        </el-form-item>
      </el-form>
      <div class="dTableWrap">
        <el-table :data="tableData" @selection-change="checkChange">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="职位名称" prop="name" />
          <el-table-column label="职位描述" prop="descrption" />
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
      title="角色选择职位"
      :visible="dialogFlag1"
      width="50%"
      @close="dialogFlag1 = false"
       :append-to-body="true"
    >
      <el-form :model="addPositonParams" :inline="true">
        <el-form-item label="职位名称">
          <el-input
            v-model="addPositonParams.name"
            placeholder="职位名称"
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
            @click="query1"
            >搜索</el-button
          >
          <el-button
            icon="el-icon-refresh"
            size="mini"
            @click="addPositonParams.name = ''"
            >重置</el-button
          >
          <el-button
            icon="el-icon-plus"
            size="mini"
            type="primary"
            @click="add1"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
      <div class="dTableWrap">
        <el-table :data="tableData1" @selection-change="checkChange1">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="职位名称" prop="name" />
          <el-table-column label="职位描述" prop="name" />
        </el-table>

        <el-pagination
          background
          layout="prev, pager, next"
          :total="total1"
          @current-change="pageChange1"
        >
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getStationListService,
  delPositionService,
  addPositionService,
  addPositionServiceById,
} from "@/api/authmanage/role";
export default {
  name: "rolePositionManage",
  data() {
    return {
      dialogFlag: false,
      dialogFlag1: false,
      queryParams: {
        pageNumber: 0,
        pageSize: 10,
        name: "",
        roleid: "",
      },
      delParams: {},
      addParams: {},
      addPositonParams: {
        pageNumber: 0,
        pageSize: 10,
        name: "",
      },
      tableData: [],
      tableData1:[],
      total: 0,
      total1:0
    };
  },
  props: ["scope"],
  methods: {
    showDialog() {
      this.dialogFlag = true;
      this.queryParams.roleid = this.scope.row.id;
      this.delParams.roleid = this.scope.row.id;
      this.addParams.roleid = this.scope.row.id;
      getStationListService(this.queryParams).then((response) => {
        console.log(response);
        this.total = response.total;
        this.tableData = response.rows;
      });
    },
    showDialog1() {
      this.dialogFlag1 = true;
      addPositionService(this.addPositonParams).then((response) => {
        this.total1 = response.total;
        this.tableData1 = response.rows;
      });
    },
    add1() {
      addPositionServiceById(this.addParams).then((response) => {
        if (response.success) {
          this.$message("添加成功");
          this.showDialog1 = false;
          getStationListService(this.queryParams).then((response) => {
            console.log(response);
            this.total = response.total;
            this.tableData = response.rows;
          });
        } else {
          this.$message("添加失败");
        }
      });
    },
    query() {
      getStationListService(this.queryParams).then((response) => {
        console.log(response);
        this.total = response.total;
        this.tableData = response.rows;
      });
    },
    query1() {
      addPositionService(this.addPositonParams).then((response) => {
        this.total1 = response.total;
        this.tableData1 = response.rows;
      });
    },
    del() {
      delPositionService(this.delParams).then((response) => {
        if (response.success) {
          this.$message("删除成功");
          getStationListService(this.queryParams).then((response) => {
            console.log(response);
            this.total = response.total;
            this.tableData = response.rows;
          });
        } else {
          this.$message("删除失败");
        }
      });
    },
    pageChange1() {},
    pageChange(){},
    checkChange(selectedList) {
      this.delParams.str = "";
      for (let i = 0; i < selectedList.length; i++) {
        if (i == selectedList.length - 1)
          this.delParams.str += selectedList[i].id;
        else this.delParams.str += selectedList[i].id + ",";
      }
    },
    checkChange1(selectedList) {
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
<style lang="scss">
.el-pagination {
  padding-top: 10px;
}
</style>
