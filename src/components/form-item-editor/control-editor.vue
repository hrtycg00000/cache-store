<template>
  <a-form-item
    :field="`${valueKey}.value`"
    label="参数值"
    label-col-flex="70px"
    asterisk-position="end"
    :rules="rules">
    <a-input v-model="paramValue.value" :disabled="disabled"></a-input>
  </a-form-item>
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
  const paramValue = computed(() => props.modelValue)
  const rules = {
    required: true,
    message: '请填写',
  }
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
