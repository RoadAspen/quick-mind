import Logo from '@/assets/logo.png';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons-vue';
import { Dropdown, Menu } from 'ant-design-vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
  setup() {
    const handleLogout = () => {
      console.log('退出登录');
      // 这里可以添加退出登录逻辑，如清除 token，跳转到登录页
    };

    const menu = (
      <Menu>
        <Menu.Item key="profile">
          <a href="/profile">个人中心</a>
        </Menu.Item>
        <Menu.Item key="logout" onClick={handleLogout}>
          <LogoutOutlined class="mr-2" />
          退出登录
        </Menu.Item>
      </Menu>
    );

    return () => (
      <header class="flex justify-between items-center h-14 flex-shrink-0 px-6 bg-gray-800 text-white shadow-md">
        {/* 左侧 Logo / 标题 */}
        <div class="text-lg font-bold">
          <img class="w-8 h-8 inline-block" src={Logo} />
          運營管理系统
        </div>

        {/* 右侧 用户信息 / 操作 */}
        <div class="flex items-center space-x-4">
          <Dropdown overlay={menu}>
            <div class="flex items-center cursor-pointer">
              <UserOutlined class="mr-2" />
              <span>管理员</span>
            </div>
          </Dropdown>
        </div>
      </header>
    );
  }
});
