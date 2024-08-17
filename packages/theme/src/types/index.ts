import type {
  HTMLAttributes,
  AnchorHTMLAttributes,
  ImgHTMLAttributes,
} from 'react';

export type RepWrapperProps = HTMLAttributes<HTMLDivElement>;

export type RepAnchorProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'onClick'
>;

export type RepImgProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'href' | 'onClick'
>;

export { PropsWithChildren } from 'react';

export * from './jsx';
