<template>
  <el-dialog
    title="关联角色"
    :visible.sync="dialogVisible"
    width="800px"
    :before-close="handleClose"
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    class="dialog-common"
    style="margin-top: -3%"
  >
    <div class="el-dialog-div">
      <el-row>
        <el-col>
          <el-form
            :model="queryParams"
            ref="queryForm"
            :inline="true"
            label-width="100px"
          >
            <el-form-item label="" prop="name">
              <el-input
                v-model="queryParams.name"
                placeholder="角色名称"
                clearable
                style="width: +240px"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                icon="el-icon-search"
                @click="handleQuery"
                >查询</el-button
              >
              <el-button icon="el-icon-refresh-right" @click="resetQuery"
                >重置</el-button
              >
            </el-form-item>
            <el-form-item style="float: right">
              <el-button type="primary" icon="el-icon-plus" @click="handleAdd"
                >添加
              </el-button>
            </el-form-item>
          </el-form>
          <vxe-grid
            ref="xTable"
            border
            resizable
            height="576px"
            :loading="loading"
            :checkbox-config="{ checkField: 'roleTypeId' }"
            :seq-config="{
              startIndex: (tablePage.currentPage - 1) * tablePage.pageSize
            }"
            :pager-config="tablePage"
            :columns="tableColumn"
            :data="tableData"
            @page-change="handlePageChange"
          >
            <!-- <template v-slot:operate="{ row }"> </template> -->
          </vxe-grid>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import {
  queryNewRoleByPositionLibId,
  savePositionLibRole
} from "@/api/system/org/positionLib";

export default {
  name: "OrgRole",
  components: {},
  // props: {
  //   id: {
  //     type: String,
  //     required: true
  //   }
  // },
  data() {
    return {
      id: "",
      loading: false,
      dialogVisible: false,
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        align: "right",
        pageSizes: [10, 20, 50, 100, 200, 500],
        layouts: [
          "Total",
          "Sizes",
          "PrevPage",
          "Number",
          "NextPage",
          "FullJump"
        ],
        perfect: true
      },
      tableColumn: [
        { type: "checkbox", title: " ", width: 55, align: "center" },
        { type: "seq", title: "序号", width: 60, align: "center" },
        // { field: "id", title: "角色id", visible: true },
        { field: "name", title: "角色名称", align: "center" }
        // { field: "roleTypeId", title: "角色类型", visible: false }
      ],
      tableData: [],
      // 查询参数
      queryParams: {
        pageNumber: 1,
        pageSize: 10,
        positionLibId: this.id,
        name: ""
      }
    };
  },
  watch: {
    id(val) {
      this.queryParams.positionLibId = val;
      this.searchPage();
    }
  },
  created() {},
  methods: {
    handlePageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage;
      this.tablePage.pageSize = pageSize;
      this.queryParams.pageSize = pageSize;
      this.queryParams.pageNumber = currentPage;
      this.searchPage();
    },
    /** 查询列表 */
    searchPage() {
      queryNewRoleByPositionLibId({
        id: this.queryParams.positionLibId,
        keyValue: this.queryParams.name,
        pageNo: this.queryParams.pageNumber,
        pageSize: this.queryParams.pageSize
      }).then((res) => {
        console.log(res);
        this.tableData = res.rows;
        this.tablePage.total = res.total;
        this.tableData.forEach((item) => {
          item.roleTypeId = item.roleTypeId === "checked";
        });
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.searchPage();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams = {
        pageNumber: 1,
        pageSize: 10,
        positionLibId: this.id,
        name: ""
      };
      this.tablePage.currentPage = 1;
      this.tablePage.pageSize = 10;
      this.searchPage();
    },
    handleAdd() {
      let selectedArray = this.$refs.xTable.getCheckboxRecords();
      if (selectedArray.length > 0) {
        let ids = [];
        selectedArray.forEach((item) => {
          ids.push(item.id);
        });
        console.log(this.id);
        console.log(ids.join(","));
        savePositionLibRole({
          positionLibId: this.id,
          roleIds: ids.join(",")
        }).then((res) => {
          if (res.success) {
            this.msgSuccess("保存成功");
            this.searchPage();
          } else {
            this.msgError(res.msg);
          }
        });
      } else {
        this.msgError("请选择角色");
      }
    },
    showModal(positionLibId) {
      console.log(positionLibId);
      this.id = positionLibId;
      this.handleQuery();
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.resetQuery();
      done();
    }
  }
};
</script>

<style scoped>
/* .el-dialog-div {
  height: 66vh;
  overflow: auto;
} */
</style>
