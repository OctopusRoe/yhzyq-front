<template>
  <div class="app-container">
    <el-row>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="工号" prop="jobNum">
              <el-input v-model="form.jobNum" placeholder="请输入工号"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" placeholder="请输入姓名"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="登录名" prop="loginName">
              <el-input v-model="form.loginName" placeholder="请输入登录名"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="form.sex">
                <el-radio label="SEX_MAN">男</el-radio>
                <el-radio label="SEX_WUMAN">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="mobileNum">
              <el-input v-model="form.mobileNum" placeholder="请输入手机号码"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" placeholder="请输入邮箱"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属机构" prop="orgId">
              <treeselect v-model="form.orgId" :options="orgOptions"
                          :normalizer="normalizer" :show-count="true" placeholder="请选择所属机构"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属职位" prop="userDuty">
              <el-select v-model="form.userDuty" :multiple="true" placeholder="所属职位" clearable size="small">
                <el-option
                  v-for="item in dutyOptions"
                  :key="item.id"
                  :label="item.text"
                  :value="item.id"
                />
              </el-select>
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
    saveUser,
    editUser,
    getUserDuty
  } from '@/api/system/org/user'
  import {
    getAllOrgTreeData,
    getUserById
  } from '@/api/system/org/org'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  export default {
    name: 'OrgUserInput',
    components: { Treeselect },
    props: {
      id: {
        type: String
      },
      orgId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        dutyOptions: [],
        orgOptions: [],
        // 表单参数
        form: {
          id: undefined,
          jobNum: undefined,
          name: undefined,
          loginName: undefined,
          sex: 'SEX_MAN',
          mobileNum: undefined,
          email: undefined,
          userDuty: [],
          orgId: this.orgId
        },
        normalizer(node) { //方法
          return {
            id: node.id, // 键名转换，方法默认是label和children进行树状渲染
            label: node.text,
            children: node.children
          }
        },
        // 表单校验
        rules: {
          name: [
            { required: true, message: '姓名不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    watch: {
      id(val) {
        this.reset()
        this.getData()
      }
    },
    created() {
      getUserDuty(this.id).then((res) => {
        this.dutyOptions = res
      })
      getAllOrgTreeData().then((response) => {
        this.orgOptions = response
      })
      this.getData()
    },
    methods: {
      getData() {
        if (this.id !== undefined) {
          getUserById(this.id).then((res) => {
            if (res.success) {
              this.form.id = res.data.id
              this.form.jobNum = res.data.jobNum
              this.form.name = res.data.name
              this.form.loginName = res.data.loginName
              this.form.sex = res.data.sex
              this.form.mobileNum = res.data.mobileNum
              this.form.email = res.data.email
              this.form.orgId = res.data.orgId
              this.form.userDuty=[]
              this.dutyOptions.forEach((item)=>{
                res.data.userDuty.split(',').forEach((ud)=>{
                  if(item.text===ud.trim()){
                    this.form.userDuty.push(item.id)
                  }
                })

              })

            }
          })
        }
      },
      /** 提交按钮 */
      submitForm: function() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.form.userDuty = this.form.userDuty.join(',')
            console.log(this.form.userDuty)
            if (this.form.id !== undefined) {
              editUser(this.form).then((response) => {
                if (response.success) {
                  this.msgSuccess(response.msg)
                  this.$emit('cancel')
                } else {
                  this.msgError(response.msg)
                }
              })
            } else {
              saveUser(this.form).then((response) => {
                if (response.success) {
                  this.msgSuccess(response.msg)
                  this.$emit('cancel')
                } else {
                  this.msgError(response.msg)
                }
              })
            }
          }
        })
      },
      // 取消按钮
      cancel() {
        this.$emit('cancel')
      },
      // 表单重置
      reset() {
        this.form = {
          id: undefined,
          jobNum: undefined,
          name: undefined,
          loginName: undefined,
          sex: 'SEX_MAN',
          mobileNum: undefined,
          email: undefined,
          userDuty: [],
          orgId: this.orgId
        }
      }

    }
  }
</script>

