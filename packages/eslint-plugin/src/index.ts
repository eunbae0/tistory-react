import { rules } from './rules';
import type { FlatConfig } from './types';

const plugin: FlatConfig = {
  name: 'tistory-react-eslint-plugin',
  rules,
};

export default plugin;

plugin.configs.flat = {
  recommended: {
    plugins: { tistory: plugin },
    rules: {
      'tistory/tistory-react-components': 'error',
    },
  },
};
