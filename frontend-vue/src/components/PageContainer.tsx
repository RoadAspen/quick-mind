/**
 * 全局页面容器组件
 */
import { defineComponent } from 'vue';
const PageContainer = defineComponent({
  name: 'PageContainer',
  setup(_, { slots }) {
    return () => (
      <section class="p-5 overflow-y-auto">{slots.default?.()}</section>
    );
  }
});
export default PageContainer;
