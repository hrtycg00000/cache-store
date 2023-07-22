<template>
  <a-row style="margin-bottom: 16px">
    <a-col :span="12">
      <a-button type="primary" @click="handleOpenModal">
        <template #icon><icon-plus /></template>新增N5
      </a-button>
    </a-col>
    <a-col :span="12" style="display: flex; align-items: center; justify-content: end">
      <a-button>
        <template #icon><icon-download /></template>删除
      </a-button>
    </a-col>
  </a-row>
  <a-table
    class="table-container"
    row-key="dictTypeId"
    size="medium"
    :data="tableData"
    :pagination="false"
    :bordered="true"
    :scroll="{ y: '85%' }"
    :scrollbar="true">
    <template #columns>
      <a-table-column title="族类型编码" data-index="state" :width="70">
        <template #cell="{ record }">
          {{ record.state ? '启用' : '停用' }}
        </template>
      </a-table-column>
      <a-table-column title="构件名称" data-index="state" :width="150">
        <template #cell="{ record }">
          <a-button type="text" @click="handleOpenModal">
            {{ record.name }}
          </a-button>
        </template>
      </a-table-column>
      <a-table-column title="构件一级分类名称" data-index="tribeCode" :width="150" />
      <a-table-column title="构件二级分类名称" data-index="tribeCode" :width="150" />
      <a-table-column title="UE是否可以单独选到" align="center" :width="130">
        <template #cell="{ record }">
          <a-space>
            <a-popconfirm
              content="确认删除该属性么？"
              type="warning"
              @before-ok="deleteItem({ id: record.id })">
              <a-button size="mini" type="text">删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </a-table-column>
    </template>
  </a-table>
  <modal v-model:visible="behaviorData.isShowAddModal" title="添加N5构件" width="600px">
    <template #main>
      <AddRelationComponent
        v-if="behaviorData.isShowAddModal"
        ref="modalRef"
        :main-tribe-code="mainTribeCode"
        @refresh="getTableData"
        @cancel="behaviorData.isShowAddModal = false" />
    </template>
  </modal>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import useRelationApi from '@/views/type-manage/n5/hooks/relationApi'
  import AddRelationComponent from './addRelationComponent.vue'

  const props = defineProps({
    mainTribeCode: String,
  })
  const { tableData, getTableData, addItem, updateitem, deleteItem } = useRelationApi()
  const behaviorData = reactive({
    isShowAddModal: false,
  })

  function handleOpenModal() {
    behaviorData.isShowAddModal = true
  }
</script>
