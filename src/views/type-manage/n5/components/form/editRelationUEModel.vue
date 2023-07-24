<template>
  <a-table
    row-key="threeCommodityCode"
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
        :width="100" />
      <a-table-column
        title="商品三级分类编码"
        data-index="threeCommodityCode"
        ellipsis
        tooltip
        :width="100" />
      <a-table-column
        title="族类型编码"
        data-index="tribeCode"
        :width="110"
        ellipsis
        :tooltip="true">
        <template #cell="{ record }">
          <a-button
            v-if="!record.tribeCode && record.threeCommodityCode"
            type="primary"
            size="mini"
            @click="openAddModal(record)">
            选择N5
          </a-button>
          <template v-else>
            {{ record.tribeCode }}
          </template>
        </template>
      </a-table-column>
      <a-table-column title="构件名称" data-index="tribeName" ellipsis tooltip :width="100" />
      <a-table-column
        title="N7参数项"
        data-index="paramValueString"
        ellipsis
        tooltip
        :width="120" />
      <a-table-column title="N7参数值" data-index="paramValue" ellipsis tooltip :width="150" />
      <a-table-column title="UE模型连接" data-index="ueModelUrl">
        <template #cell="{ record }">
          <a-input
            v-if="record.ueModelUrl || record.ueModelUrl === null"
            v-model="record.ueModelUrl"
            size="small"
            @change="handleChenge" />
        </template>
      </a-table-column>
    </template>
  </a-table>
  <modal v-model:visible="behaviorData.isShowAddModal" title="添加N5构件" width="600px">
    <template #main>
      <AddUEModel
        v-if="behaviorData.isShowAddModal"
        ref="modalRef"
        :main-tribe-code="mainTribeCode"
        @submit="handleAddSubmit"
        @cancel="behaviorData.isShowAddModal = false" />
    </template>
  </modal>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import { Message } from '@arco-design/web-vue'
  import {
    getRelationUEModelListApi,
    updateRelationUEModelApi,
    addComponentRelationUEModelApi,
  } from '@/api/typeManage'
  import AddUEModel from '../modal/addUEModel.vue'

  const props = defineProps({
    mainTribeCode: String,
  })
  const tableData = ref([])
  const behaviorData = reactive({
    isShowAddModal: false,
  })
  async function getTableList() {
    try {
      const res = await getRelationUEModelListApi({ tribeCode: props.mainTribeCode })
      tableData.value = res.data.map((itemO) => {
        itemO?.componentAttbuteDataRspList?.forEach((itemI) => {
          itemI.children = itemI.paramValueList
        })
        return {
          ...itemO,
          children: itemO.componentAttbuteDataRspList,
        }
      })
    } catch (error) {
      //
    }
  }
  function openAddModal(item) {
    behaviorData.isShowAddModal = true
  }
  async function handleChenge() {
    try {
      await updateRelationUEModelApi(tableData.value)
      Message.success('修改成功')
    } catch (error) {
      getTableList()
    }
  }
  async function handleAddSubmit(value, done) {
    try {
      done(true)
      await addComponentRelationUEModelApi(value.value)
      behaviorData.isShowAddModal = false
      getTableList()
    } catch (error) {
      //
    } finally {
      done(false)
    }
  }
  async function init() {
    await getTableList()
  }
  init()
</script>

<style scoped lang="less"></style>
