<template>
  <a-form
    ref="formEl"
    size="small"
    :model="formData"
    :rules="formRules"
    label-align="left"
    @submit-success="handleSubmit">
    <a-form-item field="state" label="状态" label-col-flex="70px" asterisk-position="end">
      <a-select v-model="formData.state">
        <a-option :value="1" label="启用" />
        <a-option :value="0" label="禁用" />
      </a-select>
    </a-form-item>
    <a-form-item field="valueType" label="值类型" label-col-flex="70px" asterisk-position="end">
      <a-select
        v-model="formData.valueType"
        :disabled="!!modifyForm.id"
        @change="hanleValueTypeChange">
        <a-option :value="1" label="枚举单选" />
        <a-option :value="2" label="枚举多选" />
        <a-option :value="3" label="文本输入" />
        <a-option :value="4" label="范围输入" />
        <a-option :value="5" label="流水码" />
        <a-option :value="6" label="数值输入" />
        <a-option :value="7" label="管控" />
      </a-select>
    </a-form-item>
    <template v-if="[1, 2].includes(formData.valueType)">
      <EnumEditorSpecial
        v-model="formData.value"
        :disabled="!!modifyForm.id"
        :dic-select-list="selectList"
        value-key="value" />
    </template>
    <template v-else-if="formData.valueType === 3">
      <InputEditor v-model="formData.value" :disabled="!!modifyForm.id" value-key="value" />
    </template>
    <template v-else-if="formData.valueType === 5">
      <PipeCodeEditor v-model="formData.value" :disabled="!!modifyForm.id" value-key="value" />
    </template>
    <template v-else-if="formData.valueType === 6">
      <NumberEditor v-model="formData.value" :disabled="!!modifyForm.id" value-key="value" />
    </template>
    <template v-else-if="formData.valueType === 7">
      <ControlEditor v-model="formData.value" :disabled="!!modifyForm.id" value-key="value" />
    </template>
    <a-form-item field="unit" label="单位" label-col-flex="70px" asterisk-position="end">
      <a-input v-model="formData.unit"></a-input>
    </a-form-item>
    <a-form-item field="dataType" label="实例/类型" label-col-flex="77px" asterisk-position="end">
      <a-select v-model="formData.dataType">
        <a-option :value="1" label="实例" />
        <a-option :value="2" label="类型" />
      </a-select>
    </a-form-item>
    <a-form-item
      v-if="hasParamGroup"
      field="paramGroup"
      label="参数项分组"
      label-col-flex="85px"
      asterisk-position="end">
      <a-input v-model="formData.paramGroup"></a-input>
    </a-form-item>
    <a-form-item field="isRequire" label="是否必填" label-col-flex="70px" asterisk-position="end">
      <a-radio-group v-model="formData.isRequire">
        <a-radio :value="1">是</a-radio>
        <a-radio :value="0">否</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-space style="justify-content: end">
      <a-button :disabled="loading" @click="$emit('cancel')"> 取消 </a-button>
      <a-button v-if="!modifyForm.id" :disabled="loading" @click="$emit('changeStep', 'backward')">
        上一步
      </a-button>
      <a-button html-type="submit" :loading="loading" type="primary"> 确认 </a-button>
    </a-space>
  </a-form>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue'
  import { cloneDeep } from 'lodash'
  import EnumEditorSpecial from '@/components/form-item-editor/enum-editor-special.vue'
  import InputEditor from '@/components/form-item-editor/input-editor.vue'
  import NumberEditor from '@/components/form-item-editor/number-editor.vue'
  import PipeCodeEditor from '@/components/form-item-editor/pipe-code-editor.vue'
  import ControlEditor from '@/components/form-item-editor/control-editor.vue'
  import useGetTableSelectList from './hooks/getSelectList'

  interface valueType {
    id?: string | number
    dictTypeId?: string | number
    state: number
    valueType: number
    value: any
    unit: string
    dataType: number
    isRequire: number
    paramGroup?: string
  }
  const emits = defineEmits(['changeStep', 'cancel'])
  const props = defineProps({
    loading: Boolean,
    modifyForm: {
      type: Object,
      default: () => ({}),
    },
    hasParamGroup: {
      type: Boolean,
      default: false,
    },
  })
  const { selectList, getSelectList } = useGetTableSelectList()
  const formData: valueType = reactive({
    state: 1,
    valueType: 1,
    value: {
      enumSource: null,
      dicTypeId: null,
      module: null,
      enumList: [{ name: '', code: '' }],
    },
    unit: '',
    dataType: null,
    isRequire: 1,
  })
  const formRules = {
    state: {
      required: true,
      message: '请选择',
    },
    valueType: {
      required: true,
      message: '请选择',
    },
    paramGroup: {
      required: true,
      message: '请填写',
    },
    dataType: {
      required: true,
      message: '请选择',
    },
    isRequire: {
      required: true,
      message: '请选择',
    },
  }
  function mergeFormData() {
    formData.state = props.modifyForm.state
    formData.valueType = props.modifyForm.valueType
    formData.value = props.modifyForm.value
    formData.unit = props.modifyForm.unit
    formData.dataType = props.modifyForm.dataType
    formData.isRequire = props.modifyForm.isRequire
    if (props.hasParamGroup) {
      formData.paramGroup = props.modifyForm.paramGroup
    }
  }
  function hanleValueTypeChange(value) {
    if ([1, 2].includes(value)) {
      if (formData.value?.enumSource || formData.value?.enumSource === null) return
      formData.value = {
        enumSource: null,
        dicTypeId: null,
        module: null,
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
    } else if (value === 7) {
      formData.value = { value: '' }
    } else {
      formData.value = null
    }
  }
  function handleSubmit() {
    const body = cloneDeep(formData)
    body.value = JSON.stringify(body.value)
    emits('changeStep', 'submit', { ...body })
  }
  function init() {
    getSelectList()
    if (props.modifyForm.id) mergeFormData()
  }
  init()
</script>

<style scoped lang="less"></style>
