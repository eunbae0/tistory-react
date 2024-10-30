import type {
  PropsWithChildren,
  RepAnchorProps,
  RepWrapperProps,
} from '#component/types';

/**
 * 태그 클라우드는 사용한 태그 리스트를 출력합니다.
 * pages/tags에서 사용합니다.

 * @example 
  ```
    <Tags>
      <h2>태그 클라우드</h2>
      <ul>
        <Tags.Rep>
          <li>
            <Tags.Anchor className="custom_style" />
          </li>
        </Tags.Rep>
      </ul>
    </Tags>
  ```
 */
export const Tags = (props: RepWrapperProps) => {
  return (
    <s_tag data-is-tistory-tag>
      <div {...props} />
    </s_tag>
  );
};

const Rep = ({ children }: PropsWithChildren) => {
  return <s_tag_rep data-is-tistory-tag>{children}</s_tag_rep>;
};

const Anchor = (props: RepAnchorProps) => {
  const { className, ...rest } = props;
  return (
    <a
      href="[##_tag_link_##]"
      className={`[##_tag_class_##], ${className}`}
      {...rest}
    >
      [##_tag_name_##]
    </a>
  );
};

Tags.Rep = Rep;
Tags.Anchor = Anchor;
