import deepmerge from 'deepmerge';
import type { TistorySkinInfo } from '../types';

export const mergeXmlConfig = <T = TistorySkinInfo>(...configs: T[]): T => {
  if (configs.length === 2) {
    return deepmerge(configs[0], configs[1]) as T;
  }

  if (configs.length < 2) {
    return configs[0];
  }

  return configs.reduce(
    (result, config) => deepmerge(result, config) as T,
    {} as T,
  );
};
