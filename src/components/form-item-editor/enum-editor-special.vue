<template>
  <a-form-item
    :field="`${valueKey}.enumSource`"
    label="枚举来源"
    label-col-flex="70px"
    asterisk-position="end"
    :rules="rules">
    <a-select v-model="formData.enumSource" :disabled="disabled">
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
        <a-input v-model="item.name" :disabled="disabled"></a-input>
      </a-form-item>
      <a-form-item
        :field="`${valueKey}.enumList[${index}].code`"
        label="枚举代码"
        label-col-flex="70px"
        asterisk-position="end"
        :rules="rules">
        <a-input v-model="item.code" :disabled="disabled" placeholder="请输入小驼峰"></a-input>
      </a-form-item>
      <a-button
        :disabled="formData.enumList.length <= 1 || disabled"
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
    </a-space>
  </template>
  <template v-else-if="formData.enumSource === 2">
    <a-form-item
      :field="`${valueKey}.dicTypeId`"
      label="字典类型"
      label-col-flex="70px"
      asterisk-position="end"
      :rules="rules">
      <a-select v-model="formData.dicTypeId" :disabled="disabled">
        <a-option
          v-for="item in dicSelectList"
          :key="item.id"
          :value="item.id"
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
      <a-select v-model="formData.module" :disabled="disabled">
        <a-option :value="0" label="N0" />
        <a-option :value="1" label="N1" />
        <a-option :value="2" label="N2" />
        <a-option :value="3" label="N3" />
      </a-select>
    </a-form-item>
  </template>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  const props = defineProps({
    modelValue: {
      type: Object,
      default: () => ({}),
    },
    valueKey: {
      type: String,
      default: 'value',
    },
    dicSelectList: {
      type: Array<any>,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  })
  const formData = computed(() => props.modelValue)
  const rules = {
    required: true,
    message: '请填写',
  }
  function addEnumItem() {
    formData.value.enumList.push({
      name: '',
      code: '',
    })
  }
  function removeEnumItem(index) {
    if (formData.value.enumList.length > 1) formData.value.enumList.splice(index, 1)
  }
</script>
