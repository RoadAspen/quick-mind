/**
 * 路由守卫
 */
import { getToken } from '@/utils/auth';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import type { Router } from 'vue-router';
import { whiteList } from './routes';
NProgress.configure({ showSpinner: false });
/** 全局路由跳转钩子 */
function setupPageGuard(router: Router) {
  router.beforeEach(async (to, from) => {
    NProgress.start();
    // 避免 return 重复导航
    if (to.path === from.path) return;
    const token = getToken();
    // 已登录
    if (token) {
      // 如果是登录页面,则直接重新跳转到首页
      if (to.name === 'Login') {
        return '/home';
      }
    } else {
      // 如果未登录,且访问的 不是白名单,跳转到登录页面
      if (!whiteList.includes(to.path)) {
        return `/login?redirect=${to.path}`;
      }
    }
    return true;
  });
  router.afterEach(() => {
    NProgress.done();
  });
}

export default function createRouteGuard(router: Router) {
  setupPageGuard(router);
}
