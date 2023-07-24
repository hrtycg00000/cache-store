<template>
  <div class="container">
    <a-form
      ref="formEl"
      size="small"
      :model="formData"
      :rules="formRules"
      label-align="left"
      @submit-success="handleSubmit">
      <a-form-item field="name" label="列名" label-col-flex="70px" asterisk-position="end">
        <a-input v-model="formData.name"></a-input>
      </a-form-item>
      <a-form-item field="fieldCode" label="字段代码" label-col-flex="70px" asterisk-position="end">
        <a-textarea
          v-model="formData.fieldCode"
          :disabled="!!formData.id"
          placeholder="请输入英文语义化小驼峰字符。
例如 列名：参数名称；字段代码：paramsName；" />
      </a-form-item>
      <a-form-item field="valueType" label="值类型" label-col-flex="70px" asterisk-position="end">
        <a-select
          v-model="formData.valueType"
          :disabled="!!formData.id"
          @change="hanleValueTypeChange">
          <a-option :value="1" label="枚举单选" />
          <a-option :value="2" label="枚举多选" />
          <a-option :value="3" label="文本输入" />
          <a-option :value="4" label="范围输入" />
          <a-option :value="5" label="流水码" />
          <a-option :value="6" label="数值输入" />
        </a-select>
      </a-form-item>
      <template v-if="[1, 2].includes(formData.valueType)">
        <EnumEditor v-model="formData.value" :disabled="!!formData.id" />
      </template>
      <template v-else-if="formData.valueType === 3">
        <InputEditor v-model="formData.value" :disabled="!!formData.id" />
      </template>
      <template v-else-if="formData.valueType === 5">
        <PipeCodeEditor v-model="formData.value" :disabled="!!formData.id" />
      </template>
      <template v-else-if="formData.valueType === 6">
        <NumberEditor v-model="formData.value" :disabled="!!formData.id" />
      </template>
      <a-form-item field="isRequire" label="是否必填" label-col-flex="70px" asterisk-position="end">
        <a-radio-group v-model="formData.isRequire">
          <a-radio :value="1">是</a-radio>
          <a-radio :value="0">否</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-space style="justify-content: end">
        <a-button :disabled="loading" @click="$emit('cancel')"> 取消 </a-button>
        <a-button html-type="submit" :loading="loading" type="primary"> 确认 </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue'
  import { cloneDeep } from 'lodash'
  import useLoading from '@/hooks/loading'
  import { addDicHeaderApi, modifyDicHeaderApi } from '@/api/dictionary'
  import EnumEditor from '@/components/form-item-editor/enume-ditor.vue'
  import PipeCodeEditor from '@/components/form-item-editor/pipe-code-editor.vue'
  import NumberEditor from '@/components/form-item-editor/number-editor.vue'
  import InputEditor from '@/components/form-item-editor/input-editor.vue'

  interface valueType {
    id: string | number
    dictTypeId: string | number
    name: string
    fieldCode: string
    valueType: number
    isRequire: number
    value: any
  }
  const emits = defineEmits(['cancel', 'refresh'])
  const { loading, setLoading } = useLoading()
  const formData: valueType = reactive({
    id: null,
    dictTypeId: null,
    name: '',
    fieldCode: '',
    valueType: 1,
    isRequire: 1,
    value: {
      enumSource: 1,
      dicTypeId: null,
      module: null,
      enumList: [{ name: '', code: '' }],
    },
  })
  const formRules = {
    name: {
      required: true,
      message: '请输入列名',
    },
    fieldCode: {
      required: true,
      message: '请输入字段代码',
    },
    valueType: {
      required: true,
      message: '请选择值类型',
    },
    isRequire: {
      required: true,
      message: '请选择是否必填',
    },
  }
  function setFormData(data) {
    Object.assign(formData, data)
  }
  function hanleValueTypeChange(value) {
    if ([1, 2].includes(value)) {
      if (formData.value?.enumSource || formData.value?.enumSource === null) return
      formData.value = {
        enumSource: 1,
        dicTypeId: null,
        module: null,
        showKey: null,
        enumList: [{ name: '', code: '' }],
      }
    } else if (value === 3) {
      formData.value = { placeholder: '', isTextarea: 0 }
    } else if (value === 5) {
      formData.value = { prefix: '', length: null }
    } else if (value === 6) {
      formData.value = {
        hasRange: 0,
        min: null,
        max: null,
        isInteger: 1,
        precision: null,
      }
    } else {
      formData.value = null
    }
  }
  async function handleSubmit() {
    try {
      setLoading(true)
      const body = cloneDeep(formData)
      body.value = JSON.stringify(body.value)
      if (body.id) {
        await modifyDicHeaderApi(body)
      } else {
        delete body.id
        await addDicHeaderApi(body)
      }
      emits('cancel')
      emits('refresh')
    } catch (err) {
      // err
    } finally {
      setLoading(false)
    }
  }
  defineExpose({
    setFormData,
  })
</script>
