import type { RepInputProps, RepWrapperProps } from '#component/types';

/**
 * 최근 댓글을 반복 출력합니다.
 */
export const Search = (props: RepWrapperProps) => {
  return (
    <s_rctrp_rep data-is-tistory-tag>
      <div {...props} />
    </s_rctrp_rep>
  );
};

export const SearchInput = (props: RepInputProps) => {
  return (
    <input
      type="text"
      name={SEARCH_INPUT_NAME}
      value={SEARCH_TEXT}
      data-onkeypress="if (event.keyCode == 13) { [##_search_onclick_submit_##] }"
      {...props}
    />
  );
};

export const SearchInputSubmit = (props: RepInputProps) => {
  return (
    <input
      value={props.value ?? '검색'}
      type="button"
      data-onclick={SEARCH_ONCLICK_SUBMIT}
      {...props}
    />
  );
};

/**
 * 검색어 입력 박스 이름
 */
export const SEARCH_INPUT_NAME = '[##_search_name_##]';

/**
 * 검색어
 */
export const SEARCH_TEXT = '[##_search_text_##]';

/**
 * 검색 온클릭 이벤트
 */
export const SEARCH_ONCLICK_SUBMIT = '[##_search_onclick_submit_##]';
