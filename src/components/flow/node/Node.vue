<template>
  <el-row class="bg-purple" align="middle" :data-model="model">
    <el-col :span="4" class="grid-content">
      <img :src="ico" />
    </el-col>
    <el-col :span="20" class="grid-content">
      {{ label }}
    </el-col>
  </el-row>
</template>
<script>
  export default {
    data() {
      return {};
    },
    props: {
      label: {
        type: String,
        default: ""
      },
      ico: {
        type: String,
        default: ""
      },
      model: {
        type: String,
        default: ""
      }
    }
  };
</script>
<style lang="less">
  .el-row {
    margin: 1rem;
  }
  .bg-purple {
    cursor: pointer;
    border-radius: 4px;
    background: #409eff;
    // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    padding-left: 1rem;
    line-height: 35px;
    display: flex;
    align-items: center;
  }
  .grid-content {
    text-align: left;
    color: white;
    align-items: center;
  }
</style>
