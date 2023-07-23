<template>
  <a-form-item
    :field="formDesc[valKeyName]"
    :label="formDesc[nameKeyName]"
    :rules="rules"
    asterisk-position="end"
    v-bind="$attrs">
    <a-textarea
      v-if="formOption.isTextarea"
      v-model="value"
      :placeholder="formOption.placeholder"
      @change="handleChange" />
    <a-input v-else v-model="value" :placeholder="formOption.placeholder" @change="handleChange" />
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
      type: String,
      default: '',
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
      return props.modelValue
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
  function handleChange(val) {
    emits('change', val)
  }
</script>
