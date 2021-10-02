<template>
  <div>
    <el-tree :data="treeData" :props="defaultProps" default-expand-all @node-click="handleNodeClick"
             @node-contextmenu="handleRightClick"></el-tree>
  </div>


</template>

<script>
  export default {
    name: "componentsTree",
    props: {
      treeData: {
        type: Array
      },
      defaultProps:{}
    },
    data() {
      return {

      }
    },
    methods: {

      /**
       * 右键
       */
      handleRightClick(e, data, node, comp) {
        this.$emit('handleRightClick', data);
      },

      /**
       * 单击
       */
      handleNodeClick() {
        this.$emit('handleNodeClick', data);
      }
    }

  }
</script>

<style scoped>

</style>
