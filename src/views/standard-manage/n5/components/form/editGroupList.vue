<template>
  <a-card
    class="list-container"
    title="族基础参数录入"
    :bordered="true"
    style="margin-top: 12px; border-radius: 5px">
    <template #extra>
      <a-button type="primary" size="mini" @click="handleOpenModal(1)">
        <template #icon><icon-plus /></template>新增
      </a-button>
    </template>
    <TableBase :list-data="baseListData" @refresh="getBaseListData" @open-modal="handleOpenModal" />
  </a-card>
  <a-card
    class="list-container"
    title="族几何参数录入"
    :bordered="true"
    style="margin-top: 12px; border-radius: 5px">
    <template #extra>
      <a-button type="primary" size="mini" @click="handleOpenModal(2)">
        <template #icon><icon-plus /></template>新增
      </a-button>
    </template>
    <TableBase
      :list-data="geometryListData"
      :has-param-group="true"
      @refresh="getGeometryListData"
      @open-modal="handleOpenModal" />
  </a-card>
  <a-card
    class="list-container"
    title="族材质参数录入"
    :bordered="true"
    style="margin-top: 12px; border-radius: 5px">
    <template #extra>
      <a-button type="primary" size="mini" @click="handleOpenModal(3)">
        <template #icon><icon-plus /></template>新增
      </a-button>
    </template>
    <TableBase
      :list-data="materialListData"
      @refresh="getMaterialListData"
      @open-modal="handleOpenModal" />
  </a-card>
  <modal
    v-model:visible="behaviorData.isShowAddParamsModal"
    :title="behaviorData.modalTitle"
    width="600px">
    <template #main>
      <AddParamsModal
        v-if="behaviorData.isShowAddParamsModal"
        ref="modalRef"
        :module="categoryModule"
        :merge-body="{
          categoryId: baseFormData.id,
          subModule: behaviorData.subModule,
        }"
        :value-type-options="valueTypeOptions"
        @refresh="getList"
        @cancel="behaviorData.isShowAddParamsModal = false" />
    </template>
  </modal>
</template>

<script lang="ts" setup>
  import { reactive, ref, nextTick } from 'vue'
  import { getBusinessParamListApi } from '@/api/standardManage'
  import { isNumber } from '@/utils/is'
  import useGetList from '@/views/standard-manage/hooks/getList'
  import TableBase from '@/views/standard-manage/components/table/tableBase.vue'
  import AddParamsModal from '@/views/standard-manage/components/modal/addParamsModal.vue'

  const valueTypeOptions = [
    { value: 1, label: '枚举单选' },
    { value: 3, label: '文本输入' },
    { value: 4, label: '范围输入' },
    { value: 6, label: '数值输入' },
    { value: 7, label: '管控' },
  ]
  const props = defineProps({
    categoryModule: {
      type: Number,
      default: 0,
    },
    baseFormData: {
      type: Object,
      default: () => ({}),
    },
  })
  const modalRef = ref(null)
  const behaviorData = reactive({
    isShowAddParamsModal: false,
    modalTitle: '',
    subModule: 1,
  })
  const {
    baseListData,
    geometryListData,
    materialListData,
    getBaseListData,
    getGeometryListData,
    getMaterialListData,
  } = useGetList(getBusinessParamListApi, {
    module: props.categoryModule,
    categoryId: props.baseFormData.id,
  })
  function getList() {
    getBaseListData()
    getGeometryListData()
    getMaterialListData()
  }
  function handleOpenModal(itemData) {
    if (isNumber(itemData)) {
      behaviorData.modalTitle = '新增'
      behaviorData.subModule = itemData
      behaviorData.isShowAddParamsModal = true
    } else {
      behaviorData.modalTitle = '编辑'
      behaviorData.subModule = itemData.subModule
      behaviorData.isShowAddParamsModal = true
      nextTick(() => {
        modalRef.value.setModifyForm(itemData)
      })
    }
  }
  getList()
</script>

<style scoped lang="less"></style>
