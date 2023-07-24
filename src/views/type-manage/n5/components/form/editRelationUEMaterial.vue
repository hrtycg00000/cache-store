<template>
  <a-row :gutter="12">
    <a-col :span="8">
      <a-table
        row-key="tribeCode"
        size="small"
        :data="leftTableData"
        :row-selection="{ type: 'checkbox', title: '选择' }"
        :bordered="true"
        :scroll="{ y: 500 }"
        :scrollbar="true"
        @select="handleTableSelect">
        <template #columns>
          <a-table-column title="族类型编码" data-index="tribeCode" ellipsis tooltip />
          <a-table-column title="构件名称" data-index="tribeName" ellipsis tooltip />
        </template>
      </a-table>
    </a-col>
    <a-col :span="16">
      <a-table
        row-key="childTribeCode"
        size="small"
        :data="leftTableData"
        :bordered="true"
        :scroll="{ y: 500 }"
        :scrollbar="true">
        <template #columns>
          <a-table-column title="族类型编码" data-index="childTribeCode" ellipsis tooltip />
          <a-table-column title="构件名称" data-index="childComponentName" ellipsis tooltip />
        </template>
      </a-table>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { difference, remove } from 'lodash'
  import { getRelationComponentListForUEApi } from '@/api/typeManage'

  const props = defineProps({
    mainTribeCode: String,
  })
  const selectedListLeft = ref([])
  const leftTableData = ref([])
  async function getLeftTableList() {
    try {
      const res = await getRelationComponentListForUEApi({ tribeCode: props.mainTribeCode })
      leftTableData.value = res.data
    } catch (error) {
      //
    }
  }
  function handleTableSelect(rowKeys, rowKey, record) {
    if (rowKeys.length > selectedListLeft.value.length) {
      selectedListLeft.value.push({
        mainTribeCode: props.mainTribeCode,
        childTribeCode: record.childTribeCode,
      })
    } else {
      const selectedCodeList = selectedListLeft.value.map((item) => item.childTribeCode)
      const dif = difference(selectedCodeList, rowKeys)
      remove(selectedListLeft.value, (item) => item.childTribeCode === dif[0])
    }
  }
  function init() {
    getLeftTableList()
  }
  init()
</script>
