/**
 * 全局常量
 */

// token key
export const USER_TOKEN = 'USER_TOKEN';

/**
 * token前缀，用于请求头中携带token时的前缀，如：Bearer xxxxx
 */
export const USER_TOKEN_PREFIX = 'Bearer ';

/**
 * 当前语言 key
 * 用于本地存储当前语言的key
 * @type {string}
 */
export const CURRENT_LANG_KEY = 'CURRENT_LANG';

/**
 * 默认语言
 */
export const DEFAULT_LANG = 'zh';
/**
 *  支持的语言列表
 * */
export const SUPPORTED_LANGS = ['zh', 'en'];
/**
 *  语言映射
 */
export const LANG_MAP: Record<string, string> = {
  zh: '中文',
  en: 'En'
};

/**
 * 未知错误
 */
export const UNKNOWN_ERROR = '未知错误，请重试';
