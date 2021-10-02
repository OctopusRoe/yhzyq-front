<template>
  <el-dialog
    v-if="isExist"
    title="新增开工报告"
    :visible.sync="showAddReport"
    :append-to-body="true"
    :close-on-click-modal="false"
    width="45%"
    class="dialog-common"
    @close="closeDialog"
  >
    <div style=" overflow-x: hidden; overflow-y: auto; height:650px">
      <el-form ref="form" :model="form" :rules="rules">
        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="承包单位:"
                label-width="35%"
                prop="contractingUnit"
              >
                <el-input
                  v-model="form.contractingUnit"
                  size="small"
                  autocomplete="off"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="合同段:"
                label-width="35%"
                prop="sectionCode"
              >
                <el-input
                  v-model="form.sectionCode"
                  size="small"
                  autocomplete="off"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="监理单位:"
                label-width="35%"
                prop="supervisorUnit"
              >
                <el-input
                  v-model="form.supervisorUnit"
                  autocomplete="off"
                  style="small"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="编号:" label-width="35%" prop="reportCode">
                <el-input
                  v-model="form.reportCode"
                  autocomplete="off"
                  style="small"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-row>
            <el-col :span="24">
              <el-form-item
                label="工程部位"
                label-width="17.5%"
                prop="wbsNames"
              >
                <el-input
                  v-model="form.wbsNames"
                  autocomplete="off"
                  style="small"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="桩号:" label-width="35%" prop="stakeNumber">
                <el-input v-model="form.stakeNumber" size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="工程负责人:" label-width="35%" prop="leader">
                <!-- <el-input v-model="form.leader" size="small"></el-input> -->
                <InputSelectUser
                  typeAndLevel="00,102,110,12,13,210,23,03"
                  parentCode="5696a90c9c4a49578be7748bdd2153a3"
                  v-model="users"
                  :initDataList="initDataList"
                  @get-datas="getDatas"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="建议开工日期:"
                label-width="35%"
                prop="startDate"
              >
                <el-date-picker
                  v-model="form.startDate"
                  type="date"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="计划完工日期:"
                label-width="35%"
                prop="endDate"
              >
                <el-date-picker
                  v-model="form.endDate"
                  type="date"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <UploadManageFrame
          showuploader="true"
          sortCode="draw"
          :orgId="form.orgId"
          :businessID="form.id"
        ></UploadManageFrame>
      </el-form>
    </div>
    <StartFlow
      ref="StartFlow"
      :show="dialogShow"
      @startFlowCallBack="addCallAction"
    ></StartFlow>
    <div slot="footer" class="dialog-footer" style="text-align: center">
      <el-button type="primary" @click="submitForm">保存</el-button>
      <el-button type="primary" @click="saveApproval" style="margin-left: 50px"
        >提交审批</el-button
      >
      <el-button type="primary" @click="cancel" style="margin-left: 50px"
        >关闭</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import {
  addStartReport,
  getUnitName,
  saveReportCode
} from "@/api/steps/startReport/startReport";
import InputSelectUser from "@/components/system/InputSelectUser";
import UploadManageFrame from "@/components/fileUploader/UploadManageFrame";
import StartFlow from "@/components/flow/page/examine/startFlow";
export default {
  name: "",
  components: { InputSelectUser, UploadManageFrame, StartFlow },
  data() {
    return {
      dialogShow: undefined,
      isExist: false,
      currentId: undefined,
      showAddReport: false,
      id: undefined,
      orgId: undefined,
      checkable: false,
      dialogFormVisible: false,
      users: [],
      initDataList: [
        { id: "40288193535929d2015359784df70006", name: "管理员" }
      ],
      form: {
        id: undefined,
        orgId: undefined, //组织机构ID
        contractingUnit: undefined, //承包单位名称
        contractingCode: undefined, //承包单位合同编号
        reportCode: undefined, //开工编号
        wbsId: undefined, //分部分项id
        wbsCode: undefined, //工程编号
        wbsName: undefined, //工程名称
        wbsCodes: undefined, //工程编号串 工程编号:分部/分项/../计量单元
        wbsNames: undefined, //工程名称:分部/分项/../计量单元
        stakeNumber: "", //桩号
        leaderId: "40288193535929d2015359784df70006", //负责人id
        leader: "管理员", //负责人姓名
        startDate: undefined, //建议开工日期
        endDate: undefined, //计划完工日期
        supervisorId: undefined, //监理单位ID
        supervisorUnit: undefined, //监理单位
        projectId: undefined, //项目ID
        projectCode: undefined, //项目CODE
        projectName: undefined, //项目名称
        sectionId: undefined, //标段ID
        sectionName: undefined, //标段名称
        sectionCode: undefined, //标段编码
        createTime: undefined, //创建时间
        createUser: undefined, //创建人
        state: undefined, //流程状态 1:未开始 2:进行中 3:已结束
        flowId: undefined, //流程实例ID
        remark: undefined //备注
      },
      defaultName: {
        contractingUnitName: undefined, //
        supervisorUnitName: undefined, //
        sectionIdName: undefined, //
        reportCodeName: undefined, //
        progectName: undefined //
      },
      rules: {
        stakeNumber: [
          {
            required: true,
            pattern: /^([a-zA-Z]){1,3}\d{1,10}[+]([1-9]\d*\.\d+|0\.\d*[1-9]\d*|\d+)[~]([a-zA-Z]){1,3}\d{1,10}[+]([1-9]\d*\.\d+|0\.\d*[1-9]\d*|\d+)$/,
            message: "正确桩号格式范例：K21+63.86~K56+1248",
            trigger: "change"
          }
        ],
        startDate: [
          {
            trpe: "date",
            required: true,
            message: "建议开工日期不能为空",
            trigger: "change"
          }
        ],
        endDate: [
          {
            trpe: "date",
            required: true,
            message: "计划完工日期不能为空",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {},
  methods: {
    showModal(addParams) {
      this.form.id = addParams.addId;
      this.form.orgId = addParams.orgIdAdd;
      this.form.wbsId = addParams.wbsIdAdd;
      this.form.wbsName = addParams.wbsNameAdd;
      this.form.wbsCode = addParams.wbsCodeAdd;
      this.form.wbsCodes = addParams.wbsCodesAdd;
      this.form.wbsNames = addParams.wbsNamesAdd;
      this.form.stakeNumber = addParams.startAndEndStake;
      this.showAddReport = true;
      this.isExist = true;
      this.getName();
      this.saveReportCode();
    },
    getName() {
      getUnitName({ orgId: this.form.orgId }).then(res => {
        console.log(res.data);
        //标段信息
        if (res.data.fSection !== null) {
          this.form.contractingUnit = res.data.fSection.buildUnitIdStr; //施工单位
          // this.form.sectionName = res.data.fSection.name; //标段name
          this.form.sectionId = res.data.fSection.id; //标段ID
          this.form.sectionCode = res.data.fSection.code; //标段编码
          this.form.contractingCode = res.data.fSection.contractId; //合同ID
        }
        //监理信息
        if (res.data.fjSupervisorDept !== null) {
          this.form.supervisorId = res.data.fjSupervisorDept.id; //监理单位ID
          this.form.supervisorUnit = res.data.fjSupervisorDept.name; //监理单位名称
        }
        //项目信息
        if (res.data.fjProject !== null) {
          this.form.projectId = res.data.fjProject.id; //项目ID
          this.form.projectCode = res.data.fjProject.code; //项目编码
          this.form.projectName = res.data.fjProject.name;//项目名称
        }
      });
    },
    saveReportCode() {
      saveReportCode().then(res => {
        this.form.reportCode = res.data;
      });
    },
    getDatas(data) {
      this.form.leaderId = data[0].id;
      this.form.leader = data[0].name;
    },
    approvalRow(index, row) {
      console.log(row);
    },
    updateRow(index, row) {
      console.log(row);
    },
    deleteRow(index, row) {
      console.log(row);
    },
    //保存按钮
    submitForm() {
      debugger
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.state = "1";
          addStartReport(this.form).then(response => {
            if (response.rtnCode === 200) {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.reset();
              this.$refs["form"].resetFields();
              this.showAddReport = false;
              this.$emit("cancel");
            }
          });
        }
      });
    },
    //提交审批
    saveApproval() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.state = "1";
          addStartReport(this.form).then(response => {
            
          });
          this.$refs.StartFlow.showModal(
            this.form.orgId,
            "report",
            this.form.id
          );
        }
      });
      // await this.dialogSave();
    },
    addCallAction(success, orderId) {
      if (success == true) {
        this.reset2();
        this.$refs["form"].resetFields();
        this.showAddReport = false;
        this.$emit("cancel");
        // this.$refs["form"].validate(valid => {
        //   if (valid) {
        //     this.form.state = "2";
        //     addStartReport(this.form).then(response => {
        //       if (response.rtnCode === 200) {
        //         this.reset2();
        //         this.$refs["form"].resetFields();
        //         this.showAddReport = false;
        //         this.$emit("cancel");
        //       }
        //     });
        //   }
        // });
      }
    },
    dialogSave() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.state = "2";
          addStartReport(this.form).then(response => {
            if (response.rtnCode === 200) {
              // this.$message({
              //   message: "提交审批成功",
              //   type: "success"
              // });
              this.reset2();
              this.$refs["form"].resetFields();
              // this.showAddReport = false;
              // this.$emit("cancel");
            }
          });
        }
      });
    },
    //关闭按钮
    cancel() {
      this.$refs["form"].resetFields();
      this.reset();
      this.showAddReport = false;
      this.isExist = false;
      this.$emit("cancel");
    },
    closeDialog() {
      this.$refs["form"].resetFields();
      this.reset();
      this.showAddReport = false;
      this.isExist = false;
    },
    handlerOrganizSelect(data, node) {
      this.form.leader = data;
      console.log(data, node);
    },
    changeRootId() {
      this.$refs.organizTree.parentCode = "001001";
    },
    // 发树形被加载完
    onOrgTreeLoaded(treeData, checkednode) {},

    handlerOrganizCheck(data, node) {
      console.log(data, node);
    },
    getSeletors(values, node) {
      console.log(values);
      console.log(node);
    },
    getSelectedNodes() {
      var nodes = this.$refs.organizTree.checkedNodes;
      console.log(nodes);
    },
    getBeforeLoadData(treeData) {
      // treeData.forEach(item => {
      //   item.disabled = true
      // })
    },
    handlerTransferChange(selectKeys) {
      console.log("44444444", selectKeys);
    },
    lookHandler() {
      console.log("44444444", this.users);
    },
    //重置表单
    reset() {
      this.users = [];
      this.form = {
        orgId: undefined, //组织机构ID
        contractingUnit: undefined, //承包单位名称
        contractingCode: undefined, //承包单位合同编号
        reportCode: undefined, //开工编号
        wbsId: undefined, //分部分项id
        wbsCode: undefined, //工程编号
        wbsName: undefined, //工程名称
        wbsCodes: undefined, //工程编号串 工程编号:分部/分项/../计量单元
        wbsNames: undefined, //工程名称:分部/分项/../计量单元
        stakeNumber: "", //桩号
        leaderId: "40288193535929d2015359784df70006", //负责人id
        leader: "管理员", //负责人姓名
        startDate: undefined, //建议开工日期
        endDate: undefined, //计划完工日期
        supervisorId: undefined, //监理单位ID
        supervisorUnit: undefined, //监理单位
        projectId: undefined, //项目ID
        projectCode: undefined, //项目CODE
        projectName: undefined, //项目名称
        sectionId: undefined, //标段ID
        sectionName: undefined, //标段名称
        sectionCode: undefined, //标段编码
        createTime: undefined, //创建时间
        createUser: undefined, //创建人
        state: undefined, //流程状态 1:未开始 2:进行中 3:已结束
        flowId: undefined, //流程实例ID
        remark: undefined //备注
      };
      this.isExist = false;
    },
    reset2() {
      this.users = [];
      this.form = {
        orgId: undefined, //组织机构ID
        contractingUnit: undefined, //承包单位名称
        contractingCode: undefined, //承包单位合同编号
        reportCode: undefined, //开工编号
        wbsId: undefined, //分部分项id
        wbsCode: undefined, //工程编号
        wbsName: undefined, //工程名称
        wbsCodes: undefined, //工程编号串 工程编号:分部/分项/../计量单元
        wbsNames: undefined, //工程名称:分部/分项/../计量单元
        stakeNumber: "", //桩号
        leaderId: "40288193535929d2015359784df70006", //负责人id
        leader: "管理员", //负责人姓名
        // users: undefined,//
        startDate: undefined, //建议开工日期
        endDate: undefined, //计划完工日期
        supervisorId: undefined, //监理单位ID
        supervisorUnit: undefined, //监理单位
        projectId: undefined, //项目ID
        projectCode: undefined, //项目CODE
        projectName: undefined, //项目名称
        sectionId: undefined, //标段ID
        sectionName: undefined, //标段名称
        sectionCode: undefined, //标段编码
        createTime: undefined, //创建时间
        createUser: undefined, //创建人
        state: undefined, //流程状态 1:未开始 2:进行中 3:已结束
        flowId: undefined, //流程实例ID
        remark: undefined //备注
      };
    }
  }
};
</script>
