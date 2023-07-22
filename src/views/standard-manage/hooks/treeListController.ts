import { ref } from 'vue'
import {
  getCategoryListApi,
  addCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
} from '@/api/categoryTree'

export default function useTreeListController(categoryModule) {
  const treeList: any = ref([])
  async function getTreeList() {
    const res = await getCategoryListApi({
      categoryModule,
      categoryName: '',
      categoryCode: '',
    })
    treeList.value = res.data
  }
  async function addTreeNode(body) {
    const res = await addCategoryApi({
      categoryModule,
      state: 1,
      ...body,
    })
    return res
  }
  async function modifyTreeNode(body) {
    await updateCategoryApi({
      categoryModule,
      state: 1,
      ...body,
    })
  }
  async function deleteTreeNode(body) {
    await deleteCategoryApi(body)
  }
  return {
    treeList,
    getTreeList,
    addTreeNode,
    modifyTreeNode,
    deleteTreeNode,
  }
}
