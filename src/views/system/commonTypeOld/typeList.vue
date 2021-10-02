<template>
  <div class="app-container">
    <div class="height100 pd10">
      <el-row>
        <!--列表-->
        <el-col>
          <el-form
            :model="queryParams"
            ref="queryForm"
            :inline="true"
            label-width="100px"
          >
            <el-form-item label="通用类别名称" prop="name">
              <el-input
                v-model="queryParams.name"
                placeholder="请输入通用类别名称"
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
            </el-form-item>
          </el-form>
          <div style="height: calc(100% - 60px)">
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
                  icon="el-icon-edit"
                  circle
                  @click="handleUpdate(row)"
                />
              </template>
            </vxe-grid>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getDictPageData } from "@/api/system/newDict";

export default {
  name: "CommonTypeList",
  components: {},
  data() {
    return {
      // 遮罩层
      loading: false,
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
        { field: "id", title: "通用类别编码" },
        { field: "name", title: "通用类别名称" },
        { field: "sortOrder", title: "排序号", align: "center", width: 80 },
        {
          title: "操作",
          width: 120,
          align: "center",
          slots: { default: "operate" },
        },
      ],
      tableData: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 15,
        name: undefined,
        dictType: {
          id: "COMMYPECLASS",
        },
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
      this.queryParams.pageNum = currentPage;
      this.searchPage();
    },
    /** 查询列表 */
    searchPage() {
      getDictPageData(this.queryParams).then((res) => {
        this.tableData = res.rows;
        this.tablePage.total = res.total;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.searchPage();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 15,
        name: undefined,
        dictType: {
          id: "COMMYPECLASS",
        },
      };
      this.searchPage();
    },
    handleUpdate(row) {
      this.$router.push({ path: "/commonType/index", query: { id: row.id } });
    },
    cancel() {
      this.dialogOpen = false;
      this.searchPage();
    },
  },
};
</script>

