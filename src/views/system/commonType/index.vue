<!-- 通用类型 -->
<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="margin-left: 20px">
          <div class="right-view">
            <div>
              <div class="select-box">
                <el-row>
                  <el-col :span="16">
                    <div>
                      <el-form
                        :model="queryParam"
                        ref="queryForm"
                        v-show="showSearch"
                        :inline="true"
                      >
                        <el-form-item
                          label="类别名称"
                          prop="typename"
                          style="margin-left: 15px"
                        >
                          <el-input
                            v-model="queryParam.typename"
                            style="width: 206px"
                            placeholder="类别名称"
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
                  <el-col :span="8">
                    <div style="float: right">
                      <el-button
                        type="primary"
                        v-if="showBtchBtn"
                        @click="batchDel"
                        style="margin-right: 20px;"
                        >批量删除</el-button
                      >

                      <el-button type="primary" @click="addTopNew"
                        >新添一级</el-button
                      >
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
                  <!-- <vxe-table-column
                    type="checkbox"
                    width="50"
                    align="center"
                  ></vxe-table-column> -->
                  <vxe-table-column
                    field="code"
                    title="编码"
                    width="250"
                    tree-node
                    header-align="center"
                  >
                  </vxe-table-column>
                  <vxe-table-column
                    field="typename"
                    title="类别名称"
                    width="300"
                    align="center"
                  >
                  </vxe-table-column>
                  <vxe-table-column
                    field="type"
                    title="类别"
                    width="350"
                    align="center"
                  >
                  </vxe-table-column>
                  <vxe-table-column
                    field="remark"
                    title="备注"
                    width="200"
                    align="center"
                  >
                  </vxe-table-column>
                  <vxe-table-column
                    field="sortedOrder"
                    title="序号"
                    width="100"
                    align="center"
                  >
                  </vxe-table-column>
                  <vxe-table-column
                    field="status"
                    title="状态"
                    width="80"
                    align="center"
                  >
                  </vxe-table-column>
                  <vxe-table-column
                    title="操作"
                    align="center"
                    width="350"
                    class-name="small-padding fixed-width"
                  >
                    <template slot-scope="scope">
                      <div style="width: 100%;">
                        <el-row>
                          <el-col :span="3">
                            <el-button
                              type="text"
                              v-if="scope.row.pid !== ''"
                              @click="showParent(scope.row)"
                              >上级</el-button
                            >
                          </el-col>
                          <el-col :span="3" style="margin-left:10px">
                            <el-button
                              type="text"
                              @click="showChildren(scope.row)"
                              >下级</el-button
                            >
                          </el-col>
                          <el-col :span="3" style="margin-left:10px">
                            <el-button
                              type="text"
                              @click="addSameLevel(scope.row)"
                              >新同级</el-button
                            >
                          </el-col>
                          <el-col :span="3" style="margin-left:10px">
                            <el-button type="text" @click="addChild(scope.row)"
                              >新下级</el-button
                            >
                          </el-col>
                          <el-col :span="3" style="margin-left:10px">
                            <el-button
                              type="text"
                              @click="editRow(scope.$index, scope.row)"
                              >修改</el-button
                            >
                          </el-col>
                          <el-col :span="3" style="margin-left:10px">
                            <el-button
                              type="text"
                              style="margin-left:2px"
                              @click="deleteRow(scope.$index, scope.row)"
                              >删除</el-button
                            >
                          </el-col>
                        </el-row>
                      </div>
                    </template>
                  </vxe-table-column>
                </vxe-table>
                <vxe-pager
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
                </vxe-pager>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <commonTypeInput ref="commonTypeInput" @show="dialogShow" @ok="addOk">
    </commonTypeInput>
    <editCommonType ref="editCommonType" @show="dialogShow" @ok="addOk">
    </editCommonType>
  </div>
</template>

<script>
import {
  queryCommonPageList,
  delDataById,
  queryCommonTypeList
} from "@/api/system/commonType/index";
import commonTypeInput from "./input.vue";
import editCommonType from "./editCommonType.vue";

export default {
  components: { commonTypeInput, editCommonType },
  data() {
    return {
      total: 0,
      checkable: false,
      loading: false,
      dialogShow: false,
      tableData: [],
      expandRowKeys: [],
      //通用类型数组
      commonTypeList: [],
      showType: "",
      dateRange: undefined,
      // dialogShow:false,
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
        pageSize: 10,
        pageNumber: 1,
        typename: "",
        id: "",
        pid: ""
      },
      addParam: {
        istop: 0, //1是加一级，0不是一级
        pid: "",
        ptype: "",
        ptypename: ""
      },
      selectRecords: [],
      showBtchBtn: false,
      showSearch: true
    };
  },
  created() {
    queryCommonTypeList().then(res => {
      if (res && res.success) {
        this.commonTypeList = res.data;
      }
    });
  },
  methods: {
    //获取选中的行
    getSelect({ checked, records }) {
      this.selectRecords = this.$refs.vtable.getCheckboxRecords();
      this.showBtchBtn = this.selectRecords.length > 1;
    },
    addOk() {
      this.queryData();
    },
    handleQuery() {
      this.queryParam.pid = "";
      this.queryParam.id = "";
      this.tablePage.currentPage = 1;
      this.queryData();
    },
    handlePageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage;
      this.tablePage.pageSize = pageSize;
      this.queryData();
    },
    queryData() {
      this.queryParam.pageSize = this.tablePage.pageSize;
      this.queryParam.pageNumber = this.tablePage.currentPage;

      queryCommonPageList(this.queryParam).then(res => {
        if (res && res.rows) {
          console.log(res);
          this.tableData = res.rows;
          this.tablePage.total = res.total;
        } else {
          this.tableData = [];
          this.tablePage.total = 0;
        }
      });
    },
    //新增一级
    addTopNew() {
      this.addParam.istop = 1;
      this.addParam.pid = "";
      this.addParam.ptype = "";
      this.addParam.ptypename = "";
      this.addNew(this.addParam);
    },
    //新增同级
    addSameLevel(row) {
      if (row.pid === "") {
        this.addParam.istop = 1;
        this.addParam.pid = "";
        this.addParam.ptype = "";
        this.addParam.ptypename = "";
      } else {
        this.addParam.istop = 0;
        this.addParam.pid = row.pid;
        this.addParam.ptype = row.type;
        this.addParam.ptypename = "";
      }
      this.addNew();
    },
    //新增下级
    addChild(row) {
      this.addParam.istop = 0;
      this.addParam.pid = row.id;
      this.addParam.ptype = row.type;
      this.addParam.ptypename = row.typename;
      this.addNew();
    },
    //新增
    addNew() {
      this.$nextTick(() => {
        this.$refs.commonTypeInput.showModal(
          this.addParam,
          this.commonTypeList
        );
      });
    },
    //查看详情
    showDetail(row) {
      this.$nextTick(() => {});
    },
    showParent(row) {
      this.queryParam.id = row.pid;
      this.queryParam.pid = "";
      this.queryParam.typename = "";
      this.queryData();
    },
    //查询子级
    showChildren(row) {
      this.queryParam.pid = row.id;
      this.queryParam.id = "";
      this.queryParam.typename = "";
      this.queryData();
    },
    //修改
    editRow(index, row) {
      this.$nextTick(() => {
        this.$refs.editCommonType.showModal(row);
      });
    },
    //删除
    deleteRow(index, row) {
      //
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
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
      this.queryParam.typename = "";
      this.queryParam.id = "";
      this.queryParam.pid = "";
      this.tablePage.currentPage = 1;
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
