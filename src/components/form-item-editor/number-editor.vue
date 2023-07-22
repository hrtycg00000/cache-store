<template>
  <a-space class="container" fill>
    <a-form-item
      :field="`${valueKey}.hasRange`"
      label="数值范围"
      :rules="rules"
      label-col-flex="70px"
      asterisk-position="end">
      <a-switch
        v-model="option.hasRange"
        :disabled="disabled"
        :checked-value="1"
        :unchecked-value="0" />
    </a-form-item>
    <template v-if="option.hasRange">
      <a-form-item
        :field="`${valueKey}.min`"
        label="最小值"
        :rules="rules"
        label-col-flex="55px"
        asterisk-position="end">
        <a-input-number v-model="option.min" :disabled="disabled" hide-button :precision="0" />
      </a-form-item>
      <a-form-item
        :field="`${valueKey}.max`"
        label="最大值"
        :rules="maxRules"
        label-col-flex="55px"
        asterisk-position="end">
        <a-input-number v-model="option.max" :disabled="disabled" hide-button :precision="0" />
      </a-form-item>
    </template>
  </a-space>
  <a-space class="container-bottom" fill>
    <a-form-item
      :field="`${valueKey}.isInteger`"
      label="整数/小数"
      :rules="rules"
      label-col-flex="75px"
      asterisk-position="end">
      <a-switch
        v-model="option.isInteger"
        :disabled="disabled"
        checked-text="整数"
        unchecked-text="小数"
        unchecked-color="#14C9C9"
        :checked-value="1"
        :unchecked-value="0" />
    </a-form-item>
    <template v-if="!option.isInteger">
      <a-form-item
        :field="`${valueKey}.precision`"
        label="精度"
        :rules="rules"
        label-col-flex="40px"
        asterisk-position="end">
        <a-input-number
          v-model="option.precision"
          :disabled="disabled"
          hide-button
          :precision="0"
          placeholder="小数点精确到第几位" />
      </a-form-item>
    </template>
  </a-space>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

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
  const option = computed({
    get() {
      return props.modelValue
    },
    set(newValue) {
      emits('update:modelValue', newValue)
    },
  })
  const rules = {
    required: true,
    message: '请填写',
  }
  const maxRules = {
    required: true,
    validator(value, cb) {
      if (!value) {
        cb('请填写 ')
      } else if (value <= option.value.min) {
        cb('不能小于最小值 ')
      }
    },
  }
</script>

<style scoped lang="less">
  .container {
    :deep(.arco-space-item) {
      &:first-child {
        flex-grow: 0.2;
        flex-shrink: 0;
      }
      &:nth-child(2) {
        flex: 1;
      }
      &:last-child {
        flex: 1;
      }
    }
  }
  .container-bottom {
    :deep(.arco-space-item) {
      &:first-child {
        flex-shrink: 0;
        flex-grow: 0.1;
      }
      &:last-child {
        flex: 1;
      }
    }
  }
</style>
