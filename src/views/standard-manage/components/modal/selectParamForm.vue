<template>
  <a-row class="search-container" :gutter="15" :wrap="false">
    <a-col :span="6">
      <a-select
        v-model="searchData.dictTypeId"
        placeholder="选择字典类型"
        @change="handlaSelectChange">
        <a-option v-for="item in selectList" :key="item.id" :value="item.id" :label="item.name" />
      </a-select>
    </a-col>
    <a-col flex="auto">
      <a-input-group style="display: flex">
        <a-select
          v-model="searchData.fieldName"
          style="width: 215px"
          placeholder="选择筛选字段"
          @change="handleFieldNameChenge">
          <template v-for="item in tableColumnList" :key="item.id">
            <a-option
              v-if="['参数项编码', '参数项名称'].includes(item.name)"
              :value="item.fieldCode"
              :label="item.name" />
          </template>
        </a-select>
        <a-select
          v-if="[1, 2].includes(filterType)"
          v-model="searchData.fieldValue"
          placeholder="选择筛选字段">
          <a-option
            v-for="item in formatEnumVal"
            :key="item.code"
            :value="item.code"
            :label="item.name" />
        </a-select>
        <a-input v-else v-model="searchData.fieldValue" placeholder="输入字段值" allow-clear />
      </a-input-group>
    </a-col>
    <a-col flex="initial">
      <a-button type="primary" @click="handleSearch">查询</a-button>
    </a-col>
  </a-row>
  <a-table
    class="table-container"
    row-key="dbId"
    size="small"
    :loading="loading"
    :data="tableList"
    :row-selection="{ type: 'radio', title: '选择' }"
    :pagination="behaviorData.pagination"
    :bordered="true"
    :scroll="{ y: 500 }"
    :scrollbar="true"
    @select="handleTableSelect">
    <template #columns>
      <template v-for="item in tableColumnList" :key="item.id">
        <a-table-column
          v-if="['参数项编码', '参数项名称'].includes(item.name)"
          :title="item.name"
          :data-index="item.fieldCode" />
      </template>
    </template>
  </a-table>
  <a-space fill style="justify-content: end">
    <a-button @click="$emit('cancel')">取消</a-button>
    <a-button type="primary" @click="onNextClick"> 下一步 </a-button>
  </a-space>
</template>

<script lang="ts" setup>
  import { reactive, computed } from 'vue'
  import { Message } from '@arco-design/web-vue'
  import { cloneDeep } from 'lodash'
  import useLoading from '@/hooks/loading'
  import useGetTableSelectList from './hooks/getSelectList'

  const emits = defineEmits(['changeStep', 'cancel'])
  const { loading, setLoading } = useLoading()
  const behaviorData = reactive({
    pagination: {
      total: 0,
      current: 1,
      pageSize: 20,
      showTotal: true,
    },
  })
  const searchData = reactive({
    dictTypeId: null,
    fieldName: '',
    fieldValue: '',
  })
  const formData = reactive({
    code: '',
    name: '',
    fieldCode: '',
  })
  const {
    selectList,
    tableColumnList,
    tableList,
    getSelectList,
    getTableColumnList,
    getTableList,
  } = useGetTableSelectList(searchData, behaviorData.pagination)
  const filterType = computed(() => {
    return tableColumnList.value.find((item) => item.fieldCode === searchData.fieldName)?.valueType
  })
  const formatEnumVal = computed(() => {
    const arr = cloneDeep(tableColumnList.value)
    arr.forEach((itemO) => {
      if ([1, 2].includes(itemO.valueType)) {
        itemO.value = JSON.parse(itemO.value)
      }
    })
    return arr
      .filter((item) => [1, 2].includes(item.valueType))
      .find((item) => item.fieldCode === searchData.fieldName)?.value
  })
  function handlaSelectChange() {
    getTableColumnList()
    searchData.fieldName = ''
    searchData.fieldValue = ''
  }
  function handleFieldNameChenge() {
    searchData.fieldValue = ''
  }
  function handleSearch() {
    getTableList(setLoading)
  }
  function handleTableSelect(rowKeys, rowKey, record) {
    Object.assign(formData, {
      code: record.paramCode,
      name: record.paramName,
      fieldCode: record.paramKey,
    })
  }
  function onNextClick() {
    if (!formData.code) {
      Message.warning('请选择参数项')
      return
    }
    emits('changeStep', 'forward', { ...formData })
  }
  async function init() {
    await getSelectList()
    searchData.dictTypeId = selectList.value[0].id
    getTableColumnList()
    getTableList(setLoading)
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
