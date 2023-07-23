import axios from 'axios'

// 查询业务数据列表
export function getBusinessDataListApi(data = {}) {
  return axios.post('/businessdata/list', data)
}

// 添加业务数据
export function addBusinessDataApi(data = {}) {
  return axios.post('/businessdata/add', data)
}

// 删除业务数据
export function deleteBusinessDataApi(params = {}) {
  return axios.get('/businessdata/delete', { params })
}

// 获取N5构件列表
export function getComponentListApi(data = {}) {
  return axios.post('/component/list', data)
}
// 添加N5构件
export function addComponentApi(data = {}) {
  return axios.post('/component/add', data)
}
// 添加N5构件
export function updateComponentApi(data = {}) {
  return axios.post('/component/update', data)
}
// 添加N5构件
export function deleteComponentApi(params = {}) {
  return axios.get('/component/delete', { params })
}
// 获取构件内嵌关系列表
export function getRelationComponentListApi(params = {}) {
  return axios.get('/component/relation/list', { params })
}
// 添加构件内嵌关系
export function addRelationComponentApi(data = {}) {
  return axios.post('/component/relation/add', data)
}
// 删除构件内嵌关系
export function deleteRelationComponentApi(data = {}) {
  return axios.post('/component/relation/deleteById', data)
}
// 更新构件内嵌关系
export function updateRelationComponentApi(data = {}) {
  return axios.post('/component/relation/update', data)
}

// 获取关联N7列表
export function getRelationParamsApi(data = {}) {
  return axios.post('/component/relation_params/list', data)
}
// 获取关联N7列表
export function getRelationGoodsListApi(data = {}) {
  return axios.post('/component/relation_goods/list', data)
}

// 获取关联UE模型列表
export function getRelationUEModelListApi(data = {}) {
  return axios.post('/component/relation_ue_model/list', data)
}
// 关联UE模型添加构件
export function addComponentRelationUEModelApi(data = {}) {
  return axios.post('/component/relation_ue_model/add', data)
}
// 更新UE模型链接
export function updateRelationUEModelApi(data = {}) {
  return axios.post('/component/relation_ue_model/update', data)
}
