<template>
  <div class="app-container" style="padding: 0">
    <div class="height100">
      <el-row>
        <!--左树-->
        <el-col :span="4" :xs="24">
          <div class="bdr">
            <TreeEx
              :serviceMethods="treeSet.serviceMethods"
              :editable="false"
              @clickMethod="searchPage"
            ></TreeEx>
          </div>
        </el-col>
        <!--右列表-->
        <el-col :span="20" :xs="24">
          <div class="pd10 height100">
            <el-form
              :model="queryParams"
              ref="queryForm"
              :inline="true"
              label-width="100px"
            >
              <el-form-item label="所属机构" prop="orgId">
                <treeselect
                  v-model="queryParams.orgId"
                  style="width: 200px"
                  :options="orgOptions"
                  :normalizer="normalizer"
                  :show-count="true"
                  placeholder="请选择所属机构"
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
                <el-button
                  icon="el-icon-refresh"
                  size="mini"
                  @click="resetQuery"
                  >重置</el-button
                >
              </el-form-item>
            </el-form>
            <div style="height:calc(100% - 60px)">
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
                </template>
              </vxe-grid>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!--查看详情的弹框-->
    <el-dialog :title="title" :visible.sync="dialogOpen" width="60%">
      <UserDetail @cancel="cancel" :id="currentId"> </UserDetail>
    </el-dialog>
  </div>
</template>

<script>
import { getPositionUserPageData, getAllOrgTreeData } from "@/api/system/org/org";
import UserDetail from "@/views/system/org/positionUser/userDetail";
import TreeEx from "@/components/common/TreeEx/index";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "OrgPositionUser",
  components: { TreeEx, UserDetail, Treeselect },
  data() {
    return {
      // 遮罩层
      loading: false,
      // 弹出层标题
      title: "新增",
      // 弹出层状态
      dialogOpen: false,
      currentId: undefined,
      orgOptions: [],
      treeSet: {
        serviceMethods: {
          queryMethod: "/ucUserAction-getPosition.do",
          nameKey: "text",
        },
      },
      normalizer(node) {
        //方法
        return {
          id: node.id, // 键名转换，方法默认是label和children进行树状渲染
          label: node.text,
          children: node.children,
        };
      },
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
        { field: "name", title: "姓名" },
        { field: "loginName", title: "登录名" },
        { field: "mobileNum", title: "手机号码" },
        { field: "officeTelNum", title: "办公电话" },
        { field: "email", title: "邮箱" },
        {
          title: "操作",
          width: 80,
          align: "center",
          slots: { default: "operate" },
        },
      ],
      tableData: [],
      // 查询参数
      queryParams: {
        pageNumber: 1,
        pageSize: 15,
        pid: undefined,
        orgId: undefined,
      },
    };
  },
  watch: {},
  created() {
    getAllOrgTreeData().then((response) => {
      this.orgOptions = response;
    });
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
    searchPage(pid) {
      if (pid !== undefined) {
        this.queryParams.pid = pid;
      }
      getPositionUserPageData(this.queryParams).then((res) => {
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
      this.resetForm("queryForm");
      this.searchPage();
    },
    handleView(row) {
      this.dialogOpen = true;
      this.currentId = row.id;
      this.title = "用户详情";
    },
    cancel() {
      this.dialogOpen = false;
      this.searchPage();
    },
  },
};
</script>
