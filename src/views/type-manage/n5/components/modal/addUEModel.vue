<template>
  <a-table
    row-key="tribeCode"
    size="small"
    style="margin-bottom: 15px"
    :loading="loading"
    :data="tableData"
    :row-selection="{ type: 'checkbox', title: '选择' }"
    :bordered="true"
    :scroll="{ y: 500 }"
    :scrollbar="true"
    @select="handleTableSelect">
    <template #columns>
      <a-table-column title="族类型编码" data-index="tribeCode" :width="110" />
      <a-table-column title="构件名称" data-index="tribeName" />
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
  import { Message } from '@arco-design/web-vue'
  import useLoading from '@/hooks/loading'
  import { getRelationComponentListForUEApi } from '@/api/typeManage'

  const emits = defineEmits(['cancel', 'submit'])
  const { loading, setLoading } = useLoading()
  const { loading: btnLoading, setLoading: setBtnLoading } = useLoading()
  const props = defineProps({
    mainTribeCode: String,
  })
  const selectedList = ref([])
  const tableData = ref([])
  async function getTableList() {
    try {
      setLoading(true)
      const res = await getRelationComponentListForUEApi({ tribeCode: props.mainTribeCode })
      tableData.value = res.data
    } catch (error) {
      //
    } finally {
      setLoading(false)
    }
  }
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
    if (selectedList.value.length <= 0) {
      Message.warning('请选择构件')
      return
    }
    emits('submit', selectedList.value, setBtnLoading)
  }
  function init() {
    getTableList()
  }
  init()
</script>
