import { Article } from '@tistory-react/component/Article';
import { Comment } from '@tistory-react/component/Comment';
import { Sidebar } from '@tistory-react/component/Sidebar';
import { Tags } from '@tistory-react/component/Tags';

import type { TistoryComponentsEnum } from 'src/types';

export function getTistoryComponent(name: TistoryComponentsEnum) {
  const tistoryComponents = {
    Article,
    Comment,
    Sidebar,
    Tags,
  };
  return tistoryComponents[name];
}
