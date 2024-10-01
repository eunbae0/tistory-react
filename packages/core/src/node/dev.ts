import type { UserConfig } from '@tistory-react/shared';
import type { RsbuildConfig } from '@rsbuild/core';
import { initRsbuild } from './initRsbuild';

interface ServerInstance {
  close: () => Promise<void>;
}

interface DevOptions {
  appDirectory: string;
  docDirectory: string;
  config: UserConfig;
  extraBuilderConfig?: RsbuildConfig;
}

export async function dev(options: DevOptions): Promise<ServerInstance> {
  const { docDirectory, config, extraBuilderConfig } = options;

  try {
    const builder = await initRsbuild(
      docDirectory,
      config,
      false,
      extraBuilderConfig,
    );

    const { server } = await builder.startDevServer({
      getPortSilently: true,
    });

    return server;
  } finally {
  }
}
