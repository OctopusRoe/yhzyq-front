<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm"  :inline="true" >
      <el-form-item label="国家名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入国家名称"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="英文名称" prop="allName">
        <el-input
          v-model="queryParams.allName"
          placeholder="请输入英文名称"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />

      </el-form-item>

      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
      </el-form-item>
    </el-form>

    <vxe-table
      border
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="code" title="国家编码"></vxe-table-column>
      <vxe-table-column field="name" title="国家名称"></vxe-table-column>
      <vxe-table-column field="allName" title="英文名"></vxe-table-column>
      <vxe-table-column field="type" title="所属区域"></vxe-table-column>
      <vxe-table-column field="opt" width="200" title="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-video-pause"
            @click="handleUpdate(scope.row)"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-video-play"
            @click="handleView(scope.row)"
          >查看
          </el-button>
        </template>
      </vxe-table-column>
    </vxe-table>
    <vxe-pager
      :current-page="tablePage.currentPage"
      :page-size="tablePage.pageSize"
      :total="tablePage.total"
      :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
      @page-change="handlePageChange">
    </vxe-pager>

    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="国家编码"  prop="id">
              <el-input v-model="form.id" placeholder="国家编码" style="width: 200px" maxlength="11"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="英文名称:" label-width="100px" prop="allName">
              <el-input v-model="form.allName" placeholder="英文名称" style="width: 200px" maxlength="50"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="国家名称:" prop="name">
              <el-input v-model="form.name" placeholder="国家名称" style="width: 200px" maxlength="11"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属区域"  prop="type">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in areaOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
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
  import listCountry from "@/api/system/region";
  import ElPager from "element-ui/packages/pagination/src/pager";

  export default {
    name: "index",
    components: {ElPager},
    data() {
      return {
        // 查询参数
        queryParams: {
          pageNumber: 1,
          pageSize: 10,
          name: undefined,
          status: undefined
        },
        // 显示搜索条件
        showSearch: true,
        //列表
        tableData: [],
        // 总条数
        total: 0,
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 表单参数
        form: {},
        defaultProps: {
          children: "children",
          label: "label"
        },
        // 表单校验
        rules: {
          id: [
            {required: true, message: "名称不能为空", trigger: "blur"}
          ],
          name: [
            {required: true, message: "表达示不能为空", trigger: "blur"}
          ],
          allName: [
            {required: true, message: "服务名不能为空", trigger: "blur"}
          ],
          type: [
            {required: true, message: "方法名不能为空", trigger: "blur"}
          ]
        },
        areaOptions:[{}]
      }
    },
    created() {
      this.getList();
    },
    methods: {

      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1;
        this.getList();
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm("queryForm");
      },
      getList() {
        this.loading = true;
        listCountry(this.addDateRange(this.queryParams)).then(
          response => {
            this.tableData = response.rows;
            this.total = response.total;
            this.loading = false;
          }
        );
      },

      // 表单重置
      reset() {
        this.form = {
          name: undefined,
          expr: undefined,
          serviceName: undefined,
          methodName: undefined
        }
      },

      handlePageChange ({ currentPage, pageSize }) {
        this.tablePage.currentPage = currentPage;
        this.tablePage.pageSize = pageSize;
        this.queryParams.pageNumber = currentPage;
        this.queryParams.pageSize = pageSize;
        this.getList()
      }

    }
  }
</script>

