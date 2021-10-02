<template>
  <el-dialog
    v-if="isExist"
    title="表头映射详情"
    :visible="dialogShow"
    :append-to-body="true"
    :close-on-click-modal="false"
    width="70%"
    class="dialog-common"
    @close="closeDialog"
  >
    <div>
      <el-row>
        <el-form ref="form" :model="form" :rules="rules" label-width="160px">
          <div class="dashedDiv">
            <p class="titlep">基本数据</p>
            <el-row>
              <el-col :span="8">
                <el-form-item label="code：" prop="code">
                  <el-input v-model="form.code" placeholder="" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="名称：" prop="name">
                  <el-input v-model="form.name" placeholder="" />
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <div class="dashedDiv">
            <p class="titlep">表头映射</p>
            <vxe-table
              border
              resizable
              height="528px"
              ref="vtable"
              check-strictly="true"
              row-id="id"
              :data="form.data"
              show-overflow
            >
              > v-loading="loading" >

              <vxe-table-column
                field="filedName"
                title="表头中文）"
                align="center"
              >
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    placeholder=""
                    v-model="scope.row.filedName"
                  ></el-input>
                </template>
              </vxe-table-column>
              <vxe-table-column
                field="filedCode"
                title="字段编码"
                header-align="center"
              >
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    placeholder=""
                    v-model="scope.row.filedCode"
                    onkeyup="this.value = this.value.replace(/[\u4E00-\u9FA5\s+]/g,'');"
                  ></el-input>
                </template>
              </vxe-table-column>
              <vxe-table-column
                field="sortedNum"
                title="排序"
                header-align="center"
              >
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    placeholder=""
                    v-model="scope.row.sortedNum"
                    @change="onChange()"
                    onkeyup="value=value.replace(/[^\d]/g,'')"
                  ></el-input>
                </template>
              </vxe-table-column>
            </vxe-table>
          </div>

          <el-row>
            <el-col align="middle">
              <el-button @click="cancel">取 消</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "detail",
  components: {},
  props: {
    id: {
      type: String
    },
    typeId: {
      type: String
    }
  },
  data() {
    return {
      dialogShow: false,
      isExist: false,
      loading: false,
      isabled: false,
      editDisabled: false,
      queryParam: {
        id: ""
      },
      // 表单参数
      defaultForm: {
        id: "",
        code: "",
        name: "",
        data: []
      },
      form: { id: "", code: "", name: "", data: [] },

      // 表单校验
      rules: {
        code: [{ required: true, message: "code 不能为空", trigger: "blur" }],
        name: [{ required: true, message: "名称 不能为空", trigger: "blur" }]
      }
    };
  },
  watch: {},
  created() {
    //this.form = this.defaultForm;
    Object.assign(this.form, this.defaultForm);
  },
  methods: {
    showModal(record) {
      this.form = { ...record };
      this.dialogShow = true;
      this.isExist = true;
    },
    onChange() {
      this.sortBykey(this.form.data, "sortedNum");
    },
    sortBykey(ary, key) {
      return ary.sort(function(a, b) {
        let x = a[key];
        let y = b[key];
        return x < y ? -1 : x > y ? 1 : 0;
      });
    },
    // 取消按钮
    cancel() {
      this.reset();
      this.dialogShow = false;
    },
    closeDialog() {
      this.reset();
      this.isExist = false;
    },
    // 表单重置
    reset() {
      Object.assign(this.form, this.defaultForm);
      this.$refs["form"].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.solidDiv {
  margin-bottom: 10px;
  border: 1px solid #000;
}
.dashedDiv {
  margin-bottom: 10px;
  border: 1px dashed #000;
}
.titlep {
  position: relative;
  width: 120px;
  padding-left: 10px;
  left: 40px;
  top: -10px;
  text-align: center;
  background-color: white;
}
.unifyW {
  width: 100%;
}
</style>
