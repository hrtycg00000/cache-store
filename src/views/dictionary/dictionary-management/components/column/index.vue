<template>
  <a-table-column
    v-for="item in columnList"
    :key="item.id"
    :title="item.name"
    :data-index="item.fieldCode"
    tooltip
    ellipsis>
    <template
      v-if="[1, 2].includes(item.valueType) && item.fieldCode !== 'state'"
      #cell="{ record }">
      {{ renderEnum(record[item.fieldCode]) }}
    </template>
    <template v-else-if="item.fieldCode === 'state'" #cell="{ record }">
      {{ record.state === 1 ? '启用' : '禁用' }}
    </template>
  </a-table-column>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { cloneDeep } from 'lodash'
  import { isArray } from '@/utils/is'

  const props = defineProps({
    columnList: {
      type: Array<any>,
      default: () => [],
    },
  })
  const formatEnumVal = computed(() => {
    const arr = cloneDeep(props.columnList)
    arr.forEach((itemO) => {
      if ([1, 2].includes(itemO.valueType)) {
        const map = {}
        JSON.parse(itemO.value).forEach((itemI) => {
          Object.assign(map, { [itemI.code]: itemI.name })
        })
        itemO.value = map
      }
    })
    return arr
  })
  function renderEnum(val) {
    if (isArray(val)) {
      const arr = val.map((item) => item.name)
      return arr.join('；')
    }
    return val.name
  }
</script>
