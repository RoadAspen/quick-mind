import { setupRouter } from '@/router/index';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App';
import './tailwind.css';
const app = createApp(App);

(async function setup() {
  /** 引入 antd Design vue */
  // 开发环境加载 Mock.js
  if (import.meta.env.DEV) {
    import('./mock');
  }
  // 引入ant-design-vue
  app.use(Antd);
  // 使用 pinia
  app.use(createPinia());
  // 注册路由，并注册路由守卫
  await setupRouter(app);
  app.mount('#app');
})();
