import type { RepAnchorProps, RepLiProps } from '#component/types';

/**
 * 최근 댓글을 반복 출력합니다.
 */
export const RecentComment = (props: RepLiProps) => {
  return (
    <s_rctrp_rep>
      <li {...props} />
    </s_rctrp_rep>
  );
};

export const RecentCommentLink = (props: RepAnchorProps) => {
  return (
    <a href={RECENT_COMMENT_LINK} {...props}>
      {RECENT_COMMENT_DESC}
    </a>
  );
};

/**
 * 댓글로 이동할 주소
 */
export const RECENT_COMMENT_LINK = '[##_rctrp_rep_link_##]';

/**
 * 댓글의 본문 일부
 */
export const RECENT_COMMENT_DESC = '[##_rctrp_rep_desc_##]';

/**
 * 댓글을 쓴 사람 이름
 */
export const RECENT_COMMENTER_NAME = '[##_rctrp_rep_name_##]';

/**
 * 댓글을 쓴 시간
 */
export const RECENT_COMMENT_TIME = '[##_rctrp_rep_time_##]';
