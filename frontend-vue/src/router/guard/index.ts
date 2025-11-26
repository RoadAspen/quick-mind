/**
 * 路由守卫
 */
import type { Router } from 'vue-router';

/** 全局路由跳转钩子 */
function setupPageGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // emit route change
    // setRouteEmitter(to);
    next();
  });
}

export default function createRouteGuard(router: Router) {
  setupPageGuard(router);
}
