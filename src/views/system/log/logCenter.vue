<template>
  <div>

    <el-form
      :inline="true"
      :model="queryConditions"
      class="demo-form-inline"
      style="margin-top: 20px;"
    >
      <el-form-item style="margin-left: 15px;" label="关键字">
        <el-input
          v-model="queryConditions.keyword"
          placeholder="操作人 | 内容关键字"
        ></el-input>
      </el-form-item>
      <el-form-item label="发布时间">
        <el-date-picker
          style="width: 140px;"
          v-model="queryConditions.startDate"
          placeholder="开始时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item style="margin-left: 0px;" label="~">
        <el-date-picker
          style="width: 140px;"
          v-model="queryConditions.endDate"
          placeholder="结束时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="操作类型">
        <el-select v-model="queryConditions.type" placeholder="请选择操作类型">
          <el-option label="增加" value="add"></el-option>
          <el-option label="删除" value="delete"></el-option>
          <el-option label="查询" value="select"></el-option>
          <el-option label="更新" value="update"></el-option>
          <el-option label="复杂操作" value="complex"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模块">
        <el-select v-model="queryConditions.module" placeholder="请选择模块">
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" style="width: 80px;" @click="onQuery"
          >查询</el-button
        >
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      border
      height="550px"
      @selection-change="onSelectionChange"
      :default-sort="{ prop: 'sendTime', order: 'descending' }"
      style="width: 100%;"
    >
      <el-table-column width="70" align="center" label="序号">
        <template v-slot="scope">
          {{ queryConditions.pageSize * (queryConditions.pageNum - 1) + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column v-if="false" prop="id" lable="编号"> </el-table-column>
      <el-table-column prop="type" label="操作类型" width="240">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip="true"
        prop="contents"
        label="日志内容"
      >
        <template scope="scope">
          <div
            style="cursor: pointer; color: #1890ff;"
            @click="onDetail(scope.row)"
          >
            {{ scope.row.contents }}
          </div>
        </template></el-table-column
      >
      <el-table-column
        prop="startTime"
        sortable
        label="操作时间"
        width="300"
      ></el-table-column>
      <el-table-column
        prop="userName"
        label="操作用户"
        width="200"
      ></el-table-column>
      <el-table-column prop="module" label="模块" width="200"></el-table-column>
    </el-table>

    <el-pagination
      layout="total, prev, pager, next"
      style="margin: 30px 100px; float: right;"
      :total="pageInfo.total"
      :page-size="queryConditions.pageSize"
      :page-count="pageInfo.pages"
      :current-page="queryConditions.pageNum"
      @current-change="pageChange"
    >
    </el-pagination>

    <el-dialog
      :append-to-body="true"
      v-dialogDrag
      title="查看详情"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form :model="detailData">
        <el-form-item label="操作类型：" :label-width="formLabelWidth">
          <span>{{ detailData.type }}</span>
        </el-form-item>
        <el-form-item label="操作人：" :label-width="formLabelWidth">
          <span>{{ detailData.userName }}</span>
        </el-form-item>
        <el-form-item label="操作时间：" :label-width="formLabelWidth">
          <span>{{ detailData.startTime }}</span>
        </el-form-item>
        <el-form-item label="模块：" :label-width="formLabelWidth">
          <span>{{ detailData.module }}</span>
        </el-form-item>
        <el-form-item label="日志内容：" :label-width="formLabelWidth">
          <span>{{ detailData.contents }}</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引用公共定义

// 引用公共组件

// 页面组件

// 引用api
import "@/utils/directives";
import { getLogByConditions } from "@/api/system/log/logCenter";
export default {
  data() {
    return {
      // 顶部搜索表单
      queryConditions: {
        keyword: "", // 关键字
        startDate: "",
        endDate: "",
        module: "",
        type: "",
        pageSize: 10,
        pageNum: 1,
      },
      pageInfo: {
        total: 0,
        pages: 0,
        
      },
      tableData: [],
      detailData: {
        userName: "",
        type: "",
        contents: "",
        startTime: "",
        module: "",
      },
      dialogVisible: false,
    };
  },
  methods: {
    onQuery() {
    //   debugger
      getLogByConditions(this.queryConditions).then((resp) => {
        console.log(resp);
        this.tableData = resp.data.list;
        this.pageInfo.pages = resp.data.pages;
        this.pageInfo.total = resp.data.total;
        this.queryConditions.pageNum = resp.data.pageNum;
      });
    },
    onReset() {
      this.queryConditions.keyword = "";
      this.queryConditions.startDate = "";
      this.queryConditions.endDate = "";
      this.queryConditions.module = "";
      this.queryConditions.type = "";
      this.onQuery();
    },
    pageChange(pageNum) {
      console.log(pageNum);
      this.queryConditions.pageNum = pageNum;
      this.onQuery();
    },
    //查看详情
    onDetail(row) {
      this.dialogVisible = true;
      Object.assign(this.detailData, row);
      console.log(this.detailData, "detail");
    },
  },
  created() {
    this.onQuery();
  },
};
</script>

<style scoped>
.el-form-item {
  margin-left: 10px;
}
.item-baddge {
  z-index: 20;
}
</style>
