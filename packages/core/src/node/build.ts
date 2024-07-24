import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import type { HelmetData } from 'react-helmet-async';
import chalk from '@tistory-react/shared/chalk';
import fs from '@tistory-react/shared/fs-extra';
import {
  type UserConfig,
  normalizeSlash,
  isDebugMode,
} from '@tistory-react/shared';
import { logger } from '@tistory-react/shared/logger';
import {
  OUTPUT_DIR,
  APP_HTML_MARKER,
  HEAD_MARKER,
  META_GENERATOR,
  HTML_START_TAG,
  BODY_START_TAG,
  TEMP_DIR,
} from './constants';
import { initRsbuild } from './initRsbuild';
// import { renderFrontmatterHead, renderConfigHead } from './utils/renderHead';

export interface Route {
  path: string;
  element: React.ReactElement;
  filePath: string;
}

interface BuildOptions {
  appDirectory: string;
  docDirectory: string;
  config: UserConfig;
}

export async function bundle(
  docDirectory: string,
  config: UserConfig,
  enableSSG: boolean,
) {
  try {
    // if enableSSG, build both client and server bundle
    // else only build client bundle
    const rsbuild = await initRsbuild(docDirectory, config, enableSSG);
    await rsbuild.build();
  } catch (error) {
    console.log(error);
  }
}

export interface SSRBundleExports {
  render: (url: string, helmetContext: object) => Promise<{ appHtml: string }>;
  routes: Route[];
}

export async function renderPages(
  appDirectory: string,
  config: UserConfig,
  enableSSG: boolean,
) {
  logger.info('Rendering pages...');
  const startTime = Date.now();
  const outputPath = config?.outDir ?? join(appDirectory, OUTPUT_DIR);
  const ssrBundlePath = join(outputPath, 'ssr', 'main.cjs');
  try {
    const { default: fs } = await import('@tistory-react/shared/fs-extra');
    const { version } = await import('../../package.json');
    // There are two cases where we will fallback to CSR:
    // 1. ssr bundle load failed
    // 2. ssr bundle render failed
    // 3. ssg is disabled
    let render = null;
    if (enableSSG) {
      try {
        const { default: ssrExports } = await import(
          pathToFileURL(ssrBundlePath).toString()
        );
        ({ render } = ssrExports as SSRBundleExports);
      } catch (e) {
        logger.error(e);
        logger.warn(
          `Failed to load SSR bundle: ${ssrBundlePath}, fallback to CSR.`,
        );
        // fallback to csr
      }
    }

    const routes = [{ routePath: '/pages' }];
    const base = config?.base ?? '';

    // Get the html generated by builder, as the default ssr template
    const htmlTemplatePath = join(outputPath, 'index.html');
    const htmlTemplate = await fs.readFile(htmlTemplatePath, 'utf-8');
    // const additionalRoutes = (await pluginDriver.addSSGRoutes()).map(route => ({
    //   routePath: withBase(route.path, base),
    // }));
    const allRoutes = [...routes];
    const is404RouteInRoutes = allRoutes.some(
      route => route.routePath === '/404',
    );
    if (!is404RouteInRoutes) {
      allRoutes.push({
        routePath: '/404',
      });
    }
    await Promise.all(
      allRoutes
        .filter(route => {
          // filter the route including dynamic params
          return !route.routePath.includes(':');
        })
        .map(async route => {
          const helmetContext: HelmetData = {
            context: {},
          } as HelmetData;
          const { routePath } = route;
          let appHtml = '';
          if (render) {
            try {
              ({ appHtml } = await render(routePath, helmetContext.context));
            } catch (e) {
              logger.warn(
                `page "${routePath}" render error: ${e.message}, fallback to CSR.`,
              );
              // fallback to csr
            }
          }

          const { helmet } = helmetContext.context;
          let html = htmlTemplate
            // During ssr, we already have the title in react-helmet
            .replace(/<title>(.*?)<\/title>/gi, '')
            // Don't use `string` as second param
            // To avoid some special characters transformed to the marker, such as `$&`, etc.
            .replace(APP_HTML_MARKER, () => appHtml)
            .replace(
              META_GENERATOR,
              () => `<meta name="generator" content="Rspress v${version}">`,
            )
            .replace(
              HEAD_MARKER,
              [
                // await renderConfigHead(config, route),
                helmet?.title?.toString(),
                helmet?.meta?.toString(),
                helmet?.link?.toString(),
                helmet?.style?.toString(),
                helmet?.script?.toString(),
                // await renderFrontmatterHead(route),
              ].join(''),
            );
          if (helmet?.htmlAttributes) {
            html = html.replace(
              HTML_START_TAG,
              `${HTML_START_TAG} ${helmet?.htmlAttributes?.toString()}`,
            );
          }

          if (helmet?.bodyAttributes) {
            html = html.replace(
              BODY_START_TAG,
              `${BODY_START_TAG} ${helmet?.bodyAttributes?.toString()}`,
            );
          }

          const normalizeHtmlFilePath = (path: string) => {
            const normalizedBase = normalizeSlash(config?.base || '/');

            if (path.endsWith('/')) {
              return `${path}index.html`.replace(normalizedBase, '');
            }

            return `${path}.html`.replace(normalizedBase, '');
          };
          const fileName = normalizeHtmlFilePath(routePath);
          await fs.ensureDir(join(outputPath, dirname(fileName)));
          await fs.writeFile(join(outputPath, fileName), html);
        }),
    );
    // Remove ssr bundle
    if (!isDebugMode()) {
      await fs.remove(join(outputPath, 'ssr'));
    }
    await fs.remove(join(outputPath, 'html'));

    const totalTime = Date.now() - startTime;
    logger.success(`Pages rendered in ${chalk.yellow(totalTime)} ms.`);
  } catch (e) {
    logger.error(`Pages render error: ${e.stack}`);
    throw e;
  }
}

export async function build(options: BuildOptions) {
  const { docDirectory, appDirectory, config } = options;
  // const pluginDriver = new PluginDriver(config, true);
  // await pluginDriver.init();
  // const modifiedConfig = await pluginDriver.modifyConfig();
  // await pluginDriver.beforeBuild();
  const enableSSG = true;

  // empty temp dir before build
  await fs.emptyDir(TEMP_DIR);

  await bundle(docDirectory, config, enableSSG);
  await renderPages(appDirectory, config, enableSSG);
  // await pluginDriver.afterBuild();
}
