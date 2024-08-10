export const DEFAULT_ROUTE_PATHS = [
  'main/index.',
  'article/index.',
  'tags/index.',
  'Layout.',
];

export function isTistoryRouteFile(routePath: string): boolean {
  return DEFAULT_ROUTE_PATHS.map(path => routePath.includes(path)).includes(
    true,
  );
}
