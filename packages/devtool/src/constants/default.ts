import { generateCurrentTime } from 'utils';

export const DEFAULT_TITLE = '게시글 제목';
export const DEFAULT_CATEGORY = '카테고리';
export const DEFAULT_AUTHOR = '작성자';
export const DEFAULT_DESCRIPTION =
  "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
export const DEFAULT_HREF_LINK = 'article';
export const DEFAULT_TYPE = 'text_type';
export const DEFAULT_IMAGE_THUMBNAIL_URL = '이미지 썸네일 주소'; // TDOO: Change
export const currentTime = generateCurrentTime();

export const DEFAULT_DATE = currentTime.formatted;
export const DEFAULT_YEAR = currentTime.year;
export const DEFAULT_MONTH = currentTime.month;
export const DEFAULT_DAY = currentTime.day;
export const DEFAULT_HOUR = currentTime.hour;
export const DEFAULT_MINUTE = currentTime.minute;
export const DEFAULT_SECOND = currentTime.second;
