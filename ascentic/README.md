# ascentic

## Notion Link



(https://dented-bell-59e.notion.site/ascentic-69fb1a6b2ce74de28e77352a3565ad45?pvs=4)

## 프로젝트 소개



- 향 제품을 **구독, 판매**하는 웹 쇼핑몰입니다.
- 시중에 존재하는 너무 많은 향으로 인해 이름만 들어서 **어떤 향인지 판단하기가 쉽지 않습니다.**
    - 이 프로젝트는 사용자가 간단한 **취향 테스트를** 통해 본인의 취향을 찾고, **구독 서비스를 통해 원하는 향을 구독해 해당 향에 해당하는 다양한 제품들을 사용**하고, 여러 향 **제품들을 구매할 수 있는 쇼핑몰**을 개발했습니다.

## 팀 소개



- 나해성(팀장)
- 강경민
- 조성빈
- 조한식
- 전채은
- 황성민

## 기술 스택



### Front-End
- React.js
- redux-toolkit(전역 상태 라이브러리)

### Back-End
- Spring Boot
- JPA(Java Persistence API)
- JJWT
  
### Database
- MySQL
  
### Open API
- kakao 로그인 API
- Toss Payments 결제 API

## 수행 절차



### 사전 기획

(04.18 ~ 04.23)

- 프로젝트 기획 및 주제 선정
- 아이디어와 세부사항 회의
- 아이디어 선정 기획안 작성

### 구현 및 테스트1

(04.31 ~ 05.12)

- 팀별 작업
- 프론트엔드/백엔드 기본 서비스 기능 구현
- 테스트

### 구현 및 테스트2

(05.24 ~ 06.05)

- 외부 API 연결
- 관리자 페이지 구현
- 예외처리
- 결제 구현
- 최종 점검

### 요구 사항 분석/설계

(04.24 ~ 04.30)

- 요구사항 분석
- 시스템 기능 도출
- UI 설계
- ERD 설계

### 재구성 및 수정

(05.13 ~ 05.19)

- DB 수정
- 샘플 데이터 삽입
- 스타일 재정비 작업
- 코드 재정비 작업

## 페이지 구조도



- **사용자** 페이지 구조도

![Untitled](https://github.com/kmindev/ascentic/assets/97210232/9f8ecce4-337d-4a43-87b8-7cf95a191a9d)



- **관리자** 페이지 구조도

![Untitled 1](https://github.com/kmindev/ascentic/assets/97210232/368d38c1-889b-46ea-854f-1cd26b25b25d)


## 데이터베이스 설계



![Untitled 2](https://github.com/kmindev/ascentic/assets/97210232/6e3d9e64-ed40-4255-921f-e4085a59747e)


## 기능 소개



![Untitled 3](https://github.com/kmindev/ascentic/assets/97210232/4824f29a-51a3-4675-884d-58f2cb56f0df)


## 페이지 소개



[메인/로그인 및 회원가입](https://www.notion.so/27fd32fa5c6a44cb8f6eea3ffb278dc8?pvs=21)

[취향 테스트 서비스](https://www.notion.so/adcba36f91fd40c4801e2903762f35e1?pvs=21)

[구독 서비스](https://www.notion.so/41e8cc68e0fa4f0d8b44ac1202b0be87?pvs=21)

[스토어 서비스](https://www.notion.so/4ceb0d2b628940928e287fc5556b32bd?pvs=21)

[마이페이지](https://www.notion.so/076d880ddb6f4b13be0b0c10415b3e54?pvs=21)

[관리자 페이지](https://www.notion.so/c5963d5aa0c34023bd968e85e4ea6d39?pvs=21)

## 성과



- 사용해보지 않았던 api들을 사용해보며 웹과 서버에 대해 조금 더 잘 알아가는 계기가 되었다.
- 적절한 테이블 관계 설정과 데이터 **정규화**를 통해 데이터를 구조화하여 데이터의 일관성을 유지하고 데이터의 중복과 이상 현상을 최소화 했다.
- 자바의 스트림에 대해서 학습하여 적용한 함수형 프로그래밍 접근 방식은 **코드의 가독성과 유지보수성**을 높여주었다.
- 계속해서 더 간결하고, 더 나은 성능을 고려하다보니 점진적으로 코드를 짜는 스타일이 달라졌고 더 나아졌음을 느꼈다.
- 전반적인 웹 프로세스의 대한 이해가 더 깊어졌으며, 데이터를 잘 활용하기 위한 방법 또한 더 배웠다.
- 프론트 백엔드 설계에 대해 조금 더 이해할 수 있었고, 공부 내용을 어떻게 적용해야하는 지에 대해 알 수 있었다.
- 이전 프로젝트에서 구현하지 못했던 관리자 페이지 기능을 구현할 수 있었고, 많은 기능과 디자인을 구현하며 배워가는 게 많았던 프로젝트였다.

## 문제 해결



- 처음 도전해보는 기능들이 많았는데, 팀원들과 함께 소통하며 잘 헤쳐나간 것 같다.
- **순환 참조 문제** 등에 대해 처음 접하면서 어려움이 있었지만, **영속성 컨텍스트와 JPA 동작 원리**를 공부하여 문제를 해결할 수 있었다.
- 하나의 페이지를 여러 컴포넌트로 나눠서 작업하다보니 데이터를 양방향으로 전달하는 것이 복잡해졌다. 이를 전역으로 관리하기 위해 **redux-toolkit**을 사용하였다.
- 특히 **토스페이먼츠 결제** 구현할 때, 데이터 연동과 저장이 어려웠다. 천천히 뭐가 필요할지 생각해보고, 지금 어디까지 코드를 짰나 생각하며 해결했다.
- 프론트 작업을 하면서 자꾸 어긋나는 디자인을 팀원들과 블로그 공부를 통해 해결할 수 있었다.
많은 컴포넌트들이 연계되고 렌더링되는 과정에서 오류를 해결하면서 효율적인 프론트엔드 구성에 대해 고민할 수 있었다.

## 아쉬운 부분



- **서비스 배포 경험**과 관련된 지식을 쌓기 위해 배포를 시도했지만, 시간상의 제약으로 인해 완료하지 못했다.
- 변경에 용이한 환경을 위해 **테스트 코드 작성**을 시도했지만, 마찬가지로 시간상의 제약으로 인해 이루어지지 못했다.
- 테스트 케이스를 작성하지 않아 새로운 기능을 추가할 때 기존 기능의 결함 여부를 파악하기 힘들었다.
- JWT 토큰을 통해 사용자 인증에 사용하였으나 **액세스 토큰만 사용하는 반쪽짜리 기능**이 되었다.
프로젝트 시작 부분에서 나중 일을 경험 해보지 못하여 막막했고, 노련하지 못 하게 설계를 했던 것 같다.
- 기간이 촉박하고 면접 등의 일정이 겹쳐 디자인, 추가 기능 구현, 배포,  테스트코드를 전부 챙기지 못한 것이 아쉽다.