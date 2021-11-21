<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import {login, tokenValidate} from "@/api/login";
import qs from "qs";
import store from "@/store";
import {mapActions} from "vuex";

export default  {
  name:  'App',
 async created() {
    const { code, obj } = await tokenValidate({ loginToken: 'CCD217A5C914A950716F7625545DA06E37F9340CEB92AB06CDE76E7AB0999711371BE94B931EEEF528BFEFE335043C180509D8BF67B20EC3DFCDA1AB7B995F3ADA030201225EAEE13AD9D201C531CDB215052699F9B036E320A704B11FA69DDB0433F24DD3F0F801A36A6BD0F4D9B357' })
    if (code === '200') {
      await this.setLocalToken(obj)
    } else {
      window.location = `https://yh.jxgsgl.com:6443/portal/v1/ssologin?redirect_url=${to.path}`
    }
  },
  mounted(){
      resize();
  },
  methods: {
    ...mapActions(["validateLogin"]),
    /**
     * 设置本地 token
     */
    async setLocalToken (obj) {
      let qs = require('qs')
      const info = {
        loginName: obj.USER_NAME,
        passWord: 'Zhzyq#2021',
        redirect_uri: process.env.VUE_APP_SSO_REDIRECT_URL,
        client_id: process.env.VUE_APP_SSO_CLIENT_ID
      }
      const { data } = await login(qs.stringify(info))
      this.validateLogin({
        token: data.token
      }).then(() => {
        this.$router.push({ path: '/bigScreen' }, () => {
          this.msgSuccess("欢迎回来");
        });
      })
    }
  }
}
</script>
