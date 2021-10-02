<template>
  <el-dialog :title="title" :visible.sync="showReject" append-to-body @opened="rejectOpenDialogCallBack">
    <div class="dialog-footers">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="节点名称" prop="name">
              <el-select v-model="form.nodeDate.name" placeholder="请选择节点" @change="selectFlowNode">
                <el-option
                  v-for="item in form.nodeDate"
                  :key="item.order"
                  :label="item.disPlayName"
                  :value="item.name">
                  <span style="float: left">{{ item.disPlayName }}</span>
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
  import { rejectFlow, queryNodeList } from '@/api/flow/operateFlow'

  export default {
    components: {},
    data() {
      return {
        showReject: false,
        nodeName: '',
        title: '驳回',
        businessId: '',
        form: {
          nodeDate: [{
            order: '',
            name: '',
            disPlayName: ''
          }],
          textarea: ''
        },
        // 表单校验
        rules: {
          name: [
            { required: true, message: '节点名称不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
    },
    methods: {
      cancel() {
        this.showReject = false
        this.reset()
      },
      submitForm() {
        const data = {
          businessId: this.businessId,
          nodeName: this.nodeName,
          remark: this.form.textarea
        }
        let success='';
        let orderId='';
        rejectFlow(data).then(response => {
          this.msgSuccess(response.msg)
          this.showReject = false
          success=response.success
          orderId=response.data
          this.reset();
          this.$emit("rejectFlowCallBack",success,orderId)
        })

      },

      // 表单重置
      reset() {
        this.form = {
          nodeDate: [],
          textarea: ''
        }
        this.resetForm('form')
      },
      selectFlowNode(val) {
        console.info('选择', val)
        this.nodeName = val
      },
      showModal(businessId) {
        this.showReject=true
        this.businessId=businessId
        const data = {
          businessId: businessId
        }
        queryNodeList(data).then(response => {
          this.form.nodeDate=response.data
        })
      },
      rejectOpenDialogCallBack(){
        this.$emit("openRejectDialogCallBack")
      }
    }
  }
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
