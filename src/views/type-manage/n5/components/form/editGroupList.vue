<template>
  <a-card class="list-container" title="族基础参数录入" :bordered="true" style="border-radius: 5px">
    <EditGroupTable
      ref="groupBaseRef"
      v-model="jsonValue"
      list-form-key="groupBaseData"
      :list-data="groupListData.baseListData" />
  </a-card>
  <a-card
    class="list-container"
    title="族几何参数录入"
    :bordered="true"
    style="margin-top: 12px; border-radius: 5px">
    <EditGroupTable
      ref="groupGeometryRef"
      v-model="jsonValue"
      list-form-key="groupGeometryData"
      :list-data="groupListData.geometryListData"
      :has-param-group="true" />
  </a-card>
  <a-card
    class="list-container"
    title="族材质参数录入"
    :bordered="true"
    style="margin-top: 12px; border-radius: 5px">
    <EditGroupTable
      ref="groupMaterialRef"
      v-model="jsonValue"
      list-form-key="groupMaterialData"
      :list-data="groupListData.materialListData" />
  </a-card>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import EditGroupTable from './editGroupTable.vue'

  const emits = defineEmits(['update:modelValue'])
  const props = defineProps({
    modelValue: {
      type: Object,
      default: () => ({}),
    },
    categoryModule: {
      type: Number,
      default: 0,
    },
    groupListData: {
      type: Object,
      default: () => ({}),
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
  const groupBaseRef = ref(null)
  const groupGeometryRef = ref(null)
  const groupMaterialRef = ref(null)
  function validateForm() {
    return Promise.all([
      groupBaseRef.value.validateForm(),
      groupGeometryRef.value.validateForm(),
      groupMaterialRef.value.validateForm(),
    ])
  }
  defineExpose({
    validateForm,
  })
</script>

<style scoped lang="less"></style>
