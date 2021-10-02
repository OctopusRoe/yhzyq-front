<template>
  <!-- 添加或修改角色配置对话框 -->
  <el-dialog
    :title="title"
    :visible.sync="isDrawer"
    width="500px"
    append-to-body
    top='100px'
    class="dialog-common"
    :modal-append-to-body="false"
    @close="close"
  >
  <div style="overflow-x: hidden; overflow-y: auto; height:650px">
    <el-form ref="form" :model="form" :inline="true" label-width="80px">
      <el-form-item label="菜单权限">
        <el-checkbox
          v-model="menuExpand"
          @change="handleCheckedTreeExpand($event, 'menu')"
          >展开/折叠</el-checkbox
        >
        <el-checkbox
          v-model="menuNodeAll"
          @change="handleCheckedTreeNodeAll($event, 'menu')"
          >全选/全不选</el-checkbox
        >
        <el-checkbox
          v-model="form.menuCheckStrictly"
          @change="handleCheckedTreeConnect($event, 'menu')"
          >父子联动</el-checkbox
        >
        <el-tree
          class="tree-border"
          :data="menuOptions"
          show-checkbox
          ref="menu"
          node-key="id"
          :check-strictly="!form.menuCheckStrictly"
          empty-text="加载中，请稍后"
          :props="defaultProps"
          @check="handlerOrganizSelect"
          style="width: 320px"
        ></el-tree>
      </el-form-item>
      
    </el-form>
  </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { queryResourceTree, saveUserResource } from "@/api/system/role";
import XEUtils from "xe-utils";
export default {
  data() {
    return {
      dataList: [],
      test: "",
      loginName: "",
      isDrawer: false,
      direction: "rtl",
      authorize: false,
      menuExpand: false,
      menuNodeAll: false,
      title: "资源查看",
      // 菜单列表
      menuOptions: [],
      resourceCheckedKey: [],
      // 表单参数
      form: {},
      defaultProps: {
        children: "children",
        label: "name",
        id: "id",
      },
      req: {
        userId: "",
        resourceIds: [],
      },
    };
  },
  // created() {
  //   this.getMenuTreeSelect();
  // },

  methods: {
    close(){
      this.dataList=[];
    },
    //时间戳转换
    formatDate({ cellValue }) {
      return XEUtils.toDateString(cellValue, "yyyy-MM-dd HH:mm:ss");
    },
    handleClose(done) {
      done();
    },
    showModal(userId, loginName) {
      this.test = userId;
      this.loginName = loginName;
      this.isDrawer = true;
      this.getMenuTreeSelect(userId);
    },
    handlerOrganizSelect(data) {
      this.dataList.push({
        name: data.name,
        state: "禁止",
        createTime: new Date(),
        createUser: 'admin',
      });
      debugger;
    },
    /** 查询菜单树结构 */
    getMenuTreeSelect(userId) {
      const data = {
        objectId: userId,
        type: "user",
      };
      queryResourceTree(data).then((response) => {
        this.menuOptions = response.data;
        debugger
        //勾选节点
        this.$nextTick(() => {
          this.getRoleMenu(response.data);
        });
      });
    },
    //勾选节点
    getRoleMenu(menuList) {
      let checkedMenuIds = [];
      if (menuList != null && menuList.length > 0) {
        for (let i = 0; i < menuList.length; i++) {
          let menu = menuList[i]; //当个节点
          //判断是否根节点
          if (menu.checked === true) {
            checkedMenuIds.push(menu.id);
            //遍历子节点
            for (let x = 0; x < menu.children.length; x++) {
              let childrenNode = menu.children[x]; //取出子节点
              //非根节点就行
              if (childrenNode.parentId != 0 && childrenNode.checked === true) {
                checkedMenuIds.push(childrenNode.id);
              }
            }
          }
        }
      }
      this.$refs.menu.setCheckedKeys(checkedMenuIds);
    },
    // 树权限（展开/折叠）
    handleCheckedTreeExpand(value, type) {
      if (type == "menu") {
        let treeList = this.menuOptions;
        for (let i = 0; i < treeList.length; i++) {
          this.$refs.menu.store.nodesMap[treeList[i].id].expanded = value;
        }
      } else if (type == "dept") {
        let treeList = this.deptOptions;
        for (let i = 0; i < treeList.length; i++) {
          this.$refs.dept.store.nodesMap[treeList[i].id].expanded = value;
        }
      }
    },
    // 树权限（全选/全不选）
    handleCheckedTreeNodeAll(value, type) {
      if (type == "menu") {
        this.$refs.menu.setCheckedNodes(value ? this.menuOptions : []);
      } else if (type == "dept") {
        this.$refs.dept.setCheckedNodes(value ? this.deptOptions : []);
      }
    },
    // 树权限（父子联动）
    handleCheckedTreeConnect(value, type) {
      if (type == "menu") {
        this.form.menuCheckStrictly = value ? true : false;
      } else if (type == "dept") {
        this.form.deptCheckStrictly = value ? true : false;
      }
    },
    // 所有菜单节点数据
    getMenuAllCheckedKeys() {
      // 目前被选中的菜单节点
      let checkedKeys = this.$refs.menu.getHalfCheckedKeys();
      // 半选中的菜单节点
      let halfCheckedKeys = this.$refs.menu.getCheckedKeys();
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      return checkedKeys;
    },
    //提交按钮
    submitForm: function () {
      let userId = this.test;
      this.form.menuIds = this.getMenuAllCheckedKeys();
      this.$set(this.req, "userId", userId);
      this.$set(this.req, "resourceIds", this.form.menuIds.join(","));
      saveUserResource(this.req).then((response) => {
        if (response.rtnCode === 200) {
          this.msgSuccess("修改成功");
          this.isDrawer = false;
          this.dataList=[];
        }
      });
    },

    // 取消按钮
    cancel() {
      this.isDrawer = false;
      this.dataList=[];
    },
  },
};
</script>

<style></style>
