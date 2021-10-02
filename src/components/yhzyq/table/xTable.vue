<template>
  <div class="container is-vertical xtable">
    <!-- 表格标题 -->
    <template v-if="title.show">
      <div class="table-header">
        <template v-if="title.list && title.list.length">
          <div class="table-title-slot">
            <template v-for="(item, t) in title.list">
              <template v-if="item.render">
                <titleDom :render="item.render" :method="item.method" :key="t"></titleDom>
              </template>
              <template v-else>
                <template v-if="!item.show">

                </template>
                <template v-else>

                  <template v-if="item.formatter">
                    <el-button v-if="item.formatter()" plain :type="item.type || 'primary'" :disabled="item.disabled" :icon="item.icon" :key="t" @click.native.prevent="item.method">
                      <template v-if="item.svg">
                        <svg-icon :icon-class="item.svg"></svg-icon>
                      </template>
                      {{item.label}}
                    </el-button>
                  </template>
                  <template v-else>

                    <el-button plain :type="item.type || 'primary'" :icon="item.icon" :key="t" :disabled="item.disabled" @click.native.prevent="item.method">
                      <template v-if="item.svg">
                        <svg-icon :icon-class="item.svg"></svg-icon>
                      </template>
                      {{item.label}}
                    </el-button>
                  </template>

                </template>

              </template>
            </template>
          </div>
        </template>
        <div class="fun-box" v-if="rightTool">
          <el-button @click="refresh">刷新</el-button>
          <el-button @click="showHidden">显隐</el-button>
        </div>
      </div>
    </template>
    <!-- 表格标题 end -->
    <!-- 表格数据 -->
    <template v-if="show">
      <div class="flex-scroll flex-column">
        <el-table :data="list" ref="xTable" :show-summary="showSummary.show" :sum-text="showSummary.text" :summary-method="showSummary.method" :border="border"
          style="width: 100%;max-height:100%;margin-bottom:20px;" highlight-current-row header-cell-class-name="default-bg" @selection-change="handleSelectionChange" @cell-click="handleCellClick"
          @row-click="handleRowClick" @sort-change="sortChange" :row-key="treeTable.key" :height="height" :tree-props="treeTable.treeProps" :default-expand-all="treeTable.defaultExpandAll"
          :expand-row-keys="treeTable.expandRowKeys" :cell-style="cellStyle" max-height="7000">

          <template v-if="isMultiple">
            <el-table-column v-if="isMultiple" :fixed="fixedMultiple" :resizable="resizable" type="selection" width="45" align="left"></el-table-column>
          </template>
          <template v-else-if="radio">
            <el-table-column label="" width="35" align="left" :resizable="resizable">
              <template v-slot="scope">
                <el-radio v-model="radioVal" style="color:#fff!important" :label="scope.row[radio]" @change.native="radioCurrentChange($event,scope.row)">
                </el-radio>
              </template>
            </el-table-column>
          </template>
          <el-table-column v-if="typeIndex" type="index" :index="indexMethod" align="left" :resizable="resizable" label="序号"></el-table-column>
          <el-table-column v-if="!typeIndex" type="index" :index="index"  align="left" :resizable="resizable" label="序号"></el-table-column>
          <template v-for="(col, c) in tableHeaders">
            <el-table-column :resizable="resizable" v-if="col.show !== false" :prop="col.slot? null : col.name || col.label" :key="c" :label="col.label" :min-width="col.minWidth"
              :align="col.align || align" :type="col.type" :sortable="col.sortable" :show-overflow-tooltip="col.overflowTool" :width="col.width">
              <template v-if="col.children">
                <template v-for="(ch,o) in col.children">

                  <el-table-column :key="o" :label="ch.label" :prop="ch.name" :min-width="ch.minWidth" :width="ch.width" align="left">
                    <template v-slot="scope" v-if="ch.popover && ch.popover.show">
                      <el-popover placement="top-start" :title="ch.popover.title || ''" :width="ch.popover.width || 200" trigger="hover" :content="ch.popover.content || ''">
                        <div v-if="ch.popover.formatter" v-html="ch.popover.formatter(scope.row)"></div>
                        <div slot="reference">
                          {{scope.row[ch.name]}}
                        </div>
                      </el-popover>
                    </template>
                  </el-table-column>
                </template>

              </template>
              <template v-slot="scope">

                <template v-if="col.render">
                  <expand-dom :column="col" :row="scope.row" :render="col.render"></expand-dom>
                </template>
                <template v-else-if="col.formatter && col.method">
                  <el-button :type="col.type || 'text'" :size="col.size || 'medium'" @click.native.prevent="col.method(scope.row)" v-html="col.formatter(scope.row, col)"></el-button>
                </template>
                <template v-else>
                  <template v-if="col.formatter">
                    <span v-html="col.formatter(scope.row, col)"></span>
                  </template>
                  <template v-else-if="col.method">
                    <el-button :type="col.type || 'text'" :size="col.size || 'medium'" @click.native.prevent="col.method(scope.row)">{{scope.row[col.name]}}</el-button>
                  </template>
                  <template v-else>
                    <span>{{scope.row[col.name]}}</span>
                  </template>
                </template>

              </template>
            </el-table-column>
          </template>
          <!-- 按钮操作组 -->
          <el-table-column :resizable="true" v-if="operates.show && operates.list.length" label="操作" align="center" :fixed="operates.fixed" :width="operates.width">
            <template v-slot="scope">
              <div>
                <template v-for="(btn, key) in operates.list">
                  <template v-if="btn.filter !== undefined">
                    <el-button :type="btn.type" :class="btn.class" :size="btn.type || 'medium'" :icon="btn.icon" :disabled="btn.disabled" :plain="btn.plain"
                      @click.native.prevent="btn.method(scope.$index, scope.row)" :key="key" v-if="btn.filter(scope.row)">
                      <template v-if="btn.svg">
                        <svg-icon :icon-class="btn.svg"></svg-icon>
                      </template>
                      {{ btn.label }}
                    </el-button>
                  </template>
                  <template v-else-if="btn.filter == undefined">
                    <el-button :type="btn.type" :class="btn.class" :size="btn.type || 'medium'" :icon="btn.icon" :disabled="btn.disabled" :plain="btn.plain"
                      @click.native.prevent="btn.method(scope.$index, scope.row)" :key="key">
                      <template v-if="btn.svg">
                        <svg-icon :icon-class="btn.svg"></svg-icon>
                      </template>
                      {{ btn.label }}
                    </el-button>
                  </template>
                </template>
                <template v-if="isDropDown.show && isDropDown.list.length > 0 && isDropDown.filter(scope.row)">
                  <el-dropdown style="margin-left:10px;">
                    <span class="el-dropdown-link">
                      更多<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <template v-for="(btn, key) in isDropDown.list">
                        <template v-if="btn.filter">
                          <el-dropdown-item v-if="btn.filter(scope.row)" :disabled="btn.disabled" :key="key" :class="btn.class" @click.native.prevent="btn.method(scope.$index, scope.row)">
                            {{ btn.label }}
                          </el-dropdown-item>
                        </template>
                        <template v-else>
                          <el-dropdown-item :disabled="btn.disabled" :key="key" :class="btn.class" @click.native.prevent="btn.method(scope.$index, scope.row)">{{ btn.label }}</el-dropdown-item>
                        </template>
                      </template>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>

              </div>

            </template>

          </el-table-column>
          <!-- 按钮操作组 end-->
        </el-table>
      </div>
    </template>
    <!-- 表格数据 end-->
    <!-- 分页 -->
    <template v-if="total">
      <el-pagination @size-change="handleSizeChange" background :total="total" :current-page="listQuery.page" :page-sizes="[10, 20, 30, 40]" :page-size="listQuery.pageSize" :pager-count="5"
        layout="->,total,sizes,prev,pager,next,jumper" @current-change="handleCurrentChange" class="pagination">
        <!-- <slot>
          <span class="pagination__count">{{pageCount}}</span>
        </slot> -->
      </el-pagination>
    </template>
    <!-- 分页 end -->

    <!-- 显隐抽屉 -->
    <el-drawer title="列显隐" :visible.sync="drawer">
      <el-transfer :data="tableHeaderCopy" v-model="transferValue" :props="{
        key: 'transferKey',
        label: 'label'
      }" :titles="['隐藏', '显示']" @change="transferChange"></el-transfer>
    </el-drawer>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
    },
    cellStyle: {
      type: Object,
    },
    rightTool: { // 是否显示右边 显隐按钮组
      type: Boolean,
      default: true
    },
    row: {

    },
    // 是否底部开启合计
    showSummary: {
      type: Object,
      default() {
        return {
          show: false,
          text: '合计',
          method: (data) => { }
        }
      }
    },
    // 如果是 treeTabee的话...
    treeTable: {
      type: Object,
      default() {
        return {
          key: 'id', // 列表数据必须有id 当然也可换成其他id
          defaultExpandAll: false, // 是否默认展开全部
          expandRowKeys: [],// 用来展开行的数组 传对应id即可
          treeProps: {
            children: 'children',
            hasChildren: 'hasChildren'
          }
        }
      }
    },

    show: {
      type: Boolean,
      default: true
    },
    border: {//表格边框
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }, // 表格数据
    align: {
      type: String,
      default: 'left'
    }, // 对齐方式
    isMultiple: {
      type: Boolean,
      default: false
    }, 
    fixedMultiple: {
      type: [Boolean, String],
      default: false
    }, // 是否多选
    typeIndex: {

    },
    radio: {}, // 单选唯一标示符
    tableHeader: {
      type: Array,
      default() {
        return []
      }
    }, // 表头
    listQuery: {
      type: Object,
      default() {
        return {
          page: 1,
          pageSize: 10
        }
      }
    }, // 分页参数
    total: {
      type: Number
    }, // 总数
    operates: {
      type: Object,
      default() {
        return {
          show: false,
          width: 150,
          fixed: false,
          list: []
        }
      }
    },
    // 是否开启更多
    isDropDown: {
      type: Object,
      default() {
        return {
          show: false,
          filter: function () { },
          list: []
        }
      }
    },
    // 列操作按钮
    title: {
      type: Object,
      default() {
        return {
          show: true,
          align: 'left',
          label: '',
          list: []
        }
      }
    }, // 表格标题

  },
  data() {
    return {
      resizable: true,
      radioVal: null,
      drawer: false,
      tableHeaders: [],
      tableHeaderCopy: [], // 备份表头
      transferValue: [] // 显示列
    }
  },
  created() {

    let arr = this.tableHeader
    let arrb = []
    arr.forEach((item, index) => {
      arrb.push({
        transferKey: index,
        disabled: item.disabled ? item.disabled : false,
        ...item
      })
      if (!item.show) {
      } else {
        // 显示列
        this.transferValue.push(index)
      }
    })
    this.tableHeaderCopy = arrb
    this.tableHeaders = arrb
  },
  components: {
    expandDom: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null
        }
      },
      render: (h, ctx) => {
        const params = {
          row: ctx.props.row,
          index: ctx.props.index
        }
        if (ctx.props.column) params.column = ctx.props.column
        return ctx.props.render(h, params)
      }
    },
    titleDom: {
      functional: true,
      props: {
        render: Function,
        method: Function
      },
      render: (h, ctx) => {
        return ctx.props.render(h, ctx.props)
      }
    }
  },
  //   watch: {
  //     tableHeader: {
  //       handler(val, oldVal) {
  //         this.tableHeaders = val
  //       },
  //       deep: true //true 深度监听
  //     },
  //   },
  computed: {
    pageCount() {
      let count = this.total
      return `共${count}条`
    }
  },
  watch: {
    transferValue: {
      handler: function (newVal, oldVal) {
        this.$nextTick(() => {
          this.$refs.xTable.doLayout()
        })
      },
      deep: true
    }
  },
  methods: {
    indexMethod(index) {
      return (this.listQuery.page - 1) * this.listQuery.pageSize + index + 1;
    },
    // 清除选中的radio
    clearRadio() {
      this.radioVal = ''
    },
    sortChange(a) {
      console.log(a, '排序')
      this.$emit('sortChange', a)
    },
    refresh() {
      this.$emit('handleRefresh')
    },
    // 显隐数据变化执行
    transferChange(a, b, c) {
      let arr = this.tableHeaderCopy
      this.tableHeaders = arr.filter(item => {
        for (let i = 0; i < a.length; i++) {
          if (a[i] === item.transferKey) {
            item.show = true
            return item
          }
        }
      })
    },
    // 显隐
    showHidden() {
      this.drawer = true
    },
    toggleSelection(rows) {
      rows.forEach(row => {
        setTimeout(() => {
          this.$refs.xTable.toggleRowSelection(row)
        }, 1000)
      })
    },
    // 单行选中
    radioCurrentChange(e, val) {
      if (val) {
        this.radioVal = val[this.radio]
      } else {
        this.radioVal = null
      }
      this.$emit('radioCurrentChange', val)
    },
    // 切换页码
    handleCurrentChange(index) {
      this.listQuery.page = index
      this.$emit('handleCurrentChange', index)
    },
    handleSizeChange(size) {
      this.listQuery.pageSize = size
      this.$emit('handleSizeChange', size)
    },
    // 多行选中
    handleSelectionChange(val) {
      this.$emit('handleSelectionChange', val)
    },
    // 点击选择某个单元格
    handleCellClick(row, column, cell, event) {
      // console.log(row, column, cell, event)
      this.$emit('handlecellClick', row, column)
    },
    // 点击选择某行
    handleRowClick(row, column, cell, event) {
      this.$refs.xTable.toggleRowSelection(row)
      this.radioVal = row[this.radio]
      this.$emit('handleRowClick', row, column)
    },

    // 斑马线
    // tabRowClassName({ row, rowIndex }) {
    //   let index = rowIndex + 1;
    //   if (index % 2 == 0) {
    //     return 'warning-row'
    //   }
    // }
  }
}
</script>

<style lang="scss">
.xtable {
  .el-table .warning-row {
    background: #fff3ec;
  }

  .table-header {
    width: 100%;
    margin: 0 0 10px;
    // min-height: 32px;
    position: relative;
    &::after {
      content: '';
      display: block;
      clear: both;
    }
    .table-title-slot {
      float: left;
    }
    .fun-box {
      float: right;
    }
  }
  .el-dropdown {
    cursor: pointer;
  }
  .el-table--medium th,
  .el-table--medium td {
    padding: 0;
  }
  .el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
  .el-table__body tr.current-row > td {
    background-color: #ffec8b;
  }

  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #f5f7f9;
  }
  .el-table__empty-block{
    height: auto!important;
  }
}
</style>