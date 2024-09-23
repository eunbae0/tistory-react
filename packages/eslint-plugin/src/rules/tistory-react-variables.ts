import type { Rule } from 'eslint';

import elementType from 'jsx-ast-utils/elementType';
// import type ESTree from 'estree-jsx';
import { report } from '../utils/report';
import * as Theme from '@tistory-react/theme-default';
import { tistoryComponents } from '../constants';

const messages = {
  tistoryVariable: '{{el}} requires <{{parentEl}}> as parent component.',
};

function refersToTistoryComponents(node, shouldParentElName: string) {
  let parentNode = node.parent;
  while (parentNode.type === 'JSXElement') {
    const parentElName = elementType(parentNode.openingElement);

    if (parentElName === shouldParentElName) return true;
    parentNode = parentNode.parent;
  }
  return false;
}

export const tistoryReactVariablesRule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        "Enforce that a variable named `foo` can only be assigned a value of 'bar'.",
    },
    fixable: 'code',
    messages,
    hasSuggestions: false,
    schema: [],
  },
  create(context) {
    const reactPragma = 'Article';
    const fragmentPragma = 'Thumbnail';
    const jsxElements: any[] = [];
    const jsxExpressions: any[] = [];

    const aliasImport = new Map<string, string>([]);
    const ComponentNames = new Set([`${reactPragma}.${fragmentPragma}`]);
    const tistoryComponentParentsMap = new Map<string, string>();
    const tistoryVariableParentsMap = new Map<string, string>();

    return {
      JSXElement(node: any) {
        jsxElements.push(node);
      },
      ImportDeclaration(node: any) {
        // console.log(node);
        if (node.source && node.source.value === 'tistory-react/theme') {
          node.specifiers.forEach(spec => {
            if (
              spec.imported
              // && spec.imported.name === fragmentPragma
            ) {
              if (spec.imported.name !== spec.local.name) {
                aliasImport.set(spec.imported.name, spec.local.name);
              }
            }
          });
        }
      },
      JSXExpressionContainer(node) {
        jsxExpressions.push(node);
      },
      'Program:exit'() {
        console.log(
          Object.keys(Theme.Article)
            .filter(key => 'childVariables' in Theme.Article[key])
            .forEach(key => {
              console.log(Theme.Article[key].childVariables);
            }),
        );
        console.log(aliasImport);
        tistoryComponents.forEach(component =>
          Object.keys(Theme[component])
            .filter(key => 'parent' in Theme[component][key])
            .forEach(key => {
              tistoryComponentParentsMap.set(
                `${component}.${key}`,
                Theme[component][key].parent === component
                  ? component
                  : `${component}.${Theme[component][key].parent}`,
              );
            }),
        );
        console.log(tistoryComponentParentsMap, 'asdf');
        jsxElements.forEach(node => {
          const openingEl = node.openingElement;
          const elName = elementType(openingEl);

          if (!tistoryComponentParentsMap.has(elName)) return;
          if (
            !refersToTistoryComponents(
              node,
              tistoryComponentParentsMap.get(elName),
            )
          ) {
            report(context, 'tistoryVariable', {
              //@ts-ignore
              node,
              data: {
                el: elName,
                parentEl: tistoryComponentParentsMap.get(elName),
              },
              // fix: getFixerToShort(node),
            });
          }
        });
        jsxExpressions.forEach(node => {
          const expressionName = node.expression.name;
          // const elName = elementType(openingEl);

          // if (!tistoryComponentParentsMap.has(elName)) return;
          // if (
          //   !refersToTistoryComponents(node, tistoryComponentParentsMap.get(elName))
          // ) {
          //   report(context, messages.tistoryComponent, {
          //     //@ts-ignore
          //     node,
          //     data: {
          //       el: elName,
          //       parentEl: tistoryComponentParentsMap.get(elName),
          //     },
          //     // fix: getFixerToShort(node),
          //   });
          // }
        });
      },
    };
  },
};

// rule 1 - 부모 여부 검증? (기본)
// parants = string // string[]?
// 1. node의 parants가 존재하는지
// 2. 존재하면, 상위 node에 parants가 존재하는지
// 3. string[]으로 할 필요 없다? 어짜피 부모도 부모의 부모 컴포넌트를 검증(순회)

// rule 2 - order(순서 검증)
// compound > 최상위가 하위 컴포넌트 아래에 있는 경우
