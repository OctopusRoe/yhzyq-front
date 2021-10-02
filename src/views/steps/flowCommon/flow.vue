<template>
  <el-dialog :title="title" :visible.sync="showStart" append-to-body>
    <div class="dialog-footers">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="流程名称" prop="name">
              <el-select
                v-model="form.flowDate.name"
                placeholder="请选择流程"
                @change="selectFlowType"
              >
                <el-option
                  v-for="item in form.flowDate"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                  <span style="float: left">{{ item.name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="审核意见" prop="textarea">
              <el-input
                v-model="form.textarea"
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                :min="0"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { listFlow } from "@/api/flow/flowManage";
import { startFlow } from "@/api/flow/operateFlow";
import { queryFlowTypeByType } from "@/api/flow/flowType";

export default {
  components: {},
  data() {
    return {
      processId: "",
      showId: false,
      showStart: false,
      currentPage: 1,
      pageSize: 20,
      currentTotal: 0,
      title: "流程列表",
      orgId: "",
      type: "",
      form: {
        flowDate: [],
        textarea: ""
      },
      // 表单校验
      rules: {
        menuName: [
          { required: true, message: "流程类型名称不能为空", trigger: "blur" }
        ],
        orderNum: [
          { required: true, message: "流程类型标识不能为空", trigger: "blur" }
        ]
      },
      businessId: "",
      startType: ""
    };
  },
  created() {},
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
    queryFlow(orgId, typeId) {
      const data = {
        pageNumber: 1,
        pageSize: 1000,
        orgIds: orgId,
        type: typeId
      };
      listFlow(data).then(response => {
        this.form.flowDate = response.rows;
      });
    },
    queryFlowType(orgId, type) {
      const data = {
        type: type
      };
      queryFlowTypeByType(data).then(response => {
        let data = response.data;
        this.form.flowDate = data;
        this.queryFlow(orgId, data.id);
      });
    },
    cancel() {
      this.showStart = false;
      this.reset();
    },
    submitForm() {
      const data = {
        processId: this.processId,
        remark: this.form.textarea,
        businessId: this.businessId
      };
      startFlow(data).then(response => {
        if (response.rtnCode === 200) {
          this.msgSuccess("流程已启动，进入审核环节");
          this.showStart = false;
          this.reset();
          //   this.$emit("cancel");
          let callvalue;
          if (this.startType === "row") {
            callvalue = this.businessId;
          }
          if (this.startType === "add") {
            callvalue = "add";
          }
          this.$emit("getAction", callvalue);
          this.$emit("addAction", callvalue);
        }
      });
    },
    showModal(orgId, type, businessId, startType) {
      this.showStart = true;
      this.businessId = businessId;
      this.startType = startType;
      this.queryFlowType(orgId, type);
    },
    // 表单重置
    reset() {
      this.form = {
        flowDate: [],
        textarea: ""
      };
      this.resetForm("form");
      //   this.startType = '';
    },
    selectFlowType(id) {
      this.processId = id;
    }
  }
};
</script>

<style lang="less" scoped>
.layout {
  display: flex;
  height: 100%;

  .tree-title {
    line-height: 40px;
    padding-left: 15px;
    border-bottom: 1px solid #ececec;
    font-size: 14px;
  }

  .layout-l {
    width: 260px;
    border-right: 1px solid #eaeaec;
    height: 100%;
  }

  .layout-r {
    flex-grow: 1;
    padding: 10px;

    .tabs-box {
      display: flex;
      border-bottom: 1px solid #e9eaec;

      > div {
        margin-right: 48px;
        line-height: 36px;
        font-size: 14px;
        cursor: pointer;
      }

      > div.active {
        color: #308ae7;
        border-bottom: 1px solid #308ae7;
      }
    }
  }

  .tree-box {
    padding-left: 16px;
    padding-top: 16px;
  }

  .select-box {
    padding: 15px 0;
    display: flex;
    justify-content: space-between;

    > div {
      display: flex;
      align-items: center;

      > span {
        margin-right: 5px;
        color: #333;
        white-space: nowrap;
        font-size: 14px;
      }
    }
  }

  .money-box {
    display: flex;
    background-color: #ebf3fe;
    border: 1px solid #c7dfff;
    padding: 10px;
    border-radius: 3px;

    i {
      width: 15px;
      height: 15px;
      line-height: 15px;
      font-style: normal;
      background-color: #308ae7;
      text-align: center;
      color: #fff;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 5px;
    }

    span {
      color: #308ae7;
      margin: 0 2px;
    }

    > div {
      display: flex;
      margin-right: 45px;
      align-items: center;
    }
  }

  .table-box {
    margin-top: 10px;
  }
}
</style>
