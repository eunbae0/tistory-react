import type {
  PropsWithChildren,
  RepAnchorProps,
  RepImgProps,
} from '#component/types';

export const Related = ({ children }: PropsWithChildren) => {
  return <s_article_related data-is-tistory-tag>{children}</s_article_related>;
};

Related.parent = 'Article';
Related.childVariables = [
  'RELATED_ARTICLE_TYPE',
  'RELATED_ARTICLE_LINK',
  'RELATED_ARTICLE_TITLE',
  'RELATED_ARTICLE_DATE',
];

export const RelatedLink = (props: RepAnchorProps) => {
  return <a href={RELATED_ARTICLE_LINK} {...props} />;
};

RelatedLink.parent = 'Related';

/**
 * 글의 type (대표이미지 없음: text_type, 대표이미지 있음: thumb_type)
 */
export const RELATED_ARTICLE_TYPE = '[##_article_related_rep_type_##]';

/**
 * 글 주소
 */
export const RELATED_ARTICLE_LINK = '[##_article_related_rep_link_##]';

/**
 * 글 제목
 */
export const RELATED_ARTICLE_TITLE = '[##_article_related_rep_title_##]';

/**
 * 글 발행시간
 */
export const RELATED_ARTICLE_DATE = '[##_article_related_rep_date_##]';

/**
 * 대표 이미지 썸네일이 표시되는 그룹치환자 (대표 이미지가 있는 경우 표시)
 */
export const RelatedThumbnail = ({ children }: PropsWithChildren) => {
  return (
    <s_article_related_rep_thumbnail data-is-tistory-tag>
      {children}
    </s_article_related_rep_thumbnail>
  );
};

RelatedThumbnail.parent = 'Related';
RelatedThumbnail.childVariables = ['RELATED_THUMBNAIL_LINK'];

export const RelatedThumbnailImg = (props: RepImgProps) => {
  return <img src={RELATED_THUMBNAIL_LINK} alt="Related Article Thumbnail" />;
};

RelatedThumbnailImg.parent = 'RelatedThumbnail';

/**
 * 대표 이미지 썸네일 주소
 */
export const RELATED_THUMBNAIL_LINK =
  '[##_article_related_rep_thumbnail_link_##]';
