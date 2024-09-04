import type {
  HTMLAttributes,
  AnchorHTMLAttributes,
  ImgHTMLAttributes,
  TextareaHTMLAttributes,
  InputHTMLAttributes,
  OlHTMLAttributes,
  LiHTMLAttributes,
} from 'react';

export type RepWrapperProps = HTMLAttributes<HTMLDivElement>;

export type RepOlProps = OlHTMLAttributes<HTMLOListElement>;
export type RepUlProps = HTMLAttributes<HTMLUListElement>;
export type RepLiProps = Omit<
  LiHTMLAttributes<HTMLLIElement>,
  'id' | 'onClick'
>;

export type RepAnchorProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'onClick'
> & { label?: string };

export type RepInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> & { label?: string };

export type RepImgProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'href' | 'onClick'
>;

export type RepTextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'name'
>;

export type RepSpanProps = HTMLAttributes<HTMLSpanElement>;

export { PropsWithChildren } from 'react';

export * from './jsx';
