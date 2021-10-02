/*
 * @Description: 文件内容描述
 * @Author: 谭志顺
 * @Date: 2021-06-24
 */
import Idb from "idb-js"; //  引入Idb
import Vue from "vue";

const demoDb = {
  dbName: "demoDb", // 数据库名称
  version: 1, // 数据库版本号（默认为当前时间戳）
  tables: [
    {
      tableName: "fj_wbs_instance", // WBS实体表
      option: { keyPath: "id" }, // 表配置，即ObjectStore配置，此处指明主键为id
      indexs: [
        { key: "id", option: { unique: true } },
        { key: "parent_id" }, // 父级id
        { key: "wbs_code" },
        { key: "wbs_name" }, //名称
        { key: "local_code" }, //地标编号
        { key: "nation_code" }, //国标编号
        { key: "meterage_unit" }, //计量单位
        { key: "system_sign" }, //所属标记
        { key: "divide_type" }, //工程划分类型
        { key: "struct_type" }, //结构类别
        { key: "meterage_state" }, //计量状态
        { key: "start_stake" }, //	开始桩号
        { key: "end_stake" }, //终止桩号
        { key: "allow_ratio" }, //允许计量比例
        { key: "status" }, //状态
        { key: "sorted_order" }, // 排序
        { key: "remark" }, // 备注
        { key: "is_leaf" }, // 是否是叶子节点
        { key: "tag" } // 标记 -1=删除， 1=新增， 2=修改
      ]
    },
    {
      tableName: "fj_section_subitem_list", // 清单挂接表
      option: { keyPath: "id" },
      indexs: [
        { key: "id", option: { unique: true } },
        { key: "wbs_id" }, // WBS编号
        { key: "list_id" }, // 清单编号
        { key: "subitem_code" }, // 清单CODE
        { key: "subitem_name" }, //清单名称
        { key: "price" }, // 单价
        { key: "contract_number" }, // 合同数量
        { key: "check_amount" }, // 金额
        { key: "type" }, // 	类型（1:合同,2:变更 3 修编）
        { key: "category" }, //类型（1:合同清单,2:材料清单）
        { key: "status" }, // 状态
        { key: "sorted_order" }, //排序
        { key: "meterage_unit" }, //计量单位
        { key: "allow_proportion" }, //允许计量比例
        { key: "remark" } //备注
      ]
    }
  ]
};
window.$demoDB = Vue.prototype.$demoDB = Idb(demoDb);
