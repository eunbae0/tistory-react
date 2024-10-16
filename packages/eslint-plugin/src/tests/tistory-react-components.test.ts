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
      code: `import {Article, ARTICLE_COMMENT_COUNT} from 'tistory-react/theme/Article'
      import {Comment} from 'tistory-react/theme/Comment'
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
      code: `import {Article as AliasArticle} from 'tistory-react/theme/Article'
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
    {
      code: `import {Article, ARTICLE_COMMENT_COUNT} from 'tistory-react/theme/Article'
      import {Comment} from 'tistory-react/theme/Comment'
          const Components = () => {
            return (
              <Article>
                <div>
                  <Article.Thumbnail>
                    <Article.ThumbnailImg />
                  </Article.Thumbnail>
                </div>
              </Article>
            )
        }`,
    },
    {
      code: `import {Article as AliasArticle} from 'tistory-react/theme/Article'
          const Components = () => {
            return (
              <AliasArticle>
                <div>
                  <AliasArticle.Thumbnail>
                    <AliasArticle.ThumbnailImg />
                  </AliasArticle.Thumbnail>
                </div>
              </AliasArticle>
            )
        }`,
    },
    {
      code: `import {Article, ARTICLE_COMMENT_COUNT} from 'tistory-react/theme/Article'
      import {Comment} from 'tistory-react/theme/Comment'
          const Components = () => {
            return (
              <>
                <Article>
                  <div>
                    <Article.Thumbnail>
                      <Article.ThumbnailImg />
                      {ARTICLE_THUMBNAIL_IMG}
                    </Article.Thumbnail>
                    <Article.CommentCount>
                      {ARTICLE_COMMENT_COUNT}
                    </Article.CommentCount>
                  </div>
                </Article>
                <Comment>
                  <Comment.ListWrapper>
                    <Comment.List />
                  </Comment.ListWrapper>
                </Comment>
              </>
            )
        }`,
    },
  ],
  invalid: [
    {
      code: `import {Article, ARTICLE_COMMENT_COUNT} from 'tistory-react/theme/Article'
      import {Comment} from 'tistory-react/theme/Comment'
          const Components = () => {
            return (
              <div>
                <Article.Thumbnail>
                  {ARTICLE_THUMBNAIL_IMG}
                </Article.Thumbnail>
              </div>
            )
        }`,
      errors: 1,
    },
    {
      code: `import {Article as AliasArticle} from 'tistory-react/theme/Article'
          const Components = () => {
            return (
              <div>
                <AliasArticle.Thumbnail>
                  {ARTICLE_THUMBNAIL_IMG}
                </AliasArticle.Thumbnail>
              </div>
            )
        }`,
      errors: 1,
    },
    {
      code: `import {Article, ARTICLE_COMMENT_COUNT} from 'tistory-react/theme/Article'
      import {Comment} from 'tistory-react/theme/Comment'
          const Components = () => {
            return (
              <Article>
                <div>
                  <Article.ThumbnailImg />
                </div>
              </Article>
            )
        }`,
      errors: 1,
    },
    {
      code: `import {Article as AliasArticle} from 'tistory-react/theme/Article'
          const Components = () => {
            return (
              <AliasArticle>
                <div>
                  <AliasArticle.ThumbnailImg />
                </div>
              </AliasArticle>
            )
        }`,
      errors: 1,
    },
    {
      code: `import {Article, ARTICLE_COMMENT_COUNT} from 'tistory-react/theme/Article'
      import {Comment} from 'tistory-react/theme/Comment'
          const Components = () => {
            return (
              <>
                <Article>
                  <div>
                    <Article.Thumbnail>
                      <Article.ThumbnailImg />
                    </Article.Thumbnail>
                    <Article.CommentCount>
                      {ARTICLE_COMMENT_COUNT}
                    </Article.CommentCount>
                  </div>
                </Article>
                <Comment>
                  <Comment.List />
                </Comment>
              </>
            )
        }`,
      errors: 1,
    },
  ],
});

console.log('All tests passed!');
