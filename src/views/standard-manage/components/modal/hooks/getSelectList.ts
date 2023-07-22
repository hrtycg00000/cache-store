import { ref } from 'vue'
import { getDictionaryListApi, getDicHeaderListApi, getDicValListApi } from '@/api/dictionary'

export default function useGetTableSelectList(reqBody?, pagination?) {
  const selectList: any = ref([])
  const tableColumnList: any = ref([])
  const tableList: any = ref([])
  async function getSelectList() {
    try {
      const res = await getDictionaryListApi()
      selectList.value = res.data
    } catch (err) {
      // err
    }
  }
  async function getTableColumnList() {
    try {
      const { data } = await getDicHeaderListApi({ dictTypeId: reqBody.dictTypeId })
      tableColumnList.value = data
    } catch (err) {
      // err
    }
  }
  async function getTableList(setLoading) {
    try {
      setLoading(true)
      const res: any = await getDicValListApi({
        ...reqBody,
        pageNumber: pagination.current,
        pageSize: pagination.pageSize,
      })
      tableList.value = res.data
      pagination.total = res.total
    } catch (err) {
      // err
    } finally {
      setLoading(false)
    }
  }
  return {
    selectList,
    tableColumnList,
    tableList,
    getSelectList,
    getTableColumnList,
    getTableList,
  }
}
