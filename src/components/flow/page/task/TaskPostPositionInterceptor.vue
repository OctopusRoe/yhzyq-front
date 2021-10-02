<template>
  <el-row>
    <el-col :span="24">
      <el-input v-model="taskId" v-if="showInput"></el-input>
      <el-form ref="form" :model="form" :rules="rules" label-width="150px" label-position="right" size="mini">
        <el-form-item prop="class" label="Java类">
          <el-input  v-model="form.interceptor"  clearable></el-input>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24">
      <el-row type="flex" justify="center">
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-edit" @click="submitForm('form')">保存</el-button>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
  import { mapState, mapActions, mapGetters } from 'vuex'

  export default {
    props: {
      taskId: {
        type: String,
        default: ''
      },
      taskPostPositionInterceptor:{
        type: Object,
        default: {}
      }
    },
    watch: {

    },
    data() {
      return {
        showInput: false,
        form: {
          interceptor:''
        },
        rules: {
          interceptor: [
            {
              required: true,
              message: '请输入id',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      ...mapActions([
        'savePostPositionInterceptor'
      ]),
      loadPerformer() {
        if(this.taskPostPositionInterceptor){
          console.log(this.taskPostPositionInterceptor.interceptor)
          this.form.interceptor=this.taskPostPositionInterceptor.interceptor
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let data={
              taskId:this.taskId,
              interceptor:this.form.interceptor
            }
            this.savePostPositionInterceptor(data);
            this.msgSuccess('保存成功！')
          } else {
            return false
          }
        })
      }
    },
    mounted() {
      this.loadPerformer()
    }
  }
</script>
