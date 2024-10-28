import type { RepWrapperProps } from '#component/types';

/**
 * 글과 관련된 태그가 출력되는 영역입니다.
 * @example
 * ```
    <Article.Tag className="tagWrap">
      <span className="tagText">TAG</span> 
      {TAG_LABEL}
    </Article.Tag>
  ```
 */
export const Tag = (props: RepWrapperProps) => {
  return (
    <s_tag_label>
      <div {...props} />
    </s_tag_label>
  );
};

Tag.parent = 'Article';
Tag.childVariables = ['TAG_LABEL'];

/**
 * 태그 반복 출력
 */
export const TAG_LABEL = '[##_tag_label_rep_##]';
