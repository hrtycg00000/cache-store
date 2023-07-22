import { DEFAULT_LAYOUT } from '../base'
import { AppRouteRecordRaw } from '../types'

const STANDARD: AppRouteRecordRaw = {
  path: '/standard-manage',
  name: 'standardManage',
  component: DEFAULT_LAYOUT,
  meta: {
    name: 'K1标准管理',
    requiresAuth: true,
    icon: 'icon-book',
    order: 0,
  },
  children: [
    {
      path: 'n0',
      name: 'standardManageN0',
      component: () => import('@/views/standard-manage/n0/index.vue'),
      meta: {
        name: 'N0',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'n1',
      name: 'standardManageN1',
      component: () => import('@/views/standard-manage/n1/index.vue'),
      meta: {
        name: 'N1',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'n2',
      name: 'standardManageN2',
      component: () => import('@/views/standard-manage/n2/index.vue'),
      meta: {
        name: 'N2',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'n3',
      name: 'standardManageN3',
      component: () => import('@/views/standard-manage/n3/index.vue'),
      meta: {
        name: 'N3',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'n5',
      name: 'standardManageN5',
      component: () => import('@/views/standard-manage/n5/index.vue'),
      meta: {
        name: 'N5',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
}

export default STANDARD
