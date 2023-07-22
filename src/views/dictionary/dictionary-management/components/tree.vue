<template>
  <a-layout-sider :class="['sider-container', behaviorData.isCloseSide && 'collapsed']">
    <a-spin :loading="loading">
      <div class="tree-container">
        <a-scrollbar outer-class="scroll-container" style="height: 100%; overflow: auto">
          <a-tree
            v-if="listData.length"
            :data="listData"
            :field-names="{ key: 'id', title: 'name' }"
            :default-selected-keys="[listData[0].id]"
            @select="handleNodeClick">
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
    </a-spin>
  </a-layout-sider>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue'

  const emits = defineEmits(['treeNodeClick'])
  defineProps({
    listData: {
      type: Array<any>,
      default: () => [{ id: 0 }],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  })

  const behaviorData = reactive({
    isCloseSide: false,
  })
  function handleNodeClick(res, data) {
    emits('treeNodeClick', data.node)
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
      .tree-container {
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
  }
</style>
