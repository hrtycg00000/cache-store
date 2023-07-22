<template>
  <a-upload
    class="upload-container"
    style="height: 180px; width: 180px"
    v-bind="$attrs"
    list-type="picture-card"
    image-preview
    :action="actionUrl"
    :file-list="file ? [file] : []"
    :limit="1"
    @change="onChange"
    @success="onSuccess"
    @error="onError">
    <!-- <template #upload-button>
        <div :class="`arco-upload-list-item`">
          <div v-if="file && file.url" class="arco-upload-list-picture custom-upload-avatar">
            <img :src="file.url" />
            <div class="arco-upload-list-picture-mask">
              <IconEdit />
            </div>
            <a-progress
              v-if="file.status === 'uploading' && file.percent < 100"
              :percent="file.percent"
              type="circle"
              size="mini"
              style="
                position: absolute,
                left: 50%,
                top: 50%,
                transform: translateX(-50%) translateY(-50%),
              " />
          </div>
          <div v-else class="arco-upload-picture-card">
            <div class="arco-upload-picture-card-text">
              <IconPlus />
              <div style="margin-top: 10px; font-weight: 600">上传图片</div>
            </div>
          </div>
        </div>
      </template> -->
  </a-upload>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { Message } from '@arco-design/web-vue'

  const emits = defineEmits(['update:modelValue'])
  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
  })
  const actionUrl = `${import.meta.env.VITE_API_BASE_URL}/common/image/upload`
  const file: any = computed(() => {
    return props.modelValue ? { url: props.modelValue } : null
  })
  const onChange = (fileList) => {
    if (!fileList.length) {
      emits('update:modelValue', '')
    }
  }
  const onSuccess = (currentFile) => {
    emits('update:modelValue', currentFile.response.data)
  }
  const onError = () => {
    Message.error('上传失败，请重试')
  }
</script>

<style scoped lang="less">
  .upload-container {
    display: block;
    justify-content: unset;
    ::v-deep(.arco-upload-list-type-picture-card) {
      height: 100%;
      .arco-upload-type-picture-card {
        flex: 1;
        .arco-upload-picture-card {
          flex: 1;
          height: 100%;
        }
      }
      .arco-upload-list-picture {
        margin: 0;
        flex: 1;
        height: 100%;
        img {
          object-fit: cover;
        }
        .arco-upload-list-picture-mask {
          display: flex;
          align-items: center;
          .arco-upload-list-picture-operation {
            flex: 1;
          }
        }
      }
    }
  }
</style>
