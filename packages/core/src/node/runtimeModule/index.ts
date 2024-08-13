import type { UserConfig } from '@tistory-react/shared';
import { RspackVirtualModulePlugin } from 'rspack-plugin-virtual-module';
import type { RsbuildPlugin } from '@rsbuild/core';
import type { RouteService } from '../route/RouteService';
// import type { PluginDriver } from '../PluginDriver';
import { routeVMPlugin } from './routeData';

export interface FactoryContext {
  userDocRoot: string;
  config: UserConfig;
  isSSR: boolean;
  runtimeTempDir: string;
  alias: Record<string, string | string[]>;
  routeService: RouteService;
  // pluginDriver: PluginDriver;
}

type RuntimeModuleFactory = (
  context: FactoryContext,
) => Record<string, string> | Promise<Record<string, string>>;

export const runtimeModuleFactory: RuntimeModuleFactory[] = [
  /**
   * Generate route data for client and server runtime
   */
  routeVMPlugin,
];

// We will use this plugin to generate runtime module in browser, which is important to ensure the client have access to some compile-time data
export function rsbuildPluginDocVM(
  factoryContext: Omit<FactoryContext, 'alias' | 'isSSR'>,
): RsbuildPlugin {
  // const { pluginDriver } = factoryContext;
  return {
    name: 'rsbuild-plugin-doc-vm',
    setup(api) {
      api.modifyBundlerChain(async (bundlerChain, { target }) => {
        const isServer = target === 'node';
        // The order should be sync
        const alias = bundlerChain.resolve.alias.entries();
        const runtimeModule: Record<string, string> = {};
        // Add internal runtime module
        for (const factory of runtimeModuleFactory) {
          const moduleResult = await factory({
            ...factoryContext,
            isSSR: isServer,
            alias: alias as Record<string, string>,
          });
          Object.assign(runtimeModule, moduleResult);
        }
        // Add runtime module from outer plugins
        // const modulesByPlugin = await pluginDriver.addRuntimeModules();
        // Object.keys(modulesByPlugin).forEach(key => {
        //   if (runtimeModule[key]) {
        //     throw new Error(
        //       `The runtime module ${key} is duplicated, please check your plugin`,
        //     );
        //   }
        //   runtimeModule[key] = modulesByPlugin[key];
        // });
        bundlerChain
          .plugin('tistory-react-runtime-module')
          .use(
            new RspackVirtualModulePlugin(
              runtimeModule,
              factoryContext.runtimeTempDir,
            ),
          );
      });
    },
  };
}

export enum RuntimeModuleID {
  RouteForClient = 'virtual-routes',
  RouteForSSR = 'virtual-routes-ssr',
}

export const runtimeModuleIDs = [
  RuntimeModuleID.RouteForClient,
  RuntimeModuleID.RouteForSSR,
];
