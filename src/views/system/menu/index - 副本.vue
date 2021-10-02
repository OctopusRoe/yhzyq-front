<template>
  <div class="app-container">
    <div class="table-wrap">
      <el-row>
        <el-col>
          <el-form
            :model="queryParams"
            ref="queryForm"
            :inline="true"
            v-show="showSearch"
          >
            <div class="querybox">
              <el-form-item label="菜单名称" prop="menuName">
                <el-input
                  v-model="queryParams.menuName"
                  placeholder="请输入菜单名称"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="状态" prop="status">
                <el-select
                  v-model="queryParams.status"
                  placeholder="菜单状态"
                  clearable
                  size="small"
                >
                  <el-option
                    v-for="dict in statusOptions"
                    :key="dict.vals"
                    :label="dict.name"
                    :value="dict.vals"
                  />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="cyan" size="mini" @click="handleQuery"
                >搜索
                </el-button>
                <el-button size="mini" @click="resetQuery">重置 </el-button>
              </el-form-item>
              <div class="addbtn-box">
                <div @click="handleAdd">
                  <img src="@/assets/image/style1/icon-add.png" alt="" /><span
                >新增</span
                >
                </div>
                <div>
                  <img
                    src="@/assets/image/style1/icon-import.png"
                    alt=""
                  /><span>导入</span>
                </div>
              </div>
            </div>
          </el-form>
          <div class="detail-table-wrap">
            <vxe-grid
              show-overflow
              highlight-hover-row
              row-key
              ref="xTree3"
              border="outer"
              header-row-class-name="tableHeader"
              cell-class-name="cellBorder"
              :checkbox-config="{ labelField: 'name' }"
              :tree-config="{
                children: 'children',
                accordion: true,
                line: true,
                iconOpen: 'icon-jian',
                iconClose: 'icon-jia',
              }"
              :data="tableData"
            >
              <vxe-table-column
                field="menuName"
                title="菜单名称"
                tree-node
                header-align="center"
                class-name="firstcell"
              ></vxe-table-column>
              <vxe-table-column field="icon" title="图标"  header-align="center" align="center"></vxe-table-column>
              <vxe-table-column field="orderNum" title="排序"  header-align="center" align="center"></vxe-table-column>
              <vxe-table-column field="perms" title="权限标识"  header-align="center" align="center"></vxe-table-column>
              <vxe-table-column field="component" title="组件路径"  header-align="center" align="center"></vxe-table-column>
              <vxe-table-column field="status" title="状态"  header-align="center" align="center"></vxe-table-column>
              <vxe-table-column field="createTime" title="创建时间"  header-align="center" align="center"></vxe-table-column>

            </vxe-grid>

          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 添加或修改菜单对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="600px"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="24">
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
          <el-col :span="24">
            <el-form-item label="菜单类型" prop="menuType">
              <el-radio-group v-model="form.menuType">
                <el-radio label="M">目录</el-radio>
                <el-radio label="C">菜单</el-radio>
                <el-radio label="F">按钮</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item v-if="form.menuType !== 'F'" label="菜单图标">
              <el-popover
                placement="bottom-start"
                width="460"
                trigger="click"
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
            <el-form-item label="菜单名称" prop="menuName">
              <el-input v-model="form.menuName" placeholder="请输入菜单名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示排序" prop="orderNum">
              <el-input-number
                v-model="form.orderNum"
                controls-position="right"
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
              <el-input v-model="form.component" placeholder="请输入组件路径" />
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
            <el-form-item label="重定向">
              <el-input
                v-model="form.redirect"
                placeholder="请重定向"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { listMenu, getMenu, delMenu, saveMenu } from "@/api/system/menu";
  import Treeselect from "@riophae/vue-treeselect";
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";
  import IconSelect from "@/components/common/IconSelect";

  export default {
    name: "Menu",
    components: { Treeselect, IconSelect },
    data() {
      return {
        // 遮罩层
        loading: true,
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
        // 查询参数
        queryParams: {
          menuName: undefined,
          visible: undefined,
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          menuName: [
            { required: true, message: "菜单名称不能为空", trigger: "blur" },
          ],
          orderNum: [
            { required: true, message: "菜单顺序不能为空", trigger: "blur" },
          ],
          path: [
            { required: true, message: "路由地址不能为空", trigger: "blur" },
          ],
        },
        tableData:[]
      };
    },
    created() {
      this.getList();
      this.getDicts("sys_show_hide").then((response) => {
        this.visibleOptions = response;
      });
      this.getDicts("sys_normal_disable").then((response) => {
        this.statusOptions = response;
      });
    },
    methods: {
      // 选择图标
      selected(name) {
        this.form.icon = name;
      },
      /** 查询菜单列表 */
      getList() {
        this.loading = true;
        listMenu(this.queryParams).then((response) => {
          this.menuList = this.handleTree(
            response.data,
            "menuId",
            "parentId",
            "children",
            0
          );
          this.loading = false;
          console.log(this.menuList);
          this.tableData= this.menuList;
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
          children: node.children,
        };
      },
      /** 查询菜单下拉树结构 */
      getTreeselect() {
        listMenu().then((response) => {
          this.menuOptions = [];
          const menu = { menuId: 0, menuName: "主类目", children: [] };
          menu.children = this.handleTree(response.data, "menuId");
          this.menuOptions.push(menu);
        });
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
        };
        this.resetForm("form");
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.getList();
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm("queryForm");
        this.handleQuery();
      },
      /** 新增按钮操作 */
      handleAdd(row) {
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
        getMenu(row.menuId).then((response) => {
          this.form = response.data;
          this.open = true;
          this.title = "修改菜单";
          this.form.saveFlag = 0;
        });
      },
      /** 提交按钮 */
      submitForm: function () {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            saveMenu(this.form).then((response) => {
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
            type: "warning",
          }
        )
          .then(function () {
            return delMenu(row.menuId);
          })
          .then(() => {
            this.getList();
            this.msgSuccess("删除成功");
          })
          .catch(function () {});
      },
    },
  };
</script>
