# 04 · 1초 견적서 — A4 PDF 발급기

사장님·프리랜서·1인 사업자가 엑셀이나 한글을 켜지 않고 브라우저에서 바로 견적서를 만드는 도구입니다.
왼쪽에서 상호·품목을 입력하면 오른쪽 A4 종이가 실시간으로 따라오고, 인쇄 대화상자에서 PDF로 저장하거나 그대로 출력합니다.

- 라이브: https://jackdinealkim.github.io/jd-portfolio/04-quote-pdf/
- 인테리어 예시: https://jackdinealkim.github.io/jd-portfolio/04-quote-pdf/?sample=interior
- 디자인 외주 예시: https://jackdinealkim.github.io/jd-portfolio/04-quote-pdf/?sample=design
- 설비 시공 예시: https://jackdinealkim.github.io/jd-portfolio/04-quote-pdf/?sample=facility

## 파일

| 파일 | 역할 |
|---|---|
| `index.html` | 발급기 전체. CSS·JS 모두 인라인, 외부 CDN 의존 없음 |
| `assets/img/desk.webp` | 하단 맞춤 제작 안내의 실사 이미지 (인쇄 시 숨김) |
| `assets/img/editor.webp` · `sheet.webp` · `mobile.webp` | 포트폴리오 카드 썸네일 |
| `assets/fonts/sans-regular.woff2` · `sans-semibold.woff2` | Pretendard 한글 전체 음절(AC00–D7A3)·영문·기호 서브셋 |
| `assets/fonts/serif-regular.woff2` | 제목·직인용 Noto Serif KR 서브셋 |

## 동작

- **입력** — 공급자(상호·대표자·사업자번호·주소·연락처·이메일), 공급받는자, 견적번호·견적일·유효기간, 품목(최대 8줄), 부가세 별도/포함, 할인, 비고, 직인.
- **품목** — 행 추가·삭제, 수량×단가 자동 계산, 금액 천 단위 콤마 자동 포맷.
- **정산** — 부가세 별도면 공급가액의 10%를 더하고, 포함이면 총액을 1.1로 나눠 공급가액과 부가세를 분리합니다. 할인은 품목 합계에서 차감합니다.
- **한글 금액** — 합계를 `일금 육백오십육만칠천원정` 형식으로 함께 표시합니다.
- **직인** — 체크 한 번으로 대표자 성명이 세로로 새겨진 기본 직인을 그리고, 실제 도장 PNG를 올리면 그 이미지로 대체합니다.
- **예시 3종** — 인테리어·디자인 외주·설비 시공. `?sample=` 쿼리로 바로 열립니다.
- **저장** — 입력값은 서버로 보내지 않고 브라우저 `localStorage`에만 남습니다. 초기화를 누르면 지워집니다.
- **인쇄** — `@page A4`, 여백 0, `@media print`에서 입력 패널·상단 바·안내 배너를 숨기고 A4 한 장만 출력합니다. PDF 파일명은 `견적서_견적번호_고객명`으로 저장됩니다.

## 검증

- 1440×900 데스크톱, 390×844 모바일에서 가로 스크롤 없음
- 콘솔 에러·페이지 에러 0건
- 품목 8줄(최대)에서도 A4 1페이지 (`scrollHeight == clientHeight`, 인쇄 PDF 1페이지)
- 8줄 인쇄 결과와 빈 양식 인쇄 결과 모두 페이지 나눔 없음

## 참고

- 상호·사업자번호·금액은 모두 예시입니다.
- 인쇄 대화상자에서 **배경 그래픽**을 켜야 표 머리색과 직인이 그대로 나옵니다.
