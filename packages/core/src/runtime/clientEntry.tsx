import { isProduction } from '@tistory-react/shared';
import { BrowserRouter } from '@tistory-react/runtime';
import { App } from './App';
import { DevTools } from '@tistory-react/devtool';
import { useRemoveTistoryTags } from 'utils';

import '@tistory-react/devtool/css';

export async function renderInBrowser() {
  const container = document.getElementById('root')!;

  const RootApp = () => {
    useRemoveTistoryTags();
    return (
      <BrowserRouter>
        <App />
        <DevTools />
      </BrowserRouter>
    );
  };

  if (process.env.__IS_REACT_18__) {
    const { createRoot } = require('react-dom/client');
    createRoot(container).render(<RootApp />);
  } else {
    const ReactDOM = require('react-dom');
    if (isProduction()) {
      ReactDOM.hydrate(<RootApp />, container);
    } else {
      ReactDOM.render(<RootApp />, container);
    }
  }
}

renderInBrowser();
