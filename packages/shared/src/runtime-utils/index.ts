export const TISTORY_REACT_TEMP_DIR = '.tistory-react';

export const isDebugMode = () => {
  if (!process.env.DEBUG) {
    return false;
  }
  const values = process.env.DEBUG?.toLocaleLowerCase().split(',') ?? [];
  return ['rsbuild', 'builder', '*'].some(key => values.includes(key));
};

export const isProduction = () => process.env.NODE_ENV === 'production';

export function slash(str: string) {
  return str.replace(/\\/g, '/');
}

export function normalizePosixPath(id: string): string {
  const path = slash(id);
  const isAbsolutePath = path.startsWith('/');
  const parts = path.split('/');

  const normalizedParts = [];
  for (const part of parts) {
    if (part === '.' || part === '') {
      // Ignore "." and empty parts
    } else if (part === '..') {
      // Go up one level for ".." part
      if (
        normalizedParts.length > 0 &&
        normalizedParts[normalizedParts.length - 1] !== '..'
      ) {
        normalizedParts.pop();
      } else if (isAbsolutePath) {
        // Preserve leading ".." in absolute paths
        normalizedParts.push('..');
      }
    } else {
      // Add other parts
      normalizedParts.push(part);
    }
  }

  let normalizedPath = normalizedParts.join('/');
  if (isAbsolutePath) {
    normalizedPath = `/${normalizedPath}`;
  }

  return normalizedPath;
}
export function addLeadingSlash(url: string) {
  return url.charAt(0) === '/' || isExternalUrl(url) ? url : `/${url}`;
}

export function removeLeadingSlash(url: string) {
  return url.charAt(0) === '/' ? url.slice(1) : url;
}

export function removeTrailingSlash(url: string) {
  return url.charAt(url.length - 1) === '/' ? url.slice(0, -1) : url;
}

export function normalizeSlash(url: string) {
  return removeTrailingSlash(addLeadingSlash(normalizePosixPath(url)));
}

export function isExternalUrl(url = '') {
  return (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('mailto:') ||
    url.startsWith('tel:')
  );
}
