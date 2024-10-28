import type { RepAnchorProps, RepLiProps, RepUlProps } from '#component/types';

export const NoticeWrapper = (props: RepUlProps) => {
  return (
    <s_rct_notice>
      <ul {...props} />
    </s_rct_notice>
  );
};

export const Notice = (props: RepLiProps) => {
  return (
    <s_rct_notice_rep>
      <li {...props} />
    </s_rct_notice_rep>
  );
};

export const NoticeLink = (props: RepAnchorProps) => {
  return (
    <a href={NOTICE_LINK} {...props}>
      {NOTICE_TITLE}
    </a>
  );
};

/**
 * 공지사항의 고유 주소
 */
export const NOTICE_LINK = '[##_notice_rep_link_##]';
/**
 * 공지사항의 글 제목
 */
export const NOTICE_TITLE = '[##_notice_rep_title_##]';
