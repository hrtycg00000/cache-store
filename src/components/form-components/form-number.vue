<template>
  <a-form-item
    :field="formDesc[valKeyName]"
    :label="formDesc[nameKeyName]"
    :rules="rules"
    asterisk-position="end">
    <a-input-number
      v-model="value"
      hide-button
      :precision="formOption.isInteger ? 0 : formOption.precision"
      :min="formOption.hasRange ? formOption.min : -Infinity"
      :max="formOption.hasRange ? formOption.max : Infinity"
      :placeholder="placeholder"
      @change="handleChange"></a-input-number>
  </a-form-item>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  const props = defineProps({
    formDesc: {
      type: Object,
      default: () => ({}),
    },
    modelValue: {
      type: [Number, String],
      default: null,
    },
    optKeyName: {
      type: String,
      default: 'value',
    },
    nameKeyName: {
      type: String,
      default: 'name',
    },
    valKeyName: {
      type: String,
      default: 'fieldCode',
    },
  })
  const emits = defineEmits(['update:modelValue', 'change'])

  const value = computed({
    get() {
      return Number(props.modelValue)
    },
    set(newValue) {
      emits('update:modelValue', newValue)
    },
  })
  const formOption = computed(() => {
    return JSON.parse(props.formDesc[props.optKeyName])
  })
  const rules = computed(() => {
    const rule = {
      required: !!(props.formDesc.isRequire ?? props.formDesc.isRequired),
      message: `${props.formDesc[props.nameKeyName]}是必填项`,
    }
    return rule
  })
  const placeholder = computed(() => {
    const intStr = formOption.value.isInteger
      ? '整数'
      : `整数或小数(精确到后${formOption.value.precision}位)`
    const str = formOption.value.hasRange
      ? `请输入${formOption.value.min}~${formOption.value.max}之间的${intStr}`
      : `请输入${intStr}`
    return str
  })
  function handleChange(val) {
    emits('change', val)
  }
</script>
