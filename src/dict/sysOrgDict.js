// 组织机构类型（0 业主单位、1 监理单位、2 施工单位、3 设计单位、4 咨询单位 、10其他/归类）
const SYS_ORGANIZ = {
  // 组织机构类型树的凭借条件（orgType+orgLevel)
  ORGANIZ_TYPELEVEL: {
    OWNER_UNIT: "00,03,102", //业主单位
    PROJECT_UNIT: "00,102", //项目单位
    SUPERVISOR_UNIT: "00,102,13", //监理单位
    CONTRACT_UNIT: "00,102,23,25,26", //施工单位（含总包、分包、工区）
    CONTRACT_UNIT_ZB: "00,102,23", //总包
    CONTRACT_UNIT_FB: "00,102,23,25", //分包
    SUPERVISOR_UNIT_DEPART: "00,102,13,14", //监理单位部门
    CONTRACT_UNIT_DEPART: "00,102,23,24", //施工单位部门
    POSC_UNIT: "03,102,110,12,13,210,23", //三级单位显示 一般用于资料上传  业主单位、施工单位、监理单位
    USERROLECONTROL_ORGANIZSTREE: "00,102,110,13,210,23", //用户组织机构树
    ALLUSER_UNIT: "00,102,110,12,13,210,23,03", //显示所有单位部门 及业主单位
    ALLPART_UNIT: "00,102,110,12,13,210,23,03,14,24", // 到部门
    LWDW_UNIT: "00,20,21,22,23,25,26,27,102"
  },
  owner: "102",
  project: "03",
  supervisor: "13",
  contract: "23",

  // 组织结构类型
  ORGTYPE: [
    { key: 0, value: "业主单位" },
    { key: 1, value: "监理单位" },
    { key: 2, value: "施工单位" },
    { key: 3, value: "设计单位" },
    { key: 4, value: "咨询单位" },
    { key: 10, value: "其他" }
  ],

  // 组织机构层级/业务类型
  ORGLEVEL: [
    { key: 0, value: "集团" },
    { key: 1, value: "公司" },
    { key: 2, value: "项目" },
    { key: 3, value: "项目参建单位" },
    { key: 4, value: "参建单位部门" },
    { key: 5, value: "参建单位分部" },
    { key: 6, value: "参建单位工区" },
    { key: 10, value: "其他" }
  ]
};

export function getOrgDict() {
  return SYS_ORGANIZ;
}

/**
 *   base_project_type  base_project_unit
 * base_project_bid_type  base_project_contract
 * base_project_mode
 */
const base_project_config = {
  //项目类型
  baseProjectType: "Mpm_Project_Type",
  //建设单位
  baseProjectUnit: "Mpm_Project_Unit",
  //标段类型
  baseProjectBidType: "Mpm_Project_Bid_Type",
  //标段承包类型
  baseProjectContract: "Mpm_Project_Contract",
  //资金监管--合同承包方式
  baseProjectUnderTakeType: "Mpm_Project_UnderTake_type",
  //签署类型（资金监管-签署方式）
  baseProjectSignType: "Mpm_Sign_Type",
  //项目建设方式及性质
  baseProjectMode: "Mpm_Project_Mode"
};
/**
 * 标段相关
 */
const base_bim_config = {
  //施工单位
  baseBidUnit: "Mpm_Build_Unit",
  //标段类型
  baseBidBidType: "Mpm_Bid_Type",
  //标段承包类型
  baseBidContract: "Mpm_Bid_Contract",
  //是否收尾标
  baseBidSectionIsEnd: "Mpm_Bid_IsEnd",
  //设计单位
  baseBidDesignUnit: "Mpm_Bid_Design_Unit",
  //预算配置费用类型
  baseBidExpenseType: "Mpm_Fund_Budget_type",
  //投资控制-资金监管-收款单位
  baseCollectionUnit: "MPM_Collection_Unit"
};
/**
 * 系统相关
 */
const base_sys_config = {
  //资金监管-合同类型
  baseSysFundContractType: "Sys_Fund_Contract_Type"
};
export function getBaseProjectConfig() {
  return base_project_config;
}

export function getBaseBidConfig() {
  return base_bim_config;
}

export function getBaseSysConfig() {
  return base_sys_config;
}
