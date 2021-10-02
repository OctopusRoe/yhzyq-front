<template>
  <div class="app-container" @click="hideMenu">
    
    <div class="head-container">
      <VueMagicTree
        :setting="setting"
        :nodes="nodes"
        style="height: 600px"
        @onCreated="handleCreated"
      />
    </div>
    <!--新增或编辑的弹框-->
    <el-dialog :title="title" :visible.sync="dialogOpen" width="40%">
      <component @cancel="cancel" :is="apps" :id="currentNodeId" :pid="pid"
                 :dicttypeid="queryParams.dicttypeid" :extraParams="extraParams"></component>
    </el-dialog>

    <div id="rMenu" :style="rMenuPosi">
      <ul>
        <li v-show="menuType==1" @click="addTopNode()">{{menuTitle.topNodeTitle}}</li>
        <li v-show="menuType==2" @click="addNode()">{{menuTitle.addNodeTitle}}</li>
        <li v-show="menuType==2" @click="updNode()">{{menuTitle.updNodeTitle}}</li>
        <li v-show="menuType==2" @click="delNode()">{{menuTitle.delNodeTitle}}</li>
      </ul>
    </div>
  </div>
</template>
<script>

  import { delTreeNode, getCommonTypeTree } from '@/api/system/commonType'
  import VueMagicTree from 'vue-magic-tree'

  export default {
    name: 'TreeEx',
    components: { VueMagicTree },
    props: {
      editable: {
        type: Boolean,
        default: true
      },
      serviceMethods: {
        type: Object,
        default: () => {
          return {
            queryMethod: '/xtCommonType-treeData.do',
            deleteMethod: '/xtCommonType-del.do?id=',
            addPage: 'system/commonType/input',
            updatePage: 'system/commonType/input',
            nameKey: 'text',
            childrenKey: 'children',
            pidKey: 'pid'
          }
        }
      },
      queryParams: {
        type: Object,
        default: () => {
          return {
            dicttypeid: 'COMMYPECLASS_CONFIG',
            pid: undefined,
            needDemo: undefined,
            nameAMemoFlag: undefined
          }
        }
      },
      menuTitle: {
        type: Object,
        default: () => {
          return {
            topNodeTitle: '新增一级类型',
            addNodeTitle: '新增子类型',
            updNodeTitle: '编辑当前类型',
            delNodeTitle: '删除当前类型'
          }
        }
      },
      extraParams: {
        type: Object,
        default: () => {
          return {

          }
        }
      }
    },
    data() {
      return {
        // 遮罩层
        loading: false,
        // 弹出层标题
        title: '增加子节点',
        // 是否显示弹出层
        dialogOpen: false,
        // 节点名称
        queryNodeName: undefined,
        // 菜单的类型 1 在最外层空白上 2 在节点上
        menuType: 1,
        apps: {},
        //当前节点id
        currentNodeId: undefined,
        //父级节点id
        pid: undefined,
        rMenuPosi: 'left:0;top:0px',
        setting: {
          callback: {
            beforeRightClick: this.zTreeBeforeRightClick,
            onClick: this.zTreeOnClick
          },
          data: {
            key: {
              name: this.serviceMethods.nameKey,
              children: this.serviceMethods.childrenKey
            }
          }
        },
        nodes: []
      }
    },
    watch: {
      // 根据名称筛选树
      queryNodeName(val) {
        this.$refs.tree.filter(val)
      }
    },

    created() {
      //console.log(this.extraParams)
      this.getTreeData()
    },
    methods: {
      addTopNode() {
        this.dialogOpen = true
        this.title = '新增'
        //动态挂载新增和编辑的组件
        this.apps = (resolve) => require([`@/views/${this.serviceMethods.addPage}`], resolve)
      },
      addNode() {
        this.dialogOpen = true
        this.title = '新增'
        this.pid = this.currentNodeId
        this.currentNodeId = undefined
        //动态挂载新增和编辑的组件
        this.apps = (resolve) => require([`@/views/${this.serviceMethods.addPage}`], resolve)
      },
      updNode() {
        this.dialogOpen = true
        this.title = '编辑'
        //动态挂载新增和编辑的组件
        this.apps = (resolve) => require([`@/views/${this.serviceMethods.updatePage}`], resolve)
      },
      delNode() {
        this.$confirm(
          '是否确认删除该条记录?',
          '警告',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          let fullUrl = this.serviceMethods.deleteMethod + this.currentNodeId
          return delTreeNode(fullUrl)
        }).then((res) => {
          if(res.success){
            this.getTreeData()
            this.msgSuccess('删除成功')
          }else{
           this.msgError(res.msg)
          }
        }).catch(function() {
          this.msgError('删除失败')
        })
      },
      hideMenu() {
        this.rMenuPosi = 'left:0;top:0px;visibility:hidden'
      },
      zTreeBeforeRightClick: function(treeId, treeNode) {
        if (this.editable) {
          if (treeNode == null) {
            this.menuType = 1
            this.pid = undefined
            this.currentNodeId = undefined
          } else {
            this.menuType = 2
            this.currentNodeId = treeNode.id
            this.pid = treeNode.id
          }
          let y = window.event.y - 100
          this.rMenuPosi = 'left:8%;top:' + y + 'px;visibility:visible'
          document.oncontextmenu = function(e) {
            return false
          }
        }
      },
      handleCreated: function(ztreeObj) {
        if(ztreeObj.getNodes().length>0){
          let firstNode = ztreeObj.getNodes()[0]
          // 展开第一个节点
          ztreeObj.expandNode(firstNode, true)
          this.$emit('clickMethod', firstNode.id)
        }
      },

      /** 查询树结构数据 */
      getTreeData() {
        getCommonTypeTree(this.serviceMethods.queryMethod, this.queryParams).then((response) => {
          this.nodes = response
        })
      },
      // 节点单击事件
      zTreeOnClick: function(evt, treeId, treeNode) {
        this.$emit('clickMethod', treeNode.id)
      },
      // 取消按钮
      cancel() {
        this.dialogOpen = false
        this.getTreeData()
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  div#rMenu {
    position: absolute;
    top: 0;
    text-align: left;
    border: 1px solid #d3d3d3;
    background-color: #fff;
    visibility: hidden;

    ul {
      margin: 0;
      padding: 0;
    }
  }

  div#rMenu ul li {
    padding: 0 5px;
    cursor: pointer;
    list-style: none outside none;
    padding: 6px 15px;

    &:hover {
      background-color: #e2e2e2;
      color: #000;
    }
  }
</style>
