<template>
  <a-form size="small" :model="formData" @submit-success="handleSubmit">
    <a-form-item
      field="categoryName"
      label="分类名称"
      :rules="[{ required: true, message: '请填写分类名称' }]"
      asterisk-position="end">
      <a-input v-model="formData.categoryName" />
    </a-form-item>
    <formFlowCode
      ref="flowCodeRef"
      v-model="formData.categoryCode"
      :form-desc="{
        fieldCode: 'categoryCode',
        name: '分类编码',
        value: JSON.stringify({ prefix: 'N5', length: formData.pid === 0 ? 2 : 4 }),
      }" />
    <a-space style="justify-content: end">
      <a-button @click="$emit('cancel')">取消</a-button>
      <a-button :loading="behaviorData.saveBtnLoading" type="primary" html-type="submit">
        确认
      </a-button>
    </a-space>
  </a-form>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import useTreeListController from '@/views/standard-manage/hooks/treeListController'
  import formFlowCode from '@/components/form-components/form-flow-code.vue'

  const emits = defineEmits(['cancel', 'refresh'])
  const props = defineProps({
    itemData: {
      type: Object,
      default: () => ({}),
    },
    categoryModule: {
      type: Number,
      default: 0,
    },
  })

  const { addTreeNode, modifyTreeNode } = useTreeListController(props.categoryModule)

  const flowCodeRef = ref(null)
  const behaviorData = reactive({
    saveBtnLoading: false,
  })
  const formData = reactive({
    ...props.itemData,
  })

  async function handleSubmit() {
    try {
      behaviorData.saveBtnLoading = true
      if (formData.id) {
        await modifyTreeNode(formData)
      } else {
        await flowCodeRef.value.getFlowCode()
        await addTreeNode(formData)
      }
      emits('cancel')
      emits('refresh')
    } catch (err) {
      // err
    } finally {
      behaviorData.saveBtnLoading = false
    }
  }
</script>
