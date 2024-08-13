import path from 'node:path';
import { expect, describe, test } from 'vitest';
import { extractPageName, isTistoryRouteFile, normalizePath } from '../utils';
import { RouteService } from './RouteService';

describe('RouteService', async () => {
  const testDir = normalizePath(path.join(__dirname, 'fixtures'));
  const routeService = new RouteService(testDir);
  await routeService.init();
  const routeMeta = routeService.getRoutes().map(item => ({
    ...item,
    absolutePath: item.absolutePath.replace(testDir, ''),
  }));

  test('normalizeRoutePath', () => {
    expect(isTistoryRouteFile('/pages/article/index.tsx')).toEqual(true);
    expect(isTistoryRouteFile('/Layout.tsx')).toEqual(true);
    expect(isTistoryRouteFile('/src/pages/article/index.tsx')).toEqual(true);
    expect(isTistoryRouteFile('/src/Layout.tsx')).toEqual(true);
  });

  test('extractPageName', () => {
    expect(extractPageName('Layout.tsx')).toEqual('layout');
    expect(extractPageName('pages/main/index.tsx')).toEqual('main');
    expect(extractPageName('pages/article/index.tsx')).toEqual('article');

    expect(extractPageName('src/Layout.tsx')).toEqual('layout');
    expect(extractPageName('src/pages/main/index.tsx')).toEqual('main');
    expect(extractPageName('src/pages/article/index.tsx')).toEqual('article');
  });

  test('Conventional route by file structure', async () => {
    expect(routeMeta).toMatchInlineSnapshot(`
      [
        {
          "absolutePath": "/src/Layout.tsx",
          "pageName": "layout",
          "relativePath": "src/Layout.tsx",
        },
        {
          "absolutePath": "/src/pages/article/index.jsx",
          "pageName": "article",
          "relativePath": "src/pages/article/index.jsx",
        },
        {
          "absolutePath": "/src/pages/tags/index.tsx",
          "pageName": "tags",
          "relativePath": "src/pages/tags/index.tsx",
        },
      ]
    `);
  });
});
