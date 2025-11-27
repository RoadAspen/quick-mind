import { defineComponent } from 'vue';

const Registry = defineComponent({
  name: 'Registry',
  setup() {
    return () => (
      <div class="flex flex-col h-screen w-full overflow-hidden">注册</div>
    );
  }
});

export default Registry;
