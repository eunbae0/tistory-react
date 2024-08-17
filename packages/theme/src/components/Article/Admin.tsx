import type { PropsWithChildren, RepAnchorProps } from '#theme/types';

/**
 * 글 관리기능 그룹치환자 (관리 권한 있는 경우만 표시됩니다)
 */
export const Admin = ({ children }: PropsWithChildren) => {
  return <s_ad_div>{children}</s_ad_div>;
};

/**
 * 수정
 */
export const AdminModifyLink = (props: RepAnchorProps) => {
  return <a href="[##_s_ad_m_link_##]" {...props} />;
};

/**
 * 수정 온클릭 이벤트
 */
export const AdminModifyLinkWithNewWindow = (props: RepAnchorProps) => {
  return (
    // @ts-expect-error
    <a href="#" onClick="[##_s_ad_m_onclick_##]" {...props} />
  );
};

/**
 * 상태 변경 온클릭 이벤트
 */
export const AdminStateChangeLink = (props: RepAnchorProps) => {
  return (
    // @ts-expect-error
    <a href="#" onClick="[##_s_ad_s2_onclick_##]" {...props} />
  );
};

/**
 * 트랙백 온클릭 이벤트
 */
export const AdminTrackBackLink = (props: RepAnchorProps) => {
  const { className, ...rest } = props;
  return (
    // @ts-expect-error
    <a href="#" onClick="[##_s_ad_t_onclick_##]" {...rest} />
  );
};

/**
 * 삭제 온클릭 이벤트
 */
export const AdminDeleteLink = (props: RepAnchorProps) => {
  const { className, ...rest } = props;
  return (
    // @ts-expect-error
    <a href="#" onClick="[##_s_ad_d_onclick_##]" {...rest} />
  );
};
/**
 * 글의 현재 상태
 */
export const ADMIM_CURRENT_STATE = '[##_s_ad_s1_label_##]';

/**
 * 글의 이후 상태
 */
export const ADMIM_NEXT_STATE = '[##_s_ad_s2_label_##]';
