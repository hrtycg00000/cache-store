<template>
  <a-form ref="formRef" size="small" :model="formData" :rules="formRules" label-align="left">
    <a-card title="构件基础信息" :bordered="true" style="border-radius: 5px">
      <a-grid :cols="2" :col-gap="12" class="grid-demo-grid">
        <a-grid-item>
          <a-form-item
            required
            label="构件一级分类名称"
            label-col-flex="130px"
            asterisk-position="end">
            <a-select v-model="firstNodeId" @change="handleFirstNodeChange">
              <a-option
                v-for="(item, index) in treeList"
                :key="index"
                :value="item.id"
                :label="item.categoryName" />
            </a-select>
          </a-form-item>
        </a-grid-item>
        <a-grid-item>
          <a-form-item
            label="构件一级分类编码"
            label-col-flex="130px"
            asterisk-position="end"
            required>
            <a-input
              :model-value="treeList?.find((item) => item.id === firstNodeId)?.categoryCode"
              :readonly="true" />
          </a-form-item>
        </a-grid-item>
        <a-grid-item>
          <a-form-item
            field="categoryId"
            label="构件二级分类名称"
            label-col-flex="130px"
            asterisk-position="end">
            <a-select v-model="formData.categoryId">
              <a-option
                v-for="(item, index) in secTreeList"
                :key="index"
                :value="item.id"
                :label="item.categoryName" />
            </a-select>
          </a-form-item>
        </a-grid-item>
        <a-grid-item>
          <a-form-item
            required
            label="构件二级分类编码"
            label-col-flex="130px"
            asterisk-position="end">
            <a-input
              :model-value="
                secTreeList?.find((item) => item.id === formData.categoryId)?.categoryCode
              "
              :readonly="true" />
          </a-form-item>
        </a-grid-item>
        <a-grid-item>
          <a-form-item field="name" label="构件名称" label-col-flex="130px" asterisk-position="end">
            <a-input v-model="formData.name" />
          </a-form-item>
        </a-grid-item>
        <a-grid-item>
          <formFlowCode
            ref="flowCodeRef"
            v-model="formData.tribeCode"
            :form-desc="{
              fieldCode: 'tribeCode',
              name: '族类型编码',
              value: JSON.stringify({ prefix: 'EL.', length: 6 }),
            }"
            label-col-flex="130px" />
        </a-grid-item>
        <a-grid-item>
          <a-form-item field="state" label="状态" label-col-flex="130px" asterisk-position="end">
            <a-select v-model="formData.state">
              <a-option :value="1" label="启用" />
              <a-option :value="0" label="停用" />
            </a-select>
          </a-form-item>
        </a-grid-item>
        <a-grid-item>
          <a-form-item
            field="shared"
            label="是否嵌套共享"
            label-col-flex="130px"
            asterisk-position="end">
            <a-select v-model="formData.shared" :disabled="disableShared">
              <a-option :value="1" label="是" />
              <a-option :value="0" label="否" />
            </a-select>
          </a-form-item>
        </a-grid-item>
      </a-grid>
    </a-card>
  </a-form>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import useTreeListController from '@/views/standard-manage/hooks/treeListController'
  import formFlowCode from '@/components/form-components/form-flow-code.vue'

  const emits = defineEmits(['cancel', 'refresh', 'update:modelValue'])
  const props = defineProps({
    modelValue: {
      type: Object,
      default: () => ({}),
    },
    categoryModule: {
      type: Number,
      default: 0,
    },
    firstNodeId: {
      type: Number,
      default: 0,
    },
    disableShared: {
      type: Boolean,
      default: false,
    },
  })
  const firstNodeId = ref(props.firstNodeId)
  const formData = computed({
    get() {
      return props.modelValue
    },
    set(newValue) {
      emits('update:modelValue', newValue)
    },
  })
  const { treeList, getTreeList } = useTreeListController(props.categoryModule)
  const secTreeList = computed(() => {
    return treeList.value?.find((item) => item.id === firstNodeId.value)?.subCategoryList
  })
  const formRef = ref(null)
  const flowCodeRef = ref(null)
  const formRules = {
    categoryId: {
      required: true,
      message: '请选择',
    },
    shared: {
      required: true,
      message: '请选择',
    },
    name: {
      required: true,
      message: '请输入',
    },
  }
  function handleFirstNodeChange() {
    formData.value.categoryId = null
  }
  async function validateForm() {
    const validate = await formRef.value.validate()
    if (validate) throw new Error('校验失败')
    if (!formData.value.id) {
      await flowCodeRef.value.getFlowCode()
    }
  }
  function init() {
    getTreeList()
  }
  init()
  defineExpose({
    validateForm,
  })
</script>
