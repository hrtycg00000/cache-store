<template>
  <a-table
    row-key="childTribeCode"
    size="small"
    style="margin-bottom: 15px"
    :data="tableData"
    :row-selection="{ type: 'checkbox', title: '选择' }"
    :bordered="true"
    :scroll="{ y: 500 }"
    :scrollbar="true"
    @select="handleTableSelect">
    <template #columns>
      <a-table-column title="族类型编码" data-index="childTribeCode" :width="110" />
      <a-table-column title="构件名称" data-index="childComponentName" />
      <a-table-column title="构件一级分类名称" data-index="mainTribeName" :width="150" />
      <a-table-column title="构件二级分类名称" data-index="secTribeName" :width="150" />
    </template>
  </a-table>
  <a-space fill style="justify-content: flex-end">
    <a-button @click="$emit('cancel')">取消</a-button>
    <a-button :loading="btnLoading" type="primary" @click="handleAdd">确认</a-button>
  </a-space>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { difference, remove } from 'lodash'
  import useLoading from '@/hooks/loading'
  import useRelationApi from '@/views/type-manage/n5/hooks/relationApi'
  import { addComponentRelationUEModelApi } from '@/api/typeManage'

  const emits = defineEmits(['refresh', 'cancel'])
  const { loading: btnLoading, setLoading: setBtnLoading } = useLoading()
  const props = defineProps({
    mainTribeCode: String,
  })
  const selectedList = ref([])
  const { tableData, getTableData } = useRelationApi()
  function handleTableSelect(rowKeys, rowKey, record) {
    if (rowKeys.length > selectedList.value.length) {
      selectedList.value.push({
        mainTribeCode: props.mainTribeCode,
        childTribeCode: record.childTribeCode,
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
      await addComponentRelationUEModelApi(selectedList.value)
      emits('cancel')
      emits('refresh')
    } catch (error) {
      //
    } finally {
      setBtnLoading(false)
    }
  }
  async function init() {
    getTableData()
  }
  init()
</script>
