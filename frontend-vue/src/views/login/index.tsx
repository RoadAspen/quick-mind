import { loginRequest } from '@/api/login';
import loginBg from '@/assets/login/login-bg.jpg';
import PasswordIcon from '@/assets/login/password.svg';
import UserIcon from '@/assets/login/user.svg';
import YanZhengIcon from '@/assets/login/yanzheng.svg';
import { setToken } from '@/utils/auth';
import { useAsyncState } from '@vueuse/core';
import { Button, Checkbox, Form, Input, InputPassword } from 'ant-design-vue';
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
interface FormState {
  username: string;
  password: string;
  code: string;
  remember: boolean;
}
const Login = defineComponent({
  name: 'Login',
  setup() {
    /** 登录 */
    const { isLoading, execute: runLogin } = useAsyncState(loginRequest, null, {
      immediate: false,
      onError: (e) => console.error('请求出错：', e), // 错误回调
      onSuccess: (res) => {
        if (res) {
          setToken(res.token);
          router.push('/system/user');
        }
      }
    });
    const formState = reactive<FormState>({
      username: 'admin',
      password: 'admin123',
      code: '2',
      remember: false
    });
    const router = useRouter();
    const onFinish = (values: any) => {
      runLogin(0, values);
    };
    return () => (
      <div
        class="flex flex-col h-screen w-full overflow-hidden relative items-center justify-center bg-cover"
        style={{ backgroundImage: `url(${loginBg})` }}
      >
        <Form
          class="w-[400px] bg-white rounded-lg px-6 pt-6 pb-1"
          model={formState}
          name="basic"
          wrapper-col={{ span: 24 }}
          onFinish={onFinish}
        >
          <h3 class="w-full text-[22px]/[30px] text-center text-[#707070] mb-[30px]">
            捷智管理系统
          </h3>
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入账号' }]}
          >
            <Input
              v-model:value={formState.username}
              placeholder="账号"
              prefix={<img src={UserIcon} />}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <InputPassword
              v-model:value={formState.password}
              placeholder="密码"
              prefix={<img src={PasswordIcon} />}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[{ required: true, message: '请输入验证码' }]}
          >
            <div class="flex items-center justify-between gap-2">
              <Input
                class="flex-1"
                v-model:value={formState.code}
                placeholder="验证码"
                prefix={<img src={YanZhengIcon} />}
                size="large"
              />
              <div class="w-1/3">
                <img
                  class="cursor-pointer h-[38px] w-full"
                  src="data:image/gif;base64,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"
                  alt=""
                />
              </div>
            </div>
          </Form.Item>

          <Form.Item name="remember">
            <Checkbox v-model:checked={formState.remember}>记住密码</Checkbox>
          </Form.Item>

          <Form.Item wrapper-col={{ offset: 0, span: 24 }}>
            <Button
              class="w-full"
              type="primary"
              html-type="submit"
              loading={isLoading.value}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
        <footer class="absolute bottom-0 w-full flex items-center justify-center text-[12px]/[30px] font-semibold text-white">
          Copyright © 2018-2025 quick.mind All Rights Reserved.
          沪ICP备18090997876号
        </footer>
      </div>
    );
  }
});

export default Login;
