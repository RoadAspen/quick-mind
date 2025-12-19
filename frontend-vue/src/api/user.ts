/** 用户基础信息 */
import { TableData } from '@/types/common';
import { SysUserInfo, UserParams } from '@/types/system/user';
import request, { getUrlByParams } from '@/utils/request';

const BASE_URL = import.meta.env.VITE_APP_BASE_API + '/system';

/**
 * 获取用户基本信息
 * @returns
 */
export function getUserInfoRequest() {
  return request({
    url: `${BASE_URL}/getInfo`,
    method: 'get'
  });
}

/** 獲取用戶所有的路由列表 */
export async function getRoutersRequest() {
  return request({
    url: `${BASE_URL}/getRouters`,
    method: 'get'
  });
}

/** 获取用户列表 */
export async function getSysUserListRequest(
  params: UserParams
): Promise<TableData<SysUserInfo>> {
  return request({
    url: getUrlByParams<UserParams>(`${BASE_URL}/user/list`, params),
    method: 'get'
  });
}
