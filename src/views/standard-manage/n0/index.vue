<template>
  <div class="container page-margin">
    <a-card class="list-container" title="N0城市" :bordered="false">
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-button type="primary" @click="handleOpenModal(null)">
            <template #icon><icon-plus /></template>新增
          </a-button>
        </a-col>
        <a-col :span="12" style="display: flex; align-items: center; justify-content: end">
          <a-button>
            <template #icon><icon-download /></template>下载
          </a-button>
        </a-col>
      </a-row>
      <TableBase
        :loading="loading"
        :list-data="listData"
        @refresh="getList"
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
          :module="0"
          @refresh="getList"
          @cancel="behaviorData.isShowAddParamsModal = false" />
      </template>
    </modal>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue'
  import useLoading from '@/hooks/loading'
  import { getBusinessParamListApi } from '@/api/standardManage'
  import useGetList from '../hooks/getList'
  import TableBase from '../components/table/tableBase.vue'
  import AddParamsModal from '../components/modal/addParamsModal.vue'

  const { loading, setLoading } = useLoading()
  const { listData, getListData } = useGetList(getBusinessParamListApi, { module: 0 })
  const behaviorData = reactive({
    isShowAddParamsModal: false,
    modalTitle: '',
  })
  function getList() {
    getListData(setLoading)
  }
  function handleOpenModal(itemData) {
    behaviorData.modalTitle = itemData ? '编辑' : '新增'
    console.log(itemData)
    behaviorData.isShowAddParamsModal = true
  }
  getList()
</script>

<style scoped lang="less">
  .container {
    border-radius: 5px;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 8%);
    background: var(--color-menu-light-bg);
    overflow: hidden;
    .list-container {
      height: 100%;
      padding: 10px 20px;
      // display: flex;
      // flex-direction: column;
    }
  }
</style>
