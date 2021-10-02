<template>
  <el-row>
    <el-col :span="24">
      <vxe-toolbar setting>
        <template v-slot:buttons>
          <el-button @click="saveGroup">保存</el-button>
        </template>
      </vxe-toolbar>
      <el-input v-model="orgId" v-if="showInput"></el-input>
      <div class="dTableWrap">
        <el-table ref="xTable" :data="tableData" @selection-change="tableCheckChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="id" prop="id"/>
          <el-table-column label="角色类型" prop="roleType"/>
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
  import { queryUserRole } from '../../../../api/flow/flowUser'

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
      // ...mapGetters('http', ['userRoles'])
    },
    watch: {
      userRoles: {
        deep: true,
        handler(val, oldVal) {
          this.loadRolesTable()
        }
      }
    },
    methods: {
      ...mapActions(['addSelectedUserRoles']),
      loadRolesTable() {
        let userRoles = this.$store.state.http.userRoles
        let tableData = []
        userRoles.forEach(e => {
          let role = { id: e.id, name: e.name }
          tableData.push(role)
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
        this.rows.forEach(item => {
          item.taskId = this.taskId
        })
        this.addSelectedUserRoles(this.rows)
        this.$emit('close')
      },
      getRoleList(currentPage, pageSize) {
        const data = {
          pageNo: currentPage,
          pageSize: pageSize,
          orgId: this.orgId
        }
        queryUserRole(data)
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
      this.getRoleList(currentPage, pageSize)
    }
  }
</script>
