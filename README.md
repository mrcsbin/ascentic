# ascentic [에이센틱]

## 👨‍💻 Background
취향에 맞는 향을 추천해주고 구독, 판매하는 웹 쇼핑몰입니다.

이름만 알고 향에 대해 잘 모르는 사람들을 위해 취향 테스트를 바탕으로 사용자에게 향을 추천합니다.

나의 향기 취향을 알고 싶고, 다양한 향을 구독 서비스를 통해 추천 받으며 직접 원하는 향을 골라보고 싶은 사람들을 위한 구독/판매 플랫폼


## 📚 Stacks
<div align="center">
<img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white"> <img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=Spring&logoColor=white"> <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
  
<img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
 <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
</div>

## 📅 Duration
2023.04.18 -> 2023.06.09
- 1주차 - 프로젝트 기획 및 주제 선정
- 2주차 - ERD, UI / UX 설계
- 3주차 - 프론트 / 백엔드 기본 서비스 기능 구현
- 4주차 - DB 수정 및 스타일 리팩토링
- 5주차 - 프론트 - 백 간의 API 연동, 예외처리, 결제 구현
- 6주차 - 프로젝트 최종 병합 및 오류 수정

## 🗺️ Navigation Structure
- 사용자 페이지 구조도
![사용자페이지구조도](https://github.com/mrcsbin/soolpanda/assets/81237987/4a2bab2e-8969-4668-83dd-e1919b3d87e9)

- 관리자 페이지 구조도
![관리자페이지구조도](https://github.com/mrcsbin/soolpanda/assets/81237987/4c2730d1-72dc-436b-8ed6-bbb92ecabc45)


## 💡 Features

- 사용자 패스워드 암호화
  - 패스워드를 암호화 없이 저장하던 방식에서 Spring Security을 사용해 패스워드를 암호화하여 저장하였습니다. 이 결과 회원 개인정보에 대한 보안이 강화되었습니다.

- JWT 토큰을 활용한 검증
  - 회원의 로그인 과정에서 단순히 DB에 있는 회원의 아이디 및 패스워드가 일치하는지를 확인하는 방식이 아닌 로그인 시 서버에서 해당 정보로 JWT토큰을 생성하고 이를 클라이언트의 브라우저 쿠키에 저장 및 사용자 인증에 활용하는 방식으로 보안을 강화하였습니다.

- 취향 테스트를 통한 향 추천
  - 향에 익숙하지 않은 사용자를 위해 몇가지의 문항을 제시한 뒤 사용자에게 알맞은 향을 추천하여 상품에 대한 접근성을 향상시켰습니다.
  
- React-toolkit 을 활용한 상태 관리
  - 하나의 페이지를 구현하는데 여러 컴포넌트가 사용되다 보니 데이터의 양이 많아질수록 관리가 힘들어졌습니다.
  - 이에 대해 고민한 결과로 데이터를 전역으로 관리하기 위해 React-toolkit을 사용하였고 그 결과 더 유연하고 효율적인 상태 관리를 구현할 수 있었습니다.
