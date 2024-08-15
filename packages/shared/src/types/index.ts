import type { RsbuildConfig, RsbuildPlugin } from '@rsbuild/core';
import type { TistorySkinConfig } from './tistory';

export interface Route {
  pageName: string;
  element: React.ReactElement;
  filePath: string;
}

export interface RouteMeta {
  absolutePath: string;
  relativePath: string;
  pageName: string;
}

export interface ReplaceRule {
  search: string | RegExp;
  replace: string;
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
  /**
   * Rsbuild Configuration
   */
  builderConfig?: RsbuildConfig;
  /**
   * Output directory
   */
  outDir?: string;
  /**
   * Add some extra builder plugins
   */
  builderPlugins?: RsbuildPlugin[];
  /**
   * 스킨에 필요한 정보를 담고 있는 xml 파일의 설정
   */
  skinInfoConfig?: TistorySkinConfig;
}

export * from './tistory';
