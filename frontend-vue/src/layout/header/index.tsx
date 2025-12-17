import { logoutRequest } from '@/api/login';
import AvatorImg from '@/assets/avator.png';
import IconExpand from '@/assets/header/icon-expand.svg';
import Screenfull from '@/components/Screenfull';
import { useThemeStore } from '@/store/theme';
import { removeToken } from '@/utils/auth';
import { LogoutOutlined } from '@ant-design/icons-vue';
import { useAsyncState } from '@vueuse/core';
import { Avatar, Dropdown, Menu, message } from 'ant-design-vue';
import classNames from 'classnames';
import { defineComponent } from 'vue';
import BreadCrumb from './BreadCrumb';
export default defineComponent({
  name: 'Header',
  setup() {
    const themeStore = useThemeStore();
    /** 登出 */
    const { execute: runLogout } = useAsyncState(logoutRequest, null, {
      immediate: false,
      onError: (e) => console.error('请求出错：', e),
      onSuccess: () => {
        removeToken();
        message.success('登出成功');
        window.location.href = '/login';
      }
    });
    const userMenu = (
      <Menu>
        <Menu.Item key="profile">
          <a href="/profile">个人中心</a>
        </Menu.Item>
        <Menu.Item key="logout" onClick={() => runLogout()}>
          <LogoutOutlined class="mr-2" />
          退出登录
        </Menu.Item>
      </Menu>
    );
    const themeMenu = (
      <Menu>
        <Menu.Item key="profile">
          <a href="/profile">个人中心</a>
        </Menu.Item>
      </Menu>
    );

    return () => (
      <header class="flex justify-between items-center h-[50px] flex-shrink-0  shadow-md">
        <div class="flex h-full items-center">
          <div
            class="cursor-pointer h-full  px-4 flex items-center justify-center mr-2"
            onClick={themeStore.switchCollapse}
          >
            <img
              src={IconExpand}
              class={classNames('transition-transform duration-500', {
                '[transform:rotateY(180deg)]': themeStore.isCollapse
              })}
            />
          </div>
          <BreadCrumb />
        </div>
        <div class="flex items-center h-full  space-x-4 pr-2">
          <Screenfull
            style={{
              'display': 'flex',
              'justify-content': 'center',
              'align-items': 'center'
            }}
          />
          <Dropdown overlay={userMenu}>
            <div class="flex items-center justify-center cursor-pointer mr-4">
              <Avatar src={AvatorImg} class="mr-1" />
              <span class="text-[14px] font-bold text-[#5a5e66]">捷智</span>
            </div>
          </Dropdown>
          <Dropdown overlay={themeMenu}>...</Dropdown>
        </div>
      </header>
    );
  }
});
