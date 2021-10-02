<template>
  <div class="app-container">
    <el-row>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="父机构" prop="parentId">
              <treeselect
                v-model="form.parentId"
                :options="pidOptions"
                :normalizer="normalizer"
                :show-count="true"
                placeholder="请选择父机构"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入机构名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="机构简称" prop="shortName">
              <el-input v-model="form.shortName" placeholder="请输入机构简称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="第一负责人" prop="principal">
              <el-select
                v-model="form.principal"
                placeholder="第一负责人"
                clearable
                size="small"
              >
                <el-option
                  v-for="item in principalOptions"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="机构编码" prop="id">
              <el-input v-model="form.id" placeholder="请输入机构编码" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否虚机构" prop="virtualed">
              <el-radio-group v-model="form.virtualed">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="机构组织类型" prop="organizationType">
              <el-select
                v-model="form.organizationType"
                placeholder="机构组织类型"
                clearable
                size="small"
              >
                <el-option
                  v-for="item in orgTypeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构业务类型" prop="buzType">
              <el-select
                v-model="form.buzType"
                placeholder="机构业务类型"
                clearable
                size="small"
              >
                <el-option
                  v-for="item in businessTypeOptions"
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
            <el-form-item label="所在地点" prop="address">
              <el-input v-model="form.address" placeholder="请输入所在地点" />
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
  getOrgTreeData,
  getOrgById,
  saveOrg,
  getOrgPositionMan
} from "@/api/system/org/org";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "OrgInput",
  components: { Treeselect },
  props: {
    id: {
      type: String
    },
    pid: {
      type: String
    },
    extraParams: {
      type: Object
    }
  },
  data() {
    return {
      pidOptions: [],
      orgTypeOptions: [],
      businessTypeOptions: [],
      principalOptions: [],
      // 字典分类表单参数
      form: {
        id: undefined,
        parentId: this.pid,
        pingyin: undefined,
        shortName: undefined,
        principal: undefined,
        virtualed: 0,
        multiOrgType: this.extraParams.multiOrgType,
        organizationType: undefined,
        buzType: undefined,
        ids: this.id
      },
      normalizer(node) {
        //方法
        return {
          id: node.id, // 键名转换，方法默认是label和children进行树状渲染
          label: node.text,
          children: node.children
        };
      },
      // 表单校验
      rules: {
        name: [
          { required: true, message: "机构名称不能为空", trigger: "blur" }
        ],
        id: [{ required: true, message: "机构编码不能为空", trigger: "blur" }]
      }
    };
  },
  watch: {
    id(val) {
      this.reset();
      this.getData();
    }
  },
  created() {
    this.reset();
    this.getData();
    this.getDicts("BUSINESS").then(res => {
      this.businessTypeOptions = res;
    });
    this.getDicts("ORGANIZATION").then(res => {
      this.orgTypeOptions = res;
    });
    getOrgPositionMan(this.extraParams.multiOrgType).then(response => {
      this.principalOptions = response;
    });
    getOrgTreeData(this.extraParams.multiOrgType).then(response => {
      this.pidOptions = response;
    });
  },
  methods: {
    getData() {
      if (this.id !== undefined) {
        getOrgById(this.id).then(res => {
          if (res.success) {
            this.form = res.data;
            this.form.ids = this.form.id;
          }
        });
      }
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          saveOrg(this.form).then(response => {
            if (response.rtnCode === 200) {
              this.msgSuccess(response.msg);
              this.$emit("cancel");
            }
          });
        }
      });
    },
    // 取消按钮
    cancel() {
      this.$emit("cancel");
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        parentId: this.pid,
        pingyin: undefined,
        shortName: undefined,
        principal: undefined,
        virtualed: 0,
        multiOrgType: undefined,
        buzType: undefined,
        ids: this.id
      };
    }
  }
};
</script>
