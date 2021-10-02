import axios from 'axios'
// import { Notify } from 'vant';
// import Vue from 'vue'
// import store from '@/store'  // 我此项目没有用到vuex，所以vuex代码的都注释了，需要的自己打开使用

// import {ACCESS_TOKEN} from '@/store/mutation-types'


axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
// 创建 axios 实例
const requests = axios.create({
//   baseURL: process.env.VUE_APP_API, // 基础url,如果是多环境配置这样写，也可以像下面一行的写死。
　baseURL: 'https://tsapi.amap.com/v1',
  timeout: 6000 // 请求超时时间
})



 
// 错误处理函数
const err = (error) => {
    console.log(300,error);
  if (error.response) {
    const data = error.response.data
    if (error.response.status === 403) {
        alert( data.message||data.msg )
    }
    if (error.response.status === 401) {
        alert( '你没有权限。' )
    }
  }
  return Promise.reject(error)
}



// request interceptor(请求拦截器)
requests.interceptors.request.use(config => {
//   const token = Vue.ls.get(ACCESS_TOKEN)
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)



// response interceptor（接收拦截器）
requests.interceptors.response.use((response) => {
    console.log(400,response);
  const res = response.data
  if (res.errcode!==10000) { 
//     Notify({ type: 'danger', message: res.message||res.msg });
    // 401:未登录;
    return res
  } else {
    return res
  }
}, err)



export default requests