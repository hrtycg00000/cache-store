import { ref, reactive } from 'vue'
import { getBusinessParamListApi } from '@/api/standardManage'
import { getBusinessDataListApi } from '@/api/typeManage'

export default function useGetListSimple(reqBody, setLoading?) {
  const columnData: any = ref([])
  const listData: any = ref([])
  const pagination = reactive({
    total: 0,
    current: 1,
    pageSize: 20,
    showTotal: true,
    showPageSize: true,
  })
  async function getColumnData(body = null) {
    try {
      const res = await getBusinessParamListApi(body || { module: reqBody.module })
      columnData.value = res.data
    } catch (err) {
      //
    }
  }
  async function getListData() {
    try {
      setLoading(true)
      const res: any = await getBusinessDataListApi({
        ...reqBody,
        pageNumber: pagination.current,
        pageSize: pagination.pageSize,
      })
      listData.value = res.data
      pagination.total = res.total
    } catch (err) {
      //
    } finally {
      setLoading(false)
    }
  }
  function handlePageChange(key, current) {
    pagination[key] = current
    getListData()
  }
  return {
    columnData,
    listData,
    pagination,
    getColumnData,
    getListData,
    handlePageChange,
  }
}
