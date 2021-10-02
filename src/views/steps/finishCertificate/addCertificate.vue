<template>
  <el-dialog
    v-if="isExist"
    title="新增交工证书"
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
            :data="tableDataList"
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
              <!--实际为 申报数量 -->
              <vxe-table-column field="applyNumber" title="本次允许计量">
                <template slot-scope="scope">
                  <vxe-input
                    type="number"
                    min = 0
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
                field="currentAllowNumber"
                title="本次允许计量"
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
  addOrUpdateCertificate,
  getUnitName,
  getSectionByList,
  getProcessByIds,
  saveGxList
} from "@/api/steps/completeCertificate/certificate";
import { getProcessCheckList } from "@/api/steps/processCheck/processCheck";
import InputSelectUser from "@/components/system/InputSelectUser";
import Treeselect from "@riophae/vue-treeselect";
import UploadManageFrame from "@/components/fileUploader/UploadManageFrame";
import StartFlow from "@/components/flow/page/examine/startFlow";
export default {
  name: "",
  components: { InputSelectUser, Treeselect, UploadManageFrame, StartFlow },
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
        remark: undefined, //备注
        contractingUnit: undefined, //承包单位名称
        supervisorUnit: undefined //监理单位
      },
      sectionData: [],
      tableDataList: [],
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
      updatefjDate: [
        {
          fileName: "材料说明",
          fileType: ".doc",
          createPeople: "马云",
          createTime: "2021/5/15",
          downloadNumber: "2"
        }
      ],
      wbsCodes: undefined, //工程编号串 工程编号:分部/分项/../计量单元
      saveGxListData: [] //
    };
  },
  created() {},
  methods: {
    showModal(addParams) {
      // this.wbsIdForm.wbsId = addParams.wbsIdAdd;
      this.form.result = "1";
      this.form.id = addParams.addId;
      this.form.orgId = addParams.orgIdAdd;
      this.form.wbsId = addParams.wbsIdAdd;
      this.processObject.wbsId = addParams.wbsIdAdd;
      this.certificateObject.wbsId = addParams.wbsIdAdd;
      this.form.wbsName = addParams.wbsNameAdd;
      this.form.wbsCode = addParams.wbsCodeAdd;
      this.wbsCodes = addParams.wbsCodesAdd;
      this.form.wbsFullName = addParams.wbsNamesAdd;
      this.dialogShow = true;
      this.isExist = true;
      this.getProcessList();
      this.getName();
    },
    applyNumberBlur(row) {
      let num = row.applyNumber;
      row.checkNumber = "";
      row.checkNumber = num;
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
    getName() {
      getUnitName({ orgId: this.form.orgId }).then(res => {
        console.log(res.data);
        //标段信息
        if (res.data.fSection !== null) {
          this.form.segmentId = res.data.fSection.id; //标段ID
          this.form.sectionCode = res.data.fSection.code; //标段编码
          this.form.contractingUnit = res.data.fSection.buildUnitIdStr; //施工单位
        }
        // 监理信息
        if (res.data.fjSupervisorDept !== null) {
          // this.form.supervisorId = res.data.fSection.id; //监理单位ID
          this.form.supervisorUnit = res.data.fjSupervisorDept.name; //监理单位名称
        }
        //项目信息
        if (res.data.fjProject !== null) {
          this.form.projectId = res.data.fjProject.id; //项目ID
          this.form.projectCode = res.data.fjProject.code; //项目编码
        }
      });
    },
    //获取工序报验数据
    getProcessList() {
      getProcessCheckList(this.processObject).then(response => {
        this.processTableData = response.rows;
        this.forProcessData();
      });
    },
    //循环工序报验数据实时计算完成比例
    forProcessData() {
      let pLength = this.processTableData.length;
      if (pLength > 0) {
        for (let i = 0; i < pLength; i++) {
          let pid = this.processTableData[i].processId;
          this.ids.push(pid);
        }
        setTimeout(() => {
          this.getBiLiList();
        }, 100);
      }
    },
    getBiLiList() {
      getProcessByIds(this.ids).then(response => {
        this.ProcessByIdsData = response.data;
        this.allProportion = this.getAllBiLi(
          this.processTableData,
          this.ProcessByIdsData
        );
        this.getSectionByList();
      });
    },
    getAllBiLi(data1, data2) {
      let sum = 0;
      for (let i = 0; i < data1.length; i++) {
        for (let j = 0; j < data2.length; j++) {
          if (data1[i].processId === data2[j].id) {
            sum += (data1[i].positionProportion * data2[j].processRate) / 100;
          }
        }
      }
      return sum;
    },
    //根据标段实例编号wbsId获取挂接清单
    getSectionByList() {
      getSectionByList({ wbsId: this.form.wbsId }).then(res => {
        //this.sectionData = res.data;
        //this.setSectionData();
        //this.tableDataList =res.data;
        //this.message(res.data);
        this.tableDataList = this.handleData(res.data);
        this.setSectionData();
        //this.$message(this.tableDataList)
        //console.info(this.tableDataList,1111111111);
      });
    },
    //处理数据
    handleData(data) {
      if (!data || data.length === 0) {
        return;
      }
      // debugger;
      //计算之后的data
      let ddd = [];
      for (let k = 0; k < data.length; k++) {
        //用于判断ddd里边是否已经有subitemCode
        let isfind = false;
        for (let i = 0; i < ddd.length; i++) {
          if (
            ddd.subitemCode === data[k].subitemCode &&
            ddd.type.indexOf(data[k].type) > -1
          ) {
            isfind = true;
            break;
          }
        }
        let templateData = { ...data[k] };
        if (!isfind) {
          // if (templateData.type === "1" || templateData.type === "3") {
          //   templateData.type = "13";
          // }
          templateData.contractNumber = 0;
          templateData.contractNumber2 = 0;
          templateData.contractNumber13 = 0;
          ddd.push(templateData);
        }
      }
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < ddd.length; j++) {
          if (data[i].subitemCode === ddd[j].subitemCode) {
            if (data[i].type.indexOf("2") > -1) {
              ddd[j].contractNumber2 += data[i].contractNumber;
            }
            if (
              data[i].type.indexOf("1") > -1 ||
              data[i].type.indexOf("3") > -1
            ) {
              ddd[j].contractNumber13 += data[i].contractNumber;
            }
          }
        }
      }
      return ddd;
    },
    //计算子目清单数据
    setSectionData() {
      if (!this.tableDataList) {
        return;
      }
      this.tableDataList.forEach(item => {
        //清单
        item.correctionNumber = item.contractNumber13;
        item.allowNumber = (item.contractNumber13 * this.allProportion) / 100;
        item.currentAllowNumber =
          (item.contractNumber13 * this.allProportion) / 100;
        //变更
        item.changeNumber = item.contractNumber2;
        item.currentAllowChangeMeterage =
          (item.contractNumber2 * this.allProportion) / 100;
        item.allowChangeMeterage =
          (item.contractNumber2 * this.allProportion) / 100;
        //清单为空时设置为0
        if (
          item.correctionNumber === null ||
          item.correctionNumber === undefined
        ) {
          item.correctionNumber = "0";
        }
        if (item.allowNumber === null || item.allowNumber === undefined) {
          item.allowNumber = "0";
        }
        if (
          item.currentAllowNumber === null ||
          item.currentAllowNumber === undefined
        ) {
          item.currentAllowNumber = "0";
        }
        //变更为空时设置为0
        if (item.changeNumber === null || item.changeNumber === undefined) {
          item.changeNumber = "0";
        }
        if (
          item.currentAllowChangeMeterage === null ||
          item.currentAllowChangeMeterage === undefined
        ) {
          item.currentAllowChangeMeterage = "0";
        }
        if (
          item.allowChangeMeterage === null ||
          item.allowChangeMeterage === undefined
        ) {
          item.allowChangeMeterage = "0";
        }
        this.resetTableDate();
        //push类型为1和3的数据
        // this.tableData.id = uuidv4().replace(/-/g, "");
        this.tableData.id = this.getRandomInt();
        this.tableData.orgId = this.form.orgId;
        this.tableData.wbsId = this.form.wbsId;
        this.tableData.wbsCode = this.form.wbsCode; //工程编号
        this.tableData.wbsName = this.form.wbsName; //工程名称
        this.tableData.wbsCodes = this.wbsCodes; //工程编号串
        this.tableData.wbsNames = this.form.wbsFullName; //工程名称串
        this.tableData.subitemCode = item.subitemCode; //子目号
        this.tableData.subitemName = item.subitemName; //子目名称
        this.tableData.meterageUnit = item.meterageUnit; //单位
        this.tableData.correctionNumber = item.correctionNumber; //修编后数量
        this.tableData.currentAllowNumber = item.currentAllowNumber; //本次允许计量
        this.tableData.checkNumber = item.currentAllowNumber; //核定数量
        item.checkNumber = item.currentAllowNumber;
        this.tableData.applyNumber = item.currentAllowNumber; //申报数量
        item.applyNumber = item.currentAllowNumber;
        this.tableData.allowNumber = item.allowNumber; //累计允许计量
        this.tableData.meteragetype = "1"; // 类型（1:合同,2:变更）
        this.tableData.accomplish = "0"; //是否已调差完成 0 未完成   1已完成
        // if (item.currentAllowNumber != 0) {
        //   this.saveGxListData.push(this.tableData);
        // }
        //push类型为2的数据
        // let templateData = {...this.tableData};
        this.resetTableDate();
        // templateData.id = this.getRandomInt();
        this.tableData.id = this.getRandomInt();
        this.tableData.orgId = this.form.orgId;
        this.tableData.wbsId = this.form.wbsId;
        this.tableData.wbsCode = this.form.wbsCode; //工程编号
        this.tableData.wbsName = this.form.wbsName; //工程名称
        this.tableData.wbsCodes = this.wbsCodes; //工程编号串
        this.tableData.wbsNames = this.form.wbsFullName; //工程名称串
        this.tableData.subitemCode = item.subitemCode; //子目号
        this.tableData.subitemName = item.subitemName; //子目名称
        this.tableData.meterageUnit = item.meterageUnit; //单位
        this.tableData.correctionNumber = item.changeNumber; //修编后数量
        this.tableData.currentAllowNumber = item.currentAllowChangeMeterage; //本次允许计量
        this.tableData.checkNumber = item.currentAllowChangeMeterage; //核定数量
        item.changeCheckNumber = item.currentAllowChangeMeterage;
        this.tableData.applyNumber = item.currentAllowChangeMeterage; //申报数量
        item.changeApplyNumber = item.currentAllowChangeMeterage;
        this.tableData.allowNumber = item.allowChangeMeterage; //累计允许计量
        this.tableData.meteragetype = "2"; // 类型（1:合同,2:变更）
        this.tableData.accomplish = "0"; //是否已调差完成 0 未完成   1已完成
        // if (item.currentAllowChangeMeterage != 0) {
        //   this.saveGxListData.push(this.tableData);
        // }
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
          this.form.state = "1";
          addOrUpdateCertificate(this.form).then(response => {
            if (response.rtnCode === 200) {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.setGxLisData();
              this.dialogShow = false;
              this.$refs["form"].resetFields();
              this.reset();
              this.$emit("cancel");
            }
          });
        }
      });
    },
    setGxLisData() {
      if (!this.tableDataList) {
        return;
      }
      this.tableDataList.forEach(item => {
        this.resetTableDate();
        //push类型为1和3的数据
        this.tableData.id = this.getRandomInt();
        this.tableData.orgId = this.form.orgId;
        this.tableData.wbsId = this.form.wbsId;
        this.tableData.wbsCode = this.form.wbsCode; //工程编号
        this.tableData.wbsName = this.form.wbsName; //工程名称
        this.tableData.wbsCodes = this.wbsCodes; //工程编号串
        this.tableData.wbsNames = this.form.wbsFullName; //工程名称串
        this.tableData.subitemCode = item.subitemCode; //子目号
        this.tableData.subitemName = item.subitemName; //子目名称
        this.tableData.meterageUnit = item.meterageUnit; //单位
        this.tableData.correctionNumber = item.correctionNumber; //修编后数量
        this.tableData.currentAllowNumber = item.currentAllowNumber; //本次允许计量
        this.tableData.checkNumber = item.checkNumber; //核定数量
        this.tableData.applyNumber = item.applyNumber; //申报数量
        this.tableData.allowNumber = item.allowNumber; //累计允许计量
        this.tableData.meteragetype = "1"; // 类型（1:合同,2:变更）
        this.tableData.accomplish = "0"; //是否已调差完成 0 未完成   1已完成
        if (item.currentAllowNumber != 0) {
          this.saveGxListData.push(this.tableData);
        }
        //push类型为2的数据
        this.resetTableDate();
        this.tableData.id = this.getRandomInt();
        this.tableData.orgId = this.form.orgId;
        this.tableData.wbsId = this.form.wbsId;
        this.tableData.wbsCode = this.form.wbsCode; //工程编号
        this.tableData.wbsName = this.form.wbsName; //工程名称
        this.tableData.wbsCodes = this.wbsCodes; //工程编号串
        this.tableData.wbsNames = this.form.wbsFullName; //工程名称串
        this.tableData.subitemCode = item.subitemCode; //子目号
        this.tableData.subitemName = item.subitemName; //子目名称
        this.tableData.meterageUnit = item.meterageUnit; //单位
        this.tableData.correctionNumber = item.changeNumber; //修编后数量
        this.tableData.currentAllowNumber = item.currentAllowChangeMeterage; //本次允许计量
        // this.tableData.checkNumber = item.checkNumber===""?item.currentAllowChangeMeterage:item.checkNumber; //核定数量
        this.tableData.checkNumber = item.changeCheckNumber;//核定数量
        // item.changeCheckNumber = item.currentAllowChangeMeterage;
        this.tableData.applyNumber = item.changeApplyNumber; //申报数量
        // item.changeApplyNumber = item.currentAllowChangeMeterage;
        this.tableData.allowNumber = item.allowChangeMeterage; //累计允许计量
        this.tableData.meteragetype = "2"; // 类型（1:合同,2:变更）
        this.tableData.accomplish = "0"; //是否已调差完成 0 未完成   1已完成
        if (item.currentAllowChangeMeterage != 0) {
          this.saveGxListData.push(this.tableData);
        }
      });
      this.setGxListId();
    },
    setGxListId() {
      if (this.saveGxListData.length > 0) {
        for (let i = 0; i < this.saveGxListData.length; i++) {
          this.saveGxListData[i].certificateId = this.form.id;
        }
        debugger
        this.saveGxLists();
      }
    },
    async saveGxLists() {
      await saveGxList(this.saveGxListData).then(response => {
        if (response.rtnCode === 200) {
          console.info("新增数据" + this.saveGxListData);
        }
        this.saveGxListData = [];
      });
    },
    //提交审批
    saveApproval() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.state = "1";
          addOrUpdateCertificate(this.form).then(response => {
            if (response.rtnCode === 200) {
              this.setGxLisData();
            }
          });
          this.$refs.StartFlow.showModal(
            this.form.orgId,
            "finish",
            this.form.id
          );
        }
      });
    },
    //回调
    addCallAction(success, orderId) {
      if (success == true) {
        this.dialogShow = false;
        this.$refs["form"].resetFields();
        this.reset();
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
        remark: undefined, //备注
        contractingUnit: undefined, //承包单位名称
        supervisorUnit: undefined //监理单位
      }),
        (this.tableData = {
          id: undefined,
          certificateId: undefined, //交工证书主键
          wbsCodes: undefined, //工程编号串 工程编号:分部/分项/../计量单元
          wbsNames: undefined, //工程名称:分部/分项/../计量单元
          subitemCode: undefined, //子目号
          subitemName: undefined, //子目名称
          meterageUnit: undefined, //计量单位
          checkNumber: undefined, //核定数量
          applyNumber: undefined, //申报数量
          correctionNumber: undefined, //修编后数量
          changeNumber: undefined, //变更后数量
          currentAllowNumber: undefined, //本次允许计量
          allowNumber: undefined, //累积允许计量
          currentAllowChangeMeterage: undefined, //本次允许变更计量
          allowChangeMeterage: undefined //累积允许变更计量
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
