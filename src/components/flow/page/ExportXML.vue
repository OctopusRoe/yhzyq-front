<template>
  <el-dialog :title="title" :visible.sync="isExport" width="50%" append-to-body>
    <pre v-highlightjs="xml"><code class="xml"></code></pre>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      xml: "",
      task:"",
      title:"导出xml",
      isExport:false
    };
  },
  methods: {
    exportXML() {
      let canvas = this.$store.state.canvas;
      this.xml = canvas.toXML();
    },
    showModal() {
      this.isExport = true;
      this.exportXML();
    }
  }
};
</script>
