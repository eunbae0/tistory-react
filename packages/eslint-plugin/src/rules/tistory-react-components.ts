import type { Rule } from 'eslint';
import elementType from 'jsx-ast-utils/elementType';

import { report } from '../utils/report';
import { tistoryComponents } from '../constants';

import * as Theme from '@tistory-react/theme-default';

const messages = {
  tistoryComponent: '<{{el}}> requires <{{parentEl}}> as parent component.',
};

function hasTistoryParentEl(node, shouldParentElName: string) {
  let parentNode = node.parent;
  while (parentNode.type === 'JSXElement') {
    const parentElName = elementType(parentNode.openingElement);

    if (parentElName === shouldParentElName) return true;
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

    const aliasImport = new Map<string, string>([]);
    const tistoryComponentParentsMap = new Map<string, string>();

    return {
      JSXElement(node: any) {
        jsxElements.push(node);
      },
      ImportDeclaration(node: any) {
        if (node.source && node.source.value === 'tistory-react/theme') {
          node.specifiers.forEach(spec => {
            if (
              spec.imported &&
              tistoryComponents.indexOf(spec.imported.name) > -1
            ) {
              if (spec.imported.name !== spec.local.name) {
                aliasImport.set(spec.imported.name, spec.local.name);
              }
            }
          });
        }
      },
      'Program:exit'() {
        tistoryComponents.forEach(component =>
          Object.keys(Theme[component])
            .filter(key => 'parent' in Theme[component][key])
            .forEach(key => {
              const rootComponent = aliasImport.has(component)
                ? aliasImport.get(component)
                : component;

              // Case: parent is root component
              if (Theme[component][key].parent === component) {
                tistoryComponentParentsMap.set(
                  `${rootComponent}.${key}`,
                  rootComponent,
                );
              } else
                tistoryComponentParentsMap.set(
                  `${rootComponent}.${key}`,
                  `${rootComponent}.${Theme[component][key].parent}`,
                );
            }),
        );
        jsxElements.forEach(node => {
          const openingEl = node.openingElement;
          const elName = elementType(openingEl);

          if (!tistoryComponentParentsMap.has(elName)) return;
          if (
            !hasTistoryParentEl(node, tistoryComponentParentsMap.get(elName))
          ) {
            report(context, 'tistoryComponent', {
              node,
              data: {
                el: elName,
                parentEl: tistoryComponentParentsMap.get(elName),
              },
            } as Omit<Rule.ReportDescriptor, 'messageId'>);
          }
        });
      },
    };
  },
};
