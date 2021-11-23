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
  mounted(){
      resize();
  },
  methods: {}
}
</script>
