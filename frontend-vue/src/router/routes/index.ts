import type { RouteRecordRaw } from 'vue-router';
import { whiteRoutes } from '../whiteList';

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'ICoderStats',
    component: () => import('@/views/stats'),
    meta: {
      name: '运营数据'
    }
  }
];

const routes = [...whiteRoutes, ...adminRoutes];

export default routes;
