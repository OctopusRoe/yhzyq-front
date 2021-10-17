<template>
  <el-form
    v-model="form"
    :inline="true"
    ref="formRef"
  >
    <el-form-item label="编号">
      <el-input v-model="form.deviceNumber"></el-input>
    </el-form-item>
    <el-form-item label="名称">
      <el-input v-model="form.deviceName"></el-input>
    </el-form-item>
    <el-form-item label="状态">
      <el-select
        v-model="form.deviceStatus"
        clearable
      >
        <el-option
          v-for="item in devStaOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="设备类型">
      <el-select
        v-model="form.deviceType"
        clearable
      >
        <el-option
          v-for="item in devTypeOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-button
      class="form-button"
      type="primary"
      @click="subForm"
    >搜索</el-button>
    <el-button
      class="form-button"
      plain
      @click="restForm"
    >重置</el-button>
  </el-form>
</template>

<script>
import optionMixin from './mixins/optionMixin';
export default {
  data() {
    return {
      form: {
        deviceNumber: '',
        deviceName: '',
        deviceStatus: '',
        deviceType: ''
      },
    }
  },
  mixins: [optionMixin],
  methods: {
    restForm() {
      this.form = this.$options.data().form
    }
  },
}
</script>

<style lang="scss" scoped>
</style>