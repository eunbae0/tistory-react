import { createRequire } from 'node:module';
import path from 'node:path';
import { cac } from 'cac';
import chokidar from 'chokidar';
import chalk from 'chalk';
import { logger } from '@tistory-react/shared/logger';
import { loadConfigFile } from './config/loadConfigFile';
import { dev } from '@tistory-react/core';

const CONFIG_FILES = ['tistory-react.config.ts', 'tistory-react.config.js'];

const require = createRequire(import.meta.url);

const packageJson = require('../package.json');

const cli = cac('tistory-react').version(packageJson.version).help();

const landingMessage = `Tistory-react v${packageJson.version}\n`;
logger.greet(landingMessage);

const setNodeEnv = (env: 'development' | 'production') => {
  process.env.NODE_ENV = env;
};

cli.option('-c,--config [config]', 'Specify the path to the config file');

cli
  .command('[root]', 'start dev server') // default command
  .alias('dev')
  .option('--port [port]', 'port number')
  .option('--host [host]', 'hostname')
  .action(
    async (
      root,
      options?: { port?: number; host?: string; config?: string },
    ) => {
      setNodeEnv('development');
      let isRestarting = false;
      const cwd = process.cwd();
      let docDirectory: string;
      let cliWatcher: chokidar.FSWatcher;
      let devServer: Awaited<ReturnType<typeof dev>>;

      const startDevServer = async () => {
        const { port, host } = options || {};
        const config = await loadConfigFile(options?.config);
        if (root) {
          // Support root in command, override config file
          config.root = path.join(cwd, root);
        } else if (config.root && !path.isAbsolute(config.root)) {
          // Support root relative to cwd
          config.root = path.join(cwd, config.root);
        }

        docDirectory = config.root || path.join(cwd, root ?? 'docs');
        devServer = await dev({
          appDirectory: cwd,
          docDirectory,
          config,
          extraBuilderConfig: { server: { port, host } },
        });
        cliWatcher = chokidar.watch(
          [`${cwd}/**/{${CONFIG_FILES.join(',')}}`, docDirectory!],
          {
            ignoreInitial: true,
            ignored: ['**/node_modules/**', '**/.git/**', '**/.DS_Store/**'],
          },
        );
        cliWatcher.on('all', async (eventName, filepath) => {
          // restart if change CONFIG_FILES
          if (
            eventName === 'add' ||
            eventName === 'unlink' ||
            (eventName === 'change' &&
              CONFIG_FILES.includes(path.basename(filepath)))
          ) {
            if (isRestarting) {
              return;
            }
            isRestarting = true;
            console.log(
              `\n✨ ${eventName} ${chalk.green(
                path.relative(cwd, filepath),
              )}, dev server will restart...\n`,
            );
            await devServer.close();
            await cliWatcher.close();
            await startDevServer();
            isRestarting = false;
          }
        });
      };

      await startDevServer();

      const exitProcess = async () => {
        try {
          await devServer.close();
          await cliWatcher.close();
        } finally {
          process.exit(0);
        }
      };

      process.on('SIGINT', exitProcess);
      process.on('SIGTERM', exitProcess);
    },
  );

cli.parse();
