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
        status="500"
        title="Error"
        sub-title="出错了"
        extra={
          <Button type="primary" onClick={goHome}>
            返回首页
          </Button>
        }
      />
    );
  }
});
