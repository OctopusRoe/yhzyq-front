<template>
  <el-dialog
    v-if="isShow"
    title="修改开工报告"
    :visible.sync="showUpdateReport"
    :append-to-body="true"
    :close-on-click-modal="false"
    width="45%"
    class="dialog-common"
    @close="closeDialog"
  >
    <div style=" overflow-x: hidden; overflow-y: auto; height:650px">
      <el-form :model="form" ref="form" :rules="rules">
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
                  placeholder=""
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
                  placeholder=""
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
                  placeholder=""
                  :disabled="true"
                  v-model="form.supervisorUnit"
                  autocomplete="off"
                  style="small"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="编号:" label-width="35%" prop="reportCode">
                <el-input
                  placeholder=""
                  :disabled="true"
                  v-model="form.reportCode"
                  autocomplete="off"
                  style="small"
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
                  :disabled="true"
                  autocomplete="off"
                  style="small"
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
                <InputSelectUser
                  v-model="users"
                  typeAndLevel="00,102,110,12,13,210,23,03"
                  parentCode="5696a90c9c4a49578be7748bdd2153a3"
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
          :orgId="oid"
          :businessID="currentId"
        ></UploadManageFrame>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">保存</el-button>
      <el-button type="primary" @click="cancel" style="margin-left:50px"
        >关 闭</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import {
  getStartReportDetil,
  updateStartReport,
  getUnitName
} from "@/api/steps/startReport/startReport";
import InputSelectUser from "@/components/system/InputSelectUser";
import UploadManageFrame from "@/components/fileUploader/UploadManageFrame";
export default {
  name: "",
  components: { InputSelectUser, UploadManageFrame },
  data() {
    return {
      textName: undefined,
      currentId: undefined,
      showUpdateReport: false,
      isShow: false,
      sectionName: undefined, //标段名称
      oid: undefined,
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
        stakeNumber: undefined, //桩号
        leaderId: undefined, //负责人id
        leader: undefined, //负责人姓名
        startDate: undefined, //建议开工日期
        endDate: undefined, //计划完工日期
        supervisorId: undefined, //监理单位ID
        supervisorUnit: undefined, //监理单位
        projectId: undefined, //项目ID
        projectCode: undefined, //项目CODE
        sectionId: undefined, //标段ID
        sectionCode: undefined, //标段编码
        createTime: undefined, //创建时间
        createUser: undefined, //创建人
        state: undefined, //流程状态 1:未开始 2:进行中 3:已结束
        flowId: undefined, //流程实例ID
        remark: undefined //备注
      },
      rules: {
        // contractingUnit: [
        //   { required: true, message: "承包单位不能为空", trigger: "blur" }
        // ],
        // sectionId: [
        //   { required: true, message: "合同段不能为空", trigger: "blur" }
        // ],
        // jianlidanwei: [
        //   { required: true, message: "监理单位不能为空", trigger: "blur" }
        // ],
        // reportCode: [
        //   { required: true, message: "开工编号不能为空", trigger: "blur" }
        // ],
        gongchengbuwei: [
          { required: true, message: "工程部位不能为空", trigger: "blur" }
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
      },
      updatefjDate: [
        {
          fileName: "材料说明",
          fileType: ".doc",
          createPeople: "马云",
          createTime: "2021/5/15",
          downloadNumber: "2"
        }
      ]
    };
  },
  methods: {
    showModal(id, oid) {
      this.currentId = id;
      this.oid = oid;
      // this.getName();
      this.getStartReportDetilById();
      this.showUpdateReport = true;
      this.isShow = true;
    },
    getStartReportDetilById() {
      getStartReportDetil({ id: this.currentId }).then(response => {
        // debugger
        this.form = response.data;
        this.initDataList[0].id = response.data.leaderId;
        this.initDataList[0].name = response.data.leader;
      });
      // debugger
    },
    getName() {
      getUnitName({ orgId: this.oid }).then(res => {
        console.log(res.data);
        //标段信息
        // debugger
        if (res.data.fSection !== null) {
          this.sectionName = res.data.fSection.name; //标段name
        }
      });
    },
    getDatas(data) {
      this.form.leaderId = data[0].id;
      this.form.leader = data[0].name;
    },
    approvalRow(row) {
      console.log(row);
    },
    updateRow(row) {
      console.log(row);
    },
    //修改保存按钮
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          updateStartReport(this.form).then(response => {
            if (response.rtnCode === 200) {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.$refs["form"].resetFields();
              this.isShow = false;
              this.showUpdateReport = false;
              this.$emit("cancel");
            }
          });
        }
      });
    },
    //关闭按钮
    cancel() {
      this.$refs["form"].resetFields();
      this.isShow = false;
      this.showUpdateReport = false;
      this.reset();
    },
    closeDialog() {
      this.$refs["form"].resetFields();
    },
    handlerOrganizSelect(data, node) {
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
      this.sectionName = "";
      this.form = {
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
        stakeNumber: undefined, //桩号
        leaderId: undefined, //负责人id
        leader: undefined, //负责人姓名
        startDate: undefined, //建议开工日期
        endDate: undefined, //计划完工日期
        supervisorId: undefined, //监理单位ID
        supervisorUnit: undefined, //监理单位
        projectId: undefined, //项目ID
        projectCode: undefined, //项目CODE
        sectionId: undefined, //标段ID
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
