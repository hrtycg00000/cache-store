<template>
  <a-space class="container" fill align="start">
    <a-form-item
      :field="`${valueKey}.isTextarea`"
      label="单行/多行输入"
      label-col-flex="90px"
      asterisk-position="end">
      <a-switch
        v-model="option.isTextarea"
        checked-text="多行"
        unchecked-text="单行"
        unchecked-color="#14C9C9"
        :checked-value="1"
        :unchecked-value="0"
        :disabled="disabled" />
    </a-form-item>
    <a-form-item
      :field="`${valueKey}.placeholder`"
      label="输入框提示"
      label-col-flex="80px"
      asterisk-position="end">
      <a-textarea v-model="option.placeholder"></a-textarea>
    </a-form-item>
  </a-space>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  const props = defineProps({
    modelValue: {
      type: Object,
      default: () => ({}),
    },
    valueKey: {
      type: String,
      default: 'value',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  })
  const option = computed(() => props.modelValue)
</script>

<style scoped lang="less">
  .container {
    :deep(.arco-space-item) {
      &:first-child {
        flex-grow: 0.1;
        flex-shrink: 0;
      }
      &:last-child {
        flex: 1;
      }
    }
  }
</style>
