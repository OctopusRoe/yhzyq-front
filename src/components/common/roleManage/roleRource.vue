<template>
  <div style="display: inline-block; margin: 0 5px">
    <el-button
      icon="el-icon-s-data"
      type="primary"
      size="small"
      @click="showDialog"
    ></el-button>
    <el-dialog
      title="角色资源管理"
      :visible="dialogFlag"
      width="20%"
      @close="dialogFlag = false"
      :append-to-body="true"
    >
      <div style="padding-left: 10%">
        <div style="text-align: center; height: 300px; overflow-y: auto">
          <VueMagicTree :setting="msgTreeSetting" :nodes="msgTreeNodes"  ref="prohibitedTree"/>
        </div>
        <div style="text-align: center; margin-top: 20px">
          <el-button type="primary" @click="save">提交</el-button>
          <el-button type="info" @click="dialogFlag = false">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getStationListService, getRoleRource,saveRoleRourceService } from "@/api/authmanage/role";
import VueMagicTree from "vue-magic-tree";
export default {
  name: "roleRource",
  components: {
    VueMagicTree,
  },
  data() {
    return {
      dialogFlag: false,
      msgTreeSetting: {
        callback: {
          onClick: this.treeClick,
        },
        data: {
          key: {
            name: "text",
            checked: "checked",
          },
          simpleData: {
            enable: true,
          },
        },
        check: {
          enable: true,
          chkStyle: "checkbox",
          chkboxType: { Y: "p", N: "s" },
          nocheckInherit: true,
        },
        view: {
          showLine: true,
          showIcon: false,
        },
      },
      msgTreeNodes: [],
      checkConfirmParams:{roleid:""}
    };
  },
  props: ["scope"],
  methods: {
    showDialog() {
      this.dialogFlag = true;
      this.checkConfirmParams.roleid=this.scope.row.id;
      getRoleRource({ roleid: this.scope.row.id }).then((response) => {
        console.log(response);
        this.msgTreeNodes = response;
      });
    },
    save() {
      const checkedList = this.$refs.prohibitedTree.ztreeObj.getCheckedNodes(
        true
      );

      this.checkConfirmParams.arr1 = "";
      for (let i = 0; i < checkedList.length; i++) {
        if (i == checkedList.length - 1)
          this.checkConfirmParams.arr1 += checkedList[i].id;
        else this.checkConfirmParams.arr1 += checkedList[i].id + ",";
      }
      saveRoleRourceService(this.checkConfirmParams).then((response) => {
        if (response.success) {
          this.$message("保存成功");
        } else {
          this.$message("保存失败");
        }
      });
    },
  },
};
</script>
<style lang="scss">
</style>
