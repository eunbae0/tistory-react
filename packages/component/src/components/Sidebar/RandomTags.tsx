import type { RepAnchorProps, RepLiProps } from '#theme/types';

/**
 * 태그를 반복 출력합니다.
 */
export const RandomTags = (props: RepLiProps) => {
  return (
    <s_random_tags>
      <li {...props} />
    </s_random_tags>
  );
};

export const RandomTagsLink = (props: RepAnchorProps) => {
  return (
    <a href={RANDOM_TAGS_LINK} {...props}>
      {RANDOM_TAGS_NAME}
    </a>
  );
};

/**
 * 태그에 해당되는 주소
 */
export const RANDOM_TAGS_LINK = '[##_tag_link_##]';

/**
 * 카테고리 리스트 url
 */
export const RANDOM_TAGS_NAME = '[##_tag_name_##]';
