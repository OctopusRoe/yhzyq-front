<!--
 * @Description: 树行选择输入框（更多说明请查看https://www.vue-treeselect.cn/）
 * @Author: 陈偲
 * @Date: 2021-06-10 19:40:04
 * @Params: 
      // 双向绑定的选择的值
      value: {
        type: [Number, String, Object, Array]
      },
      // 是否多选，默认false
      multiple: {
        type: Boolean,
        default: false
      },
      // 是否异步加载，默认false
      async: {
        type: Boolean,
        default: false
      },
      // 是否显示重置值的“×”按钮，默认false
      clearable: {
        type: Boolean,
        default: false
      },
      // 默认展开级别
      defaultExpandLevel: {
        type: Number,
        default: 2
      },
      // 自定义键名
      normalizer: {
        type: Object,
        default() {
          return {
            id: "id",
            label: "name",
            children: "children"
          };
        }
      },
      // 绑定的选择树上的数据，（isDisabled为是否禁止选择）
      data: {
        type: Array,
        default() {
          return [{
            id: 'folder',
            label: 'Normal Folder',
            children: [ {
              id: 'disabled-checked',
              label: 'Checked',
              isDisabled: true,
            }, {
              id: 'disabled-unchecked',
              label: 'Unchecked',
              isDisabled: true,
            }, {
              id: 'item-1',
              label: 'Item',
            }]
        }
      }
 * @Event: 
      @select(ids):选择项更改后触发(包括初始值)
      @close(ids):当选择框关闭时触发
-->
<template>
  <treeselect v-bind="params" v-model="params.value" @close="close" />
</template>
<script>
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "TreeSelect",
  components: { Treeselect },
  props: {
    // 双向绑定的选择的值
    value: {
      type: [Number, String, Object, Array]
    },
    // 是否多选，默认false
    multiple: {
      type: Boolean,
      default: false
    },
    // 是否异步加载，默认false
    async: {
      type: Boolean,
      default: false
    },
    // 是否显示重置值的“×”按钮，默认false
    clearable: {
      type: Boolean,
      default: false
    },
    // 默认展开级别
    defaultExpandLevel: {
      type: Number,
      default: 2
    },
    // 自定义键名
    normalizer: {
      type: Object,
      default() {
        return {
          id: "id",
          label: "name",
          children: "children"
        };
      }
    },
    // 绑定的选择树上的数据
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      params: {
        value: this.$props.value,
        placeholder: "请选择",
        multiple: this.$props.multiple,
        async: this.$props.async,
        clearable: this.$props.clearable,
        defaultExpandLevel: this.$props.defaultExpandLevel,
        retryTitle: "点击重新加载",
        retryText: "重试",
        noResultsText: "没有找到结果",
        options: this.$props.data,
        normalizer: node => {
          return {
            id: node[this.$props.normalizer.id],
            label: node[this.$props.normalizer.label],
            children: node[this.$props.normalizer.children]
          };
        }
      }
    };
  },
  created() {},
  mounted() {},
  watch: {
    // value: {
    "params.value": {
      handler(newVal) {
        this.$emit("select", newVal);
        this.$emit("input", newVal);
        // this.params.value = newVal;
      },
      immediate: true
    },
    data: {
      handler(newVal) {
        this.params.options = newVal;
      },
      deep: true
    }
  },
  methods: {
    close(value) {
      this.$emit("close", value);
    }
    // _filterFun(value, data, node) {
    //   if (!value) return true;
    //   return data.id.indexOf(value) !== -1;
    // },
    // // 树点击
    // _nodeClickFun(data, node, vm) {
    //   console.log("this _nodeClickFun", this.values, data, node);
    //   this.$emit("node-click", this.values, data, node);
    // },
    // // 树过滤
    // _searchFun(value) {
    //   console.log(value, "<--_searchFun");
    //   // 自行判断 是走后台查询，还是前端过滤
    //   this.$refs.treeSelect.filterFun(value);
    //   // 后台查询
    //   // this.$refs.treeSelect.treeDataUpdateFun(treeData);
    // },
    // // 自定义render
    // _renderFun(h, { node, data, store }) {
    //   const { props, clickParent } = this.treeParams;
    //   return (
    //     <span
    //       class={[
    //         "custom-tree-node",
    //         !clickParent && data[props.children] && data[props.children].length
    //           ? "disabled"
    //           : null
    //       ]}
    //     >
    //       <span>{node.label}</span>
    //     </span>
    //   );
    // }
  }
};
</script>
<style lang="scss" scoped>
// .disabled {
//   cursor: no-drop;
// }
// .custom-tree-node {
//   width: calc(100% - 40px);
// }
.vue-treeselect {
  /deep/.vue-treeselect__multi-value-item-container {
    line-height: 21px;
  }
  /deep/.vue-treeselect__input-container {
    line-height: 18px;
  }
}
</style>
