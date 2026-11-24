# 02 · 모바일 청첩장 3종

1만 원 맞춤 제작 + 호스팅 상품의 샘플입니다. 같은 신랑·신부 정보로 **완전히 다른 무드의 템플릿 세 개**를 만들었고, 상단(데스크톱은 왼쪽) 전환 바나 주소의 `?tpl=` 값으로 바꿔 볼 수 있습니다.

- 라이브: https://jackdinealkim.github.io/jd-portfolio/02-wedding-invite/
- 클래식 레터: [`?tpl=classic`](https://jackdinealkim.github.io/jd-portfolio/02-wedding-invite/?tpl=classic)
- 필름 에디토리얼: [`?tpl=editorial`](https://jackdinealkim.github.io/jd-portfolio/02-wedding-invite/?tpl=editorial)
- 가든 보태니컬: [`?tpl=garden`](https://jackdinealkim.github.io/jd-portfolio/02-wedding-invite/?tpl=garden)

## 세 템플릿

| # | 이름 | 무드 | 구성 |
|---|------|------|------|
| 01 | 클래식 레터 | 크림 종이 `#f8f4ee`, 명조, 왁스 실링, 한옥 마당의 따뜻한 햇살 | 아치 없는 정통 카드형. 은은한 금빛 먼지(Three.js) |
| 02 | 필름 에디토리얼 | 오프화이트 & 딥블랙 `#111`, 보도니 세리프, 흑백 화보, 35mm 그레인 | 큼직한 영문 이름, 인덱스 번호, 흑백 풀블리드 갤러리, 티커 |
| 03 | 가든 보태니컬 | 린넨 & 세이지 그린 `#4b604d`, 아치 사진, 야외 정원 | 아치 프레임, 만남→약혼→결혼 타임라인, 꽃잎 부유 |

세 템플릿 모두 아래 기능을 갖고 있습니다.

- 히어로: 이름·예식 일시·예식장·실사 사진 + 절제된 WebGL 효과(금빛 먼지 / 필름 그레인 / 꽃잎)
- 초대글, 양가 혼주 표기, `혼주에게 연락하기` 모달(전화·문자 링크)
- 예식 달력(예식일 원형 강조) + 실시간 D-day
- 포토 갤러리: 클릭 확대 라이트박스, 좌우 버튼·키보드·스와이프
- 오시는 길: 주소 복사, 네이버 지도 / 카카오맵 / 티맵 실행, 지하철·버스·주차 안내
- 마음 전하실 곳: 신랑·신부 측 아코디언, 계좌번호 원클릭 복사(토스트 알림)
- 청첩장 링크 복사 / 공유, 하단 크레딧(1만 원 맞춤 제작 · 호스팅 포함)

## 구조

```
02-wedding-invite/
├── index.html                 # 세 템플릿 마크업 (한 파일)
├── assets/
│   ├── invite.css             # 디자인 시스템 + 템플릿별 레이아웃
│   ├── invite.js              # 전환·달력·D-day·라이트박스·복사·지도 링크·WebGL
│   ├── img/                   # 실사 웨딩 사진 17장 (webp)
│   ├── fonts/                 # 한글 세리프·산세리프(KS X 1001 전체) + 라틴 디스플레이
│   └── vendor/three.min.js
└── README.md
```

## 수정하는 곳

- **날짜·예식장·좌표**: `assets/invite.js` 맨 위 `WEDDING` 객체 한 곳만 고치면 세 템플릿의 달력, D-day, 지도 링크가 함께 바뀝니다.
- **이름·혼주·계좌·연락처**: `index.html`에서 해당 템플릿 블록을 고칩니다. 실제로 납품할 때는 한 템플릿만 남기고 나머지 두 개와 전환 바를 지우면 됩니다.
- **사진**: `assets/img/`의 파일을 같은 이름으로 교체하면 코드 수정 없이 반영됩니다. (히어로 1086×1448, 갤러리 900px 폭 권장)
- **색·서체**: `assets/invite.css`의 `body[data-tpl="…"]` 블록에 템플릿별 색 변수가 모여 있습니다.

## 폰트

외부 CDN 없이 동작하도록 한글 폰트를 서브셋해 저장소에 넣었습니다. 서브셋 범위는 **KS X 1001 한글 2,350자 + ASCII + 문장부호**라서 웬만한 이름·주소는 깨지지 않습니다. 다른 글자가 필요하면:

```bash
pip install fonttools brotli
pyftsubset NotoSerifCJKkr-Regular.otf --text-file=chars.txt --flavor=woff2 \
  --layout-features=kern,liga,clig,calt --no-hinting --desubroutinize \
  --output-file=assets/fonts/serif-kr-400.woff2
```

## 검증

- 모바일 360 / 390 / 430px, 데스크톱 1440px에서 가로 스크롤 없음
- 콘솔 에러 0, 깨진 이미지 0
- 갤러리 라이트박스(버튼·키보드·스와이프), 계좌 복사, 주소 복사, 달력·D-day, 템플릿 전환 동작 확인
- `prefers-reduced-motion`에서 애니메이션·WebGL 정지

## 사진

샘플 사진은 이미지 생성 도구로 만든 예시입니다. 실제 제작 시 신랑·신부 사진으로 교체합니다.
