import { rules } from './rules';

const plugin = {
  name: 'tistory-react-eslint-plugin',
  rules,
  configs: {
    recommended: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
};

export default plugin;
