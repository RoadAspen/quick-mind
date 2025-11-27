/** 页面主题配置 */
import { MenuTheme } from 'ant-design-vue';
import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

export const useThemeStore = defineStore('user', () => {
  /** 侧边栏是否收起 */
  const isCollapse: Ref<Boolean> = ref(false);
  /** 主题色 */
  const theme: Ref<MenuTheme> = ref('dark');
  /** 切换侧边栏 */
  function switchCollapse() {
    isCollapse.value = !isCollapse.value;
  }

  return {
    isCollapse,
    theme,
    switchCollapse
  };
});
