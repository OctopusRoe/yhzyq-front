<template>
  <div class="layout">
    <div class="layout-l">
      <div class="tree-title">组织机构</div>
      <div class="tree-box">
        <el-tree
          :data="data"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultProps"
        >
        </el-tree>
      </div>
    </div>
    <div class="layout-r">
      <div class="tabs-box">
        <div :class="tabIndex == 1 ? 'active' : ''" @click="tabChange(1)">
          房屋设计台账
        </div>
        <div :class="tabIndex == 2 ? 'active' : ''" @click="tabChange(2)">
          附着物设计台账
        </div>
        <div :class="tabIndex == 3 ? 'active' : ''" @click="tabChange(3)">
          附着物设计台账
        </div>
        <div :class="tabIndex == 4 ? 'active' : ''" @click="tabChange(4)">
          土地设计台账
        </div>
      </div>
      <div class="select-box">
        <div>
          <span>标段类型</span
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
        <div style="margin-left: 50px">
          <span>标段号</span
          ><el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in selectListGc"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-button type="primary" style="margin-left: 20px">查询</el-button>
          <el-button>重置</el-button>
        </div>
        <div>
          <el-button type="primary" @click="addNew">新增</el-button>
          <el-button>导入</el-button>
        </div>
      </div>
      <div class="money-box">
        <div>
          <i>1</i>
          <div>已选择<span>4</span>项目</div>
        </div>
        <div>总里程:<span>1000</span>公里</div>
        <div>概算金额:<span>3356.6</span>万</div>
      </div>
      <div class="table-box">
        <el-table :data="tableData13" height="100%" row-key="menuId">
          <el-table-column
            type="selection"
            align="center"
            width="46"
          ></el-table-column>
          <el-table-column type="index" label="序号" align="center" width="50">
          </el-table-column>
          <el-table-column prop="p1" label="项目名称" width="190">
          </el-table-column>
          <el-table-column prop="p2" label="项目编号" align="center">
          </el-table-column>
          <el-table-column prop="p3" label="建设类型" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.p3 == '扩建'" class="typeColor1">
                {{ scope.row.p3 }}
              </div>
              <div v-else-if="scope.row.p3 == '新建'" class="typeColor2">
                {{ scope.row.p3 }}
              </div>
              <div v-else-if="scope.row.p3 == '停建'" class="typeColor3">
                {{ scope.row.p3 }}
              </div>
              <div v-else-if="scope.row.p3 == '完结'" class="typeColor4">
                {{ scope.row.p3 }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="p4" label="建设单位" width="200">
          </el-table-column>
          <el-table-column prop="p5" label="主线里程(公里)" align="right">
          </el-table-column>
          <el-table-column prop="p6" label="项目概算(万)" align="right">
          </el-table-column>
          <el-table-column prop="p7" label="负责人" width="80" align="right">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="200"
            class-name="small-padding fixed-width"
          >
            <template>
              <a href="#" class="edit-btn" @click="updateRow">修改</a>
              <a href="#" class="edit-btn" @click="deleteRow">删除</a>
              <a href="#" class="edit-btn" @click="viewRow">查看</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="detail-pages-wrap" style="text-align: right">
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="修改"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
      width="760"
      class="dialog-common"
    >
      <el-form :model="form">
        <el-form-item
          label="项目名称"
          label-width="90px"
          :rules="{ required: true }"
        >
          <el-input
            v-model="form.name"
            autocomplete="off"
            style="width: 605px"
          ></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="11">
            <el-form-item
              label="项目编号"
              label-width="90px"
              :rules="{ required: true }"
            >
              <el-input
                v-model="form.name"
                autocomplete="off"
                style="width: 230px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item
              label="建设类型"
              :label-width="formLabelWidth"
              :rules="{ required: true }"
            >
              <el-select
                v-model="form.region"
                placeholder="请选择活动区域"
                style="width: 230px"
              >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item
              label="建设单位"
              label-width="90px"
              :rules="{ required: true }"
            >
              <el-input
                v-model="form.name"
                autocomplete="off"
                style="width: 230px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item
              label="主线里程(公里)"
              :label-width="formLabelWidth"
              :rules="{ required: true }"
            >
              <el-input
                v-model="form.name"
                autocomplete="off"
                style="width: 230px"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item
              label="项目概算"
              label-width="90px"
              :rules="{ required: true }"
            >
              <el-input
                v-model="form.name"
                autocomplete="off"
                style="width: 230px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item
              label="负责人"
              :label-width="formLabelWidth"
              :rules="{ required: true }"
            >
              <el-select
                v-model="form.region"
                placeholder="请选择活动区域"
                style="width: 230px"
              >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false"
          >保 存</el-button
        >
        <el-button @click="dialogFormVisible = false">关 闭</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="详情"
      :visible.sync="dialogFormVisible1"
      :append-to-body="true"
      width="39%"
      class="dialog-common"
    >
      <table class="view-table" cellspacing="0" cellpadding="0">
        <tr>
          <td class="label">项目名称</td>
          <td colspan="3">XX项目项目项目项目项目</td>
        </tr>
        <tr>
          <td class="label">项目编号</td>
          <td class="content">XX_01898998</td>
          <td class="label">建设类型</td>
          <td class="content">
            <span class="tag">扩建</span><span class="tag">扩建</span
            ><span class="tag">扩建</span>
          </td>
        </tr>
        <tr>
          <td class="label">建设单位</td>
          <td colspan="3">XX高速公路集团有限公司</td>
        </tr>
        <tr>
          <td class="label">主线里程</td>
          <td class="content">365公里</td>
          <td class="label">项目概算</td>
          <td class="content"><span>2688.566.66万元</span></td>
        </tr>
        <tr>
          <td class="label">负责人</td>
          <td colspan="3">张三</td>
        </tr>
      </table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">关 闭</el-button>
      </div>
    </el-dialog>

    <div class="dialog-addNew" v-show="showAddNewFlag">
      <div class="con-dialog">
        <div class="title">新增</div>
        <div class="con">
          <el-form
            ref="numberValidateForm"
            label-width="150px"
            class="demo-ruleForm"
          >
            <el-form-item label="项目名称" :rules="[{ required: true }]">
              <el-input
                placeholder="请输入内容"
                style="width: 300px"
              ></el-input>
            </el-form-item>
            <el-form-item label="项目编号" :rules="[{ required: true }]">
              <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="建设类型" :rules="[{ required: true }]">
              <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="建设单位" :rules="[{ required: true }]">
              <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="主线里程(公里)" :rules="[{ required: true }]">
              <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="项目概算(万)" :rules="[{ required: true }]">
              <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="负责人" :rules="[{ required: true }]">
              <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="bg-dialog" @click="hideAddNewDialog"></div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  name: "ListTemplate",
  components: {},
  data() {
    return {
      value: "",
      dialogFormVisible: false,
      dialogFormVisible1: false,
      showAddNewFlag: false,
      formLabelWidth: "140px",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      tabIndex: 1,
      tableData13: [
        {
          p1: "XX项目项目项目项目项目",
          p2: "XX_1234",
          p3: "扩建",
          p4: "XX高速公路集团有限公司",
          p5: "343.32",
          p6: "343.33",
          p7: "张三",
        },
        {
          p1: "XX项目项目项目项目项目",
          p2: "XX_1234",
          p3: "新建",
          p4: "XX高速公路集团有限公司",
          p5: "343.32",
          p6: "343.33",
          p7: "张三",
        },
        {
          p1: "XX项目项目项目项目项目",
          p2: "XX_1234",
          p3: "新建",
          p4: "XX高速公路集团有限公司",
          p5: "343.32",
          p6: "343.33",
          p7: "张三",
        },
        {
          p1: "XX项目项目项目项目项目",
          p2: "XX_1234",
          p3: "扩建",
          p4: "XX高速公路集团有限公司",
          p5: "343.32",
          p6: "343.33",
          p7: "张三",
        },
        {
          p1: "XX项目项目项目项目项目",
          p2: "XX_1234",
          p3: "停建",
          p4: "XX高速公路集团有限公司",
          p5: "343.32",
          p6: "343.33",
          p7: "张三",
        },
        {
          p1: "XX项目项目项目项目项目",
          p2: "XX_1234",
          p3: "完结",
          p4: "XX高速公路集团有限公司",
          p5: "343.32",
          p6: "343.33",
          p7: "张三",
        },
        {
          p1: "XX项目项目项目项目项目",
          p2: "XX_1234",
          p3: "新建",
          p4: "XX高速公路集团有限公司",
          p5: "343.32",
          p6: "343.33",
          p7: "张三",
        },
        {
          p1: "XX项目项目项目项目项目",
          p2: "XX_1234",
          p3: "扩建",
          p4: "XX高速公路集团有限公司",
          p5: "343.32",
          p6: "343.33",
          p7: "张三",
        },
        {
          p1: "XX项目项目项目项目项目",
          p2: "XX_1234",
          p3: "新建",
          p4: "XX高速公路集团有限公司",
          p5: "343.32",
          p6: "343.33",
          p7: "张三",
        },
        {
          p1: "XX项目项目项目项目项目",
          p2: "XX_1234",
          p3: "完结",
          p4: "XX高速公路集团有限公司",
          p5: "343.32",
          p6: "343.33",
          p7: "张三",
        },
        {
          p1: "XX项目项目项目项目项目",
          p2: "XX_1234",
          p3: "完结",
          p4: "XX高速公路集团有限公司",
          p5: "343.32",
          p6: "343.33",
          p7: "张三",
        },
        {
          p1: "XX项目项目项目项目项目",
          p2: "XX_1234",
          p3: "完结",
          p4: "XX高速公路集团有限公司",
          p5: "343.32",
          p6: "343.33",
          p7: "张三",
        },
      ],
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
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  created() {},
  methods: {
    tabChange(index) {
      this.tabIndex = index;
    },
    addNew() {
      this.$message({
        message: "新增记录成功",
        type: "success",
        offset: "360",
      });
      this.showAddNewFlag = true;
    },
    updateRow() {
      this.dialogFormVisible = true;
    },
    hideAddNewDialog() {
      this.showAddNewFlag = false;
    },
    deleteRow() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    viewRow() {
      this.dialogFormVisible1 = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  height: 100%;
  .tree-title {
    line-height: 40px;
    padding-left: 15px;
    border-bottom: 1px solid #ececec;
    font-size: 14px;
  }
  .layout-l {
    width: 260px;
    border-right: 1px solid #eaeaec;
    height: 100%;
  }
  .layout-r {
    flex-grow: 1;
    padding: 10px;
    .tabs-box {
      display: flex;
      border-bottom: 1px solid #e9eaec;
      > div {
        margin-right: 48px;
        line-height: 36px;
        font-size: 14px;
        cursor: pointer;
      }
      > div.active {
        color: #308ae7;
        border-bottom: 1px solid #308ae7;
      }
    }
  }
  .tree-box {
    padding-left: 16px;
    padding-top: 16px;
  }
  .select-box {
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    > div {
      > span {
        margin-right: 5px;
        color: #333;
        font-size: 14px;
      }
    }
    > div:nth-child(2) {
      flex: auto;
    }
  }
  .money-box {
    display: flex;
    background-color: #ebf3fe;
    border: 1px solid #c7dfff;
    padding: 10px;
    border-radius: 3px;
    i {
      width: 15px;
      height: 15px;
      line-height: 15px;
      font-style: normal;
      background-color: #308ae7;
      text-align: center;
      color: #fff;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 5px;
    }
    span {
      color: #308ae7;
      margin: 0 2px;
    }
    > div {
      display: flex;
      margin-right: 45px;
      align-items: center;
    }
  }
  .table-box {
    margin-top: 10px;
  }
}
.dialog-addNew {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 9999;
  .title {
    font-size: 16px;
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
  .con {
    margin-top: 20px;
    padding-right: 40px;
  }
  .con-dialog {
    width: 100%;
    height: 100%;
    background-color: #fff;
    position: relative;
    z-index: 1000;
  }
  .bg-dialog {
    background-color: #000;
    opacity: 0.6;
    width: 100%;
    height: 100%;
    z-index: 999;
    position: fixed;
    left: 0;
    top: 0;
  }
}
</style>
