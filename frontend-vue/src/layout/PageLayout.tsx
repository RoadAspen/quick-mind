import { adminRoutes } from '@/router/routes';
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import Aside from './aside';
import Header from './header';

const PageLayout = defineComponent({
  name: 'PageLayout',
  setup() {
    return () => (
      <section class="flex h-screen w-full overflow-hidden">
        <Aside routes={adminRoutes} />
        <section class="flex-1 overflow-hidden">
          <Header />
          <section
            class="overflow-hidden"
            style={{ height: 'clac(100% - 50px)' }}
          >
            {/* 这里才会显示子路由组件 */}
            <RouterView></RouterView>
          </section>
        </section>
      </section>
    );
  }
});

export default PageLayout;
