<template>
  <!-- 添加或修改角色配置对话框 -->
  <el-dialog :title="title" :visible.sync="isDrawer" width="500px" append-to-body>
    <el-tree
      ref="role"
      :data="treeData"
      show-checkbox
      node-key="id"
      :default-expand-all="true"
      :props="defaultProps">
    </el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { saveOrgRole, orgTree, getOrgByRoleId } from '@/api/system/org/org'
  import OrganizTree from '@/components/system/OrganizTree'

  export default {
    components: { OrganizTree },
    data() {
      return {
        title: '选择机构',
        checkable: true,
        isDrawer: false,
        roleId: '',
        orgId: [],
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        }
      }
    },
    methods: {
      handlerOrgSelect(data) {
        this.orgIds = data.key
      },
      handlerOrgCheck(data, node) {
        console.log(node)
        if (node === true) {
          this.orgId.push(data.key)
        } else {
          for (let i = 0; i < this.orgId.length; i++) {
            if (data.key === this.orgId[i]) {
              this.orgId.splice(i, 1)
            }
          }
        }
      },
      // 发树形被加载完
      onOrgTreeLoaded(treeData, checkednode) {
      },
      getBeforeLoadOrgData(treeData) {
      },
      filterOrgNode(value, data) {
        if (!value) {
          return true
        }
        return data.label.indexOf(value) !== -1
      },
      handleClose(done) {
        done()
      },
      showModal(data) {
        this.isDrawer = true
        this.roleId = data.id
        let role = {
          roleId: data.id
        }
        let treeData = []
        orgTree().then(response => {
          treeData.push(response.data)
          this.treeData = treeData
          let isCheck = []
          getOrgByRoleId(role).then(response => {
            isCheck = response.data
            this.$refs.role.setCheckedKeys(isCheck, true)
          })
        })
      },
      //提交按钮
      submitForm: function() {
        debugger
        let ids = this.$refs.role.getCheckedKeys()
        let roleId = this.roleId
        let orgIds = ids.join(',')
        let data = {
          roleId: roleId,
          orgId: orgIds
        }
        console.log(data)
        saveOrgRole(data).then(response => {
          if (response.rtnCode === 200) {
            this.msgSuccess('修改成功')
            this.isDrawer = false
            this.getList()
          }
        })
      },
      // 取消按钮
      cancel() {
        this.isDrawer = false
        this.reset()
      },
      setMenuIdList(menu, checkedMenuIds) {
        //判断是否根节点
        if (menu.checked === true) {
          checkedMenuIds.push(menu.id)
          //遍历子节点
          for (let x = 0; x < menu.children.length; x++) {
            let childrenNode = menu.children[x] //取出子节点
            this.setMenuIdList(childrenNode, checkedMenuIds)
            // //非根节点就行
            // if(childrenNode.parentId !=0 && childrenNode.checked ===true ){
            //   checkedMenuIds.push(childrenNode.id);
            // }
          }
        }
      }
    }
  }
</script>

<style></style>
