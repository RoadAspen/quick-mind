import { USER_TOKEN } from '@/contants';

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
  return localStorage.removeItem(USER_TOKEN);
};
