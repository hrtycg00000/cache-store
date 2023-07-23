<template>
  <a-form-item
    :field="formDesc[valKeyName]"
    :label="formDesc[nameKeyName]"
    :rules="rules"
    asterisk-position="end">
    <a-input-number v-model="minValue" hide-button placeholder="最小值" @change="handleChange" />
    ~
    <a-input-number v-model="maxValue" hide-button placeholder="最大值" @change="handleChange" />
  </a-form-item>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  const emits = defineEmits(['update:modelValue', 'change'])
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
  const minValue = computed({
    get() {
      return Number(props.modelValue.split('~')[0]) || null
    },
    set(newValue) {
      emits('update:modelValue', `${newValue}~${props.modelValue.split('~')[1] || ''}`)
    },
  })
  const maxValue = computed({
    get() {
      return Number(props.modelValue.split('~')[1]) || null
    },
    set(newValue) {
      emits('update:modelValue', `${props.modelValue.split('~')[0] || ''}~${newValue}`)
    },
  })
  const rules = computed(() => {
    const rule = {
      required: !!(props.formDesc.isRequire ?? props.formDesc.isRequired),
      validator(val, cb) {
        if (val === ' ~ ' && !!(props.formDesc.isRequire ?? props.formDesc.isRequired)) {
          cb(`${props.formDesc[props.nameKeyName]}是必填项`)
        } else {
          const min = Number(val.split('~')[0])
          const max = Number(val.split('~')[1])
          if (min >= max) {
            cb('最大值不能小于最小值 ')
          }
        }
      },
    }
    return rule
  })
  function handleChange(val) {
    emits('change', val)
  }
</script>
