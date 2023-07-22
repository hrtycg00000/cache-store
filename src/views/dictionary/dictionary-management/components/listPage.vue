<template>
  <a-card class="list-container" :title="behaviorData.title" :bordered="false">
    <a-row style="margin-bottom: 16px">
      <a-col :span="12">
        <a-button type="primary" @click="handleOpenModal(null)">
          <template #icon><icon-plus /></template>新增属性
        </a-button>
      </a-col>
      <a-col :span="12" style="display: flex; align-items: center; justify-content: end">
        <a-button>
          <template #icon><icon-download /></template>下载
        </a-button>
      </a-col>
    </a-row>
    <a-table
      class="table-container"
      row-key="dbId"
      size="medium"
      column-resizable
      :loading="loading"
      :data="commonData.listData"
      :pagination="commonData.pagination"
      :bordered="true"
      :scroll="{ y: '85%' }"
      :scrollbar="true"
      @page-change="handlePageChange('current', $event)"
      @page-size-change="handlePageChange('pageSize', $event)">
      <template #columns>
        <Column :column-list="commonData.listHeaderData" />
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
  </a-card>
  <modal
    v-model:visible="behaviorData.isShowModifyDicHeaderModal"
    :title="behaviorData.modalTitle"
    width="600px">
    <template #main>
      <ModifyDicHeaderModal
        v-if="behaviorData.isShowModifyDicHeaderModal"
        ref="modalRef"
        :form-item-list="commonData.listHeaderData"
        @refresh="getDicValList"
        @cancel="behaviorData.isShowModifyDicHeaderModal = false" />
    </template>
  </modal>
</template>

<script lang="ts" setup>
  import { reactive, ref, nextTick } from 'vue'
  import useLoading from '@/hooks/loading'
  import { getDicHeaderListApi, getDicValListApi, deleteDicValueApi } from '@/api/dictionary'
  import ModifyDicHeaderModal from './modal/modifyDicHeaderModal.vue'
  import Column from './column/index.vue'

  const { loading, setLoading } = useLoading(true)
  const modalRef = ref(null)
  const behaviorData = reactive({
    title: '',
    modalTitle: '',
    isShowModifyDicHeaderModal: false,
  })
  const commonData = reactive({
    searchData: {
      dictTypeId: null,
    },
    listHeaderData: [],
    listData: [],
    pagination: {
      total: 0,
      current: 1,
      pageSize: 20,
      showTotal: true,
      showPageSize: true,
    },
  })
  function setListTitle(title) {
    behaviorData.title = title
  }
  function setSearchData(data) {
    Object.assign(commonData.searchData, data)
  }
  async function getTableColumnList() {
    try {
      setLoading(true)
      commonData.listHeaderData = []
      const { data } = await getDicHeaderListApi({ dictTypeId: commonData.searchData.dictTypeId })
      commonData.listHeaderData = data
    } catch (err) {
      setLoading(false)
      // err
    }
  }
  async function getDicValList() {
    try {
      setLoading(true)
      commonData.listData = []
      const res: any = await getDicValListApi({
        ...commonData.searchData,
        pageNumber: commonData.pagination.current,
        pageSize: commonData.pagination.pageSize,
      })
      commonData.listData = res.data
      commonData.pagination.total = res.total
    } catch (err) {
      // err
    } finally {
      setLoading(false)
    }
  }

  function handlePageChange(key, current) {
    commonData.pagination[key] = current
    getDicValList()
  }

  async function handleDelete(id, done) {
    try {
      await deleteDicValueApi({ id })
      getDicValList()
      done()
    } catch (err) {
      done(false)
    }
  }

  function handleOpenModal(itemData) {
    behaviorData.modalTitle = itemData ? '编辑属性' : '新增属性'
    behaviorData.isShowModifyDicHeaderModal = true
    nextTick(() => {
      modalRef.value.setRequestBody({
        dictTypeId: commonData.searchData.dictTypeId,
        ...itemData,
      })
    })
  }

  defineExpose({
    getTableColumnList,
    getDicValList,
    setSearchData,
    setListTitle,
  })
</script>

<style scoped lang="less">
  .list-container {
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    :deep(.arco-card-body) {
      flex: 1 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .table-container {
        flex: 1;
      }
    }
  }
  .action-icon {
    margin-left: 12px;
    cursor: pointer;
  }
  .active {
    color: #0960bd;
    background-color: #e3f4fc;
  }
  .setting {
    display: flex;
    align-items: center;
    width: 200px;
    .title {
      margin-left: 12px;
      cursor: pointer;
    }
  }
</style>
