export function extractPageName(relativePath: string): string {
  return relativePath
    .replace(/src\//, '')
    .replace(/pages\//, '')
    .replace(/\/index/, '')
    .replace(/\.[^\/]+$/, '')
    .toLowerCase();
}
