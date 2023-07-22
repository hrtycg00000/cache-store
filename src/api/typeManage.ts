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
export function getRrelationComponentListApi(params = {}) {
  return axios.get('/component/relation/list', { params })
}
// 添加构件内嵌关系
export function addRrelationComponentApi(data = {}) {
  return axios.post('/component/relation/add', data)
}
// 删除构件内嵌关系
export function deleteRrelationComponentApi(data = {}) {
  return axios.post('/component/relation/deleteById', data)
}
// 更新构件内嵌关系
export function updateRrelationComponentApi(data = {}) {
  return axios.post('/component/relation/deleteById', data)
}
