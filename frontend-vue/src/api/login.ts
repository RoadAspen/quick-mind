import request from '@/utils/request';
/**
 * @description 登录
 * @param data
 * @returns
 */
export const login = (data: { username: string; password: string }) => {
  return request({
    url: '/api/login',
    method: 'post',
    data
  });
};
