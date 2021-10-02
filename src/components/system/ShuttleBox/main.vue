<template>
  <div>
    <shuttleBox
      :isShowDateList="isShowDateList"
      :needClear="ifNeedClear"
      :only="keyValue"
      :tHeight="tableHeight"
      :rWidth="rtWidth"
      :lWidth="ltWidth"
      :lTableHeaderList="lTableHeader"
      :rTableHeaderList="rTableHeader"
      :conTableShow="tableShowName"
      @curCheckedShuttleDates="checkedShuttleDates"
      :pageParams="pageParams"
      @size-page-change="handleSizeChange"
      @current-page-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import shuttleBox from "./src/index";
export default {
  name: "shuttleTable",
  props: {
    originShuttleDate: {
      type: Array,
      default: () => {
        return [];
      }
    },
    ifNeedClear: {
      type: Boolean,
      default: false
    },
    keyValue: {
      type: String,
      default: () => {
        return "";
      }
    },
    tableHeight: {
      type: String,
      default: () => {
        return "";
      }
    },
    rtWidth: {
      type: String,
      default: () => {
        return "";
      }
    },
    ltWidth: {
      type: String,
      default: () => {
        return "";
      }
    },
    lTableHeader: {
      type: Array,
      default: () => {
        return [];
      }
    },
    rTableHeader: {
      type: Array,
      default: () => {
        return [];
      }
    },
    tableShowName: {
      type: Object,
      default: () => {
        return {};
      }
    },
    // 分页参数
    pageParams: {
      // 是否启用列表滚动加载
      type: Object,
      default() {
        return {
          currentPage: 1,
          pageSize: 10,
          total: 0
        };
      }
    }
  },
  data() {
    return {
      isShowDateList: []
    };
  },
  created() {
    this.isShowDateList = this.originShuttleDate;
  },
  components: {
    shuttleBox
  },
  watch: {
    originShuttleDate: {
      handler() {
        this.isShowDateList.splice(0);
        this.isShowDateList.push(...this.originShuttleDate);

        // this.isShowDateList = this.originShuttleDate;
      },
      deep: true
    }
  },
  methods: {
    // 穿梭框选中的数组
    checkedShuttleDates(arr) {
      this.$emit("change", arr);
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.$emit("size-page-change", val);
    },
    handleCurrentChange(val) {
      this.$emit("current-page-change", val);
    }
  }
};
</script>

<style lang="scss" scoped></style>
