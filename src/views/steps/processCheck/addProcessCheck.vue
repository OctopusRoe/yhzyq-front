<template>
  <el-dialog
    v-if="isExist"
    title="新增工序报验"
    :visible.sync="dialogShow"
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
            <el-col :span="24">
              <el-form-item
                label="工程单元"
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
              <el-form-item label="工序:" label-width="35%" prop="processName">
                <!-- <TreeSelect :data="treeDataPro" v-model="form.processName" @select="select" @close="close"></TreeSelect> -->
                <treeselect
                  v-model="value"
                  :options="options"
                  @select="select"
                  :clearable="false"
                  :normalizer="normalizer"
                  :show-count="true"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="已完成比率(%):"
                label-width="44%"
                prop="processRate"
              >
                <el-input
                  v-model="processData.processRate"
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
                label="完成部位名称:"
                label-width="35%"
                prop="positionName"
              >
                <el-input
                  v-model="form.positionName"
                  autocomplete="off"
                  style="small"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="要求监理到场时间:"
                label-width="44%"
                prop="arriveTime"
              >
                <el-date-picker
                  v-model="form.arriveTime"
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
        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="完成部位占比(%):"
                label-width="35%"
                prop="positionProportion"
              >
                <el-input
                  v-model="form.positionProportion"
                  size="small"
                  @blur="onInputBlur"
                  oninput="value=value.replace(/[^\d.]/g,'')"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注:" label-width="17.5%" prop="remark">
                <el-input
                  type="textarea"
                  :rows="2"
                  v-model="form.remark"
                  size="small"
                  autocomplete="off"
                  placeholder="请输入内容"
                ></el-input>
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
  addProcessCheck,
  getProcessTree,
  getUnitName
} from "@/api/steps/processCheck/processCheck";
import InputSelectUser from "@/components/system/InputSelectUser";
import Treeselect from "@riophae/vue-treeselect";
import UploadManageFrame from "@/components/fileUploader/UploadManageFrame";
import StartFlow from "@/components/flow/page/examine/startFlow";
export default {
  name: "",
  components: { InputSelectUser, Treeselect, UploadManageFrame, StartFlow },
  data() {
    return {
      isExist: false,
      currentId: undefined,
      dialogShow: false,
      orgId: undefined,
      wbsId: undefined,
      wbsIdForm: {
        wbsId: undefined
      },
      checkable: false,
      dialogFormVisible: false,
      users: [],
      treeDataPro: [],
      treeNodes: 0,
      value: "",
      options: [],
      current: {},
      initDataList: [
        { id: "40288193535929d2015359784df70006", name: "管理员" }
      ],
      processRatePublic: undefined,
      processData: {
        processRate: undefined
      },
      form: {
        id: undefined,
        orgId: undefined, //组织机构ID
        checkCode: undefined, //编号
        wbsId: undefined, //分部分项id
        wbsCode: undefined, //工程编号
        wbsName: undefined, //工程名称
        wbsCodes: undefined, //工程编号串 工程编号:分部/分项/../计量单元
        wbsNames: undefined, //工程名称:分部/分项/../计量单元
        processId: undefined, //工序id
        processCode: undefined, //工序编号
        processName: undefined, //工序名称
        processRate: undefined, //工序占比
        positionName: undefined, //完成部位名称
        positionProportion: undefined, //完成部位占比
        arriveTime: undefined, //要求监理到场时间
        isContinue: undefined, //监理检查是否可继续进行
        result: undefined, //监理检查是否符合要求
        projectId: undefined, //项目ID
        projectCode: undefined, //项目CODE
        sectionId: undefined, //标段ID
        sectionCode: undefined, //标段编码
        sectionName: undefined, //标段名称
        createTime: undefined, //创建时间
        createUser: undefined, //创建人
        remark: undefined, //备注
        state: undefined, //流程状态 1:未开始 2:进行中 3:已结束
        flowId: undefined, //流程实例ID
        contractingUnit: undefined, //承包单位名称
        supervisorUnit: undefined //监理单位
      },
      defaultName: {
        contractingUnitName: undefined, //
        supervisorUnitName: undefined, //
        sectionIdName: undefined, //
        reportCodeName: undefined, //
        progectName: undefined //
      },
      rules: {
        processName: [
          {
            required: true,
            message: "工序不能为空",
            trigger: "change"
          }
        ],
        positionName: [
          {
            required: true,
            message: "完成部位不能为空",
            trigger: "change"
          }
        ],
        positionProportion: [
          {
            required: true,
            message: "完成部位占比不能为空",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {},
  methods: {
    showModal(addParams) {
      this.form.arriveTime = addParams.nowTime;
      this.form.id = addParams.addId;
      this.form.orgId = addParams.orgIdAdd;
      this.form.wbsId = addParams.wbsIdAdd;
      this.form.wbsName = addParams.wbsNameAdd;
      this.form.wbsCode = addParams.wbsCodeAdd;
      this.form.wbsCodes = addParams.wbsCodesAdd;
      this.form.wbsNames = addParams.wbsNamesAdd;
      this.dialogShow = true;
      this.isExist = true;
      this.getProessTree();
      this.getName();
    },

    getName() {
      getUnitName({ orgId: this.form.orgId }).then(res => {
        console.log(res.data);
        //标段信息
        if (res.data.fSection !== null) {
          this.form.contractingUnit = res.data.fSection.buildUnitIdStr; //施工单位
          this.form.sectionName = res.data.fSection.name; //标段name
          this.form.sectionId = res.data.fSection.id; //标段ID
          this.form.sectionCode = res.data.fSection.code; //标段编码
        }
        // 监理信息
        if (res.data.fjSupervisorDept !== null) {
          // this.form.supervisorId = res.data.fSection.id; //监理单位ID
          this.form.supervisorUnit = res.data.fjSupervisorDept.name; //监理单位名称
        }
        // debugger
        //项目信息
        if (res.data.fjProject !== null) {
          this.form.projectId = res.data.fjProject.id; //项目ID
          this.form.projectCode = res.data.fjProject.code; //项目编码
        }
      });
    },
    getProessTree() {
      getProcessTree({ wbsId: this.form.wbsId }).then(res => {
        this.options = [];
        const item = { id: "", name: "root", children: [] };
        // this.treeDataPro = res.data;
        item.children = res.data;
        item.children.forEach(o => {
          if (!o.children) delete o.children;
        });
        this.options.push(item);

        this.value = this.id || "";
      });
    },
    /** 转换菜单数据结构 */
    normalizer(node) {
      if (node.children == null) {
        delete node.children;
      }
      return {
        id: node.id,
        label: node.name,
        children: node.children
      };
    },
    select(opt) {
      // debugger
      this.form.positionName = opt.name;
      this.form.processId = opt.id;
      this.form.processName = opt.name;
      this.form.processCode = opt.code;
      this.processData.processRate = opt.processRate;
      this.processRatePublic = opt.processRate;
      this.form.positionProportion = "100";
      this.$emit("select", opt);
    },
    onInputBlur() {
      // debugger
      let num = this.form.positionProportion;
      if (num > 100) {
        this.form.positionProportion = 100;
      }
      if (num < 0) {
        this.form.positionProportion = 0;
      }
      let a = this.form.positionProportion;
      let b = this.processRatePublic;
      let c = (a * b) / 100;
      this.processData.processRate = c;
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
      this.$refs["form"].validate(valid => {
        // debugger
        if (valid) {
          // this.$message(this.users)
          if (this.users.length > 0) {
            this.form.leaderId = this.users[0].id;
            this.form.leader = this.users[0].name;
          }
          this.form.state = "1";
          addProcessCheck(this.form).then(response => {
            if (response.rtnCode === 200) {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.reset();
              this.$refs["form"].resetFields();
              this.dialogShow = false;
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
          if (this.users.length > 0) {
            this.form.leaderId = this.users[0].id;
            this.form.leader = this.users[0].name;
          }
          this.form.state = "1";
          addProcessCheck(this.form).then(response => {});
          this.$refs.StartFlow.showModal(
            this.form.orgId,
            "process",
            this.form.id
          );
        }
      });
    },
    //回调
    addCallAction(success, orderId) {
      if (success == true) {
        this.reset();
        this.$refs["form"].resetFields();
        this.dialogShow = false;
        this.$emit("cancel");
      }
    },
    //关闭按钮
    cancel() {
      this.$refs["form"].resetFields();
      this.reset();
      this.dialogShow = false;
      this.$emit("cancel");
    },
    closeDialog() {
      this.$refs["form"].resetFields();
      this.reset();
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
      this.processData.processRate = undefined;
      this.form = {
        orgId: undefined, //组织机构ID
        checkCode: undefined, //编号
        wbsId: undefined, //分部分项id
        wbsCode: undefined, //工程编号
        wbsName: undefined, //工程名称
        wbsCodes: undefined, //工程编号串 工程编号:分部/分项/../计量单元
        wbsNames: undefined, //工程名称:分部/分项/../计量单元
        processId: undefined, //工序id
        processCode: undefined, //工序编号
        processName: undefined, //工序名称
        processRate: undefined, //工序占比
        positionName: undefined, //完成部位名称
        positionProportion: undefined, //完成部位占比
        arriveTime: undefined, //要求监理到场时间
        isContinue: undefined, //监理检查是否可继续进行
        result: undefined, //监理检查是否符合要求
        projectId: undefined, //项目ID
        projectCode: undefined, //项目CODE
        sectionId: undefined, //标段ID
        sectionCode: undefined, //标段编码
        sectionName: undefined, //标段名称
        createTime: undefined, //创建时间
        createUser: undefined, //创建人
        remark: undefined, //备注
        state: undefined, //流程状态 1:未开始 2:进行中 3:已结束
        flowId: undefined, //流程实例ID
        contractingUnit: undefined, //承包单位名称
        supervisorUnit: undefined //监理单位
      };
      this.isExist = false;
    }
  }
};
</script>
