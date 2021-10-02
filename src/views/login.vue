<template>
  <div></div>
</template>
<script>
/**
 * 用户统一登录的回调页
 * author:陈偲
 * time:20200730
 */
import { mapActions } from "vuex";
// import { timeFix } from '@/utils/util'
import storage from "store";
import { APP_REDIRECT } from "@/store/mutation-types";
import { param } from "../utils";

export default {
  created() {
    const params = this.$route.query;
    this.validateLogin(params).then(
      () => {
        /**
         * 在此获取用户信息
         * author:陈偲
         * time:20200730
         *
         * {代码}
         *                     *
         */

        // this.$router.push({ name: 'Analysis' }, () => {
        this.$router.push({ path: storage.get(APP_REDIRECT) || "/" }, () => {
          storage.remove(APP_REDIRECT);
          // this.$router.push({ path: '/dashboard/analysis' }, () => {
          this.msgSuccess("欢迎回来");
        });
      },
      e => {
        this.msgError(e.message);
      }
    );
  },
  methods: {
    ...mapActions(["validateLogin"])
  }
};
</script>
