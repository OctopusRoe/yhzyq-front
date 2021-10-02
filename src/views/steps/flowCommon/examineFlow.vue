<template>
  <el-dialog :title="title" :visible.sync="showExamine" append-to-body>
    <div>
      <div style="text-align: center;  overflow-y: auto">
        <el-row>
          <el-col style="text-align: left;font-size: 15px;margin-bottom: 5px">
            审核意见：
          </el-col>
          <el-col>
            <el-input
              v-model="remark"
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              :min="0"
            />
          </el-col>
        </el-row>
      </div>
      <div style="text-align: center; margin-top: 20px">
        <div slot="footer" class="dialog-footer" align="center">
          <el-button @click="pass">通过</el-button>
          <el-button @click="notPass">关闭</el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { examineFlow, queryRelation } from "@/api/flow/operateFlow";

export default {
  components: {},
  created() {},
  data() {
    return {
      orderId: "",
      showExamine: false,
      title: "审核",
      orgId: "",
      type: "",
      remark: "",
      businessId: ""
    };
  },
  methods: {
    notPass() {
      this.showExamine = false;
      this.reset();
    },
    pass() {
      const data = {
        orderId: this.orderId,
        remark: this.remark
      };
      examineFlow(data).then(response => {
        // this.msgSuccess(response.msg);
        if (response.rtnCode === 200) {
          this.showExamine = false;
          this.$emit("returnAction");
        }
      });
    },
    queryTask() {
      const data = {
        businessId: this.businessId
      };
      queryRelation(data).then(response => {
        this.orderId = response.data.orderId;
      });
    },
    showModal(businessId) {
      this.showExamine = true;
      this.businessId = businessId;
      this.queryTask();
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
