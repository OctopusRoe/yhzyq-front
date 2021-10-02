<template>
  <div class="app-container" style="padding:20px 10px">
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
      </el-form-item>
    </el-form>

    <vxe-table :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="名称"></vxe-table-column>
      <vxe-table-column field="code" title="编码"></vxe-table-column>
      <vxe-table-column field="versionNum" title="当前版本"></vxe-table-column>
      <vxe-table-column
        field="intVersionNum"
        title="当前版本int"
      ></vxe-table-column>
      <vxe-table-column field="type" title="APP类型"></vxe-table-column>
      <vxe-table-column
        field="updateReqire"
        title="更新要求"
      ></vxe-table-column>
      <vxe-table-column
        field="isNowVersion"
        title="当前版本"
      ></vxe-table-column>
      <vxe-table-column field="isForce" title="强制更新"></vxe-table-column>
      <vxe-table-column field="isSilent" title="静默更新"></vxe-table-column>
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
            @click="handleDelete"
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

    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="编码:" label-width="110px" prop="code">
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
            <el-form-item
              label="版本号(1.0.0):"
              label-width="110px"
              prop="versionNum"
            >
              <el-input
                v-model="form.versionNum"
                placeholder="编码"
                style="width: 200px"
                maxlength="11"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="版本序号(1):"
              label-width="110px"
              prop="intVersionNum"
            >
              <el-input
                v-model="form.intVersionNum"
                placeholder="名称"
                style="width: 200px"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="APP类型:" label-width="110px" prop="type">
              <el-select
                v-model="form.type"
                filterable
                placeholder="请选择"
                @change="remoteRegion"
              >
                <el-option
                  v-for="item in appTypeOptions"
                  :key="item.type"
                  :label="item.typeName"
                  :value="item.type"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="更新要求:"
              prop="updateReqire"
              label-width="110px"
            >
              <el-select
                v-model="form.updateReqire"
                filterable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in updateReqireOptions"
                  :key="item.updateReqire"
                  :label="item.updateReqireName"
                  :value="item.updateReqire"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="是否静默更新:"
              label-width="110px"
              prop="isSilentChecked"
            >
              <el-checkbox v-model="isSilentChecked"></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="更新说明:"
              label-width="110px"
              prop="updateDesc"
            >
              <el-input
                v-model="form.updateDesc"
                style="width: 200px"
                maxlength="11"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="是否当前版本:"
              label-width="110px"
              prop="isNowVersionChecked"
            >
              <el-checkbox v-model="isNowVersionChecked"></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="是否强制更新:"
              label-width="110px"
              prop="isForceChecked"
            >
              <el-checkbox v-model="isForceChecked"></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <span v-if="flag">
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="bundlejs文件:"
                label-width="110px"
                prop="bundlejsId"
              >
                <el-upload
                  class="upload-demo"
                  action=""
                  :on-change="handleChange"
                  :file-list="fileList"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="IPA地址:"
                label-width="110px"
                prop="IpaAddress"
              >
                <el-input
                  v-model="form.ipaAddress"
                  style="width: 200px"
                  maxlength="50"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </span>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <span v-if="flag">
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </span>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listVersion,
  del,
  addVersion,
  getById,
  getAppType,
} from "@/api/system/version";
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
      appTypeOptions: [],
      updateReqireOptions: [
        { updateReqireName: "apk", updateReqire: "1" },
        {
          updateReqireName: "bundeljs",
          updateReqire: "2",
        },
        { updateReqireName: "bundejs and pics", updateReqire: "3" },
      ],
      fileList: [],
      isSilentChecked: false,
      isNowVersionChecked: false,
      isForceChecked: false,
      flag: true,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加";
      this.remoteAppType();
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id;
      getById(id).then((response) => {
        this.form = response.data;

        if (response.data.isSilent == "0") {
          this.isSilentChecked = true;
        }
        if (response.data.isNowVersion == "0") {
          this.isNowVersionChecked = true;
        }
        if (response.data.isForce == "0") {
          this.isForceChecked = true;
        }

        this.open = true;
        this.title = "修改";
      });
    },
    handleView(row) {
      this.reset();
      this.flag = false;
      const id = row.id;
      getById(id).then((response) => {
        this.form = response.data;

        if (response.data.isSilent == "0") {
          this.isSilentChecked = true;
        }
        if (response.data.isNowVersion == "0") {
          this.isNowVersionChecked = true;
        }
        if (response.data.isForce == "0") {
          this.isForceChecked = true;
        }

        this.open = true;
        this.title = "查看";
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
      listVersion(this.queryParams).then((response) => {
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
      (this.form = {
        name: undefined,
        expr: undefined,
        serviceName: undefined,
        methodName: undefined,
      }),
        (this.isSilentChecked = false),
        (this.isNowVersionChecked = false),
        (this.isForceChecked = false),
        (this.flag = true);
    },

    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.form.isSilent = "";
          this.form.isNowVersion = "";
          this.form.isForce = "";
          if (this.isSilentChecked) {
            this.form.isSilent = "0";
          }
          if (this.isNowVersionChecked) {
            this.form.isNowVersion = "0";
          }
          if (this.isForceChecked) {
            this.form.isForce = "0";
          }

          addVersion(this.form).then((response) => {
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

    /**
     * 远程加载类型
     * @param query
     */

    remoteAppType() {
      getAppType().then((response) => {
        console.log(response);
        response.forEach((element) => {
          this.appTypeOptions.push({
            typeName: element.name,
            type: element.id,
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

