<template>
  <a-form
    size="small"
    :model="formData"
    :rules="formRules"
    label-align="left"
    @submit-success="handleSubmit">
    <a-card title="构件基础信息" :bordered="true" style="border-radius: 5px">
      <a-grid :cols="2" :col-gap="12" class="grid-demo-grid">
        <a-grid-item class="demo-item">
          <a-form-item
            field="pid"
            label="构件一级分类名称"
            label-col-flex="130px"
            asterisk-position="end">
            <a-select v-model="formData.pid">
              <a-option
                v-for="(item, index) in treeList"
                :key="index"
                :value="item.id"
                :label="item.categoryName" />
            </a-select>
          </a-form-item>
        </a-grid-item>
        <a-grid-item class="demo-item">
          <a-form-item
            label="构件一级分类编码"
            label-col-flex="130px"
            asterisk-position="end"
            required>
            <a-input
              :model-value="treeList.find((item) => item.id === formData.pid)?.categoryCode"
              :readonly="true" />
          </a-form-item>
        </a-grid-item>
        <a-grid-item class="demo-item">
          <a-form-item
            field="categoryName"
            label="构件二级分类名称"
            label-col-flex="130px"
            asterisk-position="end">
            <a-input v-model="formData.categoryName" />
          </a-form-item>
        </a-grid-item>
        <a-grid-item class="demo-item">
          <formFlowCode
            ref="flowCodeRef"
            v-model="formData.categoryCode"
            :form-desc="{
              fieldCode: 'categoryCode',
              name: '构件二级分类编码',
              value: JSON.stringify({ prefix: 'N5', length: 4 }),
            }"
            label-col-flex="130px" />
        </a-grid-item>
        <a-grid-item class="demo-item">
          <a-form-item field="state" label="状态" label-col-flex="130px" asterisk-position="end">
            <a-select v-model="formData.state">
              <a-option :value="1" label="启用" />
              <a-option :value="0" label="停用" />
            </a-select>
          </a-form-item>
        </a-grid-item>
      </a-grid>
      <template #extra>
        <a-button size="mini" html-type="submit" :loading="loading" type="primary"> 保存 </a-button>
      </template>
    </a-card>
  </a-form>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import { Message } from '@arco-design/web-vue'
  import useLoading from '@/hooks/loading'
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
  })
  const formData = computed({
    get() {
      return props.modelValue
    },
    set(newValue) {
      emits('update:modelValue', newValue)
    },
  })
  const { loading, setLoading } = useLoading()
  const { treeList, getTreeList, addTreeNode, modifyTreeNode } = useTreeListController(
    props.categoryModule
  )
  const flowCodeRef = ref(null)
  const formRules = {
    pid: {
      required: true,
      message: '请选择',
    },
    categoryName: {
      required: true,
      message: '请输入',
    },
    valueType: {
      required: true,
      message: '请选择值类型',
    },
  }
  async function handleSubmit() {
    try {
      setLoading(true)
      if (formData.value.id) {
        await modifyTreeNode(formData.value)
      } else {
        await flowCodeRef.value.getFlowCode()
        const res: any = await addTreeNode(formData.value)
        formData.value.id = res.data
      }
      Message.success('保存成功')
    } catch (err) {
      // err
    } finally {
      setLoading(false)
    }
  }
  function init() {
    getTreeList()
  }
  init()
</script>
