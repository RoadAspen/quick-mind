import { App } from 'vue';
import { createMemoryHistory, createRouter } from 'vue-router';
import { adminRoutes } from './routes';
const router = createRouter({
  history: createMemoryHistory(),
  routes: adminRoutes
});
export async function setupRouter(app: App<Element>) {
  app.use(router);
}
