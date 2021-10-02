<template>
  <div style="display: inline-block; margin: 0 5px">
    <el-button
      icon="el-icon-s-ticket"
      type="primary"
      size="small"
      @click="showDialog"
    ></el-button>
    <el-dialog
      title="角色岗位管理"
      :visible="dialogFlag"
      width="60%"
      @close="dialogFlag = false"
     :append-to-body="true"
    >
      <el-form :model="queryParams" ref="queryForm" :inline="true">
        <el-form-item label="岗位名称">
          <el-input
            v-model="queryParams.name"
            placeholder="岗位名称"
            clearable
            size="small"
            style="width: 190px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="cyan" icon="el-icon-search" size="mini" @click="query"
            >搜索</el-button
          >
          <el-button
            icon="el-icon-refresh"
            size="mini"
            @click="queryParams.name = ''"
            >重置</el-button
          >
          <el-button icon="el-icon-refresh" size="mini" @click="del"
            >删除</el-button
          >
          <el-button
            icon="el-icon-plus"
            size="mini"
            type="primary"
            @click="showDialog1"
            >角色选择岗位</el-button
          >
        </el-form-item>
      </el-form>
      <div class="dTableWrap">
        <el-table :data="tableData" @selection-change="checkChange">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="岗位名称" prop="name" />
          <el-table-column label="岗位编码" prop="posLib" />
        </el-table>
      </div>
    </el-dialog>
    <el-dialog
      title="角色选择岗位"
      :visible="dialogFlag1"
      width="60%"
      height="360"
      @close="dialogFlag1 = false"
     :append-to-body="true"
    >
      <div class="gwWrap">
        <el-row>
          <el-col :span="6">
            <el-tabs v-model="tabActive" @tab-click="tabClick">
              <el-tab-pane
                :key="item.name"
                v-for="item in tabList"
                :label="item.name"
                :name="item.id"
              >
                <div style="height: 100%">
                  <VueMagicTree
                    :setting="msgTreeSetting"
                    :nodes="msgTreeNodes"
                    v-loading="loading"
                  />
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col :span="18">
            <div>
              <el-table
                :data="rightTableData"
                @selection-change="rightheckChange"
              >
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column label="岗位名称" prop="text" />
                <el-table-column label="岗位编码" prop="posLib" />
              </el-table>
            </div>
            <div style="text-align: center; padding: 10px 0">
              <el-button type="primary" @click="rightConfirm">提交</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import VueMagicTree from "vue-magic-tree";
import {
  getRoleStationService,
  delRoleStationService,
  getTablist,
  getOrgService,
  getOrgServiceById,
  savePosByid,
} from "@/api/authmanage/role";
export default {
  name: "roleUcGroupManage",
  components: {
    VueMagicTree,
  },
  data() {
    return {
      dialogFlag: false,
      dialogFlag1: false,
      loading: false,
      tabActive: "",
      queryParams: {
        pageNumber: 1,
        pageSize: 10,
        name: "",
        roleid: "",
      },
      tableData: [],
      total: 0,
      delParams: {},
      confirmParams: {},
      tabList: [],
      getOrgParams: {},
      msgTreeSetting: {
        callback: {
          onClick: this.treeClick,
        },
        data: {
          key: {
            name: "text",
          },
          simpleData: {
            enable: true,
          },
        },
        view: {
          showLine: true,
          showIcon: false,
        },
      },
      msgTreeNodes: [],
      rightTableData: [],
    };
  },
  props: ["scope"],
  methods: {
    showDialog() {
      this.dialogFlag = true;
      this.queryParams.roleid = this.scope.row.id;
      this.delParams.roleid = this.scope.row.id;
      this.confirmParams.roleId = this.scope.row.id;
      getRoleStationService(this.queryParams).then((respone) => {
        this.total = respone.total;
        this.tableData = respone.rows;
      });
    },
    showDialog1() {
      this.dialogFlag1 = true;
      this.loading = true;
      getTablist().then((respone) => {
        console.log(respone);
        this.tabList = respone;
        this.tabActive = respone[0]["id"];
        this.getOrgParams.multiOrgType = this.tabActive;

        getOrgService(this.getOrgParams).then((respone) => {
          console.log(respone);
          this.loading = false;
          this.msgTreeNodes = respone;
        });
      });
    },
    del() {
      delRoleStationService(this.delParams).then((respone) => {
        if (respone.success) {
          this.$message("删除成功");
          getRoleStationService(this.queryParams).then((respone) => {
            this.total = respone.total;
            this.tableData = respone.rows;
          });
        } else {
          this.$message("删除失败");
        }
      });
    },
    tabClick(val) {
      console.log(val);
      this.tabActive = val.name;
      this.loading = true;
      this.getOrgParams.multiOrgType = this.tabActive;
      getOrgService(this.getOrgParams).then((respone) => {
        console.log(respone);
        this.msgTreeNodes = respone;
        this.loading = false;
      });
    },
    checkChange(selectedList) {
      this.delParams.str = "";
      for (let i = 0; i < selectedList.length; i++) {
        if (i == selectedList.length - 1)
          this.delParams.str += selectedList[i].id;
        else this.delParams.str += selectedList[i].id + ",";
      }
    },
    treeClick(p, c, d) {
      getOrgServiceById({ org: d.id }).then((respone) => {
        this.rightTableData = respone;
      });
    },
    rightheckChange(selectedList) {
      this.confirmParams.ids = "";
      for (let i = 0; i < selectedList.length; i++) {
        if (i == selectedList.length - 1)
          this.confirmParams.ids += selectedList[i].id;
        else this.confirmParams.ids += selectedList[i].id + ",";
      }
    },
    query(){
      getRoleStationService(this.queryParams).then((respone) => {
            this.total = respone.total;
            this.tableData = respone.rows;
          });
    },
    rightConfirm() {
      savePosByid(this.confirmParams).then((respone) => {
        if (respone.success) {
          this.$message("保存成功");
          this.rightTableData = [];
          this.dialogFlag1 = false;
          getRoleStationService(this.queryParams).then((respone) => {
            this.total = respone.total;
            this.tableData = respone.rows;
          });
        } else {
          this.$message("保存失败");
        }
      });
    },
  },
};
</script>
<style lang="scss">
.el-pagination {
  padding-top: 10px;
}

.el-col {
  height: 100%;
}
.file_ico_docu {
  margin-right: 2px;
  background: url(../../assets/image/ycTreeFile.png) no-repeat scroll center
    center transparent;
  background-size: 100% 100%;
  vertical-align: top;
  *vertical-align: middle;
  width: 16px !important;
  height: 32px !important;
  display: inline-block !important;
}
.ico_docu {
  margin-right: 2px;
  background: url(../../assets/image/ycTreeFile.png) no-repeat scroll center
    center transparent;
  background-size: 100% 100%;
  vertical-align: top;
  *vertical-align: middle;
  width: 16px !important;
  height: 32px !important;
  display: inline-block !important;
}

.button.roots_close {
  background: url(../../assets/image/ycTreeFolder.png) no-repeat scroll center
    center transparent;
  background-size: 100% 100%;
  vertical-align: top;
  *vertical-align: middle;
  width: 16px !important;
  height: 32px !important;
  &:before {
    content: "" !important;
    display: none !important;
  }
}
.button.roots_open {
  background: url(../../assets/image/ycTreeFolderOpen.png) no-repeat scroll
    center center transparent;
  background-size: 100% 100%;
  vertical-align: top;
  *vertical-align: middle;
  width: 16px !important;
  height: 32px !important;
  &:before {
    content: "" !important;
    display: none !important;
  }
}
.button.center_close {
  background: url(../../assets/image/ycTreeFolder.png) no-repeat scroll center
    center transparent;
  background-size: 100% 100%;
  vertical-align: top;
  *vertical-align: middle;
  width: 16px !important;
  height: 32px !important;
  &:before {
    content: "" !important;
    display: none !important;
  }
}
.button.center_open {
  background: url(../../assets/image/ycTreeFolderOpen.png) no-repeat scroll
    center center transparent;
  background-size: 100% 100%;
  vertical-align: top;
  *vertical-align: middle;
  width: 16px !important;
  height: 32px !important;
  &:before {
    content: "" !important;
    display: none !important;
  }
}
.button.bottom_open {
  background: url(../../assets/image/ycTreeFolderOpen.png) no-repeat scroll
    center center transparent;
  background-size: 100% 100%;
  vertical-align: top;
  *vertical-align: middle;
  width: 16px !important;
  height: 32px !important;
  &:before {
    content: "" !important;
    display: none !important;
  }
}
.button.bottom_close {
  background: url(../../assets/image/ycTreeFolder.png) no-repeat scroll center
    center transparent;
  background-size: 100% 100%;
  vertical-align: top;
  *vertical-align: middle;
  width: 16px !important;
  height: 32px !important;
  &:before {
    content: "" !important;
    display: none !important;
  }
}
.button.root_open {
  background: url(../../assets/image/ycTreeFolderOpen.png) no-repeat scroll
    center center transparent;
  background-size: 100% 100%;
  vertical-align: top;
  *vertical-align: middle;
  width: 16px !important;
  height: 32px !important;
  &:before {
    content: "" !important;
    display: none !important;
  }
}
.button.root_close {
  background: url(../../assets/image/ycTreeFolder.png) no-repeat scroll center
    center transparent;
  background-size: 100% 100%;
  vertical-align: top;
  *vertical-align: middle;
  width: 16px !important;
  height: 32px !important;
  &:before {
    content: "" !important;
    display: none !important;
  }
}
.el-col-6 {
  overflow-y: auto;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    height: calc(100vh - 84px);
    .app-container {
      height: 100%;
      padding: 0 20px;
      > .el-row {
        height: 100%;
        > div {
          height: 100%;
        }
        > div.el-col-4 {
          border-right: 10px solid #eee;
          padding: 20px;
        }
      }
    }
  }
}
.gwWrap {
  height: 360px;
  overflow-y: auto;
  .el-row {
    height: 100%;
    margin: 0 !important;
    .el-col-6 {
      border-right: 2px solid #eee;
      padding-right: 8px;
    }
    .el-col-18 {
      width: 75%;
      padding-left: 10px;
    }
  }
}
</style>
