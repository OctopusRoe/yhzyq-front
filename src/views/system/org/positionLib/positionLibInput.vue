<template>
  <div class="app-container">
    <el-row>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col>
            <el-form-item label="岗位库编码" prop="id" style="display:none">
              <el-input
                v-model="form.id"
                size="medium"
                type="textarea"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="描述" prop="descrption">
              <el-input
                v-model="form.descrption"
                size="medium"
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="岗位名称" prop="name">
              <el-input
                v-model="form.name"
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
    getPositionById,
    savePosition
  } from '@/api/system/org/position'

  import {
    saveOrUpdatePositionLib,
    getPositionLibById
    } from '@/api/system/org/positionLib'


  export default {
    name: 'PositionLibInput',
    components: {},
    props: {
      id: {
        type: String
      }
    },
    data() {
      return {
        // 表单参数
        form: {
          id: undefined,
          name: undefined,
          descrption: undefined
        },

        // 表单校验
        rules: {

        }
      }
    },
    watch: {
      id(val) {
        this.reset()
        this.getData()
      },
    },
    created() {
        console.log(10000)
      this.getData()
    },
    methods: {
      getData() {
        console.log('get Data')
        if (this.id !== undefined) {
          getPositionLibById(this.id).then((res) => {
            if (res.success) {
              this.form = res.data
            }
          })
        }
      },
      /** 提交按钮 */
      submitForm: function() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            saveOrUpdatePositionLib(this.form).then((response) => {
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
          id: undefined,
          name: undefined,
          descrption: undefined
        }
      }

    }
  }
</script>

