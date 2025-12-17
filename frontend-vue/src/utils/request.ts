import { UNKNOWN_ERROR, USER_TOKEN_PREFIX } from '@/globalContants';
import { message, Modal } from 'ant-design-vue';
import axios from 'axios';
import { getToken } from './auth';
import { getCurrentLang } from './language';

const request = axios.create({
  timeout: 5000,
  baseURL: import.meta.env.VITE_APP_BASE_API // 使用环境变量中的基础URL
});
// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // request拦截器
    const token = getToken();
    if (token && config.headers) {
      // 设置token到请求头中，注意这里要加上token前缀，如：Bearer xxxxx
      config.headers['Authorization'] = `${USER_TOKEN_PREFIX}${token}`;
      // 设置语言到请求头中
      config.headers['Language'] = getCurrentLang();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const reLoginConfig = {
  isShowLoginExpiredModal: true
};
request.interceptors.response.use(
  (response) => {
    const res = response.data;
    console.log('response', response);

    if (res.code !== 200) {
      if (res.code === 401) {
        if (reLoginConfig.isShowLoginExpiredModal) {
          Modal.confirm({
            title: '系统提示',
            content: '登录状态已过期，您可以继续留在该页面，或者重新登录',
            okText: '重新登录',
            cancelText: '取消',
            onOk: () => {
              localStorage.clear();
              window.location.reload();
            },
            onCancel: () => {
              reLoginConfig.isShowLoginExpiredModal = true;
            }
          });
          reLoginConfig.isShowLoginExpiredModal = false;
        }
      } else {
        message.error(res.msg || UNKNOWN_ERROR);
        const error: Error & { code?: number } = new Error(
          res.msg || UNKNOWN_ERROR
        );
        error.code = res.code;
        return Promise.reject(error);
      }
    }
    return res.data;
  },
  (error) => {
    // 处理 422 或者 500 的错误异常提示
    const errMsg = error.message ?? UNKNOWN_ERROR;
    message.error(errMsg);
    error.message = errMsg;
    return Promise.reject(error);
  }
);
/** 拼接url */
export const getUrlByParams = (
  url: string,
  params: { [key: string]: string | number | boolean }
) => {
  const keys = Object.keys(params);
  if (!keys.length) return url;
  const searchParams = keys.reduce(
    (prevParam, key) =>
      `${prevParam}${prevParam ? '&' : ''}${key}=${params[key]}`,
    ''
  );
  return `${url}?${searchParams}`;
};

export default request;
