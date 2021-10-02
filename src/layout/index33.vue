<template>
  <div class="container">
    <div class="top">
      <div class="logowrap">
        <div><img src="../assets/image/logo.png" alt="" /></div>
        <h1 title="项目建设数字化管控平台">项目建设数字化管控平台</h1>
      </div>
      <div class="rmenu">
        <div class="menu">
          <div class="active">公司平台</div>
          <div>项目平台</div>
          <div>智慧工地</div>
          <div>BIM中心</div>
          <div>OA协同</div>
          <div>管理后台</div>
        </div>
        <ul class="child-menu">
          <li class="active"><div>主页</div></li>
          <li><div>基本信息</div></li>
          <li><div>权限管理</div></li>
          <li><div>数据标准库</div></li>
          <li><div>审批流</div></li>
          <li><div>系统</div></li>
        </ul>
      </div>
      <div class="right">
        <div class="msgcenter">
          <div>
            <img src="../assets/image/icon-msg.png" alt="" />
          </div>
          <div>
            <img src="../assets/image/avatar.png" alt="" />
          </div>
          <div>
            <span @click="set">张三</span>
            <div v-show="setShowFlag">
              <ul class="select-box">
                <li
                  @click="
                    updatePassDialog = true;
                    setShowFlag = false;
                  "
                >
                  修改密码
                </li>
                <li
                  @click="
                    photoSetDialog = true;
                    setShowFlag = false;
                  "
                >
                  基本设置
                </li>
                <li @click="logout">退出登录</li>
              </ul>
              <div class="select-bg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <VueMagicTree
          :setting="setting"
          :nodes="nodes"
          @onCreated="handleCreated"
        />
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
import { getSourceSystem } from "@/api/authmanage/systemManager";
import VueMagicTree from "vue-magic-tree";
export default {
  name: "Layout",
  components: {
    VueMagicTree,
  },
  data() {
    return {
      setShowFlag: false,
      setting: {
        callback: {
          beforeRightClick: this.zTreeBeforeRightClick,
          onClick: this.zTreeOnClick,
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
      nodes: [],
    };
  },
  created() {
    this.getSourceSystem();
  },
  methods: {
    getSourceSystem() {
      getSourceSystem().then((response) => {
        this.nodes = [
          {
            text: "test1",
            open: true,
            children: [{ text: "test1_1" }, { text: "test1_2" }],
          },
          {
            text: "test2",
            open: true,
            children: [{ text: "test2_1" }, { text: "test2_2" }],
          },
        ];
      });
    },
    handleCreated: function (ztreeObj) {
      this.ztreeObj = ztreeObj;
      // onCreated 中操作ztreeObj对象展开第一个节点
      ztreeObj.expandNode(ztreeObj.getNodes()[1], true);
    },
    logout() {
      this.hideSet();
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$store.dispatch("LogOut").then(() => {
          location.href = "/index";
        });
      });
    },
    set() {
      this.setShowFlag = true;
    },
    hideSet() {
      this.setShowFlag = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/index.scss";
* {
  margin: 0;
  padding: 0;
  font-size: 12px;
  box-sizing: border-box;
}
body {
  overflow: hidden;
}
.top {
  background: url(../assets/image/headerBg.png);
  display: flex;
  box-shadow: 2px 3px 10px 0px rgba(48, 57, 125, 0.6);
  width: 100%;
  background-size: 100% 100%;
}
.logowrap {
  display: flex;
  align-items: center;
  color: #fff;
  > div {
    height: 70%;
  }
  h1 {
    font-size: 21px;
    font-weight: bold;
    white-space: nowrap;
    margin-right: 36px;
  }
  img {
    margin-right: 14px;
    height: 100%;
    width: auto;
    margin-left: 20px;
  }
}
.rmenu {
  flex: 1;
}
.menu {
  display: flex;
  height: 54px;
  padding: 0 20px 0 0;
  background: rgba(201, 197, 255, 0.25);
  box-sizing: border-box;
  align-items: center;
  align-items: flex-end;
  > div {
    padding: 0 10px 0;
    font-size: 16px;
    box-sizing: border-box;
    text-align: center;
    line-height: 43px;
    border-radius: 10px 10px 0 0;
    color: #fff;
    margin: 2px 5px;
    cursor: pointer;
  }
  > div.active {
    background: #1867be;
  }
}
.child-menu {
  display: flex;
  li {
    list-style-type: none;
    border: none;
    margin: 0 15px;
    height: 36px;
    color: #fff;
    > div {
      line-height: 36px;
      font-size: 14px;
      opacity: 0.65;
    }
  }
  li.active,
  li:hover {
    > div {
      border-bottom: 1px solid #fff;
      opacity: 1;
      cursor: pointer;
    }
  }
}
</style>
<style lang="scss">
.top {
  .right {
    position: absolute;
    padding-right: 20px;
    right: 0;
    height: 53px;
    display: flex;
    align-items: center;
    #vs2__combobox {
      border: 1px solid #fff !important;
    }
    > span {
      color: #fff;
      display: inline-block;
      background-color: #1867be;
      padding: 3px 5px;
      margin-right: 10px;
      border: 0;
    }
    > div {
      display: inline-block;
      span {
        color: #fff;
      }
      .vs__clear {
        display: none;
      }
    }
    .vs__dropdown-toggle {
      border: 1px solid #fff;
    }
    .vs__open-indicator {
      fill: rgba(255, 255, 255, 0.9);
    }
    .msgcenter {
      display: flex;
      align-items: center;
      height: 100%;
      margin-left: 60px;
      margin-right: 10px;
      > div {
        img {
          display: block;
        }
        margin-left: 10px;
      }
      > div:first-child {
        img {
          height: 2.6vh;
          width: auto;
        }
      }
      > div:nth-child(2) {
        img {
          height: 5vh;
          width: auto;
        }
      }
      > div:nth-child(3) {
        margin-left: 10px;
        font-size: 16px;
        cursor: pointer;
        color: #fff;
        position: relative;
        > span {
          font-size: 14px;
        }
        .select-bg {
          position: fixed;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          z-index: 98;
        }
        .select-box {
          position: absolute;
          list-style-type: none;
          background: #fff;
          z-index: 99;
          right: 0;
          top: 158%;
          color: #333;
          white-space: nowrap;
          padding: 5px 0;
          box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
            0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
          li {
            padding: 5px 10px;
            font-size: 14px;
          }
          li:hover {
            background: #e8e8ee;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.container {
  height: 100%;
}
.content {
  height: calc(100% - 84px);
  .left {
    width: 14%;
    float: left;
    height: 100%;
    padding: 20px;
    border-right: 10px solid #e0dcdc;
  }
  .right {
    float: right;
    width: 86%;
    height: 100%;
  }
}
.file_ico_docu {
  margin-right: 2px;
  background: url(../assets/image/ycTreeFile.png) no-repeat scroll center center transparent;
  background-size: 100% 100%;
  vertical-align: top;
  *vertical-align: middle;
  width: 16px !important;
  height: 32px !important;
  display: inline-block !important;
}
.ico_docu {
  margin-right: 2px;
  background: url(../assets/image/ycTreeFile.png) no-repeat scroll center center transparent;
  background-size: 100% 100%;
  vertical-align: top;
  *vertical-align: middle;
  width: 16px !important;
  height: 32px !important;
  display: inline-block !important;
}

.button.roots_close {
  background: url(../assets/image/ycTreeFolder.png) no-repeat scroll center center transparent;
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
  background: url(../assets/image/ycTreeFolderOpen.png) no-repeat scroll center center
    transparent;
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
  background: url(../assets/image/ycTreeFolder.png) no-repeat scroll center center transparent;
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
  background: url(../assets/image/ycTreeFolderOpen.png) no-repeat scroll center center
    transparent;
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
  background: url(../assets/image/ycTreeFolderOpen.png) no-repeat scroll center center
    transparent;
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
  background: url(../assets/image/ycTreeFolder.png) no-repeat scroll center center transparent;
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
</style>
