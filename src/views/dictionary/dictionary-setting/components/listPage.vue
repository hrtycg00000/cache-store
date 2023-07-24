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
      row-key="dictTypeId"
      size="medium"
      :loading="loading"
      :data="commonData.listData"
      :pagination="false"
      :bordered="true"
      :scroll="{ y: '85%' }"
      :scrollbar="true">
      <template #columns>
        <a-table-column title="列名" data-index="name" :width="140" />
        <a-table-column title="列名代码" data-index="fieldCode" :width="140" />
        <a-table-column title="值类型" data-index="valueType" :width="90">
          <template #cell="{ record }">
            {{ valueTypeMap[record.valueType] }}
          </template>
        </a-table-column>
        <a-table-column title="是否必填" data-index="isRequire" :width="90">
          <template #cell="{ record }">
            {{ record.isRequire ? '是' : '否' }}
          </template>
        </a-table-column>
        <a-table-column title="值" data-index="value" tooltip ellipsis>
          <template #cell="{ record }">
            <template v-if="[1, 2].includes(record.valueType)">
              <template v-for="(item, index) in JSON.parse(record.value).enumList" :key="index">
                {{ item.name }};
              </template>
            </template>
          </template>
        </a-table-column>
        <a-table-column title="操作" align="center" :width="130">
          <template #cell="{ record }">
            <a-space>
              <a-popconfirm
                content="确认删除该属性么？"
                type="warning"
                @before-ok="handleDelete(record.id, $event)">
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
    width="670px">
    <template #main>
      <ModifyDicHeaderModal
        v-if="behaviorData.isShowModifyDicHeaderModal"
        ref="modalRef"
        @refresh="getDicHeaderList"
        @cancel="behaviorData.isShowModifyDicHeaderModal = false" />
    </template>
  </modal>
</template>

<script lang="ts" setup>
  import { reactive, ref, nextTick } from 'vue'
  import useLoading from '@/hooks/loading'
  import { getDicHeaderListApi, deleteDicHeaderApi } from '@/api/dictionary'
  import ModifyDicHeaderModal from './modal/modifyDicHeaderModal.vue'

  const valueTypeMap = {
    1: '枚举单选',
    2: '枚举多选',
    3: '文本输入',
    4: '范围输入',
    5: '流水码',
    6: '数值输入',
  }
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
    listData: [],
    // pagination: {
    //   total: 0,
    //   current: 1,
    //   pageSize: 20,
    //   showTotal: true,
    //   showPageSize: true,
    // },
  })
  function setListTitle(title) {
    behaviorData.title = title
  }
  function setSearchData(data) {
    Object.assign(commonData.searchData, data)
  }
  async function getDicHeaderList() {
    try {
      setLoading(true)
      const { data } = await getDicHeaderListApi(commonData.searchData)
      commonData.listData = data
      // commonData.pagination.total = data.total
    } catch (err) {
      // err
    } finally {
      setLoading(false)
    }
  }
  // function handlePageChange(key, current) {
  //   commonData.pagination[key] = current
  //   getDicHeaderList()
  // }

  async function handleDelete(id, done) {
    try {
      await deleteDicHeaderApi({ id })
      getDicHeaderList()
      done()
    } catch (err) {
      done(false)
    }
  }

  function handleOpenModal(itemData) {
    behaviorData.modalTitle = itemData ? '编辑属性' : '新增属性'
    behaviorData.isShowModifyDicHeaderModal = true
    nextTick(() => {
      modalRef.value.setFormData({
        dictTypeId: commonData.searchData.dictTypeId,
        ...itemData,
        value: itemData
          ? JSON.parse(itemData.value)
          : {
              enumSource: 1,
              dicTypeId: null,
              module: null,
              showKey: null,
              enumList: [{ name: '', code: '', state: 1 }],
            },
      })
    })
  }

  defineExpose({
    getDicHeaderList,
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
