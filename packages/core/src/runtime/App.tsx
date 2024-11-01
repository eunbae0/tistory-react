import { Content } from '@tistory-react/runtime';
import { DevTools } from '@tistory-react/devtool';
import { useRemoveTistoryTags } from './utils';

import '@tistory-react/devtool/css';

export function App() {
  useRemoveTistoryTags();

  return (
    <div>
      <Content />
      <DevTools />
    </div>
  );
}
