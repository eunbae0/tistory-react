import type {
  PropsWithChildren,
  RepAnchorProps,
  RepImgProps,
  RepLiProps,
} from '#component/types';

/**
 * 최근 글을 반복 출력합니다.
 */
export const RecentArticle = (props: RepLiProps) => {
  return (
    <s_rctps_rep data-is-tistory-tag>
      <li {...props} />
    </s_rctps_rep>
  );
};

/**
 * 대표 이미지가 있는 경우 치환
 */
export const RecentArticleThumbnail = ({ children }: PropsWithChildren) => {
  return (
    <s_rctps_rep_thumbnail data-is-tistory-tag>
      {children}
    </s_rctps_rep_thumbnail>
  );
};

export const RecentArticleThumbnailImg = (props: RepImgProps) => {
  return <img src={RECENT_POPULAR_ARTICLE_THUMBNAIL} {...props} />;
};

export const RecentArticleTitleLink = (props: RepAnchorProps) => {
  return (
    <a href={RECENT_POPULAR_ARTICLE_LINK} {...props}>
      {RECENT_POPULAR_ARTICLE_TITLE}
    </a>
  );
};

export const RecentArticleCategoryLink = (props: RepAnchorProps) => {
  return (
    <a href={RECENT_POPULAR_ARTICLE_CATEGORY_LINK_URL} {...props}>
      {RECENT_POPULAR_ARTICLE_CATEGORY_NAME}
    </a>
  );
};

/**
 * 글 주소
 */
export const RECENT_POPULAR_ARTICLE_LINK = '[##_rctps_rep_link_##]';

/**
 * 글 제목
 */
export const RECENT_POPULAR_ARTICLE_TITLE = '[##_rctps_rep_title_##]';

/**
 * 글 댓글 갯수
 */
export const RECENT_POPULAR_ARTICLE_REPLY_COUNT = '[##_rctps_rep_rp_cnt_##]';

/**
 * 작성자 이름 (*팀블로그용 치환자)
 */
export const RECENT_POPULAR_ARTICLE_AUTHOR_NAME = '[##_rctps_rep_author_##]';

/**
 * 글 발행 날짜/시간 (yyyy.mm.dd HH:MM)
 */
export const RECENT_POPULAR_ARTICLE_DATE_WITH_HOUR = '[##_rctps_rep_date_##]';

/**
 * 글 발행 날짜 (yyyy.mm.dd)
 */
export const RECENT_POPULAR_ARTICLE_DATE = '[##_rctps_rep_simple_date_##]';

/**
 * 대표 이미지
 */
export const RECENT_POPULAR_ARTICLE_THUMBNAIL = '[##_rctps_rep_thumbnail_##]';

/**
 * 카테고리 이름
 */
export const RECENT_POPULAR_ARTICLE_CATEGORY_NAME =
  '[##_rctps_rep_category_##]';

/**
 * 카테고리 리스트 url
 */
export const RECENT_POPULAR_ARTICLE_CATEGORY_LINK_URL =
  '[##_rctps_rep_category_link_##]';
