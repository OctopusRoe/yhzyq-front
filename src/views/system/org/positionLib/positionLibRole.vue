<template>
  <el-dialog
    title="岗位已关联角色"
    :visible.sync="dialogVisible"
    width="800px"
    :before-close="handleClose"
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    class="dialog-common"
    style="margin-top: -3%"
  >
    <div>
      <el-row>
        <el-col :span="24">
          <el-form :inline="true" :model="queryParams" class="demo-form-inline">
            <el-form-item>
              <el-input
                v-model="queryParams.name"
                placeholder="角色名称"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="handleQuery"
                icon="el-icon-search"
                >查询</el-button
              >
              <el-button @click="resetQuery" icon="el-icon-refresh-right"
                >重置</el-button
              >
            </el-form-item>
            <el-form-item style="float: right">
              <span v-if="count !== 0" style="margin-right: 5px">
                <el-tag style="height: 37px"
                  ><div style="margin-top: 6px; font-size: 13px">
                    <i class="el-icon-warning"></i>已选择<span
                      >{{ count }}项</span
                    >
                  </div></el-tag
                >
              </span>
              <el-button
                type="primary"
                @click="handleAdd"
                icon="el-icon-plus"
                style="margin-right: -5px"
                >添加角色</el-button
              >
              <el-button type="danger" @click="handleDel" icon="el-icon-minus"
                >移除角色</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
        <!-- <el-col :span="10">
          <div align="right">

          </div>
        </el-col> -->
      </el-row>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-top: 5px"
      @selection-change="handleSelectionChange"
      border
      height="536px"
    >
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column type="index" width="55" align="center" label="序号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="角色名称"
        minWidth="100"
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
    <positionLibRoleForm ref="positionLibRoleForm"></positionLibRoleForm>
  </el-dialog>
  <!-- <div class="app-container">
    <el-row>
      <el-col>
        <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="100px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="queryParams.name" placeholder="请输入角色名称" clearable size="small" style="width: 240px"
                      @keyup.enter.native="handleQuery"/>
          </el-form-item>
          <el-form-item>
            <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">查询</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            <el-button type="primary" icon="el-icon-minus" size="mini" @click="handleDel">移除角色
            </el-button>
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">添加角色
            </el-button>
          </el-form-item>
        </el-form>
        <vxe-grid ref="xTable" border resizable height="auto" :loading="loading"
                  :checkbox-config="{checkField:'roleTypeId'}"
                  :seq-config="{  startIndex: (tablePage.currentPage - 1) * tablePage.pageSize,  }"
                  :pager-config="tablePage" :columns="tableColumn" :data="tableData" @page-change="handlePageChange">
          <template v-slot:operate="{ row }">
          </template>
        </vxe-grid>
      </el-col>
    </el-row>
    <positionLibRoleForm ref="positionLibRoleForm"></positionLibRoleForm>
  </div> -->
</template>

<script>
import positionLibRoleForm from "@/views/system/org/positionLib/addPositionLibRole";
import {
  queryRoleByPositionLibId,
  deletePositionLibRole
} from "@/api/system/org/positionLib";

export default {
  name: "PositionLibRole",
  components: { positionLibRoleForm },
  // props: {
  //   id: {
  //     type: String,
  //     required: true
  //   }
  // },
  data() {
    return {
      id: "",
      dialogVisible: false,
      multipleSelection: [],
      count: 0,
      total: 0,
      pageSize: 10,
      pageCurrent: 1,
      loading: false,
      // tablePage: {
      //   total: 0,
      //   currentPage: 1,
      //   pageSize: 15,
      //   align: "left",
      //   pageSizes: [15, 30, 50, 100, 200, 500],
      //   layouts: [
      //     "Sizes",
      //     "PrevJump",
      //     "PrevPage",
      //     "Number",
      //     "NextPage",
      //     "NextJump",
      //     "FullJump",
      //     "Total"
      //   ],
      //   perfect: true
      // },
      // tableColumn: [
      //   { type: "checkbox", title: " ", width: 50, align: "center" },
      //   { field: "id", title: "角色id", visible: true },
      //   { field: "name", title: "角色名称" },
      //   { field: "roleTypeId", title: "角色类型", visible: false }
      // ],
      tableData: [],
      // 查询参数
      queryParams: {
        pageNumber: 1,
        pageSize: 10,
        positionLibId: "",
        name: ""
      }
    };
  },
  // watch: {
  //   id(val) {
  //     this.queryParams.positionLibId = val;
  //     this.searchPage();
  //   }
  // },
  // created() {
  //   this.searchPage();
  // },
  methods: {
    showModal(data) {
      console.log(data);
      this.id = data.id;
      this.queryParams.positionLibId = data.id;
      this.searchPage();
      this.dialogVisible = true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.count = val.length;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.queryParams.pageSize = val;
      this.searchPage();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryParams.pageNumber = val;
      this.searchPage();
    },
    handlePageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage;
      this.tablePage.pageSize = pageSize;
      this.queryParams.pageSize = pageSize;
      this.queryParams.pageNumber = currentPage;
      this.searchPage();
    },
    /** 查询列表 */
    searchPage() {
      console.log(this.queryParams.id);
      queryRoleByPositionLibId({
        id: this.queryParams.positionLibId,
        keyValue: this.queryParams.name,
        pageNo: this.queryParams.pageNumber,
        pageSize: this.queryParams.pageSize
      }).then((res) => {
        console.log(res);
        this.tableData = res.rows;
        // this.tablePage.total = res.total;
        this.total = res.total;
        // this.tableData.forEach(item => {
        //   item.roleTypeId = item.roleTypeId === "checked";
        // });
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.searchPage();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.pageSize = 10;
      this.pageCurrent = 1;
      this.queryParams = {
        pageNumber: 1,
        pageSize: 10,
        positionLibId: this.id,
        name: ""
      };
      this.searchPage();
    },
    handleDel() {
      // let selectedArray = this.$refs.xTable.getCheckboxRecords();
      let ids = this.multipleSelection.map((res) => res.id).join(",");

      if (this.multipleSelection.length === 0) {
        this.$message({
          message: "请勾选要解除关联的用户",
          type: "warning"
        });
        return false;
      }
      // if (selectedArray.length > 0) {
      // let ids = [];
      // selectedArray.forEach(item => {
      //   ids.push(item.id);
      // });
      deletePositionLibRole({ positionLibId: this.id, roleIds: ids }).then(
        (res) => {
          if (res.success) {
            this.msgSuccess("移除成功");
            this.searchPage();
          } else {
            this.msgError(res.msg);
          }
        }
      );
      // } else {
      //   this.msgError("请选择用户");
      // }
    },
    handleAdd() {
      this.$refs.positionLibRoleForm.showModal(this.id);
    },
    handleClose(done) {
      this.resetQuery();
      done();
    }
  }
};
</script>
