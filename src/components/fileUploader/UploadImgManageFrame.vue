<template>
  <div class="main" style="height:500px;">
    <el-form>
      <el-form-item>
        <div class="opt-buttons">
          <div style="float: left">
            <el-upload
              class="upload-demo"
              :action="action"
              :headers="headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-change="handleChange"
              :on-success="onSuccess"
              :before-upload="beforeUpload"
              :show-file-list="false"
              multiple
              :on-exceed="handleExceed"
              :file-list="fileList"
              :accept="accept"
            >
              <el-button size="small" v-if="isShow" type="primary"
                >点击上传</el-button
              >
            </el-upload>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <vxe-table
      border
      selectable
      height="250"
      :show-overflow="true"
      :data="fileList"
      :header-cell-style="{ 'text-align': 'center' }"
    >
      <vxe-table-column field="urlImg" title="图片" width="220" align="left">
        <template slot-scope="scope">
          <img
            v-if="scope.row.isImg == 1"
            :src="scope.row.imgUrl"
            class="avatar imgShow"
          />
        </template>
      </vxe-table-column>

      <vxe-table-column field="realName" title="文件名" align="left">
      </vxe-table-column>
      <vxe-table-column
        field="attachSize"
        title="附件大小"
        width="120"
        align="center"
      >
      </vxe-table-column>
      <vxe-table-column
        field="creator"
        title="创建人"
        width="120"
        align="center"
      >
      </vxe-table-column>
      <vxe-table-column
        field="createTime"
        title="创建时间"
        width="120"
        align="center"
      >
      </vxe-table-column>

      <vxe-table-column title="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handlePerview(scope.row)"
            >预览</el-button
          >
          <el-button type="text" size="mini" @click="download(scope.row)"
            >下载</el-button
          >
          <el-button
            v-if="showDel"
            type="text"
            size="mini"
            @click="deleteFile(scope.row)"
            >删除</el-button
          >
        </template>
      </vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
import { GetUploadURL, GetAttachList, DelAttachById } from "@/api/upload/index";
import { getToken } from "@/utils/auth";
// import FileSaver from "file-saver";
const preUrl = process.env.VUE_APP_UPLOAD_URL;
export default {
  name: "uploadManageFrame",
  props: {
    // 接受上传的文件类型, 详见 input accept Attribute
    accept: {
      type: String,
      default() {
        return "";
      }
    },
    // 可选参数，分类编码
    sortCode: {
      type: String,
      default() {
        return "";
      }
    },
    // 必选参数，业务ID，如计量表ID，一个businessID可对应多个文件
    businessID: {
      type: String,
      required: true,
      default() {
        return "";
      }
    },
    // 是否显示进度
    showProgress: {
      type: Boolean,
      default() {
        return false;
      }
    },
    // 标段，工程级别的标段，EX:028001014
    orgId: {
      type: String,
      required: true
    },
    // 是否支持多选文件，ie10+ 支持。开启后按住 ctrl 可选择多个文件
    multiple: {
      type: Boolean,
      default() {
        return true;
      }
    },
    // 上传按钮是否显示
    isShow: {
      type: Boolean,
      default: true
    },
    // 删除按钮是否显示
    showDel: {
      type: Boolean,
      default: true
    },
    // 分块上传的尺寸
    chunkSize: {
      type: Number,
      default() {
        return 4194304; // 4MB
      }
    }
  },
  data() {
    return {
      headers: {
        authorization: getToken()
      },
      fileList: [],
      // 文件上传GET提交的参数信息
      url:
        "aid=" +
        "&ret=4" +
        "&orgId=" +
        this.orgId +
        "&businessId=" +
        this.businessID +
        "&path=" +
        this.sortCode +
        "&type="
    };
  },
  created() {
    this.loadfileData();
  },
  methods: {
    beforeUpload(file, fileList) {
      this.url =
        "aid=" +
        "&ret=4" +
        "&orgId=" +
        this.orgId +
        "&businessId=" +
        this.businessID +
        "&path=" +
        this.sortCode +
        "&type=";
      if (typeof this.businessID === "undefined" || this.businessID === "") {
        this.$message({
          message: "未配置业务Id",
          type: "error"
        });
        return false;
      }
      if (typeof this.orgId === "undefined" || this.orgId === "") {
        this.$message({
          message: "未配置标段",
          type: "error"
        });
        return false;
      }
      if (typeof this.sortCode === "undefined" || this.sortCode === "") {
        this.$message({
          message: "未配置模块",
          type: "error"
        });
        return false;
      }

      // debugger
      if (file.size === 0) {
        this.$message({
          message: "空文件无法上传",
          type: "error"
        });
        return false;
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    // 上传文件改变时的状态，详见 change
    handleChange(file, fileList) {
      if (file.status == "success") {
        this.$message({
          message: "上传成功",
          type: "success"
        });
        this.loadfileData("success");
      }
    },
    onSuccess() {
      this.loadfileData();
    },
    loadfileData(type) {
      var that = this;

      const params = {
        businessId: this.businessID,
        orgId: this.orgId
      };

      GetAttachList(params).then(res => {
        res.data.forEach(item => {
          item.downUrl = preUrl + item.savePath + "/" + item.saveName;
          item.isImg = 0;
          if (
            item.saveName.endsWith(".jpg") ||
            item.saveName.endsWith(".png") ||
            item.saveName.endsWith(".gif") ||
            item.saveName.endsWith(".bmp")
          ) {
            item.isImg = 1;
            item.imgUrl = preUrl + item.savePath + "/" + item.saveName;
          }
        });
        that.fileList = res.data;
        if (type == "success") {
          this.$emit("loadFinished", res.data);
        }
      });
    },
    handlePerview(row) {
      window.open(row.downUrl);
    },
    deleteFile(row) {
      this.$confirm("你确认要删除这个附件吗？?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        {
          DelAttachById({ id: row.id }).then(res => {
            if (res.success) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.$emit("delFinished", row);
              this.loadfileData();
            }
          });
        }
      });
    },
    download(row) {
      const url = row.downUrl;
      // window.open(_this.detail.imgUrl)
      let xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", url, true);
      xmlhttp.responseType = "blob";
      xmlhttp.onload = function() {
        if (this.status == 200) {
          const blob = this.response;
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = url.substring(url.lastIndexOf("/") + 1, url.length);

          //此写法兼容可火狐浏览器
          document.body.appendChild(link);

          const evt = document.createEvent("MouseEvents");
          evt.initEvent("click", false, false);
          link.dispatchEvent(evt);
          window.URL.revokeObjectURL(link.href);
          document.body.removeChild(link);
        }
      };

      xmlhttp.send();
    }
  },
  watch: {
    orgId() {
      if (this.orgId) {
        this.loadfileData();
      }
    },
    businessID() {
      if (this.businessID) {
        this.loadfileData();
      }
    }
  },
  computed: {
    action() {
      console.log(GetUploadURL() + "?" + this.url);
      return GetUploadURL() + "?" + this.url;
    }
  }
};
</script>

<style scoped>
.imgShow {
  width: 200px;
  position: absolute;
  top: 10;
  left: 10px;
}
::v-deep tbody tr {
  height: 220px !important;
}
</style>
