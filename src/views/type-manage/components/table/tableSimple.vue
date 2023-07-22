<template>
  <a-table
    class="table-container"
    row-key="dictTypeId"
    size="medium"
    :loading="loading"
    :data="listData"
    :pagination="pagination"
    :bordered="true"
    :scroll="{ y: '85%' }"
    :scrollbar="true"
    @page-change="pageChangeFn('current', $event)"
    @page-size-change="pageChangeFn('pageSize', $event)">
    <template #columns>
      <ColumnSimple :column-data="columnData" />
      <a-table-column title="操作" align="center" :width="130">
        <template #cell="{ record }">
          <a-space>
            <a-popconfirm
              content="确认删除该属性么？"
              type="warning"
              @before-ok="handleDelete(record.dbId, $event)">
              <a-button size="mini" type="text">删除</a-button>
            </a-popconfirm>
            <a-button size="mini" type="text" @click="handleOpenModal(record)">编辑</a-button>
          </a-space>
        </template>
      </a-table-column>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
  import { deleteBusinessDataApi } from '@/api/typeManage'
  import ColumnSimple from './columnSimple.vue'

  const emits = defineEmits(['refresh', 'openModal'])
  const props = defineProps({
    loading: Boolean,
    columnData: {
      type: Array<any>,
      default: () => [],
    },
    listData: {
      type: Array<any>,
      default: () => [],
    },
    pagination: {
      type: Object,
      default: () => ({}),
    },
    pageChangeFn: {
      type: Function,
    },
  })
  async function handleDelete(id, done) {
    try {
      await deleteBusinessDataApi({ id })
      emits('refresh')
      done()
    } catch (err) {
      done(false)
    }
  }
  function handleOpenModal(itemData) {
    emits('openModal', itemData)
  }
</script>
