<template>
  <el-dialog
    :title="isEdit?'编辑施工作业':'新增施工作业'"
    :visible.sync="dialogVisible"
    :append-to-body="true"
    destroy-on-close
    :close-on-click-modal="false"
    width="60%"
    top="5vh"
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
          v-model="road"
          filterable
          remote
          reserve-keyword
          :placeholder="form.roadName?form.roadName:'请输入公路名称'"
          :remote-method="roadRemoteMethod"
          :loading="loading"
          @change="selectRoad"
        >
          <el-option
            v-for="(item,index) in highWayList"
            :key="index"
            :label="`${item.lxbm}-${item.lxmc}-${item.fdmc}`"
            :value="item.objStr"
          />
        </el-select>
        <el-input
          style="width:31%;margin: 0 1%"
          readonly
          disabled
          v-model="form.landmarkStartId"
          placeholder="起点桩号"
        ></el-input>
        <el-input
          style="width:31%;margin: 0 1%"
          readonly
          disabled
          v-model="form.landmarkEndId"
          placeholder="终点桩号"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="请选择上下行"
        prop="lane"
      >
        <el-select
          v-model="form.lane"
          style="width:100%"
        >
          <el-option
            v-for="item in laneOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
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
          :autosize="{ minRows: 2, maxRows: 6}"
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
import { saveWor, getHighwayInfo, getMileagePile } from '@/api/system/constructionOperation';
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
      loading: false,
      dialogVisible: false,
      isEdit: 0,
      highWayList: [],
      road: null,
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
          name: '上行',
          value: '1',
        },
        {
          name: '下行',
          value: '2'
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
        this.road = null
        this.getHighwayInfo(undefined, true)
      } else {
        this.getHighwayInfo(undefined, true)
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
    selectRoad(objStr) {
      const road = JSON.parse(objStr)
      this.form.roadId = road.lxbm + "-" + road.fdsf
      this.form.roadCode = road.lxbm
      this.form.roadName = `${road.lxbm}-${road.lxmc}-${road.fdmc}`
      this.getMileagePile(road.fdsf)
    },
    async saveWor(form = this.form, sucFun, failFun) {
      const { code, message } = await saveWor(form)
      if (code === 200) {
        this.$message.success(message)
        sucFun()
      } else {
        failFun()
      }
    },

    async roadRemoteMethod(query) {
      await this.getHighwayInfo(upString)
    },

    // 查询公路
    async getHighwayInfo(name, isInit) {
      if (!name && !isInit) return
      this.loading = true
      const { result } = await getHighwayInfo({ name })
      this.highWayList = result.map((item) => {
        return {
          ...item,
          objStr: JSON.stringify(item)
        }
      })
      this.loading = false
    },
    // 查询桩号
    async getMileagePile(fdsf) {
      this.loading = true
      const { result } = await getMileagePile({ fdsf })
      this.form.landmarkStartId = result.startNumber
      this.form.landmarkEndId = result.endNumber
      this.form.mile = result.mile
      this.loading = false
    }
  },
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__footer {
  text-align: center;
}
::v-deep .el-dialog__body {
  padding: 0 20px;
}
// ::v-deep .el-form-item {
//   display: inline-block;
//   width: 45%;
//   margin: 0 0 20px 0;
// }
</style>