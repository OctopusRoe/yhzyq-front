<template>
  <el-dialog :title="title" :visible.sync="taskShow" width="50%" :key="updateKey" append-to-body>
    <el-row>
      <el-col :span="24">
        <el-tabs type="border-card" v-model="tabActiveName">
          <el-tab-pane label="常规" name="general">
            <task-general :form="form"></task-general>
          </el-tab-pane>
          <el-tab-pane label="执行人" name="performer">
            <task-performer :orgId="orgId" :task="task"></task-performer>
          </el-tab-pane>
          <el-tab-pane label="前置拦截器" name="proposeInterceptor">
            <task-propose-interceptor :taskId="task.id" :taskProposeInterceptor="task.taskProposeInterceptor"></task-propose-interceptor>
          </el-tab-pane>
          <el-tab-pane label="后置拦截器" name="postPositionInterceptor">
            <task-post-position-interceptor :taskId="task.id" :taskPostPositionInterceptor="task.taskPostPositionInterceptor"></task-post-position-interceptor>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
  import TaskGeneral from './TaskGeneral'
  import TaskPerformer from './UserTaskPerformer'
  import TaskForm from './TaskForm'
  import TaskListener from './TaskListener'
  import ExecutionListener from './ExecutionListener'
  import TaskMultiInstance from './TaskMultiInstance'
  import TaskProposeInterceptor from './TaskProposeInterceptor'
  import TaskPostPositionInterceptor from './TaskPostPositionInterceptor'

  export default {
    data() {
      return {
        updateKey: '',
        orgId: '',
        title: 'user task属性',
        taskShow: false,
        tabActiveName: 'general',
        task: '',
        form: {
          id: '',
          name: '',
          asynchronous: false,
          exclusive: true
        }
      }
    },
    components: {
      TaskGeneral,
      TaskPerformer,
      TaskForm,
      TaskListener,
      ExecutionListener,
      TaskMultiInstance,
      TaskProposeInterceptor,
      TaskPostPositionInterceptor
    },
    methods: {
      showModal(task, orgId) {
        debugger
        this.taskShow = true
        this.form = { id: task.id, name: task.name, asynchronous: task.asynchronous, exclusive: task.exclusive }
        this.orgId = orgId
        this.task=task
      }
    },
    watch: {
      taskShow() {
        if (this.taskShow) {
          this.tabActiveName = 'general'
          this.updateKey = Math.random()
        } else {
          this.updateKey = ''
        }
      }
    }
  }
</script>
