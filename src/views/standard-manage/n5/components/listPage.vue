<template>
  <a-card class="list-container" :title="behaviorData.title" :bordered="false">
    <a-row style="margin-bottom: 16px" :gutter="16" :wrap="false">
      <a-col flex="300px">
        <a-space fill>
          二级分类编码
          <a-input v-model="searchData.categoryCode"></a-input>
        </a-space>
      </a-col>
      <a-col flex="300px">
        <a-space>
          二级分类名称
          <a-input v-model="searchData.categoryName"></a-input>
        </a-space>
      </a-col>
      <a-col flex="1">
        <a-space fill style="justify-content: end">
          <a-button type="primary" @click="getTableList"> 查询 </a-button>
          <a-button @click="handleOpenModal(null)"> 重置 </a-button>
        </a-space>
      </a-col>
    </a-row>
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
      :data="listData"
      :pagination="false"
      :bordered="true"
      :scroll="{ y: '85%' }"
      :scrollbar="true">
      <template #columns>
        <a-table-column title="状态" data-index="state" :width="70">
          <template #cell="{ record }">
            {{ record.state ? '启用' : '停用' }}
          </template>
        </a-table-column>
        <a-table-column title="一级构件分类名称" data-index="firstCategoryName" :width="150" />
        <a-table-column title="二级构件分类名称" data-index="state" :width="150">
          <template #cell="{ record }">
            <a-button type="text" @click="handleOpenModal(record)">
              {{ record.categoryName }}
            </a-button>
          </template>
        </a-table-column>
        <a-table-column title="一级构件分类编码" data-index="firstCategoryCode" :width="150" />
        <a-table-column title="二级构件分类编码" data-index="categoryCode" :width="150" />
        <a-table-column title="操作" align="center" :width="130">
          <template #cell="{ record }">
            <a-space>
              <a-popconfirm
                content="确认删除该属性么？"
                type="warning"
                @before-ok="handleDelete(record.id, $event)">
                <a-button size="mini" type="text">删除</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </a-card>
  <drawer
    :width="1140"
    :visible="behaviorData.isShow"
    @ok="behaviorData.isShow = false"
    @cancel="handleCancelModal">
    <template #main>
      <EditSecNodeModal
        v-if="behaviorData.isShow"
        ref="modalRef"
        :first-node-data="firstNodeData"
        :category-module="categoryModule" />
    </template>
  </drawer>
</template>

<script lang="ts" setup>
  import { reactive, ref, nextTick } from 'vue'
  import useLoading from '@/hooks/loading'
  import useGetList from '@/views/standard-manage/hooks/getList'
  import useTreeListController from '@/views/standard-manage/hooks/treeListController'
  import { getSecCategoryApi } from '@/api/categoryTree'
  import EditSecNodeModal from './modal/editSecNodeModal.vue'

  const props = defineProps({
    categoryModule: {
      type: Number,
      default: 0,
    },
  })
  const { loading, setLoading } = useLoading(true)
  const modalRef = ref(null)
  const behaviorData = reactive({
    title: '',
    isShow: false,
  })
  const searchData = reactive({
    categoryCode: '',
    categoryName: '',
    categoryModule: props.categoryModule,
    pid: null,
  })
  const firstNodeData = reactive({
    categoryCode: '',
    categoryName: '',
    categoryModule: props.categoryModule,
    pid: null,
  })
  const { listData, getListData } = useGetList(getSecCategoryApi, searchData)
  const { deleteTreeNode } = useTreeListController(props.categoryModule)
  function setListTitle(title) {
    behaviorData.title = title
  }
  function setSearchData(data) {
    Object.assign(searchData, data)
  }
  function setFirstNodeData(data) {
    Object.assign(firstNodeData, data)
  }
  function getTableList() {
    getListData(setLoading)
  }

  async function handleDelete(id, done) {
    try {
      await deleteTreeNode({ id })
      getTableList()
      done()
    } catch (err) {
      done(false)
    }
  }

  function handleOpenModal(itemData) {
    behaviorData.isShow = true
    nextTick(() => {
      modalRef.value.setBaseInfoForm({
        id: itemData ? itemData.id : null,
        state: itemData ? itemData.state : 1,
        categoryCode: itemData ? itemData.categoryCode : '',
        categoryName: itemData ? itemData.categoryName : '',
      })
    })
  }
  function handleCancelModal() {
    behaviorData.isShow = false
    getTableList()
  }

  defineExpose({
    setSearchData,
    setFirstNodeData,
    setListTitle,
    getTableList,
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
