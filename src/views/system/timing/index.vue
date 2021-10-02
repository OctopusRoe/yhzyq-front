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
      <vxe-table-column field="jobName" title="名称"></vxe-table-column>
      <vxe-table-column field="serviceName" title="服务名"></vxe-table-column>
      <vxe-table-column field="methodName" title="方法名"></vxe-table-column>
      <vxe-table-column field="expr" title="表达式"></vxe-table-column>
      <vxe-table-column field="nextFireTime" title="下次运行时间"></vxe-table-column>
      <vxe-table-column field="prevFireTime" title="上次运行时间"></vxe-table-column>
      <vxe-table-column field="startTime" title="开始时间"></vxe-table-column>
      <vxe-table-column field="endTime" title="结束时间"></vxe-table-column>
      <vxe-table-column field="statu" title="状态"></vxe-table-column>
      <vxe-table-column field="opt" width="200" title="操作">
        <template slot-scope="scope">
           <el-button
            type="primary"
            icon="el-icon-edit"
            circle
              @click="handlePause(scope.row)"
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            :disabled="multiple"
           @click="handlePlay(scope.row)"
            circle
            v-hasPermi="['system:dict:remove']"
          ></el-button>
           <el-button
            icon="el-icon-view"
            type="info"
               @click="handleDelete(scope.row)"
            circle
          ></el-button>
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
    </div>


    <el-dialog :title="title" :visible.sync="open" width="700px"  append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称" prop="name">
              <el-input v-model="form.name" placeholder="名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="表达式" prop="expr">
              <el-input v-model="form.expr" placeholder="表达式" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="服务名" prop="serviceName">
              <el-input v-model="form.serviceName" placeholder="执行服务名" maxlength="11" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="方法名:" prop="methodName">
              <el-input v-model="form.methodName" placeholder="执行方法名" maxlength="50" />
            </el-form-item>
          </el-col>

          <el-col :span="24">
              <div v-html="msg" style="line-height: 20px">
              </div>
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
  import {listTiming, delTiming, addTiming,pauseTiming, playTiming} from "@/api/system/timing";
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
        tablePage: {
          currentPage: 1,
          pageSize: 10,
          total: 0,
          align: 'center',
          pageSizes: [10, 20, 50, 100, 200, 500],
          perfect: true
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
          label: "label"
        },
        // 表单校验
        rules: {
          name: [
            { required: true, message: "名称不能为空", trigger: "blur" }
          ],
          expr: [
            { required: true, message: "表达示不能为空", trigger: "blur" }
          ],
          serviceName: [
            { required: true, message: "服务名不能为空", trigger: "blur" }
          ],
          methodName: [
            { required: true, message: "方法名不能为空", trigger: "blur" }
          ]
        },
        msg:"每隔5秒：*/5 * * * * ? &nbsp; &nbsp; 每隔1分钟：0 */1 * * * ?&nbsp;&nbsp;每小时26分、29分：0 26,29 * * * ?<br>\n" +
          " 每周星期天凌晨1点：0 0 1 ? * L &nbsp;&nbsp; 每天凌晨1点：0 0 1 * * ?&nbsp; &nbsp; 每月1号凌晨1点：0 0 1 1 * ? <br>\n" +
          "              每天23点：0 0 23 * * ? &nbsp; &nbsp; 每天0、13点：0 0 0,13 * * ?&nbsp; &nbsp; 每月最后一天23点：0 0 23 L * ?\n" +
          "              <br> Cron表达式的格式：秒 分 时 日 月 周 年(可选)。\n" +
          "              <br>秒( 0-59, -*/)&nbsp;,&nbsp; “*”：表示匹配该域的任意值。 <br>\n" +
          "              分( 0-59 , -*/) &nbsp; ,“?”字符：表示不确定的值，表示每月的某一天，或第周的某一天<br>\n" +
          "              小时 ( 0-23 &amp;, -*/) &nbsp; , “,”字符：指定数个值<br>\n" +
          "              日 (1-31 , - * ? / LWC )&nbsp; ,“-”字符：指定一个值的范围<br>\n" +
          "              月(1-12 or JAN-DEC , -*/ )&nbsp; , “/”字符：指定一个值的增加幅度。n/m表示从n开始，每次增加m<br>\n" +
          "              周几( 1-7 or SUN-SAT , -*?/LC#)&nbsp;， “W”字符：指定离给定日期最近的工作日(周一到周五)<br>\n" +
          "              “L”字符：用在日表示一个月中的最后一天，用在周表示该月最后一个星期X<br>\n" +
          "              “#”字符：表示该月第几个周X。6#3表示该月第3个周五<br>"
      }
    },
    created() {
      this.getList();
    },
    methods: {
      /** 新增按钮操作 */
      handleAdd() {
        this.open = true;
        this.title = "添加";
      },
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
        listTiming(this.addDateRange(this.queryParams)).then(
          response => {
            this.tableData = response.rows;
            this.total = response.total;
            this.loading = false;
          }

        );
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
          methodName: undefined
        }
      },

      /** 提交按钮 */
      submitForm: function() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            addTiming(this.form).then((response) => {
              if (response.rtnCode === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              }
            })
          }
        });
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const id = row.jobName;
        this.$confirm('是否确认删除角色编号为"' + id + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delTiming(id);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
      },

      /** 暂停按钮操作 */
      handlePause(row) {
        const id = row.jobName;
        this.$confirm('是否确认暂停服务编号为"' + id + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return pauseTiming(id);
        }).then(() => {
          this.getList();
          this.msgSuccess("暂停成功");
        }).catch(function() {});
      },
      /** 恢复按钮操作 */
      handlePlay(row) {
        const id = row.jobName;
        this.$confirm('是否确认恢复服务编号为"' + id + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return playTiming(id);
        }).then(() => {
          this.getList();
          this.msgSuccess("恢复成功");
        }).catch(function(e) {
          console.log(e);
        });
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

