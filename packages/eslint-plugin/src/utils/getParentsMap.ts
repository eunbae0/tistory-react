import type { ComponentsType, TistoryComponentsEnum } from 'src/types';
import * as Article from '@tistory-react/theme-default/Article';
export async function getComponentsAsync(
  tistoryComponent: TistoryComponentsEnum,
) {
  return (await import(
    `@tistory-react/theme-default/${tistoryComponent}`
  )) as ComponentsType;
}

export async function getParentsMap(
  tistoryComponent: TistoryComponentsEnum,
  aliasImport: Map<string, string>,
) {
  const Theme = await getComponentsAsync(tistoryComponent);
  const tistoryComponentParentsMap = new Map<string, string>();

  Object.keys(Theme[tistoryComponent])
    .filter(key => 'parent' in Theme[tistoryComponent][key])
    .forEach(key => {
      const rootComponent = aliasImport.has(tistoryComponent)
        ? aliasImport.get(tistoryComponent)
        : tistoryComponent;

      // Case: parent is root tistoryComponent
      if (Theme[tistoryComponent][key].parent === tistoryComponent) {
        tistoryComponentParentsMap.set(
          `${rootComponent}.${key}`,
          rootComponent,
        );
      } else
        tistoryComponentParentsMap.set(
          `${rootComponent}.${key}`,
          `${rootComponent}.${Theme[tistoryComponent][key].parent}`,
        );
    });

  return tistoryComponentParentsMap;
}
