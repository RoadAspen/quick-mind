import type { Router } from 'vue-router';

/**
 * 权限守卫, 从本地存储中获取用户信息, 判断用户是否有权限访问当前路由
 */
export default function setupPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // pass
    next();
  });
}
