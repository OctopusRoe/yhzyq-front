<template>
  <div class="app-container">
    <el-row>
      <el-input type="hidden" v-model="form.id"/>
      <el-input type="hidden" v-model="form.type" />
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col>
            <el-form-item label="上级类型" prop="pid">
              <treeselect v-model="form.pid" :options="pidOptions" :normalizer="normalizer" :show-count="true" placeholder="请选择归属部门" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="类别编码" prop="code">
              <el-input v-model="form.code" placeholder="请输入类别编码"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="类型名称" prop="typename">
              <el-input v-model="form.typename" placeholder="请输入类型名称"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="排序号" prop="sortedOrder">
              <el-input-number  v-model="form.sortedOrder" placeholder="请输入排序号"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="描述" prop="remark">
              <el-input
                v-model="form.remark"
                size="medium"
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-col>
        </el-row >
        <el-row >
          <el-col align="middle">
          <el-button type="primary" @click="submitForm">提 交</el-button>
          <el-button @click="cancel">取 消</el-button>
          </el-col>
        </el-row>
      </el-form>

    </el-row>
  </div>
</template>

<script>

  import {
    getCommonTypeTree,
    getCommonTypeData,
    saveCommonType
  } from '@/api/system/commonType'
  import Treeselect from "@riophae/vue-treeselect";
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";
  export default {
    name: 'commonTypeInput',
    components: {Treeselect},
    props: {
      id: {
        type: String
      },
      pid: {
        type: String
      },
      dicttypeid: {
        type: String
      }
    },
    data() {
      return {
        pidOptions: [],
        // 字典分类表单参数
        form: {
          id: undefined,
          pid: this.pid,
          type: this.dicttypeid,
          code: undefined,
          typename: undefined,
          remark: undefined,
          sortedOrder: undefined
        },
        normalizer(node) { //方法
          return {
            id: node.id, // 键名转换，方法默认是label和children进行树状渲染
            label: node.text,
            children: node.children,
          }
        },
        // 表单校验
        rules: {
          typename: [
            { required: true, message: '类型名称不能为空', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '类别编码不能为空', trigger: 'blur' }
          ],
          sortedOrder: [
            { required: false, type: 'number', message: '名称不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    watch: {},
    created() {

      getCommonTypeTree('/xtCommonType-treeData.do',{dicttypeid: this.dicttypeid}).then((response) => {
        this.pidOptions = response;
      });
      this.getCommonTypeData()
    },
    methods: {
      getCommonTypeData() {
        console.log(this.id)
        if (this.id !== undefined) {
          getCommonTypeData(this.id).then((res) => {
            if (res.success) {
              let data = res.data
              this.form.id = data.id
              this.form.typename = data.typename
              this.form.sortedOrder = data.sortedOrder
              this.form.code = data.code
              if(data.pid===""){
                this.form.pid =undefined
              }else{
                this.form.pid = data.pid
              }
              this.form.remark = data.remark
            }
          })
        }
      },
      /** 提交按钮 */
      submitForm: function() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            saveCommonType(this.form).then((response) => {
              if (response.rtnCode === 200) {
                this.msgSuccess(response.msg)
                this.$emit('cancel' );
              }
            })
          }
        })
      },
      // 取消按钮
      cancel() {
        this.$emit('cancel' );
      },
      // 表单重置
      reset() {
        this.form = {
          id: undefined,
          pid: this.pid,
          type: this.dicttypeid,
          code: undefined,
          typename: undefined,
          remark: undefined,
          sortedOrder: undefined
        }
        this.resetForm('form')
      }
    }
  }
</script>

