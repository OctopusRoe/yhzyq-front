<template>
  <div>
    <div>
      <el-row :gutter="1" class="row-bg">
        <el-col :span="24">
          <el-card class="box-card" :style="{ height: siderHeigth }">
            <el-form :model="queryParams" ref="queryForm" :inline="true">
              <!-- <div class="querybox"> -->
              <el-form-item label="机构名称" prop="name">
                <el-input
                  v-model="queryParams.name"
                  placeholder="请输入机构名称"
                  clearable
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="机构编码" prop="id">
                <el-input
                  v-model="queryParams.id"
                  placeholder="请输入机构编码"
                  clearable
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleQuery" icon="el-icon-search">查询 </el-button>
                <el-button @click="resetQuery" icon="el-icon-refresh-right">重置 </el-button>
              </el-form-item>
              <div style="float: right">
                <div>
                  <el-button type="primary" @click="handleAdd" icon="el-icon-plus">新增 </el-button>
                </div>
              </div>
            </el-form>
            <vxe-table
              border
              resizable
              height="528px"
              ref="orgTable"
              :tree-config="{
                children: 'children',
                expandRowKeys: expandRowKeys,
                reserve: true
              }"
              row-id="id"
              :data="orgList"
              show-overflow
              v-loading="loading"
            >
              <vxe-table-column type="seq" title="序号" width="55" align="center"></vxe-table-column>
              <vxe-table-column field="text" title="机构名称" tree-node header-align="center"></vxe-table-column>
              <vxe-table-column field="orgCode" title="机构编码" align="center"></vxe-table-column>
              <vxe-table-column field="shortName" title="机构简称" align="center"></vxe-table-column>
              <vxe-table-column field="principal" title="第一负责人" align="center"></vxe-table-column>
              <vxe-table-column
                field="virtualed"
                title="是否虚机构"
                align="center"
                width="100"
                :formatter="statusFormat"
              ></vxe-table-column>
              <vxe-table-column
                field="organizationType"
                title="机构组织类型"
                align="center"
                :formatter="organizationTypeFormat"
              ></vxe-table-column>
              <vxe-table-column
                field="buzType"
                title="机构业务类型"
                align="center"
                :formatter="buzTypeFormat"
              ></vxe-table-column>
              <vxe-table-column field="address" align="center" width="120" title="机构所在地点"></vxe-table-column>
              <vxe-table-column title="操作" width="200" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="handleAddChildren(scope.row)">新增</el-button>
                  <el-divider direction="vertical"></el-divider>
                  <el-button type="text" @click="handleUpdate(scope.row)">修改</el-button>
                  <el-divider direction="vertical"></el-divider>
                  <!-- <el-button type="text" @click="handleDelete(scope.row)"
                    >删除</el-button
                  >
                  <el-divider direction="vertical"></el-divider> -->

                  <!-- <el-divider direction="vertical"></el-divider> -->
                  <el-dropdown>
                    <el-button type="text">更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>
                        <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <el-button type="text" @click="handleAuth(scope.row)">关联角色 </el-button>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </vxe-table-column>
            </vxe-table>
          </el-card>

          <!-- <div class="detail-table-wrap"></div>
          <div class="detail-pages-wrap"></div> -->
        </el-col>
      </el-row>
    </div>
    <!-- 添加或修改菜单对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="650px"
      :append-to-body="true"
      :close-on-click-modal="false"
      class="dialog-common"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="115px">
        <el-row>
          <!-- <el-col :span="12" v-show="false">
            <el-form-item label="父机构id" prop="parentId">
              <el-input v-model="form.parentId" placeholder="" disabled />
            </el-form-item>
          </el-col> -->

          <el-col :span="12">
            <el-form-item label="机构编码" prop="orgCode">
              <el-input v-model="form.orgCode" placeholder="" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构名称" prop="name">
              <el-input v-model="form.name" placeholder="" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构简称" prop="shortName">
              <el-input v-model="form.shortName" placeholder="" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="第一负责人" prop="principal">
              <el-select v-model="form.principal" placeholder="" clearable style="width: 100%">
                <el-option label="请选择" value=""> </el-option>
                <el-option v-for="item in principalOptions" :key="item.name" :label="item.name" :value="item.name" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否虚机构" prop="virtualed">
              <el-select v-model="form.virtualed" style="width: 100%">
                <el-option label="请选择" value=""></el-option>
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构组织类型" prop="organizationType">
              <el-select v-model="form.organizationType" placeholder="" clearable style="width: 100%">
                <el-option v-for="item in orgTypeOptions" :key="item.id" :label="item.name" :value="item.vals" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构业务类型" prop="buzType">
              <el-select v-model="form.buzType" placeholder="" clearable style="width: 100%">
                <el-option v-for="item in businessTypeOptions" :key="item.id" :label="item.name" :value="item.vals" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序" prop="sortedNum">
              <el-input-number
                v-model="form.sortedNum"
                controls-position="right"
                placeholder=""
                :min="1"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="拼音" prop="pingyin">
              <el-input v-model="form.pingyin" placeholder="" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所在地点" prop="address">
              <el-input v-model="form.address" placeholder="" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="更新时的id" prop="ids" style="display: none">
              <el-input v-model="form.ids" />
            </el-form-item>
          </el-col>
          <el-col align="middle">
            <el-button type="primary" @click="submitForm">提 交</el-button>
            <el-button @click="cancel">取 消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!--机构角色管理的弹框-->
    <el-dialog
      :title="title"
      :visible.sync="roleOpen"
      v-if="roleOpen"
      width="800px"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      class="dialog-common"
      style="margin-top: -3%"
    >
      <OrgRole @cancel="cancel" :id="currentId"> </OrgRole>
    </el-dialog>
  </div>
</template>

<script>
import OrgRole from '@/views/system/org/org/orgRole'
import {
  getTreeDatasByConditions,
  saveOrg,
  deleteById,
  getOrgPositionMan,
  getOrgByid,
  boundOrgUser,
  getDicts
} from '@/api/system/org/org'
// import Treeselect from "@riophae/vue-treeselect";
// import { TagsView } from "@/layout/components";
// import "@riophae/vue-treeselect/dist/vue-treeselect.css";
// import IconSelect from "@/components/common/IconSelect";

export default {
  name: 'SystemOrgOrgIndex',
  components: { OrgRole },
  data() {
    return {
      expandRowKeys: [],
      siderHeigth: 'calc(100% - 3px)',
      defaultOpen: require('@/assets/image/edit_add.png'),
      defaultClose: require('@/assets/image/edit_add.png'),
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      data: [],

      // 遮罩层
      loading: false,
      currentId: '',
      // 显示搜索条件
      showSearch: true,
      // 机构表格树数据
      orgList: [],
      orgTypeOptions: [],
      businessTypeOptions: [],
      principalOptions: [],

      extraParams: {
        multiOrgType: this.$route.query.type
      },
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      roleOpen: false,
      // 显示状态数据字典
      visibleOptions: [],
      // 菜单状态数据字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        id: '',
        name: '',
        visible: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        orgCode: [
          {
            validator: (rule, value, callback) => {
              let reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
              if (reg.test(value)) {
                callback(new Error('机构编码不能有中文'))
              }
              callback()
            }
          }
        ],
        // parentId: [{ required: true, message: "父机构编码不能为空" }],
        name: [{ required: true, message: '机构名称不能为空' }],
        // principal: [{ required: true, message: "请选择第一负责人" }],
        // id: [
        //   { type: "number", message: "必须为数字" },
        //   { type: "number", min: 0, max: 99, message: "机构编码范围0-99" }
        // ],
        virtualed: [{ required: true, message: '请选择是否虚机构' }],
        sortedNum: [{ required: true, message: '请输入序号' }],
        buzType: [{ required: true, message: '请选择机构业务类型' }],
        organizationType: [{ required: true, message: '请选择机构组织类型' }]
        // address: [{ required: true, message: "所在地点不能为空" }]
      },
      total: 0,
      size: 10,
      page: 1
    }
  },
  async created() {
    await getDicts({ type: 'ORG_LEVEL' }).then((res) => {
      this.businessTypeOptions = res
    })
    await getDicts({ type: 'ORG_TYPE' }).then((res) => {
      this.orgTypeOptions = res
    })
    // getOrgPositionMan({ multiOrgType: this.extraParams.multiOrgType }).then(
    //   response => {
    //     this.principalOptions = response;
    //   }
    // );
    this.getList()
  },
  mounted() {
    console.log(this)
  },
  methods: {
    buzTypeFormat({ cellValue }) {
      let res = this.businessTypeOptions.find((item) => item.vals === cellValue)
      return res.name
    },
    organizationTypeFormat({ cellValue }) {
      let res = this.orgTypeOptions.find((item) => item.vals === cellValue)
      return res.name
    },
    /** 查询菜单列表 */
    getList() {
      this.expandRowKeys = []
      this.$refs.orgTable.getTreeExpandRecords().forEach((item) => {
        console.log(item)
        this.expandRowKeys.push(item.id)
      })
      this.loading = true
      getTreeDatasByConditions({
        id: this.queryParams.id,
        name: this.queryParams.name
      }).then((response) => {
        if (response.length > 0) {
          this.$refs.orgTable.setTreeExpand([response[0]], true)
        }
        console.log(response)
        this.orgList = response
        this.loading = false
      })
    },

    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        menuId: undefined,
        parentId: '',
        name: undefined,
        text: undefined,
        orderNum: undefined
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.$refs.orgTable.clearTreeExpand()
      this.resetForm('queryForm')
      this.handleQuery()
    },
    /** 新增子机构按钮操作 */
    handleAddChildren(row) {
      this.reset()
      if (row != null && row.id) {
        this.form.parentId = row.id
      }
      this.form.saveFlag = 1
      this.open = true
      this.title = '新增机构'
    },
    /** 新增机构按钮操作 */
    async handleAdd() {
      this.reset()
      let tmp = []
      await getTreeDatasByConditions({
        id: '',
        name: ''
      }).then((res) => {
        tmp = res
      })
      if (tmp.length > 0) {
        this.$message({
          type: 'warning',
          message: '已存在根节点'
        })
        return false
      }
      this.form.saveFlag = 1
      this.open = true
      this.title = '新增机构'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      console.log(row)
      getOrgByid({ id: row.id }).then((res) => {
        console.log(res)
        this.form = res.data
        this.form.name = res.data.name
        this.form.ids = res.data.id
        this.form.virtualed = res.data.virtualed + ''
      })
      this.open = true
      this.title = '修改机构'
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          saveOrg(this.form).then((response) => {
            if (response.rtnCode === 200) {
              this.msgSuccess(response.msg)
              this.open = false
              this.getList()
            }
          })
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$confirm('是否确认删除机构编码为"' + row.orgCode + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function () {
          return deleteById(row.id)
        })
        .then((response) => {
          this.getList()
          if (response.success) {
            this.msgSuccess('删除成功')
          } else {
            this.msgError(response.msg)
          }
        })
        .catch(function () {})
    },
    handleAuth(row) {
      this.title = '机构已关联角色'
      this.currentId = row.id
      this.roleOpen = true
    },
    // 是否虚机构翻译
    statusFormat(row) {
      if (row.row.virtualed === 1) {
        return '是'
      } else {
        return '否'
      }
    }
  }
}
</script>

<style lang="scss" src="@/assets/styles/tabletree.scss" scoped />
