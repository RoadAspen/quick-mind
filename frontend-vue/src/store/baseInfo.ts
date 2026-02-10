/** 用户信息 */
import { SysUserInfo } from '@/types/system/user';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBaseInfo = defineStore('baseInfo', () => {
  /** 权限列表 */
  const permissions = ref<string[]>([]);
  /** 角色列表 */
  const roles = ref<string[]>([]);
  /** 用户信息 */
  const userInfo = ref<Partial<SysUserInfo>>({});
  const token = ref<string>(''); // token
  const menuList = ref<any[]>([]); // 菜单列表

  return {
    permissions,
    roles,
    userInfo,
    token,
    menuList
  };
});
