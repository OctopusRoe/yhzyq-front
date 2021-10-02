<template>
  <div class="app-container">
    <el-row>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col>
            <el-form-item label="新密码" prop="newPwds">
              <el-input v-model="form.newPwds" placeholder="请输入新密码" show-password/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="确认密码" prop="pNewPwds">
              <el-input v-model="form.pNewPwds" placeholder="请输入确认密码" show-password/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col align="middle">
            <el-button type="primary" @click="submitForm">提 交</el-button>
            <el-button @click="cancel">取 消</el-button>
          </el-col>
        </el-row>
      </el-form>

    </el-row>
  </div>
</template>

<script>

  import {
    modifyPassword
  } from '@/api/system/org/user'

  export default {
    name: 'ModifyPassword',
    components: {},
    props: {
      id: {
        type: String
      }
    },
    data() {
      return {
        dutyOptions: [],
        orgOptions: [],
        // 表单参数
        form: {
          id: this.id,
          newPwds: undefined,
          pNewPwds: undefined
        },

        // 表单校验
        rules: {
          newPwds: [
            { required: true, message: '新密码不能为空', trigger: 'blur' }
          ],
          pNewPwds: [
            { required: true, message: '确认密码不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    watch: {
      id(val) {
        this.reset()
      }
    },
    created() {

    },
    methods: {

      /** 提交按钮 */
      submitForm: function() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            modifyPassword(this.form).then((response) => {
              if (response.success) {
                this.msgSuccess(response.msg)
                this.$emit('cancel')
              } else {
                this.msgError(response.msg)
              }
            })
          }
        })
      },
      // 取消按钮
      cancel() {
        this.$emit('cancel')
      },
      // 表单重置
      reset() {
        this.form = {
          id: this.id,
          newPwds: undefined,
          pNewPwds: undefined
        }
      }

    }
  }
</script>

