<template>
  <div class="userTransfer">
    <el-container style="height:450px">
      <el-aside v-model="collapsed" collapsible class="aside">
        <!-- 组织结构树 -->
        <organiz-tree
          :showLine="true"
          v-if="!collapsed"
          @select="handlerOrganizSelect"
          :typeAndLevel="typeAndLevel"
          :parentCode="parentCode"
          :showRoot="showRoot"
        ></organiz-tree>
      </el-aside>
      <el-main class="main">
        <!-- 系统的穿梭框 -->
        <el-transfer
          ref="userTran"
          :titles="titles"
          class="transfer"
          v-model="targetKeys"
          :disabled="disabled"
          :filter-method="filterOption"
          :filterable="showSearch"
          :button-texts="['到左边', '到右边']"
          :format="{
            noChecked: '${total}',
            hasChecked: '${checked}/${total}'
          }"
          @change="handlerTransferChange"
          :data="pageData.list"
          :props="props"
          :tableData="{
            table: {
              data: [
                {
                  date: '2016-05-02',
                  label: '王小虎1',
                  address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                  date: '2016-05-04',
                  label: '王小虎2',
                  address: '上海市普陀区金沙江路 1517 弄'
                },
                {
                  date: '2016-05-01',
                  label: '王小虎3',
                  address: '上海市普陀区金沙江路 1519 弄'
                },
                {
                  date: '2016-05-03',
                  label: '王小虎4',
                  address: '上海市普陀区金沙江路 1516 弄'
                }
              ]
            },
            columns: [
              {
                prop: 'date',
                label: '日期'
              },
              {
                prop: 'label',
                label: '姓名'
              },
              {
                prop: 'address',
                label: '地址'
              },
            ]
          }"
        >
          <el-pagination
            class="transfer-footer"
            slot="left-footer"
            :hide-on-single-page="true"
            :small="true"
            :pager-count="1"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pageData.page.pageNumber"
            :page-size="pageData.page.pageSize"
            layout="total, prev, pager, next"
            :total="pageData.page.total"
          >
          </el-pagination>
        </el-transfer>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import difference from "lodash/difference";
// import { GetAccounts, GetUserByAccount } from "@/api/sys/user";
import OrganizTree from "@/components/system/OrganizTree";

export default {
  name: "UserTransfer",
  components: {
    OrganizTree
  },
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    },

    // 是否在穿梭框上面显示搜索框
    showSearch: {
      type: Boolean,
      default() {
        return true;
      }
    },
    // 是否在组织树上面显示根节点
    showRoot: {
      type: Boolean,
      default() {
        return false;
      }
    },
    // 组织结构树的类型和等级
    typeAndLevel: {
      type: String,
      required: true
    },
    // 最大允许选择人数
    maxSelectedCount: {
      type: Number,
      default() {
        return 1000;
      }
    },
    // 父级编码
    parentCode: {
      type: String,
      default() {
        return "0";
      }
    },
    // 人员穿梭时显示的标题头
    titles: {
      type: Array,
      default() {
        return ["可选人员", "已选人员"];
      }
    }
  },
  model: "value",
  data() {
    return {
      // 表格数据，人员数据
      datas: [],
      // 过滤后的表格数据
      filterdatas: [],
      // 多例模式下右侧选择项
      targetKeys: [],
      // 是否禁用穿梭
      disabled: false,

      // 默认的组织结构树是否是收缩的
      collapsed: false,

      // 单例模式下的用户选择值
      userSelectedKeys: [],

      // 单选时的属性
      searchKey: "",
      props: {
        key: "id",
        label: "name"
      },
      pageData: {
        params: {
          orgId: "",
          name: ""
        },
        page: {
          pageNumber: 1,
          pageSize: 10,
          total: 0
        },
        list: []
      }
    };
  },
  created() {},
  mounted() {},
  watch: {
    value: {
      handler(newVal) {
        // if (newVal && newVal.length) {
        // this.targetKeys.splice(0);
        //   newVal.forEach(item => {
        //     const index = this.targetKeys.indexOf(item);
        //     if (index < 0) {
        //       this.targetKeys.push(item);
        //     }
        //   });
        // } else {
        //   // this.targetKeys.splice(0);
        // }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions({
      getUser: "sys/boundOrgUser"
    }),
    loadData() {
      this.getUser({
        pageNumber: this.pageData.page.pageNumber,
        pageSize: this.pageData.page.pageSize,
        ...this.pageData.params
      }).then(res => {
        this.pageData.list.splice(0);
        this.pageData.list.push(...res.rows);
        this.pageData.page.total = res.total;
      });
    },
    // 过滤操作
    filterOption(inputValue, item) {
      return item.name.indexOf(inputValue) !== -1;
    },

    // 选择了组织结构
    handlerOrganizSelect(data, e) {
      this.pageData.params.orgId = data.key;

      this.loadData();

      // this.filterOption();
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageData.page.pageNumber = val;

      this.loadData();
    },
    // 穿梭事件发生变更
    handlerTransferChange(targetKeys, direction, moveKeys) {
      // 超出最大可选择人数判断
      if (targetKeys.length > this.maxSelectedCount) {
        this.$message.error(`最多允许选择${this.maxSelectedCount}个人员`);
        return;
      }
      let nodes = [];
      const that = this;
      targetKeys.forEach((value, index) => {
        nodes.push(that.pageData.list.find(m => m.id === value));
      });

      // this.targetKeys = targetKeys;

      this.$emit("input", this.targetKeys);
      this.$emit("change", this.targetKeys, nodes);
    },
    // 清除已选项
    clear() {
      this.targetKeys = [];
      this.userSelectedKeys = [];
    }
  }
};
</script>

<style lang="scss" scoped>
.userTransfer {
  /deep/.transfer {
    text-align: left;
    display: inline-block;
    &,
    .el-transfer-panel,
    .el-checkbox-group {
      height: 100%;
    }
  }
  .transfer-footer {
    height: 40px;
    display: flex;
    align-items: center;
  }
  .aside {
    margin: 0;
    padding: 1px;
  }
  .main {
    margin-left: 30px;
    padding: 1px;
  }
  /deep/.is-with-footer {
    height: calc(100% - 54px);
  }
  /deep/.el-transfer-panel__body {
    height: calc(100% - 54px);
  }
}
</style>
