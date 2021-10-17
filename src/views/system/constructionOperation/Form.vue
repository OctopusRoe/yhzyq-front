<template>
  <el-form
    v-model="form"
    :inline="true"
    ref="formRef"
  >
    <el-form-item label="作业名称">
      <el-input v-model="form.jobName"></el-input>
    </el-form-item>
    <el-form-item label="作业状态">
      <el-select
        v-model="form.jobStatus"
        clearable
      >
        <el-option
          v-for="item in worStaOptions"
          :key="item.val"
          :label="item.name"
          :value="item.val"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="计划时间">
      <el-date-picker
        v-model="form.planTimeStart"
        type="date"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        placeholder="选择开始日期"
      >
      </el-date-picker>
      <span style="margin:0 10px">~</span>
      <el-date-picker
        v-model="form.planTimeEnd"
        type="date"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        placeholder="选择开始日期"
      >
      </el-date-picker>
    </el-form-item>
    <el-button
      class="form-button"
      type="primary"
      @click="submitForm"
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
      timeRange: [],
      form: {
        jobName: '',
        jobStatus: '',
        planTimeStart: '',
        planTimeEnd: ''
      },
    }
  },
  mixins: [optionMixin],
  methods: {
    restForm() {
      this.form = this.$options.data().form
    },
    submitForm() {
      this.$emit("submitForm", this.form)
    }
  },
}
</script>

<style lang="scss" scoped>
</style>