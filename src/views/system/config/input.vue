<template>
  <div class="app-container">
    <el-row>
      <el-input type="hidden" v-model="form.id"/>
      <el-input type="hidden" v-model="form.commonTypeId"/>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col>
            <el-form-item label="配置编码" prop="code">
              <el-input v-model="form.code" placeholder="请输入配置编码"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="配置名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入配置名称"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="配置值" prop="val">
              <el-input v-model="form.val" placeholder="请输入配置值"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="排序号" prop="sortedNum">
              <el-input-number  v-model="form.sortedNum" placeholder="请输入排序号"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="描述" prop="description">
              <el-input
                v-model="form.description"
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
    getConfigData,
    saveConfigData
  } from '@/api/system/config'

  export default {
    name: 'ConfigInput',
    components: {},
    props: {
      id: {
        type: String
      },
      commonTypeId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        // 字典分类表单参数
        form: {
          id: undefined,
          commonTypeId: this.commonTypeId,
          code: undefined,
          name: undefined,
          val: undefined,
          sortedNum: undefined,
          description: undefined
        },

        // 表单校验
        rules: {
          name: [
            { required: true, message: '配置名称不能为空', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '配置编码不能为空', trigger: 'blur' }
          ],
          sortedNum: [
            { required: false, type: 'number', trigger: 'blur' }
          ]
        }
      }
    },
    watch: {
      id(val) {
        this.reset()
        this.getConfigData()
      }
    },
    created() {
      this.getConfigData()
    },
    methods: {
      getConfigData() {
        if (this.id !== undefined) {
          getConfigData(this.id).then((res) => {
            if (res.success) {
              let data = res.data
              this.form.id = data.id
              this.form.commonTypeId = data.commonTypeId
              this.form.name = data.name
              this.form.val = data.val
              this.form.code = data.code
              this.form.sortedNum = data.sortedNum
              this.form.description = data.description
            }
          })
        }
      },
      /** 提交按钮 */
      submitForm: function() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            saveConfigData(this.form).then((response) => {
              if (response.rtnCode === 200) {
                this.msgSuccess('操作成功')
                this.$emit('cancel')
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
          id: undefined,
          commonTypeId: this.commonTypeId,
          code: undefined,
          name: undefined,
          val: undefined,
          sortedNum: undefined,
          description: undefined
        }
        this.resetForm('form')
      }

    }
  }
</script>

