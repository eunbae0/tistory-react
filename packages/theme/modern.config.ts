import { defineConfig, moduleTools } from '@modern-js/module-tools';

const COMMON_EXTERNALS = [
  'virtual-routes-ssr',
  'virtual-routes',
  '@tistory-react/runtime',
  '@theme',
];

export default defineConfig({
  plugins: [moduleTools()],
  testing: {
    transformer: 'ts-jest',
  },
  buildConfig: [
    {
      input: {
        index: './src/index.ts',
      },
      outDir: 'dist',
      sourceMap: true,
      format: 'esm',
      externals: COMMON_EXTERNALS,
    },
  ],
});
