import path from 'node:path';
import fs from 'fs-extra';
import prompts from 'prompts';
import type { PromptObject } from 'prompts';

export async function copyFolder(src: string, dest: string) {
  const renameFiles: Record<string, string> = {
    _gitignore: '.gitignore',
  };

  await fs.mkdir(dest, { recursive: true });
  for (const file of await fs.readdir(src)) {
    const srcFile = path.resolve(src, file);
    const dstFile = renameFiles[file]
      ? path.resolve(dest, renameFiles[file])
      : path.resolve(dest, file);
    const stat = await fs.stat(srcFile);
    if (stat.isDirectory()) {
      await copyFolder(srcFile, dstFile);
    } else {
      await fs.copyFile(srcFile, dstFile);
    }
  }
}

/**
 * format the targetDir
 */
export function formatTargetDir(targetDir: string) {
  return targetDir.trim().replace(/\/+$/g, '');
}

/**
 * custom prompt function
 */
export function initSitePrompts(options: PromptObject[]) {
  return prompts(options, { onCancel: cancelPrompt });
}

export const cancelPrompt = () => {
  console.log('Operation cancelled.');
  process.exit(0);
};

export function getPkgManager() {
  const ua = process.env.npm_config_user_agent;
  if (!ua) {
    return 'npm';
  }
  const [pkgInfo] = ua.split(' ');
  const [name] = pkgInfo.split('/');
  return name || 'npm';
}
