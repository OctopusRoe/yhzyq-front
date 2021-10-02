<template>
  <div class="app-container">
    <div class="pd10">
      <el-form :model="queryParams" ref="queryForm" :inline="true">
        <el-form-item label="名称" prop="name">
          <el-input
            v-model="queryParams.name"
            placeholder="请输入名称"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="编号" prop="code">
          <el-input
            v-model="queryParams.code"
            placeholder="请输入编号"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="上级区划名称" prop="parentId">
          <el-input
            v-model="queryParams.parentId"
            placeholder="请输入上级区划名称"
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
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
            >重置</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd"
            >新增</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-download"
            size="mini"
            @click="handleExport"
            >导出</el-button
          >
          <el-button type="primary" size="mini" @click="handleCountry"
            >国家管理</el-button
          >
        </el-form-item>
      </el-form>

      <vxe-table :data="tableData">
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column field="name" title="名称"></vxe-table-column>
        <vxe-table-column field="code" title="编码"></vxe-table-column>
        <vxe-table-column
          field="parentName"
          title="上级区划名称"
        ></vxe-table-column>
        <vxe-table-column
          field="countryName"
          title="所在国家"
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

    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="所在国家" prop="countryId">
              <el-select
                v-model="form.countryId"
                filterable
                placeholder="请选择"
                @change="remoteRegion"
              >
                <el-option
                  v-for="item in countryOptions"
                  :key="item.countryId"
                  :label="item.countryName"
                  :value="item.countryId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上级行政区划" prop="code" label-width="110px">
              <el-select v-model="form.code" filterable placeholder="请选择">
                <el-option
                  v-for="item in regionOptions"
                  :key="item.regionCode"
                  :label="item.regionName"
                  :value="item.regionCode"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="编码" prop="code">
              <el-input
                v-model="form.code"
                placeholder="编码"
                style="width: 200px"
                maxlength="11"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名称:" label-width="110px" prop="name">
              <el-input
                v-model="form.name"
                placeholder="名称"
                style="width: 200px"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="简称:" prop="shortName">
              <el-input
                v-model="form.shortName"
                placeholder="简称"
                style="width: 200px"
                maxlength="11"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="全称:" label-width="110px" prop="allName">
              <el-input
                v-model="form.allName"
                placeholder="全称"
                style="width: 200px"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="等级:" prop="atLevel">
              <el-input
                v-model="form.atLevel"
                placeholder="等级"
                style="width: 200px"
                maxlength="11"
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
import {
  listRegion,
  del,
  addRegion,
  getById,
  export1,
  getCountry,
  getRegion,
} from "@/api/system/region";
import ElPager from "element-ui/packages/pagination/src/pager";

export default {
  name: "index",
  components: { ElPager },
  data() {
    return {
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
      // 是否显示弹出层
      open: false,
      // 表单参数
      form: {},
      defaultProps: {
        children: "children",
        label: "label",
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
      countryOptions: [],
      regionOptions: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 新增按钮操作 */
    handleAdd() {
      this.open = true;
      this.title = "添加";
      this.remoteCountry();
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id;
      this.remoteCountry();
      getById(id).then((response) => {
        this.remoteRegion(response.data.countryId);
        this.form = response.data;
        this.open = true;
        this.title = "修改";
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
    getList() {
      this.loading = true;
      listRegion(this.queryParams).then((response) => {
        this.tableData = response.rows;
        this.tablePage.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
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
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          addRegion(this.form).then((response) => {
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

    /** 导出按钮操作 */
    handleExport(row) {
      const id = row.id;
      this.$confirm("是否确认导出数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return export1(id);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("导出成功");
        })
        .catch(function () {});
    },
    /** 国家管理按钮操作 */
    handleCountry() {
      this.$router.push("/country");
    },

    /**
     * 远程加载国家
     * @param query
     */

    remoteCountry() {
      getCountry().then((response) => {
        response.forEach((element) => {
          this.countryOptions.push({
            countryName: element.name,
            countryId: element.code,
          });
        });
      });
    },
    /**
     * 远程加载地区
     * @param query
     */

    remoteRegion(value) {
      getRegion(value).then((response) => {
        response.forEach((element) => {
          this.regionOptions.push({
            regionName: element.text,
            regionCode: element.id,
          });
        });
      });
    },

    handlePageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage;
      this.tablePage.pageSize = pageSize;
      this.queryParams.pageNumber = currentPage;
      this.queryParams.pageSize = pageSize;
      this.getList();
    },
  },
};
</script>

