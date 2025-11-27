/**
 * 路由守卫
 */
import { getToken } from '@/utils/auth';
import NProgress from 'nprogress';
import type { Router } from 'vue-router';
import { whiteList } from './routes';
/** 全局路由跳转钩子 */
function setupPageGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const token = getToken();
    // 已登录
    if (token) {
      // 如果是登录页面,则直接重新跳转到首页
      if (to.path === 'login') {
        return next('/');
      }
      return next();
    }
    // 如果是白名单,则直接放行
    if (whiteList.includes(to.path)) {
      return next();
    }
    next(`/login?redirect=${to.path}`);
  });
  router.afterEach(() => {
    NProgress.done();
  });
}

export default function createRouteGuard(router: Router) {
  setupPageGuard(router);
}
