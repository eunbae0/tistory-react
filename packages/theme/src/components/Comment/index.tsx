import type { RepWrapperProps } from '#theme/types';
import {
  InputCheckboxForSecret,
  InputForm,
  InputFormForGuest,
  InputFormForMember,
  InputHomepageForGuest,
  InputPasswordForGuest,
  InputSubmit,
  InputTextArea,
  InputTextForGuest,
} from './InputForm';
import {
  ListWrapper,
  List,
  ReplyWrapper,
  Reply,
  Name,
  Logo,
  Date,
  AddressLink,
  DeleteLink,
  WriteReplyLink,
} from './List';

/** 
 * 댓글으로 접근시 이 영역 내부의 치환자가 출력됩니다.
 * @example
 * ```
  <Comment>
    <h3>댓글을 달아 주세요 </h3>
    <div class="commentList">18-6-1 리스트 </div>
    <div class="commentWrite">18-6-2 글쓰기 </div>
  </Comment>
  ```
 */
export const Comment = (props: RepWrapperProps) => {
  return (
    <s_rp>
      <div {...props} />
    </s_rp>
  );
};

Comment.InputForm = InputForm;
Comment.InputTextArea = InputTextArea;
Comment.InputSubmit = InputSubmit;
Comment.InputFormForMember = InputFormForMember;
Comment.InputCheckboxForSecret = InputCheckboxForSecret;
Comment.InputFormForGuest = InputFormForGuest;
Comment.InputTextForGuest = InputTextForGuest;
Comment.InputPasswordForGuest = InputPasswordForGuest;
Comment.InputHomepageForGuest = InputHomepageForGuest;

Comment.ListWrapper = ListWrapper;
Comment.List = List;
Comment.ReplyWrapper = ReplyWrapper;
Comment.Reply = Reply;
Comment.Name = Name;
Comment.Logo = Logo;
Comment.Date = Date;
Comment.AddressLink = AddressLink;
Comment.DeleteLink = DeleteLink;
Comment.WriteReplyLink = WriteReplyLink;

export {
  COMMENT_INPUT_ID,
  COMMENT_INPUT_COMMENT,
  COMMENT_INPUT_ONCLICK,
  COMMENT_INPUT_IS_SECRET,
  COMMENT_GUEST_INPUT_NAME,
  COMMENT_GUEST_NAME,
  COMMENT_GUEST_INPUT_PASSWORD,
  COMMENT_GUEST_PASSWORD,
  COMMENT_GUEST_INPUT_HOMEPAGE,
  COMMENT_GUEST_HOMEPAGE,
} from './InputForm';
export {
  COMMENT_ID,
  COMMENT_STYLE,
  COMMENTER_NAME,
  COMMENTER_LOGO,
  COMMENT_DATE,
  COMMENT_DESC,
  COMMENT_LINK,
  COMMENT_ONCLICK_DELETE,
  COMMENT_ONCLICK_CHANGE,
} from './List';
