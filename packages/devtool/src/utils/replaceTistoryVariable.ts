import type { ConvertedVariables } from 'types';

export const replaceTistoryVariable = (
  node: Element,
  convertedVariables: ConvertedVariables,
) => {
  if (!node.childNodes.length) return;

  node.childNodes.forEach(child => {
    if (child.nodeType === Node.TEXT_NODE) {
      replaceTextNodeValue(child, convertedVariables);
    } else if (child instanceof HTMLAnchorElement) {
      replaceHrefValue(child, convertedVariables);
    }
  });
};

const replaceTextNodeValue = (
  child: ChildNode,
  convertedVariables: ConvertedVariables,
) => {
  const matches = child.nodeValue.match(/\[##\_.*?\_##\]/g);
  if (matches) {
    matches.forEach(match => {
      child.nodeValue = child.nodeValue.replace(
        /\[##\_.*?\_##\]/g,
        convertedVariables.get(match) ?? match,
      );
    });
  }
};

const replaceHrefValue = (child: HTMLAnchorElement, convertedVariables) => {
  const matches = child.href.match(/\[##\_.*?\_##\]/g);
  if (matches) {
    matches.forEach(match => {
      child.href = child.href.replace(
        /\[##\_.*?\_##\]/g,
        convertedVariables.get(match) ?? match,
      );
    });
  }
};
