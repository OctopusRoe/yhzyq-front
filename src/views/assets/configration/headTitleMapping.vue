<!-- 固定资产报表表格头部和字段映射设置 -->
<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="margin-left: 20px">
          <div class="right-view">
            <div>
              <div class="select-box">
                <el-row>
                  <el-col :span="6">
                    <el-form :inline="true">
                      <el-form-item label="版本">
                        <select-tree-system-version
                          ref="stv"
                          @select="selectVersion"
                        ></select-tree-system-version>
                      </el-form-item>
                    </el-form>
                  </el-col>
                  <el-col :span="12">
                    <div>
                      <el-form
                        :model="queryParam"
                        ref="queryForm"
                        v-show="showSearch"
                        :inline="true"
                      >
                        <el-form-item
                          label="关键字"
                          prop="name"
                          style="margin-left: 15px"
                        >
                          <el-input
                            v-model="queryParam.name"
                            style="width: 206px"
                            placeholder="报表名称"
                            clearable
                            @keyup.enter.native="handleQuery"
                          />
                        </el-form-item>
                        <el-form-item>
                          <el-button
                            type="primary"
                            style="margin-left: 20px"
                            @click="handleQuery"
                            >搜索</el-button
                          >
                          <el-button @click="reset">重置</el-button>
                        </el-form-item>
                      </el-form>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div style="float: right" v-if="showSearch">
                      <el-button
                        type="primary"
                        @click="addNewFromCopy"
                        v-if="showCopyBtn"
                        >复制新加</el-button
                      >
                      <el-button type="primary" @click="addNew">新加</el-button>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div style="height: 100%">
                <vxe-table
                  border
                  resizable
                  height="528px"
                  ref="vtable"
                  check-strictly="true"
                  @checkbox-change="getSelect"
                  @checkbox-all="getSelect"
                  row-id="id"
                  :data="tableData"
                  show-overflow
                  v-loading="loading"
                >
                  <vxe-table-column
                    type="checkbox"
                    width="50"
                    align="center"
                  ></vxe-table-column>
                  <vxe-table-column
                    field="code"
                    title="code"
                    tree-node
                    header-align="center"
                  >
                  </vxe-table-column>
                  <vxe-table-column field="name" title="名称" align="center">
                  </vxe-table-column>
                  <vxe-table-column
                    field="createTime"
                    title="创建时间"
                    align="center"
                  >
                  </vxe-table-column>
                  <vxe-table-column
                    field="createUser"
                    title="创建者"
                    align="center"
                  >
                  </vxe-table-column>

                  <vxe-table-column
                    title="操作"
                    align="center"
                    width="200"
                    class-name="small-padding fixed-width"
                  >
                    <template slot-scope="scope">
                      <div style="width: 100%;">
                        <el-row>
                          <el-col :span="5">
                            <el-button
                              type="text"
                              style="margin-top:-10px;"
                              @click="showDetail(scope.$rowIndex, scope.row)"
                              >详情</el-button
                            >
                          </el-col>
                          <el-col :span="5">
                            <el-button
                              type="text"
                              style="margin-left:2px;margin-top:-10px;"
                              @click="editRow(scope.$rowIndex, scope.row)"
                              >修改</el-button
                            >
                          </el-col>
                          <el-col :span="5">
                            <el-button
                              type="text"
                              style="margin-left:4px;margin-top:-10px;"
                              @click="deleteRow(scope.$rowIndex, scope.row)"
                              >删除</el-button
                            >
                          </el-col>
                        </el-row>
                      </div>
                    </template>
                  </vxe-table-column>
                </vxe-table>
                <!-- <vxe-pager
                  :loading="loading"
                  :current-page="tablePage.currentPage"
                  :page-size="tablePage.pageSize"
                  :total="tablePage.total"
                  :layouts="[
                    'PrevPage',
                    'JumpNumber',
                    'NextPage',
                    'FullJump',
                    'Sizes',
                    'Total'
                  ]"
                  @page-change="handlePageChange"
                >
                </vxe-pager> -->
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <addNew ref="addNew" @show="dialogShow" @ok="addOk"> </addNew>
    <editRecord ref="editRecord" @show="dialogShow" @ok="addOk"> </editRecord>
    <detail ref="detail" @show="dialogShow"> </detail>
  </div>
</template>

<script>
import {
  queryDataList,
  delDataById,
  getDataById
} from "@/api/assets/configration/titleMapping";

import addNew from "./module/addNew";
import editRecord from "./module/editRecord";
import detail from "./module/detail";

export default {
  name: "AssetsConfigrationHeadTitleMapping1",
  components: { addNew, editRecord, detail },
  data() {
    return {
      total: 0,
      checkable: false,
      loading: false,
      dialogShow: false,
      tableData: [],
      expandRowKeys: [],
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        align: "right",
        pageSizes: [10, 30, 50, 100, 200, 500],
        layouts: [
          "Sizes",
          "PrevJump",
          "PrevPage",
          "Number",
          "NextPage",
          "NextJump",
          "FullJump",
          "Total"
        ],
        perfect: true
      },
      queryParam: {
        pageSize: 100,
        pageNumber: 1,
        versionId: "",
        name: ""
      },
      selectRecords: [],
      showBtchBtn: false,
      showCopyBtn: false,
      showSearch: false,
      wbsId: ""
    };
  },
  created() {},
  methods: {
    selectVersion(option) {
      this.queryParam.versionId = option.id;
      this.showSearch = true;
      this.queryData();
    },
    //获取选中的行
    getSelect({ checked, records }) {
      console.log("sfslfdjalsj");
      this.selectRecords = this.$refs.vtable.getCheckboxRecords();
      this.showBtchBtn = this.selectRecords.length > 1;
      this.showCopyBtn = this.selectRecords.length == 1;
    },

    // 日期选择事件
    onChange(date) {
      this.queryParam.startTime =
        date == null || date[0] == null ? "" : date[0];
      this.queryParam.endTime = date == null || date[1] == null ? "" : date[1];
    },
    addOk() {
      this.queryData();
    },
    handleQuery() {
      this.queryData();
    },
    handlerOrgCheck(data, node) {
      console.log(data, node);
    },

    handlePageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage;
      this.tablePage.pageSize = pageSize;
      this.queryData();
    },
    queryData() {
      this.queryParam.pageSize = this.tablePage.pageSize;
      this.queryParam.pageNumber = this.tablePage.currentPage;

      queryDataList(this.queryParam).then(res => {
        this.selectRecords = [];
        this.showCopyBtn = false;
        if (res && res.success) {
          console.log(res);
          this.tableData = res.data;
        } else {
          this.tableData = [];
        }
      });
    },
    //复制新增
    addNewFromCopy() {
      if (this.selectRecords.length != 1) {
        this.$message({
          message: "请先选中要复制的行，且只能选择一行",
          type: "info"
        });
      }
      this.$nextTick(() => {
        this.$refs.addNew.showModal(
          this.queryParam.versionId,
          this.selectRecords[0]
        );
      });
    },
    //新增
    addNew() {
      this.$nextTick(() => {
        this.$refs.addNew.showModal(this.queryParam.versionId, null);
      });
    },
    //查看详情
    showDetail(index, row) {
      this.$nextTick(() => {
        this.$refs.detail.showModal(row);
      });
    },
    //修改
    editRow(index, row) {
      let id = row.id;
      this.$nextTick(() => {
        this.$refs.editRecord.showModal(row);
      });
    },
    //删除
    deleteRow(index, row) {
      //如果是新增时要删除
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let delId = row.id;
        delDataById({ id: delId }).then(res => {
          if (res.success) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.selectRow = null;
            this.queryData();
          } else {
            this.$message({
              message: res.message,
              type: "info"
            });
          }
        });
      });
    },
    reset() {
      this.queryParam.name = "";
      this.queryData();
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .vxe-table--render-default .vxe-cell--checkbox .vxe-checkbox--icon {
  border: 1px solid #b0b0b1 !important;
}
</style>
