<template>
  <div :class="classObj" class="app-wrapper" style="background-color:#eee">
    <TopTitle></TopTitle>
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <router-view />
  </div>
</template>

<script>
import { TagsView } from "@/layout/components";
  import TopTitle from './plaf/TopTitle'
  import ResizeMixin from './mixin/ResizeHandler'
  import { mapState } from 'vuex'
  

  export default {
    name: 'Layout',
    components: {
      TopTitle,TagsView
    },
    computed: {
      // cachedViews() {
      //   return this.$store.state.tagsView.cachedViews
      // },
      key() {
        return this.$route.path
      }
    },
    data() {
      return {

        leftTreeData: []
      }
    },
    mixins: [ResizeMixin],
    mounted() {
     
    },
    computed: {
      ...mapState({
        sidebar: (state) => state.app.sidebar,
        device: (state) => state.app.device,
        showSettings: (state) => state.settings.showSettings,
        needTagsView: (state) => state.settings.tagsView,
        fixedHeader: (state) => state.settings.fixedHeader
      }),
      classObj() {
        this.sidebar.opened = true
        return {
          hideSidebar: !this.sidebar.opened,
          openSidebar: this.sidebar.opened,
          withoutAnimation: this.sidebar.withoutAnimation,
          mobile: this.device === 'mobile'
        }
      }
    },
    methods: {
      autoScroll() {
        let mtop = 0
        let pdom = document.getElementById('listWrap')
        let cdom = pdom.children[0]
        let fdom = cdom.cloneNode(true)
        let itemHeight = cdom.offsetHeight
        console.log(itemHeight)
        pdom.appendChild(fdom)
        let flag = true
        setInterval(function() {
          if (!flag) return
          mtop--
          if (Math.abs(mtop) >= itemHeight) mtop = 0
          pdom.style.marginTop = mtop + 'px'
        }, 50)
        pdom.onmouseover = function() {
          flag = false
        }
        pdom.onmouseout = function() {
          flag = true
        }
      },
      goto() {
        this.$router.push({ name: 'home' })
      },
      handleClickOutside() {
        this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
      },

    }
  }
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

  // .top {
  //   background-color: #1867be;
  //   display: flex;
  //   box-shadow: 2px 3px 10px 0px rgba(48, 57, 125, 0.6);
  //   width: 100%;
  //   background-size: 100% 100%;
  // }

  // .logowrap {
  //   display: flex;
  //   align-items: center;
  //   color: #fff;

  //   > div {
  //     height: 70%;
  //   }

  //   h1 {
  //     font-size: 21px;
  //     font-weight: bold;
  //     white-space: nowrap;
  //     margin-right: 36px;
  //   }

  //   img {
  //     margin-right: 14px;
  //     height: 100%;
  //     width: auto;
  //     margin-left: 20px;
  //   }
  // }

  // .rmenu {
  //   flex: 1;
  // }

  // .menu {
  //   display: flex;
  //   height: 54px;
  //   padding: 0 20px 0 0;
  //   background: rgba(201, 197, 255, 0.25);
  //   box-sizing: border-box;
  //   align-items: center;
  //   align-items: flex-end;

  //   > div {
  //     padding: 0 10px 0;
  //     font-size: 16px;
  //     box-sizing: border-box;
  //     text-align: center;
  //     line-height: 43px;
  //     border-radius: 10px 10px 0 0;
  //     color: #fff;
  //     margin: 2px 5px;
  //     cursor: pointer;
  //   }

  //   > div.active {
  //     background: #1867be;
  //   }
  // }

  // .child-menu {
  //   display: flex;

  //   li {
  //     list-style-type: none;
  //     border: none;
  //     margin: 0 15px;
  //     height: 36px;
  //     color: #fff;

  //     > div {
  //       line-height: 36px;
  //       font-size: 14px;
  //       opacity: 0.65;
  //     }
  //   }

  //   li.active,
  //   li:hover {
  //     > div {
  //       border-bottom: 1px solid #fff;
  //       opacity: 1;
  //       cursor: pointer;
  //     }
  //   }
  // }

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

  // .top {
  //   background: url(../assets/image/headerBg.png);
  //   display: flex;
  //   box-shadow: 2px 3px 10px 0px rgba(48, 57, 125, 0.6);
  //   width: 100%;
  //   background-size: 100% 100%;
  // }

  // .logowrap {
  //   display: flex;
  //   align-items: center;
  //   color: #fff;

  //   > div {
  //     height: 70%;
  //   }

  //   h1 {
  //     font-size: 21px;
  //     font-weight: bold;
  //     white-space: nowrap;
  //     margin-right: 36px;
  //   }

  //   img {
  //     margin-right: 14px;
  //     height: 100%;
  //     width: auto;
  //     margin-left: 20px;
  //   }
  // }

  // .rmenu {
  //   flex: 1;
  // }

  // .menu {
  //   display: flex;
  //   height: 54px;
  //   padding: 0 20px 0 0;
  //   background: rgba(201, 197, 255, 0.25);
  //   box-sizing: border-box;
  //   align-items: center;
  //   align-items: flex-end;

  //   > div {
  //     padding: 0 10px 0;
  //     font-size: 16px;
  //     box-sizing: border-box;
  //     text-align: center;
  //     line-height: 43px;
  //     border-radius: 10px 10px 0 0;
  //     color: #fff;
  //     margin: 2px 5px;
  //     cursor: pointer;
  //   }

  //   > div.active {
  //     background: #1867be;
  //   }
  // }

  // .child-menu {
  //   display: flex;

  //   li {
  //     list-style-type: none;
  //     border: none;
  //     margin: 0 15px;
  //     height: 36px;
  //     color: #fff;

  //     > div {
  //       line-height: 36px;
  //       font-size: 14px;
  //       opacity: 0.65;
  //     }
  //   }

  //   li.active,
  //   li:hover {
  //     > div {
  //       border-bottom: 1px solid #fff;
  //       opacity: 1;
  //       cursor: pointer;
  //     }
  //   }
  // }
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
  }

  .sidebar-container {
    top: 110px !important;
  }
</style>
