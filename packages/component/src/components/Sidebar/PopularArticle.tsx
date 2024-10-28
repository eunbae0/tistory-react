import type {
  PropsWithChildren,
  RepAnchorProps,
  RepImgProps,
  RepLiProps,
} from '#component/types';
import {
  RECENT_POPULAR_ARTICLE_THUMBNAIL,
  RECENT_POPULAR_ARTICLE_LINK,
  RECENT_POPULAR_ARTICLE_TITLE,
  RECENT_POPULAR_ARTICLE_CATEGORY_LINK_URL,
  RECENT_POPULAR_ARTICLE_CATEGORY_NAME,
} from './RecentArticle';

/**
 * 인기글을 반복 출력합니다.
 */
export const PopularArticle = (props: RepLiProps) => {
  return (
    <s_rctps_popular_rep>
      <li {...props} />
    </s_rctps_popular_rep>
  );
};

/**
 * 대표 이미지가 있는 경우 치환
 */
export const PopularArticleThumbnail = ({ children }: PropsWithChildren) => {
  return <s_rctps_rep_thumbnail>{children}</s_rctps_rep_thumbnail>;
};

export const PopularArticleThumbnailImg = (props: RepImgProps) => {
  return <img src={RECENT_POPULAR_ARTICLE_THUMBNAIL} {...props} />;
};

export const PopularArticleTitleLink = (props: RepAnchorProps) => {
  return (
    <a href={RECENT_POPULAR_ARTICLE_LINK} {...props}>
      {RECENT_POPULAR_ARTICLE_TITLE}
    </a>
  );
};

export const PopularArticleCategoryLink = (props: RepAnchorProps) => {
  return (
    <a href={RECENT_POPULAR_ARTICLE_CATEGORY_LINK_URL} {...props}>
      {RECENT_POPULAR_ARTICLE_CATEGORY_NAME}
    </a>
  );
};
