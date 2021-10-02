<template>
  <div>
    <vxe-toolbar>
      <template v-slot:buttons>
        <el-button @click="insertEvent">新增</el-button>
      </template>
    </vxe-toolbar>
    <el-input v-model="orgId" v-if="showInput"></el-input>
    <el-input v-model="groupId" v-if="showInput"></el-input>
    <el-table :data="tableData" @selection-change="handleSelectionChange" height="200">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="id" width="180" align="center" prop="id"/>
      <el-table-column label="用户组名" width="180" align="center" prop="name"/>
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
      <candidate-group-cfg
        @close="closeDialog"
        :orgId="orgId"
        :taskId="taskId">
      </candidate-group-cfg>
    </el-dialog>


  </div>
</template>
<script>
  import CandidateGroupCfg from './CandidateGroupCfg'
  import { mapState, mapActions, mapGetters } from 'vuex'
  import { queryGroupByIds } from '../../../../api/flow/flowUser'

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
      groupId: {
        type: String,
        default: ''
      }
    },
    components: {
      CandidateGroupCfg
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
      ...mapGetters(['selectedUserGroups'])
    },
    watch: {
      selectedUserGroups: {
        deep: true,
        handler(val, oldVal) {
          const data = val.filter(item => {
            return item.taskId === this.taskId
          })
          this.refreshTableData(data)
        }
      },
      taskId: function() {
        this.loadGroups()
      }
    },
    methods: {
      ...mapActions(['delSelectedUserGroups', 'initSelectedUserGroups','addSelectedUserGroups']),
      refreshTableData(val) {
        this.tableData = val
      },
      loadGroups() {
        let candidateGroups = this.$store.state.selectedTask.candidateGroups
        if (this.groupId) {
          const data = {
            ids: this.groupId
          }
          queryGroupByIds(data).then(response => {
            let data = []
            for (let i = 0; i < response.data.length; i++) {
              let group = response.data[i]
              if (!group) {
                continue
              }
              data.push({
                id: group.id,
                name: group.name,
                taskId: this.taskId
              })
            }
            this.tableData = response.data
            this.addSelectedUserGroups(data)
          })
        } else {
          this.tableData = candidateGroups.data.filter(item => {
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
        this.delSelectedUserGroups(row)
      },
      closeDialog() {
        this.dialogVisible = false
      }
    },
    mounted() {
      this.loadGroups()
    }
  }
</script>
