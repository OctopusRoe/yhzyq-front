<template>
  <div>
    <el-tree
      :data="data"
      :props="defaultProps"
      @node-click="handleNodeClick"
      :highlight-current="true"
      v-loading="loading"
    >
    </el-tree>
  </div>
</template>

<script>
import { getExtConfigTreeData } from "@/api/system/extConfig/index";

export default {
  data() {
    return {
      data: [],
      //扩展属性通用分类
      pCode: "EXT_PROP",
      defaultProps: {
        children: "children",
        label: "label"
      },
      //扩展配置类型
      config: "config",
      //通用分类
      common: "common",
      loading: true,
      current: []
    };
  },

  created() {
    this.getTreeData();
  },
  methods: {
    handleNodeClick(data, node) {
      this.$emit("typeTreeClick", data, node);
    },

    getTreeData() {
      this.data = [];
      getExtConfigTreeData(this.pCode).then(res => {
        if (res && res.success) {
          res.data.forEach(el => {
            let children = [];
            if (el.children !== undefined) {
              el.children.forEach(item => {
                children.push({
                  label: item.name,
                  data: item,
                  value: item.id,
                  children: [],
                  type: this.config
                });
              });
            }

            this.data.push({
              label: el.typename,
              data: el,
              value: el.id,
              type: this.common,
              children: children
            });
          });
        }

        this.loading = false;
      });
    }
  }
};
</script>

<style></style>
