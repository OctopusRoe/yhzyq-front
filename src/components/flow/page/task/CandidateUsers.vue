<template>
  <div>
    <vxe-toolbar>
      <!-- <vxe-toolbar setting> -->
      <template v-slot:buttons>
        <el-button @click="insertEvent">新增</el-button>
      </template>
    </vxe-toolbar>
    <el-input v-model="orgId" v-if="showInput"></el-input>
    <el-input v-model="userId" v-if="showInput"></el-input>
    <el-table :data="tableData" @selection-change="handleSelectionChange" height="200">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="id" width="180" align="center" prop="userId"/>
      <el-table-column label="账号" width="180" align="center" prop="sso"/>
      <el-table-column label="名称" width="180" align="center" prop="name"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleDelete(scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      append-to-body
    >
      <template slot="title">
        <i class="el-icon-setting"></i>{{ dialogTitle }}
      </template>
      <candidate-user-cfg
        @close="closeDialog"
        :orgId="orgId"
        :taskId="taskId"
      ></candidate-user-cfg>
    </el-dialog>
  </div>
</template>
<script>
  import CandidateUserCfg from './CandidateUserCfg'
  import { mapState, mapActions, mapGetters } from 'vuex'
  import { queryUserByIds } from '../../../../api/flow/flowUser'

  export default {
    props: {
      orgId: {
        type: String,
        default: ''
      },
      taskId: {
        type: String,
        default: ''
      },
      userId: {
        type: String,
        default: ''
      }
    },
    components: {
      CandidateUserCfg
    },
    data() {
      return {
        tableData: [],
        showInput: false,
        dialogVisible: false,
        dialogTitle: '添加用户'
      }
    },
    computed: {
      ...mapGetters(['selectedUsers'])
    },
    watch: {
      selectedUsers: {
        deep: true,
        handler(val, oldVal) {
          const data = val.filter(item => {
            return item.taskId === this.taskId
          })
          this.refreshTableData(data)
        }
      },
      taskId: function() {
        this.loadUsers()
      }
    },
    mounted() {
      this.loadUsers()
    },
    methods: {
      ...mapActions(['delSelectedUsers', 'initSelectedUsers', 'addSelectedUsers']),
      refreshTableData(val) {
        const data = val.filter(item => {
          return item.taskId === this.taskId
        })
        this.tableData = data
      },
      loadUsers() {
        let candidateUsers = this.$store.state.selectedTask.candidateUsers
        if (this.userId) {
          const data = {
            ids: this.userId
          }
          queryUserByIds(data).then(response => {
            let data = []
            for (let i = 0; i < response.data.length; i++) {
              let user = response.data[i]
              if (!user) {
                continue
              }
              data.push({
                userId: user.userId,
                loginName: user.sso,
                userName: user.name,
                taskId: this.taskId
              })
            }
            this.tableData = response.data
            this.addSelectedUsers(data)
          })
        } else {
          this.tableData = candidateUsers.data.filter(item => {
            return item.taskId === this.taskId
          })
        }
      },
      handleSelectionChange(val) {
        console.log(val)
      },
      insertEvent() {
        this.dialogVisible = true
      },
      handleDelete(index) {
        this.tableData.splice(index, 1)
        this.delSelectedUsers(index)
      },
      closeDialog() {
        this.dialogVisible = false
      }
    }
  }
</script>
