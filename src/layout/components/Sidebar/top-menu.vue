<template>
  <div>
    <div class="t">
      <div class="logo">
        <img
          src="../../../assets/image/style1/logo.png"
          alt=""
        />
        <span>工程建设项目数字化管控平台</span>
      </div>
      <div class="menu-box">
        <div>
          <div id="scrollwrap">
            <div
              v-for="(item, index) in menu"
              :class="acitveIndex == index ? 'active' : ''"
              :key="index"
              @click="showSecondMenuForIndex(index)"
            >
              <div>
                <div>{{ item.meta.title }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div v-popover:pop>
          <img
            src="../../../assets/image/style1/icon6.png"
            alt=""
          /><span>通知</span>
          <i>{{ msgUnreadNum }}</i>
        </div>

        <div @click.stop="showSet">
          <img
            src="../../../assets/image/style1/icon7.png"
            alt=""
          /><span>{{
            $store.getters.userInfo.name || $store.getters.userInfo.nickName
          }}</span><img
            src="../../../assets/image/style1/icon8.png"
            alt=""
          />
          <div
            class="set-sublist"
            v-show="setflag"
          >
            <div>修改密码</div>
            <div>基本设置</div>
            <div>管理后台</div>
            <div @click="logout">退出登录</div>
            <dl
              class="bg"
              @click.stop="hideSet"
            ></dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import { storageFunc } from "@/utils/common";
import Logo from "./Logo";
import MenuItem from "./MenuItem";
import variables from "@/assets/styles/variables.scss";
import { deepClone } from "../../../utils";
import { countMsgUnread } from "@/api/system/msg/inner";
export default {
  name: "top-menu",
  components: { MenuItem, Logo },
  data () {
    return {
      secondMenu: [],
      threeMenu: [],
      menu: [],
      acitveIndex: storageFunc.getActiveFirstRouteIndex() || 0,
      showProFlag: false,
      setflag: false,
      scrollIndex: 0,
      tempOptions: [

      ],
      tempValue: "",
      timer: "",
      msgUnreadNum: 0,
      // isShowPop:false,
      isShowHeader: false,
    };
  },
  computed: {
    ...mapState(["settings"]),
    ...mapGetters(["permission_routes", "sidebar"]),
    activeMenu () {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo () {
      return this.$store.state.settings.sidebarLogo;
    },
    variables () {
      return variables;
    },
    isCollapse () {
      return !this.sidebar.opened;
    },
  },
  watch: {
    "$route.path": function (newVal, oldVal) {
      this.changeActiveMenu(newVal, oldVal);

      this.showSecondMenuForIndex(this.loadSidebar(newVal), false);
    }
  },
  created () {
    let routesList = deepClone(this.permission_routes);

    for (let i = 0; i < routesList.length; i++) {
      if (routesList[i].meta && !routesList[i].hidden) {
        this.menu.push(routesList[i]);
      }
    }

    // this.$store.commit("SET_DISPLAY_ROUTES", this.menu);

    if (this.acitveIndex) {
      const sencodMenus = this.menu[this.acitveIndex].children;

      storageFunc.setActiveSecondRoute(sencodMenus);
      this.$store.state.permission.secondRouter = sencodMenus;
    }

    //定时查询：是否有新消息
    // 发起请求去获取消息数据。
    // 获取到的记录数是否大于0
    // true，则判断窗口是否已显示，判断用户是否设置了不再显示消息框，判断上次显示时间是否小于过5分钟。
    // 以上条件全为 false 则调用显示消息框的函数，绑定数据，否则不做任何操作。。
    this.onMsgNotice();
    let that = this;
    this.timer = window.setInterval(() => {
      that.onMsgNotice();
    }, 1000 * 60 * 5);
  },
  mounted () {
    // this.showSecondMenu(this.permission_routes[0])
    // this.showSecondMenuForIndex(storageFunc.getActiveFirstRouteIndex(), 'init');
    // const tempSecondPath = storageFunc.getActiveSecondRouteIndex();
    // if (tempSecondPath) {
    //   this.$router.push({ path: tempSecondPath });
    // }
  },
  methods: {
    ...mapActions({
      logout: "Logout",
    }),
    /**
     * 处理页面导航条联动
     * author：陈偲
     * time：20210716
     */
    loadSidebar (path) {
      const indexArr = [];

      let indexNum = -1;

      const func = (children, num = 0) => {
        const tempNum = num;

        if (children && children.length) {
          for (let i = 0; i < children.length; i++) {
            if (indexNum >= 0) {
              return false;
            }

            const item = children[i];

            if (tempNum === 0) {
              indexArr.push(i);
            }

            if (item.path === path) {
              indexNum = indexArr[indexArr.length - 1];

              return false;
            } else {
              func(item.children, ++num);
            }
          }
        }
      };

      func(this.menu);

      return indexNum;
    },
    changeActiveMenu (newVal, oldVal) {
      //选中状态
      //console.log(this.$route.path)
      for (let i = 0; i < this.menu.length; i++) {
        if (this.menu[i].path === newVal) {
          this.acitveIndex = i;

          storageFunc.setActiveFirstRouteIndex(i);

          continue;
          //console.log(this.menu[i])
        }
      }
    },
    // showSecondMenu(item, index) {
    //   this.acitveIndex = index
    //   this.secondMenu = item.children
    //   this.$store.state.permission.secondRouter = this.secondMenu
    //   if (!!item.redirect) {
    //     this.$router.push({ path: item.redirect })
    //   }
    // },
    proSelect () {
      if (this.$store.getters.userOrgList.length > 1) {
        this.$router.push({ path: "/index" });
      }
    },
    hideProSelect () {
      this.showProFlag = false;
    },
    showSecondMenuForIndex (index, isLoad = true) {
      this.acitveIndex = index;

      storageFunc.setActiveFirstRouteIndex(index);

      let item = this.menu[index];
      console.log(item, index, "showSecondMenuForIndex");
      this.secondMenu = item.children;
      this.$store.state.permission.secondRouter = this.secondMenu;

      storageFunc.setActiveSecondRoute(this.secondMenu);

      if (isLoad) {
        if (item.redirect) {
          this.$router.push({ path: item.redirect });
        } else {
          this.$router.push({ path: item.path });
        }
      }
    },
    // showThreeMenu(item,index) {
    //   console.log(item);
    //   this.childActiveIndex=index;
    //   this.$store.state.permission.threeRouter = item.children || [];
    //   console.log(item, "click secondMenu");
    //   this.threeMenu = item.children;
    //   if (!item.children && item.resTypeCode == "SOURCE_YM") {
    //     this.$router.push({ path: item.path });
    //   } else if (!!item.redirect) {
    //     this.$router.push({ path: item.redirect });
    //   }
    // },
    showSet () {
      this.setflag = true;
    },
    hideSet () {
      this.setflag = false;
    },
    next () {
      let length = document.getElementById("scrollwrap").children.length - 10;
      if (length - Math.abs(this.scrollIndex) == 1) {
        this.scrollIndex -= 1;
      } else {
        this.scrollIndex -= 2;
      }
      if (Math.abs(this.scrollIndex) > length - 1) {
        document.getElementsByClassName("next")[0].style.cssText =
          "display:none;";
      }
      document.getElementsByClassName("prev")[0].style.cssText =
        "display:block;";
      let left = this.scrollIndex * 88;
      document.getElementById("scrollwrap").style.cssText =
        "margin-left:" + left + "px";
    },
    prev () {
      let length = document.getElementById("scrollwrap").children.length - 10;
      if (length - Math.abs(this.scrollIndex) == 0) {
        this.scrollIndex += 1;
      } else {
        this.scrollIndex += 2;
      }
      if (this.scrollIndex >= 0) {
        document.getElementsByClassName("prev")[0].style.cssText =
          "display:none;";
      }
      let left = this.scrollIndex * 88;
      document.getElementsByClassName("next")[0].style.cssText =
        "display:block;";
      document.getElementById("scrollwrap").style.cssText =
        "margin-left:" + left + "px";
    },
    tempChange (p) {
      if (p == 1) {
        this.$router.push({ path: "/updateModel/index" });
      } else if (p == 2) {
        this.$router.push({ path: "/detailListModel/index" });
      } else if (p == 3) {
        this.$router.push({ path: "/designModel/index" });
      } else if (p == 4) {
        this.$router.push({ path: "/proIndex/index" });
      } else if (p == 5) {
        this.$router.push({ path: "/investment/index" });
      } else if (p == 6) {
        this.$router.push({ path: "/progress/index" });
      } else if (p == 7) {
        this.$router.push({ path: "/quality/index" });
      } else if (p == 8) {
        this.$router.push({ path: "/agency/index" });
      } else if (p == 9) {
        this.$router.push({ path: "/jindukongzhi/index" });
      } else if (p == 10) {
        this.$router.push({ path: "/zhilaingkongzhi/index" });
      }
    },
    onMsgNotice () {
      countMsgUnread().then((resp) => {
        if (resp.data > this.msgUnreadNum) {
          this.$notify.info({
            title: "我的消息",
            offset: 40,
            message: resp.data - this.msgUnreadNum + "条新消息",
          });
          this.msgUnreadNum = resp.data;
        }
      });
    },
  },
  beforeDestroy () {
    window.clearInterval(this.timer);
  },
};
</script>
<style lang="scss" scoped>
.el-menu {
  display: flex !important;
  background-color: transparent !important;

  li {
    background-color: transparent !important;

    > div {
      background-color: transparent !important;
    }
  }
}
</style>
<style lang="scss">
.el-menu {
  .el-menu-item:hover,
  .el-menu-item:focus {
    background-color: #3788fd !important;
    color: #fff;
    border-bottom: 1px solid #fff;
  }

  .el-submenu__title:hover,
  .el-submenu__title:focus {
    background-color: transparent !important;
    color: #fff;
    border-bottom: 1px solid #fff;

    * {
      color: #fff;
    }
  }
}

// .el-menu-item.is-active {
//   color: #fff !important;
//   border-bottom: 1px solid #fff;
// }

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

  /*li {*/
  /*  list-style-type: none;*/
  /*  border: none;*/
  /*  margin: 0 15px;*/
  /*  height: 36px;*/
  /*  color: #fff;*/

  /*  > div {*/
  /*    line-height: 36px;*/
  /*    font-size: 14px;*/
  /*    opacity: 0.65;*/
  /*  }*/
  /*}*/

  /*li.active,*/
  /*li:hover {*/
  /*  > div {*/
  /*    border-bottom: 1px solid #fff;*/
  /*    opacity: 1;*/
  /*    cursor: pointer;*/
  /*  }*/
  /*}*/
}

.set-sublist {
  position: absolute;
  width: 100%;
  background-color: #fff;
  z-index: 9;
  line-height: 32px;
  text-align: center;
  top: 40px;
  border: 1px solid #dddddd;
  border-radius: 5px;

  > div:hover {
    background-color: #2f7af1;
    color: #fff;
  }

  .bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 6;
  }

  > div {
    position: relative;
    z-index: 7;
  }
}

.set-sublist::before {
  content: '';
  width: 16px;
  height: 9px;
  position: absolute;
  top: -9px;
  background: url(../../../assets/image/style1/icon-shang.png) no-repeat center
    center;
  background-size: 100% 100%;
  left: 50%;
  transform: translateX(-50%);
}

.el-popover__reference {
  margin: 0;
}
</style>
