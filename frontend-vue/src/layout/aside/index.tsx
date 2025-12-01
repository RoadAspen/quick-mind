import Logo from '@/assets/logo.svg';
import { useThemeStore } from '@/store/theme';
import { Menu } from 'ant-design-vue';
import classNames from 'classnames';
import { defineComponent, ref, Transition, watch, type PropType } from 'vue';
import { RouterLink, useRoute, type RouteRecordRaw } from 'vue-router';

/**
 * Aside 组件
 */
export default defineComponent({
  name: 'Slider',
  props: {
    routes: {
      type: Array as PropType<RouteRecordRaw[]>,
      required: true
    }
  },
  setup(props) {
    const route = useRoute();
    const themeStore = useThemeStore();
    console.log(themeStore.theme);

    // 选中和展开的菜单项
    const selectedKeys = ref<string[]>([route.path]);
    const openKeys = ref<string[]>([]);
    // 递归渲染菜单项
    const renderMenuItems = (routes: RouteRecordRaw[], prevPath: string) => {
      // console.log(routes);

      return routes.map((route) => {
        const fullPath =
          `${prevPath !== '/' ? prevPath : ''}/${route.path}`.replace(
            '//',
            '/'
          ); // 避免重复斜杠
        if (route.children && route.children.length > 0) {
          // 渲染有子菜单的菜单项
          return (
            <Menu.SubMenu key={fullPath} title={route.meta?.title}>
              {renderMenuItems(route.children, fullPath)}
            </Menu.SubMenu>
          );
        } else {
          // 渲染没有子菜单的菜单项
          return (
            <Menu.Item key={fullPath}>
              <RouterLink to={fullPath}>{route.meta?.title}</RouterLink>
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
      <aside
        class={classNames('slider-container w-40 flex-shrink-0', {
          'w-[200px]': !themeStore.isCollapse,
          'w-[80px]': themeStore.isCollapse
        })}
      >
        <div
          class="relative w-full h-[50px] bg-[#001529] text-center overflow-hidden"
          style={{ transition: 'width 3s cubic-bezier(0.2, 0, 0, 1) 0s' }}
        >
          <a
            href="/"
            class="flex w-full h-full overflow-hidden cursor-pointer justify-center items-center"
          >
            <img
              key={1}
              class={classNames('size-8 inline-block align-middle', {
                'mr-2': !themeStore.isCollapse
              })}
              src={Logo}
            />

            <Transition
              enter-active-class="transition-opacity duration-1000 delay-[100ms]"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
            >
              {!themeStore.isCollapse && (
                <h1 class="m-0 inline-block align-middle text-[14px]/[50px] text-white font-semibold">
                  捷智管理系统
                </h1>
              )}
            </Transition>
          </a>
        </div>
        <Menu
          class="h-full"
          selectedKeys={selectedKeys.value}
          openKeys={openKeys.value}
          mode="inline"
          theme={themeStore.theme}
          inline-collapsed={themeStore.isCollapse}
        >
          {renderMenuItems(props.routes, '/')}
        </Menu>
      </aside>
    );
  }
});
