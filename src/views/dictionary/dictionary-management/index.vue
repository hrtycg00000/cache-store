<template>
  <a-layout class="container page-padding">
    <Tree
      :list-data="commonData.dictionaryList"
      :loading="loading"
      @tree-node-click="treeNodeClick" />
    <a-layout-content class="content-container">
      <ListPage ref="listPageRef" />
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import useLoading from '@/hooks/loading'
  import { getDictionaryListApi } from '@/api/dictionary'
  import Tree from './components/tree.vue'
  import ListPage from './components/listPage.vue'

  const { loading, setLoading } = useLoading(true)
  const listPageRef = ref(null)
  const commonData = reactive({
    dictionaryList: [],
  })
  async function getDictionaryList() {
    try {
      setLoading(true)
      const res = await getDictionaryListApi()
      commonData.dictionaryList = res.data
    } catch (err) {
      // err
    } finally {
      setLoading(false)
    }
  }
  async function init() {
    await getDictionaryList()
    listPageRef.value.setListTitle(commonData.dictionaryList[0].name)
    listPageRef.value.setSearchData({ dictTypeId: commonData.dictionaryList[0].id })
    listPageRef.value.getTableColumnList()
    listPageRef.value.getDicValList()
  }
  function treeNodeClick(data) {
    listPageRef.value.setListTitle(data.name)
    listPageRef.value.setSearchData({ dictTypeId: data.id })
    listPageRef.value.getTableColumnList()
    listPageRef.value.getDicValList()
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
