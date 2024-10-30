import { Article, ARTICLE_TITLE, ARTICLE_CATEGORY, ARTICLE_DATE, ARTICLE_DESCRIPTION } from 'tistory-react/component/Article';

export default function ArticleService() {
  return (
    <Article className="articleWrap">
    <div className="titleWrap">
      <h2>
        <Article.ArticleLink>{ARTICLE_TITLE}</Article.ArticleLink>
      </h2>
      <div className="category">
        <Article.CategoryLink>{ARTICLE_CATEGORY}</Article.CategoryLink>
      </div>
      <div className="date">{ARTICLE_DATE}</div>
    </div>

    <div className="article">
      {ARTICLE_DESCRIPTION}
    </div>
  </Article>
  );
}

