<template>
  <div class="app-container">
    <div class="height100">
      <el-row :gutter="20">
        <!--部门数据-->
        <el-col :span="4" :xs="24" :style="{ height: siderHeigth }">
          <div class="height100 bdr  pd10">
            <el-button
              size="mini"
              type="primary"
              @click="addNode()"
              :disabled="commonTypeId == ''"
              >新增</el-button
            >
            <el-button
              size="mini"
              type="primary"
              @click="editNode()"
              :disabled="extConfigTypeId == ''"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="delNode()"
              :disabled="extConfigTypeId == ''"
              >删除</el-button
            >

            <typeTree ref="typeTree" @typeTreeClick="refreshTab"> </typeTree>
          </div>
        </el-col>
        <!---->
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
              <el-form-item label="扩展属性名称" prop="attrName">
                <el-input
                  v-model="queryParams.attrName"
                  placeholder="请输入扩展属性名称"
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
              <el-form-item style="float:right">
                <el-button
                  v-if="showAddButton"
                  icon="el-icon-plus"
                  size="mini"
                  type="primary"
                  @click="handleAdd"
                  >新增扩展配置</el-button
                >
              </el-form-item>
            </el-form>

            <div style="height:calc(100% - 60px)">
              <vxe-grid
                ref="xTable"
                border
                resizable
                height="auto"
                :loading="loading"
                :seq-config="{
                  startIndex: (tablePage.currentPage - 1) * tablePage.pageSize
                }"
                :pager-config="tablePage"
                :columns="tableColumn"
                :data="tableData"
                @page-change="handlePageChange"
              >
                <template v-slot:needed="{ row }">
                  <span v-if="row.needed == '0'">否</span>
                  <span v-else>是</span>
                </template>
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

    <addExtConfigType
      ref="addExtConfigType"
      @ok="treeOk"
      @show="dialogShow"
    ></addExtConfigType>
    <editExtConfigType
      ref="editExtConfigType"
      @ok="treeOk"
      @show="dialogShow"
    ></editExtConfigType>
    <addExtConfig
      ref="addExtConfig"
      @ok="searchPage"
      @show="dialogShow"
    ></addExtConfig>
    <editExtConfig
      ref="editExtConfig"
      @ok="searchPage"
      @show="dialogShow"
    ></editExtConfig>
  </div>
</template>

<script>
import {
  pageDataList,
  saveData,
  delDataById,
  updateData,
  delExtConfigType
} from "@/api/system/extConfig/index";
import { queryDataForNewProperty } from "@/api/system/assets/index";
// import VueMagicTree from "vue-magic-tree";
import typeTree from "./module/typeTree";
import addExtConfigType from "./module/addExtConfigType";
import editExtConfigType from "./module/editExtConfigType";
import addExtConfig from "./module/addExtConfig";
import editExtConfig from "./module/editExtConfig";

export default {
  name: "SystemExtConfigIndex",
  components: {
    // VueMagicTree,
    typeTree,
    addExtConfigType,
    editExtConfigType,
    addExtConfig,
    editExtConfig
  },
  data() {
    return {
      // 遮罩层
      loading: false,
      dialogShow: false,
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
        remarks: ""
      },
      // 字典类别表单参数
      typeForm: {
        id: "",
        name: "",
        remarks: "",
        categoryId: ""
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
          "Total"
        ],
        perfect: true
      },

      tableColumn: [
        { field: "code", title: "编码" },
        { field: "attrCode", title: "扩展属性代码" },
        { field: "attrName", title: "扩展属性名称" },
        { field: "fieldType", width: 200, title: "字段类型" },
        { field: "attrLen", title: "长度" },
        { field: "regExp", title: "验证规则" },
        { field: "readOnly", title: "是否只读" },
        { field: "forbided", title: "是否禁止" },
        { field: "needed", title: "必须", slots: { default: "needed" } },
        { field: "sortedNum", title: "排序" },
        {
          title: "操作",
          width: 200,
          align: "center",
          slots: { default: "operate" }
        }
      ],
      tableData: [],
      // 查询参数
      queryParams: {
        pageNumber: 1,
        pageSize: 15,
        extConfigTypeId: "",
        commonTypeId: "",
        attrName: ""
      },
      extConfigTypeId: "",
      extConfigTypeData: {},
      commonTypeId: "",
      nodeType: "",
      //新增扩展配置需要的的数据
      propertyData: [],
      // 表单校验
      categoryRules: {
        code: [
          { required: true, message: "类别编码不能为空", trigger: "blur" }
        ],
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }]
      },
      // 表单校验
      typeRules: {
        id: [{ required: true, message: "类别编码不能为空", trigger: "blur" }],
        code: [
          { required: true, message: "类别编码不能为空", trigger: "blur" }
        ],
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }]
      },
      // 表单校验
      dictRules: {
        code: [
          { required: true, message: "类别编码不能为空", trigger: "blur" }
        ],
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        smallMark: [
          { required: true, message: "小编码不能为空", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    // 根据名称筛选部门树
    // dictTypeId(val) {
    //   this.queryParams.dictTypeId = val;
    //   this.searchPage();
    // }
  },
  created() {
    queryDataForNewProperty().then(res => {
      if (res && res.success) {
        this.propertyData = res.data;
      }
    });
  },
  methods: {
    addNode() {
      //新增扩展配置类型
      this.$nextTick(() => {
        this.$refs.addExtConfigType.showModal(this.commonTypeId);
      });
    },
    editNode() {
      //编辑扩展配置类型
      this.$nextTick(() => {
        this.$refs.editExtConfigType.showModal(this.extConfigTypeData);
      });
    },
    delNode() {
      //删除扩展配置类型
      delExtConfigType({ id: this.extConfigTypeId }).then(res => {
        if (res && res.success) {
          this.msgSuccess("删除成功");
          //刷新树数据
          this.treeOk();
        }
      });
    },
    //新增扩展配置
    handleAdd() {
      if (this.extConfigTypeId === undefined || this.extConfigTypeId === "") {
        this.$message({
          message: "请选择分类",
          type: "warning"
        });
        return false;
      }
      this.$nextTick(() => {
        this.$refs.addExtConfig.showModal(
          this.extConfigTypeId,
          this.propertyData
        );
      });
    },
    //修改扩展配置
    handleUpdate(row) {
      this.$nextTick(() => {
        this.$refs.editExtConfig.showModal(row.id, this.propertyData);
      });
    },
    //删除配置数据
    handleDelete(row) {
      this.$confirm("是否确认删除该数据?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delDataById({ id: row.id }).then(res => {
          if (res.success) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.searchPage();
          } else {
            this.$message({
              message: res.message,
              type: "info"
            });
          }
        });
      });
    },
    //刷新左边树数据
    treeOk() {
      this.$refs.typeTree.getTreeData();
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
      getDictTypeById(this.dictTypeId).then(res => {
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
        type: "warning"
      }).then(() => {
        return deleteDictType(this.dictTypeId).then(res => {
          if (res.rtnCode === 200) {
            this.$refs.typeTree.getTreeData();
            //this.searchPage()
            this.msgSuccess("删除成功");
          } else {
            this.msgError("删除失败");
          }
        });
      });
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
      this.queryParams.commonTypeId = this.commonTypeId;
      this.queryParams.extConfigTypeId = this.extConfigTypeId;
      pageDataList(this.queryParams).then(res => {
        this.tableData = res.rows;
        this.tablePage.total = res.total;
      });
    },
    refreshTab(data) {
      this.queryParams.pageNumber = 1;
      console.log("asd", data);
      this.nodeType = data.type;
      console.log("this.nodeType:" + this.nodeType);
      if (this.nodeType === "config") {
        //点击的二级（二级是扩展配置类型）
        this.showAddButton = true;
        this.extConfigTypeId = data.data.id;
        this.extConfigTypeData = data.data;
        this.commonTypeId = data.data.commonTypeId;
      } else {
        this.showAddButton = false;
        //点击的以及(一级是通用分类)
        this.extConfigTypeId = "";
        this.extConfigTypeData = undefined;
        this.commonTypeId = data.data.id;
      }

      this.searchPage();
    },

    /** 提交按钮 */
    submitCategoryForm: function() {
      this.$refs["categoryForm"].validate(valid => {
        if (valid) {
          saveOrUpdateDictCategory(this.categoryForm).then(response => {
            if (response.rtnCode === 200) {
              this.msgSuccess(response.msg);
              this.categoryDialogOpen = false;
              this.$refs.typeTree.getTreeData();
            }
          });
        }
      });
    },
    /** 提交按钮 */
    submitTypeForm: function() {
      this.$refs["typeForm"].validate(valid => {
        if (valid) {
          if (this.title === "编辑字典类别") {
            updateDictType(this.typeForm).then(response => {
              if (response.rtnCode === 200) {
                this.$refs.typeTree.getTreeData();
                this.msgSuccess(response.msg);
                this.searchPage();
                this.dictDialogOpen = false;
              }
              if (response.success) {
                this.$message({
                  message: "更新成功!",
                  type: "success"
                });
              } else {
                this.$message({
                  message: "!",
                  type: "danger"
                });
              }
            });
          } else {
            this.typeForm.categoryId = this.categoryId;
            addDictType(this.typeForm).then(response => {
              if (response.rtnCode === 200) {
                this.$refs.typeTree.getTreeData();
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
    submitDictForm: function() {
      this.$refs["dictForm"].validate(valid => {
        if (valid) {
          if (this.dictForm.id != undefined) {
            updateDict(this.dictForm).then(response => {
              if (response.rtnCode === 200) {
                this.msgSuccess(response.msg);
                this.dictDialogOpen = false;
                this.searchPage();
              }
            });
          } else {
            addDict(this.dictForm).then(response => {
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
        remarks: undefined
      };
      this.typeForm = {
        id: undefined,
        name: undefined,
        categoryId: undefined,
        remarks: undefined
      };
      this.dictForm = {
        id: undefined,
        dictTypeId: undefined,
        name: undefined,
        code: undefined,
        smallMark: undefined,
        vals: undefined,
        sortOrder: undefined,
        remarks: undefined
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
    }
  }
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
