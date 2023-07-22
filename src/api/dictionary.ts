import axios from 'axios'

/* 字典设置 */
// 获取字典类型列表
export function getDictionaryListApi() {
  return axios.get('/dict/type/list')
}

// 新增字典类型
export function addDictionary(data = {}) {
  return axios.post('/dict/type/add', data)
}

// 编辑字典类型
export function modifyDictionary(data = {}) {
  return axios.post('/dict/type/updateById', data)
}

// 删除字典类型
export function deleteDictionary(params = {}) {
  return axios.get('/dict/type/deleteById', { params })
}

// 获取单个字典类型的表头列表
export function getDicHeaderListApi(params = {}) {
  return axios.get('/dict/header/list', { params })
}

// 添加字典表头
export function addDicHeaderApi(data = {}) {
  return axios.post('/dict/header/add', data)
}

// 编辑字典表头
export function modifyDicHeaderApi(data = {}) {
  return axios.post('/dict/header/update', data)
}

// 获取单个字典类型的表头列表
export function deleteDicHeaderApi(params = {}) {
  return axios.get('/dict/header/delete', { params })
}

/* 字典管理 */
// 字典值列表查询
export function getDicValListApi(data = {}) {
  return axios.post('/dict/value/list', data)
}

// 添加字典值
export function addDicValueApi(data = {}) {
  return axios.post('/dict/value/add', data)
}
// 删除字典值
export function deleteDicValueApi(params = {}) {
  return axios.get('/dict/value/deleteById', { params })
}
