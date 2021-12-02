<script>
/**
 * @description 顶部导航栏
 * @author OctopusRoe
 */

import { navList, setingList } from './navList'
import { storageFunc } from "@/utils/common";
import { mapGetters, mapState, mapActions } from "vuex";
import { deepClone } from "@/utils";
import { getMenuList } from '../api'
import { logout } from '@/config/sso'
import { getUserId } from '@/utils/auth'

export default {
  props: {
  },
  data () {
    return {
      navList,
      setingList,
      activeIndex: 4,
      index: storageFunc.getActiveFirstRouteIndex() || 0,
      secondMenu: [],
      threeMenu: [],
      menu: [],
      menuList: []
    }
  },
  computed: {
    ...mapState(["settings"]),
    ...mapGetters(["permission_routes", "sidebar"]),
  },
  created () {
    this.getIndexNavList()
    // this.getMenuList()
  },
  methods: {
    ...mapActions({
      logout: "Logout",
    }),

    async getMenuList () {
      try {
        const backValue = await getMenuList({
          appID: 'YHBI',
          userId: getUserId()
        })

        if (backValue.code !== 200) {
          console.error(backValue.msg)
          return
        }
        this.menuList = backValue.obj
      } catch (e) {
        console.error(e)
      }
    },

    activeNav (index) {
      this.activeIndex = index
    },

    activeSeting (item) {
      switch (item.key) {
        case 'seting':
          let index
          this.menu.forEach((item, indexO) => {
            if (item.path === '/manage') {
              index = indexO
            }
          })
          this.showSecondMenuForIndex(index)
          this.$router.push(item.path)
          break;
        case 'jump':
          break;
        case 'logout':
          logout()
          break;
      }
    },

    showSecondMenuForIndex (index, isLoad = true) {
      this.index = index;

      storageFunc.setActiveFirstRouteIndex(index);

      let item = this.menu[index];
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

    getIndexNavList () {
      let routesList = deepClone(this.permission_routes);

      for (let i = 0; i < routesList.length; i++) {
        if (routesList[i].meta && !routesList[i].hidden) {
          this.menu.push(routesList[i]);
        }
      }

      if (this.index) {
        const sencodMenus = this.menu[this.index].children;

        storageFunc.setActiveSecondRoute(sencodMenus);
        this.$store.state.permission.secondRouter = sencodMenus;
      }
    },
    clickChildren (e) {
      if (e.indexOf('http') > -1) {
        window.location.href = e
      } else {
        window.location.href = 'https://' + e
      }
    }
  }

}
</script>
<template>
  <div class="big-screen-head-box">
    <div class="big-screen-head-one">
      <img src="../assets/images/logo.png" />
    </div>
    <div class="big-screen-head-two">
      <div
        v-for="(item, index) in navList"
        :key="index"
        class="big-screen-nav-item"
        :class="{'nav-active': index === activeIndex}"
        @click="activeNav(index)"
        :style="{left: item.offset}"
      >
        {{item.label}}
      </div>
    </div>
    <div class="big-screen-head-three">
      <div
        v-for="(item, index) in setingList"
        :key="index"
        @click="activeSeting(item)"
        class="big-screen-seting-item"
      >
        <el-dropdown
          v-if="item.children"
          @command="clickChildren"
        >
          <div class="big-screen-seting-item">
            <img :src="item.icon">
            {{item.label}}
          </div>
          <el-dropdown-menu
            slot="dropdown"
            :append-to-body="false"
          >
            <el-dropdown-item
              v-for="(itemO, indexO) in menuList"
              :key="indexO"
              :command="itemO.SYSTEM_URL"
            >
              {{itemO.SHORT_NAME}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div
          v-else
          class="big-screen-seting-item"
        >
          <img :src="item.icon">
          {{item.label}}
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.nav-active {
  background: url('~../assets/images/four.png') no-repeat center / contain;
  // background-size: 200px 88px;
  background-size: 150px 70px;
}

.big-screen-head-box {
  height: 89px;
  width: 100%;
  display: flex;
  background: url('~../assets/images/three.png') no-repeat center / contain;
  background-size: 100% 89px;

  .big-screen-head-one {
    // width: 558px;
    width: 29%;
    height: 92px;
    display: flex;
    align-items: center;

    img {
      margin-left: 21px;
      // width: 502px;
      width: 90%;
      height: 46px;
    }
  }

  .big-screen-head-two {
    width: 51%;
    height: 62px;
    font-size: 13px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
    line-height: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;

    .big-screen-nav-item {
      position: relative;
      width: 25%;
      height: 58px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .big-screen-head-three {
    display: flex;
    justify-content: space-around;
    width: 20%;
    height: 50px;

    .big-screen-seting-item {
      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #c5f3ff;

      &:hover {
        cursor: pointer;
      }

      img {
        margin-right: 10px;
        width: 22px;
        height: 22px;
      }
    }
  }
}

.el-dropdown-menu,
.el-popper,
.el-dropdown-menu--medium {
  background-color: #0a243c;
  border: 2px solid #0a243c;
}

::v-deep .el-dropdown-menu__item {
  color: #ffffff !important;
}
::v-deep .el-dropdown-menu__item:hover {
  background-color: #1b8777 !important;
}

::v-deep .el-dropdown-menu__item:active {
  background-color: #1b8777 !important;
}

::v-deep .el-dropdown-menu__item:focus {
  background-color: #1b8777 !important;
}
::v-deep .popper__arrow {
}
</style>
