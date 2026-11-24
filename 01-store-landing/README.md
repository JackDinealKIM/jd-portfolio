# 01 · 업종별 원페이지 홈페이지 샘플

같은 구조를 세 업종에 맞춰 다시 쓴 원페이지 샘플입니다. 상단 인덱스 탭에서 업종을 바꾸면 상호, 문장, 메뉴, 후기, 사진, 강조색이 함께 바뀝니다.

| 업종 | 상호 | 링크 |
|------|------|------|
| 카페·식당 | 온기커피 (구리 인창동 로스터리) | [`?ind=cafe`](?ind=cafe) |
| 인테리어·설비 | 바른욕실·설비 (구리·남양주) | [`?ind=interior`](?ind=interior) |
| 학원·공방 | 흙과손 도예공방 (구리 인창동) | [`?ind=clay`](?ind=clay) |

## 파일

```
01-store-landing/
├── index.html                 # 페이지 + 업종 데이터 + 셰이더
└── assets/
    ├── cafe-hero.webp ...     # 업종별 실사 이미지 16장 (webp, 1200~1536px)
    ├── fonts/                 # Editorial Serif / UI Sans / Index Mono 서브셋
    └── vendor/three.min.js    # r158 (MIT)
```

## 보는 법

- 로컬: `python3 -m http.server` 로 저장소 루트를 열고 `/01-store-landing/` 로 접속합니다. (WebGL 텍스처는 http에서만 로드됩니다)
- 업종 전환은 주소의 `?ind=` 값을 읽어 복원됩니다.
- 사진과 상호·후기는 모두 예시입니다.
