<template>
  <div class="lefttree">
    <VueMagicTree
      :setting="msgTreeSetting"
      :nodes="msgTreeNodes"
      ref="prohibitedTree"
    />
  </div>
</template>

<script>
  import VueMagicTree from 'vue-magic-tree'
  import path from "path"

  export default {
    components: {
      VueMagicTree
    },
    props: {
      leftTreeData: {
        type: Array,
        default: []
      }
    },
    watch: {
      leftTreeData: {
        immediate: true,
        handler(val, oldval) {
          let treeData = JSON.parse(JSON.stringify(val))
          for (let i = 0; i < treeData.length; i++) {
            treeData[i]['title'] = treeData[i]['meta']['title']
            treeData[i]['icon'] = treeData[i]['meta']['icon']
            if (treeData[i].children) {
              let childData = treeData[i].children
              for (let i = 0; i < childData.length; i++) {
                childData[i]['title'] = childData[i]['meta']['title']
                childData[i]['icon'] = childData[i]['meta']['icon']
              }
              if (childData[i] && childData[i].children) {
                let childData1 = childData[i].children
                for (let i = 0; i < childData1.length; i++) {
                  childData1[i]['title'] = childData1[i]['meta']['title']
                  childData1[i]['icon'] = childData1[i]['meta']['icon']
                }
              }
            }
          }
          console.log(treeData)
          this.msgTreeNodes = treeData
        },
        deep: true
      }
    },
    data() {
      return {
        dialogFlag: false,
        msgTreeSetting: {
          callback: {
            onClick: this.zTreeOnClick
          },
          data: {
            key: {
              name: 'title'
            },
            simpleData: {
              enable: true
            }
          },
          view: {
            showLine: true,
            showIcon: false
          }
        },
        msgTreeNodes: [
          { id: 1, title: 'test1' },
          { id: 2, title: 'test2' }
        ]
      }
    },
    methods:{
      // 节点单击事件
      zTreeOnClick(evt, treeId, treeNode){
        console.log(treeNode)
        this.$router.push({ path: treeNode.path })
      }
    }
  }
</script>
<style lang="scss">
  .lefttree {
    -webkit-transition: width 0.28s;
    transition: width 0.28s;
    width: 200px !important;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 90px;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    padding: 20px 10px;
    border-right: 7px solid #d1d1e8;
  }

  .file_ico_docu {
    margin-right: 2px;
    background: url(../../../assets/image/ycTreeFile.png) no-repeat scroll center center transparent;
    background-size: 100% 100%;
    vertical-align: top;
    *vertical-align: middle;
    width: 16px !important;
    height: 32px !important;
    display: inline-block !important;
  }

  .ico_docu {
    margin-right: 2px;
    background: url(../../../assets/image/ycTreeFile.png) no-repeat scroll center center transparent;
    background-size: 100% 100%;
    vertical-align: top;
    *vertical-align: middle;
    width: 16px !important;
    height: 32px !important;
    display: inline-block !important;
  }

  .button.roots_close {
    background: url(../../../assets/image/ycTreeFolder.png) no-repeat scroll center center transparent;
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
    background: url(../../../assets/image/ycTreeFolderOpen.png) no-repeat scroll center center transparent;
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
    background: url(../../../assets/image/ycTreeFolder.png) no-repeat scroll center center transparent;
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
    background: url(../../../assets/image/ycTreeFolderOpen.png) no-repeat scroll center center transparent;
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
    background: url(../../../assets/image/ycTreeFolderOpen.png) no-repeat scroll center center transparent;
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
    background: url(../../../assets/image/ycTreeFolder.png) no-repeat scroll center center transparent;
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
