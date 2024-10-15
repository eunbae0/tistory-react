import type { Article } from '@tistory-react/theme-default/Article';
import type { Comment } from '@tistory-react/theme-default/Comment';
import type { Sidebar } from '@tistory-react/theme-default/Sidebar';
import type { Tags } from '@tistory-react/theme-default/Tags';

export type ComponentsType =
  | typeof Article
  | typeof Comment
  | typeof Sidebar
  | typeof Tags;

export type TistoryComponentsEnum =
  | 'Article'
  | 'Comment'
  | 'Sidebar'
  | 'Tags'
  | 'Guset';
