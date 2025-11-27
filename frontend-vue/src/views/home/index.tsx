/** 首页 */
import { defineComponent } from 'vue';

const Home = defineComponent({
  name: 'Home',
  setup() {
    return () => (
      <div class="flex flex-col h-screen w-full overflow-hidden">登錄</div>
    );
  }
});

export default Home;
