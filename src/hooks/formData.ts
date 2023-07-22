import { reactive } from 'vue'

export default function useFormData(formItemList, keyName = 'fieldCode', valName = 'value') {
  const formData: any = reactive({})
  function formatValue(item) {
    const map = {
      1: null,
      2: [],
      3: '',
      4: ' ~ ',
      5: '',
      6: null,
      7: JSON.parse(item[valName])?.value,
    }
    return map[item.valueType ?? item.paramType]
  }
  formItemList.forEach((item) => {
    Object.assign(formData, {
      [item[keyName]]: formatValue(item),
    })
  })
  return {
    formData,
  }
}
