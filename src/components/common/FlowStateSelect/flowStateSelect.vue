<template>
  <el-select v-model="currentState" placeholder="请选择" @change="exchange">
    <el-option
      v-for="state in states"
      :key="state.value"
      :label="state.name"
      :value="state.value"
    >
    </el-option>
  </el-select>
</template>

<script>
let states = [
  { name: "全部", value: "" },
  { name: "未开始", value: "1" },
  { name: "进行中", value: "2" },
  { name: "已结束", value: "3" }
];

export default {
  data() {
    return {
      states,
      currentState: ""
    };
  },
  methods: {
    exchange() {
      this.$emit("input", this.currentState);
    }
  }
};
</script>

<style></style>
