import { defineConfig, moduleTools } from '@modern-js/module-tools';

export default defineConfig({
  plugins: [moduleTools()],
  testing: {
    transformer: 'ts-jest',
  },
  buildConfig: [
    {
      sourceDir: 'src/components/Article',
      input: ['./src/components/Article/index.tsx'],
      outDir: 'dist/Article',
      sourceMap: true,
      format: 'esm',
    },
    {
      sourceDir: 'src/components/Comment',
      input: ['./src/components/Comment/index.tsx'],
      outDir: 'dist/Comment',
      sourceMap: true,
      format: 'esm',
    },
    {
      sourceDir: 'src/components/Sidebar',
      input: ['./src/components/Sidebar/index.tsx'],
      outDir: 'dist/Sidebar',
      sourceMap: true,
      format: 'esm',
    },
    {
      sourceDir: 'src/components/Tags',
      input: ['./src/components/Tags/index.tsx'],
      outDir: 'dist/Tags',
      sourceMap: true,
      format: 'esm',
    },
  ],
});
