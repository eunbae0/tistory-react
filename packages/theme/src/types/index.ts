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
  'href' | 'onClick' | 'children' // img is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`
>;

export type RepTextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'name'
>;

export type RepSpanProps = HTMLAttributes<HTMLSpanElement>;

export type RepSectionProps = HTMLAttributes<HTMLElement>;

export { PropsWithChildren } from 'react';

export * from './jsx';
