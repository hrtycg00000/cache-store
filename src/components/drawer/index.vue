<template>
  <a-drawer
    :visible="visible"
    :closable="false"
    :header="false"
    :footer="false"
    v-bind="$attrs"
    @update:visible="(visible) => $emit('update:visible', visible)">
    <div class="main">
      <slot name="main"></slot>
    </div>
  </a-drawer>
</template>

<script lang="ts" setup>
  defineOptions({
    inheritAttrs: false,
  })
  defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
  })
  defineEmits(['update:visible'])
</script>

<style scoped lang="less">
  .main {
  }
</style>
