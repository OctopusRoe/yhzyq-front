<template>
<el-dialog
    :visible.sync="dialogVisible"
    width="80%"
    :before-close="handleClose"
    :modal-append-to-body="false"
  >
  <div class="app-container seeWrap" >
    <el-row>
      <el-col :span="3">工号</el-col>
      <el-col :span="9">{{form.jobNum}}</el-col>
      <el-col :span="3">姓名</el-col>
      <el-col :span="9">{{form.name}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="3">登录名</el-col>
      <el-col :span="9">{{form.loginName}}</el-col>
      <el-col :span="3">性别</el-col>
      <el-col :span="9">{{form.sexName}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="3">姓名拼音</el-col>
      <el-col :span="9">{{form.pingyinName}}</el-col>
      <el-col :span="3">工作邮箱</el-col>
      <el-col :span="9">{{form.email}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="3">昵称</el-col>
      <el-col :span="9">{{form.nickName}}</el-col>
      <el-col :span="3">手机号码</el-col>
      <el-col :span="9">{{form.mobileNum}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="3">身份证号码</el-col>
      <el-col :span="9">{{form.cardNum}}</el-col>
      <el-col :span="3">籍贯</el-col>
      <el-col :span="9">{{form.nativePlace}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="3">办公室电话</el-col>
      <el-col :span="9">{{form.officeTelNum}}</el-col>
      <el-col :span="3">所在地区</el-col>
      <el-col :span="9">{{form.cityName}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="3">工作地址</el-col>
      <el-col :span="9">{{form.workAddress}}</el-col>
      <el-col :span="3">所属机构</el-col>
      <el-col :span="9">{{form.orgIdView}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="3">民族</el-col>
      <el-col :span="9">{{form.national}}</el-col>
      <el-col :span="3">所属职位</el-col>
      <el-col :span="9">{{form.userDuty}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="3">出生日期</el-col>
      <el-col :span="9">{{form.birthday}}</el-col>
      <el-col :span="3">qq</el-col>
      <el-col :span="9">{{form.qq}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="3">微信</el-col>
      <el-col :span="21">{{form.weixin}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="3">个人介绍</el-col>
      <el-col :span="21">{{form.descriptions}}</el-col>
    </el-row>
    <el-row>
      <el-col align="middle">
        <el-button @click="cancel">关 闭</el-button>
      </el-col>
    </el-row>
  </div>
</el-dialog>
</template>

<script>

  import { getUserById } from '@/api/system/org/org'

  export default {
    name: 'UserDetail',
    components: {},
    props: {
      id: {
        type: String,
        required: true
      }

    },
    data() {
      return {
        form: {}
      }
    },
    watch: {
      id(val){
       this.getUserData()
      }
    },
    created() {
      this.getUserData()
    },
    methods: {
      getUserData() {
        getUserById(this.id).then((res) => {
          if (res.success) {
            this.form = res.data
          }
        })
      },
      // 取消按钮
      cancel() {
        this.$emit('cancel')
      }
    }
  }
</script>

<style lang="scss">
  .seeWrap {
    border-top: 1px solid #ccc;
    border-left: 1px solid #e5e5e5;

    .el-col-3 {
      background-color: #f6f6f6;
      font-weight: bold;
    }

    .el-row {
      margin: 0;
      border-bottom: 1px solid #ccc;

      .el-col {
        padding: 15px 10px;
        border-right: 1px solid #e5e5e5;
      }
    }
  }
</style>

