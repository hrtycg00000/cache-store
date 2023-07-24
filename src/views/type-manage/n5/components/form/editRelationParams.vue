<template>
  <a-table
    ref="tableTop"
    row-key="id"
    size="small"
    :data="tableData"
    :pagination="false"
    :bordered="true">
    <template #columns>
      <a-table-column
        title="商品三级分类名称"
        data-index="threeCommodityName"
        ellipsis
        tooltip
        :width="150" />
      <a-table-column
        title="商品三级分类编码"
        data-index="threeCommodityCode"
        ellipsis
        tooltip
        :width="150" />
      <a-table-column title="参数项名称" data-index="paramName" ellipsis :width="150" />
      <a-table-column title="参数值" data-index="valueList">
        <template #cell="{ record }">
          <a-form v-if="record.value" :model="record" size="small">
            <ListFormComponents
              v-model="record.valueList"
              :form-item="{ ...record, paramType: 2 }"
              type-key-name="paramType"
              name-key-name="paramName"
              style="margin: 0"
              hide-label
              @change="handleChange" />
          </a-form>
        </template>
      </a-table-column>
    </template>
  </a-table>
  <a-table
    ref="tableBottom"
    row-key="id"
    size="small"
    style="margin-top: 12px"
    :data="goodsTableData"
    :default-expand-all-rows="true"
    :pagination="false"
    :bordered="true">
    <template #columns>
      <a-table-column
        title="商品三级分类名称"
        data-index="threeCommodityName"
        ellipsis
        tooltip
        :width="150">
        <template #cell="{ record }">
          {{ !record.commodityName ? record.threeCommodityName : '' }}
        </template>
      </a-table-column>
      <a-table-column
        title="商品三级分类编码"
        data-index="threeCommodityCode"
        ellipsis
        tooltip
        :width="150">
        <template #cell="{ record }">
          {{ !record.commodityName ? record.threeCommodityCode : '' }}
        </template>
      </a-table-column>
      <a-table-column title="商品名称" data-index="commodityName" ellipsis :width="150" />
      <a-table-column title="商品编码" data-index="commodityCode" />
      <a-table-column title="选型阶段" data-index="stageName" />
    </template>
  </a-table>
</template>

<script lang="ts" setup>
  import { ref, nextTick } from 'vue'
  import { debounce, cloneDeep } from 'lodash'
  import { isArray } from '@/utils/is'
  import { getRelationParamsApi, getRelationGoodsListApi } from '@/api/typeManage'
  import ListFormComponents from '@/components/form-components/list-form-components.vue'

  const props = defineProps({
    mainTribeCode: String,
  })
  const tableTop = ref(null)
  const tableBottom = ref(null)
  const tableData = ref([])
  const goodsTableData = ref([])
  async function getTableList() {
    try {
      const res = await getRelationParamsApi({ tribeCode: props.mainTribeCode })
      tableData.value = res.data.map((item) => ({
        ...item,
        children: item.paramList,
        fieldCode: 'valueList',
      }))
      nextTick(() => {
        tableTop.value.expandAll(true)
      })
    } catch (error) {
      //
    }
  }
  async function getGoodsTableList(body) {
    try {
      const reqBody = cloneDeep(body)
      reqBody.forEach((itemO) => {
        itemO.paramList.forEach((itemI) => {
          itemI.valueList = isArray(itemI.valueList)
            ? itemI.valueList.map((item) => JSON.stringify(item))
            : null
        })
      })
      const res = await getRelationGoodsListApi(reqBody)
      goodsTableData.value = res.data.map((item) => ({
        ...item,
        children: item.commodityManagementInfoList,
      }))
      nextTick(() => {
        tableBottom.value.expandAll(true)
      })
    } catch (error) {
      //
    }
  }
  const handleChange = debounce(() => {
    getGoodsTableList(tableData.value)
  }, 1000)
  async function init() {
    await getTableList()
    getGoodsTableList([...tableData.value])
  }
  init()
</script>

<style scoped lang="less"></style>
