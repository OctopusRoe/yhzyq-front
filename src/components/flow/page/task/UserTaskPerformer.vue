<template>
  <el-row>
    <el-col :span="24">
      <el-input v-model="orgId" v-if="showInput"></el-input>
      <el-form ref="form" :model="form" :rules="rules" label-width="150px" label-position="right" size="mini">
        <el-form-item label="执行人类型" prop="performerType">
          <el-select v-model="form.performerType" clearable @change="changedType">
            <el-option v-for="item in performTypes" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="documentation" label="说明">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" :rows="3" v-model="form.documentation"
                    clearable></el-input>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24">
      <candidate-users ref="user" v-if="userShowType" :orgId="orgId" :taskId="task.id"
                       :userId="form.expression"></candidate-users>
      <candidate-groups ref="userGroup" v-if="groupShowType" :orgId="orgId" :taskId="task.id"
                        :groupId="form.expression"></candidate-groups>
      <candidate-roles ref="userRole" v-if="roleShowType" :orgId="orgId" :taskId="task.id"
                       :roleId="form.expression"></candidate-roles>
    </el-col>
    <el-col :span="24">
      <el-row type="flex" justify="center">
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-edit" @click="submitForm('form')">保存</el-button>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import Message from '../../common/Message'
  import CandidateUsers from './CandidateUsers'
  import CandidateGroups from './CandidateGroups'
  import CandidateRoles from './CandidateRoles'

  export default {
    props: {
      orgId: {
        type: String,
        default: ''
      },
      task: {
        type: Object,
        default: {}
      }
    },
    components: {
      CandidateUsers,
      CandidateGroups,
      CandidateRoles
    },
    watch: {
      taskId: function() {
        this.loadPerformer()
      }
    },
    data() {
      return {
        showInput: false,
        userShowType: false,
        groupShowType: false,
        roleShowType: false,
        form: {
          performerType: '',
          useExpression: '',
          expression: '',
          formKey: '',
          dueDate: '',
          priority: '',
          documentation: ''
        },
        performTypes: [
          {
            value: 'candidateUsers',
            label: '用户'
          },
          {
            value: 'candidateGroups',
            label: '用户组'
          },
          {
            value: 'candidateRoles',
            label: '角色'
          }
        ],
        rules: {
          id: [
            {
              required: true,
              message: '请输入id',
              trigger: 'blur'
            }
          ],
          name: [
            {
              required: true,
              message: '请输入名称',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      ...mapActions([
        'saveTaskPerformer',
        'saveCandidateGroups',
        'saveCandidateUsers',
        'setSelectedTask',
        'saveCandidateRoles'
      ]),
      changedType(val) {
        if (val === 'candidateUsers') {
          this.userShowType = true
          this.groupShowType = false
          this.roleShowType = false
        } else if (val === 'candidateGroups') {
          this.userShowType = false
          this.groupShowType = true
          this.roleShowType = false
        } else if (val === 'candidateRoles') {
          this.groupShowType = false
          this.userShowType = false
          this.roleShowType = true
        }
      },
      loadPerformer() {

        // let task = this.$store.state.selectedTask
        let task = this.task
        if (task) {
          this.form.performerType = task.performerType
          this.form.expression = task.expression
          this.form.useExpression = task.isUseExpression
          this.form.formKey = task.formKey
          this.form.dueDate = task.dueDate
          this.form.priority = task.priority
          this.form.documentation = task.documentation
          if (task.performerType === 'candidateUsers') {
            this.userShowType = true
            this.groupShowType = false
            this.roleShowType = false
            // this.$refs.user.loadUsers();
          } else if (task.performerType === 'candidateGroups') {
            this.groupShowType = true
            this.userShowType = false
            this.roleShowType = false
          } else if (task.performerType === 'candidateRoles') {
            this.groupShowType = false
            this.userShowType = false
            this.roleShowType = true

          }
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.saveTaskPerformer(this.form)
            if (this.groupShowType) {
              this.saveCandidateGroups()
            }
            if (this.userShowType) {
              this.saveCandidateUsers()
            }
            if (this.roleShowType) {
              this.saveCandidateRoles()
            }
            let data = this.$store.state.selectedUsers
            this.task.expression = ''
            this.task.isUseExpression = false
            this.msgSuccess('保存成功！')
          } else {
            return false
          }
        })
      }
    },
    mounted() {
      this.loadPerformer()
    }
  }
</script>
