#!/usr/bin/env node
import path from 'node:path';
import { cac } from 'cac';
import prompts, { type PromptObject } from 'prompts';
import fs from 'fs-extra';
import {
  copyFolder,
  initSitePrompts,
  formatTargetDir,
  getPkgManager,
  cancelPrompt,
} from './utils';

const cli = cac('create-tistory-react').help();

cli.command('', 'Create a new tistory-react project').action(async () => {
  const siteOptions: PromptObject[] = [
    {
      name: 'projectTitle',
      type: 'text',
      message: 'Project Title',
      initial: 'Tistory-react Skin',
    },
    {
      name: 'siteDesc',
      type: 'text',
      message: 'Site Description',
      initial: 'Awesome Skin Made by Tistory-react',
    },
  ];

  const defaultProjectName = 'tistory-react-skin';
  let targetDir = defaultProjectName;
  const promptProjectDir = async () =>
    await prompts(
      [
        {
          type: 'text',
          name: 'projectDir',
          initial: defaultProjectName,
          message: 'Project folder',
          onState: state => {
            targetDir = formatTargetDir(state.value) || defaultProjectName;
          },
        },
      ],
      { onCancel: cancelPrompt },
    );

  await promptProjectDir();
  let root = path.resolve(process.cwd(), targetDir);
  while (fs.existsSync(root)) {
    console.log(
      `${targetDir} is not empty, please choose another project name`,
    );
    await promptProjectDir();
    root = path.resolve(process.cwd(), targetDir);
  }

  await initSitePrompts(siteOptions);

  await fs.mkdir(root, { recursive: true });
  const srcFolder = path.resolve(__dirname, '../template');
  await copyFolder(srcFolder, targetDir);

  const pkgManager = getPkgManager();
  console.log('\nDone. Now run:\n');
  console.log(`cd ${targetDir}\n`);
  console.log(`${pkgManager} install\n`);
  console.log(`${pkgManager} run dev\n`);
});

cli.parse();
