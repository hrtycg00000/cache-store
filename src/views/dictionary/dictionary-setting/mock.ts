import Mock from 'mockjs'
import setupMock, { successResponseWrap } from '@/utils/setup-mock'
import { GetParams } from '@/types/global'
import qs from 'query-string'

const dictionaryList = [
  {
    name: '参数字典',
    id: 1,
  },
  {
    name: '角色字典',
    id: 2,
  },
  {
    name: '地点字典',
    id: 3,
  },
  {
    name: '品牌字典',
    id: 4,
  },
  {
    name: '供应商字典',
    id: 5,
  },
  {
    name: '材料类别字典',
    id: 6,
  },
]

const data = Mock.mock({
  'list|55': [
    {
      'dictTypeId|8': /[A-Z][a-z][-][0-9]/,
      'name|4-8': /[A-Z]/,
      'fieldCode|4-8': /[A-Z]/,
      'valueType|1': [1, 2, 3, 4, 5],
      'isRequire|1': [0, 1],
      'value|4-8': /[A-Z]/,
    },
  ],
})
setupMock({
  setup() {
    Mock.mock(new RegExp('/api/dictionary/list'), () => {
      return successResponseWrap([...dictionaryList])
    })
    // Mock.mock(new RegExp('/api/popular/list'), (params: GetParams) => {
    //   const { type = 'text' } = qs.parseUrl(params.url).query
    //   if (type === 'image') {
    //     return successResponseWrap([...videoList])
    //   }
    //   if (type === 'video') {
    //     return successResponseWrap([...imageList])
    //   }
    //   return successResponseWrap([...textList])
    // })
    Mock.mock(new RegExp('/api/dictionary/header/list'), (params: GetParams) => {
      const { current = 1, pageSize = 10 } = qs.parseUrl(params.url).query
      const p = current as number
      const ps = pageSize as number
      return successResponseWrap({
        list: data.list.slice((p - 1) * ps, p * ps),
        total: 55,
      })
    })
  },
})
