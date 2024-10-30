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
   * Base path of the site.
   */
  base?: string;
  /**
   * Path to html icon file.
   */
  icon?: string;
  /**
   * Language of html tag.
   * @default
   * lang="ko"
   */
  lang?: string;
  /**
   * Custom html meta tag.
   */
  meta?: {
    /**
     * Title of the site.
     * @default
     * [##_page_title_##] :: [##_title_##]
     */
    title?: string;
    /**
     * Description of the site.
     * @default
     * [##_desc_##]
     */
    description?: string;
  };
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
  /**
   * dev mode settings
   */
  dev?: {
    /**
     * 티스토리 치환자 -> 기본 예시 문구로의 치환 여부
     * @default enableVariableSwap = true
     */
    enableVariableSwap?: boolean;
  };
}

export * from './tistory';
