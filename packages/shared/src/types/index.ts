import type { RsbuildConfig, RsbuildPlugin } from '@rsbuild/core';

export interface RouteMeta {
  routePath: string;
  absolutePath: string;
  relativePath: string;
  pageName: string;
  lang: string;
  version: string;
}

export interface ReplaceRule {
  search: string | RegExp;
  replace: string;
}

export interface RouteOptions {
  /**
   * The extension name of the filepath that will be converted to a route
   * @default ['js','jsx','ts','tsx','md','mdx']
   */
  extensions?: string[];
  /**
   * Include extra files from being converted to routes
   */
  include?: string[];
  /**
   * Exclude files from being converted to routes
   */
  exclude?: string[];
  /**
   * use links without .html files
   */
  cleanUrls?: boolean;
}

export interface UserConfig {
  /**
   * The root directory of the site.
   */
  root?: string;
  /**
   * Path to the logo file in nav bar.
   */
  logo?: string | { dark: string; light: string };
  /**
   * The text of the logo in nav bar.
   */
  logoText?: string;
  /**
   * Base path of the site.
   */
  base?: string;
  /**
   * Path to html icon file.
   */
  icon?: string;
  /**
   * Language of the site.
   */
  lang?: string;
  /**
   * Title of the site.
   */
  title?: string;
  /**
   * Description of the site.
   */
  description?: string;
  /**
   * Head tags.
   */
  head?: (
    | string
    | [string, Record<string, string>]
    | ((
        route: RouteMeta,
      ) => string | [string, Record<string, string>] | undefined)
  )[];
  // /**
  //  * I18n config of the site.
  //  */
  // locales?: Locale[];
  // /**
  //  * The i18n text data source path. Default is `i18n.json` in cwd.
  //  */
  // i18nSourcePath?: string;
  // /**
  //  * Theme config.
  //  */
  // themeConfig?: ThemeConfig;
  /**
   * Rsbuild Configuration
   */
  builderConfig?: RsbuildConfig;
  /**
   * The custom config of vite-plugin-route
   */
  route?: RouteOptions;
  // /**
  //  * The custom config of markdown compile
  //  */
  // markdown?: MarkdownOptions;
  // /**
  //  * Doc plugins
  //  */
  // plugins?: RspressPlugin[];
  /**
   * Replace rule, will replace the content of the page.
   */
  replaceRules?: ReplaceRule[];
  /**
   * Output directory
   */
  outDir?: string;
  /**
   * Custom theme directory
   */
  themeDir?: string;
  /**
   * Global components
   */
  globalUIComponents?: (string | [string, object])[];
  /**
   * Global styles, is a Absolute path
   */
  globalStyles?: string;
  // /**
  //  * Search options
  //  */
  // search?: SearchOptions;
  /**
   * Whether to enable ssg, default is true
   */
  ssg?: boolean;
  // /**
  //  * Whether to enable medium-zoom, default is true
  //  */
  // mediumZoom?:
  //   | boolean
  //   | {
  //       selector?: string;
  //       options?: ZoomOptions;
  //     };
  /**
   * Add some extra builder plugins
   */
  builderPlugins?: RsbuildPlugin[];
  /**
   * Multi version config
   */
  multiVersion?: {
    /**
     * The default version
     */
    default?: string;
    /**
     * The version list, such as ['v1', 'v2']
     */
    versions: string[];
  };
}