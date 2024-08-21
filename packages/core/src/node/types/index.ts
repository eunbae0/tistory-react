import type {
  TistorySkinConfig,
  TistorySkinInformationConfig,
} from '@tistory-react/shared';
import type { ElementCompact } from 'xml-js';

export interface TistorySkinInfo extends Omit<ElementCompact, '_declaration'> {
  skin: ChangeTypes<
    TistorySkinConfig,
    'information',
    ChangeTypes<
      TistorySkinInformationConfig,
      'description' | 'license',
      string | Omit<ElementCompact, '_cdata'>
    >
  >;
}

type ChangeTypes<T, K extends keyof T, NewType> = {
  [P in keyof T]: P extends K ? NewType : T[P];
};
