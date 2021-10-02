<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="650"
    :before-close="handleClose"
    :modal-append-to-body="false"
    class="dialog-common"
  >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="客户端类型" prop="clienttype">
            <el-select v-model="ruleForm.clienttype" style="width: 100%">
              <el-option
                v-for="item in clientTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="apikey" prop="apikey">
            <el-input v-model="ruleForm.apikey"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="密钥" prop="secretkey">
            <el-input v-model="ruleForm.secretkey"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="图标">
            <el-popover placement="bottom-start" width="460" trigger="click" @show="$refs['iconSelect'].reset()">
              <IconSelect ref="iconSelect" @selected="selected" />
              <el-input slot="reference" v-model="ruleForm.clienticon" placeholder="点击选择图标" readonly>
                <svg-icon
                  v-if="ruleForm.clienticon"
                  slot="prefix"
                  :icon-class="ruleForm.clienticon"
                  class="el-input__icon"
                  style="height: 32px; width: 16px"
                />
                <i v-else slot="prefix" class="el-icon-search el-input__icon" />
              </el-input>
            </el-popover>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="clienturi" prop="clienturi">
            <el-input v-model="ruleForm.clienturi"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="回调url" prop="callbackurl">
            <el-input v-model="ruleForm.callbackurl"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="iosUrl" prop="iosUrl">
            <el-input v-model="ruleForm.iosUrl"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="androidUrl" prop="androidUrl">
            <el-input v-model="ruleForm.androidUrl"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="安卓版本" prop="androidVersion">
            <el-input v-model="ruleForm.androidVersion"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="苹果版本" prop="iosVersion">
            <el-input v-model="ruleForm.iosVersion"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="包名" prop="packageName">
            <el-input v-model="ruleForm.packageName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类名" prop="className">
            <el-input v-model="ruleForm.className"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="修饰符" prop="allowedscopes" multiple>
            <el-select v-model="allowedscopes" multiple @change="allowedSelect" style="width: 100%">
              <el-option label="public" value="public"></el-option>
              <el-option label="protect" value="protect"></el-option>
              <el-option label="private" value="private"></el-option>
              <el-option label="default" value="default"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="客户端描述" prop="clientcescription">
            <el-input type="textarea" v-model="ruleForm.clientcescription"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <div align="center">
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button @click="handleCancel">关闭</el-button>
      </div>
    </span>
  </el-dialog>
</template>

<script>
import IconSelect from '@/components/common/IconSelect'
import { saveOrUpdateClient, getClientById } from '@/api/system/client'

export default {
  data() {
    return {
      allowedscopes: [],
      dialogVisible: false,
      title: '',
      clientTypeOptions: [
        { value: 0, label: '手机端' },
        { value: 1, label: 'C/S类型' },
        { value: 2, label: '服务类型' },
        { value: 3, label: 'B/S端' },
        { value: 4, label: '第三方APP' }
      ],
      ruleForm: {
        clienttype: '',
        apikey: '',
        secretkey: '',
        callbackurl: '',
        clientcescription: '',
        clienturi: '',
        clienticon: '',
        systemId: '',
        allowedscopes: '',
        iosUrl: '',
        androidUrl: '',
        androidVersion: '',
        iosVersion: '',
        packageName: '',
        className: ''
      },
      rules: {
        clienttype: [{ required: true, message: '不能为空', trigger: 'blur' }],
        clientcescription: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      systemOptions: []
    }
  },
  components: {
    IconSelect
  },
  // created() {
  // },
  methods: {
    // 选择图标
    selected(name) {
      this.ruleForm.clienticon = name
    },
    // 取消
    handleCancel() {
      this.resetForm('ruleForm')
      this.dialogVisible = false
    },
    handleClose(done) {
      this.resetForm('ruleForm')
      done()
    },
    add(systemId) {
      this.title = '新增客户端'
      this.ruleForm = {
        clienttype: '',
        apikey: '',
        secretkey: '',
        callbackurl: '',
        clientcescription: '',
        clienturi: '',
        clienticon: '',
        systemId: '',
        allowedscopes: '',
        iosUrl: '',
        androidUrl: '',
        androidVersion: '',
        iosVersion: '',
        packageName: '',
        className: ''
      }
      this.ruleForm.systemId = systemId
      this.dialogVisible = true
    },
    edit(data) {
      this.title = '修改客户端'
      // this.ruleForm = data;
      getClientById({ id: data.id }).then((res) => {
        if (res.data.allowedscopes !== '') {
          this.allowedscopes = res.data.allowedscopes.split(',')
        }
        this.ruleForm = res.data
      })
      this.dialogVisible = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          saveOrUpdateClient(this.ruleForm)
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
              this.resetForm('ruleForm')
              this.dialogVisible = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.allowedscopes = []
      this.ruleForm.clienticon = ''
      this.ruleForm.allowedscopes = ''
      this.$refs['iconSelect'].reset()
      this.$refs[formName].resetFields()
    },
    allowedSelect(value) {
      this.ruleForm.allowedscopes = value.join(',')
    }
  }
}
</script>

<style></style>
