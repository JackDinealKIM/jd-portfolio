# 03 · SEO·AEO·GEO + 웹블로그 홈페이지 샘플

세무·절세 컨설팅 **「윤슬 세무회계」** 를 소재로 만든 샘플입니다. 원페이지 위에 검색 구조(SEO), 답변 엔진 구조(AEO), 생성 엔진 구조(GEO)와 웹문서 3편을 실제로 심었습니다.

- 라이브: https://jackdinealkim.github.io/jd-portfolio/03-seo-webblog/
- 진단 패널 바로 열기: https://jackdinealkim.github.io/jd-portfolio/03-seo-webblog/?insp=1
- 칼럼: `#post-1` · `#post-2` · `#post-3`

## 파일

| 파일 | 역할 |
|---|---|
| `index.html` | 메인 페이지 + 칼럼 3편(해시 뷰) + SEO·AEO 진단 패널. CSS·JS 모두 인라인 |
| `llms.txt` | AI 검색·답변 엔진용 사이트 요약 (서비스·가격·칼럼 요약·FAQ·인용 표기) |
| `sitemap.xml` | 이 샘플 사이트의 사이트맵 |
| `assets/img/*.webp` | 실사 이미지 5장 (히어로, 상담, 장부, 서가, 창가) |
| `assets/fonts/*.woff2` | 한글 세리프·산세리프 3종·모노 서브셋, 누락 0자 검증 |
| `assets/favicon-64.png`, `apple-touch-icon.png` | 아이콘 |

루트의 `robots.txt`·`sitemap.xml`은 포트폴리오 전체 페이지를 대상으로 합니다.

## 구현 내용

### SEO

- `title` / `meta description` / `canonical` / Open Graph 7종 / `lang="ko"`
- 시맨틱 태그: `header` `nav` `main` `section` `article` `aside` `footer`
- 문서당 보이는 `h1` 1개, `h2`(소제목) → `h3`(FAQ·서비스명) 계층
- 표 3개(매입 공제 판단표, 법인 전환 계산표, 첫해 기장 비교표), 이미지 alt 100%
- `llms.txt`, `sitemap.xml`, 크롤러 허용 `robots.txt`

### AEO (답변 엔진 최적화)

- 글마다 **한 줄 답** → **비교표** → **상세** → **FAQ** 순서
- 질문형 소제목과 `dl/dt/dd` FAQ, 답변 첫 문장에 결론
- 숫자·기준일·지역(구리시) 등 엔티티를 본문에 명시
- `FAQPage` 구조화 데이터가 화면의 FAQ와 같은 문장

### GEO (생성 엔진 최적화)

- `llms.txt`에 서비스·가격·칼럼 요약·인용 방법을 정리
- `Article` 스키마 3편 (headline, articleSection, datePublished, author, publisher)
- 각 글 하단에 기준 시점(2026년 11월)과 출처 표기
- `script[type="application/ld+json"]` 5개, 모두 유효한 JSON

### 칼럼 뷰

- `#post-1`~`#post-3` 해시 라우팅. 목록 → 글 → 목록, 브라우저 뒤로가기 모두 동작
- 글 안의 목차 링크(`#p1-a` 등)는 뷰를 닫지 않음
- 글을 열면 `document.title`이 글 제목으로 바뀌고, 제목에 포커스가 이동
- 본문은 `hidden` 속성으로 가려져 있을 뿐 DOM에 상시 포함 → 크롤러가 읽을 수 있음

### 진단 패널

헤더의 `SEO·AEO 진단` 버튼, 푸터의 `SEO·AEO 진단 보기`, 또는 `?insp=1`로 엽니다.

- JSON-LD를 실제로 파싱해 타입·키 수·원문(펼치기) 표시
- `llms.txt` / `sitemap.xml` / `robots.txt`를 fetch해 HTTP 상태·바이트 표시
- h1 개수, alt 누락, 표 개수, 가로 스크롤, LCP 우선순위를 현재 뷰포트에서 측정
- ESC·배경 클릭으로 닫히고, 포커스 트랩과 `aria-modal` 적용

## 검증

```
# 로컬 확인
python3 -m http.server 8811
# → http://127.0.0.1:8811/03-seo-webblog/

# 데스크톱 1440×900 · 모바일 390×844
# 가로 스크롤 0 / 콘솔·페이지 에러 0 / 깨진 이미지 0 / 칼럼 열기·닫기 / 진단 패널 / llms.txt 200
```

## 교체할 때

- 상호·대표자·연락처·가격: `index.html`의 JSON-LD 5개와 본문, `llms.txt`를 함께 수정합니다. 셋이 어긋나면 AEO 효과가 떨어집니다.
- 칼럼: `<article id="post-N">` 블록을 복사하고 목록 행(`href="#post-N"`)과 `Article` JSON-LD, `llms.txt`의 칼럼 목록을 같이 추가합니다.
- 글자가 늘면 폰트를 다시 서브셋합니다. (페이지 글자 추출 → `pyftsubset --flavor=woff2` → cmap 누락 0 확인)
- 이 샘플의 세법 서술은 2026년 11월 기준 예시입니다. 실제 사이트에 쓸 때는 최신 법령과 사무소 기준으로 검수해야 합니다.
