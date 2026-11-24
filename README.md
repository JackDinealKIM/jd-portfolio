# jd-portfolio

소상공인·자영업자를 위한 **원페이지 홈페이지 / 모바일 청첩장 / SEO·AEO·GEO + 웹블로그 / 업무 자동화 툴** 제작 포트폴리오입니다.
각 항목은 실제로 열리는 웹 페이지이며, 브라우저에서 바로 동작을 확인할 수 있습니다.

- 라이브: https://jackdinealkim.github.io/jd-portfolio/
- 샘플 01: https://jackdinealkim.github.io/jd-portfolio/01-store-landing/
- 샘플 02: https://jackdinealkim.github.io/jd-portfolio/02-wedding-invite/
- 샘플 03: https://jackdinealkim.github.io/jd-portfolio/03-seo-webblog/
- 샘플 04: https://jackdinealkim.github.io/jd-portfolio/04-quote-pdf/
- 견적서 예시 바로 열기: https://jackdinealkim.github.io/jd-portfolio/04-quote-pdf/?sample=interior
- SEO 진단 패널: https://jackdinealkim.github.io/jd-portfolio/03-seo-webblog/?insp=1
- 문의: mashiaro@naver.com

## 작업물

| # | 항목 | 설명 | 링크 |
|---|------|------|------|
| 01 | 업종별 원페이지 홈페이지 (3종) | 카페·식당 / 인테리어·설비 / 학원·공방. 상단 탭으로 상호·문장·메뉴·사진·강조색이 전환됩니다. | [`01-store-landing/`](01-store-landing/) |
| 02 | 모바일 청첩장 (3종) | 클래식 레터 / 필름 에디토리얼 / 가든 보태니컬. 달력·D-day·갤러리·오시는 길·계좌 복사·공유 포함. | [`02-wedding-invite/`](02-wedding-invite/) |
| 03 | SEO·AEO·GEO + 웹블로그 홈페이지 | 세무·절세 컨설팅 「윤슬 세무회계」. 구조화 데이터 5개(AccountingService·FAQPage·Article×3), llms.txt·sitemap.xml, 실제 칼럼 3편, 고객용 SEO·AEO 진단 패널. | [`03-seo-webblog/`](03-seo-webblog/) |
| 04 | 1초 견적서 · A4 PDF 발급기 | 상호·품목을 입력하면 A4 견적서가 실시간으로 완성. 품목 행 추가/삭제, 부가세 별도·포함, 할인, 비고, 직인 PNG, 한글 금액 표기. 인쇄 시 A4 한 장만 출력되고 PDF로 저장됩니다. 업종 예시 3종(인테리어·디자인 외주·설비 시공). | [`04-quote-pdf/`](04-quote-pdf/) |

업종별 직접 링크: [`?ind=cafe`](01-store-landing/?ind=cafe) · [`?ind=interior`](01-store-landing/?ind=interior) · [`?ind=clay`](01-store-landing/?ind=clay)

청첩장 직접 링크: [`?tpl=classic`](02-wedding-invite/?tpl=classic) · [`?tpl=editorial`](02-wedding-invite/?tpl=editorial) · [`?tpl=garden`](02-wedding-invite/?tpl=garden)

칼럼 직접 링크: [`#post-1`](03-seo-webblog/#post-1) 매입세액 공제 · [`#post-2`](03-seo-webblog/#post-2) 법인 전환 · [`#post-3`](03-seo-webblog/#post-3) 첫해 기장

견적서 업종 예시: [`?sample=interior`](04-quote-pdf/?sample=interior) 인테리어 · [`?sample=design`](04-quote-pdf/?sample=design) 디자인 외주 · [`?sample=facility`](04-quote-pdf/?sample=facility) 설비 시공

## 가격

| # | 상품 | 범위 | 기간 |
|---|------|------|------|
| 01 | 원페이지 랜딩 | 한 장짜리 홈페이지, 수정 1회 포함 · 99,000원 | 1~2일 |
| 02 | 모바일 청첩장 | 템플릿 3종 중 선택, 호스팅 1년 포함 · 10,000원 | 1일 |
| 03 | SEO·AEO·GEO + 웹블로그 홈페이지 | 검색 구조(구조화 데이터·llms.txt·사이트맵) + 칼럼 3편 + 진단 패널 · 290,000원~ | 3~5일 |
| 04 | 견적서·자동화 툴 | 견적서·거래명세서 발급기, 대시보드, 단일 기능 툴 · 149,000원~ | 2~3일 |

## 구성

```
jd-portfolio/
├── index.html                  # 스튜디오 인덱스 (작업 · 가격 · 과정 · 문의)
├── robots.txt · sitemap.xml    # 검색엔진용 (전체 페이지)
├── 01-store-landing/
│   ├── index.html              # 3업종 전환 원페이지 샘플
│   ├── assets/
│   │   ├── *.webp              # 업종별 실사 이미지 (히어로 3 + 갤러리 13)
│   │   ├── fonts/              # 한글 세리프·산세리프·모노 서브셋 (woff2)
│   │   └── vendor/three.min.js # WebGL 히어로 평면
│   └── README.md
├── 02-wedding-invite/
│   ├── index.html              # 모바일 청첩장 3종 (?tpl=classic|editorial|garden)
│   ├── assets/
│   │   ├── invite.css · invite.js
│   │   ├── img/*.webp          # 웨딩 실사 이미지 17장
│   │   ├── fonts/              # 한글 서브셋 + 라틴 디스플레이
│   │   └── vendor/three.min.js
│   └── README.md
├── 03-seo-webblog/
│   ├── index.html              # 세무회계 샘플 (메인 · 칼럼 3편 해시 뷰 · 진단 패널)
│   ├── llms.txt                # AI 검색용 사이트 요약
│   ├── sitemap.xml             # 이 샘플 사이트의 사이트맵
│   ├── assets/
│   │   ├── img/*.webp          # 실사 이미지 5장
│   │   └── fonts/              # 한글 세리프·산세리프·모노 서브셋 (woff2)
│   └── README.md
├── 04-quote-pdf/
│   ├── index.html              # 견적서 발급기 (입력 폼 · A4 미리보기 · 인쇄 CSS)
│   ├── assets/
│   │   ├── img/*.webp          # 책상 실사 1장 + 썸네일 3장
│   │   └── fonts/              # Pretendard 한글 2종 · 세리프 서브셋 (woff2)
│   └── README.md
└── README.md
```

## 특징

### 공통

- **에디토리얼 레이아웃**: 12칼럼 비대칭 그리드, 1px 헤어라인, 한글 세리프 디스플레이와 산세리프 본문의 조합
- **폰트 자체 호스팅**: 외부 CDN 없이 동작하도록 한글 폰트를 서브셋해 저장소에 포함했습니다. 페이지에 쓰인 글자를 모두 추출해 서브셋하고, 5개 폰트 전부 **누락 0자**를 확인했습니다
- **모바일**: 390px 폭까지 가로 스크롤 없이 확인, 키보드 탭 이동과 `prefers-reduced-motion` 지원

### 03 SEO·AEO·GEO 샘플에서 실제로 구현한 것

1. **구조화 데이터 5개** — `AccountingService`(사업자 정보·제공 서비스·가격·영업지역), `FAQPage`(본문 FAQ 4문항과 동일), `Article` 3편(발행일·섹션·저자·대표 이미지). 본문에 보이는 내용과 같은 값으로 작성했습니다.
2. **llms.txt · sitemap.xml · robots.txt** — AI 검색용 사이트 요약과 크롤 허용 규칙. 페이지 `<link rel="alternate" type="text/markdown">`로 연결.
3. **웹문서 3편** — 매입세액 공제 / 법인 전환 손익분기점 / 첫해 기장 시점. 각 글은 `#post-1` 같은 해시로 열리고, 목록·이전/다음·브라우저 뒤로가기로 돌아옵니다. 본문은 숨김이 아니라 DOM에 상시 포함되어 크롤러가 읽습니다.
4. **답변 우선 구조(AEO)** — 글마다 '한 줄 답' → 비교표 → 상세 → FAQ 순서, 질문형 소제목, 표 안의 조건 명시.
5. **SEO·AEO 진단 패널** — 헤더·푸터의 작은 버튼(또는 `?insp=1`)으로 열리는 서랍. 이 페이지의 JSON-LD를 실제로 파싱해 타입·키 수·원문을 보여주고, llms.txt·sitemap.xml·robots.txt를 실시간으로 받아 HTTP 상태와 바이트를 표시하며, h1·alt·표·가로 스크롤·LCP 우선순위를 그 자리에서 측정합니다.
6. **웹폰트·이미지** — 실사 이미지 5장(WebP), 자체 호스팅 woff2, LCP 이미지 `fetchpriority="high"`.

## 항목 추가 방법

1. `03-.../index.html` 처럼 새 폴더를 만들고 페이지를 넣습니다.
2. 루트 `index.html`의 작업 섹션에 링크와 썸네일을 추가합니다.
3. 이 README의 표에 한 줄 추가합니다.
4. 새 페이지에 글자가 늘었으면 `index.html`과 해당 페이지에서 글자를 추출해 폰트를 다시 서브셋합니다.

## 이미지

샘플에 쓰인 사진은 이미지 생성 도구로 만든 예시입니다. 실제 납품 시 매장 사진으로 교체합니다.
03 샘플의 상호·인물·금액과 세법 서술은 예시이며, 실제 사무소가 아닙니다.
04 견적서의 상호·사업자번호·금액도 예시입니다. 입력값은 서버로 전송되지 않고 브라우저(localStorage)에만 남습니다.
