# 👘 오노라 쇼핑몰 (ONORA)
> **"전통을 매력으로"**
> 전통의상과 소품을 판매하는 쇼핑몰 사이트를 기획부터 퍼블리싱까지 단독으로 제작한 오리지널 프로젝트입니다.

## 🚀 Project Summary
| 항목 | 내용 |
| :--- | :--- |
| **작업 기간** | 2024.09.28 - 2024.10.29 (기획 9일, 코딩 24일) |
| **담당 역할** | 기획, UI/UX 디자인, 퍼블리싱 (단독 진행 100%) |
| **기술 스택** | HTML5, SCSS, JavaScript (ES6+), GSAP, Slick.js, Swiper.js |
| **배포 링크** | [🔗 사이트 바로가기]() |

## 📅 Project Timeline
<details>
<summary><b>상세 일정 보기 (클릭하여 열기/닫기)</b></summary>
<div markdown="1">

### ▫️ Phase 1. Planning & Design `(09.28 - 10.06)`
- 브랜드 콘셉트 기획 및 와이어프레임 작성
- Figma를 활용한 UI 디자인 시안 제작

### ▫️ Phase 2. Publishing `(10.07 - 10.29)`
- 메인/서브/로그인 페이지 마크업 및 인터랙션 구현
- Slick.js 메인 배너, Swiper.js Coverflow 효과 적용

</div>
</details>

## 🛠 Tech Stacks
<p>
  <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white">
  <img src="https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white">
</p>

## ✨ Key Points & Improvements

### 1️⃣ 정보 밀도 제어를 통한 UX 설계
- **Information Hierarchy**: `slice()`를 활용해 초기 노출 상품을 8개로 제한, 콘텐츠 과부하 방지
- **시각적 피드백**: `fadeIn/fadeOut`으로 리스트 증감을 부드럽게 처리

### 2️⃣ 위치 이탈 방지 UX
- **scrollTo 연동**: 상품 목록을 접었을 때 사용자 시선이 이탈하지 않도록 해당 섹션 타이틀로 자동 재고정
- 라이브러리 의존 없이 직접 스크롤 위치를 계산하여 처리

### 3️⃣ 라이브러리 조합 활용
- **Slick.js**: 메인 배너 자동 슬라이드
- **Swiper.js**: Coverflow Effect를 활용한 상품 전시 UI

## 📂 Directory Structure
```text
project/
├── css/
├── images/
├── js/
│   └── main.js
└── index.html
```

© 2024 서○지. All rights reserved.
