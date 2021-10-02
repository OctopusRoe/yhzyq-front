import request from "@/utils/request";
const req = process.env.VUE_APP_BASE_API;
const api = {
  UploadByProject: req + "/file/attach/upload",
  GetAttachList: "/file/attach/getAttachList",
  GetFullPath: "/file/attach/getFullPath",
  GetPath: req + "/file/attach/getPath",
  DownloadFile: "/file/attach/downloadFile",
  DelAttachById: "/file/attach/delAttachById",
  GetCountByBussiness: "/file/attach/getCountByBussiness"
};

// 根据项目上传文件
export function UploadByProject(parameter, data) {
  // debugger
  return request({
    url: api.UploadByProject + "?" + parameter,
    method: "post",
    data: data
  });
}

// 删除
export function DelAttachById(parameter) {
  // debugger
  return request({
    url: api.DelAttachById,
    method: "post",
    params: parameter
  });
}

// 根据Id集合获取附件数量
export function GetCountByBussiness(parameter) {
  // debugger
  return request({
    url: api.GetCountByBussiness,
    method: "get",
    params: parameter
  });
}

// 根据项目上传文件
export function GetAttachList(parameter) {
  // debugger
  return request({
    url: api.GetAttachList,
    method: "get",
    params: parameter
  });
}

// 根据项目上传文件
export function GetFullPath(parameter) {
  // debugger
  return request({
    url: api.GetFullPath,
    method: "GET",
    params: parameter
  });
}

export function GetUploadURL() {
  return api.UploadByProject;
}

export const Get = api.GetPath;
