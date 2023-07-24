<template>
  <a-layout>
    <a-layout-content>
      <EditBaseInfo
        ref="baseInfoRef"
        v-model="baseFormData"
        :first-node-id="secNodeData.pid"
        :category-module="categoryModule"
        :disable-shared="activeKey === 2" />
      <a-spin :loading="loading" style="width: 100%">
        <a-tabs v-model:active-key="activeKey" size="small" type="line" animation>
          <a-tab-pane :key="1" title="参数维护">
            <EditGroupList
              v-if="activeKey === 1"
              ref="groupInfoRef"
              v-model="baseFormData.jsonValue"
              :category-module="categoryModule"
              :group-list-data="{
                baseListData,
                geometryListData,
                materialListData,
              }" />
          </a-tab-pane>
          <a-tab-pane
            v-if="baseFormData.shared && baseFormData.tribeCode"
            :key="2"
            title="嵌套共享">
            <EditRelationInfo
              v-if="baseFormData.shared && activeKey === 2"
              :main-tribe-code="baseFormData.tribeCode" />
          </a-tab-pane>
          <a-tab-pane :key="3" title="关联N7参数值">
            <EditRelationParams v-if="activeKey === 3" :main-tribe-code="baseFormData.tribeCode" />
          </a-tab-pane>
          <a-tab-pane :key="4" title="关联UE材质">
            <EditRelationUEMaterial
              v-if="activeKey === 4"
              :main-tribe-code="baseFormData.tribeCode" />
          </a-tab-pane>
          <a-tab-pane :key="5" title="关联UE模型">
            <EditRelationUEModel v-if="activeKey === 5" :main-tribe-code="baseFormData.tribeCode" />
          </a-tab-pane>
        </a-tabs>
      </a-spin>
    </a-layout-content>
    <a-layout-sider style="margin-left: 12px; width: 250px; box-shadow: none">
      <a-card title="图片" :bordered="true" style="border-radius: 5px">
        <ImgUpload v-model="baseFormData.image" style="width: 216px; height: 100px" />
      </a-card>
    </a-layout-sider>
  </a-layout>
  <a-button
    class="global-save"
    size="mini"
    :loading="loading"
    type="primary"
    @click="handleGlobalSave">
    保存基础信息与族参数
  </a-button>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import { cloneDeep } from 'lodash'
  import { Message } from '@arco-design/web-vue'
  import { initJsonValue, initJsonValueModify, stringifyJsonValue } from '@/utils/common'
  import { getBusinessParamListApi } from '@/api/standardManage'
  import { addComponentApi, updateComponentApi } from '@/api/typeManage'
  import useGetList from '@/views/standard-manage/hooks/getList'
  import useLoading from '@/hooks/loading'
  import ImgUpload from '@/components/upload/img-upload.vue'
  import EditBaseInfo from '../form/editBaseInfo.vue'
  import EditGroupList from '../form/editGroupList.vue'
  import EditRelationInfo from '../form/editRelationInfo.vue'
  import EditRelationParams from '../form/editRelationParams.vue'
  import EditRelationUEMaterial from '../form/editRelationUEMaterial.vue'
  import EditRelationUEModel from '../form/editRelationUEModel.vue'

  interface valueType {
    id: string | number
    categoryId: string | number
    state: string | number
    tribeCode: string
    name: string
    image: string
    attachment: string
    shared: number
    jsonValue: {
      groupBaseData: []
      groupGeometryData: []
      groupMaterialData: []
    }
  }
  const props = defineProps({
    secNodeData: {
      type: Object,
      default: () => ({}),
    },
    categoryModule: {
      type: Number,
      default: 0,
    },
  })
  const { loading, setLoading } = useLoading()
  const baseInfoRef = ref(null)
  const groupInfoRef = ref(null)
  const activeKey = ref(1)
  const baseFormData: valueType = reactive({
    id: null,
    categoryId: props.secNodeData.id,
    state: null,
    tribeCode: '',
    name: '',
    image: '',
    attachment: '',
    shared: 0,
    jsonValue: {
      groupBaseData: [],
      groupGeometryData: [],
      groupMaterialData: [],
    },
  })
  const {
    baseListData,
    geometryListData,
    materialListData,
    getBaseListData,
    getGeometryListData,
    getMaterialListData,
  } = useGetList(getBusinessParamListApi, {
    module: props.categoryModule,
    categoryId: props.secNodeData.id,
  })
  function getList() {
    Promise.all([getBaseListData(), getGeometryListData(), getMaterialListData()]).then(() => {
      if (!baseFormData.id) {
        baseFormData.jsonValue.groupBaseData = initJsonValue(baseListData.value)
        baseFormData.jsonValue.groupGeometryData = initJsonValue(geometryListData.value)
        baseFormData.jsonValue.groupMaterialData = initJsonValue(materialListData.value)
      } else {
        baseFormData.jsonValue.groupBaseData = initJsonValueModify(
          baseListData.value,
          baseFormData.jsonValue.groupBaseData
        )
        baseFormData.jsonValue.groupGeometryData = initJsonValueModify(
          geometryListData.value,
          baseFormData.jsonValue.groupGeometryData
        )
        baseFormData.jsonValue.groupMaterialData = initJsonValueModify(
          materialListData.value,
          baseFormData.jsonValue.groupMaterialData
        )
      }
    })
  }
  function setBaseInfoForm(data) {
    Object.assign(baseFormData, data)
  }
  async function handleGlobalSave() {
    try {
      setLoading(true)
      await groupInfoRef.value.validateForm()
      await baseInfoRef.value.validateForm()
      const body: any = cloneDeep(baseFormData)
      stringifyJsonValue(body.jsonValue)
      body.jsonValue = JSON.stringify({
        name: baseFormData.name,
        shared: baseFormData.shared,
        tribeCode: baseFormData.tribeCode,
        image: baseFormData.image,
        attachment: baseFormData.attachment,
        ...body.jsonValue,
      })
      if (body.id) {
        await updateComponentApi(body)
      } else {
        await addComponentApi(body)
      }
      Message.success('保存成功')
    } catch (error) {
      // err
    } finally {
      setLoading(false)
    }
  }
  getList()
  defineExpose({
    setBaseInfoForm,
  })
</script>

<style scoped lang="less">
  .global-save {
    position: absolute;
    right: 33px;
    top: 23px;
  }
</style>
