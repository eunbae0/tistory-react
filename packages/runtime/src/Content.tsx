import { useLocation } from 'react-router-dom';
import { removeLeadingSlash } from '@tistory-react/shared';
import { createElement } from 'react';

const { routes } = require('virtual-routes') as typeof import('virtual-routes');

export const Content = () => {
  const isSSR = process.env.__SSR__;

  const layoutElement = routes.find(
    route => route.pageName === 'layout',
  )!.element;

  if (!isSSR) {
    const { pathname } = useLocation();
    const pathElement = routes.find(
      route => route.pageName === removeLeadingSlash(pathname),
    )?.element;

    // biome-ignore lint/correctness/noChildrenProp: <explanation>
    return createElement(layoutElement.type, { children: pathElement });
  }

  const routesElements = routes
    .filter(route => route.pageName !== 'layout')
    .map(route => route.element);

  // biome-ignore lint/correctness/noChildrenProp: <explanation>
  return createElement(layoutElement.type, { children: routesElements });
};
