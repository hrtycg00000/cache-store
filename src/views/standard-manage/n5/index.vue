<template>
  <a-layout class="container page-padding">
    <Tree
      :category-module="5"
      :loading="loading"
      :list-data="treeList"
      :has-child="false"
      @tree-node-click="treeNodeClick"
      @refresh="getDictionaryList"
      @edit-node="handleEditNode" />
    <a-layout-content class="content-container">
      <ListPage ref="listPageRef" :category-module="5" />
    </a-layout-content>
    <modal
      v-model:visible="behaviorData.isShowAddDictionaryModal"
      :title="commonData.editDictionaryData.id ? '编辑分类' : '新增分类'">
      <template #main>
        <EditTreeNodeModal
          v-if="behaviorData.isShowAddDictionaryModal"
          :item-data="commonData.editDictionaryData"
          :category-module="5"
          @refresh="getDictionaryList"
          @cancel="behaviorData.isShowAddDictionaryModal = false" />
      </template>
    </modal>
  </a-layout>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import useLoading from '@/hooks/loading'
  import useTreeListController from '@/views/standard-manage/hooks/treeListController'
  import EditTreeNodeModal from './components/modal/editTreeNodeModal.vue'
  import Tree from './components/tree.vue'
  import ListPage from './components/listPage.vue'

  const { loading, setLoading } = useLoading(true)
  const { treeList, getTreeList } = useTreeListController(5)
  const listPageRef = ref(null)
  const behaviorData = reactive({
    isCloseSide: false,
    isShowAddDictionaryModal: false,
  })
  const commonData = reactive({
    editDictionaryData: {
      id: null,
    },
  })
  function handleEditNode(data) {
    Object.assign(commonData.editDictionaryData, data)
    behaviorData.isShowAddDictionaryModal = true
  }
  async function getDictionaryList() {
    try {
      setLoading(true)
      await getTreeList()
    } catch (err) {
      // err
    } finally {
      setLoading(false)
    }
  }
  async function init() {
    try {
      setLoading(true)
      await getTreeList()
      listPageRef.value.setListTitle(treeList.value[0].categoryName)
      listPageRef.value.setSearchData({ pid: treeList.value[0].id })
      listPageRef.value.setFirstNodeData({
        categoryCode: treeList.value[0].categoryCode,
        categoryName: treeList.value[0].categoryName,
        pid: treeList.value[0].id,
      })
      listPageRef.value.getTableList()
    } catch (error) {
      // err
    } finally {
      setLoading(false)
    }
  }
  function treeNodeClick(data) {
    listPageRef.value.setListTitle(data.categoryName)
    listPageRef.value.setSearchData({
      categoryCode: '',
      categoryName: '',
      pid: data.id,
    })
    listPageRef.value.setFirstNodeData({
      categoryCode: data.categoryCode,
      categoryName: data.categoryName,
      pid: data.id,
    })
    listPageRef.value.getTableList()
  }
  init()
</script>

<style scoped lang="less">
  .container {
    height: 100%;
    .content-container {
      border-radius: 5px;
      box-shadow: 0 2px 5px 0 rgb(0 0 0 / 8%);
      background: var(--color-menu-light-bg);
      overflow: hidden;
    }
  }
</style>
