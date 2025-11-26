import { RouteRecordRaw } from 'vue-router';

export const whiteList = ['/login', '/register', '/about'];

export const whiteRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/Login'),
    meta: {
      requiresAuth: false
    }
  }
];
