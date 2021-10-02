<template>
  <div>
    <el-row class="row-bg" :gutter="1">
      <el-col :span="4">
        <el-card :style="{ height: siderHeigth }">
          <el-tree
            :data="systemData"
            :props="defaultProps"
            @node-click="handleNodeClick"
            default-expand-all
            :highlight-current="true"
          >
            <!-- <span class="custom-tree-node" slot-scope="{ node, data }">
              <span style="font-size: small;">
                <i :class="data.icon"></i>{{ node.label }}
              </span>
            </span> -->
          </el-tree>
        </el-card>
      </el-col>
      <el-col :span="20">
        <el-card class="box-card" :style="{ height: siderHeigth }">
          <div>
            <el-row>
              <el-col :span="20">
                <el-form :inline="true" :model="form" class="demo-form-inline">
                  <el-form-item label="客户端类型">
                    <el-select v-model="form.clienttype">
                      <el-option label="全部" value=""></el-option>
                      <el-option label="手机端" value="0"></el-option>
                      <el-option label="C/S类型" value="1"></el-option>
                      <el-option label="服务类型" value="2"></el-option>
                      <el-option label="B/S端" value="3"></el-option>
                      <el-option label="第三方APP" value="4"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      type="primary"
                      @click="handleSearch"
                      icon="el-icon-search"
                      >查询</el-button
                    >
                    <el-button @click="reset" icon="el-icon-refresh-right"
                      >重置</el-button
                    >
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="4">
                <div align="right">
                  <el-button
                    type="primary"
                    @click="handleAdd"
                    icon="el-icon-plus"
                    >新增</el-button
                  >
                  <el-button
                    type="danger"
                    @click="handleBatchDelete"
                    icon="el-icon-delete"
                    >批量删除</el-button
                  >
                </div>
              </el-col>
              <el-col>
                <div>
                  <el-tag style="width: 100%;height:40px;"
                    ><div style="margin-top: 6px;font-size: 13px;">
                      <i class="el-icon-warning"></i>&nbsp; 已选择<span
                        >{{ selectRecords.length }}项</span
                      >
                    </div></el-tag
                  >
                </div>
                <vxe-grid
                  ref="xGrid"
                  v-bind="gridOptions"
                  @checkbox-change="checkboxChangeEvent"
                  @checkbox-all="checkboxChangeEvent"
                  @page-change="handlePageChange"
                  style="margin-top: 5px"
                  height="578px"
                >
                  <template #clientcescription="{ row }">
                    <el-button type="text" @click="handleDetail(row)">{{
                      row.clientcescription
                    }}</el-button>
                  </template>
                  <template #authorize="{ row }">
                    <el-button
                      type="text"
                      icon="el-icon-document-copy"
                      @click="handleAuthorize(row)"
                    ></el-button>
                  </template>
                  <template #nameEdit="{ row }">
                    <el-input v-model="row.name" style="width:100%"></el-input>
                  </template>
                  <template #SortEdit="{ row }">
                    <el-input-number
                      controls-position="right"
                      v-model="row.sortedNum"
                      style="width:100%"
                    ></el-input-number>
                  </template>
                  <template #operate="{ row }">
                    <template>
                      <vxe-button
                        type="text"
                        status="primary"
                        title="修改"
                        @click="editRowEvent(row)"
                        >修改</vxe-button
                      >
                      <el-divider
                        direction="vertical"
                        v-if="row.id !== undefined"
                      ></el-divider>
                      <span>
                        <vxe-button
                          type="text"
                          status="primary"
                          title="删除"
                          @click="handleDeleteClick(row)"
                          v-if="row.id !== undefined"
                          >删除</vxe-button
                        >
                      </span>
                    </template>
                  </template>
                </vxe-grid>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <clientOperation
      ref="clientOperation"
      @refresh="loadData"
    ></clientOperation>
    <clientDetail ref="clientDetail"></clientDetail>
  </div>
</template>

<script>
import clientOperation from "./module/clientOperation";
import { allSystem } from "@/api/system/system";
import {
  pageDataList,
  delClientById,
  batchDeleteClient
} from "@/api/system/client";
import clientDetail from "./module/clientDetail";

export default {
  name: "SystemClientIndex",
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label"
      },
      systemData: [
        {
          label: "系统",
          value: "0",
          children: []
        }
      ],
      selectRecords: [],
      siderHeigth: "calc(100% - 3px)",
      form: {
        clienttype: null
      },
      gridOptions: {
        border: true,
        resizable: true,
        keepSource: true,
        showOverflow: true,
        height: 530,
        loading: false,
        pagerConfig: {
          total: 0,
          currentPage: 1,
          pageSize: 10,
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
        editConfig: {
          trigger: "manual",
          mode: "row",
          showStatus: true,
          icon: "fa fa-file-text-o"
        },
        columns: [
          { type: "checkbox", width: 50, align: "center" },
          { type: "seq", title: "序号", width: 60, align: "center" },
          {
            field: "clienttype",
            title: "客户端类型",
            width: 200,
            align: "center",
            editRender: {
              name: "select",
              options: [
                { value: 0, label: "手机端" },
                { value: 1, label: "C/S类型" },
                { value: 2, label: "服务类型" },
                { value: 3, label: "B/S端" },
                { value: 4, label: "第三方APP" }
              ]
            }
          },
          {
            field: "clientcescription",
            title: "客户端描述",
            minWidth: 200,
            align: "center",
            slots: { default: "clientcescription" }
          },
          {
            field: "version",
            title: "版本",
            width: 200,
            align: "center"
          },
          // {
          //   field: "createdtime",
          //   title: "创建时间",
          //   width: 200,
          //   align: "center"
          // },
          // {
          //   field: "creator",
          //   title: "创建人",
          //   width: 150,
          //   align: "center"
          // },
          {
            field: "callbackurl",
            title: "回调url",
            minWidth: 200,
            align: "center"
          },
          // {
          //   field: "system.name",
          //   title: "系统",
          //   showOverflow: true,
          //   minWidth: 200,
          //   align: "center"
          // },
          {
            title: "操作",
            width: 250,
            slots: { default: "operate" },
            align: "center"
          }
        ],
        editRules: {
          name: [
            { required: true, message: "名字必须填" },
            { min: 3, max: 50, message: "名称长度在 3 到 50 个字符" }
          ],
          sortedNum: [
            { required: true, message: "排序必须填" },
            { type: "number", min: 1, message: "必须大于0" }
          ]
        },
        data: []
      },
      systemId: ""
    };
  },
  components: {
    clientDetail,
    clientOperation
  },
  created() {
    allSystem().then(res => {
      res.data.forEach(item => {
        this.systemData[0].children.push({
          label: item.name,
          value: item.id,
          data: item
        });
      });
    });
  },
  methods: {
    handleDetail(data) {
      this.$refs.clientDetail.showModal(data);
    },
    // 修改客户端
    editRowEvent(data) {
      this.$refs.clientOperation.edit(data);
    },
    // 选中系统树
    handleNodeClick(data) {
      this.systemId = data.value;
      this.selectRecords = [];
      this.loadData();
    },
    loadData() {
      pageDataList({
        pageNumber: this.gridOptions.pagerConfig.currentPage,
        pageSize: this.gridOptions.pagerConfig.pageSize,
        clienttype: this.form.clienttype,
        systemid: this.systemId
      }).then(res => {
        this.gridOptions.pagerConfig.total = res.total;
        this.gridOptions.data = res.rows;
        this.gridOptions.loading = false;
      });
    },
    // 搜索
    handleSearch() {
      this.selectRecords = [];
      this.loadData();
    },
    // 重置
    reset() {
      this.form.clienttype = null;
      this.gridOptions.pagerConfig.currentPage = 0;
      this.gridOptions.pagerConfig.pageSize = 10;
      this.handleSearch();
    },
    // 删除
    handleDeleteClick(data) {
      this.$confirm("是否要删除该客户端?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delClientById(data.id).then(res => {
          if (res.success) {
            this.$message({
              type: "success",
              message: res.msg
            });
            this.selectRecords = [];
            this.loadData();
          }
        });
      });
    },
    // 添加
    handleAdd() {
      if (this.systemId === "") {
        this.$message({
          message: "请选择系统树",
          type: "warning"
        });
        return false;
      }
      if (this.systemId === "0") {
        this.$message({
          message: "请选择系统树子节点",
          type: "warning"
        });
        return false;
      }
      this.$refs.clientOperation.add(this.systemId);
    },
    // 批量删除
    handleBatchDelete() {
      let ids = this.selectRecords.map(x => x.id).join(",");
      if (this.selectRecords.length === 0) {
        this.$message({
          message: "请勾选要删除的客户端",
          type: "warning"
        });
        return false;
      }
      this.$confirm("是否要删除该客户端?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        batchDeleteClient(ids).then(res => {
          if (res.success) {
            this.$message({
              message: res.msg,
              type: "success"
            });
            this.selectRecords = [];
            this.loadData();
          } else {
            this.$message({
              message: res.msg,
              type: "danger"
            });
          }
        });
      });
    },
    checkboxChangeEvent({ records }) {
      // this.isAllChecked = this.$refs.xGrid.isAllCheckboxChecked()
      // this.isIndeterminate = this.$refs.xGrid.isCheckboxIndeterminate()
      this.selectRecords = records;
    },
    handlePageChange({ currentPage, pageSize }) {
      this.gridOptions.pagerConfig.currentPage = currentPage;
      this.gridOptions.pagerConfig.pageSize = pageSize;
      this.findList();
    }
  }
};
</script>

<style scoped></style>
