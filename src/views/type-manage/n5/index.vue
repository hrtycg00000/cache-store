<template>
  <a-layout class="container page-padding">
    <Tree
      ref="treeRef"
      :category-module="5"
      :loading="loading"
      :list-data="treeList"
      :has-child="true"
      :can-edit="false"
      @tree-node-click="treeNodeClick"
      @refresh="getDictionaryList"
      @edit-node="handleEditNode" />
    <a-layout-content class="content-container">
      <ListPage ref="listPageRef" :category-module="5" />
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import useLoading from '@/hooks/loading'
  import useTreeListController from '@/views/standard-manage/hooks/treeListController'
  import Tree from '@/components/tree-sider/tree.vue'
  import ListPage from './components/listPage.vue'

  const { loading, setLoading } = useLoading(true)
  const { treeList, getTreeList } = useTreeListController(5)
  const treeRef = ref(null)
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
      listPageRef.value.setListTitle(treeList.value[0]?.subCategoryList[0].categoryName)
      listPageRef.value.setSearchData({ categoryId: treeList.value[0]?.subCategoryList[0].id })
      listPageRef.value.setSecNodeData({
        id: treeList.value[0]?.subCategoryList[0].id,
        pid: treeList.value[0]?.subCategoryList[0].pid,
      })
      listPageRef.value.getTableList()
      treeRef.value.treeRef.selectNode(treeList.value[0]?.subCategoryList[0].id)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }
  function treeNodeClick(data) {
    listPageRef.value.setListTitle(data.categoryName)
    listPageRef.value.setSearchData({
      fieldValue: '',
      fieldName: '',
      categoryId: data.id,
    })
    listPageRef.value.setSecNodeData({
      id: data.id,
      pid: data.pid,
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
