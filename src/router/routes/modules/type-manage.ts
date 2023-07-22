import { DEFAULT_LAYOUT } from '../base'
import { AppRouteRecordRaw } from '../types'

const STANDARD: AppRouteRecordRaw = {
  path: '/type-manage',
  name: 'typeManage',
  component: DEFAULT_LAYOUT,
  meta: {
    name: 'K2类型管理',
    requiresAuth: true,
    icon: 'icon-book',
    order: 0,
  },
  children: [
    {
      path: 'n0',
      name: 'typeManageN0',
      component: () => import('@/views/type-manage/n0/index.vue'),
      meta: {
        name: 'N0',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'n1',
      name: 'typeManageN1',
      component: () => import('@/views/type-manage/n1/index.vue'),
      meta: {
        name: 'N1',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'n2',
      name: 'typeManageN2',
      component: () => import('@/views/type-manage/n2/index.vue'),
      meta: {
        name: 'N2',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'n3',
      name: 'typeManageN3',
      component: () => import('@/views/type-manage/n3/index.vue'),
      meta: {
        name: 'N3',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'n5',
      name: 'typeManageN5',
      component: () => import('@/views/type-manage/n5/index.vue'),
      meta: {
        name: 'N5',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
}

export default STANDARD
