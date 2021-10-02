<template>
  <div class="app-container">
    <el-row>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col>
            <el-form-item label="分类编码" prop="smallMark">
              <el-input v-model="form.smallMark" placeholder="请输入分类编码"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="公司编码" prop="code">
              <el-input v-model="form.code" placeholder="请输入公司编码"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="公司名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入公司名称"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="公司负责人" prop="vals">
              <el-input v-model="form.vals" placeholder="请输入公司负责人"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="描述" prop="remarks">
              <el-input
                v-model="form.remarks"
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
    getDictById,
    updateDict,
    addDict
  } from '@/api/system/newDict'

  export default {
    name: 'OrgInput',
    components: {},
    props: {
      id: {
        type: String
      },
      dictTypeId: {
        type: String,
        required: true
      },
      systemMark: {
        type: Number
      }
    },
    data() {
      return {
        // 字典分类表单参数
        form: {
          id: undefined,
          dictTypeId: this.dictTypeId,
          name: undefined,
          code: undefined,
          smallMark: undefined,
          systemMark: this.systemMark === 1 ? 1 : 0,
          vals: undefined,
          sortOrder: undefined,
          remarks: undefined
        },

        // 表单校验
        rules: {
          name: [
            { required: true, message: '公司名称不能为空', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '公司编码不能为空', trigger: 'blur' }
          ],
          smallMark: [
            { required: true, message: '分类编码不能为空', trigger: 'blur' }
          ],
          vals: [
            { required: true, message: '公司负责人不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    watch: {
      id(val) {
        this.reset()
        this.getDictData()
      }
    },
    created() {
      this.getDictData()
    },
    methods: {
      getDictData() {
        if (this.id !== undefined) {
          getDictById(this.id).then((res) => {
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
            if (this.form.id != undefined) {
              updateDict(this.form).then((response) => {
                if (response.rtnCode === 200) {
                  this.msgSuccess(response.msg)
                  this.$emit('cancel')
                }
              })
            } else {
              addDict(this.form).then((response) => {
                if (response.rtnCode === 200) {
                  this.msgSuccess(response.msg)
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
          dictTypeId: this.dictTypeId,
          name: undefined,
          code: undefined,
          smallMark: undefined,
          systemMark: this.systemMark === 1 ? 1 : 0,
          vals: undefined,
          sortOrder: undefined,
          remarks: undefined
        }
      }

    }
  }
</script>

