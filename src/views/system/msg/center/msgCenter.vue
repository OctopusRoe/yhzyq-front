<template>
  <div>
    <!-- <div style="text-align: center; padding: 10px;">
      <el-radio-group
        @change="onQuery"
        v-model="queryConditions.msgState"
      >
        <el-badge :value="msgNum" class="item-baddge">
          <el-radio-button label="待阅" value="待阅"> </el-radio-button>
        </el-badge>
        <el-radio-button label="已阅" value="已阅"></el-radio-button>
      </el-radio-group>
    </div>
    <p style="height: 3px; background: #f3f3f3;"></p> -->

    <el-form
      :inline="true"
      :model="queryConditions"
      class="demo-form-inline"
      style="margin-top: 20px;"
    >
      <el-form-item style="margin-left: 15px;" label="关键字">
        <el-input
          v-model="queryConditions.keyword"
          placeholder="标题 | 内容 | 发送人"
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

      <el-form-item>
        <el-button type="primary" style="width: 80px;" @click="onQuery"
          >查询</el-button
        >
        <el-button @click="onReset">重置</el-button>
      </el-form-item>

      <el-form-item>
        <el-button
          style="margin-left: 20px;"
          type="danger"
          plain
          @click="onDeleteMulti"
          >批量删除</el-button
        >
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
      <el-table-column type="selection" align="center" width="60">
      </el-table-column>
      <el-table-column width="70" align="center" label="序号">
      <template v-slot="scope">
        {{queryConditions.pageSize*(queryConditions.pageNum-1)+scope.$index+1}}
      </template>
    </el-table-column>
      <el-table-column v-if="false" prop="id" lable="编号"> </el-table-column>
      <el-table-column prop="title" label="标题" width="240">
        <template slot-scope="scope">
          <div
            style="cursor: pointer; color: #1890ff;"
            @click="onDetail(scope.row)"
          >
            {{ scope.row.title }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip="true"
        prop="contents"
        label="消息内容"
      ></el-table-column>
      <el-table-column
        prop="sendTime"
        sortable
        label="发送时间"
        width="240"
      ></el-table-column>
      <el-table-column
        prop="cnName"
        label="发送人"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="readCount"
        label="阅读次数"
        width="200"
      ></el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template v-slot="scope">
          <el-button type="text" size="mini" @click="onDelete(scope.row)"
            >删除
          </el-button>
        </template>
      </el-table-column>
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
        <el-form-item label="标题：" :label-width="formLabelWidth">
          <span>{{ detailData.title }}</span>
        </el-form-item>
        <el-form-item label="发送人：" :label-width="formLabelWidth">
          <span>{{ detailData.cnName }}</span>
        </el-form-item>
        <el-form-item label="发送时间：" :label-width="formLabelWidth">
          <span>{{ detailData.sendTime }}</span>
        </el-form-item>
        <el-form-item label="内容：" :label-width="formLabelWidth">
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
import {
  deleteMsg,
  deleteMsgMulti,
  getMsgByConditions,
} from "@/api/system/msg/msgCenter";
export default {
  data() {
    return {
      // 顶部搜索表单
      queryConditions: {
        keyword: "", // 关键字
        startDate: "",
        endDate: "",
        // msgState: "待阅",
        pageSize: 10,
        pageNum: 1,
      },
      pageInfo: {
        total: 0,
        pages: 0,
      },
      tableData: [],
      detailData: {
        id: "",
        contents: "",
        title: "",
        sendTime: "",
        createUser: "",
      },

      dialogVisible: false,
      checkedList: [],
      msgNotReadNum: 0,
    };
  },
  methods: {
    onQuery() {
      getMsgByConditions(this.queryConditions).then((resp) => {
        console.log(resp);
        this.tableData = resp.data.list;
        this.pageInfo.pages = resp.data.pages;
        this.pageInfo.total = resp.data.total;
        this.queryConditions.pageNum = resp.data.pageNum;
        // this.tableData = resp.data;
      });
    },
    onReset() {
      this.queryConditions.keyword = "";
      this.queryConditions.startDate = "";
      this.queryConditions.endDate = "";
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
    //删除
    onDelete(row) {
      let data = new FormData();
      data.append("id", row.id);
      deleteMsg(data).then((resp) => {
        this.$message({
          message: "消息删除成功",
          type: "success",
        });
        this.onQuery();
      });
    },
    //勾选框事件
    onSelectionChange(selection) {
      (this.checkedList = []),
        selection.forEach((element) => {
          this.checkedList.push(element.id);
        });
    },
    //批量删除
    onDeleteMulti() {
      let list = new FormData();
      list.append("ids", this.checkedList);
      deleteMsgMulti(list).then((resp) => {
        this.$message({
          message: "消息批量删除成功",
          type: "success",
        });
        this.onQuery();
      });
    },
  },
  created() {
    this.onQuery();
  },
  computed: {
    // msgNum() {
    //   if (this.queryConditions.msgState == "待阅") {
    //     this.msgNotReadNum = this.pageInfo.total;
    //     return this.msgNotReadNum;
    //   }
    //   return this.msgNotReadNum;
    // },
  },
};
</script>

<style scoped>
.el-form-item {
  margin-left: 0px;
}
.item-baddge {
  z-index: 20;
}
</style>
