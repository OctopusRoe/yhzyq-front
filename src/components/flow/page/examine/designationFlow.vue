<template>
  <!-- 添加或修改角色配置对话框 -->
  <el-dialog :title="title" :visible.sync="isDrawer" width="500px" :close-on-click-modal="false" :show-close="false" append-to-body>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="菜单权限">
        <el-tree
          class="tree-border"
          :data="orgOptions"
          show-checkbox
          :default-expand-all="true"
          ref="org"
          node-key="id"
          :check-strictly="true"
          empty-text="加载中，请稍后"
          :props="defaultProps"
          @node-click="handleNodeClick"
          @check-change="checkChange"
        ></el-tree>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align: center ">
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { getOrgTree } from '@/api/system/org/org'
  import { copyFlow } from '@/api/flow/flowManage'

  export default {
    data() {
      return {
        isDrawer: false,
        checkable: true,
        title: '选择机构',
        orgType: '',
        oldOrgId: '',
        flowIds: '',
        orgId: '',
        orgExpand: false,
        orgNodeAll: false,
        // 菜单列表
        orgOptions: [],
        // 表单参数
        form: {},
        defaultProps: {
          children: 'children',
          label: 'name',
          id: 'id'
        }
      }
    },
    // created() {
    //     this.getMenuTreeSelect();
    //   },
    methods: {
      showModal(orgId, allType, orgType, flowIds) {
        this.oldOrgId = orgId
        this.flowIds = flowIds
        this.isDrawer = true
        getOrgTree({
          typeAndLevel: allType,
          parentCode: ''
        }).then(res => {
          this.orgOptions.push(res.data)
        })
      },
      handleNodeClick(item, node, self) { //自己定义的editCheckId，防止单选出现混乱
        this.editCheckId = item.id
        this.$refs.org.setCheckedKeys([item.id])
      },
      checkChange(item, node, self) {
        if (node == true) {
          this.editCheckId = item.id
          this.$refs.org.setCheckedKeys([item.id])
        } else {
          if (this.editCheckId == item.id) {
            this.$refs.org.setCheckedKeys([item.id])
          }
        }
      },
      submitForm() {
        let orgIds=this. getMenuAllCheckedKeys();
        let data = {
          oldOrgId: this.oldOrgId,
          flowIds: this.flowIds,
          orgIds:orgIds.join(",")
        }
        copyFlow(data).then({

        })
      },
      cancel() {
        this.orgOptions = []
        this.isDrawer = false
      },

      // 树权限（全选/全不选）
      handleCheckedTreeNodeAll(value, type) {
        if (type == 'org') {
          this.$refs.org.setCheckedNodes(value ? this.orgOptions : [])
        } else if (type == 'dept') {
          this.$refs.dept.setCheckedNodes(value ? this.deptOptions : [])
        }
      },
      // 所有菜单节点数据
      getMenuAllCheckedKeys() {
        // 目前被选中的菜单节点
        // let checkedKeys = this.$refs.org.getHalfCheckedKeys()
        // // 半选中的菜单节点
        let halfCheckedKeys = this.$refs.org.getCheckedKeys()
        // checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys)
        console.log(halfCheckedKeys)
        return halfCheckedKeys
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-tree-node {
    .is-leaf + .el-checkbox .el-checkbox__inner {
      display: inline-block;
    }

    .el-checkbox__input > .el-checkbox__inner {
      display: none;
    }
  }
</style>
