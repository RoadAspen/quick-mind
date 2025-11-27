import { adminRoutes } from '@/router/routes';
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import Aside from './aside';
import Header from './header';

const PageLayout = defineComponent({
  name: 'PageLayout',
  setup() {
    return () => (
      <div class="flex h-screen w-full overflow-hidden">
        <Aside routes={adminRoutes} />
        <div class="flex flex-1 overflow-hidden">
          <Header />
          <section class="flex-1 overflow-hidden h-full">
            {/* 这里才会显示子路由组件 */}
            <RouterView></RouterView>
          </section>
        </div>
      </div>
    );
  }
});

export default PageLayout;
