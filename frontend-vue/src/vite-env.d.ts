/// <reference types="vite/client" />

// src/types/vite-plugin-eslint.d.ts
declare module 'vite-plugin-eslint' {
  import type { Linter } from 'eslint';
  import type { Plugin } from 'vite';

  // 定义插件配置项类型（覆盖常用配置，可根据实际使用扩展）
  export interface ViteEslintPluginOptions {
    /**
     *  指定要检查的文件
     */
    include?: string | string[];
    /** 指定要排除的文件/目录 */
    exclude?: string | string[];
    /** 是否启用缓存，默认 true */
    cache?: boolean;
    /** 缓存目录路径 */
    cacheLocation?: string;
    /** eslint 配置项，优先级高于 .eslintrc */
    eslintConfig?: Linter.Config;
    /** 是否在开发服务器构建时启用，默认 true */
    dev?: boolean;
    /** 是否在生产构建时启用，默认 false */
    build?: boolean;
    /** 错误级别：'error' | 'warn' | 'silent'，默认 'error' */
    failOnError?: boolean | 'error' | 'warn' | 'silent';
    /** 是否打印 eslint 错误日志，默认 true */
    logLevel?: 'error' | 'warn' | 'info' | 'silent';
  }

  // 定义插件导出函数
  const viteEslintPlugin: (options?: ViteEslintPluginOptions) => Plugin;
  export default viteEslintPlugin;
}
