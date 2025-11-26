import { mergeConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import baseConfig from './vite.config.base';
/**
 * 合并开发环境的配置
 */
export default mergeConfig(
  {
    mode: 'production',
    plugins: [
      eslint({
        cache: false,
        include: ['../src/**/*.ts', '../src/**/*.tsx', '../src/**/*.vue'],
        exclude: ['node_modules']
      })
    ]
  },
  baseConfig
);
