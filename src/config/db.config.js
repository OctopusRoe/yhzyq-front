/*
 * @Description: 文件内容描述
 * @Author: 陈偲
 * @Date: 2021-06-17 11:10:10
 */
import Idb from "idb-js"; //  引入Idb
import Vue from "vue";

const myDb = {
  dbName: "JiangxiHighSpeed", // 数据库名称
  version: 2, // 数据库版本号（默认为当前时间戳）
  tables: [
    {
      tableName: "fj_wbs_instance", // WBS实体表
      option: { keyPath: "id" }, // 表配置，即ObjectStore配置，此处指明主键为id
      indexs: [
        {key:"id",option:{unique:true}},
        {key:"org_id"},  // 父级orgId
        {key:"parent_id"},  // 父级id
        {key:"wbs_code"},
        {key:"wbs_name"},   //名称
        {key:"local_code"},   //地标编号
        {key:"nation_code"},  //国标编号
        {key:"meterage_unit"},  //计量单位
        {key:"system_sign"},  //所属标记
        {key:"divide_type"},  //工程划分类型
        {key:"struct_type"},  //结构类别
        {key:"meterage_state"}, //计量状态
        {key:"start_stake"},  //	开始桩号
        {key:"end_stake"},    //终止桩号
        {key:"allow_ratio"},  //允许计量比例
        {key:"status"},     //状态
        {key:"sorted_order"}, // 排序
        {key:"remark"},   // 备注
        {key:"is_leaf"},  // 是否是叶子节点
        {key:"tag"} // 标记 -1=删除， 1=新增， 2=修改
      ]
    },
    {
      tableName: "fj_section_subitem_list",    // 清单挂接表
      option: { keyPath: "id" },
      indexs: [
        {key: "id", option: {unique: true}},
        {key: "wbs_id"},    // WBS编号
        {key: "list_id"},   // 清单编号
        {key: "subitem_code"},  // 清单CODE
        {key: "subitem_name"},  //清单名称
        {key: "price"},       // 单价
        {key: "contract_number"}, // 合同数量
        {key: "check_amount"},  // 金额
        {key: "type"},    // 	类型（1:合同,2:变更 3 修编）
        {key: "category"},  //类型（1:合同清单,2:材料清单）
        {key: "chapter_type"},  //章节类型
        {key: "status"},    // 状态
        {key: "sorted_order"},  //排序
        {key: "meterage_unit"}, //计量单位
        {key: "allow_proportion"},  //允许计量比例
        {key: "org_id"},    // 机构编号
        {key: "remark"} //备注
      ]
    },
    {
      tableName: "fj_list",    // 清单源数据列表
      option: { keyPath: "id" },
      indexs: [
        {key: "id", option: {unique: true}},
        {key: "subitem_code"},  // 清单CODE
        {key: "subitem_name"},  //清单名称
        {key: "price"},       // 单价
        {key: "contract_number"}, // 合同数量
        {key: "check_amount"},  // 金额
        {key: "type"},    // 	类型（1:合同,2:变更 3 修编）
        {key: "list_type"},  //类型（1:合同清单,2:材料清单）
        {key: "chapter_type"},  //章节类型
        {key: "status"},    // 状态
        {key: "sorted_order"},  //排序
        {key: "meterage_unit"}, //计量单位
        {key: "allow_proportion"},  //允许计量比例
        {key: "org_id"},    // 机构编号
        {key: "remark"} //备注
      ]
    },
    {
      tableName: "fj_process",    // 工序挂接表
      option: { keyPath: "id" },
      indexs: [
        {key: "id", option: {unique: true}},
        {key: "code"},
        {key: "name"},  //工序名称
        {key: "parent_id"}, //父级ID
        {key: "process_rate"}, // 工序占比
        {key: "time_rate"}, //时间占比
        {key: "wbs_id"},  // WBSID
        {key: "status"},  //状态
        {key: "sorted_order"},  // 排序
        {key: "org_id"},    // 机构编号
        {key: "remark"}
      ]
    },
    {
      tableName: "fj_process_list",    // 工序关联清单表
      option: { keyPath: "id" },
      indexs: [
        {key: "id", option: {unique: true}},
        {key: "list_id"},   // 清单ID
        {key: "subitem_code"},  // 清单CODE
        {key: "subitem_name"},  // 清单名称
        {key: "chapter_type"},  // 章节类型
        {key: "chapter"},   //章节名称
        {key: "meterage_unit"}, // 计量单位
        {key: "org_id"},    // 机构编号
        {key: "remark"} // 备注
      ]
    },
    {
      tableName: "subitem_state",   // 工程分解数据状态信息表（前端控制数据对象）
      option: { keyPath: "id" },
      indexs: [
        {key: "id", option: {unique: true}}, // orgId
        {key: "state"},   // 当前数据集状态 0=未变更 1=已变更未提交 100=数据已提交
        {key: "ups"},
        {key: "add_time"},  // 前端存储数据的时间
        {key: "user_change_time"},  // 用户选择忽略的时间
        {key: "update_time"}, // 前端最后修改时间
      ]
    },
    {
      tableName: "change_info",    // 变更信息缓存表
      option: { keyPath: "id" },
      indexs: [
        {key:"id"},   // 主键 = 表内 orgId + tableId + objectId
        {key:"org_id"},   // 组织机构编号
        {key:"table_id"}, // 关联表数据 100 = fj_section_subitem_list, 200 = fj_process, 300 = fj_process_list
        {key:"object_id"},   // 主体对象ID  100&200 = wbsId, 300 = processId
      ]
    }
  ]
};

window.$DB = Vue.prototype.$DB = Idb(myDb);
