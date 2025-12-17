import { mergeConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import { viteMockServe } from 'vite-plugin-mock';
import baseConfig from './vite.config.base';

/**
 * 开发环境配置
 */
export default mergeConfig(
  {
    mode: 'development',
    server: {
      open: true,
      port: 3000,
      cors: true,
      hmr: true, //热更新
      fs: {
        strict: true
      },
      proxy: {
        '/api': {
          target: 'http://localhost:8080', // 替换为你的后端地址
          changeOrigin: true,
          rewrite: (path: string) => path.replace('/api/', '/')
        }
      }
    },
    plugins: [
      eslint({
        cache: false,
        include: ['../src/**/*.ts', '../src/**/*.tsx', '../src/**/*.vue'],
        exclude: ['node_modules']
      }),
      viteMockServe({
        // default
        mockPath: '../src/mock', // mock文件所在文件夹
        enable: false, // 是否应用于生产
        watchFiles: true // 监视文件更改 这样更改mock的时候，不需要重新启动编译
      })
    ]
  },
  baseConfig
);
