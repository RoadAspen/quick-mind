import { USER_TOKEN } from '@/globalContants';

/** 获取token */
export const getToken = () => {
  return localStorage.getItem(USER_TOKEN);
};

/** 设置token */
export const setToken = (token: string) => {
  return localStorage.setItem(USER_TOKEN, token);
};
/** 删除token */
export const removeToken = () => {
  localStorage.removeItem(USER_TOKEN);
  console.log('删除了token');
};

/** 判断是否登录 */
export const isLogin = () => {
  return !!getToken();
};

export default {
  getToken,
  setToken,
  removeToken,
  isLogin
};
