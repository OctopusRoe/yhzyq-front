<template>
  <el-dialog
    title="工序报验详情"
    :visible.sync="dialogShow"
    :append-to-body="true"
    :close-on-click-modal="false"
    width="45%"
    class="dialog-common"
  >
    <div style=" overflow-x: hidden; overflow-y: auto; height:650px">
      <table class="view-table" cellspacing="0" cellpadding="0">
        <tr>
          <td class="left" colspan="5">
            <span style="font-size: 18px;">工程单元</span>
          </td>
        </tr>
        <tr>
          <td class="label">单元名称</td>
          <td class="content" colspan="5">{{ form.wbsNames }}</td>
        </tr>
        <tr style=" margin-top:10px">
          <td class="left" colspan="5">
            <span style="font-size: 18px;">施工工序</span>
          </td>
        </tr>
        <tr>
          <td class="label">工序名称</td>
          <td class="content">{{ form.processName }}</td>
          <td class="label" width="17%">已完成比率(%)</td>
          <td class="content" colspan="1">{{ processData.processRate }}</td>
          <td class="content" align="center" colspan="1">
            <el-button type="text" @click="checkList">检查项</el-button>
          </td>
        </tr>
        <tr>
          <td class="left" colspan="5">
            <span style="font-size: 18px;">具体部位</span>
          </td>
        </tr>
        <tr>
          <td class="label">部位名称</td>
          <td class="content">{{ form.positionName }}</td>
          <td class="label">占比(%)</td>
          <td class="content" colspan="3">{{ form.positionProportion }}</td>
        </tr>
        <tr>
          <td class="left" colspan="5">
            <span style="font-size: 18px;">要求监理到场时间</span>
          </td>
        </tr>
        <tr>
          <td class="label">时间</td>
          <td class="content" colspan="4">
            {{ form.arriveTime | dataFormat("yyyy-MM-dd") }}
          </td>
        </tr>
        <tr>
          <td class="label">经现场检验,本项目是否符合要求</td>
          <td class="content" colspan="4">
            <vxe-switch
              v-show="isShow"
              v-model="form.result"
              open-label="是"
              :open-value="true"
              close-label="否"
              :close-value="false"
              disabled
            ></vxe-switch>
          </td>
        </tr>
        <tr>
          <td class="label" width="34%">经现场检验,本项目是否可继续进行</td>
          <td class="content" colspan="4">
            <vxe-switch
              v-show="isShowContinue"
              v-model="form.isContinue"
              open-label="是"
              :open-value="true"
              close-label="否"
              :close-value="false"
              disabled
            ></vxe-switch>
          </td>
        </tr>
        <!-- <tr>
        <td class="left" colspan="5">
          <span style="font-size: 18px;">现场图片</span>
        </td>
      </tr>
      <tr>
        <td class="content" colspan="6">
          <template>
            <img
              v-for="item in url"
              :key="item"
              :src="item"
              style="width:100px;height:100px;cursor:pointer;padding-left:10px"
              @click="onPreview"
            />
            <el-image-viewer
              v-if="showViewer"
              :on-close="closeViewer"
              :url-list="url"
            />
          </template>
        </td>
      </tr> -->
      </table>

      <UploadManageFrame
        showuploader="true"
        sortCode="draw"
        :orgId="oid"
        :businessID="currentId"
        :isShow="false"
        :showDel="false"
      ></UploadManageFrame>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="cancel">关 闭</el-button>
    </div>
    <!-- </div> -->
    <CheckList ref="CheckList" @show="dialogShow"></CheckList>
  </el-dialog>
</template>

<script>
import ElImageViewer from "@/utils/element-ui/packages/image/src/image-viewer";
import CheckList from "@/views/steps/processCheck/checkList";
import UploadManageFrame from "@/components/fileUploader/UploadManageFrame";
import {
  getProcessChecById,
  getProcessId
} from "@/api/steps/processCheck/processCheck";

export default {
  name: "",
  components: { ElImageViewer, CheckList, UploadManageFrame },
  data() {
    return {
      showViewer: false, // 显示查看器
      url: [
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg"
      ],
      processData: {
        processRate: undefined
      },
      value: false,
      isShow: true,
      isShowContinue: true,
      currentId: undefined,
      sectionName: undefined, //标段名称
      oid: undefined,
      dialogShow: false,
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
        flowId: undefined //流程实例ID
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
      this.getProcessDetil();
      this.dialogShow = true;
    },
    getProcessDetil() {
      getProcessChecById({ id: this.currentId }).then(response => {
        this.form = response.data;
        if (this.form.result === null || this.form.result === "") {
          this.isShow = false;
        }
        if (this.form.isContinue === null || this.form.isContinue === "") {
          this.isShowContinue = false;
        }
        this.getProcessId();
      });
    },
    getProcessId() {
      getProcessId({ processId: this.form.processId }).then(response => {
        if (response.data != null) {
          this.processData = response.data;
        }
      });
    },
    onPreview() {
      this.dialogShow = false;
      this.showViewer = true;
    },
    // 关闭查看器
    closeViewer() {
      this.dialogShow = true;
      this.showViewer = false;
    },
    checkList() {
      this.$refs.CheckList.showModal(this.currentId);
    },
    //关闭按钮
    cancel() {
      this.dialogShow = false;
      this.reset();
    },
    //重置表单
    reset() {
      this.sectionName = "";
      this.form = {
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
        flowId: undefined //流程实例ID
      };
    }
  }
};
</script>
