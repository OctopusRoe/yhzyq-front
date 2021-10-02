<template>
  <el-button
    plain
    @click="open">
    右下角
  </el-button>
</template>

<script>
  export default {
    methods: {

      open() {
        this.$notify({
          title: '自定义位置',
          message: '右下角弹出的消息',
          position: 'bottom-right'
        });
      },

    }
  }
</script>