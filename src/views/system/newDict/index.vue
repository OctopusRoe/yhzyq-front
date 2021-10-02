<template>
  <div class="app-container" @click="hideMenu">
    <div class="height100">
      <el-row :gutter="20">
        <!--部门数据-->
        <el-col :span="4" :xs="24">
          <div class="height100 bdr pd10" :style="{ overflow: 'auto' }">
            <!-- <el-button size="mini" type="primary" @click="addDictCategory()"
              >新增分类</el-button
            >

             <el-button size="mini" type="primary" @click="addDictType()()"
              >新增类别</el-button
            > -->
            <el-button  size="mini" type="primary" @click="addNode()" 
               >新增</el-button>

            <el-button size="mini" type="primary" @click="editNode()"
              >编辑</el-button
            >

            <!-- <el-button v-if="showCategoryButton" icon="el-icon-plus" size="mini" type="primary" @click="addDictCategory()" 
               >新增分类</el-button>
            <el-button  icon="el-icon-plus" size="mini" type="primary" @click="addDictType()" 
               >新增类别</el-button> -->
            

            <el-button size="mini" type="danger" @click="delNode()"
              >删除</el-button
            >
            <!-- <vueMagicTree
            ref="tree"
            :setting="setting"
            :nodes="nodes"
            style="height: 400px"
            @onCreated="handleCreated"
          /> -->
            <dictTree ref="dictTree" @dictTreeClick="refreshTab"> </dictTree>
          </div>
        </el-col>
        <!--字典数据-->
        <el-col :span="20" :xs="24">
          <div class="height100 pd10">
            <el-form
              :model="queryParams"
              ref="queryForm"
              :inline="true"
              v-show="showSearch"
              label-width="100px"
              class="mytable-scrollbar"
            >
              <el-form-item label="字典名称" prop="name">
                <el-input
                  v-model="queryParams.name"
                  placeholder="请输入字典名称"
                  clearable
                  size="small"
                  style="width: 240px"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="字典类型编码" prop="smallMark">
                <el-input
                  v-model="queryParams.smallMark"
                  placeholder="请输入字典类型编码"
                  clearable
                  size="small"
                  style="width: 240px"
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
              </el-form-item>
              <el-form-item style="float: right">
                <el-button
                  v-if="showAddButton"
                  icon="el-icon-plus"
                  size="mini"
                  type="primary"
                  @click="handleAdd"
                  >新增字典</el-button
                >
              </el-form-item>
            </el-form>

            <div style="height: calc(100% - 60px)">
              <vxe-grid
                ref="xTable"
                border
                resizable
                height="auto"
                :loading="loading"
                :seq-config="{
                  startIndex: (tablePage.currentPage - 1) * tablePage.pageSize,
                }"
                :pager-config="tablePage"
                :columns="tableColumn"
                :data="tableData"
                @page-change="handlePageChange"
              >
                <template v-slot:operate="{ row }">
                  <el-button type="text" @click="handleUpdate(row)"
                    >编辑</el-button
                  >
                  <el-divider direction="vertical" />
                  <el-button type="text" @click="handleDelete(row)"
                    >删除</el-button
                  >
                </template>
              </vxe-grid>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-dialog
      :title="title"
      :visible.sync="categoryDialogOpen"
      width="40%"
      text-align:
      center
      append-to-body
    >
      <el-input type="hidden" v-model="categoryForm.id" />
      <el-form
        ref="categoryForm"
        :model="categoryForm"
        :rules="categoryRules"
        label-width="80px"
      >
        <el-row>
          <el-col>
            <el-form-item label="类别编码" prop="code">
              <el-input
                v-model="categoryForm.code"
                placeholder="请输入类别编码"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="名称" prop="name">
              <el-input v-model="categoryForm.name" placeholder="请输入名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="描述" prop="remarks">
              <el-input
                v-model="categoryForm.remarks"
                size="medium"
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitCategoryForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="title"
      :visible.sync="typeDialogOpen"
      width="40%"
      text-align:
      center
      append-to-body
    >
      <el-input type="hidden" v-model="typeForm.categoryId" />
      <el-form
        ref="typeForm"
        :model="typeForm"
        :rules="typeRules"
        label-width="80px"
      >
        <el-row>
          <el-col>
            <el-form-item label="类别编码" prop="id">
              <el-input
                v-model="typeForm.id"
                placeholder="请输入类别编码"
                :disabled="this.title === '编辑字典类别'"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="名称" prop="name">
              <el-input v-model="typeForm.name" placeholder="请输入名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="描述" prop="remarks">
              <el-input
                v-model="typeForm.remarks"
                size="medium"
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitTypeForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="title"
      :visible.sync="dictDialogOpen"
      width="40%"
      text-align:
      center
      append-to-body
    >
      <!-- <el-input type="hidden" v-model="dictForm.dictTypeId" />
      <el-input type="hidden" v-model="dictForm.id" /> -->
      <div class="dialog-footers">
        <el-form
          ref="dictForm"
          :model="dictForm"
          :rules="dictRules"
          label-width="120px"
          :inline="true"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="小分类" prop="smallMark">
                <el-input
                  v-model="dictForm.smallMark"
                  placeholder="请输入小分类"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="字典编码" prop="code">
                <el-input
                  v-model="dictForm.code"
                  placeholder="请输入字典编码"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="字典名称" prop="name">
                <el-input
                  v-model="dictForm.name"
                  placeholder="请输入字典名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="字典值" prop="vals">
                <el-input v-model="dictForm.vals" placeholder="请输入字典值" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="字典排序" prop="sortOrder">
                <el-input
                  v-model="dictForm.sortOrder"
                  placeholder="请输入字典排序"
                  type="number"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="描述" prop="remarks">
                <el-input
                  v-model="dictForm.remarks"
                  size="medium"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button type="primary" @click="submitDictForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- <div id="rMenu" :style="rMenuPosi">
      <ul>
        <li v-show="menuType == 1" @click="addDictCategory()">新增类别</li>
        <li v-show="menuType == 2" @click="addDictType()">新增字典</li>
        <li v-show="menuType == 2" @click="updDictCategory()">编辑类别</li>
        <li v-show="menuType == 2" @click="delDictCategory()">删除类别</li>
        <li v-show="menuType == 3" @click="updDictType()">编辑字典</li>
        <li v-show="menuType == 3" @click="delDictType()">删除字典</li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import {
  addDictType,
  deleteDictCategory,
  deleteDictType,
  getDictCategoryById,
  getDictPageData,
  getDictTypeById,
  getDictTypeTreeData,
  saveOrUpdateDictCategory,
  updateDictType,
  getDictById,
  updateDict,
  addDict,
  delDict,
} from "@/api/system/newDict";
// import VueMagicTree from "vue-magic-tree";
import dictTree from "./dictTree";

export default {
  name: "NewDict",
  components: {
    // VueMagicTree,
    dictTree,
  },
  data() {
    return {
      // 遮罩层
      loading: false,
      // 显示搜索条件
      showSearch: true,
      siderHeigth: window.innerHeight - 147 + "px",
      // 弹出层标题
      title: "增加子节点",
      // 部门树选项
      deptOptions: undefined,
      // 是否显示弹出层
      categoryDialogOpen: false,
      // 是否显示弹出层
      typeDialogOpen: false,
      dictDialogOpen: false,
      showAddButton: false,
      showTypeButton: false,
      showCategoryButton: true,
      dictTypeId: "",
      categoryId: "",
      dictType: "",
      // 部门名称
      dictTypeName: undefined,
      // 菜单的类型 1 在最外层上 2 在类型节点上 3 在字典节点上
      menuType: 1,
      // 字典分类表单参数
      categoryForm: {
        id: "",
        code: "",
        name: "",
        remarks: "",
      },
      // 字典类别表单参数
      typeForm: {
        id: "",
        name: "",
        remarks: "",
        categoryId: "",
      },
      // 字典表单参数
      dictForm: {},
      rMenuPosi: "left:0;top:0px",
      nodes: [],
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 15,
        align: "right",
        pageSizes: [15, 30, 50, 100],
        layouts: [
          "Sizes",
          "PrevJump",
          "PrevPage",
          "Number",
          "NextPage",
          "NextJump",
          "FullJump",
          "Total",
        ],
        perfect: true,
      },

      tableColumn: [
        { field: "sortOrder", title: "排序" },
        { field: "name", title: "字典名称" },
        { field: "id", title: "字典ID" },
        { field: "dictType.name", title: "字典类别名称" },
        { field: "smallMark", title: "小分类" },
        { field: "code", title: "编码" },
        { field: "vals", title: "字典值" },
        { field: "remarks", title: "描述" },
        {
          title: "操作",
          width: 200,
          align: "center",
          slots: { default: "operate" },
        },
      ],
      tableData: [],
      // 查询参数
      queryParams: {
        pageNumber: 1,
        pageSize: 15,
        smallMark: undefined,
        name: undefined,
        dictType: {
          id: undefined,
        },
      },
      // 表单校验
      categoryRules: {
        code: [
          { required: true, message: "类别编码不能为空", trigger: "blur" },
        ],
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
      },
      // 表单校验
      typeRules: {
        id: [{ required: true, message: "类别编码不能为空", trigger: "blur" }],
        code: [
          { required: true, message: "类别编码不能为空", trigger: "blur" },
        ],
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
      },
      // 表单校验
      dictRules: {
        code: [
          { required: true, message: "类别编码不能为空", trigger: "blur" },
        ],
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        smallMark: [
          { required: true, message: "小编码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    // 根据名称筛选部门树
    dictTypeId(val) {
      this.queryParams.dictTypeId = val;

      this.searchPage();
    },
  },
  created() {
    // this.searchPage();
  },
  methods: {
    addNode(){
     if(this.dictTypeId === ""){
        this.addDictCategory();
      }else{

        this.addDictType()
      }

    },

    editNode() {
      if (this.dictType === "category") {
        this.updDictCategory();
      }
      if (this.dictType === "dict") {
        this.updDictType();
      }
    },
    delNode() {
      if (this.dictType === "category") {
        this.delDictCategory();
      }
      if (this.dictType === "dict") {
        this.delDictType();
      }
    },
    handleAdd() {
      // this.categoryDialogOpen = false;
      // this.typeDialogOpen = false;

      if (this.dictType === "") {
        this.$message({
          message: "请选择类型树",
          type: "warning",
        });
        return false;
      }
      if (this.dictType === "category") {
        this.$message({
          message: "请选择类型树子节点",
          type: "warning",
        });
        return false;
      }
      this.dictDialogOpen = true;
      this.reset();
      this.title = "新增字典";
      this.dictForm.dictTypeId = this.queryParams.dictTypeId;
    },

    handleUpdate(row) {
      this.categoryDialogOpen = false;
      this.typeDialogOpen = false;
      this.dictDialogOpen = true;
      this.reset();
      this.title = "编辑字典";
      getDictById(row.id).then((res) => {
        if (res.success) {
          let data = res.data[0];
          console.log(data);
          this.dictForm.id = data.id;
          console.log(data.id);
          this.dictForm.dictTypeId = data.dictTypeId;
          this.dictForm.code = data.code;
          this.dictForm.name = data.name;
          this.dictForm.smallMark = data.smallMark;
          this.dictForm.vals = data.vals;
          this.dictForm.sortOrder = data.sortOrder;
          this.dictForm.remarks = data.remarks;
        }
      });
    },
    handleDelete(row) {
      this.$confirm("是否确认删除该字典?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return delDict(row.id);
        })
        .then(() => {
          this.searchPage();
          this.msgSuccess("删除成功");
        })
        .catch(function () {
          this.msgSuccess("删除成功");
        });
    },
    addDictCategory() {
      this.typeDialogOpen = false;
      this.dictDialogOpen = false;
      this.title = "新增分类";
      this.categoryDialogOpen = true;
    },
    updDictCategory() {
      if(this.dictTypeId === ""){
        return false;
      }
      this.getDictCategoryById();
      this.typeDialogOpen = false;
      this.dictDialogOpen = false;
      this.title = "编辑分类";
      this.categoryDialogOpen = true;
    },

    getDictCategoryById() {
      getDictCategoryById(this.dictTypeId).then((res) => {
        if (res.success) {
          this.categoryForm.id = res.data.id;
          this.categoryForm.code = res.data.code;
          this.categoryForm.name = res.data.name;
          this.categoryForm.remarks = res.data.remarks;
        }
      });
    },
    delDictCategory() {
      this.$confirm("是否确认删除该字典分类?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return deleteDictCategory(this.dictTypeId);
        })
        .then((res) => {
          if (res.rtnCode === 200) {
            this.$refs.dictTree.getTreeData();
            //this.searchPage()
            this.msgSuccess("删除成功");
          }
          if (res.error) {
            this.$message({
              message: "节点下有数据，无法删除!",
              type: "danger",
            });
          }
        });
    },
    addDictType() {
     
      this.typeDialogOpen = true;
      this.categoryDialogOpen = false;
      this.dictDialogOpen = false;
      this.title = "新增字典类别";
    },
    updDictType() {
      this.categoryDialogOpen = false;
      this.dictDialogOpen = false;
      this.title = "编辑字典类别";
      this.getDictTypeById();
      this.typeDialogOpen = true;
      this.typeForm.id;
    },
    getDictTypeById() {
      getDictTypeById(this.dictTypeId).then((res) => {
        this.typeForm.id = res.data.id;
        this.typeForm.categoryId = res.data.categoryId;
        this.typeForm.name = res.data.name;
        this.typeForm.remarks = res.data.remarks;
      });
    },
    delDictType() {
      this.$confirm("是否确认删除该字典类别?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        return deleteDictType(this.dictTypeId).then((res) => {
          if (res.rtnCode === 200) {
            this.$refs.dictTree.getTreeData();
            //this.searchPage()
            this.msgSuccess("删除成功");
          } else {
            this.msgError("删除失败");
          }
        });
      });
    },
    hideMenu() {
      this.rMenuPosi = "left:0;top:0px;visibility:hidden";
    },
    zTreeBeforeRightClick: function (treeId, treeNode) {
      this.reset();
      if (treeNode == null) {
        this.menuType = 1;
      } else {
        if (treeNode.type == "category") {
          this.menuType = 2;
          this.categoryForm.id = treeNode.id;
          this.typeForm.categoryId = treeNode.id;
        } else {
          this.menuType = 3;
          this.typeForm.id = treeNode.id;
        }
      }

      let y = window.event.y - 100;
      this.rMenuPosi = "left:8%;top:" + y + "px;visibility:visible";
      document.oncontextmenu = function (e) {
        return false;
      };
    },
    handleCreated: function (ztreeObj) {
      if (ztreeObj.getNodes().length > 0) {
        let firstNode = ztreeObj.getNodes()[0];
        this.queryParams.dictType.id = firstNode.id;
        // 展开第一个节点
        ztreeObj.expandNode(firstNode, true);
        this.searchPage();
      }
    },
    handlePageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage;
      this.tablePage.pageSize = pageSize;
      this.queryParams.pageSize = pageSize;
      this.queryParams.pageNumber = currentPage;
      this.searchPage();
    },
    /** 查询字典列表 */
    searchPage() {
      getDictPageData(this.queryParams).then((res) => {
        this.tableData = res.rows;
        this.tablePage.total = res.total;
      });
    },
    /** 查询字典类型树结构 */
    getDictTypeTreeData() {
      getDictTypeTreeData().then((response) => {
        this.nodes = response;
      });
    },
    // 节点单击事件
    zTreeOnClick: function (evt, treeId, treeNode) {
      this.queryParams.dictType.id = treeNode.id;
      this.searchPage();
      this.showAddButton = treeNode.type !== "category";
    },

    refreshTab(data) {
      this.queryParams.pageNumber = 1;
      console.log("asd", data);
      this.dictTypeId = data.data.id;
      this.dictType = data.data.type;
      if (this.dictType === "dict") {
        this.showAddButton = true;
        this.categoryId = data.categoryId;
      }

      this.searchPage();
    },

    /** 提交按钮 */
    submitCategoryForm: function () {
      this.$refs["categoryForm"].validate((valid) => {
        if (valid) {
          saveOrUpdateDictCategory(this.categoryForm).then((response) => {
            if (response.rtnCode === 200) {
              this.msgSuccess(response.msg);
              this.categoryDialogOpen = false;
              this.$refs.dictTree.getTreeData();
            }
          });
        }
      });
    },
    /** 提交按钮 */
    submitTypeForm: function () {
      // this.typeForm.categoryId = this.dictTypeId;
      // console.log("typeForm",this.typeForm,this.dictTypeId)

      this.$refs["typeForm"].validate((valid) => {
        if (valid) {
          if (this.title === "编辑字典类别") {
            updateDictType(this.typeForm).then((response) => {
              if (response.rtnCode === 200) {
                this.$refs.dictTree.getTreeData();
                this.msgSuccess(response.msg);
                this.searchPage();
                this.dictDialogOpen = false;
              }
              if (response.success) {
                this.$message({
                  message: "更新成功!",
                  type: "success",
                });
              } else {
                this.$message({
                  message: "!",
                  type: "danger",
                });
              }
            });
          } else {
            this.typeForm.categoryId = this.dictTypeId;
            addDictType(this.typeForm).then((response) => {
              if (response.rtnCode === 200) {
                this.$refs.dictTree.getTreeData();
                this.msgSuccess(response.msg);
                this.typeDialogOpen = false;
                // this.getDictTypeTreeData();
              }
            });
          }
        }
      });
    },
    /** 提交按钮 */
    submitDictForm: function () {
      this.$refs["dictForm"].validate((valid) => {
        if (valid) {
          if (this.dictForm.id != undefined) {
            updateDict(this.dictForm).then((response) => {
              if (response.rtnCode === 200) {
                this.msgSuccess(response.msg);
                this.dictDialogOpen = false;
                this.searchPage();
              }
            });
          } else {
            addDict(this.dictForm).then((response) => {
              if (response.rtnCode === 200) {
                this.msgSuccess(response.msg);
                this.dictDialogOpen = false;
                this.searchPage();
              }
            });
          }
        }
      });
    },

    // 取消按钮
    cancel() {
      this.categoryDialogOpen = false;
      this.typeDialogOpen = false;
      this.dictDialogOpen = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.categoryForm = {
        id: undefined,
        code: undefined,
        name: undefined,
        remarks: undefined,
      };
      this.typeForm = {
        id: undefined,
        name: undefined,
        categoryId: undefined,
        remarks: undefined,
      };
      this.dictForm = {
        id: undefined,
        dictTypeId: undefined,
        name: undefined,
        code: undefined,
        smallMark: undefined,
        vals: undefined,
        sortOrder: undefined,
        remarks: undefined,
      };

      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.searchPage();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.searchPage();
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
div#rMenu {
  position: absolute;
  top: 0;
  text-align: left;
  border: 1px solid #d3d3d3;
  background-color: #fff;
  visibility: hidden;

  ul {
    margin: 0;
    padding: 0;
  }
}

div#rMenu ul li {
  padding: 0 5px;
  cursor: pointer;
  list-style: none outside none;
  padding: 6px 15px;

  &:hover {
    background-color: #e2e2e2;
    color: #000;
  }
}
.dialog-footers {
  margin-top: -20px;
}
.dialog-footer {
  margin-top: -40px;
}
</style>
