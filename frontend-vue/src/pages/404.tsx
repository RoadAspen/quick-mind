import { Button, Result } from 'ant-design-vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();

    const goHome = () => {
      router.push('/');
    };

    return () => (
      <Result
        status="404"
        title="404"
        sub-title="对不起，您访问的页面不存在。"
        extra={
          <Button type="primary" onClick={goHome}>
            返回首页
          </Button>
        }
      />
    );
  }
});
