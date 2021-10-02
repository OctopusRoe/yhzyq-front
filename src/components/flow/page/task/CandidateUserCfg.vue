<template>
  <el-row>
    <el-col :span="24">
      <vxe-toolbar>
        <template v-slot:buttons>
          <el-button @click="saveUser">保存</el-button>
        </template>
      </vxe-toolbar>
      <el-input v-model="orgId" v-if="showInput"></el-input>
      <div class="dTableWrap">
        <el-table ref="xTable" :data="tableData" @selection-change="tableCheckChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="id" prop="userId"/>
          <el-table-column label="登录名" prop="loginName"/>
          <el-table-column label="用户名" prop="userName"/>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="tablePage.totalResult" @current-change="pageChange">
        </el-pagination>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import Message from '../../common/Message'
  import { queryUser } from '../../../../api/flow/flowUser'

  export default {
    props: {
      orgId: {
        type: String,
        default: ''
      },
      taskId:{
        type: String,
        default: ''
      }
    },
    data() {
      return {
        showInput: false,
        loading: false,
        rows:[],
        tableData: [
          // { userId: 10001, loginName: 'Test1', userName: 'Develop1' },
          // { userId: 10002, loginName: 'Test2', userName: 'Develop2'},
          // { userId: 10003, loginName: 'Test3', userName: 'Develop3' },
          // { userId: 10004, loginName: 'Test4', userName: 'Develop4' }
        ],
        tablePage: {
          currentPage: 1,
          pageSize: 10,
          totalResult: 0
        }
      }
    },
    computed: {
      ...mapGetters('http', ['users'])
    },
    watch: {
      users: {
        deep: true,
        handler(val, oldVal) {
          this.loadUsersTable()
        }
      }
    },
    methods: {
      ...mapActions(['addSelectedUsers']),
      loadUsersTable() {
        let users = this.$store.state.http.users
        let tableData = []
        users.forEach(e => {
          tableData.push(e)
        })
        this.tableData = tableData
      },
      tableCheckChange(selectedList) {
        this.rows=selectedList;
      },
      pageChange(p){
        this.tablePage.currentPage=p;
        this.query();
      },
      saveUser() {
        this.rows.forEach(item=>{
          item.taskId = this.taskId
        })
        this.addSelectedUsers(this.rows)
        this.$emit('close')
      },
      handlePageChange({ currentPage, pageSize }) {
        this.tablePage.currentPage = currentPage
        this.tablePage.pageSize = pageSize
        this.getUserList(currentPage, pageSize)
      },
      getUserList(currentPage, pageSize) {
        const data = {
          pageNo: currentPage,
          pageSize: pageSize,
          orgId: this.orgId
        }
        queryUser(data)
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
      this.getUserList(currentPage, pageSize)
    }
  }
</script>
