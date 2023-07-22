<template>
  <a-form size="small" :model="formData" @submit-success="handleSubmit">
    <a-form-item
      field="name"
      label="字典名称"
      :rules="[{ required: true, message: '请填写字典名称' }]"
      asterisk-position="end">
      <a-input v-model="formData.name" />
    </a-form-item>
    <a-space style="justify-content: end">
      <a-button @click="$emit('cancel')">取消</a-button>
      <a-button :loading="behaviorData.saveBtnLoading" type="primary" html-type="submit">
        确认
      </a-button>
    </a-space>
  </a-form>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue'
  import { addDictionary, modifyDictionary } from '@/api/dictionary'

  const emits = defineEmits(['cancel', 'refresh'])
  const props = defineProps({
    itemData: {
      type: Object,
      default: () => ({}),
    },
  })

  const behaviorData = reactive({
    saveBtnLoading: false,
  })
  const formData = reactive({
    ...props.itemData,
  })

  async function handleSubmit() {
    try {
      behaviorData.saveBtnLoading = true
      if (formData.id) await modifyDictionary(formData)
      else await addDictionary({ name: formData.name })
      emits('cancel')
      emits('refresh')
    } catch (err) {
      // err
    } finally {
      behaviorData.saveBtnLoading = false
    }
  }
</script>
