/** 全部路由 */
import PageLayout from '@/layout/PageLayout';
import type { RouteRecordRaw } from 'vue-router';

export const whiteRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/registry',
    name: 'Registry',
    component: () => import('@/views/login/Registry')
  }
];
/** 白名单 */
export const whiteList = whiteRoutes.map((route) => route.path);

export const adminRoutes: Array<RouteRecordRaw & { meta: { title: string } }> =
  [
    {
      path: '/home',
      component: () => import('@/views/home'),
      meta: {
        title: '运营数据'
      }
    },
    {
      path: '/system',
      redirect: 'user',
      meta: { title: '系统管理' },
      children: [
        {
          path: 'user',
          component: () => import('@/views/system/user'),
          meta: {
            title: '用户管理'
          }
        },
        {
          path: 'role',
          component: () => import('@/views/system/role'),
          meta: {
            title: '角色管理'
          }
        },
        {
          path: 'menu',
          component: () => import('@/views/system/role'),
          meta: {
            title: '菜单管理'
          }
        },
        {
          path: 'dept',
          component: () => import('@/views/system/role'),
          meta: {
            title: '部门管理'
          }
        },
        {
          path: 'post',
          component: () => import('@/views/system/role'),
          meta: {
            title: '岗位管理'
          }
        },
        {
          path: 'dict',
          component: () => import('@/views/system/role'),
          meta: {
            title: '字典管理'
          }
        },
        {
          path: 'config',
          component: () => import('@/views/system/role'),
          meta: {
            title: '参数设置'
          }
        },
        {
          path: 'notice',
          component: () => import('@/views/system/role'),
          meta: {
            title: '通知公告'
          }
        },
        {
          path: 'log',
          meta: {
            title: '日志管理'
          },
          children: [
            {
              path: 'operlog',
              component: () => import('@/views/system/role'),
              meta: {
                title: '操作日志'
              }
            },
            {
              path: 'logininfor',
              component: () => import('@/views/system/role'),
              meta: {
                title: '登录日志'
              }
            }
          ]
        }
      ]
    },
    {
      path: '/monitor',
      redirect: 'online',
      meta: { title: '系统监控' },
      children: [
        {
          path: 'online',
          component: () => import('@/views/system/user'),
          meta: {
            title: '在线用户'
          }
        },
        {
          path: 'job',
          component: () => import('@/views/system/role'),
          meta: {
            title: '定时任务'
          }
        },
        {
          path: 'druid',
          component: () => import('@/views/system/role'),
          meta: {
            title: '数据监控'
          }
        },
        {
          path: 'server',
          component: () => import('@/views/system/role'),
          meta: {
            title: '服务监控'
          }
        },
        {
          path: 'cache',
          component: () => import('@/views/system/role'),
          meta: {
            title: '缓存监控'
          }
        },
        {
          path: 'cacheList',
          component: () => import('@/views/system/role'),
          meta: {
            title: '缓存列表'
          }
        }
      ]
    },
    {
      path: '/tool',
      redirect: 'build',
      meta: { title: '系统工具' },
      children: [
        {
          path: 'build',
          component: () => import('@/views/system/user'),
          meta: {
            title: '表单构建'
          }
        },
        {
          path: 'generate',
          component: () => import('@/views/system/role'),
          meta: {
            title: '代码生成'
          }
        },
        {
          path: 'swagger',
          component: () => import('@/views/system/role'),
          meta: {
            title: '系统接口'
          }
        }
      ]
    }
  ];

const routes: Array<RouteRecordRaw & { meta?: { title?: string } }> = [
  ...whiteRoutes,
  ...[
    {
      path: '/', // 根路径
      redirect: '/home', // 默认打开 /home
      component: PageLayout, // 统一布局
      children: adminRoutes
    }
  ]
];

export default routes;
