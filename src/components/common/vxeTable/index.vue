<!--
 * @description: 表格-分页-删除
 * @author: 谭志顺
 * @time:
 * @params:
 * @event:
 * 组件参考地址 ：https://xuliangzhan_admin.gitee.io/vxe-table/#/table/grid/fullEdit
-->
<template>
  <div>
    <div class="money-box" :style="{ display: isVisibleSelect }">
      <div style="margin: 15 8;width: 100%">
        <span>已选择{{ selectCount }}行</span>
        <span type="span" style="margin-left: 30px;">
          <slot></slot>
        </span>
      </div>
      <div>
        <vxe-button
          status="danger"
          @click="getRemoveEvent"
          content="删除"
          style="float: right;marginTop:10px"
          size="mini"
          :style="{ display: isVisibleVatchDelete }"
        ></vxe-button>
      </div>
    </div>
    <vxe-grid
      size="mini"
      ref="xGrid"
      v-bind="gridOptions"
      :highlight-hover-row="highlightHoverRow"
      :highlight-current-row="highlightCurrentRow"
      @checkbox-change="getSelect"
      @checkbox-all="getSelect"
      @current-change="currentChangeEvent"
      :data="tableData"
      show-overflow
      :auto-resize="autoResize"
    >
      <template #pager>
        <vxe-pager
          :style="{ display: isShowPagination }"
          :tree-config="{ children: 'children' }"
          border
          :layouts="[
            'PrevJump',
            'PrevPage',
            'Number',
            'NextPage',
            'NextJump',
            'Sizes',
            'FullJump'
          ]"
          background
          size="medium"
          :current-page.sync="tablePage.currentPage"
          :page-size.sync="tablePage.pageSize"
          :total="tablePage.total"
          @page-change="handlePageChange"
        >
        </vxe-pager>
      </template>
    </vxe-grid>
  </div>
</template>
<script>
export default {
  name: "vxeGridPagination",
  props: {
    //表数据
    tableData: {
      type: Array,
      default() {
        return [];
      }
    },
    highlightHoverRow: {
      type: Boolean,
      default() {
        return false;
      }
    },
    highlightCurrentRow: {
      type: Boolean,
      default() {
        return false;
      }
    },
    //表头
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    total: {
      type: Number,
      default() {
        return 0;
      }
    },
    currentPage: {
      type: Number,
      default() {
        return 1;
      }
    },
    pageSize: {
      type: Number,
      default() {
        return 10;
      }
    },
    //表格高度
    height: {
      type: String,
      default() {
        return "573";
      }
    },
    width: {
      typeof: String,
      default() {
        return "100%";
      }
    },
    //显示隐藏分页 isShowPagination="none"时隐藏
    isShowPagination: {
      type: String,
      default() {
        return "";
      }
    },
    isVisibleSelect: {
      type: String,
      default() {
        return "";
      }
    },
    treeConfig: {
      type: Object,
      default() {
        return { children: "children", hasChildren: "hasChildren" };
      }
    },
    checkboxConfig: {
      type: Object,
      default() {
        return { checkStrictly: false };
      }
    },
    formConfig: {
      type: Object,
      default() {
        return {};
      }
    },
    autoResize: {
      type: Boolean,
      default() {
        return true;
      }
    }
  },
  data() {
    return {
      gridOptions: {
        border: true,
        resizable: true,
        width: this.width,
        height: this.height,
        //配置树表
        treeConfig: this.treeConfig,
        checkboxConfig: this.checkboxConfig,
        align: "left",
        //表头
        columns: [].concat(this.columns),
        showOverflow: true,
        formConfig: this.formConfig,
        keepSource: true
        //表数据
        //data: [].concat(this.tableData)
      },
      //分页参数
      tablePage: {
        total: this.total,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      },

      //选择行数
      selectCount: 0,
      isVisibleVatchDelete: "none"
    };
  },
  watch: {
    total(total) {
      this.tablePage.total = total;
    }
  },
  methods: {
    currentChangeEvent({ row }) {
      this.$emit("currentChangeEvent", row);
    },
    //跳转页
    searchEvent({ currentPage }) {
      this.tablePage.currentPage = currentPage;
      this.$emit("jumpEvent", currentPage);
    },

    //下一页
    handlePageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage;
      this.tablePage.pageSize = pageSize;
      this.$emit("pageChange", currentPage, pageSize);
    },

    //删除按钮点击
    getRemoveEvent() {
      //选中的行
      let selectRow = this.$refs.xGrid.getCheckboxRecords();
      this.$emit("removeEvent", selectRow);
    },

    //删除选中的行
    deleteRow(rows) {
      //删除行，此时只在页面删除
      this.$refs.xGrid.removeCheckboxRow();
      this.isVisibleVatchDelete = "none";
      //在内存中删除 也可以直接调用this.removeListItem删除数据
      for (let k = 0; k < rows.length; k++) {
        this.removeListItem(this.gridOptions.data, rows[k].id);
      }
    },

    //获取选中的行
    getSelect({ checked, records }) {
      let selectRow = this.$refs.xGrid.getCheckboxRecords();
      this.selectCount = selectRow.length;
      if (this.selectCount > 0) {
        this.isVisibleVatchDelete = "";
      } else {
        this.isVisibleVatchDelete = "none";
      }
      this.$emit("selectRow", selectRow);
    },

    //删除行
    removeListItem(dataList, id) {
      // 根据id属性从数组（树结构）中移除元素
      if (!dataList || !dataList.length) {
        return;
      }
      for (let i = 0; i < dataList.length; i++) {
        if (dataList[i].id === id) {
          dataList.splice(i, 1);
          break;
        }
        this.removeListItem(dataList[i].children, id);
      }
    },
    //切换选择的行
    toggleCheckboxRow(rowindex) {
      if (rowindex) {
        rowindex.forEach(item => {
          this.$refs.xGrid.toggleCheckboxRow(this.tableData[item]);
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.money-box {
  background-color: #ebf3fe;
  border: 1px solid #c7dfff;
  height: 50px;
  border-radius: 3px;
  display: flex;
}
</style>
