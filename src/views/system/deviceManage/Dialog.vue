<template>
  <el-dialog
    :title="isEdit?'编辑设备':'新增设备'"
    :visible.sync="dialogVisible"
    :append-to-body="true"
    destroy-on-close
    width="60%"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="150px"
    >
      <el-form-item
        label="设备名称"
        prop="deviceName"
      >
        <el-input v-model="form.deviceName"></el-input>
      </el-form-item>
      <el-form-item
        label="设备编号"
        prop="deviceNumber"
      >
        <el-input v-model="form.deviceNumber"></el-input>
      </el-form-item>
      <el-form-item
        label="设备类型"
        prop="deviceType"
      >
        <el-select v-model="form.deviceType">
          <el-option
            v-for="item in devTypeOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="设备状态"
        prop="deviceStatus"
      >
        <el-select v-model="form.deviceStatus">
          <el-option
            v-for="item in devStaOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="管理中心"
        prop="centerId"
      >
        <el-select v-model="form.centerId"></el-select>
      </el-form-item>
      <el-form-item
        label="设备地址"
        prop="address"
      >
        <el-input v-model="form.address">
        </el-input>
      </el-form-item>
      <el-form-item
        label="设备电量"
        prop="electricity"
      >
        <el-input v-model="form.electricity">
        </el-input>
      </el-form-item>
      <el-form-item
        label="是否对接第三方平台"
        prop="isConnectPlatform"
      >
        <el-input v-model="form.isConnectPlatform">
        </el-input>
      </el-form-item>
      <el-form-item
        label="是否在线"
        prop="isOnline"
      >
        <el-input v-model="form.isOnline">
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="close()">取消</el-button>
      <el-button
        type="primary"
        @click="close();submitForm()"
      >提交</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveDev } from '@/api/system/deviceManage';
import optionMixin from './mixins/optionMixin';
export default {
  mixins: [optionMixin],
  props: {
    info: {
      type: Object,
      default: () => { }
    },
  },
  data() {
    return {
      dialogVisible: false,
      isEdit: 0,
      form: {
        address: "",
        centerId: "111111",
        centerName: "1111111",
        createUser: "",
        deviceName: "",
        deviceNumber: "",
        deviceStatus: "",
        deviceType: "",
        electricity: "",
        isConnectPlatform: "",
        isOnline: "",
        pileNumber: "",
      }
    }
  },
  computed: {
    rules() {
      return {
        deviceName: [{ required: true, message: '请输入设备名称', trigger: 'blur' }],
        deviceNumber: [{ required: true, message: '请输入设备编号', trigger: 'blur' }],
        deviceType: [{ required: true, message: '请选择设备类型', trigger: 'blur' }],
        centerId: [{ required: true, message: '请选择管理中心', trigger: 'blur' }]
      }
    }
  },
  methods: {
    open(isEdit, info) {
      this.isEdit = isEdit
      if (!isEdit) {
        this.form = Object.assign({}, this.$options.data().form)
      } else {
        this.form = info
      }
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
    },
    submitForm() {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          this.saveDev(undefined, () => { this.close(); this.$emit("submitSucc") })
        } else {
          return false;
        }
      })
    },
    async saveDev(form = this.form, sucFun, failFun) {
      const { code, message } = await saveDev(form)
      if (code === 200) {
        this.$message.success(message)
        sucFun()
      } else {
        failFun()
      }
    }
  },
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__footer {
  text-align: center;
}
::v-deep .el-form-item {
  display: inline-block;
  width: 45%;
  margin: 0 0 20px 0;
}
</style>