import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  TISTORY_REACT_TEMP_DIR,
  type TistorySkinConfig,
  type TistorySkinAuthorConfig,
  type TistorySkinDefaultConfig,
  type TistorySkinInformationConfig,
} from '@tistory-react/shared';

export const isProduction = () => process.env.NODE_ENV === 'production';

// Keep the quotation marks consistent before and after.
export const importStatementRegex =
  /import\s+(.*?)\s+from\s+(['"])(.*?)(?:"|');?/gm;

const dirname = path.dirname(fileURLToPath(new URL(import.meta.url)));

export const PACKAGE_ROOT = path.join(dirname, '..');

export const CLIENT_ENTRY = path.join(
  PACKAGE_ROOT,
  'dist',
  'runtime',
  'clientEntry.js',
);

export const SSR_ENTRY = path.join(
  PACKAGE_ROOT,
  'dist',
  'runtime',
  'ssrEntry.js',
);

export const OUTPUT_DIR = 'build';
export const BUNDLE_DIR = 'images';

export const APP_HTML_MARKER = '<!--<?- DOC_CONTENT ?>-->';
export const HEAD_MARKER = '<!--<?- HEAD ?>-->';
export const META_GENERATOR = '<!--<?- GENERATOR ?>-->';
export const HTML_START_TAG = '<html';
export const BODY_START_TAG = '<body';

export const DEFAULT_TITLE = '[##_page_title_##]';

export const PUBLIC_DIR = 'public';
export const TEMP_DIR = path.join(
  process.cwd(),
  'node_modules',
  TISTORY_REACT_TEMP_DIR,
);

export const TEMP_ONCLICK_ATTR = 'data-onclick';
export const TEMP_ONKEYPRESS_ATTR = 'data-onkeypress';

export const TISTORY_TAG_IDENTIFIER = 'data-is-tistory-tag="true"';

export const DEFAULT_TISTORY_SKIN_INFORMATION_CONFIG: TistorySkinInformationConfig =
  {
    name: '',
    version: '',
    description: '',
    license: '',
  };

export const DEFAULT_TISTORY_SKIN_AUTHOR_CONFIG: TistorySkinAuthorConfig = {
  name: '',
  homepage: '',
  email: '',
};

export const DEFAULT_TISTORY_SKIN_DEFAULT_CONFIG: TistorySkinDefaultConfig = {
  recentEntries: 5,
  recentComments: 5,
  recentTrackbacks: 5,
  itemsOnGuestbook: 10,
  tagsInCloud: 30,
  sortInCloud: 3,
  expandComment: 0,
  expandTrackback: 0,
  lengthOfRecentNotice: 25,
  lengthOfRecentEntry: 27,
  lengthOfRecentComment: 30,
  lengthOfRecentTrackback: 30,
  lengthOfLink: 30,
  showListOnCategory: 1,
  showListLock: 1,
  tree: {
    color: '000000',
    bgColor: 'ffffff',
    activeColor: '000000',
    activeBgColor: 'eeeeee',
    labelLength: 27,
    showValue: 1,
  },
  contentWidth: 0,
};

export const DEFAULT_TISTORY_SKIN_CONFIG: TistorySkinConfig = {
  information: DEFAULT_TISTORY_SKIN_INFORMATION_CONFIG,
  author: DEFAULT_TISTORY_SKIN_AUTHOR_CONFIG,
  default: DEFAULT_TISTORY_SKIN_DEFAULT_CONFIG,
};

export const XML_DECLARATION = {
  _declaration: { _attributes: { version: '1.0', encoding: 'utf-8' } },
};
