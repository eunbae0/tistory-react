import path from 'node:path';
import { defineConfig, moduleTools } from '@modern-js/module-tools';

const COMMON_EXTERNALS = ['virtual-routes-ssr', 'virtual-routes'];

export default defineConfig({
  plugins: [moduleTools()],
  buildConfig: [
    {
      sourceDir: 'src',
      buildType: 'bundleless',
      target: 'es2020',
      format: 'esm',
      outDir: 'dist',
      dts: {
        respectExternal: true,
      },
      tsconfig: path.join(__dirname, 'tsconfig.json'),
      externals: COMMON_EXTERNALS,
    },
  ],
});
