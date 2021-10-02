<template>
  <div>
    <el-tree
      :data="data"
      :props="defaultProps"
      @node-click="handleNodeClick"
      :highlight-current="true"
      v-loading="loading"
      default-expand-all
    >
    </el-tree>
  </div>
</template>

<script>
import { getTreeDatasByConditions } from "@/api/system/org/org";

export default {
  data() {
    return {
      data: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      loading: true
    };
  },
  created() {
    this.getTreeData();
  },
  methods: {
    handleNodeClick(data) {
      this.$emit("orgTreeClick", data.data);
    },
    getTreeData() {
      getTreeDatasByConditions("", "").then(res => {
        res.forEach(item => {
          this.data.push(this.createTree(item));
        });
        this.loading = false;
      });
    },
    createTree(data) {
      let node = { label: data.text, data: data, value: data.id, children: [] };

      if (data.children !== null && data.children.length > 0) {
        data.children.forEach(item => {
          node.children.push(this.createTree(item));
        });
      }

      return node;
    }
  }
};
</script>

<style></style>
