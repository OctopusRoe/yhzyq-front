<template>
  <div class="top">
    <!-- <div class="t">
      <div class="logo">
        <img src="../../assets/image/style1/logo.png" alt="" />
      </div>
      <div class="menu-box">
        <div class="active">
          <div>
          <img src="../../assets/image/style1/icon1.png" alt="" />
          <div>公司平台</div>
          </div>
        </div>
        <div>
           <div>
          <img src="../../assets/image/style1/icon2.png" alt="" />
          <div>项目平台</div>
           </div>
        </div>
        <div>
          <div>
          <img src="../../assets/image/style1/icon3.png" alt="" />
          <div>智慧工地</div>
          </div>
        </div>
        <div>
          <div>
          <img src="../../assets/image/style1/icon4.png" alt="" />
          <div>BIM中心</div>
          </div>
        </div>
        <div>
          <div>
          <img src="../../assets/image/style1/icon5.png" alt="" />
          <div>OA协同</div>
          </div>
        </div>
      </div>
      <div class="right">
        <div>
          <img src="../../assets/image/style1/icon6.png" alt="" /><span
            >通知</span
          >
        </div>
        <div>
          <img src="../../assets/image/style1/icon7.png" alt="" /><span
            >管理员</span
          ><img src="../../assets/image/style1/icon8.png" alt="" />
        </div>
      </div>
    </div>
    <div class="b">
      <div>
        <span>首页</span><span class="active">投资控制</span
        ><span>进度控制</span><span>质量管控</span><span>安全管控</span
        ><span>综合管控</span>
      </div>
    </div> -->

    <Topmenu />
    <!--  <div class="right">
      <span>当前项目</span>
      <v-select
        class="style-chooser"
        :options="[
          { type: '在建', title: '吉康高速项目' },
          { type: '完成', title: '吉康高速项目1' },
          { type: '拟建', title: '吉康高速项目2' },
        ]"
        label="title"
      >
        <template v-slot:option="option">
          <span
            v-if="option.type === '在建'"
            style="
              padding: 2px 3px;
              background: rgba(174, 63, 201, 0.2);
              color: rgb(174, 63, 201);
            "
            >{{ option.type }}</span
          >
          <span
            v-else-if="option.type === '完成'"
            style="
              padding: 2px 3px;
              background: rgba(69, 203, 151, 0.2);
              color: rgb(69, 203, 151);
            "
            >{{ option.type }}</span
          >
          <span
            v-else-if="option.type === '拟建'"
            style="
              padding: 2px 3px;
              background: rgba(240, 169, 58, 0.2);
              color: rgb(240, 169, 58);
            "
            >{{ option.type }}</span
          >
          {{ option.title }}
        </template>
      </v-select>
      <div class="msgcenter">
        <div>
          <img src="../../assets/image/icon-msg.png" alt="" />
        </div>
        <div>
          <img src="../../assets/image/avatar.png" alt="" />
        </div>
        <div>
          <span @click="set">张三</span>
                <div v-show="setShowFlag">-->
    <!--            <ul class="select-box">-->
    <!--              <li @click="updatePassDialog = true; setShowFlag = false;"> 修改密码</li>-->
    <!--              <li @click="  photoSetDialog = true;  setShowFlag = false; "> 基本设置</li>-->
    <!--              <li>退出登录</li>-->
    <!--            </ul>-->
    <!--            <div class="select-bg" @click="hideSet"></div>-->
    <!--          </div>-->
    <!-- </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import RightPanel from "@/components/common/RightPanel";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Topmenu from "../components/Sidebar/top-menu";

export default {
  name: "TopTitle",
  components: { vSelect, Topmenu },
  data() {
    return {
      setShowFlag: false,
      leftTreeData: []
    };
  },

  methods: {
    set() {
      this.setShowFlag = true;
    },
    hideSet() {
      this.setShowFlag = false;
    }
  }
};
</script>

<style lang="scss">
@font-face {
  font-family: font1;
  src: url("~@/assets/image/style1/font1.ttf");
}
.top {
  // box-shadow: 0px 0px 5px 5px #bbbabaad;
  border-bottom: 1px solid #cdcdcd;
  position: relative;
  z-index: 99;
  * {
    user-select: none;
  }
  > div {
    width: 100%;
  }
  .t {
    background-color: #3788fd;
    padding: 0 2%;
    height: 51px;
    width: 100%;
    position: relative;
    .logo {
      display: flex;
      align-items: center;
      float: left;
      height: 100%;
      img {
        height: 36px;
        width: auto;
        vertical-align: middle;
      }
      span {
        color: #fff;
        font-size: 20px;
        vertical-align: middle;
        margin-left: 10px;
        font-weight: bold;
        font-family: font1;
        margin-top: 3px;
      }
    }
    .menu-box {
      display: flex;
      width: 880px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 0;
      > div {
        position: relative;
        overflow: hidden;
        width: 100%;
        display: flex;
        > div {
          display: flex;
          transition: all 0.3s;
        }
      }
      .prev {
        position: absolute;
        left: -20px;
        top: 50%;
        cursor: pointer;
        transform: translateY(-50%);
      }
      .next {
        position: absolute;
        right: -20px;
        top: 50%;
        cursor: pointer;
        transform: translateY(-50%);
      }
    }
    .right {
      top: 0;
      height: 100%;
      display: flex;
      align-items: center;
      img {
        vertical-align: middle;
        display: inline-block;
      }
      > div {
        margin: 0 15px;
        cursor: pointer;
        position: relative;
        span {
          margin: 0 5px;
          vertical-align: middle;
          font-size: 14px;
        }
        i {
          color: #fff;
          background-color: #ff0000;
          padding: 2px 6px;
          font-style: normal;
          border-radius: 5px;
          font-size: 12px;
          position: absolute;
          line-height: 1;
          margin-right: -20px;
          margin-top: -8px;
          top: 0;
          right: 0;
        }
      }
    }
    .child-menu {
      position: absolute;
      top: 100%;
      left: 0;
      white-space: nowrap;
      width: 100%;
      > span {
        display: inline-block;
        text-align: center;
        width: 88px;
        font-size: 16px;
        cursor: pointer;
      }
      span.active {
        color: #1762d6;
        border-bottom: 2px solid #1762d6;
      }
    }
  }
  .b {
    height: 39px;
  }
}

.menu-box {
  height: 100%;
  /* display: flex;
  flex: auto;
  position: absolute;

  left: 50%;
  transform: translateX(-50%);*/
  > div {
    > div {
      > div {
        cursor: pointer;
        border-top: 2px solid transparent;
        color: #fff;
        text-align: center;
        height: 100%;
        > div {
          width: 88px;
          font-size: 14px;
        }
        display: flex;
        align-items: center;
        .svg-icon {
          font-size: 26px;
          height: 36px;
          fill: currentColor;
          color: #fff;
        }
      }
    }
  }
  > div > div > div.active {
    background-color: #0e5ab3;
    color: #fff;
  }
}
</style>
