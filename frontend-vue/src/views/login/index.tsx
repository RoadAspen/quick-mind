import { defineComponent } from 'vue';

const Login = defineComponent({
  name: 'Login',
  setup() {
    return () => (
      <div class="flex flex-col h-screen w-full overflow-hidden">登錄</div>
    );
  }
});

export default Login;
