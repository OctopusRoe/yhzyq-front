<template>
  <div class="layout">
    <div class="layout-l-40">
      <div class="tree-title">
        <span>工程划分</span>
        <div class="btn-box"><span>导入</span><span>导出</span></div>
      </div>
      <div class="query-box">
        <div>
          <span>工程编号</span
          ><el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in selectListGc"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <span>工程名称</span
          ><el-input v-model="input" placeholder="请输入内容"></el-input>
          <el-button type="primary" size="mini" style="margin-left: 10px"
            >查询</el-button
          >
        </div>
      </div>
      <div class="utilbtn-box">
        <el-button type="primary" size="mini" style="margin-left: 10px"
          >新增</el-button
        >
        <el-button size="mini" style="margin-left: 10px">修改</el-button>
        <el-button size="mini" style="margin-left: 10px">删除</el-button>
      </div>
      <div class="table-box table-treeline">
        <el-table
          :data="tableData"
          style="width: 100%"
          row-key="id"
          border
          height="100%"
          default-expand-all
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column
            type="selection"
            align="center"
            width="39"
          ></el-table-column>

          <el-table-column
            prop="date"
            label="工程编号"
            class-name="treeline"
            align="left"
            header-align="left"
            width="200"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <div class="line"></div>
              <!-- 显示文件夹图标 -->
              <span class="sp" v-if="scope.row.children"> </span>
              <!-- 显示文件图标 -->
              <svg-icon icon-class="file" class="icon-file" v-else />
              <label>{{ scope.row.date }}</label>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="工程名称"> </el-table-column>
          <el-table-column prop="p1" label="起止桩号"> </el-table-column>
          <el-table-column prop="p2" label="终止桩号"> </el-table-column>
          <el-table-column prop="p3" label="划分类型"> </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="layout-r-60">
      <div class="t">
        <div class="tabs-box">
          <div :class="tabIndex == 1 ? 'active' : ''" @click="tabChange(1)">
            清单挂单
          </div>
          <div :class="tabIndex == 2 ? 'active' : ''" @click="tabChange(2)">
            工序挂接
          </div>
          <div :class="tabIndex == 3 ? 'active' : ''" @click="tabChange(3)">
            材料挂单
          </div>
        </div>
        <div class="btn-box">
          <el-button type="primary" size="mini">新增</el-button>
        </div>
        <div class="table-box">
          <el-table :data="tableData13" height="100%" row-key="menuId">
            <el-table-column prop="p1" label="子目编号" align="center">
            </el-table-column>
            <el-table-column prop="p2" label="子目名称" align="center">
            </el-table-column>
            <el-table-column prop="p3" label="计算单位" align="center">
            </el-table-column>
            <el-table-column prop="p4" label="单价" align="center">
            </el-table-column>
            <el-table-column prop="p5" label="原合同量" align="center">
            </el-table-column>
            <el-table-column prop="p6" label="修编增减量" align="center">
            </el-table-column>
            <el-table-column
              prop="p7"
              label="清单修编后核查量"
              width="80"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="p8"
              label="变更增减量"
              width="80"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="p9" label="最终量" width="80" align="center">
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              width="170"
              class-name="small-padding fixed-width"
            >
              <template>
                <a href="#" class="edit-btn">修改</a>
                <a href="#" class="edit-btn">删除</a>
                <a href="#" class="edit-btn">查看</a>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="detail-pages-wrap" style="text-align: right">
          <el-pagination background layout="prev, pager, next" :total="1000">
          </el-pagination>
        </div>
      </div>
      <div class="b">
        <div class="table-box">
          <el-table :data="tableData14" height="100%" row-key="menuId">
            <el-table-column prop="p1" label="材料编号" align="center">
            </el-table-column>
            <el-table-column prop="p2" label="名称" align="center">
            </el-table-column>
            <el-table-column prop="p3" label="类型" align="center">
            </el-table-column>
            <el-table-column prop="p4" label="单位" align="center">
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              width="170"
              class-name="small-padding fixed-width"
            >
              <template>
                <a href="#" class="edit-btn">修改</a>
                <a href="#" class="edit-btn">删除</a>
                <a href="#" class="edit-btn">查看</a>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="detail-pages-wrap" style="text-align: right">
          <el-pagination background layout="prev, pager, next" :total="1000">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  name: "detailListModel",
  components: {},
  data() {
    return {
      tabIndex: 1,
      value: "",
      input: "",
      selectListGc: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      tableData13: [
        {
          p1: "101",
          p2: "路基工程",
          p3: "单位工程",
          p4: "343.43",
          p5: "原合同量",
          p6: "343.33",
          p7: "单位工程",
          p8: "343.33",
          p9: "363.23",
        },
        {
          p1: "102",
          p2: "路基工程",
          p3: "单位工程",
          p4: "343.3",
          p5: "原合同量",
          p6: "343.33",
          p7: "单位工程",
          p8: "343.33",
          p9: "363.23",
        },
        {
          p1: "103",
          p2: "路基工程",
          p3: "单位工程",
          p4: "125.3",
          p5: "原合同量",
          p6: "343.33",
          p7: "单位工程",
          p8: "343.33",
          p9: "363.23",
        },
        {
          p1: "104",
          p2: "路基工程",
          p3: "单位工程",
          p4: "163",
          p5: "原合同量",
          p6: "343.33",
          p7: "单位工程",
          p8: "343.33",
          p9: "363.23",
        },
        {
          p1: "105",
          p2: "路基工程",
          p3: "单位工程",
          p4: "162",
          p5: "原合同量",
          p6: "343.33",
          p7: "单位工程",
          p8: "343.33",
          p9: "363.23",
        },
        {
          p1: "106",
          p2: "路基工程",
          p3: "单位工程",
          p4: "163",
          p5: "原合同量",
          p6: "343.33",
          p7: "单位工程",
          p8: "343.33",
          p9: "363.23",
        },
        {
          p1: "107",
          p2: "路基工程",
          p3: "单位工程",
          p4: "163",
          p5: "原合同量",
          p6: "343.33",
          p7: "单位工程",
          p8: "343.33",
          p9: "363.23",
        },
      ],
      tableData14: [
        {
          p1: "101",
          p2: "路基工程",
          p3: "单位工程",
          p4: "343.43",
          p5: "原合同量",
          p6: "343.33",
          p7: "单位工程",
          p8: "343.33",
          p9: "363.23",
        },
        {
          p1: "102",
          p2: "路基工程",
          p3: "单位工程",
          p4: "343.3",
          p5: "原合同量",
          p6: "343.33",
          p7: "单位工程",
          p8: "343.33",
          p9: "363.23",
        },
        {
          p1: "103",
          p2: "路基工程",
          p3: "单位工程",
          p4: "125.3",
          p5: "原合同量",
          p6: "343.33",
          p7: "单位工程",
          p8: "343.33",
          p9: "363.23",
        },
        {
          p1: "104",
          p2: "路基工程",
          p3: "单位工程",
          p4: "163",
          p5: "原合同量",
          p6: "343.33",
          p7: "单位工程",
          p8: "343.33",
          p9: "363.23",
        },
      ],
      tableData: [
        {
          id: 1,
          date: "001总则及暂列规则",
          name: "路基工程",
          p1: "K123+98",
          p2: "K123+98",
          p3: "单位工程",
        },
        {
          id: 2,
          date: "101路基工程",
          name: "排水工程",
          p1: "K123+98",
          p2: "K123+98",
          p3: "单位工程",
        },
        {
          id: 3,
          date: "001总则及暂列规则",
          name: "管节预制",
          p1: "K123+98",
          p2: "K123+98",
          p3: "单位工程",
          children: [
            {
              id: 31,
              date: "001总则及暂列规则",
              name: "路基工程",
              p1: "K123+98",
              p2: "K123+98",
              p3: "单位工程",
            },
            {
              id: 32,
              date: "001总则及暂列规则",
              name: "路基工程",
              p1: "K123+98",
              p2: "K123+98",
              p3: "单位工程",
            },
          ],
        },
        {
          id: 4,
          date: "101路基工程",
          name: "路基工程",
          p1: "K123+98",
          p2: "K123+98",
          p3: "单位工程",
        },
        {
          id: 5,
          date: "101路基工程11",
          name: "路基工程",
          p1: "K123+98",
          p2: "K123+98",
          p3: "单位工程",
        },
        {
          id: 5,
          date: "101路基工程11",
          name: "路基工程",
          p1: "K123+98",
          p2: "K123+98",
          p3: "单位工程",
        },
        {
          id: 5,
          date: "101路基工程11",
          name: "路基工程",
          p1: "K123+98",
          p2: "K123+98",
          p3: "单位工程",
        },
        {
          id: 5,
          date: "101路基工程11",
          name: "路基工程",
          p1: "K123+98",
          p2: "K123+98",
          p3: "单位工程",
        },
        {
          id: 5,
          date: "101路基工程11",
          name: "路基工程",
          p1: "K123+98",
          p2: "K123+98",
          p3: "单位工程",
        },
        {
          id: 5,
          date: "101路基工程11",
          name: "路基工程",
          p1: "K123+98",
          p2: "K123+98",
          p3: "单位工程",
        },
        {
          id: 5,
          date: "101路基工程11",
          name: "路基工程",
          p1: "K123+98",
          p2: "K123+98",
          p3: "单位工程",
        },
        {
          id: 5,
          date: "101路基工程11",
          name: "路基工程",
          p1: "K123+98",
          p2: "K123+98",
          p3: "单位工程",
        },
        {
          id: 5,
          date: "101路基工程11",
          name: "路基工程",
          p1: "K123+98",
          p2: "K123+98",
          p3: "单位工程",
        },
        {
          id: 5,
          date: "101路基工程11",
          name: "路基工程",
          p1: "K123+98",
          p2: "K123+98",
          p3: "单位工程",
        },
        {
          id: 5,
          date: "101路基工程11",
          name: "路基工程",
          p1: "K123+98",
          p2: "K123+98",
          p3: "单位工程",
        },
        {
          id: 5,
          date: "101路基工程11",
          name: "路基工程",
          p1: "K123+98",
          p2: "K123+98",
          p3: "单位工程",
        },
        {
          id: 5,
          date: "101路基工程11",
          name: "路基工程",
          p1: "K123+98",
          p2: "K123+98",
          p3: "单位工程",
        },
        {
          id: 5,
          date: "101路基工程11",
          name: "路基工程",
          p1: "K123+98",
          p2: "K123+98",
          p3: "单位工程",
        },
      ],
      data: [
        {
          id: 1,
          label: "XX高速公路集团有限公司",
          children: [
            {
              id: 4,
              label: "子级",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "XX高速公路集团有限公司",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "XX高速公路集团有限公司",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
    };
  },
  created() {},
  methods: {
    tabChange(index) {
      this.tabIndex = index;
    },
  },
};
</script>
<style lang="scss" src="@/assets/styles/tabletree.scss" scoped />
<style lang="scss" >
</style>
<style lang="scss" >
.layout {
  display: flex;
  background-color: #fff;
  height: 100%;

  .tree-title {
    height: 40px;
    padding-left: 15px;
    border-bottom: 1px solid #ececec;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .btn-box {
      float: right;
      height: 100%;
      display: flex;
      align-items: center;
      span {
        margin-right: 10px;
        border: 1px solid #ddd;
        display: inline-block;
        padding: 2px 10px;
        border-radius: 3px;
        cursor: pointer;
      }
    }
  }
  .query-box {
    display: flex;
    align-items: center;
    padding: 10px 0;
    margin: 0 20px;
    border-bottom: 1px solid #eee;
    > div {
      display: flex;
      margin-right: 30px;
      align-items: center;
      > span {
        font-size: 14px;
        margin-right: 8px;
        white-space: nowrap;
      }
    }
  }
  div.layout-l-40 {
    width: 40%;
    border-right: 1px solid #eaeaec;
    height: 100%;
    .utilbtn-box {
      padding: 10px 0;
      margin: 0 10px;
    }
    > div.table-box {
      background-color: red;
      height: calc(100% - 150px);
      > div > div.el-table__body-wrapper {
        max-height: inherit !important;
      }
    }
  }
  .layout-r-60 {
    width: 60%;
    overflow: hidden;
    .t {
      padding: 0 10px;
    }
    .b {
      border-top: 1px solid #eee;
      padding: 10px 10px 0 10px;
    }
    .tabs-box {
      display: flex;
      border-bottom: 1px solid #e9eaec;
      > div {
        margin-right: 48px;
        line-height: 40px;
        font-size: 14px;
        cursor: pointer;
      }
      > div.active {
        color: #308ae7;
        border-bottom: 1px solid #308ae7;
      }
    }
    .btn-box {
      padding: 14px 0;
    }
  }
}
</style>
