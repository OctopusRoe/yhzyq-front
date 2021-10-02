<template>
  <el-dialog
    v-if="isExist"
    title="修改交工证书"
    :visible.sync="dialogShow"
    :append-to-body="true"
    :close-on-click-modal="false"
    width="60%"
    top="70"
    class="dialog-common"
    @close="closeDialog"
  >
    <div style=" overflow-x: hidden; overflow-y: auto; height:650px">
      <el-form ref="form" :model="form" :rules="rules">
        <div>
          <tr>
            <td class="left" colspan="5">
              <span style="font-size: 18px;">工程单元</span>
            </td>
          </tr>
          <el-row>
            <el-col :span="24">
              <el-form-item
                label="单元名称"
                label-width="10%"
                prop="wbsFullName"
              >
                <el-input
                  v-model="form.wbsFullName"
                  autocomplete="off"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div>
          <tr>
            <td class="left" colspan="5">
              <span style="font-size: 18px;">子目清单</span>
            </td>
          </tr>
          <vxe-table
            border
            resizable
            show-footer
            ref="xTable"
            height="300"
            align="center"
            :data="tableDataList2"
          >
            <vxe-table-column
              type="seq"
              title="序号"
              width="60"
            ></vxe-table-column>
            <vxe-table-column
              field="subitemCode"
              title="子目号"
              width="100"
            ></vxe-table-column>
            <vxe-table-column
              field="subitemName"
              title="子目名称"
              width="180"
            ></vxe-table-column>
            <vxe-table-column
              field="meterageUnit"
              title="单位"
            ></vxe-table-column>
            <vxe-table-colgroup title="清单">
              <vxe-table-column
                field="correctionNumber"
                title="修编后数量"
              ></vxe-table-column>
              <vxe-table-column
                field="currentAllowNumber"
                title="本次允许计量"
                v-if="false"
              ></vxe-table-column>
              <!--实际为 申报数量 -->
              <vxe-table-column field="applyNumber" title="本次允许计量">
                <template slot-scope="scope">
                  <vxe-input
                    type="number"
                    min="0"
                    :max="scope.row.applyNumber"
                    v-model="scope.row.applyNumber"
                    :disabled="scope.row.applyNumber === 0"
                    @blur="applyNumberBlur(scope.row)"
                  ></vxe-input>
                </template>
              </vxe-table-column>
              <vxe-table-column
                field="checkNumber"
                title="核定数量"
                v-if="false"
              ></vxe-table-column>
              <vxe-table-column
                field="allowNumber"
                title="累计允许计量"
              ></vxe-table-column>
            </vxe-table-colgroup>
            <vxe-table-colgroup title="变更">
              <vxe-table-column
                field="changeNumber"
                title="变更数量"
              ></vxe-table-column>
              <vxe-table-column
                field="changeApplyNumber"
                title="申报数量"
                v-if="false"
              ></vxe-table-column>
              <vxe-table-column
                field="changeCheckNumber"
                title="核定数量"
                v-if="false"
              ></vxe-table-column>
              <vxe-table-column
                field="currentAllowChangeMeterage"
                title="本次允许变更计量"
              ></vxe-table-column>
              <vxe-table-column
                field="allowChangeMeterage"
                title="累计允许变更计量"
              ></vxe-table-column>
            </vxe-table-colgroup>
          </vxe-table>
        </div>

        <div>
          <tr>
            <td class="left" colspan="5">
              <span style="font-size: 18px;">自检及评定</span>
            </td>
          </tr>
          <el-row>
            <el-col :span="10">
              <el-form-item
                label="自检及评定结果:"
                label-width="32%"
                prop="result"
              >
                <div style="margin-top:10px">
                  <vxe-radio
                    name="result"
                    v-model="form.result"
                    label="1"
                    content="合格"
                  ></vxe-radio>
                  <vxe-radio
                    name="result"
                    v-model="form.result"
                    label="2"
                    content="不合格"
                  ></vxe-radio>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="实际项目得分:"
                label-width="35%"
                prop="score"
              >
                <el-input
                  v-model="form.score"
                  autocomplete="off"
                  size="small"
                  @blur="onInputBlur"
                  oninput="value=value.replace(/[^\d.]/g,'')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label="分"> </el-form-item>
            </el-col>
          </el-row>
          <tr>
            <td class="left" colspan="5">
              <span style="font-size: 18px;">完成日期</span>
            </td>
          </tr>

          <el-form-item label="日期" label-width="12%" prop="completeDate">
            <el-date-picker
              v-model="form.completeDate"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </div>

        <UploadManageFrame
          showuploader="true"
          sortCode="draw"
          :orgId="orgId"
          :businessID="currentId"
        ></UploadManageFrame>
      </el-form>
    </div>
    <StartFlow ref="StartFlow" @startFlowCallBack="addCallAction"></StartFlow>
    <ExamineFlow
      ref="ExamineFlow"
      @examainCallBack="approvalAction"
    ></ExamineFlow>
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
  updateGxCompleteCertificate,
  getCertificateById,
  getGxList,
  updateGxList,
  getCompleteByFlowId
} from "@/api/steps/completeCertificate/certificate";
import UploadManageFrame from "@/components/fileUploader/UploadManageFrame";
import StartFlow from "@/components/flow/page/examine/startFlow";
import ExamineFlow from "@/components/flow/page/examine/examineFlow";
export default {
  name: "",
  components: { UploadManageFrame, StartFlow, ExamineFlow },
  data() {
    return {
      processProportion: 0, //工序全部完成比
      processTableData: [],
      randomNumberIds: 0, //随机数ID
      radomId: 0, //
      listData: [],
      ids: [], //工序ID集合
      ProcessByIdsData: [], //通过工序ID集合获取工序集合数据
      allProportion: 0, //
      processObject: {
        pageSize: 10,
        pageNumber: 1,
        searchName: undefined,
        wbsId: undefined,
        state: undefined
      },
      certificateObject: {
        pageSize: 10,
        pageNumber: 1,
        searchName: undefined,
        wbsId: undefined,
        state: undefined
      },
      isExist: false,
      currentId: undefined,
      gxListParams: {
        pageSize: 99999,
        pageNumber: 1,
        searchName: undefined,
        certificateId: undefined
      },
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
        wbsId: undefined, //分部分项id
        wbsCode: undefined, //工程编号
        wbsName: undefined, //工程名称
        wbsFullName: undefined, //工程名称全称:分部/分项/../计量单元
        certificateCode: undefined, //证书编号
        result: undefined, //评定结果
        score: undefined, //得分
        completeDate: undefined, //完成日期
        projectId: undefined, //项目ID
        projectCode: undefined, //项目CODE
        segmentId: undefined, //标段ID
        sectionCode: undefined, //标段编码
        createTime: undefined, //创建时间
        createUser: undefined, //创建人
        remark: undefined, //备注
        state: undefined, //流程状态 1:未开始 2:进行中 3:已结束
        flowId: undefined, //流程实例ID
        remark: undefined //备注
      },
      sectionData: [],
      tableDataList: [],
      tableDataList2: [],
      tableData: {
        id: undefined,
        orgId: undefined, //组织机构ID
        certificateId: undefined, //交工证书主键
        wbsId: undefined, //分部分项id
        wbsCode: undefined, //工程编号
        wbsName: undefined, //工程名称
        wbsCodes: undefined, //工程编号串 工程编号:分部/分项/../计量单元
        wbsNames: undefined, //工程名称串:分部/分项/../计量单元
        subitemCode: undefined, //子目号
        subitemName: undefined, //子目名称
        meterageUnit: undefined, //计量单位
        correctionNumber: undefined, //修编后数量
        applyNumber: undefined, //申报数量
        checkNumber: undefined, //核定数量
        currentAllowNumber: undefined, //本次允许计量
        allowNumber: undefined, //累积允许计量
        meteragetype: undefined, //类型（1:合同,2:变更）
        accomplish: undefined //是否已调差完成 0 未完成   1已完成
      },
      rules: {
        completeDate: [
          {
            trpe: "date",
            required: true,
            message: "完成时间不能为空",
            trigger: "change"
          }
        ]
      },
      savaListData: []
    };
  },
  created() {},
  methods: {
    showModal(id, oid) {
      this.currentId = id;
      this.orgId = oid;
      this.gxListParams.certificateId = id;
      this.form.id = id;
      this.dialogShow = true;
      this.isExist = true;
      this.getCateById();
      this.getGxList();
    },
    applyNumberBlur(row) {
      let num = row.applyNumber;
      row.checkNumber = "";
      row.checkNumber = num;
    },
    getCateById() {
      getCertificateById({ id: this.currentId }).then(res => {
        this.form = res.data;
      });
    },
    getGxList() {
      this.tableDataList = [];
      getGxList(this.gxListParams).then(response => {
        this.tableDataList = response.rows;
        this.setData();
      });
    },
    setData() {
      // let gxData = [];
      this.tableDataList2 = [];
      let indexObj = {};
      this.tableDataList.forEach(item => {
        if (item.meteragetype === "1") {
          item.changeNumber = 0;
          item.currentAllowChangeMeterage = 0;
          item.allowChangeMeterage = 0;
          item.changeCheckNumber = 0;
          item.changeApplyNumber = 0;
          this.tableDataList2.push(item);
          indexObj[item.subitemCode] = this.tableDataList2.length - 1;
        }
      });
      this.tableDataList.forEach(item => {
        if (item.meteragetype === "2") {
          let data = this.tableDataList2[indexObj[item.subitemCode]];
          data.changeNumber = item.correctionNumber;
          data.currentAllowChangeMeterage = item.currentAllowNumber;
          data.allowChangeMeterage = item.allowNumber;
        }
      });
    },

    onInputBlur() {
      // debugger
      let num = this.form.score;
      if (num > 100) {
        this.form.score = 100;
      }
      if (num < 0) {
        this.form.score = 0;
      }
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
        if (valid) {
          updateGxCompleteCertificate(this.form).then(response => {
            if (response.rtnCode === 200) {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.saveGxListData();
              this.dialogShow = false;
              this.$refs["form"].resetFields();
              this.reset();
              this.$emit("cancel");
            }
          });
        }
      });
    },
    saveGxListData() {
      if (!this.tableDataList2) {
        return;
      }
      this.tableDataList2.forEach(item => {
        this.resetTableDate();
        //push类型为1的数据
        this.tableData.id = item.id;
        this.tableData.orgId = item.orgId;
        this.tableData.certificateId = item.certificateId;
        this.tableData.wbsId = item.wbsId;
        this.tableData.wbsCode = item.wbsCode; //工程编号
        this.tableData.wbsName = item.wbsName; //工程名称
        this.tableData.wbsCodes = item.wbsCodes; //工程编号串
        this.tableData.wbsNames = item.wbsNames; //工程名称串
        this.tableData.subitemCode = item.subitemCode; //子目号
        this.tableData.subitemName = item.subitemName; //子目名称
        this.tableData.meterageUnit = item.meterageUnit; //单位
        this.tableData.correctionNumber = item.correctionNumber; //修编后数量
        this.tableData.currentAllowNumber = item.currentAllowNumber; //本次允许计量
        this.tableData.checkNumber = item.checkNumber; //核定数量
        this.tableData.applyNumber = item.applyNumber; //申报数量
        this.tableData.allowNumber = item.allowNumber; //累计允许计量
        this.tableData.meteragetype = item.meteragetype; // 类型（1:合同,2:变更）
        this.tableData.accomplish = item.accomplish; //是否已调差完成 0 未完成   1已完成
        if (item.currentAllowNumber != 0) {
          this.savaListData.push(this.tableData);
        }
        this.resetTableDate();
        //push类型为2的数据
        this.tableData.id = item.id;
        this.tableData.orgId = item.orgId;
        this.tableData.certificateId = item.certificateId;
        this.tableData.wbsId = item.wbsId;
        this.tableData.wbsCode = item.wbsCode; //工程编号
        this.tableData.wbsName = item.wbsName; //工程名称
        this.tableData.wbsCodes = item.wbsCodes; //工程编号串
        this.tableData.wbsNames = item.wbsNames; //工程名称串
        this.tableData.subitemCode = item.subitemCode; //子目号
        this.tableData.subitemName = item.subitemName; //子目名称
        this.tableData.meterageUnit = item.meterageUnit; //单位
        this.tableData.correctionNumber = item.correctionNumber; //修编后数量
        this.tableData.currentAllowNumber = item.currentAllowChangeMeterage; //本次允许计量
        this.tableData.checkNumber = item.changeCheckNumber; //核定数量
        this.tableData.applyNumber = item.changeApplyNumber; //申报数量
        this.tableData.allowNumber = item.allowChangeMeterage; //累计允许计量
        this.tableData.meteragetype = item.meteragetype; // 类型（1:合同,2:变更）
        this.tableData.accomplish = item.accomplish; //是否已调差完成 0 未完成   1已完成
        if (item.currentAllowChangeMeterage != 0) {
          this.savaListData.push(this.tableData);
        }
      });
      this.updateGxLists();
    },
    updateGxLists() {
      updateGxList(this.savaListData).then(res => {
        if (res.rtnCode === 200) {
          console.info("修改数据：  " + this.tableDataList);
        }
      });
    },

    //提交审批
    saveApproval() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.state === "1") {
            // if (this.users.length > 0) {
            //   this.form.leaderId = this.users[0].id;
            //   this.form.leader = this.users[0].name;
            // }
            updateGxCompleteCertificate(this.form).then(response => {
              if (response.rtnCode === 200) {
                this.saveGxListData();
              }
            });
            this.$refs.StartFlow.showModal(
              this.orgId,
              "finish",
              this.currentId
            );
          }
          if (this.form.state === "2") {
            this.$refs.ExamineFlow.showModal(this.currentId);
          }
        }
      });
    },
    //启动回调
    addCallAction(success, orderId) {
      if (success == true) {
        this.reset();
        // this.$refs["form"].resetFields();
        this.$emit("cancel");
        this.dialogShow = false;
      }
    },
    //审核回调
    approvalAction(response, orderId) {
      if (response.rtnCode === 200) {
        getCompleteByFlowId({ flowId: orderId }).then(res => {
          if (res.rtnCode === 200) {
            this.form.state = res.data.state;
            updateGxCompleteCertificate(this.form).then(response => {
              if (response.rtnCode === 200) {
                this.reset();
                this.$emit("cancel");
                // this.$refs["form"].resetFields();
                this.dialogShow = false;
              }
            });
          }
        });
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
    //重置表单
    reset() {
      this.allProportion = 0;
      this.randomNumberIds = 0;
      (this.form = {
        id: undefined,
        orgId: undefined, //组织机构ID
        wbsId: undefined, //分部分项id
        wbsCode: undefined, //工程编号
        wbsName: undefined, //工程名称
        wbsFullName: undefined, //工程名称全称:分部/分项/../计量单元
        certificateCode: undefined, //证书编号
        result: undefined, //评定结果
        score: undefined, //得分
        completeDate: undefined, //完成日期
        projectId: undefined, //项目ID
        projectCode: undefined, //项目CODE
        segmentId: undefined, //标段ID
        sectionCode: undefined, //标段编码
        createTime: undefined, //创建时间
        createUser: undefined, //创建人
        remark: undefined, //备注
        state: undefined, //流程状态 1:未开始 2:进行中 3:已结束
        flowId: undefined, //流程实例ID
        remark: undefined //备注
      }),
        (this.tableData = {
          id: undefined,
          orgId: undefined, //组织机构ID
          certificateId: undefined, //交工证书主键
          wbsId: undefined, //分部分项id
          wbsCode: undefined, //工程编号
          wbsName: undefined, //工程名称
          wbsCodes: undefined, //工程编号串 工程编号:分部/分项/../计量单元
          wbsNames: undefined, //工程名称串:分部/分项/../计量单元
          subitemCode: undefined, //子目号
          subitemName: undefined, //子目名称
          meterageUnit: undefined, //计量单位
          correctionNumber: undefined, //修编后数量
          applyNumber: undefined, //申报数量
          checkNumber: undefined, //核定数量
          currentAllowNumber: undefined, //本次允许计量
          allowNumber: undefined, //累积允许计量
          meteragetype: undefined, //类型（1:合同,2:变更）
          accomplish: undefined //是否已调差完成 0 未完成   1已完成
        }),
        (this.isExist = false);
    },
    resetTableDate() {
      this.tableData = {
        id: undefined,
        orgId: undefined, //组织机构ID
        certificateId: undefined, //交工证书主键
        wbsId: undefined, //分部分项id
        wbsCode: undefined, //工程编号
        wbsName: undefined, //工程名称
        wbsCodes: undefined, //工程编号串 工程编号:分部/分项/../计量单元
        wbsNames: undefined, //工程名称串:分部/分项/../计量单元
        subitemCode: undefined, //子目号
        subitemName: undefined, //子目名称
        meterageUnit: undefined, //计量单位
        correctionNumber: undefined, //修编后数量
        applyNumber: undefined, //申报数量
        checkNumber: undefined, //核定数量
        currentAllowNumber: undefined, //本次允许计量
        allowNumber: undefined, //累积允许计量
        meteragetype: undefined, //类型（1:合同,2:变更）
        accomplish: undefined //是否已调差完成 0 未完成   1已完成
      };
    }
  }
};
</script>
