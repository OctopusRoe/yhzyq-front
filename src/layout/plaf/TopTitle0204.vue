<template>
  <div class="top">
    <div class="logowrap">
      <div><img src="../../assets/image/logo.png" alt="" /></div>
      <h1 title="项目建设数字化管控平台">项目建设数字化管控平台</h1>
    </div>
    <Topmenu />
    <div class="right">
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
          <!--          <div v-show="setShowFlag">-->
          <!--            <ul class="select-box">-->
          <!--              <li @click="updatePassDialog = true; setShowFlag = false;"> 修改密码</li>-->
          <!--              <li @click="  photoSetDialog = true;  setShowFlag = false; "> 基本设置</li>-->
          <!--              <li>退出登录</li>-->
          <!--            </ul>-->
          <!--            <div class="select-bg" @click="hideSet"></div>-->
          <!--          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RightPanel from "@/components/common/RightPanel";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { Topmenu } from "../components";

export default {
  name: "TopTitle",
  components: { vSelect, Topmenu },
  data() {
    return {
      setShowFlag: false,
      leftTreeData: [],
    };
  },

  methods: {
    set() {
      this.setShowFlag = true;
    },
    hideSet() {
      this.setShowFlag = false;
    },
  },
};
</script>

<style lang="scss">
.top {
  .right {
    position: absolute;
    padding-right: 20px;
    right: 0;
    height: 53px;
    display: flex;
    align-items: center;

    #vs2__combobox {
      border: 1px solid #fff !important;
    }

    > span {
      color: #fff;
      display: inline-block;
      background-color: #1867be;
      padding: 3px 5px;
      margin-right: 10px;
      border: 0;
    }

    > div {
      display: inline-block;

      span {
        color: #fff;
      }

      .vs__clear {
        display: none;
      }
    }

    .vs__dropdown-toggle {
      border: 1px solid #fff;
    }

    .vs__open-indicator {
      fill: rgba(255, 255, 255, 0.9);
    }

    .msgcenter {
      display: flex;
      align-items: center;
      height: 100%;
      margin-left: 60px;
      margin-right: 10px;

      > div {
        img {
          display: block;
        }

        margin-left: 10px;
      }

      > div:first-child {
        img {
          height: 2.6vh;
          width: auto;
        }
      }

      > div:nth-child(2) {
        img {
          height: 5vh;
          width: auto;
        }
      }

      > div:nth-child(3) {
        margin-left: 10px;
        font-size: 16px;
        cursor: pointer;
        color: #fff;
        position: relative;

        > span {
          font-size: 14px;
        }

        .select-bg {
          position: fixed;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          z-index: 98;
        }

        .select-box {
          position: absolute;
          list-style-type: none;
          background: #fff;
          z-index: 99;
          right: 0;
          top: 158%;
          color: #333;
          white-space: nowrap;
          padding: 5px 0;
          box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
            0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);

          li {
            padding: 5px 10px;
            font-size: 14px;
          }

          li:hover {
            background: #e8e8ee;
          }
        }
      }
    }
  }
}
.logowrap {
  display: flex;
  align-items: center;
  padding: 10px 0;
  > div {
    img {
      margin-right: 14px;
      height: 100%;
      width: auto;
      margin-left: 20px;
    }
  }
  h1 {
    color: #fff;
    margin: 0 20px;
    font-size: 21px;
  }
}
</style>
