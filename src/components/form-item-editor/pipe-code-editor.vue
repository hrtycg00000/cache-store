<template>
  <a-space class="container" fill>
    <a-form-item :field="`${valueKey}.prefix`" label="前缀" :rules="rules" label-col-flex="70px">
      <a-input v-model="option.prefix" :disabled="disabled" placeholder="大写英文字母"></a-input>
    </a-form-item>
    <a-form-item :field="`${valueKey}.length`" label="长度" :rules="rules" label-col-flex="70px">
      <a-input-number
        v-model="option.length"
        :disabled="disabled"
        hide-button
        placeholder="前缀之后的编码位数长度"
        :precision="0" />
    </a-form-item>
  </a-space>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  const emits = defineEmits(['update:modelValue'])
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
  const option = computed({
    get() {
      return props.modelValue
    },
    set(newValue) {
      emits('update:modelValue', newValue)
    },
  })
  const rules = {
    required: true,
    message: '请填写',
  }
</script>

<style scoped lang="less">
  .container {
    :deep(.arco-space-item) {
      flex: 1;
    }
  }
</style>
