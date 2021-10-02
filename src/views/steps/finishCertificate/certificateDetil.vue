<template>
  <el-dialog
    v-if="isExist"
    title="交工证书详情"
    :visible.sync="dialogShow"
    :append-to-body="true"
    :close-on-click-modal="false"
    width="60%"
    top="70"
    class="dialog-common"
    @close="closeDialog"
  >
    <div style=" overflow-x: hidden; overflow-y: auto; height:650px">
      <el-form ref="form" :model="form">
        <div>
          <tr>
            <td class="left" colspan="5">
              <span style="font-size: 18px;">工程单元</span>
            </td>
          </tr>
          <table class="view-table" cellspacing="0" cellpadding="0">
            <tr>
              <td class="label" width="17.5%">单元名称</td>
              <td class="content" colspan="5">{{ form.wbsFullName }}</td>
            </tr>
          </table>
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
              width="100"
              title="子目号"
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
              <vxe-table-column
                field="checkNumber"
                title="核定数量"
                v-if="false"
              ></vxe-table-column>
              <!-- applyNumber实际值为申报数量 -->
              <vxe-table-column
                field="applyNumber"
                title="本次允许计量"
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
          <table class="view-table" cellspacing="0" cellpadding="0">
            <tr>
              <td class="label">自检及评定结果</td>
              <td class="content" colspan="2">
                <vxe-radio
                  name="result"
                  v-model="form.result"
                  label="1"
                  content="合格"
                  disabled
                ></vxe-radio>
                <vxe-radio
                  name="result"
                  v-model="form.result"
                  label="2"
                  content="不合格"
                  disabled
                ></vxe-radio>
              </td>
              <td class="label">实际项目得分</td>
              <td class="content" colspan="2">{{ form.score }} 分</td>
            </tr>
          </table>

          <tr>
            <td class="left" colspan="5">
              <span style="font-size: 18px;">完成日期</span>
            </td>
          </tr>
          <table class="view-table" cellspacing="0" cellpadding="0">
            <tr>
              <td class="label" width="17.5%">日期</td>
              <td class="content" colspan="5">
                {{ form.completeDate | dataFormat("yyyy-MM-dd") }}
              </td>
            </tr>
          </table>
        </div>

        <UploadManageFrame
          showuploader="true"
          sortCode="draw"
          :orgId="orgId"
          :businessID="currentId"
          :isShow="false"
          :showDel="false"
        ></UploadManageFrame>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer" style="text-align: center">
      <el-button type="primary" @click="cancel" style=" align: center"
        >关闭</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import {
  getCertificateById,
  getGxList
} from "@/api/steps/completeCertificate/certificate";
import UploadManageFrame from "@/components/fileUploader/UploadManageFrame";
export default {
  name: "",
  components: { UploadManageFrame },
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
      gxListParams: {
        pageSize: 99999,
        pageNumber: 1,
        searchName: undefined,
        certificateId: undefined
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
        state: undefined, //流程状态 1:未开始 2:进行中 3:已结束
        flowId: undefined, //流程实例ID
        remark: undefined, //备注
        effectTime: undefined //流程生效时间
      },
      sectionData: [],
      tableDataList: [],
      tableDataList2: [],
      tableData: {
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
  created() {},
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
        return `${y}年${m}月${d}日`;
      } else {
        // 获取时分秒
        // var hh = dt.getHours().toString().padStart(2, '0');
        // var mm = dt.getMinutes().toString().padStart(2, '0');
        // var ss = dt.getSeconds().toString().padStart(2, '0');
        return `${y}年${m}月${d}日`;
      }
    }
  },
  methods: {
    showModal(id, oid) {
      this.currentId = id;
      this.orgId = oid;
      this.gxListParams.certificateId = id;
      this.dialogShow = true;
      this.isExist = true;
      this.getCateById();
      this.getGxList();
    },
    getCateById() {
      getCertificateById({ id: this.currentId }).then(res => {
        this.orgId = res.data.orgId;
        this.form = res.data;
      });
    },
    //获取交工证书从表数据
    getGxList() {
      this.tableDataList = [];
      debugger;
      getGxList(this.gxListParams).then(response => {
        debugger;
        this.tableDataList = response.rows;
        // this.tableDataList2 = {...this.tableDataList}
        this.setData();
      });
    },
    setData() {
      // let gxData = [];
      this.tableDataList2 = [];
      let indexObj = {};
      debugger
      this.tableDataList.forEach(item => {
        if (item.meteragetype === "1") {
          item.changeNumber = 0;
          item.currentAllowChangeMeterage = 0;
          item.allowChangeMeterage = 0;
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
    approvalRow(index, row) {
      console.log(row);
    },
    updateRow(index, row) {
      console.log(row);
    },
    deleteRow(index, row) {
      console.log(row);
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
      this.isExist = false;
    },
    //重置表单
    reset() {
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
        state: undefined, //流程状态 1:未开始 2:进行中 3:已结束
        flowId: undefined, //流程实例ID
        remark: undefined, //备注
        effectTime: undefined //流程生效时间
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
          currentAllowNumber: undefined, //本次允许计量
          allowNumber: undefined, //累积允许计量
          changeNumber: undefined, //变更后数量
          currentAllowChangeMeterage: undefined, //本次允许变更计量
          allowChangeMeterage: undefined //累积允许变更计量
        }),
        (this.isExist = false);
    }
  }
};
</script>
