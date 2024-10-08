# 설치

시스템 요구 사항: `Node.js > 18` 이상

## 자동 설치

`create-tistory-react`를 사용하여 새로운 tistory-react 프로젝트를 시작해보세요. 이 명령어를 통해 자동으로 모든 환경을 설정할 수 있습니다.

```terminal
$ yarn create tistory-react
```

설치시 다음과 같은 프롬포트가 실행됩니다.

```terminal
?
?
?
```

## 수동 설치

```terminal
$ yarn add tistory-react@latest react@latest react-dom@latest
```

`package.json` 파일을 열고 다음 `scripts`를 추가하세요.

```terminal
{
  "scripts": {
    "dev": "tistory-react dev",
    "build": "tistory-react build"
  }
}
```

이 스크립트는 애플리케이션 개발의 다양한 단계를 나타냅니다.

- `dev`: 개발 모드에서 tistory-react를 시작하기 위해 `tistory-react dev`를 실행합니다.

- `build`: 스킨 등록을 위해 애플리케이션을 빌드하기 위해 `tistory-react build`를 실행합니다.

## 디렉토리 생성
Tistory React는 파일 시스템 라우팅을 사용합니다.

### `pages` 디렉토리
우선 프로젝트 루트에 `pages/` 디렉토리를 만듭니다.
이후 `pages` 폴더 안에 `index.jsx` 또는 `index.tsx` 파일을 추가하세요. 이 파일은 메인 페이지 (`/`) 입니다.

```typescript
export default function Page() {
  return <h1>Hello, Tistory React</h1>
}
```

### `layout` 파일
다음으로, 모든 경로의 페이지에 공통적으로 적용할 레이아웃을 생성할 수 있습니다. 이 파일에는 주로 방문자 수, 검색 바와 같은 컨텐츠를 담을 수 있습니다.
`pages/` 안에  `Layout.jsx` 또는 `Layout.tsx` 파일을 추가하세요.

### 라우팅 파일

라우팅 파일을 생성하기 위해 `pages/` 안에 `article` 폴더를 생성한 다음, `index.jsx` 또는 `index.tsx` 파일을 추가하세요. 이 파일은 글 상세 페이지 (`/article`) 입니다.

라우팅을 지원하는 경로는 아래와 같습니다. 이외의 경로는 라우팅은 지원하지 않습니다.
- `/article`: 글 상세 페이지입니다.
- `/tags`: 태그 클라우드 페이지입니다.

## 개발 서버 실행
1. `npm run dev`를 실행하여 개발 서버를 시작하세요.
2. http://localhost:3000 에서 애플리케이션을 확인하세요.
3. pages/index.tsx 파일을 편집하고 저장하여 브라우저에서 업데이트된 결과를 확인하세요.