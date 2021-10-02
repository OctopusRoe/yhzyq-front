<template>
  <div class="app-container">
    <el-row>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col>
            <el-form-item label="岗位库" prop="posLib">
              <el-select v-model="form.posLib" placeholder="岗位库" clearable size="small">
                <el-option
                  v-for="item in positionOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
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
            <el-form-item label="机构编号" prop="org">
              <el-input
                v-model="form.org"
                size="medium"
                type="textarea"
                placeholder="请选择机构"
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
  import { getOrgPositionLib } from '@/api/system/org/positionLib'

  export default {
    name: 'OrgPositionInput',
    components: {},
    props: {
      org: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        positionOptions: [],
        // 表单参数
        form: {
          id: undefined,
          posLib: undefined,
          org: this.org,
          descrption: undefined
        },

        // 表单校验
        rules: {
          posLib: [
            { required: true, message: '岗位库不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    watch: {
      id(val) {
        this.reset()
        this.getData()
      },
      org(val) {
        this.reset()
        this.getData()
      }
    },
    created() {
      getOrgPositionLib({name:undefined}).then((res) => {
        this.positionOptions = res.rows
      })
      this.getData()
    },
    methods: {
      getData() {
        if (this.id !== undefined) {
          getPositionById(this.id).then((res) => {
            if (res.success) {
              this.form = res.data
              this.form.org = res.data.orgId
            }
          })
        }
      },
      /** 提交按钮 */
      submitForm: function() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            console.log(this.form)
            savePosition(this.form).then((response) => {
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
          posLib: undefined,
          org: this.org,
          descrption: undefined
        }
      }

    }
  }
</script>

