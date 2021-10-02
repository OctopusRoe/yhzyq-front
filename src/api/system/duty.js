import request from "@/utils/request";

const url = {
  queryDutys: "/system/duty/queryDuty",
  addDuty: "/system/duty/addDuty",
  updateDuty:"/system/duty/updateDuty",
  delDuty:  "/system/duty/delDuty",
  queryAllDuty:"/system/duty/queryAllDuty"
  
};

// 查询职务列表
export function queryDutyb(data) {
    return request({
      url:url.queryDutys,
      method: "get",
      params:data
    });
  }


// 添加职务
export function addDuty(data) {
  return request({
    url: url.addDuty,
    method: "post",
    data: data
    // params: data
  });
}
//修改职务
export function updateDuty(data) {
  return request({
    url: url.updateDuty,
    method: "post",
    data: data
    // params: data
  });
}
//删除职务
export function delDuty(data) {
  return request({
    url: url.delDuty,
    method: "post",
    data: data,
    // params: data
  });
}

//职务下拉框数据
export function queryAllDuty(data) {
  return request({
    url: url.queryAllDuty,
    method: "get",
    // data: data,
     params: data
  });
}

