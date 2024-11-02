import type { Rule } from 'eslint';
import jsxAstUtils from 'jsx-ast-utils';

import { report } from '../utils/report';
import { TISTORY_REACT_THEME, tistoryComponentNames } from '../constants';
import type { TistoryComponentsEnum } from '../types/tistory';
import { getTistoryComponent } from '../utils/getTistoryComponent';

const messages = {
  tistoryComponent: '<{{el}}> requires <{{parentEl}}> as parent component.',
};

function hasParentComponent(node, targetParentElName: string) {
  let parentNode = node.parent;
  while (parentNode.type === 'JSXElement') {
    const parentElName = jsxAstUtils.elementType(parentNode.openingElement);

    if (parentElName === targetParentElName) return true;
    parentNode = parentNode.parent;
  }
  return false;
}

export const tistoryReactComponentsRule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Tistory 컴포넌트는 특정 상위 컴포넌트를 가지는 컴포넌트가 있습니다.',
    },
    // fixable: 'code',
    messages,
    hasSuggestions: false,
    schema: [],
  },
  create(context) {
    const jsxElements: any[] = [];

    const importTistoryComponents = new Set<string>();
    /**
     * @example ```
     * import {Article as AliasArticle} from 'tistory-react/component/Article'
     * // Map(['AliasArticle', 'Article'])
     * ```
     */
    const aliasImport = new Map<string, string>([]);

    return {
      JSXElement(node: any) {
        jsxElements.push(node);
      },
      ImportDeclaration(node: any) {
        if (node.source?.value.includes(TISTORY_REACT_THEME)) {
          node.specifiers.forEach(spec => {
            if (
              spec.imported &&
              tistoryComponentNames.indexOf(spec.imported.name) > -1
            ) {
              if (spec.imported.name !== spec.local.name) {
                aliasImport.set(spec.local.name, spec.imported.name);
              }
              importTistoryComponents.add(spec.local.name);
            }
          });
        }
      },
      'Program:exit'() {
        jsxElements.forEach(node => {
          const openingEl = node.openingElement;
          const elName = jsxAstUtils.elementType(openingEl);
          const [root, compoundChild] = elName.split('.');

          // 1. Tistory theme에서 사용되는 compound component인지 검증 // ex. Article.Thumbnail
          const isTistoryCompound =
            importTistoryComponents.has(root) && compoundChild;
          if (!isTistoryCompound) return;

          const isAliasImport = aliasImport.has(root);

          const rootTistoryComponentName = isAliasImport
            ? (aliasImport.get(root) as TistoryComponentsEnum)
            : (root as TistoryComponentsEnum);

          const tistoryComponent = getTistoryComponent(
            rootTistoryComponentName,
          );

          // 2. 현재 컴포넌트가 parent property를 가지고 있는지 검증
          const currentComponent = tistoryComponent[compoundChild];

          if (!Object.hasOwn(currentComponent, 'parent')) return;

          const targetParent =
            currentComponent.parent === rootTistoryComponentName
              ? root
              : `${root}.${currentComponent.parent}`;

          // 3. Target parent가 상위 node에 있는지 검증
          if (!hasParentComponent(node, targetParent))
            report(context, 'tistoryComponent', {
              node,
              data: {
                el: elName,
                parentEl: targetParent,
              },
            } as Omit<Rule.ReportDescriptor, 'messageId'>);
        });
      },
    };
  },
};
