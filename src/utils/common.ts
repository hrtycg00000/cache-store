export function initJsonValue(formItemList, keyName = 'fieldCode', valName = 'value') {
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
  return formItemList.map((item) => {
    return {
      code: item.code,
      fieldCode: item[keyName],
      value: formatValue(item),
    }
  })
}
export function initJsonValueModify(
  formItemList,
  formDataList,
  keyName = 'fieldCode',
  valName = 'value'
) {
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
  return formItemList.map((item, index) => {
    if (formDataList[index]) {
      formDataList[index].value = JSON.parse(formDataList[index].value)
      return formDataList[index]
    }
    return {
      code: item.code,
      fieldCode: item[keyName],
      value: formatValue(item),
    }
  })
}
export function stringifyJsonValue(jsonValue = {}) {
  Object.keys(jsonValue).forEach((key) => {
    if (jsonValue[key].length > 0) {
      jsonValue[key].forEach((item) => {
        item.value = JSON.stringify(item.value)
      })
    }
  })
}
