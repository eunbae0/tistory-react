/**
 * 스킨 목록, 상세보기에서 표시되는 정보입니다.
 */
export interface TistorySkinInformationConfig {
  /**
   * 표시되는 이름
   */
  name?: string;
  /**
   * 스킨 버전
   */
  version?: string;
  /**
   * 스킨 상세 설명
   */
  description?: string;
  /**
   * 저작권
   */
  license?: string;
}

/**
 * 스킨 정보에서 표시할 제작자 정보입니다.
 */
export interface TistorySkinAuthorConfig {
  /**
   * 표시되는 이름
   */
  name?: string;
  /**
   * 제작자 웹사이트 주소
   */
  homepage?: string;
  /**
   * 연락할 이메일 주소
   */
  email?: string;
}

/**
 * 스킨의 설정 기본값입니다. 이를 통해 스킨 적용하면 제작자가 추천하는 설정을 제공할 수 있습니다.
 */
export interface TistorySkinDefaultConfig {
  /**
   * 사이드바의 최근글 표시 갯수
   */
  recentEntries?: number;
  /**
   * 사이드바의 최근 댓글 표시 갯수
   */
  recentComments?: number;
  /**
   * 사이드바의 최근 트랙백 표시 갯수
   */
  recentTrackbacks?: number;
  /**
   * 한페이지에 표시될 방명록 갯수 *
   */
  itemsOnGuestbook?: number;
  /**
   * 사이드바에 표시될 태그 갯수
   */
  tagsInCloud?: number;
  /**
   * 태그 클라우드 표현 방식 (1:인기도순, 2:이름순, 3:랜덤)
   */
  sortInCloud?: 1 | 2 | 3;
  /**
   * 댓글영역 표현 방식 (0:감추기, 1:펼치기)
   */
  expandComment?: 0 | 1;
  /**
   * 트랙백영역 표현 방식 (0:감추기, 1:펼치기)
   */
  expandTrackback?: 0 | 1;
  /**
   * 최근 공지 표현될 글자수
   */
  lengthOfRecentNotice?: number;
  /**
   * 최근 글 표현될 글자수
   */
  lengthOfRecentEntry?: number;
  /**
   * 최근 댓글에 표현될 글자수
   */
  lengthOfRecentComment?: number;
  /**
   * 최근 트랙백에 표현될 글자수
   */
  lengthOfRecentTrackback?: number;
  /**
   *  링크에 표현될 글자수
   */
  lengthOfLink?: number;
  /**
   * 홈 화면 글 수
   */
  entriesOnPage?: number;
  /**
   *  글 목록 글 수
   */
  entriesOnList?: number;
  /**
   * 커버 미사용 홈에서 글 목록 표현 (0: 내용만, 1: 목록만, 2: 내용+목록)
   */
  showListOnCategory?: 0 | 1 | 2;
  /**
   * 홈 설정과 기본 설정에서 '목록 구성 요소' 항목의 노출 여부 결정 (0: 노출, 1: 노출 안 함)
   */
  showListLock?: 0 | 1;
  /**
   * 카테고리
   */
  tree?: {
    /**
     * 카테고리 글자색
     */
    color?: string;
    /**
     * 카테고리 배경색
     */
    bgColor?: string;
    /**
     * 선택시 글자색
     */
    activeColor?: string;
    /**
     * 선택시 배경색
     */
    activeBgColor?: string;
    /**
     * 표현될 카테고리 글자 수
     */
    labelLength?: number;
    /**
     * 카테고리 글 수 표현(0:숨김, 1:보임)
     */
    showValue?: 0 | 1;
  };
  /**
   * 콘텐츠영역 가로 사이즈, 이 사이즈에 맞춰 에디터의 위지윅이 제대로 구현된다.
   */
  contentWidth?: number;
}

export interface TistorySkinConfig {
  /**
   * 기본 정보
   */
  information?: TistorySkinInformationConfig;
  /**
   * 제작자
   */
  author?: TistorySkinAuthorConfig;
  /**
   * 설정 기본값
   */
  default?: TistorySkinDefaultConfig;
}
