import type {
  PropsWithChildren,
  RepAnchorProps,
  RepImgProps,
  RepWrapperProps,
} from '#theme/types';
import {
  Admin,
  AdminModifyLink,
  AdminModifyLinkWithNewWindow,
  AdminStateChangeLink,
  AdminTrackBackLink,
  AdminDeleteLink,
} from './Admin';
import {
  Related,
  RelatedLink,
  RelatedThumbnail,
  RelatedThumbnailImg,
} from './Related';
import { Tag } from './Tag';
import { Prev, PrevLink, PrevThumbNail, PrevThumbNailImg } from './Prev';
import { Next, NextLink, NextThumbNail, NextThumbNailImg } from './Next';

/** 
 * 글 그룹 치환자 
 * @example
 * ```
  <Article className="articleWrap">
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
  </Article>
  ```
 */
export const Article = (props: RepWrapperProps) => {
  return (
    <s_article_rep>
      <div {...props} />
    </s_article_rep>
  );
};

/**
 * 블로그 글의 고유 주소 링크
 */
const ArticleLink = (props: RepAnchorProps) => {
  return <a href="[##_article_rep_link_##]" {...props} />;
};

/**
 * 카테고리 링크
 */
const CategoryLink = (props: RepAnchorProps) => {
  return <a href="[##_article_rep_category_link_##]" {...props} />;
};

/**
 * 댓글을 열고 닫는 온클릭 이벤트
 */
const RedirectCommentLink = (props: RepAnchorProps) => {
  return <a href="[##_article_rep_rp_link_##]" {...props} />;
};

/**
 * 대표 이미지 썸네일이 표시되는 영역 (대표 이미지가 없는 경우 표시되지 않음)
 */
const Thumbnail = ({ children }: PropsWithChildren) => {
  return <s_article_rep_thumbnail>{children}</s_article_rep_thumbnail>;
};

const ThumbnailImg = (props: RepImgProps) => {
  return <img src={ARTICLE_THUMBNAIL_URL} alt="Article Thumbnail" {...props} />;
};

/**
 * 댓글의 갯수를 출력하는 영역
 */
const CommentCount = ({ children }: PropsWithChildren) => {
  return <s_rp_count>{children}</s_rp_count>;
};

/**
 * 블로그 글의 제목
 */
export const ARTICLE_TITLE = '[##_article_rep_title_##]';

/**
 * 카테고리 명
 */
export const ARTICLE_CATEGORY = '[##_article_rep_category_##]';

/**
 * 글쓴 날짜/시간 (yyyy. m. d. HH:MM)
 */
export const ARTICLE_DATE = '[##_article_rep_date_##]';

/**
 * 글쓴 날짜 (yyyy. m. d.)
 */
export const ARTICLE_SIMPLE_DATE = '[##_article_rep_simple_date_##]';

/**
 * 글쓴 세부시간 - 연도 (yyyy)
 */
export const ARTICLE_DATE_YEAR = '[##_article_rep_date_year_##]';

/**
 * 글쓴 세부시간 - 월 (mm)
 */
export const ARTICLE_DATE_MONTH = '[##_article_rep_date_month_##]';

/**
 * 글쓴 세부시간 - 일 (dd)
 */
export const ARTICLE_DATE_DAY = '[##_article_rep_date_day_##]';

/**
 * 글쓴 세부시간 - 시 (HH)
 */
export const ARTICLE_DATE_HOUR = '[##_article_rep_date_hour_##]';

/**
 * 글쓴 세부시간 - 분 (MM)
 */
export const ARTICLE_DATE_MINUTE = '[##_article_rep_date_minute_##]';

/**
 * 글쓴 세부시간 - 초 (SS)
 */
export const ARTICLE_DATE_SECOND = '[##_article_rep_date_second_##]';

/**
 * 작성자 이름 (*팀블로그용 치환자)
 */
export const ARTICLE_AUTHOR = '[##_article_rep_author_##]';

/**
 * 블로그 본문 내용
 */
export const ARTICLE_DESCRIPTION = '[##_article_rep_desc_##]';

/**
 * 대표 이미지 썸네일 주소
 */
export const ARTICLE_THUMBNAIL_URL = '[##_article_rep_thumbnail_url_##]';

/**
 * 대표 이미지 원본 주소
 */
export const ARTICLE_THUMBNAIL_RAW_URL =
  '[##_article_rep_thumbnail_raw_url_##]';

/**
 * 답글 수
 */
export const ARTICLE_COMMENT_COUNT = '[##_article_rep_rp_cnt_##]';

Article.ArticleLink = ArticleLink;
Article.CategoryLink = CategoryLink;
Article.RedirectCommentLink = RedirectCommentLink;
Article.Thumbnail = Thumbnail;
Article.ThumbnailImg = ThumbnailImg;
Article.CommentCount = CommentCount;

Article.Admin = Admin;
Article.AdminModifyLink = AdminModifyLink;
Article.AdminModifyLinkWithNewWindow = AdminModifyLinkWithNewWindow;
Article.AdminStateChangeLink = AdminStateChangeLink;
Article.AdminTrackBackLink = AdminTrackBackLink;
Article.AdminDeleteLink = AdminDeleteLink;

Article.Tag = Tag;

Article.Related = Related;
Article.RelatedLink = RelatedLink;
Article.RelatedThumbnail = RelatedThumbnail;
Article.RelatedThumbnailImg = RelatedThumbnailImg;

Article.Prev = Prev;
Article.PrevLink = PrevLink;
Article.PrevThumbNail = PrevThumbNail;
Article.PrevThumbNailImg = PrevThumbNailImg;

Article.Next = Next;
Article.NextLink = NextLink;
Article.NextThumbNail = NextThumbNail;
Article.NextThumbNailImg = NextThumbNailImg;

export { ADMIM_CURRENT_STATE, ADMIM_NEXT_STATE } from './Admin';
export { TAG_LABEL } from './Tag';
export {
  RELATED_ARTICLE_TYPE,
  RELATED_ARTICLE_LINK,
  RELATED_ARTICLE_TITLE,
  RELATED_ARTICLE_DATE,
  RELATED_THUMBNAIL_LINK,
} from './Related';
export { PREV_TYPE, PREV_LINK, PREV_TITLE, PREV_DATE } from './Prev';
export { NEXT_TYPE, NEXT_LINK, NEXT_TITLE, NEXT_DATE } from './Next';
