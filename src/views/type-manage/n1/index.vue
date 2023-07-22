<template>
  <div class="container page-margin">
    <a-card class="list-container" title="N1小区" :bordered="false">
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-button type="primary" @click="handleOpenModal">
            <template #icon><icon-plus /></template>新增
          </a-button>
        </a-col>
        <a-col :span="12" style="display: flex; align-items: center; justify-content: end">
          <a-button>
            <template #icon><icon-download /></template>下载
          </a-button>
        </a-col>
      </a-row>
      <TableSimple
        :loading="loading"
        :column-data="columnData"
        :list-data="listData"
        :pagination="pagination"
        :page-change-fn="handlePageChange"
        @refresh="getListData" />
    </a-card>
    <modal
      v-model:visible="behaviorData.isShowModifyDataModal"
      :title="behaviorData.modalTitle"
      width="600px">
      <template #main>
        <ModifyDataSimpleModal
          v-if="behaviorData.isShowModifyDataModal"
          ref="modalRef"
          :module="1"
          :form-item-list="columnData"
          @refresh="getListData"
          @cancel="behaviorData.isShowModifyDataModal = false" />
      </template>
    </modal>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue'
  import useLoading from '@/hooks/loading'
  import useGetListSimple from '../hooks/getListSimple'
  import TableSimple from '../components/table/tableSimple.vue'
  import ModifyDataSimpleModal from '../components/modal/modifyDataSimpleModal.vue'

  const behaviorData = reactive({
    isShowModifyDataModal: false,
    modalTitle: '',
  })
  const { loading, setLoading } = useLoading()
  const { pagination, columnData, listData, getColumnData, getListData, handlePageChange } =
    useGetListSimple({ module: 1 }, setLoading)
  function handleOpenModal(itemData) {
    behaviorData.modalTitle = itemData ? '新增' : '新增'
    behaviorData.isShowModifyDataModal = true
  }
  async function init() {
    await getColumnData()
    getListData()
  }
  init()
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
