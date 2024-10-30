import { Content } from '@tistory-react/runtime';
import { DevTools } from '@tistory-react/devtool';
import { useRemoveTistoryTags } from './utils';

export function App() {
  useRemoveTistoryTags();

  return (
    <div>
      <Content />
      <DevTools />
    </div>
  );
}
