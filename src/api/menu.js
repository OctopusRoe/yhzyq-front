/*
 * @description: 文件内容描述
 * @author: 陈偲
 * @time: 
 * @params: 
 * @event: 
 */
import request from "@/utils/request";

const url = {
  queryResourceTreeByUserId: "/system/queryRole/queryResourceTreeByUserId"
};

// // 获取路由
// export const getRouters = () => {
//  return request({
//     url: '/ucAdmin-fetchResourceForJson.do',
//     method: 'get'
//   })
// }

// 获取路由
export const getRouters = () => {
  return request({
    url: url.queryResourceTreeByUserId,
    method: "get"
  });
};
