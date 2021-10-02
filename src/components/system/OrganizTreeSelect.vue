<!--
 * @description: 组织机构树型选择框
 * @author: 陈偲
 * @time: 2021/06/11
 * @params: 
      // 双向绑定的选择的值
      value: {
        type: String
      },
      // 类型和等级 string ,分隔
      // 组织机构类型（0 业主单位、1 监理单位、2 施工单位、3 设计单位、4 咨询单位 、10其他/归类）
      // 组织机构级别 （0集团、1 公司、2项目、3 项目参建单位、4 参建单位部门、5 参建单位分部 、10其他/归类）
      /* 把需要特殊查询的组织机构类型+级别组合字符串\nvar typeLeves=new string[]{"22","25"} ; //\nSysOpenService.GetOrgsTree(typeLeves,"001");// 查询（项目类型为施工单+ 级别为项目）、（项目类型为施工单位+级别为其他）。 具体组合可参考组织机构类型和级别。\n示例：00,30,60,11,21,31,41,51,03,13,23,33,43,53，将层级放在后面。\n比如第一层就是 00,30 ,60 \n到第二层就加上 01,11,21,31,41,51\n到第四层，跳过第三层级 03,13,23,33,43,53 */
      typeAndLevel: {
        type: String,
        default: "",
        required: false
      },
      // 父级编码
      parentCode: {
        type: String,
        default: "0"
      },
      // 传参时是否要显示根节点信息
      showRoot: {
        type: Boolean,
        default: false
      },
      // 是否只能选择最后的叶子节点
      isOnlySelectLeaf: {
        type: Boolean,
        default: true
      },
      // 是否选择第一个终节点
      isSelectFirstNode: {
        type: Boolean,
        default: false
      }
 * @event: 
      get-before-load-data(treeData)  加载数据后界面渲染前加载的数据回调（调用人员处理）
      loaded(reeData, this.checkedKeys) 加载数据成功后执行
      select(id)  选择了项之后执行
-->
<template>
  <TreeSelect
    :data="treeData"
    v-model="id"
    @select="handlerSelect"
    @close="handlerClose"
  ></TreeSelect>
</template>

<script>
import { mapActions } from "vuex";
import TreeSelect from "@/components/common/TreeSelect";

// 树形菜单数据
var treeData = [];

// 树形菜单的平铺结构
var treeTileData = [];

const dataList = [];
// generateList(treeData)

export default {
  name: "OrganizTreeSelect",
  components: { TreeSelect },
  props: {
    // 双向绑定的选择的值
    id: {
      type: String
    },
    // 类型和等级 string ,分隔
    // 组织机构类型（0 业主单位、1 监理单位、2 施工单位、3 设计单位、4 咨询单位 、10其他/归类）
    // 组织机构级别 （0集团、1 公司、2项目、3 项目参建单位、4 参建单位部门、5 参建单位分部 、10其他/归类）
    /* 把需要特殊查询的组织机构类型+级别组合字符串\nvar typeLeves=new string[]{"22","25"} ; //\nSysOpenService.GetOrgsTree(typeLeves,"001");// 查询（项目类型为施工单+ 级别为项目）、（项目类型为施工单位+级别为其他）。 具体组合可参考组织机构类型和级别。\n示例：00,30,60,11,21,31,41,51,03,13,23,33,43,53，将层级放在后面。\n比如第一层就是 00,30 ,60 \n到第二层就加上 01,11,21,31,41,51\n到第四层，跳过第三层级 03,13,23,33,43,53 */
    typeAndLevel: {
      type: String,
      default: "",
      required: false
    },
    // 父级编码
    parentCode: {
      type: String,
      default: "0"
    },
    // 传参时是否要显示根节点信息
    showRoot: {
      type: Boolean,
      default: false
    },
    // 是否只能选择最后的叶子节点
    isOnlySelectLeaf: {
      type: Boolean,
      default: true
    },
    // 是否选择第一个终节点
    isSelectFirstNode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      id: null,
      // 树形菜单数据
      treeData,
      // 搜索时的值
      filterText: "",
      // 展开的KEYS
      expandedKeys: [],
      // 选中的树节点
      selectedKeys: [],
      //
      replaceFields: {},
      // 是否展开父级菜单
      autoExpandParent: true,
      // 树形菜单平铺数据，用于给使用者返回
      treeTileData,
      checkedKeys: [],
      // 默认选择项
      defaultSelectedkeys: [],

      // 选中的节点,VNode
      selectedNodes: [],

      // 是否显示树 (会回调 isShowTree 方法)
      isShowTree: true,
      // 是否收缩树(会回调 isCollapsedTree 方法)
      isCollapsedTree: true
    };
  },
  // mounted() {
  //   this.loadData().then(() => {
  //     if (this.defaultExpandedKeys) {
  //       this.expandedKeys = this.defaultExpandedKeys;
  //     } else {
  //       let openIdarr = [];
  //       this.treeTileData.map(m => openIdarr.push(m.orgCode));
  //       this.expandedKeys = openIdarr;
  //     }

  //     this.checkedKeys = this.$props.defaultCheckedKeys;
  //   });
  // },
  async mounted() {
    await this.loadData();
    if (this.defaultExpandedKeys) {
      this.expandedKeys = this.defaultExpandedKeys;
    } else {
      let openIdarr = [];
      this.treeTileData.map(m => openIdarr.push(m.orgCode));
      this.expandedKeys = openIdarr;
    }

    this.checkedKeys.length = 0;
    this.checkedKeys.push(this.$props.defaultCheckedKeys);
  },
  watch: {
    parentCode(val) {
      // this.parentCode = val;
      this.loadData();
    },
    typeAndLevel(val) {
      // this.typeAndLevel = val;
      this.loadData();
    },
    // filterText(val) {
    //   this.$refs.tree.filter(val);
    // }
    id(newVal) {
      this.$emit("input", newVal);

      // this.$emit("select", newVal);
    },
    value(val) {
      this.$emit("input", val);
    }
  },
  computed: {
    // 取得选中的了节点信息
    checkedNodes() {
      let result = [];

      this.checkedKeys.forEach(m => {
        var node = this.treeTileData.find(v => v.id === m);
        // var node = this.treeTileData.find(v => v.orgCode === m);
        if (node) {
          result.push(node);
        }
      });

      return result;
    }
  },
  methods: {
    ...mapActions({
      getTree: "sys/getUserRoleControlOrganizsTree"
    }),

    // 加载数据
    async loadData() {
      var that = this;

      await this.getTree({
        typeAndLevel: that.typeAndLevel,
        parentCode: that.parentCode,
        showRoot: that.showRoot
      }).then(res => {
        if (this.$props.isDynamicShowTree) {
          this.isShowTree = false;
        }
        if (this.$props.isDynamicCollapsedTree) {
          this.isCollapsedTree = true;
        }

        treeData = this.createNodeTree([res]);

        this.$emit("get-before-load-data", treeData);

        // that.replaceFields = { children: 'children', title: 'text', key: 'id' }
        // generateList(treeData);
        that.treeData = treeData;
        this.$emit("loaded", treeData, this.checkedKeys);

        if (this.treeTileData.length) {
          let node = null;
          let key = null;

          if (this.$props.isSelectFirstNode) {
            node = this.treeTileData[0];
            key = this.treeTileData[0].id;
          } else if (this.$props.isOnlySelectLeaf) {
            // Update：2021-6-10
            // Author：陈偲
            // Desc：使树的初始选择值为第一个叶子节点
            node = this.treeTileData.find(m => !m.children);
            key = node.id;
            // -------------------------------------------------
            // const key = this.treeTileData[0].id;
            // Finished
          }

          this.$nextTick(() => {
            this.id = key;
          });
        }
      });
    },
    // 建立节点树
    createNodeTree(treeData) {
      const tree = [];
      var that = this;

      treeData.forEach(element => {
        tree.push(that.createChildNode(element));
      });
      if (this.$props.isDynamicShowTree) {
        this.$emit("isShowTree", this.isShowTree);
      }
      if (this.$props.isDynamicCollapsedTree) {
        this.$emit("isCollapsedTree", this.isCollapsedTree);
      }

      return tree;
    },
    // 建立树形菜单子节点
    createChildNode(node) {
      // console.log("节点数据", node);

      if (this.$props.isDynamicShowTree) {
        if (node.children?.length > 1) {
          this.isShowTree = true;
        }
      }
      if (this.$props.isDynamicCollapsedTree) {
        if (node.children?.length > 1) {
          this.isCollapsedTree = false;
        }
      }

      var that = this;
      const children = [];
      // const treeNode = node;
      const treeNode = {
        name: node.name,
        id: node.id,
        orgType: node.organizationType,
        leaf: node.leaf,
        data: node
        // label: node.OrgShortName,
        // key: node.orgCode,
        // orgType: node.organizationType,
        // scopedSlots: { label: "label" },
        // leaf: node.leaf
      };

      if (!node.path) {
        Object.assign(node, { path: node.orgCode });
        Object.assign(node, { pathNode: [node] });
        Object.assign(node, {
          // 返回项目信息
          orgProject: node.pathNode.find(
            m => m.levelCode === "2" && m.organizationType === "10"
          )
        });
      }
      that.treeTileData.push(node);
      if (node.children?.length) {
        node.children.forEach(element => {
          Object.assign(element, { path: `${node.path},${element.orgCode}` });

          Object.assign(element, { pathNode: [...node.pathNode, element] });
          Object.assign(element, {
            // 返回项目信息
            orgProject: element.pathNode.find(
              m => m.levelCode === "2" && m.organizationType === "10"
            )
          });

          children.push(that.createChildNode(element));
        });
        if (that.isOnlySelectLeaf) {
          treeNode.selectable = false;
          treeNode.disableCheckbox = true;
        }
        if (children.length !== 0) {
          treeNode.children = children;
        }
      } else {
        if (this.$props.isSelectFirstNode && this.selectedKeys.length == 0) {
          // this.defaultSelectedkeys = [treeNode.key]
          // let node = this.treeTileData.find(m => m.orgCode === treeNode.key);
          this.selectedKeys = [treeNode.key];
          // this.selectedNodes.push(node);
          // this.$emit("select", treeNode);
        }
      }

      // if (this.$props.selectableTypeLevel.length > 0) {
      //   if (this.$props.selectableTypeLevel.indexOf(node.levelCode) < 0) {
      //     treeNode.selectable = false;
      //   }
      // }

      return treeNode;
    },
    // 点击选中状态
    handlerSelect(ids) {
      if (ids) {
        this.$emit("select", ids);
      }
    },
    handlerClose(ids) {
      this.$emit("close", ids);
    }
  }
};
</script>

<style></style>
