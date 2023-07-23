<template>
  <a-row style="margin-bottom: 16px">
    <a-col :span="12">
      <a-button type="primary" size="small" @click="handleOpenModal">
        <template #icon><icon-plus /></template>新增N5
      </a-button>
    </a-col>
    <!-- <a-col :span="12" style="display: flex; align-items: center; justify-content: flex-end">
      <a-button>
        <template #icon><icon-download /></template>删除
      </a-button>
    </a-col> -->
  </a-row>
  <a-table
    class="table-container"
    row-key="dictTypeId"
    size="small"
    :data="tableData"
    :pagination="false"
    :bordered="true">
    <template #columns>
      <a-table-column title="族类型编码" data-index="childTribeCode" :width="110" />
      <a-table-column title="构件名称" data-index="childComponentName" />
      <a-table-column title="构件一级分类名称" data-index="mainTribeName" :width="150" />
      <a-table-column title="构件二级分类名称" data-index="secTribeName" :width="150" />
      <a-table-column title="UE可否单独选到" align="center" :width="150">
        <template #cell="{ record }">
          <a-select v-model="record.ueSelect" :loading="loading" @change="handleChange(record)">
            <a-option :value="1" label="是" />
            <a-option :value="0" label="否" />
          </a-select>
        </template>
      </a-table-column>
      <a-table-column title="操作" align="center">
        <template #cell="{ record }">
          <a-space>
            <a-popconfirm
              content="确认删除该构件么？"
              type="warning"
              @before-ok="handleDelete(record, $event)">
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
  import { reactive } from 'vue'
  import { Message } from '@arco-design/web-vue'
  import useLoading from '@/hooks/loading'
  import useRelationApi from '@/views/type-manage/n5/hooks/relationApi'
  import AddRelationComponent from '../modal/addRelationComponent.vue'

  defineProps({
    mainTribeCode: String,
  })
  const { loading, setLoading } = useLoading()
  const { tableData, getTableData, updateItem, deleteItem } = useRelationApi()
  const behaviorData = reactive({
    isShowAddModal: false,
  })
  function handleOpenModal() {
    behaviorData.isShowAddModal = true
  }
  async function handleChange(item) {
    try {
      setLoading(true)
      await updateItem(item)
      Message.success('修改成功')
    } catch (error) {
      getTableData()
    } finally {
      setLoading(false)
    }
  }
  async function handleDelete(id, done) {
    try {
      await deleteItem({ id })
      getTableData()
      done()
    } catch (err) {
      done(false)
    }
  }

  getTableData()
</script>
