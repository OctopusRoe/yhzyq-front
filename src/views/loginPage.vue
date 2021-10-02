<template>
  <div id="app">
    <div class="container">
      <div class="login-top">
        <img src="@/assets/image/login/images/loginLogo.png" alt="" />
      </div>

      <div class="login-con">
        <img src="@/assets/image/login/images/loginBg.jpg" alt="" />
        <div class="input-box">
          <div class="title">
            <span>用户登录</span>
            <span>Login</span>
          </div>
          <div class="inputlist">
            <div class="int-row">
              <input type="text" placeholder="请输入用户名" v-model="loginName" class="int" />
              <span class="icon-user"></span>
            </div>
            <div class="int-row">
              <input type="password" placeholder="请输入密码" v-model="passWord" class="int" />
              <span class="icon-psw"></span>
            </div>
          </div>
          <div class="remember-box">
            <input type="checkbox" v-model="passwordChecked" />
            <span>记住密码</span>
          </div>
          <div class="btn-box">
            <input type="button" @click="handleLogin" value="登录" />
          </div>
          <div class="other-title">
            <span>其他登录方式</span>
          </div>
          <div v-if="loginMethod === '扫码登录'" class="ewm-box" id="ewm-box" @click="showQRcode()">
            <img :src="loginImg" alt="" /><span>{{ loginMethod }}</span>
          </div>
          <div v-else class="ewm-box" id="ewm-box" @click="hideQRcode()">
            <img :src="loginImg" alt="" /><span>{{ loginMethod }}</span>
          </div>
          <div class="QRcode" id="QRcode" :style="{ display: display }">
            <img :src="qrcode" style="width: 200" />
          </div>
        </div>
      </div>
      <div class="word">
        <span>版权所有：江西省高速公路投资集团有限责任公司</span>
      </div>
    </div>
  </div>
</template>

<script>
import { login, landCode, findQrcodeLandDetail } from '@/api/login'

const config = {
  // authority: 'http://192.168.1.218:5003/',
  // client_id: '08d67a0e-522f-50c5-045b-9d4638111118',
  // redirect_uri: 'http://localhost:778/OAuthPage.aspx',
  // response_type: 'token',
  // scope: 'API_AQ'

  base_url: process.env.VUE_APP_SSO_BASE_API,
  client_id: process.env.VUE_APP_SSO_CLIENT_ID,
  redirect_uri: process.env.VUE_APP_SSO_REDIRECT_URL
}

export default {
  data() {
    return {
      loginMethod: '扫码登录',
      loginImg: require('@/assets/image/login/images/icon-ewm.png'),
      display: 'none',
      loginName: '',
      passWord: '',
      passwordChecked: false,
      qrcode: '',
      stop: undefined
    }
  },
  created() {
    let token = this.$store.state.user.token
    if(token) {
      this.$router.push({path: '/'})
    }
  },
  mounted() {
    this.getCookie()
    if (this.loginName && this.passWord) {
      this.passwordChecked = true
    }
  },
  methods: {
    guid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    },
    resize() {
      var ratioX = document.body.clientWidth / 1920
      var ratioY = document.body.clientHeight / 960
      document.getElementById('app').style.transform = 'scale(' + ratioX + ',' + ratioY + ')'
    },
    showQRcode() {
      this.loginMethod = '账号登录'
      let key = this.guid()
      landCode({ key }).then((res) => {
        this.qrcode = window.URL.createObjectURL(res)
      })
      this.stop = setInterval(() => {
        findQrcodeLandDetail(key).then((res) => {
          if (res.data) {
            window.location = `${this.$route.query.rurl}?token=${res.data.token}`
          }
        })
      }, 3000)
      this.loginImg = require('@/assets/image/login/images/icon-zh.png')
      this.display = 'block'
    },
    hideQRcode() {
      clearInterval(this.stop)
      this.loginMethod = '扫码登录'
      this.loginImg = require('@/assets/image/login/images/icon-ewm.png')
      this.display = 'none'
    },
    handleLogin() {
      let data = {
        loginName: this.loginName,
        passWord: this.passWord,
        redirect_uri: this.$route.query.rurl,
        client_id: this.$route.query.cid
      }
      let qs = require('qs')
      let info = qs.stringify(data)
      login(info).then((res) => {
        if (this.passwordChecked) {
          this.setCookie(this.loginName, this.passWord, 7)
        } else {
          this.clearCookie()
        }
        window.location = `${res.data.redirect_uri}?token=${res.data.token}`
      })
    },
    clearCookie() {
      this.setCookie('', '', -1)
    },
    // 设置cookie
    setCookie(loginName, passWord, day) {
      // 保存时间
      let exdate = new Date()
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * day)
      // 字符串拼接cookie
      window.document.cookie = 'loginName' + '=' + loginName + ';path=/;expires=' + exdate.toGMTString()
      window.document.cookie = 'passWord' + '=' + passWord + ';path=/;expires=' + exdate.toGMTString()
    },
    // 获取cookie
    getCookie() {
      if (document.cookie.length > 0) {
        let arr = document.cookie.split('; ')
        for (let i = 0; i < arr.length; i++) {
          let arr2 = arr[i].split('=')
          //判断查找相对应的值
          if (arr2[0] == 'loginName') {
            this.loginName = arr2[1]
          } else if (arr2[0] == 'passWord') {
            this.passWord = arr2[1]
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'icomoon';
  src: url('../assets/image/login/icons.ttf') format('truetype'),
    url('../assets/image/login/icons.woff?') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: block; /*css 初始化 */
  body {
    font-family: Microsoft YaHei, Arial, '\5b8b\4f53';
  }
  html,
  body {
    height: 100%;
  }
  html,
  body,
  ul,
  li,
  ol,
  dl,
  dd,
  dt,
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  form,
  fieldset,
  legend,
  img {
    margin: 0;
    padding: 0;
  }

  ul,
  ol {
    list-style: none;
  }
  a {
    color: #fff;
    text-decoration: none;
  }
  img {
    border: 0;
    vertical-align: middle; /*  去掉图片底部默认的3像素空白缝隙*/
  }
  #app {
    width: 1920px;
    height: 960px !important;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    -webkit-transform-origin: left top;
    transform-origin: left top;
    z-index: 999;
  }
  .login-top {
    padding: 1.5625% 3.125%;
  }
  .login-top img {
    width: 32.8125%;
  }

  .login-con {
    width: 100%;
    position: relative;
  }
  .login-con img {
    width: 100%;
  }
  .login-con .input-box {
    width: 19.7916666667%;
    position: absolute;
    right: 10%;
    top: 0;
    margin-top: 4.6875%;
    border-radius: 10px;
    overflow: hidden;
    background-color: #fff;
  }
  .login-con .input-box .title {
    background-color: #0753c5;
    padding: 3% 7%;
  }
  .login-con .input-box .title span:first-child {
    color: #fff;
  }
  .login-con .input-box .title span:last-child {
    color: #a5b6e3;
    margin-left: 10px;
  }
  .login-con .input-box .inputlist {
    padding: 7% 7% 0 7%;
  }
  .login-con .input-box .inputlist > div {
    margin-bottom: 5%;
  }

  .login-con .input-box .inputlist > div:last-child {
    margin-bottom: 2%;
  }
  .login-con .input-box .remember-box {
    padding: 0 7% 0% 7%;
  }
  .login-con .input-box .remember-box span {
    color: #ccc;
  }
  .login-con .input-box .other-title {
    padding: 3% 0 3% 0;
    text-align: center;
    position: relative;
    border-bottom: 1px solid #ccc;
    margin: 0 7%;
  }
  .login-con .input-box .other-title span {
    color: #5f5f5f;
    position: absolute;
    padding: 0 10px;
    left: 50%;
    background-color: #fff;
    transform: translateX(-50%);
  }
  .login-con .input-box .ewm-box {
    text-align: center;
    border: 1px solid #ccc;
    margin: 8% auto;
    width: 40%;
    border-radius: 5px;
    padding: 1%;
    cursor: pointer;
  }
  .login-con .input-box .ewm-box img {
    width: 20%;
    vertical-align: middle;
    margin-right: 10%;
    margin-top: 2%;
    margin-bottom: 2%;
  }
  .login-con .input-box .ewm-box span {
    color: #388cfc;
  }
  .login-con .input-box .btn-box {
    text-align: center;
    padding: 0 8%;
    margin-top: 5%;
  }
  .login-con .input-box .btn-box input {
    background-color: #0753c5;
    color: #fff;
    border-radius: 5px;
    border: 0;
    width: 100%;
    outline: none;
    padding: 4% 0;
    font-size: 100%;
  }

  .word {
    text-align: center;
    padding-top: 1.5625%;
  }
  .word span {
    margin: 0 1.5625%;
    color: #3d3d3d;
  }
  .int-row {
    position: relative;
  }
  .int {
    height: 36px;
    line-height: 36px;
    padding-left: 30px;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    outline: none;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
  }
  .int:focus {
    outline: none;
    border-color: #1890ff;
  }
  .icon-user,
  .icon-psw {
    position: absolute;
    left: 5px;
    top: 8px;
    color: #c0c4cc;
  }
  .remember-box span {
    color: #ccc;
    font-size: 14px;
  }
  .QRcode {
    position: absolute;
    top: 15%;
    left: 7%;
    right: 7%;
    bottom: 20%;
    background: #fff;
    text-align: center;
    display: none;
  }
  .QRcode img {
    width: 70%;
    margin-top: 2%;
  }
  @media screen and (max-width: 375px) {
    body {
      background-color: #f2f2f2;
    }
    #app {
      width: auto;
      height: 100% !important;
      transform: scale(1) !important;
    }
    .login-top {
      padding: 5% 8%;
      background-color: #fff;
    }
    .login-top img {
      width: 80%;
    }
    .login-con .input-box {
      padding-bottom: 6%;
      margin-top: 30%;
    }
    .login-con .input-box {
      width: 80%;
    }
    .other-title,
    .ewm-box {
      display: none;
    }
    .login-con > img {
      display: none;
    }
    .word {
      position: fixed;
      bottom: 5%;
      width: 100%;
      font-size: 12px;
    }
  }
}

[class^='icon-'],
[class*=' icon-'] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'icomoon' !important;
  speak: never;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-user:before {
  content: '\E6E3';
}
.icon-psw::before {
  content: '\e6e5';
}
/*css 初始化 */
body {
  font-family: Microsoft YaHei, Arial, '\5b8b\4f53';
}
html,
body {
  height: 100%;
}
html,
body,
ul,
li,
ol,
dl,
dd,
dt,
p,
h1,
h2,
h3,
h4,
h5,
h6,
form,
fieldset,
legend,
img {
  margin: 0;
  padding: 0;
}

ul,
ol {
  list-style: none;
}
a {
  color: #fff;
  text-decoration: none;
}
img {
  border: 0;
  vertical-align: middle; /*  去掉图片底部默认的3像素空白缝隙*/
}
#app {
  width: 1920px;
  height: 960px !important;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  -webkit-transform-origin: left top;
  transform-origin: left top;
  z-index: 999;
}
.login-top {
  padding: 1.5625% 3.125%;
}
.login-top img {
  width: 32.8125%;
}

.login-con {
  width: 100%;
  position: relative;
}
.login-con img {
  width: 100%;
}
.login-con .input-box {
  width: 19.7916666667%;
  position: absolute;
  right: 10%;
  top: 0;
  margin-top: 4.6875%;
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
}
.login-con .input-box .title {
  background-color: #0753c5;
  padding: 3% 7%;
}
.login-con .input-box .title span:first-child {
  color: #fff;
}
.login-con .input-box .title span:last-child {
  color: #a5b6e3;
  margin-left: 10px;
}
.login-con .input-box .inputlist {
  padding: 7% 7% 0 7%;
}
.login-con .input-box .inputlist > div {
  margin-bottom: 5%;
}

.login-con .input-box .inputlist > div:last-child {
  margin-bottom: 2%;
}
.login-con .input-box .remember-box {
  padding: 0 7% 0% 7%;
}
.login-con .input-box .remember-box span {
  color: #ccc;
}
.login-con .input-box .other-title {
  padding: 3% 0 3% 0;
  text-align: center;
  position: relative;
  border-bottom: 1px solid #ccc;
  margin: 0 7%;
}
.login-con .input-box .other-title span {
  color: #5f5f5f;
  position: absolute;
  padding: 0 10px;
  left: 50%;
  background-color: #fff;
  transform: translateX(-50%);
}
.login-con .input-box .ewm-box {
  text-align: center;
  border: 1px solid #ccc;
  margin: 8% auto;
  width: 40%;
  border-radius: 5px;
  padding: 1%;
  cursor: pointer;
}
.login-con .input-box .ewm-box img {
  width: 20%;
  vertical-align: middle;
  margin-right: 10%;
  margin-top: 2%;
  margin-bottom: 2%;
}
.login-con .input-box .ewm-box span {
  color: #388cfc;
}
.login-con .input-box .btn-box {
  text-align: center;
  padding: 0 8%;
  margin-top: 5%;
}
.login-con .input-box .btn-box input {
  background-color: #0753c5;
  color: #fff;
  border-radius: 5px;
  border: 0;
  width: 100%;
  outline: none;
  padding: 4% 0;
  font-size: 100%;
}

.word {
  text-align: center;
  padding-top: 1.5625%;
}
.word span {
  margin: 0 1.5625%;
  color: #3d3d3d;
}
.int-row {
  position: relative;
}
.int {
  height: 36px;
  line-height: 36px;
  padding-left: 30px;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  outline: none;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
.int:focus {
  outline: none;
  border-color: #1890ff;
}
.icon-user,
.icon-psw {
  position: absolute;
  left: 5px;
  top: 8px;
  color: #c0c4cc;
}
.remember-box span {
  color: #ccc;
  font-size: 14px;
}
.QRcode {
  position: absolute;
  top: 15%;
  left: 7%;
  right: 7%;
  bottom: 20%;
  background: #fff;
  text-align: center;
  display: none;
}
.QRcode img {
  width: 70%;
  margin-top: 2%;
}
@media screen and (max-width: 375px) {
  body {
    background-color: #f2f2f2;
  }
  #app {
    width: auto;
    height: 100% !important;
    transform: scale(1) !important;
  }
  .login-top {
    padding: 5% 8%;
    background-color: #fff;
  }
  .login-top img {
    width: 80%;
  }
  .login-con .input-box {
    padding-bottom: 6%;
    margin-top: 30%;
  }
  .login-con .input-box {
    width: 80%;
  }
  .other-title,
  .ewm-box {
    display: none;
  }
  .login-con > img {
    display: none;
  }
  .word {
    position: fixed;
    bottom: 5%;
    width: 100%;
    font-size: 12px;
  }
}
</style>
