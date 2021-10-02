<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
    :modal-append-to-body="false"
    class="dialog-common"
  >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="系统名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序号" prop="sortedNum">
            <el-input-number
              v-model="ruleForm.sortedNum"
              controls-position="right"
              :min="1"
              style="width: 100%"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="IP" prop="ip">
            <el-input v-model="ruleForm.ip"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="端口" prop="ports">
            <el-input v-model="ruleForm.ports"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="加密算法" prop="encryptWay">
            <el-select v-model="ruleForm.encryptWay">
              <el-option v-for="item in encryptWay" :key="item.id" :value="item.value" :label="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="令牌" prop="token">
            <el-input v-model="ruleForm.token"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="安全等级" prop="safe">
            <el-select v-model="ruleForm.safe">
              <el-option
                v-for="item in safeLevels"
                :label="item.name"
                :value="item.value"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="上下文路径" prop="contextPath">
            <el-input v-model="ruleForm.contextPath"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="HTTP路径" prop="urlPath">
            <el-input v-model="ruleForm.urlPath"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="系统描述" prop="description">
            <el-input type="textarea" v-model="ruleForm.description"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <div align="center">
        <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </span>
  </el-dialog>
</template>

<script>
import { addSystem, updateSystem, getSystemById, getDictByTypeId } from '@/api/system/system'
import { safeLevels } from '@/config/default.config'

export default {
  data() {
    return {
      safeLevels,
      title: '',
      ruleForm: {
        name: '',
        urlPath: '',
        contextPath: '',
        description: '',
        safe: '',
        sortedNum: 1
      },
      rules: {
        name: [{ required: true, message: '不能为空', trigger: 'blur' }],
        safe: [{ required: true, message: '不能为空', trigger: 'blur' }],
        sorted_num: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', min: 1, message: '不能小于1', trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      encryptWay: []
    }
  },
  methods: {
    handleClose(done) {
      done()
    },
    add() {
      this.title = '新增系统'
      if (this.encryptWay.length === 0) {
        getDictByTypeId({ typeId: 'SYSENCRYPT' }).then((res) => {
          res.data.forEach((item) => {
            this.encryptWay.push({ label: item.id, value: item.id })
          })
        })
      }
      this.ruleForm = {
        name: '',
        urlPath: '',
        contextPath: '',
        description: '',
        sortedNum: '',
        ip: '',
        ports: '',
        safe: ''
      }
      this.dialogVisible = true
    },
    edit(data) {
      this.title = '修改系统'
      getSystemById({ id: data.id }).then((res) => {
        this.ruleForm = res.data
        this.ruleForm.safe = res.data.safe + ''
      })
      this.dialogVisible = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.id === undefined || this.ruleForm.id === '') {
            addSystem(this.ruleForm)
              .then((res) => {
                if (res.success) {
                  this.$message({
                    message: res.msg,
                    type: 'success'
                  })
                }
              })
              .finally(() => {
                this.$emit('refresh')
                this.dialogVisible = false
              })
          } else {
            updateSystem(this.ruleForm)
              .then((res) => {
                if (res.success) {
                  if (res.success) {
                    this.$message({
                      message: res.msg,
                      type: 'success'
                    })
                  }
                }
              })
              .finally(() => {
                this.$emit('refresh')
                this.dialogVisible = false
              })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style></style>
