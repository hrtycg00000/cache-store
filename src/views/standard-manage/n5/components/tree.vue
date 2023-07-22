<template>
  <a-layout-sider :class="['sider-container', behaviorData.isCloseSide && 'collapsed']">
    <a-spin :loading="loading">
      <div class="tree-container">
        <a-scrollbar outer-class="scroll-container" style="height: 100%; overflow: auto">
          <a-tree
            v-if="listData.length"
            :data="listData"
            :field-names="{ key: 'id', title: 'categoryName' }"
            :default-selected-keys="[listData[0].id]"
            @select="handleNodeClick">
            <template #extra="nodeData">
              <a-button
                v-if="hasChild"
                size="mini"
                type="text"
                style="position: absolute; right: 48px; top: 5px"
                @click="handleAdd(nodeData)">
                <icon-plus />
              </a-button>
              <a-button
                size="mini"
                type="text"
                style="position: absolute; right: 25px; top: 5px"
                @click="handleModify(nodeData)">
                <icon-edit />
              </a-button>
              <a-popconfirm
                content="确认删除该字典么？"
                type="warning"
                @before-ok="handleDelete(nodeData, $event)">
                <a-button size="mini" type="text" style="position: absolute; right: 2px; top: 5px">
                  <icon-delete />
                </a-button>
              </a-popconfirm>
            </template>
          </a-tree>
        </a-scrollbar>
      </div>
      <a-button
        :class="['close-btn', behaviorData.isCloseSide && 'collapsed']"
        shape="circle"
        @click="behaviorData.isCloseSide = !behaviorData.isCloseSide">
        <icon-left v-if="!behaviorData.isCloseSide" />
        <icon-right v-else />
      </a-button>
      <div class="btn-container">
        <a-button type="outline" long @click="handleAdd(null)">
          <template #icon><icon-plus /></template>新增一级分类
        </a-button>
      </div>
    </a-spin>
  </a-layout-sider>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue'
  import useTreeListController from '@/views/standard-manage/hooks/treeListController'

  const emits = defineEmits(['treeNodeClick', 'refresh', 'editNode'])
  const props = defineProps({
    categoryModule: {
      type: Number,
      default: 0,
    },
    listData: {
      type: Array<any>,
      default: () => [{ id: 0 }],
    },
    hasChild: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  })

  const { deleteTreeNode } = useTreeListController(props.categoryModule)
  const behaviorData = reactive({
    isCloseSide: false,
  })
  function handleNodeClick(res, data) {
    emits('treeNodeClick', data.node)
  }
  function handleModify(nodeData) {
    emits('editNode', {
      id: nodeData.id,
      categoryName: nodeData.categoryName,
      categoryCode: nodeData.categoryCode,
      pid: nodeData.pid,
    })
  }
  async function handleDelete(nodeData, done) {
    try {
      await deleteTreeNode({ id: nodeData.id })
      emits('refresh')
      done()
    } catch (err) {
      done(false)
    }
  }
  function handleAdd(nodeData) {
    if (nodeData) {
      emits('editNode', { categoryName: '', categoryCode: '', pid: nodeData.id, id: null })
    } else {
      emits('editNode', { categoryName: '', categoryCode: '', pid: 0, id: null })
    }
  }
</script>

<style scoped lang="less">
  .sider-container {
    margin-right: 10px;
    border-radius: 5px;
    padding-top: 40px;
    padding-bottom: 20px;
    ::v-deep(.arco-layout-sider-children) {
      .arco-spin {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }
    &.collapsed {
      margin: 0;
      width: 0px !important;
      .tree-container,
      .btn-container {
        display: none;
      }
    }
    .close-btn {
      position: absolute;
      z-index: 10;
      right: 10px;
      top: 10px;
      &.collapsed {
        right: -32px;
        border-radius: 0 18px 18px 0;
        box-shadow: -1px 0 5px #0000001a;
      }
    }
    .tree-container {
      flex: 1;
      overflow: auto;
      margin-bottom: 15px;
    }
    .btn-container {
      flex-shrink: 0;
      width: 200px;
      padding: 0 20px;
    }
  }
</style>
