<template>
  <a-row class="step-container" justify="center">
    <a-steps v-model:current="behaviorData.step" small style="width: 350px">
      <a-step> 选择字典值 </a-step>
      <a-step> 配置值信息 </a-step>
    </a-steps>
  </a-row>
  <keep-alive>
    <SelectParamForm
      v-if="behaviorData.step === 1"
      @change-step="changeStep"
      @cancel="$emit('cancel')" />
    <EditParamForm
      v-else
      :loading="loading"
      :modify-form="modifyForm"
      :has-param-group="mergeBody.subModule == 2"
      v-bind="$attrs"
      @change-step="changeStep"
      @cancel="$emit('cancel')" />
  </keep-alive>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import useLoading from '@/hooks/loading'
  import { addBusinessParamApi, updateBusinessParamApi } from '@/api/standardManage'
  import SelectParamForm from './selectParamForm.vue'
  import EditParamForm from './editParamForm.vue'

  defineOptions({ inheritAttrs: false })
  const emits = defineEmits(['refresh', 'cancel'])
  const props = defineProps({
    module: Number,
    mergeBody: {
      type: Object,
      default: () => ({}),
    },
  })
  const { loading, setLoading } = useLoading()
  const behaviorData = reactive({
    step: 1,
  })
  const submitModel = ref({
    id: null,
    code: '',
    name: '',
    fieldCode: '',
    module: props.module,
  })
  const modifyForm = reactive({
    id: null,
  })
  function setModifyForm(data) {
    Object.assign(modifyForm, data)
    submitModel.value.id = data.id
    submitModel.value.code = data.code
    submitModel.value.name = data.name
    submitModel.value.fieldCode = data.fieldCode
    behaviorData.step = 2
  }
  async function submitForm() {
    try {
      setLoading(true)
      if (modifyForm.id) {
        await updateBusinessParamApi(submitModel.value)
      } else {
        await addBusinessParamApi(submitModel.value)
      }
      emits('cancel')
      emits('refresh')
    } catch (err) {
      // err
    } finally {
      setLoading(false)
    }
  }
  function changeStep(direction, model) {
    if (typeof direction === 'number') {
      behaviorData.step = direction
      return
    }
    if (direction === 'forward' || direction === 'submit') {
      Object.assign(submitModel.value, model, props.mergeBody)
      if (direction === 'submit') {
        submitForm()
        return
      }
      behaviorData.step += 1
    } else if (direction === 'backward') {
      behaviorData.step -= 1
    }
  }
  defineExpose({
    setModifyForm,
  })
</script>

<style scoped lang="less">
  .step-container {
    margin-bottom: 15px;
  }
</style>
