<!--
 * @Description: 人员选择输入框
 * @Author: 陈偲
 * @Date: 2021-05-22
 * @Params:
     // 双向绑定值，绑定id，例如：["40288193535929d2015359784df70006"]
    value: {
      type: Array,
      default() {
        return [];
      }
    },
    // 类型和等级 string ,分隔
    // 组织机构类型（0 业主单位、1 监理单位、2 施工单位、3 设计单位、4 咨询单位 、10其他/归类）
    // 组织机构级别 （0集团、1 公司、2项目、3 项目参建单位、4 参建单位部门、5 参建单位分部 、10其他/归类）
    /* 把需要特殊查询的组织机构类型+级别组合字符串\nvar typeLeves=new string[]{"22","25"} ; //\nSysOpenService.GetOrgsTree(typeLeves,"001");// 查询（项目类型为施工单+ 级别为项目）、（项目类型为施工单位+级别为其他）。 具体组合可参考组织机构类型和级别。\n示例：00,30,60,11,21,31,41,51,03,13,23,33,43,53，将层级放在后面。\n比如第一层就是 00,30 ,60 \n到第二层就加上 01,11,21,31,41,51\n到第四层，跳过第三层级 03,13,23,33,43,53 */
    typeAndLevel: {
      type: String,
      default: "",
      required: false
    },
    // 父级编码
    parentCode: {
      type: String,
      default: "0"
    },
    // 初始化数据，例子：[{ id: "40288193535929d2015359784df70006", name: "管理员" }]
    initDataList: {
      type: Array,
      default() {
        return [];
      }
    },
    // 是否在穿梭框上面显示搜索框
    showSearch: {
      type: Boolean,
      default() {
        return true;
      }
    },
    // 是否在组织树上面显示根节点
    showRoot: {
      type: Boolean,
      default() {
        return false;
      }
    },
    // 最大允许选择人数
    maxSelectedCount: {
      type: Number,
      default() {
        return 1000;
      }
    },
    // 人员穿梭时显示的标题头
    titles: {
      type: Array,
      default() {
        return ["可选人员", "已选人员"];
      }
    }
 * @Events:
    get-datas(userArray) 点击确认时返回的人物数组信息
      userArray | [{ id: "40288193535929d2015359784df70006", name: "管理员" }]
-->
<template>
  <!-- <div class="___input-select-user el-textarea"></div> -->
  <div class="el-textarea ___input-select-user">
    <div class="el-textarea__inner" @click="dialogFormVisible = true">
      <el-tag
        closable
        size="small"
        type="info"
        disable-transitions
        v-for="(item, index) in dataList"
        @close="deleteTag($event, index)"
        :key="index"
      >
        <span class="el-select__tags-text">{{ item.name }}</span>
      </el-tag>
    </div>

    <el-dialog
      title="请选择人员"
      :modal-append-to-body="false"
      append-to-body
      width="1050px"
      :visible.sync="dialogFormVisible"
    >
      <UserTransfer
        :typeAndLevel="typeAndLevel"
        :parentCode="parentCode"
        @change="handlerTransferChange"
        v-model="targetKeys"
        :showSearch="showSearch"
        :maxSelectedCount="maxSelectedCount"
        :titles="titles"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import UserTransfer from "@/components/system/UserTransfer";

export default {
  name: "InputSelectUser",
  components: {
    UserTransfer
  },
  props: {
    // 双向绑定值，绑定id，例如：["40288193535929d2015359784df70006"]
    value: {
      type: Array,
      default() {
        return [];
      }
    },
    // 类型和等级 string ,分隔
    // 组织机构类型（0 业主单位、1 监理单位、2 施工单位、3 设计单位、4 咨询单位 、10其他/归类）
    // 组织机构级别 （0集团、1 公司、2项目、3 项目参建单位、4 参建单位部门、5 参建单位分部 、10其他/归类）
    /* 把需要特殊查询的组织机构类型+级别组合字符串\nvar typeLeves=new string[]{"22","25"} ; //\nSysOpenService.GetOrgsTree(typeLeves,"001");// 查询（项目类型为施工单+ 级别为项目）、（项目类型为施工单位+级别为其他）。 具体组合可参考组织机构类型和级别。\n示例：00,30,60,11,21,31,41,51,03,13,23,33,43,53，将层级放在后面。\n比如第一层就是 00,30 ,60 \n到第二层就加上 01,11,21,31,41,51\n到第四层，跳过第三层级 03,13,23,33,43,53 */
    typeAndLevel: {
      type: String,
      default: "",
      required: false
    },
    // 父级编码
    parentCode: {
      type: String,
      default: "0"
    },
    // 初始化数据，例子：[{ id: "40288193535929d2015359784df70006", name: "管理员" }]
    initDataList: {
      type: Array,
      default() {
        return [];
      }
    },
    // 是否在穿梭框上面显示搜索框
    showSearch: {
      type: Boolean,
      default() {
        return true;
      }
    },
    // 是否在组织树上面显示根节点
    showRoot: {
      type: Boolean,
      default() {
        return false;
      }
    },
    // 最大允许选择人数
    maxSelectedCount: {
      type: Number,
      default() {
        return 1000;
      }
    },
    // 人员穿梭时显示的标题头
    titles: {
      type: Array,
      default() {
        return ["可选人员", "已选人员"];
      }
    }
  },
  model: "value",
  data() {
    return {
      dialogFormVisible: false,
      users: [],
      dataList: [],
      targetKeys: []
    };
  },
  watch: {
    value: {
      handler(newVal) {
        if (newVal && newVal.length) {
          newVal.forEach(item => {
            const index = this.targetKeys.indexOf(item);

            if (index < 0) {
              this.targetKeys.push(item);
            }
          });
        }
      },
      immediate: true
    },
    initDataList: {
      handler(newVal) {
        if (newVal && newVal.length) {
          this.dataList.splice(0);
          this.targetKeys.splice(0);

          newVal.forEach(item => {
            const index = this.dataList.indexOf(item);

            if (index < 0) {
              this.dataList.push(item);
              this.targetKeys.push(item.id);
            }
          });
          
          this.$emit(
            "input",
            this.dataList.map(item => item.id)
          );
        }
      },
      immediate: true
    }
  },
  methods: {
    handlerTransferChange(selectKeys, nodes) {
      this.users.splice(0);

      this.users.push(...nodes);
    },
    deleteTag(e, index) {
      e.stopPropagation();

      this.users.splice(index, 1);
      this.dataList.splice(index, 1);
      this.targetKeys.splice(index, 1);

      this.$emit("input", this.dataList);
    },
    confirm() {
      this.dialogFormVisible = false;

      this.dataList.splice(0);

      this.dataList.push(...this.users);

      this.$emit(
        "input",
        this.dataList.map(item => item.id)
      );

      this.$emit("get-datas", this.dataList);
    }
  }
};
</script>

<style lang="scss" scoped>
.___input-select-user {
  padding: 0;
  display: inline-block;

  .el-textarea__inner {
    min-height: 34px;
    padding: 5px;

    .el-tag {
      margin: 3px;
    }
  }

  /deep/.el-dialog {
    width: 1058px;
  }
}
</style>
