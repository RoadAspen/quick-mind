/** 用户基础信息 */
import request from '@/utils/request';

const BASE_URL = import.meta.env.VITE_APP_BASE_API;

/**
 * 获取用户基本信息
 * @returns
 */
export function getUserInfoRequest() {
  return request({
    url: `${BASE_URL}/system/getInfo`,
    method: 'get'
  });
}

/** 獲取用戶所有的路由列表 */
export async function getRoutersRequest() {
  return request({
    url: `${BASE_URL}/system/getRouters`,
    method: 'get'
  });
}
