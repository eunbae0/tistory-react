import type {
  PropsWithChildren,
  RepAnchorProps,
  RepImgProps,
} from '#theme/types';

/**
 * 이전 글 그룹치환자. 이전 글이 있는 경우 사용됩니다.
 * @example
 * ```
  <Article.Prev>
    <Article.PrevLink>
      <span>이전 글</span>
      <span>{PREV_TITLE}</span>
    </Article.PrevLink>
  </Article.Prev>
  ```
 */
export const Prev = ({ children }: PropsWithChildren) => {
  return <s_article_prev>{children}</s_article_prev>;
};

export const PrevLink = (props: RepAnchorProps) => {
  return <a href={PREV_LINK} {...props} />;
};

/**
 * 대표 이미지 썸네일이 표시되는 그룹치환자 (대표 이미지가 있는 경우 표시)
 */
export const PrevThumbNail = ({ children }: PropsWithChildren) => {
  return <s_article_prev_thumbnail>{children}</s_article_prev_thumbnail>;
};

export const PrevThumbNailImg = (props: RepImgProps) => {
  return (
    <img src={PREV_THUMBLNAIL_LINK} alt="Prev Article Thumbnail" {...props} />
  );
};

/**
 * 글의 type (대표이미지 없음: text_type, 대표이미지 있음: thumb_type)
 */
export const PREV_TYPE = '[##_article_prev_type_##]';

/**
 * 글 주소
 */
export const PREV_LINK = '[##_article_prev_link_##]';

/**
 * 글 제목
 */
export const PREV_TITLE = '[##_article_prev_title_##]';

/**
 * 글 작성시간
 */
export const PREV_DATE = '[##_article_prev_date_##]';

/**
 * 대표 이미지 썸네일 주소
 */
export const PREV_THUMBLNAIL_LINK = '[##_article_prev_thumbnail_link_##]';
