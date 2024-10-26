import type {
  RepAnchorProps,
  RepLiProps,
  RepOlProps,
  RepSpanProps,
  RepUlProps,
} from '#theme/types';

/**
 * 등록된 '댓글' 리스트를 출력할 영역입니다.
 * @example
 * ```ts
 *   <s_rp_container>
    <ol>
      <s_rp_rep>
        <li id='[##_rp_rep_id_##]'>
          <div class="[##_rp_rep_class_##]">
            <span class="image">[##_rp_rep_logo_##]</span>
            <span class="name">[##_rp_rep_name_##]</span>
            <span class="date"> [##_rp_rep_date_##]</span>
            <span class="control">
              <a href="[##_rp_rep_link_##]" class="address">&nbsp;
                <span>댓글주소</span>
              </a>
              <a href="#" onclick="[##_rp_rep_onclick_delete_##]" class="modify">&nbsp;
                <span>수정/삭제</span>
              </a>
              <a href="#" onclick="[##_rp_rep_onclick_reply_##]" class="write">&nbsp;
                <span>댓글쓰기</span>
              </a>
            </span>
            <p>[##_rp_rep_desc_##]</p>
          </div>
          <s_rp2_container>
            <ul>
              <s_rp2_rep>
                <li id='[##_rp_rep_id_##]'>
                  <div class="[##_rp_rep_class_##]">
                    <span class="image">[##_rp_rep_logo_##]</span>
                    <span class="name">[##_rp_rep_name_##]</span>
                    <span class="date"> [##_rp_rep_date_##]</span>
                    <span class="control">
                      <a href="[##_rp_rep_link_##]" class="address">&nbsp;
                        <span>댓글주소</span>
                      </a>
                      <a href="#" onclick="[##_rp_rep_onclick_delete_##]" class="modify">&nbsp;
                        <span>수정/삭제</span>
                      </a>
                    </span>
                    <p>[##_rp_rep_desc_##]</p>
                  </div>
                </li>
              </s_rp2_rep>
            </ul>
          </s_rp2_container>
        </li>
      </s_rp_rep>
    </ol>
  </s_rp_container>
 * ```
 */
export const ListWrapper = (props: RepOlProps) => {
  return (
    <s_rp_container>
      <ol {...props} />
    </s_rp_container>
  );
};

ListWrapper.parent = 'Comment';

export const List = (props: RepLiProps) => {
  return (
    <s_rp_rep>
      <li id={COMMENT_ID} {...props} />
    </s_rp_rep>
  );
};

List.parent = 'ListWrapper';
List.childVariables = [
  'COMMENT_ID',
  'COMMENT_STYLE',
  'COMMENTER_NAME',
  'COMMENTER_LOGO',
  'COMMENT_DATE',
  'COMMENT_DESC',
  'COMMENT_LINK',
  'COMMENT_ONCLICK_MODIFY_DELETE',
  'COMMENT_ONCLICK_REPLY',
];

export const ReplyWrapper = (props: RepUlProps) => {
  return (
    <s_rp2_container>
      <ul {...props} />
    </s_rp2_container>
  );
};

ReplyWrapper.parent = 'List';

export const Reply = (props: RepLiProps) => {
  return (
    <s_rp2_rep>
      <li id={COMMENT_ID} {...props} />
    </s_rp2_rep>
  );
};

Reply.parent = 'ReplyWrapper';

export const Name = (props: RepSpanProps) => {
  return <span {...props}>{COMMENTER_NAME}</span>;
};

Name.parent = 'Reply';

export const Logo = (props: RepSpanProps) => {
  return <span {...props}>{COMMENTER_LOGO}</span>;
};
Logo.parent = 'Reply';

export const Date = (props: RepSpanProps) => {
  return <span {...props}>{COMMENT_DATE}</span>;
};

Date.parent = 'Reply';

export const AddressLink = (props: RepAnchorProps) => {
  const { label, ...rest } = props;
  return (
    <a href={COMMENT_LINK} {...rest}>
      {label ?? '댓글주소'}
    </a>
  );
};

AddressLink.parent = 'Reply';

export const ModifyOrDeleteLink = (props: RepAnchorProps) => {
  const { label, ...rest } = props;
  return (
    <a href="#" data-onclick={COMMENT_ONCLICK_MODIFY_DELETE} {...rest}>
      {label ?? '수정/삭제'}
    </a>
  );
};

ModifyOrDeleteLink.parent = 'Reply';

export const WriteReplyLink = (props: RepAnchorProps) => {
  const { label, ...rest } = props;
  return (
    <a href="#" data-onclick={COMMENT_ONCLICK_REPLY} {...rest}>
      {label ?? '댓글쓰기'}
    </a>
  );
};

WriteReplyLink.parent = 'Reply';

/**
 * 댓글의 고유 ID
 */
export const COMMENT_ID = '[##_rp_rep_id_##]';

/**
 * 댓글의 글의 목록에 반복되는 스타일 + admin 아이디 앞에 아이콘
 */
export const COMMENT_STYLE = '[##_rp_rep_class_##]';

/**
 * 글쓴사람 이름
 */
export const COMMENTER_NAME = '[##_rp_rep_name_##]';

/**
 * 댓글작성자의 프로필 이미지
 */
export const COMMENTER_LOGO = '[##_rp_rep_logo_##]';

/**
 * 글쓴 날짜
 */
export const COMMENT_DATE = '[##_rp_rep_date_##]';

/**
 * 글 내용
 */
export const COMMENT_DESC = '[##_rp_rep_desc_##]';

/**
 * 댓글 주소
 */
export const COMMENT_LINK = '[##_rp_rep_link_##]';

/**
 * 답글 수정 또는 삭제 온클릭 이벤트
 */
export const COMMENT_ONCLICK_MODIFY_DELETE = '[##_rp_rep_onclick_delete_##]';

/**
 * 대댓글 온클릭 이벤트
 */
export const COMMENT_ONCLICK_REPLY = '[##_rp_rep_onclick_reply_##]';
