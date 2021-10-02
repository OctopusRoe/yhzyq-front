<template>
  <el-row>
    <el-col :span="24">
      <vxe-toolbar setting>
        <template v-slot:buttons>
          <el-button @click="saveGroup">保存</el-button>
        </template>
      </vxe-toolbar>
      <el-input v-model="orgId" v-if="showInput"></el-input>
      <!--      <vxe-table ref="xTable" class="vxe-table-element" border auto-resize show-overflow :loading="loading" :data.sync="tableData">-->
      <!--        <vxe-table-column type="selection" width="50"></vxe-table-column>-->
      <!--        <vxe-table-column type="index" width="50"></vxe-table-column>-->
      <!--        <vxe-table-column field="id" title="ID"></vxe-table-column>-->
      <!--        <vxe-table-column field="groupName" title="名称"></vxe-table-column>-->
      <!--      </vxe-table>-->
      <div class="dTableWrap">
        <el-table ref="xTable" :data="tableData" @selection-change="tableCheckChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="id" prop="id"/>
          <el-table-column label="名称" prop="name"/>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="tablePage.totalResult"
                       @current-change="pageChange">
        </el-pagination>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import Message from '../../common/Message'
  import { queryUserGroup } from '../../../../api/flow/flowUser'

  export default {
    props: {
      orgId: {
        type: String,
        default: ''
      },
      taskId: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        loading: false,
        tableData: [],
        showInput: false,
        tablePage: {
          currentPage: 1,
          pageSize: 10,
          totalResult: 0
        }
      }
    },
    computed: {
      ...mapGetters('http', ['userGroups'])
    },
    watch: {
      userGroups: {
        deep: true,
        handler(val, oldVal) {
          this.loadGroupsTable()
        }
      }
    },
    methods: {
      ...mapActions('http', ['loadUserGroups', 'getUserGroups']),
      ...mapActions(['addSelectedUserGroups']),
      loadGroupsTable() {
        let userGroups = this.$store.state.http.userGroups
        let tableData = []
        userGroups.forEach(e => {
          let group = { groupId: e.id, groupName: e.name }
          tableData.push(group)
        })
        this.tableData = tableData
      },
      tableCheckChange(selectedList) {
        this.rows = selectedList
      },
      pageChange(p) {
        this.tablePage.currentPage = p
        this.query()
      },
      saveGroup() {
        this.rows.forEach(item=>{
          item.taskId = this.taskId
        })
        this.addSelectedUserGroups(this.rows)
        this.$emit('close')
      },
      getGroupList(currentPage, pageSize) {
        const data = {
          pageNumber: currentPage,
          pageSize: pageSize
        }
        queryUserGroup(data)
          .then(response => {
            this.tableData = response.rows
            this.tablePage.totalResult = response.total
          })
          .catch(error => {
            console.error('获取用户异常', error)
            this.loading = false
          })
      }
    },
    mounted() {
      let currentPage = this.tablePage.currentPage
      let pageSize = this.tablePage.pageSize
      this.getGroupList(currentPage, pageSize)
    }
  }
</script>
