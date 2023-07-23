<template>
  <component
    :is="formItemMap[formItem[typeKeyName]]"
    ref="formItemCom"
    v-model="formItemData"
    :form-desc="formItem"
    :type-key-name="typeKeyName"
    :opt-key-name="optKeyName"
    :name-key-name="nameKeyName"
    :val-key-name="valKeyName"
    v-bind="$attrs" />
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import FormInput from './form-input.vue'
  import FormSelect from './form-select.vue'
  import FormFlowCode from './form-flow-code.vue'
  import FormNumberRange from './form-number-range.vue'
  import FormNumber from './form-number.vue'
  import FormControl from './form-control.vue'

  const formItemMap = {
    1: FormSelect,
    2: FormSelect,
    3: FormInput,
    4: FormNumberRange,
    5: FormFlowCode,
    6: FormNumber,
    7: FormControl,
  }
  const emits = defineEmits(['update:modelValue'])
  const props = defineProps({
    formItem: {
      type: Object,
      default: () => ({}),
    },
    modelValue: {
      type: [String, Number, Array, Object],
      default: '',
    },
    typeKeyName: {
      type: String,
      default: 'valueType',
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
  const formItemCom = ref(null)
  const formItemData = computed({
    get() {
      return props.modelValue
    },
    set(newValue) {
      emits('update:modelValue', newValue)
    },
  })
  defineExpose({
    formItemCom,
  })
</script>
