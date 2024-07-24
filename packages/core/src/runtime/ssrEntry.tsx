import { renderToString } from 'react-dom/server';
import { StaticRouter } from '@tistory-react/runtime/server';
import { App } from './App';

export async function render(pagePath: string): Promise<{ appHtml: string }> {
  const appHtml = renderToString(
    <StaticRouter location={pagePath}>
      <App />
    </StaticRouter>,
  );

  return {
    appHtml,
  };
}
