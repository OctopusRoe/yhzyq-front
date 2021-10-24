<template>
  <div>
    <el-row :gutter="1">
      <el-col :span="4" :xs="24">
        <!-- <div class="box" align="center"> -->
        <el-card class="box-card" :style="{ height: siderHeigth }">
          <el-select
            v-model="systemId"
            placeholder="请选择"
            style="width: 100%;margin-top: 10px"
            @change="handleSelectSystem"
          >
            <el-option
              v-for="item in systemOptions"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <div>
            <el-tree
              style="width: 100%;margin-top: 10px"
              :data="client"
              :props="defaultProps"
              default-expand-all
              @node-click="handleNodeClick"
              :highlight-current="true"
            >
            </el-tree>
          </div>
        </el-card>
        <!-- </div> -->
      </el-col>
      <el-col :span="20" :xs="24">
        <el-card class="box-card" :style="{ height: siderHeigth }">
          <el-form
            :model="queryParams"
            ref="queryForm"
            :inline="true"
            v-show="showSearch"
          >
            <div class="querybox">
              <el-form-item label="资源名称" prop="menuName">
                <el-input
                  v-model="queryParams.menuName"
                  placeholder="请输入资源名称"
                  clearable
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="状态" prop="status">
                <el-select v-model="queryParams.status" placeholder="菜单状态">
                  <el-option
                    v-for="dict in statusOptions"
                    :key="dict.vals"
                    :label="dict.name"
                    :value="dict.vals"
                  />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  @click="handleQuery"
                  >搜索
                </el-button>
                <el-button icon="el-icon-refresh-right" @click="resetQuery"
                  >重置
                </el-button>
              </el-form-item>
              <span style="float: right">
                <el-button type="primary" icon="el-icon-plus" @click="handleAdd"
                  >新增</el-button
                >
                <el-button
                  type="danger"
                  @click="handleBatchDelete"
                  icon="el-icon-delete"
                  >批量删除</el-button
                >
                <el-button type="primary" icon="el-icon-upload" disabled
                  >导入</el-button
                >
              </span>
            </div>
          </el-form>
          <!-- <div class="detail-table-wrap table-treeline"> -->
          <el-table
            ref="menuTable"
            v-loading="loading"
            :data="menuList"
            border
            :select-on-indeterminate="false"
            row-key="menuId"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            @select="select"
            @select-all="selectAll"
            @selection-change="selectionChange"
            class="table-treeline"
          >
            <el-table-column type="selection" width="55" align="center">
            </el-table-column>
            <el-table-column
              prop="menuName"
              label="资源名称"
              align="left"
              header-align="center"
              :show-overflow-tooltip="true"
              width="230"
              class-name="treeline"
            >
              <template slot-scope="scope">
                <div class="line"></div>
                <svg-icon
                  icon-class="file1"
                  class="icon-file"
                  v-if="scope.row.children.length == 0"
                />
                <span v-else class="sp"> </span>
                <label>{{ scope.row.menuName }}</label>
              </template>
            </el-table-column>
            <el-table-column
              prop="icon"
              label="图标"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <svg-icon :icon-class="scope.row.icon" />
              </template>
            </el-table-column>
            <el-table-column
              prop="orderNum"
              label="排序"
              align="center"
              width="60"
            ></el-table-column>
            <el-table-column
              prop="path"
              label="路由地址"
              header-align="center"
              width="160"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="component"
              label="组件路径"
              header-align="center"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              align="center"
              :formatter="statusFormat"
              width="80"
            ></el-table-column>
            <el-table-column
              label="创建时间"
              align="center"
              width="200"
              prop="createTime"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              width="140"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-button type="text" @click="handleUpdate(scope.row)"
                  >修改</el-button
                >
                <el-divider direction="vertical" />
                <el-button type="text" @click="handleDelete(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- </div> -->
          <div class="detail-pages-wrap" align="right">
            <!-- <el-pagination
              layout="total"
              :total="menuList.length">
              background
            </el-pagination> -->
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- <div class="copyright">
      <span>江西锦路技开发有限公司</span><span>版权所有</span>
    </div> -->
    <!-- 添加或修改菜单对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="800px"
      append-to-body
      :close-on-click-modal="false"
      inline="true"
      class="dialog-customer"
    >
      <div class="dialog-footers">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="上级菜单">
                <treeselect
                  v-model="form.parentId"
                  :options="menuOptions"
                  :normalizer="normalizer"
                  :show-count="true"
                  placeholder="选择上级菜单"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="菜单类型" prop="menuType">
                <el-radio-group v-model="form.menuType">
                  <el-radio label="M">目录</el-radio>
                  <el-radio label="C">菜单</el-radio>
                  <el-radio label="F">按钮</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="form.menuType !== 'F'" label="菜单图标">
                <el-popover
                  placement="bottom-start"
                  width="460"
                  trigger="click"
                  style="width:100%"
                  @show="$refs['iconSelect'].reset()"
                >
                  <IconSelect ref="iconSelect" @selected="selected" />
                  <el-input
                    slot="reference"
                    v-model="form.icon"
                    placeholder="点击选择图标"
                    readonly
                  >
                    <svg-icon
                      v-if="form.icon"
                      slot="prefix"
                      :icon-class="form.icon"
                      class="el-input__icon"
                      style="height: 32px; width: 16px"
                    />
                    <i
                      v-else
                      slot="prefix"
                      class="el-icon-search el-input__icon"
                    />
                  </el-input>
                </el-popover>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="资源名称" prop="menuName">
                <el-input
                  v-model="form.menuName"
                  placeholder="请输入资源名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="显示排序" prop="orderNum">
                <el-input-number
                  v-model="form.orderNum"
                  controls-position="right"
                  style="width:100%"
                  :min="0"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="form.menuType != 'F'" label="是否外链">
                <el-radio-group v-model="form.isFrame">
                  <el-radio label="0">是</el-radio>
                  <el-radio label="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                v-if="form.menuType != 'F'"
                label="路由地址"
                prop="path"
              >
                <el-input v-model="form.path" placeholder="请输入路由地址" />
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="form.menuType == 'C'">
              <el-form-item label="组件路径" prop="component">
                <el-input
                  v-model="form.component"
                  placeholder="请输入组件路径"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="form.menuType != 'M'" label="权限标识">
                <el-input
                  v-model="form.perms"
                  placeholder="请权限标识"
                  maxlength="50"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="form.menuType != 'F'" label="显示状态">
                <el-radio-group v-model="form.visible">
                  <el-radio
                    v-for="dict in visibleOptions"
                    :key="dict.vals"
                    :label="dict.vals"
                    >{{ dict.name }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="form.menuType != 'F'" label="菜单状态">
                <el-radio-group v-model="form.status">
                  <el-radio
                    v-for="dict in statusOptions"
                    :key="dict.vals"
                    :label="dict.vals"
                    >{{ dict.name }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="form.menuType == 'C'" label="是否缓存">
                <el-radio-group v-model="form.isCache">
                  <el-radio label="0">缓存</el-radio>
                  <el-radio label="1">不缓存</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="form.menuType === 'C'" label="重定向">
                <el-input
                  v-model="form.redirect"
                  placeholder="请重定向"
                  maxlength="50"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer" align="center">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listMenu,
  getMenu,
  delMenu,
  saveMenu,
  findAllClientType
} from "@/api/system/menu";
import { getDicts } from "@/api/system/org/org";
import Treeselect from "@riophae/vue-treeselect";
import { TagsView } from "@/layout/components";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import IconSelect from "@/components/common/IconSelect";
import { allSystem } from "@/api/system/system.js";

export default {
  name: "SystemMenuIndex",
  components: { Treeselect, IconSelect, TagsView },
  data() {
    const validatePath = (rule, value, callback) => {
      if (value.indexOf("/") === 0 && value.length > 1) {
        callback();
      } else {
        callback(new Error("路由地址不能为空且必须以'/'开头"));
      }
    };

    return {
      siderHeigth: "calc(100% - 3px)",
      defaultOpen: require("@/assets/image/edit_add.png"),
      defaultClose: require("@/assets/image/edit_add.png"),
      defaultProps: {
        children: "children",
        label: "label"
      },
      systemId: "",
      systemOptions: [],
      checkedKeys: false,
      multipleSelection: [],
      // 遮罩层
      loading: false,
      // 显示搜索条件
      showSearch: true,
      // 菜单表格树数据
      menuList: [],
      // 菜单树选项
      menuOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 显示状态数据字典
      visibleOptions: [],
      // 菜单状态数据字典
      statusOptions: [],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        menuName: [
          { required: true, message: "资源名称不能为空", trigger: "blur" }
        ],
        orderNum: [
          { required: true, message: "菜单顺序不能为空", trigger: "blur" }
        ],
        path: [
          {
            validator: validatePath,
            trigger: "blur"
          }
        ],
        component: [
          {
            validator: this.validateComponent,
            trigger: "blur"
          }
        ]
      },
      queryParams: {
        status: undefined,
        menuName: undefined,
        menuType: {
          id: undefined
        },
        clientId: ""
      },
      clientId: "",
      client: [
        {
          label: "客户端类型",
          value: "0",
          data: { id: "0" },
          children: []
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {
    this.getList();
    allSystem().then(res => {
      this.systemOptions = res.data;
      res.data.forEach(item => {
        if (item.name === "当前系统") {
          this.systemId = item.id;
        }
      });
      this.refreshClientTree();
    });
    getDicts({ type: "sys_show_hide" }).then(response => {
      this.visibleOptions = response;
    });
    getDicts({ type: "sys_normal_disable" }).then(response => {
      this.statusOptions = response;
    });
  },
  methods: {
    validateComponent(rule, value, callback) {
      if (this.form.menuType === "C") {
        if (value.length) {
          if (value.indexOf("/") === 0) {
            callback(new Error('组件地址不能以"/"开头，示例：demo/list'));
          } else {
            callback();
          }
        } else {
          callback(new Error("组件地址不能为空"));
        }
      } else {
        callback();
      }
    },
    // 选中树
    handleNodeClick(data) {
      this.queryParams.clientId = data.data.id;
      this.clientId = data.data.id;
      this.getList();
    },
    // 选中系统树
    handleSelectSystem() {
      this.refreshClientTree();
    },
    // 刷新类型树
    refreshClientTree() {
      findAllClientType({ systemid: this.systemId }).then(res => {
        this.client[0].children = [];

        res.data.forEach(element => {
          this.client[0].children.push({
            value: element.id,
            data: element,
            label: element.clientcescription
          });
        });
      });
    },
    // 选择图标
    selected(name) {
      this.form.icon = name;
    },
    /** 查询菜单列表 */
    getList() {
      this.loading = true;
      listMenu(this.queryParams).then(response => {
        this.menuList = this.handleTree(
          response.data,
          "menuId",
          "parentId",
          "children",
          0
        );
        this.loading = false;
      });
    },

    /** 转换菜单数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.menuId,
        label: node.menuName,
        children: node.children
      };
    },
    /** 查询菜单下拉树结构 */
    getTreeselect() {
      listMenu({ clientId: this.clientId, resTypeCode: "SOURCE_XIQX" }).then(
        response => {
          this.menuOptions = [];
          const menu = { menuId: 0, menuName: "主类目", children: [] };
          menu.children = this.handleTree(response.data, "menuId");
          this.menuOptions.push(menu);
        }
      );
    },
    // 显示状态字典翻译
    visibleFormat(row, column) {
      if (row.menuType == "F") {
        return "";
      }
      return this.selectDictLabel(this.visibleOptions, row.visible);
    },
    // 菜单状态字典翻译
    statusFormat(row, column) {
      if (row.menuType == "F") {
        return "";
      }
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        menuId: undefined,
        parentId: 0,
        menuName: undefined,
        icon: undefined,
        menuType: "M",
        orderNum: undefined,
        isFrame: "1",
        isCache: "0",
        visible: "0",
        status: "0",
        redirect: "",
        clientId: this.clientId,
        systemId: this.systemId
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      if (this.clientId === "") {
        this.$message({
          message: "请选择客户端类型",
          type: "warning"
        });
        return false;
      }
      if (this.clientId === "0") {
        this.$message({
          message: "请选择叶子节点",
          type: "warning"
        });
        return false;
      }
      this.reset();
      this.getTreeselect();
      if (row != null && row.menuId) {
        this.form.parentId = row.menuId;
      } else {
        this.form.parentId = 0;
      }
      this.form.saveFlag = 1;
      this.open = true;
      this.title = "添加菜单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.getTreeselect();
      getMenu({ id: row.menuId }).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改菜单";
        this.form.saveFlag = 0;
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.menuType === "M") {
            this.form.component = "Layout";
          }

          saveMenu({
            id: this.form.menuId,
            name: this.form.menuName,
            aliasName: this.form.component,
            description: this.form.remark,
            clientId: this.form.clientId,
            levelCode: this.form.perms,
            iconPath: this.form.icon,
            sortedNum: this.form.orderNum,
            parentId: this.form.parentId,
            systemId: this.form.systemId,
            isFrame: this.form.isFrame,
            isCache: this.form.isCache,
            visible: this.form.visible,
            status: this.form.status,
            path: this.form.path,
            redirect: this.form.redirect,
            menuType: this.form.menuType,
            saveFlag: this.form.saveFlag
          }).then(response => {
            if (response.rtnCode === 200) {
              this.msgSuccess(response.msg);
              this.open = false;
              this.getList();
            }
          });
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$confirm(
        '是否确认删除名称为"' + row.menuName + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return delMenu({ id: row.menuId });
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    },

    // 复选框
    select(selection, row) {
      if (
        selection.find(val => {
          return this.getDataId(val) === this.getDataId(row);
        })
      ) {
        if (row.children) {
          row.children.forEach(val => {
            this.$refs.menuTable.toggleRowSelection(val, true);
            selection.push(val);
            if (val.children) {
              this.select(selection, val);
            }
          });
        }
      } else {
        this.toggleRowSelection(selection, row);
      }
    },

    selectAll(selection) {
      if (selection && selection.length === this.menuList.length) {
        selection.forEach(val => {
          this.select(selection, val);
        });
      } else {
        this.$refs.menuTable.clearSelection();
      }
    },
    selectionChange(val) {
      this.multipleSelection = val;
    },
    toggleRowSelection(selection, data) {
      data.children.forEach(val => {
        this.$refs.menuTable.toggleRowSelection(val, false);
        if (val.children) {
          this.toggleRowSelection(selection, val);
        }
      });
    },
    getDataId(data) {
      return data["id"];
    },

    // 批量删除
    handleBatchDelete() {
      let val = this.multipleSelection;
      let ids = val.map(res => res.menuId).join(",");
      let that = this;
      if (val.length !== 0) {
        this.$confirm("确定删除所选择内容?", "提示", {
          cancelButtonText: "取消",
          confirmButtonText: "确定",
          type: "warning"
        }).then(() => {
          delMenu({ id: ids })
            .then(res => {})
            .finally(() => {
              this.msgSuccess("删除成功");
              that.loading = true;
              that.resetQuery();
            });
        });
      } else {
        this.$message({
          message: "请选择要删除的内容",
          type: "warning"
        });
      }
    }
  }
};
</script>
<style lang="scss" src="@/assets/styles/tabletree.scss" />
<style lang="scss" scoped>
.dialog-customer {
  /deep/.el-form-item__content {
    display: flex;
    align-items: center;
    align-content: center;
    flex-wrap: nowrap;
    height: 36px;
  }
}
</style>
