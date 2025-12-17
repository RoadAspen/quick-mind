/** 登录, 登出 */
import request from '@/utils/request';

const BASE_URL = import.meta.env.VITE_APP_BASE_API;
/** 登录表单 */
export interface LoginForm {
  username: string;
  password: string;
}
/**
 * @description 登录
 * @param data
 * @returns
 */
export const loginRequest: (data: LoginForm) => Promise<{ token: string }> = (
  data
) => {
  return request({
    url: `${BASE_URL}/auth/login`,
    method: 'post',
    data
  });
};

/**
 * @description 登出
 * @param data
 * @returns
 */
export const logoutRequest = () => {
  return request({
    url: `${BASE_URL}/auth/logout`,
    method: 'post'
  });
};
