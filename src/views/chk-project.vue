<template>
  <div class="___container-chk-project">
    <h1 class="title">请选择项目</h1>
    <div
      :class="{
        'chk-project-grid': true,
        'chk-project-grid-more': userOrgList.length > 5
      }"
    >
      <el-card
        shadow="hover"
        class="single-grid"
        v-for="(item, index) of userOrgList"
        :key="index"
        @click.native="clickItem(item)"
        :class="{ click: index === chkIndex }"
      >
        <i class="el-icon-s-marketing icon-size"></i>
        <br />
        <label class="font">{{ item.name }}</label>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "chkProject",
  created() {
    // if (
    //   this.$store.getters.userOrgList &&
    //   this.$store.getters.userOrgList.length === 1
    // ) {
    //   this.clickItem(this.$store.getters.userOrgList[0]);
    // } else if (this.chkIndex >= 0) {
    //   this.clickItem(this.chkIndex);
    // }
  },
  mounted() {
    // console.log("store.getters.chk-project", this.$store.getters.userOrgList);
  },
  computed: {
    userOrgList() {
      return this.$store.getters.userOrgList;
    },
    chkIndex() {
      return this.$store.getters.userCheckedOrgIndex;
    }
  },
  methods: {
    clickItem(i) {
      this.$store.commit("SET_CHECKED_ORG", i);

      // 跳转
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style lang="less" scoped>
.___container-chk-project {
  width: 100%;
  min-height: 100%;
  background: #f0f2f5 url(~@/assets/image/background.svg) no-repeat fixed 50%;
  background-size: 100%;
  padding: 80px 0 144px;
  position: relative;

  .title {
    text-align: center;
  }

  .chk-project-grid {
    display: flex;
    justify-content: space-around;

    margin: 40px auto;
    .single-grid {
      * {
        cursor: pointer;
      }
      cursor: pointer;
      text-align: center;
      background: transparent;
      .font {
        font-size: 16px;
      }
      &.click {
        background: #bacad9;
      }
    }

    .header-icon {
      font-size: 50px;
    }
    width: 600px;
    height: auto;
  }

  .chk-project-grid-more {
    display: grid;
    width: 700px;

    // grid-template-columns: 200px 100px 100px;
    // grid-gap: 10px;
    // // grid-row-gap: 10px;
    // // grid-template-rows: 200px 100px 100px;
    // grid-auto-flow: row dense;

    grid-row-gap: 10px;
    grid-column-gap: 10px;
    grid-template-columns: repeat(4, 150px);
    // grid-template-rows: 100px;
    grid-auto-flow: row dense;
    // grid-auto-rows: 100px;
    // place-items: center;
    place-content: start center;
    justify-content: center;
    & > div:nth-child(1) {
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 1;
      grid-row-end: 3;
      .font {
        font-size: 30px;
      }

      .header-icon {
        font-size: 100px;
      }
    }
  }
  .icon-size {
    font-size: 30px;
  }
}
</style>
