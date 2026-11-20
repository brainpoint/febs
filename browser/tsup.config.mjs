import { defineConfig } from 'tsup';
import { readFileSync, cpSync, mkdirSync } from 'node:fs';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));

const banner = {
  js: [
    '/*!',
    ` * febs-browser v${pkg.version}`,
    ` * Copyright (c) ${new Date().getFullYear()} bpoint.lee@gmail.com All Rights Reserved.`,
    ' * Released under the MIT License.',
    ' */',
  ].join('\n'),
};

const common = {
  outDir: 'dist',
  target: 'es2015',
  platform: 'browser',
  splitting: false,
  clean: false,
  sourcemap: true,
  banner,
  // 旧构建使用 babel 转为 ES5, tsup 基于 esbuild, 不再支持 IE.
  esbuildOptions(options) {
    options.legalComments = 'none';
  },
};

// 主入口: 完整版与去掉 BigNumber 的版本.
const mainEntries = {
  index: 'index.js',
  'index.noBignumber': 'index.noBignumber.js',
};

const iifeBuild = (entry, name, minify) => ({
  ...common,
  entry: { [name]: entry },
  format: ['iife'],
  globalName: 'febs',
  minify,
  sourcemap: !minify,
  outExtension: () => ({ js: minify ? '.min.js' : '.js' }),
});

export default defineConfig([
  // cjs + esm (未压缩)
  {
    ...common,
    entry: mainEntries,
    format: ['cjs', 'esm'],
    outExtension({ format }) {
      return { js: format === 'cjs' ? '.common.js' : '.esm.js' };
    },
  },
  // cjs + esm (压缩)
  {
    ...common,
    entry: mainEntries,
    format: ['cjs', 'esm'],
    minify: true,
    sourcemap: false,
    outExtension({ format }) {
      return { js: format === 'cjs' ? '.common.min.js' : '.esm.min.js' };
    },
  },
  // 浏览器 <script> 直接引用 (window.febs)
  iifeBuild('index.js', 'index', false),
  iifeBuild('index.js', 'index', true),
  iifeBuild('index.noBignumber.js', 'index.noBignumber', false),
  iifeBuild('index.noBignumber.js', 'index.noBignumber', true),
  // 微信小程序
  {
    ...common,
    entry: { index: 'wxmini/index.js' },
    outDir: 'dist/wxmini',
    format: ['cjs'],
    sourcemap: false,
    onSuccess: async () => {
      mkdirSync('wxmini-package', { recursive: true });
      cpSync('dist/wxmini/index.js', 'wxmini-package/index.js');
    },
  },
]);
