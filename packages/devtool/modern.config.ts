import { defineConfig, moduleTools } from '@modern-js/module-tools';
import { tailwindcssPlugin } from '@modern-js/plugin-tailwindcss';
import { default as tailwindConfig } from './tailwind.config';

export default defineConfig({
  plugins: [moduleTools(), tailwindcssPlugin()],
  testing: {
    transformer: 'ts-jest',
  },
  buildConfig: [
    {
      input: { index: './src/index.ts' },
      outDir: 'dist',
      sourceMap: true,
      format: 'esm',
      style: {
        tailwindcss: {
          ...tailwindConfig,
          // darkMode: 'class',
        },
      },
    },
    {
      input: ['./src/index.css'],
      outDir: 'dist',
      dts: false,
      style: {
        tailwindcss: {
          ...tailwindConfig,
          // darkMode: 'class',
        },
      },
    },
  ],
});
