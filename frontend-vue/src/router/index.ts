import { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import createRouteGuard from './guard';
import routes from './routes';
const router = createRouter({
  history: createWebHistory(),
  routes,
  strict: true,
  sensitive: true
});
export async function setupRouter(app: App<Element>) {
  createRouteGuard(router);
  app.use(router);
  await router.isReady();
}
