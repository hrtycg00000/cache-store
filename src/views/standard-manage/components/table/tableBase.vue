<template>
  <a-table
    class="table-container"
    row-key="dictTypeId"
    size="small"
    :loading="loading"
    :data="listDataFormat"
    :pagination="false"
    :bordered="true"
    :scroll="{ y: '85%' }"
    :scrollbar="true">
    <template #columns>
      <a-table-column title="状态" data-index="state" :width="60">
        <template #cell="{ record }">
          {{ record.state ? '启用' : '禁用' }}
        </template>
      </a-table-column>
      <a-table-column title="参数项编码" data-index="code" ellipsis />
      <a-table-column title="参数项名称" data-index="name" ellipsis />
      <a-table-column title="值类型" data-index="valueType" :width="100">
        <template #cell="{ record }">
          {{ valueTypeMap[record.valueType] }}
        </template>
      </a-table-column>
      <a-table-column title="是否必填" data-index="isRequire" :width="100">
        <template #cell="{ record }">
          {{ record.isRequire ? '是' : '否' }}
        </template>
      </a-table-column>
      <a-table-column title="参数值" data-index="value" tooltip ellipsis>
        <template #cell="{ record }">
          <template v-if="[1, 2].includes(record.valueType)">
            {{ enumsFormat(record.value.enumList) }}
          </template>
          <template v-if="record.valueType === 3">
            {{ inputFormat(record.value) }}
          </template>
          <template v-if="record.valueType === 5">
            {{ flowFormat(record.value) }}
          </template>
          <template v-if="record.valueType === 6">
            {{ numberFormat(record.value) }}
          </template>
          <template v-if="record.valueType === 7">
            {{ record.value.value }}
          </template>
        </template>
      </a-table-column>
      <a-table-column title="单位" data-index="unit" :width="80" />
      <a-table-column title="实例/类型" data-index="dataType" :width="100">
        <template #cell="{ record }">
          {{ record.dataType === 1 ? '实例' : '类型' }}
        </template>
      </a-table-column>
      <a-table-column
        v-if="hasParamGroup"
        title="参数项分组"
        data-index="paramGroup"
        :width="120" />
      <a-table-column title="操作" align="center" :width="130">
        <template #cell="{ record }">
          <a-space>
            <a-popconfirm
              content="确认删除该属性么？"
              type="warning"
              @before-ok="handleDelete(record.id, $event)">
              <a-button size="mini" type="text">删除</a-button>
            </a-popconfirm>
            <a-button size="mini" type="text" @click="handleOpenModal(record)">编辑</a-button>
          </a-space>
        </template>
      </a-table-column>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { cloneDeep } from 'lodash'
  import { deleteBusinessParamApi } from '@/api/standardManage'

  const emits = defineEmits(['refresh', 'openModal'])
  const props = defineProps({
    loading: Boolean,
    listData: {
      type: Array<any>,
      default: () => [],
    },
    hasParamGroup: {
      type: Boolean,
      default: false,
    },
  })
  const valueTypeMap = {
    1: '枚举单选',
    2: '枚举多选',
    3: '文本输入',
    4: '范围输入',
    5: '流水码',
    6: '数值输入',
    7: '管控',
  }
  const listDataFormat = computed(() => {
    const arr = cloneDeep(props.listData)
    arr.forEach((item) => {
      if ([1, 2, 3, 5, 6, 7].includes(item.valueType)) {
        item.value = JSON.parse(item.value)
      } else {
        item.value = null
      }
    })
    return arr
  })
  function enumsFormat(list: Array<any>) {
    const arr = list.map((item) => item.name)
    return arr.join('；')
  }
  function inputFormat(value) {
    const str = `${value.isTextarea ? '多行' : '单行'}文本；${value.placeholder && '输入提示：'}${
      value.placeholder
    }`
    return str
  }
  function flowFormat(value) {
    const str = `${value.prefix} - ${value.length}位`
    return str
  }
  function numberFormat(value) {
    let str = `${value.isInteger ? '整数' : '小数'}；`
    if (!value.isInteger) {
      str += `精度：${value.precision}位；`
    }
    if (value.hasRange) {
      str += `输入范围：${value.min}~${value.max}；`
    }
    return str
  }
  async function handleDelete(id, done) {
    try {
      await deleteBusinessParamApi({ id })
      emits('refresh')
      done()
    } catch (err) {
      done(false)
    }
  }
  function handleOpenModal(itemData) {
    emits('openModal', itemData)
  }
</script>
