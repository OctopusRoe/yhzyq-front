<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse"/>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="settings.theme"
        :collapse-transition="false"
        mode="vertical"
      >
        <!--  :key="route.path  + index"-->
        <sidebar-item
          v-for="(route, index) in _threeMenu"
          :item="route"
          :base-path="route.path"
        />
        <div>
        </div>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'
  import Logo from './Logo'
  import SidebarItem from './SidebarItem'
  import variables from '@/assets/styles/variables.scss'

  export default {
    components: { SidebarItem, Logo },

    data() {
      return {
        _threeMenu: []
      }
    },
    watch: {
      '$store.state.permission.threeRouter': {
        handler(val) {
          this.$set(this, 'threeMenu', val || [])
          //   this._threeMenu = val || []
          console.log(this._threeMenu, 'this._threeMenu')
        },
        deep: true,
        immediate: true
      }
    },
    computed: {
      ...mapState(['settings']),
      ...mapGetters(['permission_routes', 'sidebar']),
      activeMenu() {
        const route = this.$route
        const { meta, path } = route
        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
          return meta.activeMenu
        }
        return path
      },
      showLogo() {
        return this.$store.state.settings.sidebarLogo
      },
      variables() {
        return variables
      },
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }
</script>
