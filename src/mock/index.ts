import Mock from 'mockjs'

import './user'
import './message-box'

import '@/views/dashboard/workplace/mock'
import '@/views/dictionary/dictionary-setting/mock'

Mock.setup({
  timeout: '600-1000',
})
