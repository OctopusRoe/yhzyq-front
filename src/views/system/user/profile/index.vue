<template>
  <div class="app-container">
    <el-row :gutter="20">
        <el-card>
          <div slot="header" class="clearfix">
            <span>修改密码</span>
          </div>
          <el-tabs v-model="activeTab">
              <resetPwd :user="user" />
          </el-tabs>
        </el-card>
    </el-row>
  </div>
</template>

<script>
import userAvatar from "./userAvatar";
import userInfo from "./userInfo";
import resetPwd from "./resetPwd";
import { getUserProfile } from "@/api/system/user";

export default {
  name: "Profile",
  components: { userAvatar, userInfo, resetPwd },
  data() {
    return {
      user: {},
      roleGroup: {},
      postGroup: {},
      activeTab: "resetPwd"
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      getUserProfile().then(response => {
        this.user = response.data;
        this.roleGroup = response.roleGroup;
        this.postGroup = response.postGroup;
      });
    }
  }
};
</script>
