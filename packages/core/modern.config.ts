import { defineConfig, moduleTools } from '@modern-js/module-tools';

export default defineConfig({
  plugins: [moduleTools()],
  // testing: {
  //   transformer: 'ts-jest',
  // },
  buildConfig: [
    {
      buildType: 'bundle',
      format: 'esm',
      target: 'es2020',
      outDir: 'dist',
      sourceMap: true,
      externals: ['jsdom'],
    },
    {
      sourceDir: 'src/runtime',
      buildType: 'bundleless',
      target: 'es2020',
      format: 'esm',
      outDir: 'dist/runtime',
      tsconfig: './src/runtime/tsconfig.json',
    },
  ],
});
