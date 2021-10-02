<template>
  <div class="report">
    <div class="left-view">
      <!-- <div> -->
      <div class="tree-title">
        <el-row>
          <el-col :span="24">
            <OrganizTreeSelect
              ref="organizTreeSelect"
              @select="selectedHandler"
              typeAndLevel="102,210,23"
              @loaded="onOrgTreeSelectLoaded"
              parentCode="5696a90c9c4a49578be7748bdd2153a3"
              @get-before-load-data="getBeforeLoadData"
              v-model="id"
            ></OrganizTreeSelect>
          </el-col>
        </el-row>
      </div>
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" style="padding-right:15px;padding-left:15px;margin-bottom:10px">
      </el-input>
      <div class="tree-box">
        <el-tree
          ref="refTree"
          :data="treeData"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          @node-click="getNodeData"
          node-key="id"
          highlight-current
          :current-node-key="selectedKey"
          style="width:450px"
        >
        </el-tree>
        <!-- :render-content="renderContent" -->
      </div>
      <!-- </div> -->
    </div>
    <div class="right-view">
      <div class="tableDataView">
        <div>
          <el-row>
            <el-col :span="22">
              <div>
                <el-form
                  :model="object"
                  ref="queryForm"
                  v-show="showSearch"
                  :inline="true"
                >
                  <el-form-item label="流程状态" prop="state">
                    <el-select v-model="object.state" placeholder="全部">
                      <el-option
                        v-for="item in selectListGc"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    label="关键字"
                    prop="searchName"
                    style="margin-left: 15px"
                  >
                    <el-input
                      v-model="object.searchName"
                      style="width: 206px"
                      placeholder="编号|桩号"
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
            <el-col :span="2">
              <div style="float: right">
                <el-button type="primary" @click="addNew" v-if="addIsShow"
                  >添加</el-button
                >
              </div>
            </el-col>
          </el-row>
        </div>
        <div style="height: 100%">
          <vxe-table
            ref="xTable"
            border="inner"
            height="90%"
            :loading="loading"
            :seq-config="{
              startIndex: (tablePage.currentPage - 1) * tablePage.pageSize
            }"
            :checkbox-config="{ reserve: true }"
            :data="reportData"
          >
            <vxe-table-column
              field="id"
              title="id"
              v-if="false"
              align="center"
            ></vxe-table-column>
            <vxe-table-column
              type="checkbox"
              align="center"
              width="50"
            ></vxe-table-column>
            <vxe-table-column
              field="reportCode"
              title="编号"
              width="190"
              align="center"
            >
              <template slot-scope="scope">
                <!-- style="color: #91d3f8" -->
                <el-button type="text" @click="getInfoByCode(scope.row)">{{
                  scope.row.reportCode
                }}</el-button>
              </template>
            </vxe-table-column>
            <vxe-table-column field="stakeNumber" title="桩号" align="center">
            </vxe-table-column>
            <vxe-table-column
              field="leader"
              title="工程负责人"
              align="center"
              width="100"
            >
            </vxe-table-column>
            <vxe-table-column
              field="startDate"
              title="建议开工日期"
              align="center"
              width="120"
            >
              <template slot-scope="scope">
                {{ scope.row.startDate | dataFormat("yyyy-MM-dd") }}
              </template>
            </vxe-table-column>
            <vxe-table-column
              field="endDate"
              title="建议完工日期"
              align="center"
              width="120"
            >
              <template slot-scope="scope">
                {{ scope.row.endDate | dataFormat("yyyy-MM-dd") }}
              </template>
            </vxe-table-column>
            <vxe-table-column
              field="createUser"
              title="创建人"
              align="center"
              width="90"
            >
            </vxe-table-column>
            <vxe-table-column
              field="state"
              title="审批状态"
              align="center"
              width="90"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.state == 1">未开始</span>
                <span v-if="scope.row.state == 2">进行中</span>
                <span v-if="scope.row.state == 3">已结束</span>
              </template>
            </vxe-table-column>
            <vxe-table-column
              field="nowSign"
              title="当前签字"
              align="center"
              width="90"
            >
            </vxe-table-column>
            <vxe-table-column
              field="fjCount"
              title="附件"
              align="center"
              width="80"
            >
              <template slot-scope="scope">
                <el-button type="text" @click="fjCounts(scope.row)"
                  >共{{
                    scope.row.fjCount === undefined ? 0 : scope.row.fjCount
                  }}份</el-button
                >
                <!-- <el-button type="text" @click="fjCounts(scope.row)" v-else>{{scope.row.fjCount}}</el-button> -->
              </template>
            </vxe-table-column>
            <vxe-table-column
              title="操作"
              align="center"
              width="240"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <div style="width: 100%;">
                  <el-button
                    type="text"
                    :disabled="scope.row.state != '1'"
                    @click="submitRow(scope.$index, scope.row)"
                    >提交</el-button
                  >
                  <el-divider direction="vertical"></el-divider>
                  <el-button
                    type="text"
                    :disabled="scope.row.state === '3'"
                    @click="updateRow(scope.$index, scope.row)"
                    >修改</el-button
                  >
                  <el-divider direction="vertical"></el-divider>
                  <el-button
                    type="text"
                    :disabled="scope.row.state != '1'"
                    @click="deleteRow(scope.$index, scope.row)"
                    >删除</el-button
                  >
                  <el-divider direction="vertical"></el-divider>
                  <el-dropdown>
                    <el-button type="text">
                      更多<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        ><el-button
                          type="text"
                          :disabled="scope.row.state != '2'"
                          @click="approvalRow(scope.$index, scope.row)"
                          >审批</el-button
                        ></el-dropdown-item
                      >
                      <el-dropdown-item
                        ><el-button
                          type="text"
                          :disabled="scope.row.state === '1'"
                          @click="recordRow(scope.$index, scope.row)"
                          >记录</el-button
                        ></el-dropdown-item
                      >
                      <el-dropdown-item
                        ><el-button
                          type="text"
                          :disabled="scope.row.state === '1'"
                          @click="reportFormRow(scope.$index, scope.row)"
                          >报表</el-button
                        ></el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </template>
            </vxe-table-column>
          </vxe-table>
          <vxe-pager
            perfect
            size="small"
            :current-page="tablePage.currentPage"
            :page-size="tablePage.pageSize"
            :page-sizes="tablePage.pageSizes"
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
    <AddReport ref="AddReport" :show="showAddReport" @cancel="cancel">
    </AddReport>
    <ReportDetil ref="ReportDetil" :show="showReportDetil"></ReportDetil>
    <UpdateReport
      ref="UpdateReport"
      :show="showUpdateReport"
      @cancel="cancel"
    ></UpdateReport>
    <ApprovalDetil
      ref="ApprovalDetil"
      :show="showApprovalDetil"
      @cancel="cancel"
    ></ApprovalDetil>
    <StartFlow ref="StartFlow" @startFlowCallBack="rowCallBack"></StartFlow>
    <HistoryFlow ref="HistoryFlow"></HistoryFlow>
    <FJDetil ref="FJDetil" sortCode="startReport" :show="dialogShow"></FJDetil>
    <FineReport ref="FineReport"></FineReport>
  </div>
</template>

<script>
import AddReport from "@/views/steps/startReport/addStartReport";
import ReportDetil from "@/views/steps/startReport/startReportDetil";
import UpdateReport from "@/views/steps/startReport/updateStartReport";
import ApprovalDetil from "@/views/steps/startReport/startReportApproval";
import FJDetil from "@/views/steps/startReport/FJDetil";
import FineReport from "@/views/steps/startReport/FineReport";
import {
  getStartReportList,
  delGxStartReportById,
  getWbsTree,
  getFjCount
} from "@/api/steps/startReport/startReport";
import OrganizTree from "@/components/system/OrganizTree";
import OrganizTreeSelect from "@/components/system/OrganizTreeSelect";
import TreeSelect from "@/components/common/TreeSelect";
import StartFlow from "@/components/flow/page/examine/startFlow";
import HistoryFlow from "@/components/flow/page/examine/historyFlow";

export default {
  name: "StepsStartReportStartReport",
  components: {
    AddReport,
    ReportDetil,
    UpdateReport,
    ApprovalDetil,
    OrganizTree,
    TreeSelect,
    OrganizTreeSelect,
    StartFlow,
    HistoryFlow,
    FJDetil,
    FineReport
  },
  data() {
    return {
      //所有的子节点
      childrenNode: [],
      //是否找到第一个子节点
      isFindFirstChildren: false,
      //第一个子节点
      firstChildren: {},
      //选中的节点
      selectedKey: "",
      //默认选中的节点
      defaultSelectedNode: {},
      dialogShow: undefined,
      showAddReport: undefined,
      showReportDetil: undefined,
      showUpdateReport: undefined,
      showApprovalDetil: undefined,
      show: undefined,
      total: 0,
      id: undefined,
      addIsShow: false,
      currentId: undefined,
      projectNames: undefined,
      loading: false,
      checkable: false,
      value: "",
      input: "",
      nameValue: "",
      filterText: "",
      isShowId: false,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      formLabelWidth: "140px",
      addStartReportParams: [{}],
      treeExpandData: [],
      data2: [],
      treeData: [],
      testydpoints: [],
      tableData: [],
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        align: "right",
        pageSizes: [10, 30, 50, 100, 200, 500]
      },
      object: {
        pageSize: 10,
        pageNumber: 1,
        searchName: "",
        wbsId: "",
        state: ""
      },
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      tabIndex: 1,
      showSearch: true,
      selectListGc: [
        {
          value: "1",
          label: "未开始"
        },
        {
          value: "2",
          label: "进行中"
        },
        {
          value: "3",
          label: "已结束"
        }
      ],
      defaultProps: {
        children: "children",
        label: "name",
        value: "id"
      },
      addParams: {
        addId: undefined,
        orgIdAdd: undefined,
        wbsIdAdd: undefined,
        wbsCodeAdd: undefined,
        wbsNameAdd: undefined,
        wbsNamesAdd: undefined,
        wbsCodesAdd: undefined,
        startAndEndStake: undefined,
      },
      templateData: "",
      rowFlow: {
        id: undefined,
        state: undefined
      },
      reportIds: [],
      reportData: [],
      ids: undefined
    };
  },
  created() {},
  watch: {
    filterText(val) {
      this.$refs.refTree.filter(val);
    }
    //监听当前选中的节点刷新配置表
    // selectedKey() {
    //   this.getNodeData(this.defaultSelectedNode);
    // }
  },
  filters: {
    // 私有局部过滤器，只能在 当前 VM 对象所控制的 View 区域进行使用
    dataFormat(input, pattern = "") {
      // 在参数列表中 通过 pattern="" 来指定形参默认值，防止报错
      var dt = new Date(input);
      // 获取年月日
      var y = dt.getFullYear();
      var m = (dt.getMonth() + 1).toString().padStart(2, "0");
      var d = dt
        .getDate()
        .toString()
        .padStart(2, "0");
      // 如果 传递进来的字符串类型，转为小写之后，等于 yyyy-mm-dd，那么就返回 年-月-日
      // 否则，就返回  年-月-日 时：分：秒
      if (pattern.toLowerCase() === "yyyy-mm-dd") {
        return `${y}-${m}-${d}`;
      } else {
        // 获取时分秒
        // var hh = dt.getHours().toString().padStart(2, '0');
        // var mm = dt.getMinutes().toString().padStart(2, '0');
        // var ss = dt.getSeconds().toString().padStart(2, '0');
        return `${y}-${m}-${d}`;
      }
    }
  },
  methods: {
    tabChange(index) {
      this.tabIndex = index;
    },
    handlePageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage;
      this.tablePage.pageSize = pageSize;
      this.object.pageSize = pageSize;
      this.object.pageNumber = currentPage;
      this.getList();
    },
    async getList() {
      this.loading = true;
      this.tableData = [];
      await getStartReportList({ ...this.object }).then(response => {
        console.log(response);
        this.loading = false;
        this.tableData = response.rows;
        this.tablePage.total = response.total;
        this.ids = this.tableData.map(res => res.id).join(",");
      });
      //获取附件个数集合
      await getFjCount({ businessIds: this.ids }).then(response => {
        this.reportIds = response.data;
      });
      this.setReportFjCount();
    },
    //拼接附件数量
    setReportFjCount() {
      this.reportData = [];
      for (let i = 0; i < this.tableData.length; i++) {
        for (let j = 0; j < this.reportIds.length; j++) {
          if (this.tableData[i].id === this.reportIds[j].bussinessId) {
            this.tableData[i].fjCount = this.reportIds[j].count;
          }
        }
      }
      this.$nextTick(() => {
        this.reportData = this.tableData;
      });
    },
    fjCounts(row) {
      let id = row.id;
      let orgId = row.orgId;
      this.$refs.FJDetil.showModal(id, orgId);
    },
    cancel() {
      this.getList();
    },
    //新增开工报告
    addNew() {
      this.addParams.addId = this.getRandomInt();
      this.$refs.AddReport.showModal(this.addParams);
    },
    //获取开工报告详情
    getInfoByCode(row) {
      this.currentId = row.id;
      let oid = this.addParams.orgIdAdd;
      this.$refs.ReportDetil.showModal(this.currentId, oid);
    },

    //提交
    submitRow(index, row) {
      let id = row.id;
      let od = this.addParams.orgIdAdd;
      this.$refs.StartFlow.showModal(od, "report", id);
    },
    //行内提交回调更新数据
    rowCallBack(success, orderId) {
      if (success === true) {
        this.cancel();
      }
    },
    //记录
    recordRow(index, row) {
      // let id = row.id;
      // getHistoryById({ id: id }).then(res => {
      //   let history = res.data.orderId;
      //   if (history !== null) {
      //     this.$refs.HistoryFlow.showModal(history);
      //   }
      // });
      let oderID = row.flowId;
      this.$refs.HistoryFlow.showModal(oderID);
    },
    //修改
    updateRow(index, row) {
      let id = row.id;
      let od = this.addParams.orgIdAdd;
      this.$refs.UpdateReport.showModal(id, od);
    },
    //删除
    deleteRow(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let delId = row.id;
        delGxStartReportById({ id: delId }).then(res => {
          if (res.success) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getList();
          } else {
            this.$message({
              message: res.message,
              type: "info"
            });
          }
        });
      });
    },
    //列表行审批功能
    approvalRow(index, row) {
      let iid = row.id;
      let ood = this.addParams.orgIdAdd;
      this.$refs.ApprovalDetil.showModal(iid, ood);
    },
    //报表
    reportFormRow(index, row) {
      let id = row.id;
      let oId = row.orgId;
      this.$refs.FineReport.showModal(id, oId);
    },
    handlerOrganizSelect(data, node) {
      console.log(data, node);
    },
    handlerOrganizCheck(data, node) {
      console.log(data, node);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    viewRow() {
      this.dialogFormVisible1 = true;
    },
    handletest() {
      console.log();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleQuery() {
      this.getList();
    },
    reset() {
      this.object.searchName = "";
      this.object.state = "";
      this.getList();
    },
    //组织机构选择树
    selectedHandler(id) {
      // console.log('选择了项之后执行', id);
      this.id = id;
      this.getProjectTree();
    },
    // 树形被加载完
    onOrgTreeSelectLoaded(treeData, checkednode) {
      console.log("树形被加载完", treeData, checkednode);
    },
    getBeforeLoadData(treeData) {
      console.log(
        "加载数据后界面渲染前加载的数据回调（调用人员处理）",
        treeData
      );
    },
    //工程树
    async getProjectTree() {
      // debugger
      let orgId = this.id;
      this.addParams.orgIdAdd = orgId;
      await getWbsTree({ orgId: orgId }).then(res => {
        if (res.success) {
          this.treeData = [res.data];
        }
      });
      this.childrenNode = [];
      this.isFindFirstChildren = false;
      this.getChildrenNode(this.treeData);
      this.$refs.refTree.setCurrentKey(this.firstChildren.id);
      this.selectedKey = this.firstChildren.id;
      this.templateData = this.firstChildren.id;
      this.object.wbsId = this.firstChildren.id;

      this.addParams.wbsIdAdd = this.firstChildren.id;
      this.addParams.wbsCodeAdd = this.firstChildren.code;
      this.addParams.wbsNameAdd = this.firstChildren.name;
      if (this.treeData[0].children !== null) {
        this.addParams.wbsNamesAdd = this.treeData[0].children[0].name;
        if (this.treeData[0].children[0].children !== null) {
          this.addParams.wbsNamesAdd =
            this.addParams.wbsNamesAdd +
            "/" +
            this.treeData[0].children[0].children[0].name;
          if (this.treeData[0].children[0].children[0].children !== null) {
            this.addParams.wbsNamesAdd =
              this.addParams.wbsNamesAdd +
              "/" +
              this.treeData[0].children[0].children[0].children[0].name;
            if (
              this.treeData[0].children[0].children[0].children[0].children !==
              null
            ) {
              this.addParams.wbsNamesAdd =
                this.addParams.wbsNamesAdd +
                "/" +
                this.treeData[0].children[0].children[0].children[0].children[0]
                  .name;
            }
          }
        }
      }
      this.addParams.wbsCodesAdd =
        this.firstChildren.code + ":" + this.addParams.wbsNamesAdd;
      await this.getList();
    },
    getNodeData(node, data, value) {
      this.object.wbsId = node.id;
      this.addParams.wbsIdAdd = node.id;
      this.addParams.wbsCodeAdd = node.code;
      this.addParams.wbsNameAdd = node.name;
      this.addParams.wbsNamesAdd = data.data.name;
      if ((node.startStake !== null && node.startStake !== "") || (node.endStake != null && node.endStake !== "")) {
        if (node.startStake !== null && node.startStake !== "") {
          this.addParams.startAndEndStake = node.startStake;
          if (node.endStake != null && node.endStake !== "") {
            this.addParams.startAndEndStake = (this.addParams.startAndEndStake + "~" + node.endStake);
          }
        }
        if (node.startStake === null || node.startStake === "") {
          if (node.endStake != null && node.endStake !== "") {
             this.addParams.startAndEndStake = node.endStake;
          }
        }
      }
      if (data.parent !== null && data.parent.data.id !== "0") {
        this.addParams.wbsNamesAdd =
          data.parent.data.name + "/" + this.addParams.wbsNamesAdd;
        if (data.parent.parent !== null && data.parent.parent.data.id !== "0") {
          this.addParams.wbsNamesAdd =
            data.parent.parent.data.name + "/" + this.addParams.wbsNamesAdd;
          if (
            data.parent.parent.parent !== null &&
            data.parent.parent.parent.data.id !== "0"
          ) {
            this.addParams.wbsNamesAdd =
              data.parent.parent.parent.data.name +
              "/" +
              this.addParams.wbsNamesAdd;
          }
        }
      }
      this.addParams.wbsCodesAdd = node.code + ":" + this.addParams.wbsNamesAdd;
      this.addIsShow = false;
      if (node.children === null) {
        this.addIsShow = true;
        this.getList();
      }
    },
    //获取工程树所有子节点
    getChildrenNode(data) {
      if (!data || !data.length) {
        return;
      }
      for (let i = 0; i < data.length; i++) {
        if (data[i].isLeaf) {
          this.childrenNode.push(data[i]);
          if (!this.isFindFirstChildren && data[i].id != 0) {
            //拿到第一个最小子节点
            this.firstChildren = data[i];
            this.isFindFirstChildren = true;
            this.addIsShow = true;
          }
        }
        if (data[i].children) {
          this.getChildrenNode(data[i].children);
        }
      }
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span style=" margin-left: 10px; color:red">施工中</span>
        </span>
      );
    },
    //生成一个19位随机数ID
    getRandomInt() {
      var code = "";
      //设置长度，这里看需求，我这里设置了4
      var codeLength = 19;
      //设置随机字符
      var random = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 0);
      //循环codeLength 我设置的4就是循环4次
      for (var i = 0; i < codeLength; i++) {
        //设置随机数范围,这设置为0 ~ 36
        var index = Math.floor(Math.random() * 9);
        //字符串拼接 将每次随机的字符 进行拼接
        code += random[index];
      }
      //将拼接好的字符串赋值给展示的code
      return code;
    },
  }
};
</script>

<style lang="scss" scoped>
.report {
  display: flex;
  height: 100%;
  // .tree-title {
  //   line-height: 40px;
  //   padding-left: 15px;
  //   padding-top: 50px;
  //   padding-right: 15px;
  // }
  .left-view {
    width: 16%;
    border-right: 1px solid #eaeaec;
    height: 100%;
  }
  .right-view {
    width: 84%;
    height: 100%;
    flex-grow: 1;
    padding: 10px;
  }
  .tableDataView {
    height: 90%;
  }
  .tree-box {
    padding-left: 15px;
    padding-right: 10px;
    height: 82%;
    overflow-x: scroll;
    overflow-y: auto;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    margin-left: 18px;
  }
}
</style>
