import { tistoryReactVariablesRule } from '../rules/tistory-react-variables';

import { RuleTester } from 'eslint';

const ruleTester = new RuleTester({
  // Must use at least ecmaVersion 2015 because
  // that's when `const` variables were introduced.
  languageOptions: {
    ecmaVersion: 2015,
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
});

// Throws error if the tests in ruleTester.run() do not pass
ruleTester.run(
  'tistory-react-variables', // rule name
  tistoryReactVariablesRule, // rule code
  {
    // checks
    // 'valid' checks cases that should pass
    valid: [
      {
        code: `import {Article as Ar, asdf} from 'tistory-react/theme'
          const Components = () => {
            return (
              <Article>
                <div>
                <Article.Thumbnail>
                {ARTICLE_THUMBNAIL_IMG}
                </Article.Thumbnail>
                </div>
              </Article>
            )
        }`,
      },
    ],
    // 'invalid' checks cases that should not pass
    invalid: [
      {
        code: `import {Article} from 'tistory-react/theme'
          const Components = () => {
            return (
              <Article.Thumbnail>
                <Article>
                {ARTICLE_THUMBNAIL_IMG}
                </Article>
              </Article.Thumbnail>
            )
        }`,
        // output: 'const foo = "bar";',
        errors: 1,
      },
    ],
  },
);

console.log('All tests passed!');