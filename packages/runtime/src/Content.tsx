import { useLocation } from 'react-router-dom';
import { removeLeadingSlash } from '@tistory-react/shared';

const { routes } = process.env.__SSR__
  ? (require('virtual-routes-ssr') as typeof import('virtual-routes-ssr'))
  : (require('virtual-routes') as typeof import('virtual-routes'));

export const Content = () => {
  const isSSR = process.env.__SSR__;

  const layoutElement = routes.find(
    route => route.pageName === 'layout',
  )!.element;

  if (!isSSR) {
    const { pathname } = useLocation();

    layoutElement.props = {
      children: routes.find(
        route => route.pageName === removeLeadingSlash(pathname),
      )?.element,
    };
    return layoutElement;
  }

  const routesElements = routes
    .filter(route => route.pageName !== 'layout')
    .map(route => route.element);

  layoutElement.props = { children: routesElements };

  return layoutElement;
};
