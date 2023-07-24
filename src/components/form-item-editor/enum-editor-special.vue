<template>
  <a-form-item
    :field="`${valueKey}.enumSource`"
    label="枚举来源"
    label-col-flex="70px"
    asterisk-position="end"
    :rules="rules">
    <a-select v-model="formData.enumSource" :disabled="disabled" @change="sourceChange">
      <a-option :value="1" label="手动配置" />
      <a-option :value="2" label="字典值" />
      <a-option :value="3" label="K2类型值" />
    </a-select>
  </a-form-item>
  <template v-if="formData.enumSource === 1">
    <a-space v-for="(item, index) in formData.enumList" :key="index" align="start">
      <a-form-item
        :field="`${valueKey}.enumList[${index}].name`"
        label="枚举名称"
        label-col-flex="70px"
        asterisk-position="end"
        :rules="rules">
        <a-input v-model="item.name" :disabled="disabled && index < length"></a-input>
      </a-form-item>
      <a-form-item
        :field="`${valueKey}.enumList[${index}].code`"
        label="枚举代码"
        label-col-flex="70px"
        asterisk-position="end"
        :rules="rules">
        <a-input
          v-model="item.code"
          :disabled="disabled && index < length"
          placeholder="英文或数字"></a-input>
      </a-form-item>
      <a-button
        :disabled="(formData.enumList.length <= 1 || disabled) && index < length"
        size="small"
        @click="removeEnumItem(index)">
        <template #icon><icon-delete /></template>
      </a-button>
      <a-button
        v-if="index === formData.enumList.length - 1"
        size="small"
        :disabled="disabled"
        @click="addEnumItem">
        <template #icon><icon-plus /></template>
      </a-button>
      <a-switch
        v-model="item.state"
        type="round"
        checked-text="启用"
        unchecked-text="停用"
        :checked-value="1"
        :unchecked-value="0" />
    </a-space>
  </template>
  <template v-else-if="formData.enumSource === 2">
    <a-form-item
      :field="`${valueKey}.dicTypeId`"
      label="字典类型"
      label-col-flex="70px"
      asterisk-position="end"
      :rules="rules">
      <a-select v-model="formData.dicTypeId" :disabled="disabled" @change="dicTypeChange">
        <a-option
          v-for="item in dicSelectList"
          :key="item.id"
          :value="item.id"
          :label="item.name" />
      </a-select>
    </a-form-item>
    <a-form-item
      :field="`${valueKey}.showKey`"
      label="参数字段"
      label-col-flex="70px"
      asterisk-position="end"
      :rules="rules">
      <a-select v-model="formData.showKey" :loading="loading" :disabled="disabled">
        <a-option
          v-for="item in dicColumnList"
          :key="item.id"
          :value="item.fieldCode"
          :label="item.name" />
      </a-select>
    </a-form-item>
  </template>
  <template v-else-if="formData.enumSource === 3">
    <a-form-item
      :field="`${valueKey}.module`"
      label="K2类型"
      label-col-flex="70px"
      asterisk-position="end"
      :rules="rules">
      <a-select v-model="formData.module" :disabled="disabled" @change="moduleChange">
        <a-option :value="0" label="N0" />
        <a-option :value="1" label="N1" />
        <a-option :value="2" label="N2" />
        <a-option :value="3" label="N3" />
      </a-select>
    </a-form-item>
    <a-form-item
      :field="`${valueKey}.showKey`"
      label="参数字段"
      label-col-flex="70px"
      asterisk-position="end"
      :rules="rules">
      <a-select v-model="formData.showKey" :loading="loading" :disabled="disabled">
        <a-option
          v-for="item in moduleColumnList"
          :key="item.id"
          :value="item.fieldCode"
          :label="item.name" />
      </a-select>
    </a-form-item>
  </template>
</template>

<script lang="ts" setup>
  import { computed, watch } from 'vue'
  import useLoading from '@/hooks/loading'
  import useGetTableSelectList from '@/views/standard-manage/components/modal/hooks/getSelectList'
  import useGetListSimple from '@/views/type-manage/hooks/getListSimple'

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
  const formData = computed({
    get() {
      return props.modelValue
    },
    set(newValue) {
      emits('update:modelValue', newValue)
    },
  })
  let length = 0
  watch(
    () => props.disabled,
    () => {
      if (props.disabled) {
        length = formData.value.enumList?.length || 0
      }
    }
  )
  const searchData = computed(() => ({ dictTypeId: props.modelValue.dicTypeId }))
  const rules = {
    required: true,
    message: '请填写',
  }
  const { loading, setLoading } = useLoading()
  const {
    selectList: dicSelectList,
    tableColumnList: dicColumnList,
    getSelectList,
    getTableColumnList,
  } = useGetTableSelectList(searchData.value)
  const { columnData: moduleColumnList, getColumnData } = useGetListSimple(formData.value)
  function sourceChange() {
    formData.value.dicTypeId = null
    formData.value.module = null
    formData.value.showKey = null
    formData.value.enumList = [{ name: '', code: '', state: 1 }]
  }
  function addEnumItem() {
    formData.value.enumList.push({
      name: '',
      code: '',
      state: 1,
    })
  }
  function removeEnumItem(index) {
    if (formData.value.enumList.length > 1) formData.value.enumList.splice(index, 1)
  }
  async function dicTypeChange() {
    setLoading(true)
    await getTableColumnList()
    formData.value.showKey = null
    setLoading(false)
  }
  async function moduleChange() {
    setLoading(true)
    await getColumnData({ module: formData.value.module })
    formData.value.showKey = null
    setLoading(false)
  }
  getSelectList()
</script>
