<template>
  <a-form-item
    :field="formDesc[valKeyName]"
    :label="formDesc[nameKeyName]"
    :rules="rules"
    asterisk-position="end">
    <a-select
      v-model="value"
      :loading="loading"
      :multiple="formDesc.valueType === 2"
      :filter-option="false"
      :allow-search="true"
      value-key="code"
      @search="handleSearch"
      @change="handleChange">
      <a-option v-for="(item, index) of selectList" :key="index" :label="item.name" :value="item" />
    </a-select>
  </a-form-item>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import { isArray } from '@/utils/is'
  import useLoading from '@/hooks/loading'
  import { getDicValListApi } from '@/api/dictionary'
  import { getBusinessDataListApi } from '@/api/typeManage'

  const keyNameMap = {
    0: {
      fieldName: 'cityName',
      fieldNames: { value: 'cityCode', label: 'cityName' },
    },
    1: {
      fieldName: 'communityName',
      fieldNames: { value: 'communityCode', label: 'communityName' },
    },
    2: {
      fieldName: 'unitName',
      fieldNames: { value: 'unitCode', label: 'unitName' },
    },
    3: {
      fieldName: 'roomName',
      fieldNames: { value: 'roomCode', label: 'roomName' },
    },
  }

  const props = defineProps({
    formDesc: {
      type: Object,
      default: () => ({}),
    },
    modelValue: {
      type: [String, Array, Object],
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
  const { loading, setLoading } = useLoading()

  const value = computed({
    get() {
      return props.modelValue
    },
    set(newValue) {
      emits('update:modelValue', newValue)
    },
  })
  const selectList = ref([])
  const option = ref(null)
  const fieldNames: any = ref({})
  const rules = computed(() => {
    const rule = {
      required: !!(props.formDesc.isRequire ?? props.formDesc.isRequired),
      message: `${props.formDesc[props.nameKeyName]}是必填项`,
    }
    return rule
  })
  async function getDicValList(val = '') {
    try {
      setLoading(true)
      const res: any = await getDicValListApi({
        fieldName: 'paramName',
        fieldValue: val,
        dictTypeId: option.value.dicTypeId,
        pageNumber: 1,
        pageSize: 99,
      })
      selectList.value = res.data.map((item) => ({
        name: item[fieldNames.value.label],
        code: item[fieldNames.value.value],
      }))
    } catch (err) {
      // err
    } finally {
      setLoading(false)
    }
  }
  async function getBusinessDataList(val = '') {
    try {
      setLoading(true)
      const res: any = await getBusinessDataListApi({
        fieldName: keyNameMap[option.value.module].fieldName,
        fieldValue: val,
        module: option.value.module,
        pageNumber: 1,
        pageSize: 99,
      })
      selectList.value = res.data.map((item) => ({
        name: item[fieldNames.value.label],
        code: item[fieldNames.value.value],
      }))
    } catch (err) {
      // err
    } finally {
      setLoading(false)
    }
  }
  async function handleSearch(val) {
    if (option.value.enumSource === 2) {
      getDicValList(val)
    } else if (option.value.enumSource === 3) {
      getBusinessDataList(val)
    }
  }
  function handleChange(val) {
    emits('change', val)
  }
  function init() {
    option.value = JSON.parse(props.formDesc[props.optKeyName])
    if (isArray(option.value)) {
      fieldNames.value = { value: 'code', label: 'name' }
      selectList.value = option.value
      return
    }
    if (option.value.enumSource === 1) {
      fieldNames.value = { value: 'code', label: 'name' }
      selectList.value = option.value.enumList
    }
    if (option.value.enumSource === 2) {
      fieldNames.value = { value: 'paramCode', label: 'paramName' }
      getDicValList()
    }
    if (option.value.enumSource === 3) {
      fieldNames.value = keyNameMap[option.value.module].fieldNames
      getBusinessDataList()
    }
  }
  init()
</script>
