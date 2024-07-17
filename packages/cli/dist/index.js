// src/index.ts
import { createRequire } from "module";
import path2 from "path";
import { cac } from "cac";
import chokidar from "chokidar";
import chalk from "chalk";
import { logger as logger2 } from "@tistory-react/shared/logger";

// src/config/loadConfigFile.ts
import fs from "fs";
import path from "path";
import { logger } from "@tistory-react/shared/logger";

// src/constants.ts
var DEFAULT_CONFIG_NAME = "tistory-react.config";
var DEFAULT_EXTENSIONS = [
  ".js",
  ".ts",
  ".mjs",
  ".mts",
  ".cjs",
  ".cts"
];

// src/config/loadConfigFile.ts
var findConfig = (basePath) => {
  return DEFAULT_EXTENSIONS.map((ext) => basePath + ext).find(fs.existsSync);
};
async function loadConfigFile(customConfigFile) {
  const baseDir = process.cwd();
  let configFilePath = "";
  if (customConfigFile) {
    if (path.isAbsolute(customConfigFile)) {
      configFilePath = customConfigFile;
    } else {
      configFilePath = path.join(baseDir, customConfigFile);
    }
  } else {
    configFilePath = findConfig(path.join(baseDir, DEFAULT_CONFIG_NAME));
  }
  if (!configFilePath) {
    logger.info(`No config file found in ${baseDir}`);
    return {};
  }
  const { loadConfig } = await import("@rsbuild/core");
  const { content } = await loadConfig({
    cwd: path.dirname(configFilePath),
    path: configFilePath
  });
  return content;
}

// src/index.ts
var CONFIG_FILES = ["tistory-react.config.ts", "tistory-react.config.js"];
var require2 = createRequire(import.meta.url);
var packageJson = require2("../package.json");
var cli = cac("tistory-react").version(packageJson.version).help();
var landingMessage = `Tistory-react v${packageJson.version}
`;
logger2.greet(landingMessage);
var setNodeEnv = (env) => {
  process.env.NODE_ENV = env;
};
cli.option("-c,--config [config]", "Specify the path to the config file");
cli.command("[root]", "start dev server").alias("dev").option("--port [port]", "port number").option("--host [host]", "hostname").action(
  async (root, options) => {
    setNodeEnv("development");
    let isRestarting = false;
    const cwd = process.cwd();
    let docDirectory;
    let cliWatcher;
    const startDevServer = async () => {
      const { port, host } = options || {};
      const config = await loadConfigFile(options?.config);
      if (root) {
        config.root = path2.join(cwd, root);
      } else if (config.root && !path2.isAbsolute(config.root)) {
        config.root = path2.join(cwd, config.root);
      }
      docDirectory = config.root || path2.join(cwd, root ?? "docs");
      cliWatcher = chokidar.watch(
        [`${cwd}/**/{${CONFIG_FILES.join(",")}}`, docDirectory],
        {
          ignoreInitial: true,
          ignored: ["**/node_modules/**", "**/.git/**", "**/.DS_Store/**"]
        }
      );
      cliWatcher.on("all", async (eventName, filepath) => {
        if (eventName === "add" || eventName === "unlink" || eventName === "change" && CONFIG_FILES.includes(path2.basename(filepath))) {
          if (isRestarting) {
            return;
          }
          isRestarting = true;
          console.log(
            `
✨ ${eventName} ${chalk.green(
              path2.relative(cwd, filepath)
            )}, dev server will restart...
`
          );
          await cliWatcher.close();
          await startDevServer();
          isRestarting = false;
        }
      });
    };
    await startDevServer();
    const exitProcess = async () => {
      try {
        await cliWatcher.close();
      } finally {
        process.exit(0);
      }
    };
    process.on("SIGINT", exitProcess);
    process.on("SIGTERM", exitProcess);
  }
);
cli.parse();
