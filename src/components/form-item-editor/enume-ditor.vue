<template>
  <a-space v-for="(item, index) in formData.enumList" :key="index" align="baseline">
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
        placeholder="英文或数字"
        :disabled="disabled && index < length"></a-input>
    </a-form-item>
    <a-button
      :disabled="(formData.enumList.length <= 1 || disabled) && index < length"
      size="small"
      @click="removeEnumItem(index)">
      <template #icon><icon-delete /></template>
    </a-button>
    <a-button v-if="index === formData.enumList.length - 1" size="small" @click="addEnumItem">
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

<script lang="ts" setup>
  import { computed, watch } from 'vue'

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
  const formData = computed(() => props.modelValue)
  let length = 0
  watch(
    () => props.disabled,
    () => {
      if (props.disabled) {
        length = formData.value.enumList.length
      }
    }
  )
  const rules = {
    required: true,
    message: '请填写',
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
</script>
