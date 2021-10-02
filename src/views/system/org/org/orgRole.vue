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
              v-model="queryParams.name"
              placeholder="请输入角色名称"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="handleQuery"
              >查询</el-button
            >
            <el-button icon="el-icon-refresh" @click="resetQuery"
              >重置</el-button
            >
          </el-form-item>
          <el-form-item style="float: right">
            <el-button
              type="primary"
              icon="el-icon-plus"
              @click="handleAdd"
              style="margin-right: -5px"
              >添加角色
            </el-button>
            <el-button
              type="danger"
              icon="el-icon-minus"
              @click="handleDel"
              style="margin-right: -10px"
              >移除角色
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
          height="576px"
          style="width: 100%"
          :loading="loading"
          :checkbox-config="{ checkField: 'roleTypeId' }"
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
          <!-- <template v-slot:operate="{ row }">
          </template> -->
        </vxe-grid>
      </el-col>
    </el-row>
    <orgRoleForm ref="orgRoleForm" @refresh="searchPage"></orgRoleForm>
  </div>
</template>

<script>
import { queryRoleByOrgId, deleteOrgRule } from "@/api/system/org/org";
import orgRoleForm from "@/views/system/org/org/addOrgRole";

export default {
  name: "OrgRole",
  components: { orgRoleForm },
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
      orgRoleExist: false,
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        align: "right",
        pageSizes: [10, 20, 50, 100, 200, 500],
        layouts: [
          "Sizes",
          "PrevPage",
          "Number",
          "NextPage",
          "FullJump",
          "Total"
        ],
        perfect: true
      },
      tableColumn: [
        { type: "checkbox", title: " ", width: 50, align: "center" },
        { type: "seq", title: "序号", width: 60, align: "center" },
        // { field: "id", title: "角色id", visible: true },
        { field: "name", title: "角色名称" },
        { field: "roleTypeId", title: "角色类型", visible: false }
      ],
      tableData: [],
      // 查询参数
      queryParams: {
        pageNumber: 1,
        pageSize: 10,
        orgId: this.id,
        name: ""
      }
    };
  },
  watch: {
    id(val) {
      this.queryParams.orgId = val;
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
      queryRoleByOrgId({
        id: this.queryParams.orgId,
        keyValue: this.queryParams.name,
        pageNo: this.queryParams.pageNumber,
        pageSize: this.queryParams.pageSize
      }).then((res) => {
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
        orgId: this.id,
        name: ""
      };
      this.searchPage();
    },
    handleDel() {
      let selectedArray = this.$refs.xTable.getCheckboxRecords();
      if (selectedArray.length > 0) {
        let ids = [];
        selectedArray.forEach((item) => {
          ids.push(item.id);
        });
        deleteOrgRule({ orgId: this.id, roleId: ids.join(",") }).then((res) => {
          if (res.success) {
            this.msgSuccess("保存成功");
            this.searchPage();
          } else {
            this.msgError(res.msg);
          }
        });
      } else {
        this.msgError("请选择用户");
      }
    },
    handleAdd() {
      this.$refs.orgRoleForm.showModal(this.id);
    }
  }
};
</script>
