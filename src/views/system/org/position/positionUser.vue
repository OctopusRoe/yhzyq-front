<template>
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
              v-model="queryParams.keyValue"
              placeholder="真实姓名"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="handleQuery"
              >搜索</el-button
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
              style="margin-right: -5px"
              >关联用户
            </el-button>
            <el-button
              type="danger"
              icon="el-icon-minus"
              @click="handleRemove"
              style="margin-right: -10px"
              >解除关联
            </el-button>
          </el-form-item>
        </el-form>
        <div style="margin-bottom: 5px">
          <el-tag style="width: 100%;height:36px;"
            ><div style="margin-top: 6px;font-size: 13px;">
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
          :checkbox-config="{ checkField: 'checked' }"
          :seq-config="{
            startIndex: (tablePage.currentPage - 1) * tablePage.pageSize
          }"
          :pager-config="tablePage"
          :columns="tableColumn"
          :data="tableData"
          @page-change="handlePageChange"
          @checkbox-change="checkboxChangeEvent"
          @checkbox-all="checkboxChangeEvent"
        >
        </vxe-grid>
        <addPositionUser
          ref="addPositionUser"
          @refresh="searchPage"
        ></addPositionUser>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getPositionUserPageData,
  savePositionUser,
  boundUser,
  deletePositionUser
} from "@/api/system/org/positionUser";
import addPositionUser from "./addPositionUser";

export default {
  name: "OrgPositionUser",
  components: {
    addPositionUser
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      count: 0,
      loading: false,
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
        // { field: "id", title: "主键", visible: false },
        { type: "seq", title: "序号", width: 60, align: "center" },
        { field: "loginName", title: "登录账号", align: "center" },
        { field: "name", title: "真实姓名", align: "center" },
        // { field: "cardNum", title: "身份证号码", align: "center" },
        { field: "mobileNum", title: "手机号码", align: "center" }
      ],
      tableData: [],
      // 查询参数
      queryParams: {
        pageNumber: 1,
        pageSize: 10,
        positionId: this.id,
        keyValue: ""
      }
    };
  },
  watch: {
    id(val) {
      this.queryParams.positionId = val;
      this.searchPage();
    }
  },
  created() {
    this.searchPage();
  },
  methods: {
    checkboxChangeEvent({ records }) {
      this.count = records.length;
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
      boundUser(this.queryParams).then(res => {
        this.tableData = res.rows;
        this.tablePage.total = res.total;
      });
      // getPositionUserPageData(this.queryParams).then(res => {
      //   this.tableData = res.rows;
      //   this.tablePage.total = res.total;
      //   this.tableData.forEach(item => {
      //     item.checked = item.checked === "checked";
      //   });
      // });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNumber = 1;
      this.searchPage();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams = {
        pageNumber: 1,
        pageSize: 10,
        positionId: this.id,
        keyValue: ""
      };
      this.searchPage();
    },
    handleRemove() {
      let userIds = this.$refs.xTable
        .getCheckboxRecords()
        .map(item => item.id)
        .join(",");
      let positionId = this.id;
      deletePositionUser({ positionId, userIds }).then(res => {
        if (res.success) {
          this.$message({
            message: "解除成功",
            type: "success"
          });
          this.searchPage();
        } else {
          this.$message({
            message: "删除失败",
            type: "warning"
          });
        }
      });
    },
    handleAdd() {
      this.$refs.addPositionUser.showModal(this.id);
      // let selectedArray = this.$refs.xTable.getCheckboxRecords();
      // if (selectedArray.length > 0) {
      //   let ids = [];
      //   selectedArray.forEach(item => {
      //     ids.push(item.id);
      //   });
      //   savePositionUser({ arr1: ids.join(","), roleid: this.id }).then(res => {
      //     if (res.success) {
      //       this.msgSuccess("保存成功");
      //       this.searchPage();
      //     } else {
      //       this.msgError(res.msg);
      //     }
      //   });
      // } else {
      //   this.msgError("请选择用户");
      // }
    }
  }
};
</script>
