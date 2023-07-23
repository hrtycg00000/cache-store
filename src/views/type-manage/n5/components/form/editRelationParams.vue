<template>
  <a-table
    row-key="id"
    size="small"
    :data="tableData"
    :default-expand-all-rows="true"
    :pagination="false"
    :bordered="true">
    <template #columns>
      <a-table-column
        title="商品三级分类名称"
        data-index="thirdCategoryName"
        ellipsis
        :width="150" />
      <a-table-column
        title="商品三级分类编码"
        data-index="thirdCategoryCode"
        ellipsis
        :width="150" />
      <a-table-column title="参数项名称" data-index="paramName" ellipsis :width="150" />
      <a-table-column title="参数值" data-index="jsonValue">
        <template #cell="{ record }">
          <a-form :model="record" size="small">
            <ListFormComponents
              v-model="record.jsonValue"
              :form-item="record"
              style="margin: 0"
              hide-label
              @change="handleChange" />
          </a-form>
        </template>
      </a-table-column>
    </template>
  </a-table>
  <a-table
    row-key="dictTypeId"
    size="small"
    style="margin-top: 12px"
    :data="goodsTableData"
    :default-expand-all-rows="true"
    :pagination="false"
    :bordered="true">
    <template #columns>
      <a-table-column
        title="商品三级分类名称"
        data-index="thirdCategoryName"
        ellipsis
        :width="150" />
      <a-table-column
        title="商品三级分类编码"
        data-index="thirdCategoryCode"
        ellipsis
        :width="150" />
      <a-table-column title="商品名称" data-index="paramName" ellipsis :width="150" />
      <a-table-column title="商品编码" data-index="jsonValue" />
      <a-table-column title="选型阶段" data-index="ueStage" />
    </template>
  </a-table>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { debounce } from 'lodash'
  import { getRelationParamsApi, getRelationGoodsListApi } from '@/api/typeManage'
  import ListFormComponents from '@/components/form-components/list-form-components.vue'

  const tableData = ref([])
  const goodsTableData = ref([])
  async function getTableList() {
    try {
      const res = await getRelationParamsApi()
      tableData.value = res.data
    } catch (error) {
      //
    }
  }
  async function getGoodsTableList(body) {
    try {
      const res = await getRelationGoodsListApi(body)
      goodsTableData.value = res.data
    } catch (error) {
      //
    }
  }
  const handleChange = debounce((value) => {
    getGoodsTableList(tableData.value)
  }, 500)
  async function init() {
    await getTableList()
    getGoodsTableList(tableData)
  }
  init()
</script>

<style scoped lang="less"></style>
