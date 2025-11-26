import { Menu } from 'ant-design-vue';
import { defineComponent, ref, watch, type PropType } from 'vue';

import { RouterLink, useRoute, type RouteRecordRaw } from 'vue-router';
/**
 * Aside 组件
 */
export default defineComponent({
  name: 'Aside',
  props: {
    routes: {
      type: Array as PropType<RouteRecordRaw[]>,
      required: true
    }
  },
  setup(props) {
    const route = useRoute();

    // 选中和展开的菜单项
    const selectedKeys = ref<string[]>([route.path]);
    const openKeys = ref<string[]>([]);
    // 递归渲染菜单项
    const renderMenuItems = (routes: RouteRecordRaw[], prevPath: string) => {
      return routes.map((route) => {
        const fullPath = `${prevPath}/${route.path}`.replace('//', '/'); // 避免重复斜杠
        if (route.children && route.children.length > 0) {
          // 渲染有子菜单的菜单项
          return (
            <Menu.SubMenu key={fullPath} title={route.meta?.name}>
              {renderMenuItems(route.children, fullPath)}
            </Menu.SubMenu>
          );
        } else {
          // 渲染没有子菜单的菜单项
          return (
            <Menu.Item key={fullPath}>
              <RouterLink to={fullPath}>{route.meta?.name}</RouterLink>
            </Menu.Item>
          );
        }
      });
    };
    // 监听路由变化，更新选中的菜单项
    watch(
      () => route.path,
      (newPath) => {
        selectedKeys.value = [newPath];
        // 自动展开包含当前路径的所有父级菜单
        const pathSegments = newPath.split('/').filter(Boolean);
        openKeys.value = pathSegments
          .map((_, index) => `/${pathSegments.slice(0, index + 1).join('/')}`)
          .filter((path) => path !== newPath); // 过滤掉当前选中的路径，防止重复
      },
      { immediate: true }
    );
    return () => (
      <div class="w-40 flex-shrink-0  pt-2 bg-black">
        <Menu
          class="h-full"
          selectedKeys={selectedKeys.value}
          openKeys={openKeys.value}
          mode="inline"
          theme="dark"
        >
          {renderMenuItems(props.routes, '/admin')}
        </Menu>
      </div>
    );
  }
});
