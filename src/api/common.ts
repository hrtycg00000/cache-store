import axios from 'axios'

// 获取流水码
export function getFlowCodeApi(data = {}) {
  return axios.post('/common/flow_code', data)
}

// TODO DELETE
export function addDictionary(data = {}) {
  return axios.post('/dict/type/add', data)
}
