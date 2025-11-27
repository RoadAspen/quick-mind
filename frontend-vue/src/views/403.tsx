/**
 * 无权限
 */
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
        status="403"
        title="403"
        sub-title="对不起，您没有权限访问此页面。"
        extra={
          <Button type="primary" onClick={goHome}>
            返回首页
          </Button>
        }
      />
    );
  }
});
