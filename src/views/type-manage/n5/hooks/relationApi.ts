import { ref, reactive } from 'vue'
import {
  getRrelationComponentListApi,
  addRrelationComponentApi,
  deleteRrelationComponentApi,
  updateRrelationComponentApi,
} from '@/api/typeManage'

export default function useRelationApi() {
  const tableData: any = ref([])

  async function getTableData() {
    try {
      const res = await getRrelationComponentListApi()
      tableData.value = res.data
    } catch (err) {
      //
    }
  }
  async function addItem() {
    try {
      await addRrelationComponentApi()
    } catch (err) {
      //
    }
  }
  async function updateitem() {
    try {
      await updateRrelationComponentApi()
    } catch (err) {
      //
    }
  }
  async function deleteItem(data) {
    try {
      await deleteRrelationComponentApi(data)
    } catch (err) {
      //
    }
  }
  return {
    tableData,
    getTableData,
    addItem,
    updateitem,
    deleteItem,
  }
}
