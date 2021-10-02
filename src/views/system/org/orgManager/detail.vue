<template>
  <div class="app-container seeWrap" >
    <el-row>
      <el-col :span="3">父机构</el-col>
      <el-col :span="9">{{form.parentName}}</el-col>
      <el-col :span="3">机构名称</el-col>
      <el-col :span="9">{{form.name}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="3">机构简称</el-col>
      <el-col :span="9">{{form.shortName}}</el-col>
      <el-col :span="3">第一负责人</el-col>
      <el-col :span="9">{{form.principal}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="3">机构编码</el-col>
      <el-col :span="9">{{form.id}}</el-col>
      <el-col :span="3">是否虚机构</el-col>
      <el-col :span="9">{{form.virtualed==1?'是':'否'}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="3">机构组织类型</el-col>
      <el-col :span="9">{{selectDictLabelEx(orgTypeOptions,form.organizationType)}}</el-col>
      <el-col :span="3">机构业务类型</el-col>
      <el-col :span="9">{{selectDictLabelEx(businessTypeOptions,form.buzType)}}</el-col>
    </el-row>

    <el-row>
      <el-col :span="3">机构所在地点</el-col>
      <el-col :span="21">{{form.address}}</el-col>
    </el-row>

  </div>
</template>

<script>

  import { getOrgById } from '@/api/system/org/org'

  export default {
    name: 'OrgDetail',
    components: {},
    props: {
      id: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        orgTypeOptions:[],
        businessTypeOptions:[],
        form: {}
      }
    },
    watch: {
      id(val){
        this.getOrgData()
      }
    },
    created() {
      this.getOrgData()
      this.getDicts('BUSINESS').then((res)=>{
          this.businessTypeOptions=res
      })
      this.getDicts('ORGANIZATION').then((res)=>{
        this.orgTypeOptions=res
      })
    },
    methods: {
      getOrgData() {
        getOrgById(this.id).then((res) => {
          if (res.success) {
            this.form = res.data
            this.form.parentName=res.msg||'无'
          }
        })
      },

    }
  }
</script>

<style lang="scss" scoped>
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

