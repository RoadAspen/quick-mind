/** 用户列表 */
import {
  addUser,
  getUserList as fetchUsers,
  getAllPluginVersions,
  toggleUserStatus,
  updateUser,
  type User
} from '@/api/icoder';
import { message } from 'ant-design-vue';
import { defineStore } from 'pinia';
import { reactive, ref, type Reactive, type Ref } from 'vue';

interface Filters {
  emp_no?: string;
  site?: string;
  dept?: string;
  fun_div?: string;
  del_flag?: 0 | 1;
  plugin_version?: string[];
}

export const useUserStore = defineStore('user', () => {
  const userList: Ref<User[]> = ref([]);
  const pluginVersionList: Ref<string[]> = ref([]);
  const total: Ref<number> = ref(0);
  const pagination = reactive({ current: 1, pageSize: 10, total: 0 });
  const filters: Reactive<Filters> = reactive({
    emp_no: undefined,
    site: undefined,
    dept: undefined,
    fun_div: undefined,
    del_flag: undefined,
    plugin_version: []
  });
  /** 修改筛选项 */
  const changeFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    filters[key] = value;
  };

  /** 获取所有插件版本列表 */
  const getPluginVersionList = async () => {
    try {
      const { result } = await getAllPluginVersions();
      pluginVersionList.value = result;
    } catch (error) {
      console.error('Failed to fetch plugin versions', error);
    }
  };

  /** 请求 */
  const getUserList = async (params?: { page: number }) => {
    if (params) {
      pagination.current = params.page;
    }
    try {
      const data = await fetchUsers({
        page: pagination.current,
        page_size: pagination.pageSize,
        ...filters
      });
      userList.value = data.result;
      total.value = data.total;
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  const createUser = async (userData: { emp_no: string; emp_ip: string[] }) => {
    try {
      await addUser(userData);
      message.success('User created successfully');
    } catch (error: any) {
      console.error('Failed to create user', error);
      message.error(error.message);
    }
  };

  const updateUserInfo = async (userData: {
    emp_no: string;
    emp_ip: string[];
  }) => {
    try {
      await updateUser(userData);
      message.success('User updated successfully');
      await getUserList();
    } catch (error) {
      message.error('Failed to update user');
      console.error('Failed to update user', error);
    }
  };

  const changeUserStatus = async (emp_no: string, del_flag: number) => {
    try {
      await toggleUserStatus(emp_no, del_flag);
      message.success(`用户账号 ${del_flag ? '停用' : '启用'} 成功`);
      await getUserList();
    } catch (error) {
      console.error('toggle user status failed', error);
    }
  };

  return {
    userList,
    total,
    pagination,
    filters,
    pluginVersionList,
    getPluginVersionList,
    changeFilter,
    getUserList,
    createUser,
    updateUserInfo,
    changeUserStatus
  };
});
