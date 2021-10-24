<template>
  <el-dialog
    :title="isEdit?'编辑施工作业':'新增施工作业'"
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
        label="施工作业名称"
        prop="jobName"
      >
        <el-input v-model="form.jobName"></el-input>
      </el-form-item>
      <el-form-item
        label="施工区域"
        prop="deviceNumber"
      >
        <el-select
          v-model="form.roadId"
          placeholder="请选择公路"
          clearable
        ></el-select>
        <el-select
          v-model="form.landmarkStartId"
          placeholder="请选择起点桩号"
          clearable
        ></el-select>
        <el-select
          v-model="form.landmarkStartId"
          placeholder="请选择终点桩号"
          clearable
        ></el-select>
      </el-form-item>
      <el-form-item
        label="请选择车道"
        prop="lane"
      >
        <el-select
          v-model="form.lane"
          style="width:100%"
        >
          <el-option
            v-for="item in laneOptions"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="施工计划时间"
        prop="address"
      >
        <el-date-picker
          v-model="form.planStartTime"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="选择开始日期"
        >
        </el-date-picker>
        <span style="margin:0 10px">~</span>
        <el-date-picker
          v-model="form.planEndTime"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="选择开始日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="管理中心"
        prop="centerId"
      >
        <el-select
          style="width:100%"
          v-model="form.centerId"
          @change="nodeClick"
        >
          <el-option
            style="height: 300px"
            :value="form.centerId"
            :label="form.centerName"
          >
            <el-tree
              ref="tree"
              :data="centerTree"
              @node-click="nodeClick"
              :props="{children: 'children',label: 'name'}"
            >
            </el-tree>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="联系人名称"
        prop="centerId"
      >
        <el-input v-model="form.contactName" />
      </el-form-item>
      <el-form-item
        label="联系方式"
        prop="centerId"
      >
        <el-input v-model="form.contactPhone" />
      </el-form-item>
      <el-form-item
        label="备注"
        prop="isConnectPlatform"
      >
        <el-input
          v-model="form.remark"
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 10}"
          placeholder="请输入内容"
        >
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
import { saveWor } from '@/api/system/constructionOperation';
import optionMixin from './mixins/optionMixin';
import centerOption from './mixins/centerTreeMixin';
export default {
  mixins: [optionMixin, centerOption],
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
        centerId: "",
        centerName: "",
        contactName: "",
        contactPhone: "",
        endTime: "",
        jobName: "",
        jobStatus: 0,
        landmarkEnd: "",
        landmarkEndId: "",
        landmarkStart: "",
        landmarkStartId: "",
        lane: "",
        mile: '',
        planEndTime: "",
        planStartTime: "",
        remark: "",
        roadCode: "",
        roadId: "",
        roadName: "",
        startTime: "",
      },
      laneOptions: [
        {
          name: '一车道',
        },
        {
          name: '二车道',
        },
        {
          name: '三车道',
        },
        {
          name: '四车道',
        },
        {
          name: '五车道',
        },
        {
          name: '六车道',
        },
        {
          name: '七车道',
        },
      ]
    }
  },
  computed: {
    rules() {
      return {
        // deviceName: [{ required: true, message: '请输入设备名称', trigger: 'blur' }],
        // deviceNumber: [{ required: true, message: '请输入设备编号', trigger: 'blur' }],
        // deviceType: [{ required: true, message: '请选择设备类型', trigger: 'blur' }],
        // centerId: [{ required: true, message: '请选择管理中心', trigger: 'blur' }]
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
          this.saveWor(undefined, () => { this.close(); this.$emit("submitSucc") })
        } else {
          return false;
        }
      })
    },
    async saveWor(form = this.form, sucFun, failFun) {
      const { code, message } = await saveWor(form)
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
// ::v-deep .el-form-item {
//   display: inline-block;
//   width: 45%;
//   margin: 0 0 20px 0;
// }
</style>