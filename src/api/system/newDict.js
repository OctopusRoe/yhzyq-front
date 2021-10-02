import request from '@/utils/request'

const url = {
  getDictTypeTreeData:"/system/DictType/getDictTreeData",
  getDictById:"/system/Dict/getDictById",
  getDictPageData:"/system/Dict/findDictByDictType",

  updateDict:"/system/Dict/updateDict",
  addDict:"/system/Dict/addDict",
  delDict:"/system/Dict/delDictById",



};

// 新增或编辑字典分类
export function saveOrUpdateDictCategory(data) {
  return request({
    url: '/system/DictCategory/saveOrUpdateXtDictCategory',
    method: 'post',
    data: data
  })
}

// 删除字典分类
export function deleteDictCategory(data) {
  return request({
    url: '/system/DictCategory/delXtDictCategoryById',
    method: 'post',
    data:data
  })
}

// 获取字典分类
export function getDictCategoryById(data) {
  return request({
    url: '/system/DictCategory/getXtDictCategoryById',
    method: 'post',
    data: data 
  })
}

// 获取字典类别
export function getDictTypeById(data) {
  return request({
    url: '/system/DictType/getXtDictTypeById',
    method: 'post',
    data: data
  })
}

// 获取字典类别树状数据 v
export function getDictTypeTreeData() {
  return request({
    url: url.getDictTypeTreeData,
    method: 'get'
  })
}

// export function getDictTypeTreeData() {
//   return request({
//     url: '/Ajax.jsonServlet?service=xtDictTypeService&serviceMethod=getTreeData',
//     method: 'get'
//   })
// }

// 新增编辑字典类别
export function addDictType(data) {
  return request({
    url: '/system/DictType/saveXtDictType',
    method: 'post',
    data: data
  })
}

// 修改编辑字典类别
export function updateDictType(data) {
  return request({
    url: '/system/DictType/updateDictType',
    method: 'post',
    data: data
  })
}

// 删除字典类别
export function deleteDictType(data) {
  return request({
    url: '/system/DictType/delXtDictTypeById',
    method: 'post',
    data:data
  })
}

// 获取字典
export function getDictById(data) {
  return request({
    url: url.getDictById,
    method: 'post',
    data: data,
  })
}

// 获取字典列表数据
export function getDictPageData(data) {
  return request({
    url: url.getDictPageData,
    method: 'post',
    data: data,
  })
}

// //获取字典列表数据
// export function getDictPageData(data) {
//   return request({
//     url: '/Ajax.jsonServlet?service=xtDictService&serviceMethod=pagelistByFK',
//     method: 'post',
//     data: data
//   })
// }


// 修改字典列表数据
export function updateDict(data) {
  return request({
    url: url.updateDict,
    method: 'post',
    data: data
  })
}

// 新增字典列表数据
export function addDict(data) {
  return request({
    url: url.addDict,
    method: 'post',
    data: data
  })
}
// export function addDict(obj) {
//   return request({
//     url: '/Ajax.jsonServlet?service=xtDictService&serviceMethod=addDict',
//     method: 'post',
//     data: obj
//   })
// }

// 删除字典列表数据
export function delDict(data) {
  return request({
    url: url.delDict,
    method: 'post',
    data:data,
  })
}
// 获取字典列表X
// export function getDictList(id) {
//   return request({
//     url: '/a.eui?s=xtDictService&m=getDistsByTypeId&id='+id,
//     method: 'get'
//   })
// }
