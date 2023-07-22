<template>
  <a-form
    v-if="formData"
    ref="formEl"
    size="small"
    :model="formData"
    label-align="left"
    @submit-success="handleSubmit">
    <template v-for="item in formItemList" :key="item.id">
      <FormComponents ref="formItemRefs" v-model="formData[item.fieldCode]" :form-item="item" />
    </template>
    <a-space style="justify-content: end">
      <a-button :disabled="loading" @click="$emit('cancel')"> 取消 </a-button>
      <a-button html-type="submit" :loading="loading" type="primary"> 确认 </a-button>
    </a-space>
  </a-form>
</template>

<script lang="ts" setup>
  import { reactive, ref, computed } from 'vue'
  import useLoading from '@/hooks/loading'
  import useFormData from '@/hooks/formData'
  import { addDicValueApi } from '@/api/dictionary'
  import FormComponents from '@/components/form-components/index.vue'

  const emits = defineEmits(['cancel', 'refresh'])
  const props = defineProps({
    formItemList: {
      type: Array<any>,
      default: () => [],
    },
  })
  const flowCodeKey = computed(() => {
    return props.formItemList.find((item) => item.name.includes('编码')).fieldCode
  })
  const { loading, setLoading } = useLoading()
  const { formData } = useFormData(props.formItemList)
  const formItemRefs = ref([])
  const requestBody = reactive({
    dictTypeId: null,
  })
  function setRequestBody(data) {
    Object.assign(requestBody, data)
  }
  async function handleSubmit() {
    try {
      setLoading(true)
      const flowCodeItem = formItemRefs.value.find((item) => item.formItemCom.getFlowCode)
      if (flowCodeItem) await flowCodeItem.formItemCom.getFlowCode()
      const body = {
        ...requestBody,
        state: formData.state.code,
        code: formData[flowCodeKey.value],
        jsonValue: JSON.stringify(formData),
      }
      await addDicValueApi(body)
      emits('cancel')
      emits('refresh')
    } catch (err) {
      console.log(err);
      // err
    } finally {
      setLoading(false)
    }
  }
  defineExpose({
    setRequestBody,
  })
</script>
