<template>
  <div class="app-container">
    <div class="height100">
      <el-row>
        <el-col>
          <el-form
            :model="queryParams"
            ref="queryForm"
            :inline="true"
            label-width="100px"
          >
            <el-form-item label="公司名称" prop="name">
              <el-input
                v-model="queryParams.name"
                placeholder="请输入公司名称"
                clearable
                size="small"
                style="width: 240px"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="分类编码" prop="smallMark">
              <el-input
                v-model="queryParams.smallMark"
                placeholder="请输入分类编码"
                clearable
                size="small"
                style="width: 240px"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="cyan"
                icon="el-icon-search"
                size="mini"
                @click="handleQuery"
                >搜索</el-button
              >
              <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
                >重置</el-button
              >
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="mini"
                @click="handleAdd"
                >新增
              </el-button>
            </el-form-item>
          </el-form>
          <div style="height:calc(100% - 70px)">
            <vxe-grid
              ref="xTable"
              border
              resizable
              height="auto"
              :loading="loading"
              :seq-config="{
                startIndex: (tablePage.currentPage - 1) * tablePage.pageSize,
              }"
              :pager-config="tablePage"
              :columns="tableColumn"
              :data="tableData"
              @page-change="handlePageChange"
            >
              <template v-slot:operate="{ row }">
                <el-button
                  type="primary"
                  icon="el-icon-view"
                  circle
                  @click="handleView(row)"
                />
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="handleUpdate(row)"
                />
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="handleDelete(row)"
                />
              </template>
            </vxe-grid>
          </div>
        </el-col>
      </el-row>
    </div>

    <!--新增或编辑的弹框-->
    <el-dialog :title="title" :visible.sync="dialogOpen" width="40%">
      <OrgInput
        @cancel="cancel"
        :id="currentId"
        :systemMark="0"
        :dictTypeId="queryParams.dictType.id"
      >
      </OrgInput>
    </el-dialog>
  </div>
</template>

<script>
import { delDict, getDictPageData } from "@/api/system/newDict";
import OrgInput from "@/views/system/org/multiOrgManager/input";

export default {
  name: "SystemConfig",
  components: { OrgInput },
  data() {
    return {
      // 遮罩层
      loading: false,
      // 弹出层标题
      title: "新增",
      // 弹出层状态
      dialogOpen: false,
      currentId: undefined,
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 15,
        align: "left",
        pageSizes: [15, 30, 50, 100, 200, 500],
        layouts: [
          "Sizes",
          "PrevJump",
          "PrevPage",
          "Number",
          "NextPage",
          "NextJump",
          "FullJump",
          "Total",
        ],
        perfect: true,
      },
      tableColumn: [
        { type: "seq", title: " ", width: 50, align: "center" },
        { field: "id", title: "主键", visible: false },
        { field: "name", title: "公司名称" },
        { field: "code", title: "公司编码" },
        { field: "vals", title: "公司负责人" },
        { field: "smallMark", title: "分类编码" },
        { field: "dictType.name", title: "公司类别名称" },
        {
          title: "操作",
          width: 160,
          align: "center",
          slots: { default: "operate" },
        },
      ],
      tableData: [],
      // 查询参数
      queryParams: {
        pageNumber: 1,
        pageSize: 15,
        smallMark: undefined,
        name: undefined,
        dictType: { id: "INSTITUTIONS" },
      },
    };
  },
  watch: {},
  created() {
    this.searchPage();
  },
  methods: {
    handlePageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage;
      this.tablePage.pageSize = pageSize;
      this.queryParams.pageSize = pageSize;
      this.queryParams.pageNumber = currentPage;
      this.searchPage();
    },
    /** 查询列表 */
    searchPage(commonTypeId) {
      getDictPageData(this.queryParams).then((res) => {
        this.tableData = res.rows;
        this.tablePage.total = res.total;
      });
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
        pageSize: 15,
        smallMark: undefined,
        name: undefined,
        dictType: { id: "INSTITUTIONS" },
      };
      this.searchPage();
    },
    handleDelete(row) {
      this.$confirm("是否确认删除该条记录?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return delDict(row.id);
        })
        .then(() => {
          this.searchPage();
          this.msgSuccess("删除成功");
        })
        .catch(function () {
          this.msgSuccess("删除成功");
        });
    },
    handleView(row) {
      this.$router.push({ path: "/orgManager/index", query: { type: row.id } });
    },
    handleUpdate(row) {
      this.title = "编辑";
      this.currentId = row.id;
      this.dialogOpen = true;
    },
    handleAdd() {
      this.title = "新增";
      this.currentId = undefined;
      this.dialogOpen = true;
    },
    cancel() {
      this.dialogOpen = false;
      this.searchPage();
    },
  },
};
</script>

