<template>
  <a-row class="search-container" :gutter="15" :wrap="false">
    <a-col flex="auto">
      <a-input-group style="display: flex">
        <a-select
          v-model="searchData.fieldName"
          style="width: 215px"
          placeholder="选择筛选字段"
          @change="handleFieldNameChenge">
          <a-option value="tribeCode" label="族类型编码" />
          <a-option value="name" label="构件名称" />
        </a-select>
        <a-input v-model="searchData.fieldValue" placeholder="输入字段值" allow-clear />
      </a-input-group>
    </a-col>
    <a-col flex="initial">
      <a-button type="primary" @click="handleSearch">查询</a-button>
    </a-col>
  </a-row>
  <a-table
    class="table-container"
    row-key="tribeCode"
    size="small"
    :loading="loading"
    :data="listData"
    :row-selection="{ type: 'checkbox', title: '选择' }"
    :pagination="pagination"
    :bordered="true"
    :scroll="{ y: 500 }"
    :scrollbar="true"
    @select="handleTableSelect"
    @page-change="handlePageChange('current', $event)"
    @page-size-change="handlePageChange('pageSize', $event)">
    <template #columns>
      <a-table-column title="族类型编码" data-index="tribeCode" />
      <a-table-column title="构件名称" data-index="name" />
    </template>
  </a-table>
  <a-space fill style="justify-content: flex-end">
    <a-button @click="$emit('cancel')">取消</a-button>
    <a-button :loading="btnLoading" type="primary" @click="handleAdd">确认</a-button>
  </a-space>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import { difference, remove } from 'lodash'
  import useLoading from '@/hooks/loading'
  import useGetList from '@/views/standard-manage/hooks/getList'
  import useRelationApi from '@/views/type-manage/n5/hooks/relationApi'
  import { getComponentListApi } from '@/api/typeManage'

  const emits = defineEmits(['refresh', 'cancel'])
  const { loading, setLoading } = useLoading()
  const { loading: btnLoading, setLoading: setBtnLoading } = useLoading()
  const props = defineProps({
    mainTribeCode: String,
  })
  const searchData = reactive({
    fieldName: '',
    fieldValue: '',
  })
  const selectedList = ref([])
  const { listData, pagination, getListDataWithPage } = useGetList(getComponentListApi, searchData)
  const { addItem } = useRelationApi()
  function handleSearch() {
    getListDataWithPage(setLoading)
  }
  function handlePageChange(key, current) {
    pagination[key] = current
    handleSearch()
  }
  function handleFieldNameChenge() {
    searchData.fieldValue = ''
  }
  function handleTableSelect(rowKeys, rowKey, record) {
    if (rowKeys.length > selectedList.value.length) {
      selectedList.value.push({
        mainTribeCode: props.mainTribeCode,
        childTribeCode: record.tribeCode,
        childComponentName: record.name,
      })
    } else {
      const selectedCodeList = selectedList.value.map((item) => item.childTribeCode)
      const dif = difference(selectedCodeList, rowKeys)
      remove(selectedList.value, (item) => item.childTribeCode === dif[0])
    }
  }
  async function handleAdd() {
    try {
      setBtnLoading(true)
      await addItem(selectedList.value)
      emits('cancel')
      emits('refresh')
    } catch (error) {
      //
    } finally {
      setBtnLoading(false)
    }
  }
  async function init() {
    handleSearch()
  }
  init()
</script>

<style scoped lang="less">
  .search-container {
    margin-bottom: 15px;
  }
  .table-container {
    margin-bottom: 15px;
  }
</style>
