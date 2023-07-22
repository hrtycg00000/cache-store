import axios from 'axios'

// 获取分类树
export function getCategoryListApi(data = {}) {
  return axios.post('/category/queryCategoryList', data)
}

// 添加分类
export function addCategoryApi(data = {}) {
  return axios.post('/category/addCategory', data)
}

// 删除分类
export function deleteCategoryApi(params = {}) {
  return axios.get('/category/deleteCategoryById', { params })
}

// 修改分类
export function updateCategoryApi(data = {}) {
  return axios.post('/category/updateCategory', data)
}

// 获取二级分类列表
export function getSecCategoryApi(data = {}) {
  return axios.post('/category/querySecondCategoryList', data)
}
