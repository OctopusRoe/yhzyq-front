<template>
  <div :class="classObj" class="app-wrapper">
    <TopTitle></TopTitle>
    <!--    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>-->
    <div style="background-color: #fff; height: calc(100% - 52px)">
      <div
        v-if="secondMenu && secondMenu.length"
        class="sider-wrap"
        :class="{ show: !sidebarOpen, 'show-second': isOpenSecond }"
      >
        <div class="icon-zhedie">
          <svg-icon icon-class="icon-zhedie" @click="handleClickOutside" />
        </div>
        <!-- <el-menu :collapse="false" default-active="2-1">
        <el-submenu
          v-for="(item, index) in this.secondMenu"
            :key="index"
             @open="handleOpen" @close="handleClose"
        >
          <template slot="title">
            <svg-icon
              :icon-class="
                item.meta && item.meta.icon ? item.meta.icon : 'email'
              "
            />
            <span slot="title">{{ item.meta.title }}</span>
          </template>
          <sidebar-item
            v-for="(route,index) in item.children"
               :key="index"
            :item="route"
            :base-path="route.path"
          />
        </el-submenu>
      </el-menu> -->

        <el-menu
          default-active="3-1"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          :unique-opened="true"
          class="menu-container"
        >
          <template v-for="(item, index) in secondMenu">
            <el-submenu
              v-if="item.children && item.children.length"
              :key="index"
              :index="index.toString()"
            >
              <template slot="title">
                <svg-icon
                  :icon-class="
                    item.meta && item.meta.icon ? item.meta.icon : 'email'
                  "
                />
                <span slot="title">{{ item.meta.title }}</span>
              </template>

              <sidebar-item
                v-for="(route, index1) in item.children"
                :key="index + '-' + index1"
                :index="index1.toString()"
                :item="route"
                :base-path="route.path"
              />
            </el-submenu>
            <el-menu-item
              v-else
              :key="index"
              :route="item.path"
              :index="index.toString()"
            >
              <svg-icon
                :icon-class="item.meta.icon || (item.meta && item.meta.icon)"
              />
              <!-- <router-link :to="item.path"> -->
              <router-link :to="item.path">
                <span>{{ item.meta.title }}</span></router-link
              >
            </el-menu-item>
          </template>
        </el-menu>
      </div>

      <div
        :class="{ show: !sidebarOpen, 'show-second': isOpenSecond }"
        class="main-container"
        style="
          height: 100% !important;
          background-color: #edeef0;
          padding: 10px 10px 0;
        "
      >
        <div style="background-color: #fff; height: 100%; overflow: hidden">
          <div
            class="tags-box"
            :class="{ displaynone: $store.getters.isTagsDisplayNone }"
          >
            <tags-view />
          </div>
          <app-main v-if="$store.getters.isShowPageView" />
          <right-panel v-if="showSettings">
            <settings />
          </right-panel>
        </div>
        <div class="copyright">
          <span>江西锦路科技开发有限公司</span><span>版权所有</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopTitle from "./plaf/top-title";
// import { mapState } from 'vuex'
import RightPanel from "@/components/common/RightPanel";
import { AppMain, Navbar, Settings, Sidebar, TagsView } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
import SidebarItem from "./components/Sidebar/SidebarItem";
import Logo from "./components/Sidebar/Logo";
import { mapGetters, mapState } from "vuex";
import variables from "@/assets/styles/variables.scss";
import { storageFunc } from "@/utils/common";

export default {
  name: "PageWapper",
  components: {
    TopTitle,
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView,
    SidebarItem
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar
      // device: state => state.app.device,
      // showSettings: state => state.settings.showSettings,
      // needTagsView: state => state.settings.tagsView,
      // fixedHeader: state => state.settings.fixedHeader
    })
    //   classObj() {
    //     return {
    //       hideSidebar: !this.sidebar.opened,
    //       openSidebar: this.sidebar.opened,
    //       withoutAnimation: this.sidebar.withoutAnimation,
    //       mobile: this.device === 'mobile'
    //     }
    //   }
  },
  data() {
    return {
      isCollapse1: false,
      leftTreeData: [],
      secondMenu: storageFunc.getActiveSecondRoute() || [],
      threeMenu: [],
      sidebarOpen: true,
      routes: [],
      isOpenSecond: false
    };
  },
  mixins: [ResizeMixin],
  created() {
    // this.secondMenu.push(this.$store.getters.permission_routes.find(item => item.name === this.$route.name).children)

    this.router = this.$store.getters.permission_routes;
  },
  watch: {
    "$store.state.permission.secondRouter": {
      handler(val) {
        this.$set(this, "secondMenu", val);
        //this.secondMenu = val || []
        // console.log(this.secondMenu, "this.secondMenu");

        this.isOpenSecond = !this.secondMenu?.length;
      },
      deep: true,
      immediate: true
    },
    "$store.state.permission.threeRouter": {
      handler(val) {
        this.$set(this, "threeMenu", val);
        //   this._threeMenu = val || []
        // console.log(this.threeMenu, "this._threeMenu");
      },
      deep: true,
      immediate: true
    },
  },
  computed: {
    ...mapState(["settings"]),
    ...mapGetters(["permission_routes", "sidebar"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    childMenuTitle() {
      const route = this.$route;
      const { meta, path } = route;
      return meta;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      this.sidebar.opened = true;
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },
  methods: {
    togglePanel() {
      if (this.isCollapse1) {
        this.isCollapse1 = false;
      } else {
        this.isCollapse1 = true;
      }
    },
    handleOpen(key, keyPath) {
      if (!this.secondMenu[key].children && this.secondMenu[key].path) {
        this.$router.push({ path: this.secondMenu[key].path });
      }
    },
    handleClose(key, keyPath) {
      if (!this.secondMenu[key].children && this.secondMenu[key].path) {
        this.$router.push({ path: this.secondMenu[key].path });
      }
    },
    showThreeMenu(item) {
      this.$store.state.permission.threeRouter = item.children || [];
      // window._threeMenu=item.children
      this.threeMenu = item.children;
      if (!!item.redirect) {
        this.$router.push({ path: item.redirect });
      }
    },
    autoScroll() {
      let mtop = 0;
      let pdom = document.getElementById("listWrap");
      let cdom = pdom.children[0];
      let fdom = cdom.cloneNode(true);
      let itemHeight = cdom.offsetHeight;
      // console.log(itemHeight);
      pdom.appendChild(fdom);
      let flag = true;
      setInterval(function() {
        if (!flag) return;
        mtop--;
        if (Math.abs(mtop) >= itemHeight) mtop = 0;
        pdom.style.marginTop = mtop + "px";
      }, 50);
      pdom.onmouseover = function() {
        flag = false;
      };
      pdom.onmouseout = function() {
        flag = true;
      };
    },
    goto() {
      this.$router.push({ name: "home" });
    },
    handleClickOutside() {
      // console.log(this.sidebar);
      // console.log(this.sidebar.opened);
      // this.$store.dispatch("app/toggleSideBar", { withoutAnimation: false });
      // let that = this;
      // console.log(this.sidebar.opened);
      // setTimeout(function () {
      //   that.sidebar.opened = false;
      // }, 2000);
      if (this.sidebarOpen) {
        this.sidebarOpen = false;
      } else {
        this.sidebarOpen = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/mixin.scss";
@import "~@/assets/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}

* {
  font-size: 12px;
  box-sizing: border-box;
}

.top {
  background: url(../assets/image/headerBg.png);
  display: flex;
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
    height: 39px;
    color: #fff;

    > div {
      line-height: 39px;
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

.leftbox,
.rightbox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 25%;
  box-shadow: 0 0 5px 5px #fff;

  > div {
    height: 27vh;
    padding-left: 1vw;
    background-color: #fff;
  }
}

.container {
  height: 100%;
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

.password-box {
  i {
    color: red;
  }

  span {
    color: #000;
  }

  > div {
    margin-bottom: 10px;

    > div {
      margin-left: 10px;
    }

    display: flex;
    white-space: nowrap;
    align-items: center;
  }
}

* {
  margin: 0;
  padding: 0;
}

.upload {
  text-align: center;

  > div {
    margin: 0 auto;
  }
}

.sidebar-container {
  top: 88px !important;
}
</style>
<style lang="scss" scoped>
@import "~@/assets/styles/index.scss";

* {
  font-size: 12px;
  box-sizing: border-box;
}

.top {
  background: url(../assets/image/headerBg.png);
  display: flex;
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
      // border-bottom: 1px solid #fff;
      opacity: 1;
      cursor: pointer;
    }
  }
}
</style>
<style lang="scss">
.password-box {
  i {
    color: red;
  }

  span {
    color: #000;
  }

  > div {
    margin-bottom: 10px;

    > div {
      margin-left: 10px;
    }

    display: flex;
    white-space: nowrap;
    align-items: center;
  }
}

* {
  margin: 0;
  padding: 0;
}

.upload {
  text-align: center;

  > div {
    margin: 0 auto;
  }
}

#app .main-container {
  height: calc(100% - 94px) !important;
  min-height: auto !important;

  .app-main {
    height: 100% !important;
  }
  &.show-second {
    margin-left: 0 !important;
  }
}

.sidebar-container {
  top: 110px !important;
}
body .sider-childmenu .router-link-active {
  border-left: 5px solid #086fc5 !important;
  background-color: #f6f6f6;
  display: block;
  span {
    color: #13a3ff !important;
    background-color: #f6f6f6;
    display: inline-block;
  }
}
.el-menu-item {
  span {
    // color: #848a98;
  }
}
// .el-submenu__icon-arrow {
//   display: none !important;
// }
// .el-menu .el-submenu__title:hover *,
// .el-menu .el-submenu__title:focus *,
// .el-menu .el-submenu__title * {
//   color: #848a98;
//   vertical-align: middle;
// }
// .el-menu .el-submenu__title * {
//   vertical-align: middle;
// }
// .sider-childmenu *:hover {
//   border-bottom: 0 !important;
// }
body .sider-childmenu div > a {
  border-left: 5px solid transparent !important ;
}
body .sider-childmenu div {
  overflow-x: auto;
  overflow-y: hidden;
}
body .sider-childmenu div li {
  overflow-x: auto;
  overflow-y: hidden;
}
body .sider-childmenu div.activetitle {
  padding-top: 19px;
  padding-bottom: 12px;
  border-bottom: 1px solid #cfd0d4 !important;
  margin: 0 40px;
  text-align: left;
  padding-left: 20px;
  span {
    font-size: 16px;
    color: #005bac;
    vertical-align: middle;
  }
  svg.svg-icon {
    fill: currentColor;
    color: #1867be;
    vertical-align: middle;
    margin-right: 5px;
    font-size: 20px;
    margin-left: 0;
  }
}
body .sider-childmenu .svg-icon {
  margin-left: 20px;
}
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(8, 111, 197, 0.3);
  border-radius: 10px;
  background-color: #fff;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(8, 111, 197, 0.3);
  background-color: rgba(0, 0, 0, 0.1);

  // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
body .sider-childmenu div li::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 6px;
}
.icon-zhedie {
  background-color: #fff;
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: flex-end;
  padding: 0 5px;
  border-bottom: 1px solid #eee;
  .svg-icon {
    font-size: 20px;
    margin-right: 10px;
    cursor: pointer;
  }
}
.sider-wrap {
  &.show {
    width: 50px !important;
    .el-menu {
      i {
        display: none;
      }
      span {
        display: none;
      }
    }
  }
  .svg-icon {
    margin-right: 7px;
    font-size: 16px;
  }
  * {
    vertical-align: middle !important;
  }
  *:hover {
    border: 0 !important;
    vertical-align: middle !important;
  }
  .el-submenu__title,
  .el-submenu .el-menu-item {
    height: 43px !important;
    line-height: 43px !important;
  }
  .el-submenu .el-menu-item,
  .el-menu .el-submenu__title {
    border-left: 3px solid transparent !important;
  }
  .el-submenu .el-menu-item:hover {
    color: #333 !important;
    background-color: #efecec !important;
    border-left: 3px solid #3788fd !important;
  }
  .el-menu-item.is-active {
    color: #333 !important;
    background-color: #efecec !important;
    border-left: 3px solid #3788fd !important;
  }

  > ul {
    > li {
      .el-submenu__title {
        transition: none !important;
      }
      > ul > li {
        .el-submenu__title:hover {
          color: #333;
          background-color: #3788fd !important ;
          border-left: 3px solid #3788fd !important ;
          * {
            color: #fff;
          }
        }
      }
    }
    > li:hover {
      > .el-submenu__title {
        background-color: #3788fd !important;
      }
      > .el-submenu__title * {
        color: #fff !important;
      }
    }
  }
}
</style>
