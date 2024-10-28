import type { RepWrapperProps } from '#component/types';

/**
 * 퍼머링크 페이지일 때만 표시되는 영역입니다.
 * (내부에서 사용하는 치환자는 `<Article>` 내부에서 사용하는 치환자와 동일합니다)
 * @example
 * ```
  <Article.Permalink className="articleWrap">
    <div className="titleWrap">
      <h2>
        <Article.ArticleLink>{ARTICLE_TITLE}</Article.ArticleLink>
      </h2>
      <div className="category">
        <Article.CategoryLink>{ARTICLE_CATEGORY}</Article.ArticleLink>
      </div>
      <div className="date">{ARTICLE_DATE}</div>
    </div>

    <div className="article">
      {ARTICLE_DESCRIPTION}
    </div>
  </Article.Permalink>
  ```
 */
export const Permalink = (props: RepWrapperProps) => {
  return (
    <s_permalink_article_rep>
      <div {...props} />
    </s_permalink_article_rep>
  );
};

Permalink.parent = 'Article';

/**
 * 인덱스 페이지일 때만 표시되는 영역입니다.
 * (내부에서 사용하는 치환자는 `<Article>` 내부에서 사용하는 치환자와 동일합니다)
 * @example
 * ```
  <Article.Index className="articleWrap">
    <div className="titleWrap">
      <h2>
        <Article.ArticleLink>{ARTICLE_TITLE}</Article.ArticleLink>
      </h2>
      <div className="category">
        <Article.CategoryLink>{ARTICLE_CATEGORY}</Article.ArticleLink>
      </div>
      <div className="date">{ARTICLE_DATE}</div>
    </div>

    <div className="article">
      {ARTICLE_DESCRIPTION}
    </div>
  </Article.Index>
  ```
 */
export const Index = (props: RepWrapperProps) => {
  return (
    <s_index_article_rep>
      <div {...props} />
    </s_index_article_rep>
  );
};

Index.parent = 'Article';
