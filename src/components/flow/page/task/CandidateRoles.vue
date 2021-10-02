<template>
  <div>
    <vxe-toolbar>
      <template v-slot:buttons>
        <el-button @click="insertEvent">新增</el-button>
      </template>
    </vxe-toolbar>
    <el-input v-model="orgId" v-if="showInput"></el-input>
    <el-input v-model="roleId" v-if="showInput"></el-input>
    <el-table :data="tableData" @selection-change="handleSelectionChange" height="200">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="id" width="180" align="center" prop="id"/>
      <el-table-column label="角色名" width="180" align="center" prop="name"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="removeRowEvent(scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      append-to-body>
      <template slot="title">
        <i class="el-icon-setting"></i>{{dialogTitle}}
      </template>
      <candidate-role-cfg
        @close="closeDialog"
        :orgId="orgId"
        :taskId="taskId">
      </candidate-role-cfg>
    </el-dialog>


  </div>
</template>
<script>
  import CandidateRoleCfg from './CandidateRoleCfg'
  import { mapState, mapActions, mapGetters } from 'vuex'
  import { queryRoleByIds } from '../../../../api/flow/flowUser'

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
      roleId: {
        type: String,
        default: ''
      }
    },
    components: {
      CandidateRoleCfg
    },
    data() {
      return {
        tableData: [],
        dialogVisible: false,
        dialogTitle: '添加用户组',
        showInput: false
      }
    },
    computed: {
      ...mapGetters(['selectedUserRoles'])
    },
    watch: {
      selectedUserRoles: {
        deep: true,
        handler(val, oldVal) {
          debugger
          const data = val.filter(item => {
            return item.taskId === this.taskId
          })
          this.refreshTableData(data)
        }
      },
      taskId: function() {
        this.loadRoles()
      }
    },
    methods: {
      ...mapActions(['delSelectedUserRoles', 'initSelectedUserRoles','addSelectedUserRoles']),
      refreshTableData(val) {
        this.tableData = val
      },
      loadRoles() {
        debugger
        let candidateRoles = this.$store.state.selectedTask.candidateRoles
        if (this.roleId) {
          const data = {
            ids: this.roleId
          }
          queryRoleByIds(data).then(response => {
            let data = []
            for (let i = 0; i < response.data.length; i++) {
              let role = response.data[i]
              if (!role) {
                continue
              }
              data.push({
                id: role.id,
                name: role.name,
                taskId: this.taskId
              })
            }
            this.tableData = response.data
            this.addSelectedUserRoles(data)
          })
        } else {
          this.tableData = candidateRoles.data.filter(item => {
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
      removeRowEvent(row) {
        this.tableData.splice(row, 1)
        this.delSelectedUserRoles(row)
      },
      closeDialog() {
        this.dialogVisible = false
      }
    },
    mounted() {
      this.loadRoles()
    }
  }
</script>
