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
        label="管理中心"
        prop="centerId"
      >
        <el-cascader
          ref="cascaderRef"
          style="width:100%"
          v-model="form.centerId"
          :options="centerTree"
          :props="{children: 'children', label: 'name', checkStrictly: true, value:'id', emitPath:false}"
        ></el-cascader>
      </el-form-item>
      <el-form-item
        label="施工区域"
        prop="deviceNumber"
      >
        <el-select
          :disabled="roadSelectAble"
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
        <el-input-number
          controls-position="right"
          style="width:31%;margin: 0 1%"
          :disabled="!form.roadId"
          v-model="form.landmarkStartId"
          :min="startMinMil"
          :max="startMaxMil"
          placeholder="起点桩号"
        ></el-input-number>
        <el-input-number
          controls-position="right"
          style="width:31%;margin: 0 1%"
          :disabled="!form.roadId"
          v-model="form.landmarkEndId"
          placeholder="终点桩号"
          :min="endMinMil"
          :max="endMaxMil"
        ></el-input-number>
        <div
          style="color:red;font-size:12px;height:24px"
          v-if="form.roadId"
        >{{`桩号范围：（${startMinMil}~${endMaxMil}）`}}</div>
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
  watch: {
    'form.centerId': {
      immediate: true,
      handler(centerId) {
        if (centerId) {
          this.$nextTick(() => {
            this.selectedCenter = this.$refs.cascaderRef?.getCheckedNodes()[0]?.data
            this.form.centerName = this.selectedCenter?.name ? this.selectedCenter?.name : this.form.centerName
            this.roadSelectAble = true
            this.road = null
            this.getHighwayInfo()
          })
        }
      },
    },
    'form.landmarkStartId': {
      immediate: true,
      handler(landmarkStartId) {


        if (landmarkStartId - this.form.landmarkEndId >= 0 || landmarkStartId - this.form.landmarkEndId < -4) {
          this.form.landmarkEndId = landmarkStartId + 4
        }
      },
    },
    'form.landmarkEndId': {
      immediate: true,
      handler(landmarkEndId) {
        if (!landmarkEndId) return
        if (landmarkEndId - this.form.landmarkStartId <= 0 || landmarkEndId - this.form.landmarkStartId > 4) {
          this.form.landmarkStartId = landmarkEndId - 4
        }
      }
    }
  },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      isEdit: 0,
      highWayList: [],
      selectedCenter: {},
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
        landmarkEndId: 0,
        landmarkStart: "",
        landmarkStartId: 0,
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
      ],
      roadSelectAble: true,
      startMinMil: 0,
      startMaxMil: 0,
      endMinMil: 0,
      endMaxMil: 0
    }
  },
  computed: {
    rules() {
      return {
      }
    }
  },
  methods: {
    async open(isEdit, info) {
      this.queryMangeCenter()
      this.isEdit = isEdit
      if (!isEdit) {
        this.form = Object.assign({}, this.$options.data().form)
        this.road = null
        this.roadSelectAble = true
        this.startMinMil = 0
        this.startMaxMil = 0
        this.endMinMil = 0
        this.endMaxMil = 0
        this.load = null
      } else {
        this.startMinMil = 0
        this.startMaxMil = 0
        this.endMinMil = 0
        this.endMaxMil = 0
        this.load = null
        await this.getMileagePile(info.roadId)
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
      this.form.roadId = road.fdsf
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
    async getHighwayInfo(name) {
      this.loading = true
      const { result } = await getHighwayInfo({ name, centerLevelCode: this.selectedCenter.levelCode })
      this.roadSelectAble = false
      this.highWayList = result.map((item) => {
        return {
          ...item,
          objStr: JSON.stringify(item)
        }
      })
      this.load = null
      this.loading = false
    },
    // 查询桩号
    async getMileagePile(fdsf) {
      this.loading = true
      const { result } = await getMileagePile({ fdsf })
      const startNumber = Number(result.startNumber)
      const endNumber = Number(result.endNumber)
      this.form.landmarkStartId = startNumber
      this.form.landmarkEndId = startNumber + 4
      this.startMinMil = startNumber
      this.startMaxMil = endNumber - 4
      this.endMinMil = startNumber + 4
      this.endMaxMil = endNumber
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
::v-deep .el-input-number__decrease,
::v-deep .el-input-number__increase {
  display: none;
}
// ::v-deep .el-form-item {
//   display: inline-block;
//   width: 45%;
//   margin: 0 0 20px 0;
// }
</style>