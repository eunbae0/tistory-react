import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import chalk from '@tistory-react/shared/chalk';
import fs from '@tistory-react/shared/fs-extra';
import { type UserConfig, isDebugMode } from '@tistory-react/shared';
import { logger } from '@tistory-react/shared/logger';
import {
  OUTPUT_DIR,
  APP_HTML_MARKER,
  HEAD_MARKER,
  META_GENERATOR,
  HTML_START_TAG,
  TEMP_DIR,
  DEFAULT_TISTORY_SKIN_CONFIG,
  XML_DECLARATION,
  TEMP_ONCLICK_ATTR,
  TEMP_ONKEYPRESS_ATTR,
  TISTORY_TAG_IDENTIFIER,
  TISTORY_DEFAULT_XML_NAME,
} from './constants';
import { initRsbuild } from './initRsbuild';
import { convertCdataObj } from './utils/convertXml';
import type { TistorySkinInfo } from './types';
import { mergeXmlConfig } from './utils/mergeXmlConfig';

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
  render: () => Promise<{ appHtml: string }>;
}

export async function renderHtml(
  appDirectory: string,
  config: UserConfig,
  enableSSG: boolean,
) {
  logger.info('Rendering html...');
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

    // Get the html generated by builder, as the default ssr template
    const htmlTemplatePath = join(outputPath, TISTORY_DEFAULT_XML_NAME);
    const htmlTemplate = await fs.readFile(htmlTemplatePath, 'utf-8');

    let appHtml = '';
    if (render) {
      try {
        ({ appHtml } = await render());
      } catch (e) {
        logger.warn(
          `page "${''}" render error: ${e.message}, fallback to CSR.`,
        );
        // fallback to csr
      }
    }

    const html = htmlTemplate
      .replace(APP_HTML_MARKER, () => appHtml)
      .replace(
        META_GENERATOR,
        () => `<meta name="generator" content="Tistory-react v${version}">`,
      )
      .replace(
        HEAD_MARKER,
        [
          `<meta name="title" content="${config.meta?.title ?? '[##_page_title_##] :: [##_title_##]'}" />`,
          `<meta name="description" content="${config.meta?.description ?? '[##_desc_##]'}" />`,
          `<link rel="alternate" type="application/rss+xml" title="[##_title_##]" href="[##_rss_url_##]" />`,
        ].join(''),
      )
      .replace(
        HTML_START_TAG,
        `${HTML_START_TAG} lang="${config.lang ?? 'ko'}"`,
      )
      .replaceAll(TEMP_ONCLICK_ATTR, 'onclick')
      .replaceAll(TEMP_ONKEYPRESS_ATTR, 'onkeypress')
      .replaceAll(TISTORY_TAG_IDENTIFIER, '');

    const fileName = 'skin.html';
    await fs.ensureDir(join(outputPath, dirname(fileName)));
    await fs.writeFile(join(outputPath, fileName), html);

    // Remove ssr bundle
    if (!isDebugMode()) {
      await fs.remove(join(outputPath, 'ssr'));
    }
    await fs.remove(join(outputPath, 'html'));
    await fs.remove(htmlTemplatePath);

    const totalTime = Date.now() - startTime;
    logger.success(`HTML file rendered in ${chalk.yellow(totalTime)} ms.`);
  } catch (e) {
    logger.error(`HTML file render error: ${e.stack}`);
    throw e;
  }
}

export async function bundleXml(appDirectory: string, config: UserConfig) {
  logger.info('bundling XML...');
  const startTime = Date.now();
  const outputPath = config?.outDir ?? join(appDirectory, OUTPUT_DIR);
  try {
    const { default: fs } = await import('@tistory-react/shared/fs-extra');
    const { js2xml } = await import('xml-js');
    // const { version, description, author } = await import('../../package.json'); user package json
    const skinInfo: TistorySkinInfo = {
      ...XML_DECLARATION,
      skin: mergeXmlConfig(
        DEFAULT_TISTORY_SKIN_CONFIG,
        config.skinInfoConfig ?? {},
      ),
    };

    skinInfo.skin.information.description = convertCdataObj(
      skinInfo.skin.information.description as string,
    );
    skinInfo.skin.information.license = convertCdataObj(
      skinInfo.skin.information.license as string,
    );

    const options = { compact: true, ignoreComment: true, spaces: 4 };
    const result = js2xml(skinInfo, options);

    const fileName = TISTORY_DEFAULT_XML_NAME;
    await fs.ensureDir(join(outputPath, dirname(fileName)));
    await fs.writeFile(join(outputPath, fileName), result);

    const totalTime = Date.now() - startTime;
    logger.success(`XML file bundled in ${chalk.yellow(totalTime)} ms.`);
  } catch (error) {
    logger.error(`XML bundled error: ${error}`);
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
  await renderHtml(appDirectory, config, enableSSG);
  await bundleXml(appDirectory, config);
  // await pluginDriver.afterBuild();
}
