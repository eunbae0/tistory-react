import type { PropsWithChildren } from 'react';

export type LayoutComponentProps = PropsWithChildren;

export default function Layout({ children }: LayoutComponentProps) {
  return (
    <div>
      Layout
      {children}
    </div>
  );
}
