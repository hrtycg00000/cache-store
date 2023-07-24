import Mock from 'mockjs'
import setupMock, { successResponseWrap } from '@/utils/setup-mock'
import { GetParams } from '@/types/global'
import qs from 'query-string'

const list = {
  1: [
    {
      fieldCode: 'width',
      code: 'AT00001',
      valueType: 1,
      value:
        '{"enumSource":1,"dicTypeId":null,"module":null,"enumList":[{"name":"1","code":"1"},{"name":"2","code":"2"}]}',
      name: '宽度',
      isRequire: 1,
    },
  ],
  2: [
    {
      fieldCode: 'width',
      code: 'AT00001',
      valueType: 3,
      value: '{"placeholder":"","isTextarea":0}',
      name: '宽度',
      isRequire: 1,
    },
  ],
  3: [
    {
      fieldCode: 'width',
      code: 'AT00001',
      valueType: 6,
      value: '{"hasRange":0,"min":null,"max":null,"isInteger":1,"precision":null}',
      name: '宽度',
      isRequire: 1,
    },
  ],
}

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
    Mock.mock(new RegExp('/business_param/list'), (params) => {
      console.log(params);
      const { module } = JSON.parse(params.body)
      return successResponseWrap(list[module])
    })
    Mock.mock(new RegExp('/component/list'), () => {
      return successResponseWrap({
        data: [
          {
            dbId: 1,
            tribeCode: 'AT00001',
            name: '安心',
          },
          {
            dbId: 2,
            tribeCode: 'AT00002',
            name: '安心1',
          },
          {
            dbId: 3,
            tribeCode: 'AT00003',
            name: '安心2',
          },
        ],
        total: 3,
      })
    })
    Mock.mock(new RegExp('/component/relation/list'), () => {
      return successResponseWrap([
        {
          mainTribeName: '一级',
          secTribeName: '二级',
          childTribeCode: 'EL.0002',
          childComponentName: 'test',
          ueSelect: 0,
        },
        {
          mainTribeName: '一级',
          secTribeName: '二级',
          childTribeCode: 'EL.0003',
          childComponentName: 'test',
          ueSelect: 0,
        },
        {
          mainTribeName: '一级',
          secTribeName: '二级',
          childTribeCode: 'EL.0004',
          childComponentName: 'test',
          ueSelect: 0,
        },
        {
          mainTribeName: '一级',
          secTribeName: '二级',
          childTribeCode: 'EL.0005',
          childComponentName: 'test',
          ueSelect: 0,
        },
      ])
    })
    Mock.mock(new RegExp('/component/relation_params/list'), () => {
      return successResponseWrap([
        {
          id: 1,
          thirdCategoryName: '窗',
          thirdCategoryCode: 'EL.0002',
          children: [
            {
              paramName: '窗框型号',
              valueType: 1,
              value:
                '{"enumSource":1,"dicTypeId":null,"module":null,"enumList":[{"name":"70","code":"70"},{"name":"90","code":"90"},{"name":"110","code":"110"}]}',
              jsonValue: '',
            },
            {
              paramName: '玻璃型号',
              valueType: 3,
              value: '{"placeholder":"","isTextarea":0}',
              jsonValue: '',
            },
            {
              paramName: '窗框型号',
              valueType: 2,
              value:
                '{"enumSource":1,"dicTypeId":null,"module":null,"enumList":[{"name":"70","code":"70"},{"name":"90","code":"90"},{"name":"110","code":"110"}]}',
              jsonValue: '',
            },
            {
              paramName: '宽度',
              valueType: 6,
              value: '{"hasRange":1,"min":1000,"max":2000,"isInteger":1,"precision":null}',
              jsonValue: '',
            },
          ],
        },
      ])
    })
    Mock.mock(new RegExp('/component/relation_goods/list'), () => {
      return successResponseWrap([
        {
          id: 1,
          thirdCategoryName: '窗',
          thirdCategoryCode: 'EL.0002',
          ueStage: 'UE',
          children: [
            {
              paramName: '窗框型号',
              valueType: 1,
              value:
                '{"enumSource":1,"dicTypeId":null,"module":null,"enumList":[{"name":"70","code":"70"},{"name":"90","code":"90"},{"name":"110","code":"110"}]}',
              jsonValue: 'AT0002',
            },
            {
              paramName: '玻璃型号',
              valueType: 3,
              value: '{"placeholder":"","isTextarea":0}',
              jsonValue: 'AT0002',
            },
            {
              paramName: '窗框型号',
              valueType: 2,
              value:
                '{"enumSource":1,"dicTypeId":null,"module":null,"enumList":[{"name":"70","code":"70"},{"name":"90","code":"90"},{"name":"110","code":"110"}]}',
              jsonValue: 'AT0002',
            },
            {
              paramName: '宽度',
              valueType: 6,
              value: '{"hasRange":1,"min":1000,"max":2000,"isInteger":1,"precision":null}',
              jsonValue: 'AT0002',
            },
          ],
        },
      ])
    })
    Mock.mock(new RegExp('/component/queryCommodityManagementUeModel'), () => {
      return successResponseWrap([
        {
          id: 1,
          threeCommodityName: '窗',
          threeCommodityCode: 'N7001',
          componentAttbuteDataRspList: [
            {
              tribeName: '窗框型号',
              tribeCode: 'EL.0002',
              paramValueString: '执手形状',
              paramValueList: [
                {
                  paramValue: '香槟弧形',
                  ueModelUrl: null,
                },
              ],
            },
            {
              tribeName: '玻璃型号',
              tribeCode: 'EL.0003',
              paramValueString: '执手颜色',
              children: [
                {
                  paramValue: '香槟弧形',
                  ueModelUrl: null,
                },
              ],
            },
          ],
        },
      ])
    })
  },
})
