<template>
  <div class="app-container seeWrap" >
    <el-row>
      <el-col :span="6">机构编码</el-col>
      <el-col :span="18">{{form.orgId}}</el-col>

    </el-row>
    <el-row>
      <el-col :span="6">岗位库</el-col>
      <el-col :span="18">{{form.posLibName}}</el-col>

    </el-row>
    <el-row>
      <el-col :span="6">描述</el-col>
      <el-col :span="18">{{form.descrption}}</el-col>
    </el-row>
    <el-row>
      <el-col align="middle">
        <el-button @click="cancel">取 消</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  import {
    getPositionById
  } from '@/api/system/org/position'

  export default {
    name: 'OrgPositionDetail',
    components: {},
    props: {
      id: {
        type: String
      }
    },
    data() {
      return {
        positionOptions: [],
        // 表单参数
        form: {
          id: undefined,
          posLibName: undefined,
          orgId: this.orgId,
          descrption: undefined
        }
      }
    },
    watch: {
      id(val) {
        this.getData()
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        if (this.id !== undefined) {
          getPositionById(this.id).then((res) => {
            if (res.success) {
              this.form = res.data
            }
          })
        }
      },

      // 取消按钮
      cancel() {
        this.$emit('cancel')
      },


    }
  }
</script>

<style lang="scss">
  .seeWrap {
    border-top: 1px solid #ccc;
    border-left: 1px solid #e5e5e5;

    .el-col-6 {
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
