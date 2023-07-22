<template>
  <a-form-item
    :field="formDesc[valKeyName]"
    :label="formDesc[nameKeyName]"
    asterisk-position="end"
    v-bind="$attrs">
    <a-input v-model="value" disabled placeholder="自动生成无需填写">
      <template #prepend>{{ formOption.prefix }}</template>
      <template v-if="loading" #suffix><a-spin /></template>
    </a-input>
  </a-form-item>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import useLoading from '@/hooks/loading'
  import { getFlowCodeApi } from '@/api/common'

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
  const emits = defineEmits(['update:modelValue'])

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
  const { loading, setLoading } = useLoading()
  async function getFlowCode() {
    try {
      setLoading(true)
      const res = await getFlowCodeApi({
        appendPrefix: true,
        key: formOption.value.prefix,
        length: formOption.value.length,
      })
      value.value = res.data
    } catch (err) {
      // err
    } finally {
      setLoading(false)
    }
  }
  defineExpose({
    getFlowCode,
  })
</script>
