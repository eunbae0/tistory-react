import type { Rule } from 'eslint';

export type FlatConfig = {
  name: string;
  rules: Record<string, Rule.RuleModule>;
  configs?: {
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    flat?: Object;
  };
};
