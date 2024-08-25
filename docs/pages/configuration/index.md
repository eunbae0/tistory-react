# 기본 구성 파일

```typescript
interface UserConfig {
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
    head?: (string | [string, Record<string, string>] | ((route: RouteMeta) => string | [string, Record<string, string>] | undefined))[];
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
```