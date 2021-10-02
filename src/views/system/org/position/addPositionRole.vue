<template>
  <el-dialog
    title="关联角色"
    :visible.sync="dialogVisible"
    width="800px"
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="handleClose"
    class="dialog-common"
    style="margin-top: -3%"
  >
    <div>
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
                placeholder="请输入角色名称"
                clearable
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
              <el-button
                icon="el-icon-refresh"
                @click="resetQuery"
                style="margin-left: 5px"
                >重置</el-button
              >
            </el-form-item>
            <el-form-item style="float: right">
              <el-button
                type="primary"
                icon="el-icon-plus"
                @click="handleAdd"
                style="margin-right: -10px"
                >关联到岗位
              </el-button>
            </el-form-item>
          </el-form>
          <div style="margin-bottom: 5px">
            <el-tag style="width: 100%; height: 36px"
              ><div style="margin-top: 6px; font-size: 13px">
                <i class="el-icon-warning"></i>已选择<span>{{ count }}项</span>
              </div></el-tag
            >
          </div>
          <vxe-grid
            ref="xTable"
            border
            resizable
            height="452px"
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
          </vxe-grid>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import {
  queryNewRoleByPositionId,
  savePositionRole
} from "@/api/system/org/position";

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
      loading: false,
      dialogVisible: false,
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        align: "right",
        pageSizes: [10, 20, 50, 100, 200, 500],
        layouts: [
          "Sizes",
          // "PrevJump",
          "PrevPage",
          "Number",
          "NextPage",
          // "NextJump",
          "FullJump",
          "Total"
        ],
        perfect: true
      },
      tableColumn: [
        { type: "checkbox", title: " ", width: 50, align: "center" },
        { type: "seq", title: "序号", width: 60 },
        // { field: "id", title: "角色id", visible: true },
        { field: "name", title: "角色名称" },
        { field: "roleTypeId", title: "角色类型", visible: false }
      ],
      tableData: [],
      // 查询参数
      queryParams: {
        pageNumber: 1,
        pageSize: 10,
        positionId: this.id,
        name: ""
      },
      countd: 0
    };
  },
  watch: {
    id(val) {
      this.queryParams.positionId = val;
      this.searchPage();
    }
  },
  created() {},
  methods: {
    handleClose(done) {
      this.resetQuery();
      done();
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
      this.count = 0;
      queryNewRoleByPositionId({
        id: this.queryParams.positionId,
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
        positionId: this.id,
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
        savePositionRole({ positionId: this.id, roleIds: ids.join(",") }).then(
          (res) => {
            if (res.success) {
              this.msgSuccess("保存成功");
              this.searchPage();
              this.$emit("cancel");
            } else {
              this.msgError(res.msg);
            }
          }
        );
      } else {
        this.msgError("请选择角色");
      }
    },
    showModal(positionId) {
      console.log(positionId);
      this.id = positionId;
      this.queryParams.positionId = positionId;
      this.handleQuery();
      this.dialogVisible = true;
    }
  }
};
</script>

<style scoped>
.el-dialog-div {
  height: 60vh;
  overflow: auto;
}
</style>
