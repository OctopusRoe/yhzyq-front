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
            <el-form-item label="公众号名称" prop="name">
              <el-input
                v-model="queryParams.name"
                placeholder="请输入公众号名称"
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
          <div style="height: calc(100% - 70px)">
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
      <WechatAccountInput
        :refresh="refreshCount"
        @cancel="cancel"
        :id="currentId"
        :commonTypeId="queryParams.commonTypeId"
      >
      </WechatAccountInput>
    </el-dialog>
  </div>
</template>

<script>
import { getAccountPageData, delAccountById } from "@/api/system/msg/wechatAccount";
import WechatAccountInput from "@/views/system/msg/wechatAccount/input";

export default {
  name: "WechatAccount",
  components: { WechatAccountInput },
  data() {
    return {
      // 遮罩层
      loading: false,
      // 弹出层标题
      title: "新增",
      // 弹出层状态
      dialogOpen: false,
      currentId: undefined,
      refreshCount: 1,
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
        { field: "typename", title: "公众号名称" },
        { field: "code", title: "公众号编码" },
        { field: "appId", title: "公众号凭证" },
        { field: "appSecret", title: "凭证密钥" },
        { field: "originalId", title: "公众号原始编号" },
        { field: "token", title: "配置令牌" },
        { field: "wechatType", title: "公众号类型" },
        { field: "wechatTypeId", title: "公众号类型编码", visible: false },
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
        pageNumber: 1,
        pageSize: 15,
        name: undefined,
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
      getAccountPageData(this.queryParams).then((res) => {
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
      this.resetForm("queryForm");
      this.searchPage();
    },
    handleAdd() {
      this.currentId = undefined;
      this.title = "新增";
      this.refreshCount++;
      this.dialogOpen = true;
    },
    handleUpdate(row) {
      this.title = "编辑";
      this.currentId = row.id;
      this.refreshCount++;
      this.dialogOpen = true;
    },
    handleDelete(row) {
      this.$confirm("是否确认删除该条记录?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return delAccountById(row.id);
        })
        .then(() => {
          this.searchPage();
          this.msgSuccess("删除成功");
        })
        .catch(function () {
          this.msgSuccess("删除成功");
        });
    },
    cancel() {
      this.dialogOpen = false;
      this.searchPage();
    },
  },
};
</script>

