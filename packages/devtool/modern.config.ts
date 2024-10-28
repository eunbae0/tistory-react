import { defineConfig, moduleTools } from '@modern-js/module-tools';

export default defineConfig({
  plugins: [moduleTools()],
  testing: {
    transformer: 'ts-jest',
  },
  buildConfig: [
    {
      input: { index: './src/index.ts' },
      outDir: 'dist',
      sourceMap: true,
      format: 'esm',
    },
  ],
});
