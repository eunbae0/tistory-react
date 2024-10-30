import type { PropsWithChildren, RepAnchorProps } from '#component/types';

/**
 * 글 관리기능 그룹치환자 (관리 권한 있는 경우만 표시됩니다)
 */
export const Admin = ({ children }: PropsWithChildren) => {
  return <s_ad_div data-is-tistory-tag>{children}</s_ad_div>;
};

Admin.parent = 'Article';

/**
 * 수정
 */
export const AdminModifyLink = (props: RepAnchorProps) => {
  return <a href="[##_s_ad_m_link_##]" {...props} />;
};

AdminModifyLink.parent = 'Admin';

/**
 * 수정 온클릭 이벤트
 */
export const AdminModifyLinkWithNewWindow = (props: RepAnchorProps) => {
  return <a href="#" data-onclick="[##_s_ad_m_onclick_##]" {...props} />;
};
AdminModifyLinkWithNewWindow.parent = 'Admin';

/**
 * 상태 변경 온클릭 이벤트
 */
export const AdminStateChangeLink = (props: RepAnchorProps) => {
  return <a href="#" data-onclick="[##_s_ad_s2_onclick_##]" {...props} />;
};
AdminStateChangeLink.parent = 'Admin';

/**
 * 트랙백 온클릭 이벤트
 */
export const AdminTrackBackLink = (props: RepAnchorProps) => {
  const { className, ...rest } = props;
  return <a href="#" data-onclick="[##_s_ad_t_onclick_##]" {...rest} />;
};
AdminTrackBackLink.parent = 'Admin';

/**
 * 삭제 온클릭 이벤트
 */
export const AdminDeleteLink = (props: RepAnchorProps) => {
  const { className, ...rest } = props;
  return <a href="#" data-onclick="[##_s_ad_d_onclick_##]" {...rest} />;
};

AdminDeleteLink.parent = 'Admin';

/**
 * 글의 현재 상태
 */
export const ADMIN_CURRENT_STATE = '[##_s_ad_s1_label_##]';

/**
 * 글의 이후 상태
 */
export const ADMIN_NEXT_STATE = '[##_s_ad_s2_label_##]';

Admin.childVariables = ['ADMIN_CURRENT_STATE', 'ADMIN_NEXT_STATE'];
