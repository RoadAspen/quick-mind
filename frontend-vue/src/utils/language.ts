import {
  CURRENT_LANG_KEY,
  DEFAULT_LANG,
  SUPPORTED_LANGS
} from '@/globalContants';

/** 获取当前语言 */
export function getCurrentLang() {
  // 获取浏览器语言
  const browserLang = navigator.language || (navigator as any).userLanguage;
  // 获取本地存储的语言
  const localLang = localStorage.getItem(CURRENT_LANG_KEY);
  // 如果本地存储有语言，则使用本地存储的语言
  if (localLang) {
    return localLang;
  }
  // 如果浏览器语言在支持的语言列表中，则使用浏览器语言
  if (SUPPORTED_LANGS.includes(browserLang)) {
    return browserLang;
  }
  // 否则返回默认语言
  return DEFAULT_LANG;
}

/**
 * 切换语言
 * @param lang 语言
 */
export function changeLang(lang: string) {
  // 如果语言不在支持的语言列表中，则不切换
  if (!SUPPORTED_LANGS.includes(lang)) return;
  // 设置本地存储的语言
  localStorage.setItem(CURRENT_LANG_KEY, lang);
  // 刷新页面
  window.location.reload();
}
