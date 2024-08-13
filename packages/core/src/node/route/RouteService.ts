import path from 'node:path';
import type { RouteMeta } from '@tistory-react/shared';
import { normalizePath, isTistoryRouteFile, extractPageName } from '../utils';

export const DEFAULT_PAGE_EXTENSIONS = ['js', 'jsx', 'ts', 'tsx'];
export const DEFAULT_PAGE_ROUTE_PATHS = ['main', 'article', 'tags'];

export class RouteService {
  routeData: Map<string, RouteMeta> = new Map();

  #scanDir: string;

  #extensions: string[] = [];

  #pageRoutePaths: string[] = [];

  constructor(scanDir: string) {
    this.#scanDir = scanDir;
    this.#extensions = DEFAULT_PAGE_EXTENSIONS;
    this.#pageRoutePaths = DEFAULT_PAGE_ROUTE_PATHS;
  }

  async init() {
    const globby = (await import('@tistory-react/shared/globby')).globby;

    // 1. Filter page route paths file
    const files = await globby(
      [
        `**/pages/{${this.#pageRoutePaths.join(',')}}/index.{${this.#extensions.join(',')}}`,
        `**/Layout.{${this.#extensions.join(',')}}`,
      ],
      {
        cwd: this.#scanDir,
        absolute: true,
        ignore: [
          '**/node_modules/**',
          `**/.eslintrc.${this.#extensions.join(',')}`,
        ],
      },
    );

    const filesRelativePath = files.sort().map(
      filePath => normalizePath(path.relative(this.#scanDir, filePath)), // ex. src/pages/article/index.tsx
    );

    // 2. Error handling if required file does not exist
    filesRelativePath.forEach(defaultRoutePath => {
      if (!isTistoryRouteFile(defaultRoutePath))
        throw new Error(
          `Required file does not include path: /${defaultRoutePath}`,
        );
    });

    // 3. Generate routeInfo
    filesRelativePath.forEach(relativePath => {
      const absolutePath = path.join(this.#scanDir, relativePath);

      const routeInfo = {
        absolutePath: normalizePath(absolutePath),
        relativePath: relativePath,
        pageName: extractPageName(relativePath),
      };
      this.addRoute(routeInfo);
    });
  }

  addRoute(routeInfo: RouteMeta) {
    const { pageName } = routeInfo;
    this.routeData.set(pageName, routeInfo);
  }

  getRoutes() {
    return Array.from(this.routeData.values());
  }

  isEmpty() {
    return this.routeData.size === 0;
  }

  generateRoutesCode(isStaticImport = false) {
    return this.generateRoutesCodeByRouteMeta(this.getRoutes(), isStaticImport);
  }

  generateRoutesCodeByRouteMeta(
    routeMeta: RouteMeta[],
    isStaticImport: boolean,
  ) {
    return `
import React from 'react';
import { lazyWithPreload } from "react-lazy-with-preload";
${routeMeta
  .map((route, index) => {
    return isStaticImport
      ? `import * as Route${index} from '${route.absolutePath}';`
      : `const Route${index} = lazyWithPreload(() => import('${route.absolutePath}'))`;
  })
  .join('\n')}
export const routes = [
${routeMeta
  .map((route, index) => {
    const component = isStaticImport
      ? `Route${index}.default`
      : `Route${index}`;
    /**
     * For SSR, example:
     * {
     *   pageName: 'article',
     *   element: jsx(Route0),
     *   filePath: 'src/pages/article/index.tsx'
     * }
     *
     * For client render, example:
     * {
     *   pageName: 'layout',
     *   element: jsx(Route0.default),
     *   filePath: 'src/Layout.tsx'
     * }
     */
    return `{ pageName: '${route.pageName}', element: React.createElement(${component}), filePath: '${route.relativePath}' }`;
  })
  .join(',\n')}
];
`;
  }
}
