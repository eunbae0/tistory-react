import { tistoryReactComponentsRule } from '../rules/tistory-react-components';

import { RuleTester } from 'eslint';

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2015,
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
});

ruleTester.run('tistory-react-components', tistoryReactComponentsRule, {
  valid: [
    {
      code: `import {Article} from 'tistory-react/theme'
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
    {
      code: `import {Article as AliasArticle} from 'tistory-react/theme'
          const Components = () => {
            return (
              <AliasArticle>
                <div>
                <AliasArticle.Thumbnail>
                {ARTICLE_THUMBNAIL_IMG}
                </AliasArticle.Thumbnail>
                </div>
              </AliasArticle>
            )
        }`,
    },
  ],
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
      errors: 1,
    },
    {
      code: `import {Article as AliasArticle} from 'tistory-react/theme'
          const Components = () => {
            return (
              <AliasArticle.Thumbnail>
                <div>
                  <AliasArticle>
                  {ARTICLE_THUMBNAIL_IMG}
                  </AliasArticle>
                </div>
              </AliasArticle.Thumbnail>
            )
        }`,
      errors: 1,
    },
  ],
});

console.log('All tests passed!');
