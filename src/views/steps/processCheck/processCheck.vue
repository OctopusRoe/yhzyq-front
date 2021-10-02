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
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText"
        style="padding-right:15px;padding-left:15px;margin-bottom:10px"
      >
      </el-input>
      <div class="tree-box">
        <el-tree
          ref="refTree"
          :data="treeData"
          :props="defaultProps"
          :default-expand-all="true"
          :filter-node-method="filterNode"
          @node-click="getNodeData"
          node-key="id"
          highlight-current
          :current-node-key="selectedKey"
          style="width:450px"
        >
        </el-tree>
      </div>
      <!-- </div> -->
    </div>
    <div class="right-view">
      <p>
        <vxe-radio-group v-model="selectTab">
          <vxe-radio-button label="tab1"
            >工序报验({{ this.processTablePage.total }})</vxe-radio-button
          >
          <vxe-radio-button label="tab2"
            >开工报告({{ this.tablePage.total }})</vxe-radio-button
          >
        </vxe-radio-group>
      </p>
      <div v-show="selectTab === 'tab1'">
        <div>
          <el-row>
            <el-col :span="22">
              <div>
                <el-form
                  :model="processObject"
                  ref="queryForm"
                  v-show="showSearch"
                  :inline="true"
                >
                  <el-form-item label="流程状态" prop="state">
                    <el-select v-model="processObject.state" placeholder="全部">
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
                      v-model="processObject.searchName"
                      style="width: 206px"
                      placeholder="编号|工序|部位名称"
                      clearable
                      @keyup.enter.native="handleQueryProcess"
                    />
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      type="primary"
                      style="margin-left: 20px"
                      @click="handleQueryProcess"
                      >搜索</el-button
                    >
                    <el-button @click="reset">重置</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
            <el-col :span="2">
              <div style="float: right">
                <el-button
                  type="primary"
                  @click="addNewProcess"
                  v-if="addIsShow"
                  >添加</el-button
                >
              </div>
            </el-col>
          </el-row>
        </div>
        <div style=" height: 100%">
          <vxe-table
            ref="xTable"
            auto-resize
            height="77%"
            border="inner"
            :loading="loading"
            :seq-config="{
              startIndex:
                (processTablePage.currentPage - 1) * processTablePage.pageSize
            }"
            :checkbox-config="{ reserve: true }"
            :data="processData"
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
            <vxe-table-column field="checkCode" title="编号" align="center">
              <template slot-scope="scope">
                <!-- style="color: #91d3f8" -->
                <el-button
                  type="text"
                  @click="getProcessInfoByCode(scope.row)"
                  >{{ scope.row.checkCode }}</el-button
                >
              </template>
            </vxe-table-column>
            <vxe-table-column
              field="processName"
              title="工序名称"
              align="center"
            >
            </vxe-table-column>
            <vxe-table-column
              field="positionName"
              title="部位名称"
              align="center"
            >
            </vxe-table-column>
            <vxe-table-column
              field="check"
              title="检查项"
              align="center"
              width="80"
            >
              <template slot-scope="scope">
                <!-- style="color: #91d3f8" -->
                <el-button type="text" @click="getCheck(scope.row)"
                  >2</el-button
                >
              </template>
            </vxe-table-column>
            <vxe-table-column
              field="result"
              title="结果"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.result === true">可继续进行</span>
                <span v-if="scope.row.result == false">不可继续进行</span>
              </template>
            </vxe-table-column>
            <vxe-table-column
              field="createTime"
              title="提交时间"
              align="center"
              width="140"
            >
              <template slot-scope="scope">
                {{ scope.row.createTime | dataFormat("yyyy-MM-dd") }}
              </template>
            </vxe-table-column>

            <vxe-table-column
              field="state"
              title="审批状态"
              align="center"
              width="80"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.state == 1">未开始</span>
                <span v-if="scope.row.state == 2">进行中</span>
                <span v-if="scope.row.state == 3">已结束</span>
              </template>
            </vxe-table-column>
            <vxe-table-column
              field="nowSignProcess"
              title="当前签字"
              align="center"
              width="100"
            >
            </vxe-table-column>
            <vxe-table-column
              field="fjImage"
              title="影像"
              align="center"
              width="80"
            >
              <template slot-scope="scope">
                <el-button type="text" @click="processFjCounts(scope.row)"
                  >共{{
                    scope.row.fjImage === undefined ? 0 : scope.row.fjImage
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
                    @click="updateProcessRow(scope.row)"
                    >修改</el-button
                  >
                  <el-divider direction="vertical"></el-divider>
                  <el-button
                    type="text"
                    :disabled="scope.row.state != '1'"
                    @click="deleteProcessRow(scope.row)"
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
                          @click="approvalProcessRow(scope.row)"
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
                          @click="reportFormProcessRow(scope.row)"
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
            :current-page="processTablePage.currentPage"
            :page-size="processTablePage.pageSize"
            :page-sizes="processTablePage.pageSizes"
            :total="processTablePage.total"
            :layouts="[
              'PrevPage',
              'JumpNumber',
              'NextPage',
              'FullJump',
              'Sizes',
              'Total'
            ]"
            @page-change="handlePageChangeProcess"
          >
          </vxe-pager>
        </div>
      </div>
      <div v-show="selectTab === 'tab2'">
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
          </el-row>
        </div>
        <div style=" height: 100%">
          <vxe-table
            ref="xTable"
            auto-resize
            height="77%"
            border="inner"
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
            <vxe-table-column field="reportCode" title="编号" align="center">
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
              width="120"
            >
            </vxe-table-column>
            <vxe-table-column
              field="startDate"
              title="建议开工日期"
              align="center"
              width="140"
            >
              <template slot-scope="scope">
                {{ scope.row.startDate | dataFormat("yyyy-MM-dd") }}
              </template>
            </vxe-table-column>
            <vxe-table-column
              field="endDate"
              title="建议完工日期"
              align="center"
              width="140"
            >
              <template slot-scope="scope">
                {{ scope.row.endDate | dataFormat("yyyy-MM-dd") }}
              </template>
            </vxe-table-column>
            <vxe-table-column
              field="createUser"
              title="创建人"
              align="center"
              width="120"
            >
            </vxe-table-column>
            <vxe-table-column
              field="state"
              title="审批状态"
              align="center"
              width="120"
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
              width="120"
            >
            </vxe-table-column>
            <vxe-table-column
              field="fjCount"
              title="附件"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-button type="text" @click="reportFjCounts(scope.row)"
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
              width="120"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <div style="width: 100%;">
                  <el-button
                    type="text"
                    :disabled="scope.row.state === '1'"
                    @click="recordRow(scope.$index, scope.row)"
                    >记录</el-button
                  >
                  <el-divider direction="vertical"></el-divider>
                  <el-button
                    type="text"
                    style="margin-left:4px"
                    :disabled="scope.row.state === '1'"
                    @click="reportFormRow(scope.$index, scope.row)"
                    >报表</el-button
                  >
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
    <AddProcess
      ref="AddProcess"
      :show="dialogShow"
      @cancel="cancel"
    ></AddProcess>
    <ReportDetil ref="ReportDetil" :show="dialogShow"></ReportDetil>
    <ProcessDetil ref="ProcessDetil" :show="dialogShow"></ProcessDetil>
    <UpdateProcess
      ref="UpdateProcess"
      :show="dialogShow"
      @cancel="cancel"
    ></UpdateProcess>
    <ProcessApproval
      ref="ProcessApproval"
      :show="dialogShow"
      @cancel="cancel"
    ></ProcessApproval>
    <CheckList ref="CheckList" :show="dialogShow"></CheckList>
    <FJDetil
      ref="FJDetil"
      sortCode="startReport"
      :show="dialogShow"
      @cancel="cancel"
    ></FJDetil>
    <StartFlow ref="StartFlow" @startFlowCallBack="rowCallBack"></StartFlow>
    <HistoryFlow ref="HistoryFlow"></HistoryFlow>
    <FineReport ref="FineReport"></FineReport>
    <StartFineReport ref="StartFineReport"></StartFineReport>
  </div>
</template>

<script>
import ReportDetil from "@/views/steps/startReport/startReportDetil";
import OrganizTreeSelect from "@/components/system/OrganizTreeSelect";
import AddProcess from "@/views/steps/processCheck/addProcessCheck";
import ProcessDetil from "@/views/steps/processCheck/processCheckDetil";
import UpdateProcess from "@/views/steps/processCheck/updateProcessCheck";
import ProcessApproval from "@/views/steps/processCheck/processCheckApproval";
import CheckList from "@/views/steps/processCheck/checkList";
import FJDetil from "@/views/steps/startReport/FJDetil";
import StartFlow from "@/components/flow/page/examine/startFlow";
import HistoryFlow from "@/components/flow/page/examine/historyFlow";
import FineReport from "@/views/steps/processCheck/FineReport";
import StartFineReport from "@/views/steps/startReport/FineReport";

import {
  getProcessCheckList,
  getWbsTree,
  delProcess
} from "@/api/steps/processCheck/processCheck";
import {
  getStartReportList,
  getFjCount
} from "@/api/steps/startReport/startReport";

export default {
  name: "StepsProcessCheckProcessCheck",
  components: {
    OrganizTreeSelect,
    AddProcess,
    ReportDetil,
    ProcessDetil,
    UpdateProcess,
    ProcessApproval,
    CheckList,
    FJDetil,
    StartFlow,
    HistoryFlow,
    FineReport,
    StartFineReport
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
      templateData: "",
      dialogShow: undefined,
      total: 0,
      selectTab: "tab1",
      activeName: "first",
      isUpdate1: true,
      isUpdate2: false,
      addIsShow: false,
      id: undefined,
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
      data2: [],
      treeData: [],
      testydpoints: [],
      processTableData: [],
      processTablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        align: "right",
        pageSizes: [10, 30, 50, 100, 200, 500]
      },
      tableData: [],
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        align: "right",
        pageSizes: [10, 30, 50, 100, 200, 500]
      },
      processObject: {
        pageSize: 10,
        pageNumber: 1,
        searchName: undefined,
        wbsId: undefined,
        state: undefined
      },
      object: {
        pageSize: 10,
        pageNumber: 1,
        searchName: undefined,
        stakeNumber: undefined,
        wbsId: undefined,
        state: undefined,
        reportCode: undefined
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
      treeParams: {
        props: {
          children: "children",
          label: "name",
          rootId: "0",
          disabled: "disabled",
          parentId: "parentId",
          value: "id"
        }
      },
      addParams: {
        nowTime: undefined,
        addId: undefined,
        orgIdAdd: undefined,
        wbsIdAdd: undefined,
        wbsCodeAdd: undefined,
        wbsNameAdd: undefined,
        wbsNamesAdd: undefined,
        wbsCodesAdd: undefined
      },
      gridOptions: {},
      fatherTree: [],
      reportIds: [],
      reportData: [],
      ids: undefined,
      pIds: undefined,
      processData: [],
      processIds: []
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
  methods: {
    //提交
    submitRow(index, row) {
      let id = row.id;
      let od = this.addParams.orgIdAdd;
      this.$refs.StartFlow.showModal(od, "process", id);
    },
    //行内提交回调更新数据
    rowCallBack(success, orderId) {
      if (success === true) {
        this.cancel();
      }
    },
    //记录
    recordRow(index, row) {
      let oderID = row.flowId;
      this.$refs.HistoryFlow.showModal(oderID);
    },
    //工序报验报表
    reportFormProcessRow(row) {
      let id = row.id;
      let oid = row.orgId;
      this.$refs.FineReport.showModal(id, oid);
    },
    //开工报告报表
    reportFormRow(index, row) {
      let id = row.id;
      let oid = row.orgId;
      this.$refs.StartFineReport.showModal(id, oid);
    },
    tabChange(index) {
      this.tabIndex = index;
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
        // alert(this.treeData[0].name+"    this.addParams.wbsNamesAdd")
      });
      this.childrenNode = [];
      this.isFindFirstChildren = false;
      this.getChildrenNode(this.treeData);
      this.$refs.refTree.setCurrentKey(this.firstChildren.id);
      this.selectedKey = this.firstChildren.id;
      this.templateData = this.firstChildren.id;
      this.object.wbsId = this.firstChildren.id;
      this.processObject.wbsId = this.firstChildren.id;

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
      // alert(this.addParams.wbsCodesAdd);
      await this.getProcessList();
      await this.getList();
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
    familyTree(arr, id) {
      var temp = [];
      var forFn = function(arr, id) {
        for (var i = 0; i < arr.length; i++) {
          var item = arr[i];
          if (item.id === id) {
            temp.push(item);
            forFn(arr, item.parentId);
            break;
          } else {
            if (item.children) {
              forFn(item.children, id);
            }
          }
        }
      };
      forFn(arr, id);
      return temp;
    },
    getNodeData(node, data, value) {
      // this.$confirm(node, "node");
      //this.$confirm(data,'node')
      this.object.wbsId = node.id;
      this.processObject.wbsId = node.id;
      // debugger
      this.addParams.wbsIdAdd = node.id;
      this.addParams.wbsCodeAdd = node.code;
      this.addParams.wbsNameAdd = node.name;
      this.addParams.wbsNamesAdd = data.data.name;
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
        this.getProcessList();
        this.getList();
      }
    },
    handlePageChangeProcess({ currentPage, pageSize }) {
      this.processTablePage.currentPage = currentPage;
      this.processTablePage.pageSize = pageSize;
      this.processObject.pageSize = pageSize;
      this.processObject.pageNumber = currentPage;
      this.getProcessList();
    },
    async getProcessList() {
      this.loading = true;
      await getProcessCheckList({ ...this.processObject }).then(response => {
        this.loading = false;
        this.processTableData = response.rows;
        this.processTablePage.total = response.total;
        this.pIds = this.processTableData.map(res => res.id).join(",");
      });
      //获取附件个数集合
      await getFjCount({ businessIds: this.pIds }).then(response => {
        this.processIds = response.data;
      });
      this.setProcessFjCount();
    },
    //拼接附件数量
    setProcessFjCount() {
      this.processData = [];
      for (let i = 0; i < this.processTableData.length; i++) {
        for (let j = 0; j < this.processIds.length; j++) {
          if (this.processTableData[i].id === this.processIds[j].bussinessId) {
            this.processTableData[i].fjImage = this.processIds[j].count;
          }
        }
      }
      this.$nextTick(() => {
        this.processData = this.processTableData;
      });
    },
    processFjCounts(row) {
      let id = row.id;
      let orgId = row.orgId;
      this.$refs.FJDetil.showModal(id, orgId);
    },
    handlePageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage;
      this.tablePage.pageSize = pageSize;
      this.object.pageSize = pageSize;
      this.object.pageNumber = currentPage;
      this.getList();
    },
    async getList() {
      // this.loading = true;
      await getStartReportList(this.object).then(response => {
        console.log(response);
        // this.loading = false;
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
    reportFjCounts(row) {
      let id = row.id;
      let orgId = row.orgId;
      this.$refs.FJDetil.showModal(id, orgId);
    },
    cancel() {
      this.getProcessList();
      this.getList();
    },

    //新增工序报验
    addNewProcess() {
      this.addParams.addId = this.getRandomInt();
      this.addParams.nowTime = new Date();
      this.$refs.AddProcess.showModal(this.addParams);
    },
    //获取工序报验详情
    getProcessInfoByCode(row) {
      this.currentId = row.id;
      let oid = this.addParams.orgIdAdd;
      this.$refs.ProcessDetil.showModal(this.currentId, oid);
    },
    getCheck(row) {
      this.currentId = row.id;
      this.$refs.CheckList.showModal(this.currentId);
    },
    //获取开工报告详情
    getInfoByCode(row) {
      this.currentId = row.id;
      let oid = this.addParams.orgIdAdd;
      this.$refs.ReportDetil.showModal(this.currentId, oid);
    },
    //修改工序报验
    updateProcessRow(row) {
      let id = row.id;
      let oid = this.addParams.orgIdAdd;
      this.$refs.UpdateProcess.showModal(id, oid);
    },

    //删除
    deleteProcessRow(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let delId = row.id;
        delProcess({ id: delId }).then(res => {
          if (res.success) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getProcessList();
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
    approvalProcessRow(row) {
      this.currentId = row.id;
      let oid = this.addParams.orgIdAdd;
      this.$refs.ProcessApproval.showModal(this.currentId, oid);
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
    handleQueryProcess() {
      this.getProcessList();
    },
    handleQuery() {
      this.getList();
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
    reset() {
      // this.getProjectTree();
      this.object.searchName = "";
      this.object.state = "";
      this.processObject.state = "";
      this.processObject.searchName = "";
      this.getProcessList();
      this.getList();
    }
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
  .tree-box {
    padding-left: 15px;
    padding-right: 10px;
    height: 82%;
    overflow-x: scroll;
    overflow-y: auto;
  }
  .startPort {
    border: 1px solid hsl(240, 76%, 22%);
  }
  /deep/.vxe-table--empty-placeholder {
    height: 100% !important;
  }
}
</style>
