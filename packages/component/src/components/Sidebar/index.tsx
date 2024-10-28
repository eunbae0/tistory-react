import type { RepSectionProps, RepWrapperProps } from '#component/types';
import { NoticeWrapper, Notice, NoticeLink } from './Notice';
import {
  PopularArticle,
  PopularArticleThumbnail,
  PopularArticleThumbnailImg,
  PopularArticleTitleLink,
  PopularArticleCategoryLink,
} from './PopularArticle';
import { RandomTags, RandomTagsLink } from './RandomTags';
import {
  RecentArticle,
  RecentArticleThumbnail,
  RecentArticleThumbnailImg,
  RecentArticleTitleLink,
  RecentArticleCategoryLink,
} from './RecentArticle';
import { Search, SearchInput, SearchInputSubmit } from './Search';

/**
 * 사이드바 그룹치환자
 */
export const Sidebar = (props: RepWrapperProps) => {
  return (
    <s_sidebar>
      <div {...props} />
    </s_sidebar>
  );
};

/**
 * 사이드바 개별 엘리먼트
 */
const El = (props: RepSectionProps) => {
  return (
    <s_sidebar_element>
      <section {...props} />
    </s_sidebar_element>
  );
};

Sidebar.El = El;

Sidebar.NoticeWrapper = NoticeWrapper;
Sidebar.Notice = Notice;
Sidebar.NoticeLink = NoticeLink;

Sidebar.RecentArticle = RecentArticle;
Sidebar.RecentArticleThumbnail = RecentArticleThumbnail;
Sidebar.RecentArticleThumbnailImg = RecentArticleThumbnailImg;
Sidebar.RecentArticleTitleLink = RecentArticleTitleLink;
Sidebar.RecentArticleCategoryLink = RecentArticleCategoryLink;

Sidebar.PopularArticle = PopularArticle;
Sidebar.PopularArticleThumbnail = PopularArticleThumbnail;
Sidebar.PopularArticleThumbnailImg = PopularArticleThumbnailImg;
Sidebar.PopularArticleTitleLink = PopularArticleTitleLink;
Sidebar.PopularArticleCategoryLink = PopularArticleCategoryLink;

Sidebar.RandomTags = RandomTags;
Sidebar.RandomTagsLink = RandomTagsLink;

Sidebar.Search = Search;
Sidebar.SearchInput = SearchInput;
Sidebar.SearchInputSubmit = SearchInputSubmit;

export { NOTICE_LINK, NOTICE_TITLE } from './Notice';
export {
  RECENT_POPULAR_ARTICLE_LINK,
  RECENT_POPULAR_ARTICLE_TITLE,
  RECENT_POPULAR_ARTICLE_REPLY_COUNT,
  RECENT_POPULAR_ARTICLE_AUTHOR_NAME,
  RECENT_POPULAR_ARTICLE_DATE_WITH_HOUR,
  RECENT_POPULAR_ARTICLE_DATE,
  RECENT_POPULAR_ARTICLE_THUMBNAIL,
  RECENT_POPULAR_ARTICLE_CATEGORY_NAME,
  RECENT_POPULAR_ARTICLE_CATEGORY_LINK_URL,
} from './RecentArticle';
export {
  RECENT_COMMENT_LINK,
  RECENT_COMMENT_DESC,
  RECENT_COMMENTER_NAME,
  RECENT_COMMENT_TIME,
} from './RecentComment';
export { SIDEBAR_FOLDER_CATEGORY, SIDEBAR_LIST_CATEGORY } from './Category';
export { RANDOM_TAGS_LINK, RANDOM_TAGS_NAME } from './RandomTags';
export {
  USER_COUNT_TOTAL,
  USER_COUNT_TODAY,
  USER_COUNT_YESTERDAY,
} from './UserCount';
export {
  SEARCH_INPUT_NAME,
  SEARCH_TEXT,
  SEARCH_ONCLICK_SUBMIT,
} from './Search';
