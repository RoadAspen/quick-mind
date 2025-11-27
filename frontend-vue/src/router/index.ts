import { App } from 'vue';
import { createMemoryHistory, createRouter } from 'vue-router';
import createRouteGuard from './guard';
import routes from './routes';
const router = createRouter({
  history: createMemoryHistory(),
  routes
});
export async function setupRouter(app: App<Element>) {
  createRouteGuard(router);
  app.use(router);
}
