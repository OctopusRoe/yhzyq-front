<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },

}
</script>
<template>
  <el-dropdown placement="bottom-start">
    <div class="button-style">
      {{title}}
      <img src="../assets/images/5.png">
    </div>

    <el-dropdown-menu
      slot="dropdown"
      :append-to-body="false"
    >
      <el-tree
        v-bind="$attrs"
        v-on="$listeners"
      ></el-tree>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<style lang='scss' scoped>
.tree-box {
  width: 227px;
}

.button-style {
  width: 220px;
  height: 49px;
  border: 2px solid #1b8777;
  border-radius: 2px;
  background-color: #1b8777;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ddffff;

  img {
    width: 15px;
    height: 10px;
  }
}
.el-dropdown-menu,
.el-popper,
.el-dropdown-menu--medium {
  background-color: #0a243c;
  width: 220px;
  border: 2px solid #1b8777;
}

::v-deep .el-tree {
  background-color: #0a243c;
  color: #ffffff;
}

::v-deep
  .el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
  background-color: #1b8777 !important;
}
::v-deep .el-tree-node:focus > .el-tree-node__content {
  background-color: #1b8777 !important;
}

::v-deep .el-tree-node__content:hover {
  background-color: #1b8777;
}
::v-deep .el-tree-node__content:active {
  background-color: #1b8777;
}
::v-deep .el-tree-node__content:focus {
  background-color: #1b8777;
}
</style>
