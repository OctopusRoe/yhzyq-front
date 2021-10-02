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
import { 
  getDictTypeTreeData,
  
} from "@/api/system/newDict";



export default {

  data() {
    return {
      data: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      loading: true,
      current:[],
    };
  },
  
  created() {
    this.getTreeData();
  },
  methods: {
    handleNodeClick(data,node) {

      this.$emit("dictTreeClick", data,node);

    },

    getTreeData() {
      this.data = []
      getDictTypeTreeData("", "").then(res => {
        console.log(res);
        res.forEach(el => {
          let children = []
          if(el.children !== undefined){
            el.children.forEach(item => {
            children.push({ label: item.text, data: item, value: item.id, children: [],categoryId:el.id})
          })
          }
          
          this.data.push({ label: el.text, data: el, value: el.id, children: children, });
        });
        this.loading = false;

      });
    },
    
  }
};
</script>

<style></style>
