<template>
  <div class="app-container">
    <div class="height100">
      <el-row>
        <el-col :span="4">
          <div class="height100 bdr pd10">
            <componentsTree
              :treeData="data"
              :defaultProps="defaultProps"
              @handleRightClick="handleRightClick"
              @handleNodeClick="handleNodeClick"
            ></componentsTree>
            <vue-context-menu
              :contextMenuData="contextMenuData"
              @contextmenu="showMenu"
              @addNode="addNode"
              @editNode="editNode"
              @deleteNode="deleteNode"
            ></vue-context-menu>
          </div>
        </el-col>

        <el-col :span="20">
          <div class="height100 pd10">
            <el-form :model="queryParams" ref="queryForm" :inline="true">
              <el-form-item label="标题" prop="title">
                <el-input
                  v-model="queryParams.title"
                  placeholder="请输入标题"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="小标题" prop="litteTitle">
                <el-input
                  v-model="queryParams.litteTitle"
                  placeholder="请输入小标题"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="关键字" prop="keyWords">
                <el-input
                  v-model="queryParams.keyWords"
                  placeholder="请输入关键字"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  type="cyan"
                  icon="el-icon-search"
                  size="mini"
                  @click="handleQuery"
                  >搜索</el-button
                >
                <el-button
                  icon="el-icon-refresh"
                  size="mini"
                  @click="resetQuery"
                  >重置</el-button
                >
                <el-button
                  type="primary"
                  icon="el-icon-plus"
                  size="mini"
                  @click="handleAdd"
                  >新增</el-button
                >
              </el-form-item>
            </el-form>

            <vxe-table :data="tableData">
              <vxe-table-column type="seq" width="60"></vxe-table-column>
              <vxe-table-column field="title" title="标题"></vxe-table-column>
              <vxe-table-column field="toped" title="置顶"></vxe-table-column>
              <vxe-table-column
                field="keyWords"
                title="关键字"
              ></vxe-table-column>
              <vxe-table-column field="state" title="状态"></vxe-table-column>
              <vxe-table-column
                field="publicTime"
                title="发表时间"
              ></vxe-table-column>
              <vxe-table-column field="opt" width="200" title="操作">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    @click="handleUpdate(scope.row)"
                  />
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    :disabled="multiple"
                    @click="handleDelete(scope.row)"
                    circle
                    v-hasPermi="['system:dict:remove']"
                  ></el-button>
                  <el-button
                    icon="el-icon-view"
                    type="info"
                    @click="handleView(scope.row)"
                    circle
                  ></el-button>
                </template>
              </vxe-table-column>
            </vxe-table>
            <vxe-pager
              :current-page="tablePage.currentPage"
              :page-size="tablePage.pageSize"
              :total="tablePage.total"
              :layouts="[
                'PrevPage',
                'JumpNumber',
                'NextPage',
                'FullJump',
                'Sizes',
                'Total',
              ]"
              @page-change="handlePageChange"
            >
            </vxe-pager>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="类型编码:" label-width="100px" prop="code">
              <el-input v-model="form.code" placeholder="编码" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类型名称:" label-width="100px" prop="typename">
              <el-input v-model="form.typename" placeholder="名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="上级类型:" label-width="100px" prop="pid">
              <treeselect
                v-model="form.pid"
                :options="pidOptions"
                :normalizer="normalizer"
                :defaultExpandLevel="Infinity"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="排序号:"
              label-width="100px"
              prop="sortedOrder"
            >
              <el-input v-model="form.sortedOrder" placeholder="排序号" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="备注:" label-width="100px" prop="remark">
              <el-input v-model="form.remark" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <span v-if="flag">
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </span>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="title1"
      :visible.sync="open1"
      width="800px"
      append-to-body
    >
      <el-form ref="form1" :model="form1" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="标题:" prop="title">
              <el-input v-model="form1.title" placeholder="编码" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="小标题:" prop="litteTitle">
              <el-input v-model="form1.litteTitle" placeholder="小标题" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="新闻类型:" prop="commonTypeId">
              <treeselect
                v-model="form.commonTypeId"
                :options="pidOptions"
                :normalizer="normalizer"
                :defaultExpandLevel="Infinity"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="关键字:" prop="keyWords">
              <el-input v-model="form1.keyWords"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否置顶:" prop="toped">
              <el-checkbox v-model="form1.toped"></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="作者名:" prop="writer">
              <el-input v-model="form1.writer"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="内容:" prop="contents">
              <editor v-model="form1.contents" :min-height="192" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <span v-if="flag">
          <el-button type="primary" @click="submitForm1">确 定</el-button>
        </span>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import "element-ui/theme-chalk/index.css";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import {
  treeDatas,
  addNode,
  getNodeById,
  delNode,
  listNews,
  del,
  addNews,
  getById,
} from "@/api/system/news";
import ElPager from "element-ui/packages/pagination/src/pager";
import componentsTree from "@/components/common/tree/tree";
import Editor from "@/components/common/Editor";
import Treeselect from "@riophae/vue-treeselect";

export default {
  name: "index",
  components: { ElPager, componentsTree, Editor, Treeselect },
  data() {
    return {
      // define options
      pidOptions: [],
      normalizer(node) {
        //去掉children=[]的children属性
        if (node.children && !node.children.length) {
          delete node.children;
        }
        return {
          id: node.id,
          children: node.children,
          label: node.text,
        };
      },
      data: [],
      defaultProps: {
        children: "children",
        label: "text",
      },
      // 查询参数
      queryParams: {
        pageNumber: 1,
        pageSize: 10,
        name: undefined,
        status: undefined,
      },
      tablePage: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        align: "center",
        pageSizes: [10, 20, 50, 100, 200, 500],
        perfect: true,
      },
      // 显示搜索条件
      showSearch: true,
      //列表
      tableData: [],
      // 弹出层标题
      title: "",
      title1: "",
      // 是否显示弹出层
      open: false,
      open1: false,
      // 表单参数
      form: {},
      form1: {},
      // defaultProps: {
      //   children: "children",
      //   label: "label"
      // },
      defaultProp: {
        label: "text",
        id: "id",
        pid: "pid",
      },
      // 表单校验
      rules: {
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        // country: [
        //   {required: true, message: "表达示不能为空", trigger: "blur"}
        // ],
        parentId: [
          { required: true, message: "服务名不能为空", trigger: "blur" },
        ],
        code: [{ required: true, message: "编码不能为空", trigger: "blur" }],
      },
      fileList: [],
      litteTitleOptions: [],
      flag: true,
      // contextmenu data (菜单数据)
      contextMenuData: {
        // the contextmenu name(@1.4.1 updated)
        menuName: "demo",
        // The coordinates of the display(菜单显示的位置)
        axis: {
          x: null,
          y: null,
        },
        // Menu options (菜单选项)
        menulists: [
          {
            fnHandler: "addNode", // Binding events(绑定事件)
            icoName: "fa fa-home fa-fw", // icon (icon图标 )
            btnName: "新增", // The name of the menu option (菜单名称)
          },
          {
            fnHandler: "editNode",
            icoName: "fa fa-home fa-fw",
            btnName: "修改",
          },
          {
            fnHandler: "deleteNode",
            icoName: "fa fa-home fa-fw",
            btnName: "删除",
          },
        ],

        //树节点对象
        node: {},
      },
    };
  },
  created() {
    this.getTreeDatas();
    this.getList();
  },
  methods: {
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open1 = true;
      this.title1 = "添加";
      this.getTreeDatas();
      this.pidOptions = this.data;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id;
      getById(id).then((response) => {
        this.form1 = response.data;
        this.open1 = true;
        this.title1 = "修改";
      });
    },
    handleView(row) {
      this.reset();
      this.flag = false;
      const id = row.id;
      getById(id).then((response) => {
        this.form1 = response.data;
        this.open1 = true;
        this.title1 = "查看";
      });
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = tablePage.currentPage;
      this.queryParams.pageSize = tablePage.pageSize;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
    },
    getTreeDatas() {
      treeDatas().then((response) => {
        this.data = response;
      });
    },
    getList() {
      this.loading = true;
      listNews(this.queryParams).then((response) => {
        this.tableData = response.rows;
        this.tablePage.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.open1 = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        name: undefined,
        expr: undefined,
        serviceName: undefined,
        methodName: undefined,
      };
    },

    /** 提交按钮 */
    submitForm1: function () {
      this.$refs["form1"].validate((valid) => {
        if (valid) {
          addNews(this.form1).then((response) => {
            if (response.rtnCode === 200) {
              this.msgSuccess(response.msg);
              this.open1 = false;
              this.getList();
            }
          });
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const id = row.id;
      this.$confirm('是否确认删除编号为"' + id + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return del(id);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function () {});
    },

    /**
     * 远程加载类型
     * @param query
     */

    // remoteType() {
    //   getAppType().then(
    //     response => {
    //       console.log(response);
    //       response.forEach(element => {
    //         this.appTypeOptions.push({typeName: element.name, type: element.id});
    //       })
    //     }
    //   );
    // },

    handlePageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage;
      this.tablePage.pageSize = pageSize;
      this.queryParams.pageNumber = currentPage;
      this.queryParams.pageSize = pageSize;
      this.getList();
    },

    handleRightClick(node) {
      this.node = node;
      this.showMenu();
    },
    handleNodeClick() {},
    showMenu() {
      event.preventDefault();
      var x = event.clientX;
      var y = event.clientY;
      // Get the current location
      this.contextMenuData.axis = {
        x,
        y,
      };
    },
    addNode() {
      this.reset();
      this.open = true;
      this.title = "添加";
      this.getTreeDatas();
      this.pidOptions = this.data;
    },
    editNode() {
      this.reset();
      const id = this.node.id;
      getNodeById(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改";
      });
    },
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          addNode(this.form).then((response) => {
            if (response.rtnCode === 200) {
              this.msgSuccess(response.msg);
              this.open = false;
              this.getTreeDatas();
            }
          });
        }
      });
    },
    deleteNode() {
      const id = this.node.id;
      this.$confirm('是否确认删除编号为"' + id + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delNode(id);
        })
        .then(() => {
          this.getTreeDatas();
          this.msgSuccess("删除成功");
        })
        .catch(function () {});
    },
  },
};
</script>

