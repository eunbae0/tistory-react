import path from 'node:path';
import {
  type UserConfig,
  removeLeadingSlash,
  TISTORY_REACT_TEMP_DIR,
  removeTrailingSlash,
} from '@tistory-react/shared';
import fs from '@tistory-react/shared/fs-extra';
import type {
  RsbuildInstance,
  RsbuildConfig,
  RsbuildPlugin,
} from '@rsbuild/core';
import {
  CLIENT_ENTRY,
  SSR_ENTRY,
  PACKAGE_ROOT,
  OUTPUT_DIR,
  isProduction,
  PUBLIC_DIR,
  DEFAULT_TITLE,
  BUNDLE_DIR,
} from './constants';
import { initRouteService } from './route/init';
import { rsbuildPluginDocVM } from './runtimeModule';
import type { RouteService } from './route/RouteService';
import { detectReactVersion, resolveReactAlias } from './utils';
import { PLUGIN_REACT_NAME, pluginReact } from '@rsbuild/plugin-react';

export interface MdxRsLoaderCallbackContext {
  resourcePath: string;
  links: string[];
  root: string;
  base: string;
}

function isPluginIncluded(config: UserConfig, pluginName: string): boolean {
  return (
    config.builderPlugins?.some(plugin => plugin.name === pluginName) ||
    config.builderConfig?.plugins?.some(
      plugin => plugin && (plugin as RsbuildPlugin).name === pluginName,
    )
  );
}

async function createInternalBuildConfig(
  userDocRoot: string,
  config: UserConfig,
  enableSSG: boolean,
  routeService: RouteService,
  // pluginDriver: PluginDriver,
  runtimeTempDir: string,
): Promise<RsbuildConfig> {
  const cwd = process.cwd();
  const baseOutDir = config?.outDir ?? OUTPUT_DIR;
  const csrOutDir = baseOutDir;
  const ssrOutDir = path.join(baseOutDir, 'ssr');

  // const DEFAULT_THEME = require.resolve("@rspress/theme-default");
  const base = config?.base ?? '';

  // In production, we need to add assetPrefix in asset path
  const assetPrefix = isProduction()
    ? removeTrailingSlash(config?.builderConfig?.output?.assetPrefix ?? base)
    : '';
  const reactVersion = await detectReactVersion();

  const normalizeIcon = (icon: string | undefined) => {
    if (!icon) {
      return undefined;
    }

    if (path.isAbsolute(icon)) {
      return path.join(userDocRoot, PUBLIC_DIR, icon);
    }

    return icon;
  };

  // Using latest browserslist in development to improve build performance
  const webBrowserslist = isProduction()
    ? ['chrome >= 87', 'edge >= 88', 'firefox >= 78', 'safari >= 14']
    : [
        'last 1 chrome version',
        'last 1 firefox version',
        'last 1 safari version',
      ];
  const ssrBrowserslist = ['node >= 14'];

  const [reactCSRAlias, reactSSRAlias] = await Promise.all([
    resolveReactAlias(reactVersion, false),
    enableSSG ? resolveReactAlias(reactVersion, true) : Promise.resolve({}),
  ]);

  return {
    plugins: [
      ...(isPluginIncluded(config, PLUGIN_REACT_NAME) ? [] : [pluginReact()]),
      rsbuildPluginDocVM({
        userDocRoot,
        config,
        runtimeTempDir,
        routeService,
      }),
    ],
    server: {
      port:
        !isProduction() && process.env.PORT
          ? Number(process.env.PORT)
          : undefined,
      printUrls: ({ urls }) => {
        return urls.map(url => `${url}/${removeLeadingSlash(base)}`);
      },
      publicDir: {
        name: path.join(userDocRoot, PUBLIC_DIR),
      },
    },
    dev: {
      progressBar: false,
      // Serve static files
    },
    html: {
      title: DEFAULT_TITLE,
      favicon: normalizeIcon(config?.icon),
      template: path.join(PACKAGE_ROOT, 'index.html'),
      // tags:
    },
    output: {
      assetPrefix,
      distPath: {
        // just for rsbuild preview
        root: csrOutDir,
        js: BUNDLE_DIR,
        jsAsync: BUNDLE_DIR,
      },
      legalComments: 'none',
    },
    source: {
      alias: {
        '@tistory-react/core': PACKAGE_ROOT,
        // 'react-lazy-with-preload': require.resolve('react-lazy-with-preload'),
      },
      include: [
        PACKAGE_ROOT,
        path.join(cwd, 'node_modules', TISTORY_REACT_TEMP_DIR),
      ],
      define: {
        'process.env.__ASSET_PREFIX__': JSON.stringify(assetPrefix),
        'process.env.__IS_REACT_18__': JSON.stringify(reactVersion === 18),
        'process.env.TEST': JSON.stringify(process.env.TEST),
      },
    },
    performance: {
      chunkSplit: {
        override: {
          cacheGroups: {
            // extract all CSS into a single file
            // ensure CSS in async chunks can be loaded for SSG
            styles: {
              name: 'styles',
              minSize: 0,
              chunks: 'all',
              test: /\.(?:css|less|sass|scss)$/,
              priority: 99,
            },
          },
        },
      },
    },
    tools: {
      bundlerChain(chain, { target }) {
        const isServer = target === 'node';

        if (isServer) {
          chain.output.filename('main.cjs');
        }
      },
    },
    environments: {
      web: {
        source: {
          entry: {
            index: CLIENT_ENTRY,
          },
          alias: reactCSRAlias,
          define: {
            'process.env.__SSR__': JSON.stringify(false),
          },
        },
        output: {
          target: 'web',
          overrideBrowserslist: webBrowserslist,
          distPath: {
            root: csrOutDir,
          },
        },
      },
      ...(enableSSG
        ? {
            node: {
              source: {
                entry: {
                  index: SSR_ENTRY,
                },
                alias: reactSSRAlias,
                define: {
                  'process.env.__SSR__': JSON.stringify(true),
                },
              },
              performance: {
                printFileSize: false,
              },
              output: {
                target: 'node',
                overrideBrowserslist: ssrBrowserslist,
                distPath: {
                  root: ssrOutDir,
                },
                minify: false,
              },
            },
          }
        : {}),
    },
  };
}

export async function initRsbuild(
  rootDir: string,
  config: UserConfig,
  enableSSG: boolean,
  extraRsbuildConfig?: RsbuildConfig,
): Promise<RsbuildInstance> {
  const cwd = process.cwd();
  const userDocRoot = path.resolve(rootDir || config?.root || cwd);
  const builderPlugins = config?.builderPlugins ?? [];
  // We use a temp dir to store runtime files, so we can separate client and server build
  // and we should empty temp dir before build
  const runtimeTempDir = path.join(TISTORY_REACT_TEMP_DIR, 'runtime');
  const runtimeAbsTempDir = path.join(cwd, 'node_modules', runtimeTempDir);
  await fs.ensureDir(runtimeAbsTempDir);

  const routeService = await initRouteService({
    config,
    scanDir: userDocRoot,
  });
  const { createRsbuild, mergeRsbuildConfig } = await import('@rsbuild/core');

  const internalRsbuildConfig = await createInternalBuildConfig(
    userDocRoot,
    config,
    enableSSG,
    routeService,
    // pluginDriver,
    runtimeTempDir,
  );

  const rsbuild = await createRsbuild({
    rsbuildConfig: mergeRsbuildConfig(
      internalRsbuildConfig,
      config?.builderConfig || {},
      extraRsbuildConfig || {},
    ),
  });

  rsbuild.addPlugins(builderPlugins);

  return rsbuild;
}
