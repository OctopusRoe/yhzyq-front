<template>
  <div class="app-container">
    <el-row>
      <el-input type="hidden" v-model="form.id"/>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-row>
          <el-col>
            <el-form-item label="公众号类型" prop="wechatType">
              <el-select v-model="form.wechatType" placeholder="请选择">
                <el-option v-for="wechatType in wechatTypeOptions" :key="wechatType.id" :label="wechatType.name"
                           :value="wechatType.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="公众号名称" prop="typename">
              <el-input v-model="form.typename" placeholder="请输入公众号名称"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="凭证(appId)" prop="appId">
              <el-input v-model="form.appId" placeholder="请输入凭证"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="令牌(token)" prop="token">
              <el-input v-model="form.token" placeholder="请输入令牌"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="凭证密钥(appSecret)" prop="appSecret">
              <el-input v-model="form.appSecret" placeholder="请输入凭证密钥"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="原始编号(originalId)" prop="originalId">
              <el-input v-model="form.originalId" placeholder="请输入原始编号"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="encodingAESKey" prop="encodingAESKey">
              <el-input
                v-model="form.encodingAESKey"
                size="medium"
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
              />
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
    getAccountData,
    addAccountData,
    updateAccountData
  } from '@/api/system/msg/wechatAccount'


  export default {
    name: 'WechatAccountInput',
    components: {},
    props: {
      id: {
        type: String
      }
    },
    data() {
      return {
        wechatTypeOptions: [],
        // 字典分类表单参数
        form: {
          id: undefined,
          typename: undefined,
          typecode: undefined,
          appId: undefined,
          appSecret: undefined,
          originalId: undefined,
          encodingAESKey: undefined,
          token: undefined,
          wechatType: undefined
        },

        // 表单校验
        rules: {
          wechatType: [
            { required: true, message: '公众号类型不能为空', trigger: 'blur' }
          ],
          typename: [
            { required: true, message: '公众号名称不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    watch: {
      id(val) {
        this.reset()
        this.getAccountData()
      }
    },
    mounted() {

    },
    created() {
      this.getDicts('WECHATTYPE').then((res) => {
        this.wechatTypeOptions = res
      })
      this.getAccountData()
    },
    methods: {
      getAccountData() {
        if (this.id !== undefined) {
          getAccountData(this.id).then((res) => {
            if (res.success) {
              let data = res.data
              this.form.id = data.id
              this.form.typename = data.typename
              this.form.typecode = data.typecode
              this.form.appId = data.appId
              this.form.appSecret = data.appSecret
              this.form.originalId = data.originalId
              this.form.encodingAESKey = data.encodingAESKey
              this.form.token = data.token
              this.form.wechatType = data.wechatType
            }
          })
        }
      },
      /** 提交按钮 */
      submitForm: function() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if (this.form.id != undefined) {
              updateAccountData(this.form).then((response) => {
                if (response.rtnCode === 200) {
                  this.msgSuccess('操作成功')
                  this.$emit('cancel')
                }
              })
            } else {
              addAccountData(this.form).then((response) => {
                if (response.rtnCode === 200) {
                  this.msgSuccess('操作成功')
                  this.$emit('cancel')
                }
              })
            }

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
          id: undefined,
          typename: undefined,
          typecode: undefined,
          appId: undefined,
          appSecret: undefined,
          originalId: undefined,
          encodingAESKey: undefined,
          token: undefined,
          wechatType: undefined
        }
        this.resetForm('form')
      }

    }
  }
</script>

