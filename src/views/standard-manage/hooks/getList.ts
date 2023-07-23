import { ref, reactive } from 'vue'

export default function useGetList(apiFn, reqBody) {
  const listData: any = ref([])
  const pagination = reactive({
    total: 0,
    current: 1,
    pageSize: 20,
    showTotal: true,
    showPageSize: true,
  })
  const baseListData: any = ref([])
  const geometryListData: any = ref([])
  const materialListData: any = ref([])
  async function getListData(setLoading) {
    try {
      setLoading(true)
      const res = await apiFn(reqBody)
      listData.value = res.data
    } catch (err) {
      //
    } finally {
      setLoading(false)
    }
  }
  async function getListDataWithPage(setLoading) {
    try {
      setLoading(true)
      const res = await apiFn({
        ...reqBody,
        pageNumber: pagination.current,
        pageSize: pagination.pageSize,
      })
      listData.value = res.data.data
      pagination.total = res.data.total
    } catch (err) {
      //
    } finally {
      setLoading(false)
    }
  }
  async function getBaseListData() {
    try {
      const res = await apiFn({
        ...reqBody,
        subModule: 1,
      })
      baseListData.value = res.data
    } catch (err) {
      //
    }
  }
  async function getGeometryListData() {
    try {
      const res = await apiFn({
        ...reqBody,
        subModule: 2,
      })
      geometryListData.value = res.data
    } catch (err) {
      //
    }
  }
  async function getMaterialListData() {
    try {
      const res = await apiFn({
        ...reqBody,
        subModule: 3,
      })
      materialListData.value = res.data
    } catch (err) {
      //
    }
  }
  return {
    listData,
    pagination,
    baseListData,
    geometryListData,
    materialListData,
    getListData,
    getListDataWithPage,
    getBaseListData,
    getGeometryListData,
    getMaterialListData,
  }
}
