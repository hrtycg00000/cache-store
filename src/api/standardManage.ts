import axios from 'axios'

// 查询业务参数配置列表
export function getBusinessParamListApi(data = {}) {
  return axios.post('/business_param/list', data)
}

// 添加业务参数项
export function addBusinessParamApi(data = {}) {
  return axios.post('/business_param/add', data)
}

// 添加业务参数项
export function updateBusinessParamApi(data = {}) {
  return axios.post('/business_param/update', data)
}

// 删除业务参数项
export function deleteBusinessParamApi(params = {}) {
  return axios.get('/business_param/delete', { params })
}
