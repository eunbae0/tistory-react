import type {
  PropsWithChildren,
  RepAnchorProps,
  RepImgProps,
} from '#theme/types';

/**
 * 다음 글 그룹치환자. 다음 글이 있는 경우 사용됩니다.
 * @example
 * ```
  <Article.Next>
    <Article.NextLink>
      <span>다음 글</span>
      <span>{NEXT_TITLE}</span>
    </Article.NextLink>
  </Article.Next>
  ```
 */
export const Next = ({ children }: PropsWithChildren) => {
  return <s_article_next>{children}</s_article_next>;
};

Next.parent = 'Article';
Next.childVariables = ['NEXT_TYPE', 'NEXT_LINK', 'NEXT_TITLE', 'NEXT_DATE'];

export const NextLink = (props: RepAnchorProps) => {
  return <a href={NEXT_LINK} {...props} />;
};

NextLink.parent = 'Next';

/**
 * 대표 이미지 썸네일이 표시되는 그룹치환자 (대표 이미지가 있는 경우 표시)
 */
export const NextThumbNail = ({ children }: PropsWithChildren) => {
  return <s_article_next_thumbnail>{children}</s_article_next_thumbnail>;
};

NextThumbNail.parent = 'Next';
NextThumbNail.childVariables = ['NEXT_THUMBLNAIL_LINK'];

export const NextThumbNailImg = (props: RepImgProps) => {
  return (
    <img src={NEXT_THUMBLNAIL_LINK} alt="Next Article Thumbnail" {...props} />
  );
};

NextThumbNailImg.parent = 'NextThumbNail';

/**
 * 글의 type (대표이미지 없음: text_type, 대표이미지 있음: thumb_type)
 */
export const NEXT_TYPE = '[##_article_next_type_##]';

/**
 * 글 주소
 */
export const NEXT_LINK = '[##_article_next_link_##]';

/**
 * 글 제목
 */
export const NEXT_TITLE = '[##_article_next_title_##]';

/**
 * 글 작성시간
 */
export const NEXT_DATE = '[##_article_next_date_##]';

/**
 * 대표 이미지 썸네일 주소
 */
export const NEXT_THUMBLNAIL_LINK = '[##_article_next_thumbnail_link_##]';
