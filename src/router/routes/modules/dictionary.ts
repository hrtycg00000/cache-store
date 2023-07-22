import { DEFAULT_LAYOUT } from '../base'
import { AppRouteRecordRaw } from '../types'

const DICTIONARY: AppRouteRecordRaw = {
  path: '/dictionary',
  name: 'dictionary',
  component: DEFAULT_LAYOUT,
  meta: {
    name: '字典',
    requiresAuth: true,
    icon: 'icon-book',
    order: 0,
  },
  children: [
    {
      path: 'dictionarySetting',
      name: 'dictionarySetting',
      component: () => import('@/views/dictionary/dictionary-setting/index.vue'),
      meta: {
        name: '字典设置',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'dictionaryManagement',
      name: 'dictionaryManagement',
      component: () => import('@/views/dictionary/dictionary-management/index.vue'),
      meta: {
        name: '字典管理',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
}

export default DICTIONARY
