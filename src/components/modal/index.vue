<template>
  <a-modal
    :visible="visible"
    :closable="false"
    :simple="true"
    :footer="false"
    :modal-style="{
      padding: 0,
      width: '460px',
    }"
    v-bind="{ ...$attrs, title: '' }"
    @update:visible="(visible) => $emit('update:visible', visible)">
    <div class="header">
      <p class="title">
        <slot name="title">
          {{ $attrs.title }}
        </slot>
      </p>
    </div>
    <div class="main">
      <slot name="main"></slot>
    </div>
  </a-modal>
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
  .header {
    padding: 24px 24px 17px;
    background: linear-gradient(180deg, rgba(97, 199, 201, 0.2) 0%, rgba(97, 199, 201, 0) 100%);
    .title {
      margin: 0;
      font-size: 18px;
      line-height: 25px;
      color: #2b2d3c;
    }
  }
  .main {
    padding: 0 24px 24px;
  }
</style>
