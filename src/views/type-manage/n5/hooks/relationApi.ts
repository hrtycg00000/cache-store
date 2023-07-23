import { ref } from 'vue'
import {
  getRelationComponentListApi,
  addRelationComponentApi,
  deleteRelationComponentApi,
  updateRelationComponentApi,
} from '@/api/typeManage'

export default function useRelationApi() {
  const tableData: any = ref([])

  async function getTableData() {
    try {
      const res = await getRelationComponentListApi()
      tableData.value = res.data
    } catch (err) {
      //
    }
  }
  async function addItem(body) {
    await addRelationComponentApi(body)
  }
  async function updateItem(body) {
    await updateRelationComponentApi(body)
  }
  async function deleteItem(data) {
    await deleteRelationComponentApi(data)
  }
  return {
    tableData,
    getTableData,
    addItem,
    updateItem,
    deleteItem,
  }
}
