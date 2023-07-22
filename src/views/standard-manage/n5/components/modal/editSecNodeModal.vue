<template>
  <EditBaseInfo ref="baseInfoRef" v-model="baseFormData" :category-module="categoryModule" />
  <EditGroupList
    v-if="baseFormData.id"
    :category-module="categoryModule"
    :base-form-data="baseFormData" />
  <a-empty v-else description="保存基础信息后才可录入族参数" />
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import EditBaseInfo from '../form/editBaseInfo.vue'
  import EditGroupList from '../form/editGroupList.vue'

  interface valueType {
    id: string | number
    pid: string | number
    state: string | number
    categoryCode: string
    categoryName: string
    categoryModule: number
  }
  const props = defineProps({
    firstNodeData: {
      type: Object,
      default: () => ({}),
    },
    categoryModule: {
      type: Number,
      default: 0,
    },
  })
  const baseInfoRef = ref(null)
  const baseFormData: valueType = reactive({
    id: null,
    pid: props.firstNodeData.pid,
    state: null,
    categoryCode: '',
    categoryName: '',
    categoryModule: props.firstNodeData.categoryModule,
  })
  function setBaseInfoForm(data) {
    Object.assign(baseFormData, data)
  }
  defineExpose({
    setBaseInfoForm,
  })
</script>
