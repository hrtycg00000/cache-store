<template>
  <a-form ref="formRef" size="small" :model="jsonValue" label-align="left">
    <a-table
      class="table-container"
      row-key="dictTypeId"
      size="small"
      :data="listData"
      :pagination="false"
      :bordered="true">
      <template #columns>
        <a-table-column title="参数项编码" data-index="code" ellipsis :width="120" />
        <a-table-column title="参数项名称" data-index="name" ellipsis :width="150">
          <template #cell="{ record }">
            <p>
              {{ record.name }}{{ record.unit ? `(${record.unit})` : '' }}
              <span v-if="record.isRequire" class="require-icon">*</span>
            </p>
          </template>
        </a-table-column>
        <a-table-column title="参数值" data-index="value">
          <template #cell="{ record, rowIndex }">
            <ListFormComponents
              v-if="!!jsonValue[listFormKey][rowIndex]?.code"
              v-model="jsonValue[listFormKey][rowIndex].value"
              :field="`${[listFormKey]}[${rowIndex}].value`"
              :form-item="record"
              hide-label />
          </template>
        </a-table-column>
        <a-table-column
          v-if="hasParamGroup"
          title="参数项分组"
          data-index="paramGroup"
          :width="120" />
      </template>
    </a-table>
  </a-form>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import ListFormComponents from '@/components/form-components/list-form-components.vue'

  const emits = defineEmits(['update:modelValue'])
  const props = defineProps({
    modelValue: {
      type: Object,
      default: () => ({}),
    },
    listData: {
      type: Array<any>,
      default: () => [],
    },
    hasParamGroup: {
      type: Boolean,
      default: false,
    },
    listFormKey: {
      type: String,
      default: '',
    },
  })
  const jsonValue = computed({
    get() {
      return props.modelValue
    },
    set(newValue) {
      emits('update:modelValue', newValue)
    },
  })
  const formRef = ref(null)
  async function validateForm() {
    const validate = await formRef.value.validate()
    if (validate) throw new Error('校验失败')
  }
  defineExpose({
    validateForm,
  })
</script>

<style scoped lang="less">
  .require-icon {
    display: inline-block;
    color: rgb(var(--danger-6));
    font-size: 16px;
    line-height: 16px;
    vertical-align: bottom;
  }
</style>
