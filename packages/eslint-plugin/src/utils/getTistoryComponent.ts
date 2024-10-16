import { Article } from '@tistory-react/theme-default/Article';
import { Comment } from '@tistory-react/theme-default/Comment';
import { Sidebar } from '@tistory-react/theme-default/Sidebar';
import { Tags } from '@tistory-react/theme-default/Tags';

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
