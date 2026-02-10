/**
 * 权限判断 hook
 */
import { useBaseInfo } from '@/store/baseInfo';

type Perm = string | string[];
type Role = string | string[];
export const usePermission = () => {
  const state = useBaseInfo();
  const permissions = state.permissions || [];
  const roles = state.roles || [];

  /**
   * 是否拥有权限
   * @param value 权限标识
   * @returns boolean
   */
  function hasPermi(value: Perm): boolean {
    if (!value) return true;
    if (roles.includes('admin')) return true;

    if (Array.isArray(value)) {
      return permissions.some((item) => value.includes(item));
    }
    return permissions.includes(value);
  }

  /**
   * 是否拥有角色权限
   * @param value 角色权限标识
   * @returns boolean
   */
  function hasRole(value: Role) {
    if (!value) return true;

    if (Array.isArray(value)) {
      return roles.some((role) => value.includes(role));
    }

    return roles.includes(value);
  }

  return {
    hasPermi,
    hasRole
  };
};
