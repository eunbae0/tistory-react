import type {
  PropsWithChildren,
  RepInputProps,
  RepTextareaProps,
  RepWrapperProps,
} from '#component/types';

/**
 * 댓글을 달기 위한 입력폼을 출력합니다.
 * @example
 * ```ts
 * <s_rp_input_form>
  <div class="commentWrite">
    <s_rp_member>
      <s_rp_guest>
        <p>
          <input type="text" name="[##_rp_input_name_##]" value="[##_guest_name_##]" />
          <label for="name"> : 이름 </label>
        </p>
        <p>
          <input type="password" maxlength="8" name="[##_rp_input_password_##]" value="[##_rp_admin_check_##]" />블로그 관리자일 경우 password field에 미리 비밀번호를 넣어놓기 위해 만들어 놓았던 치환자였으나, 지금은 사용되지 않음.. (현재는 블로그 관리자일 경우 password field가 나타나지
          않음.)
          <label for="password"> : 패스워드 </label>
        </p>
        <p>
          <input type="text" class="homepage" name="[##_rp_input_homepage_##]" value="[##_guest_homepage_##]" />
          <label for="homepage"> : 홈페이지 </label>
        </p>
      </s_rp_guest>
      <p class="secretWrap">
        <input type="checkbox" name="[##_rp_input_is_secret_##]" class="checkbox" />
        <label for="secret"> 비밀글 </label>
      </p>
    </s_rp_member>
    <p>
      <textarea name="[##_rp_input_comment_##]" rows="10" cols="50"></textarea>
    </p>
    <p>
      <input type="submit" value="댓글 달기" onclick="[##_rp_onclick_submit_##]" />
    </p>
  </div>
</s_rp_input_form>
 * ```
 */
export const InputForm = (props: RepWrapperProps) => {
  return (
    <s_rp_input_form data-is-tistory-tag>
      <div {...props} />
    </s_rp_input_form>
  );
};

InputForm.parent = 'Comment';
InputForm.childVariables = [
  'COMMENT_INPUT_ID',
  'COMMENT_INPUT_COMMENT',
  'COMMENT_INPUT_ONCLICK',
];

/**
 * 댓글주소. 댓글들을 구분하기위해 사용합니다. 한 화면에 있는 댓글들은 각각 고유의 값을 가지고 있습니다.
 */
export const COMMENT_INPUT_ID = '[##_article_rep_id_##]';

/**
 * 댓글 입력 박스 이름
 */
export const COMMENT_INPUT_COMMENT = '[##_rp_input_comment_##]';

export const InputTextArea = (props: RepTextareaProps) => {
  return <textarea name={COMMENT_INPUT_COMMENT} {...props} />;
};

InputTextArea.parent = 'InputForm';

export const InputSubmit = (props: RepInputProps) => {
  const { label, value, ...rest } = props;
  return (
    <input
      type="submit"
      value={`${value ?? label ?? '댓글 달기'}`}
      data-onclick={COMMENT_INPUT_ONCLICK}
      {...rest}
    />
  );
};

InputSubmit.parent = 'InputForm';

/**
 * 댓글 입력 온클릭 이벤트
 */
export const COMMENT_INPUT_ONCLICK = '[##_rp_onclick_submit_##]';

/** 로그인을 하지 않았거나 블로그 소유자가 아닌경우 보여지는 영역 */
export const InputFormForMember = ({ children }: PropsWithChildren) => {
  return <s_rp_member data-is-tistory-tag>{children}</s_rp_member>;
};

InputFormForMember.parent = 'InputForm';
InputFormForMember.childVariables = ['COMMENT_INPUT_IS_SECRET'];

export const InputCheckboxForSecret = (props: RepInputProps) => {
  return <input type="checkbox" name={COMMENT_INPUT_IS_SECRET} {...props} />;
};

InputCheckboxForSecret.parent = 'InputFormForMember';

/**
 * 비밀글 체크박스 이름
 */
export const COMMENT_INPUT_IS_SECRET = '[##_rp_input_is_secret_##]';

/** 로그인을 하지 않았을 경우 보여지는 영역 */
export const InputFormForGuest = ({ children }: PropsWithChildren) => {
  return <s_rp_guest data-is-tistory-tag>{children}</s_rp_guest>;
};
InputFormForGuest.parent = 'InputFormForMember';
InputFormForGuest.childVariables = [
  'COMMENT_GUEST_INPUT_NAME',
  'COMMENT_GUEST_NAME',
  'COMMENT_GUEST_INPUT_PASSWORD',
  'COMMENT_GUEST_PASSWORD',
  'COMMENT_GUEST_INPUT_HOMEPAGE',
  'COMMENT_GUEST_HOMEPAGE',
];

export const InputNameForGuest = (props: RepInputProps) => {
  const { label, value, ...rest } = props;
  return (
    <input
      type="text"
      name={COMMENT_GUEST_INPUT_NAME}
      value={COMMENT_GUEST_NAME}
      {...rest}
    />
  );
};

InputNameForGuest.parent = 'InputFormForGuest';

/**
 * 이름입력 박스 이름
 */
export const COMMENT_GUEST_INPUT_NAME = '[##_rp_input_name_##]';

/**
 * 이름
 */
export const COMMENT_GUEST_NAME = '[##_guest_name_##]';

export const InputPasswordForGuest = (props: RepInputProps) => {
  const { label, value, ...rest } = props;
  return (
    <input
      type="password"
      name={COMMENT_GUEST_INPUT_PASSWORD}
      value={COMMENT_GUEST_PASSWORD}
      {...rest}
    />
  );
};

InputPasswordForGuest.parent = 'InputFormForGuest';
/**
 * 비밀번호 입력 박스 이름
 */
export const COMMENT_GUEST_INPUT_PASSWORD = '[##_rp_input_password_##]';

/**
 * 비밀번호
 */
export const COMMENT_GUEST_PASSWORD = '[##_rp_password_##]';

export const InputHomepageForGuest = (props: RepInputProps) => {
  const { label, value, ...rest } = props;
  return (
    <input
      type="text"
      name={COMMENT_GUEST_INPUT_HOMEPAGE}
      value={COMMENT_GUEST_HOMEPAGE}
      {...rest}
    />
  );
};

InputHomepageForGuest.parent = 'InputFormForGuest';
/**
 * 홈페이지 입력 박스 이름
 */
export const COMMENT_GUEST_INPUT_HOMEPAGE = '[##_rp_input_homepage_##]';

/**
 * 홈페이지
 */
export const COMMENT_GUEST_HOMEPAGE = '[##_guest_homepage_##]';
