<template>
  <div class="app-container">
    <div class="height100">
      <el-row>
        <!--左树-->
        <el-col :span="4" :xs="24">
          <div class="height100 bdr" style="overflow-x:auto">
            <TreeEx
              :queryParams="treeSet.queryParams"
              :serviceMethods="treeSet.serviceMethods"
              :extraParams="treeSet.extraParams"
              :menuTitle="treeSet.menuTitle"
              @clickMethod="refreshTab"
            ></TreeEx>
          </div>
        </el-col>
        <!--右列表-->
        <el-col :span="20" :xs="24">
          <el-tabs v-model="activeTab" @tab-click="tabChange">
            <el-tab-pane label="基本数据" name="baseInfo">
              <OrgDetail :id="currentId" />
            </el-tab-pane>
            <el-tab-pane label="岗位管理" name="positionManager">
              <OrgPosition :orgId="currentId" />
            </el-tab-pane>
            <el-tab-pane label="人员列表" name="userList">
              <OrgUser :orgId="currentId" />
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import OrgDetail from "@/views/system/org/orgManager/detail";
import OrgPosition from "@/views/system/org/position/index";
import OrgUser from "@/views/system/org/user/index";
import TreeEx from "@/components/common/TreeEx/index";

export default {
  name: "OrgManager",
  components: { TreeEx, OrgDetail, OrgPosition, OrgUser },
  data() {
    return {
      // 遮罩层
      loading: false,
      activeTab: "baseInfo",
      currentId: undefined,
      treeSet: {
        serviceMethods: {
          queryMethod: "/orgDutyAction-getTreeData.do",
          deleteMethod: "/orgOrgAction-del.do?id=",
          nameKey: "text",
          addPage: "org/orgManager/input",
          updatePage: "org/orgManager/input",
        },
        queryParams: {
          type: this.$route.query.type,
        },
        menuTitle: {
          topNodeTitle: "新增一级机构",
          addNodeTitle: "新增子机构",
          updNodeTitle: "编辑当前机构",
          delNodeTitle: "删除当前机构",
        },
        extraParams: {
          multiOrgType: this.$route.query.type,
        },
      },
    };
  },
  watch: {},
  created() {},
  methods: {
    tabChange(t) {},
    /** 查询列表 */
    refreshTab(currentId) {
      this.currentId = undefined;
      this.currentId = currentId;
    },
  },
};
</script>

