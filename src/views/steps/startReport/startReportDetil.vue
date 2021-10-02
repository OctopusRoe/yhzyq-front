<template>
  <el-dialog
    title="开工报告详情"
    :visible.sync="showReportDetil"
    :append-to-body="true"
    :close-on-click-modal="false"
    width="45%"
    class="dialog-common"
  >
    <table class="view-table" cellspacing="0" cellpadding="0">
      <tr>
        <td class="label">承包单位</td>
        <td class="content">{{ form.contractingUnit }}</td>
        <td class="label">合同段</td>
        <td class="content">{{ form.sectionCode }}</td>
      </tr>
      <tr>
        <td class="label">监理单位</td>
        <td class="content">{{ form.supervisorUnit }}</td>
        <td class="label">编号</td>
        <td class="content">{{ form.reportCode }}</td>
      </tr>
      <tr>
        <td class="label">工程部位</td>
        <td class="content" colspan="3">{{ form.wbsNames }}</td>
      </tr>
      <tr>
        <td class="label">桩号</td>
        <td class="content">{{ form.stakeNumber }}</td>
        <td class="label">工程负责人</td>
        <td class="content">{{ form.leader }}</td>
      </tr>
      <tr>
        <td class="label" width="17%">建议开工日期</td>
        <td class="content">{{ form.startDate | dataFormat("yyyy-MM-dd") }}</td>
        <td class="label" width="17%">计划完工日期</td>
        <td class="content">{{ form.endDate | dataFormat("yyyy-MM-dd") }}</td>
      </tr>
    </table>

    <UploadManageFrame
      showuploader="true"
      sortCode="draw"
      :orgId="oid"
      :businessID="currentId"
      :isShow="false"
      :showDel="false"
    ></UploadManageFrame>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="cancel">关 闭</el-button>
    </div>
    <!-- </div> -->
  </el-dialog>
</template>

<script>
import {
  getStartReportDetil,
  getUnitName
} from "@/api/steps/startReport/startReport";
import UploadManageFrame from "@/components/fileUploader/UploadManageFrame";
export default {
  name: "",
  components: { UploadManageFrame },
  data() {
    return {
      currentId: undefined,
      sectionName: undefined, //标段名称
      oid: undefined,
      showReportDetil: false,
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
    showModal(id, od) {
      this.currentId = id;
      this.oid = od;
      this.getName();
      this.getStartReportDetilById();
      this.showReportDetil = true;
    },
    getStartReportDetilById() {
      getStartReportDetil({ id: this.currentId }).then(response => {
        this.form = response.data;
      });
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
    //关闭按钮
    cancel() {
      // this.$emit('cancel');
      this.reset();
      this.showReportDetil = false;
    },
    //重置表单
    reset() {
      this.sectionName = "";
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
