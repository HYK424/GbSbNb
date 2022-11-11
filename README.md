# Elice SW 3 Team-15 1차 프로젝트 쇼핑몰 웹 서비스 "개발세발네발"

<div>
<img alt="개발세발네발 로고" src="./src/views/public/img/favicon.png" width="200px">
</div>
<br />

## 1. 서비스 소개

### 안녕하세요! 개발자들만을 위한 쇼핑몰 **개발세발네발**입니다. 😊
프로젝트 결과물에는 단순히 '어떤 기능을 어떻게 개발할까'라는 고민보다는,    
프론트엔드 파트는 어떻게 하면 더 나은 UI/UX를 제공할 수 있을 지,   
백엔드 파트는 어떻게 안정적이면서도 프론트엔드에 도움이 되는 서버를 만들 수 있을 지에 대한 고민을 담았습니다.

### 핵심 기능 명세서
1. 회원, 제품, 카테고리, 카트, 주문 등 **쇼핑몰의 핵심 기능 관련 CRUD** 
2. **리프레쉬 토큰**을 활용해 Access Token 만료 기한을 축소해 보안성과 편의성 개선
3. 전체 제품 목록을 **1) 페이지 2) 카테고리 3) 상품명 4) 제조사**별로 조회 가능
4. **Local Stroage**를 활용한 장바구니를 통해 주문을 진행 및 주문 완료 후 조회 및 삭제 가능
5. 관리자 페이지에서 한 번에 여러 **회원 권한, 배송 상태** 변경이 가능함.

<br />

### 1-1. 프로젝트 도메인
### http://kdt-sw3-team15.elicecoding.com/
🙏 반응형 디자인은 아직 적용하지 못했습니다. 가능하시다면 최대한 PC로 접속 부탁드려요!
<div>
<img alt="개발세발네발 QR코드" src="./qr.jpg" width="300px">
</div>

### 1-2. POSTMAN API 문서
### https://documenter.getpostman.com/view/23971901/2s8YRmKDSB

<br>

## 2. 페이지별 상세 설명

### 2-1. 홈 화면, 카테고리별 보기, 검색


| 기능 | 설명 |
| ------ | ------ |
| 홈 | 제품 목록 그리드형으로 보기 가능, 페이지네이션 |
| 카테고리 조회 | 사용자가 카테고리를 확인하고, 카테고리별로 제품을 확인 |
| 검색  | 사용자가 검색어를 입력하면 해당 검색어의 제품을 확인 |

<details><summary>데모 영상</summary>

[](https://kdt-gitlab.elice.io/sw_track/class_03/web_project/team15/project/uploads/60bcfef8a9c4316016ccd7161d7013c7/Animation.gif)
   
</details>



<details><summary>사용자 회원가입, 로그인</summary>

![image](https://user-images.githubusercontent.com/91174156/172159634-1e105633-9948-464e-a540-5429200a1353.gif)

</details>

<details><summary>카테고리 추가 및 반영</summary>

추후 관련 영상을 삽입하세요 (하기 2가지 방법 가능)
1. 화면녹화 -> 유튜브 업로드 -> 유튜브 링크 삽입  
2. 화면움짤녹화 -> 움짤삽입 (https://www.screentogif.com/ 활용가능)
   
</details>

<details><summary>제품 추가 및 반영</summary>

추후 관련 영상을 삽입하세요 (하기 2가지 방법 가능)
1. 화면녹화 -> 유튜브 업로드 -> 유튜브 링크 삽입  
2. 화면움짤녹화 -> 움짤삽입 (https://www.screentogif.com/ 활용가능)

</details>

<details><summary>장바구니 기능</summary>

추후 관련 영상을 삽입하세요 (하기 2가지 방법 가능)
1. 화면녹화 -> 유튜브 업로드 -> 유튜브 링크 삽입  
2. 화면움짤녹화 -> 움짤삽입 (https://www.screentogif.com/ 활용가능)

</details>

<details><summary>주문 기능</summary>

추후 관련 영상을 삽입하세요 (하기 2가지 방법 가능)
1. 화면녹화 -> 유튜브 업로드 -> 유튜브 링크 삽입  
2. 화면움짤녹화 -> 움짤삽입 (https://www.screentogif.com/ 활용가능)

</details>

<details><summary>관리자 페이지</summary>

추후 관련 영상을 삽입하세요 (하기 2가지 방법 가능)
1. 화면녹화 -> 유튜브 업로드 -> 유튜브 링크 삽입  
2. 화면움짤녹화 -> 움짤삽입 (https://www.screentogif.com/ 활용가능)

</details>

<br />

### 1-3. 페이지 별 화면

|  |  |
| ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------|
| ![image](https://i.ibb.co/jyxjcd3/image.png) | ![image](https://i.ibb.co/Q860RKz/image.png) |
|    메인 페이지                                |      회원가입 화면                            |
| ![image](https://i.ibb.co/RpYN379/image.png) |                                         |
|    로그인 페이지                              |     앞으로 추가할 페이지                         |

<br />


## 3. 기술 스택

![image](https://i.ibb.co/N34mXzy/image.png)

<br />

### 3-1. 프론트엔드

- **Vanilla javascript**, html, css (**Bulma css + Bootstrap**)
- Font-awesome 
- Daum 도로명 주소 api 

### 3-2. 백엔드 

- **Express** (nodemon, babel-node로 실행됩니다.)
- Mongodb, Mongoose
- cors
- 이외



## 4. 인프라 구조

![image](https://i.ibb.co/9tGxmx0/image.png)<br />

### 4-1. 폴더 구조
- 프론트: `src/views` 폴더 
- 백: src/views 이외 폴더 전체
- 실행: **프론트, 백 동시에, express로 실행**

<br />

## 5. 제작자

| 이름 | 담당 업무 |
| ------ | ------ |
| 김현율 | 프론트엔드 |
| 오인국 | 백엔드 |
| 장원혁 | 프론트엔드 |
| 김건우 | 백엔드 |

<br />

## 5. 실행 방법

1. 레포지토리를 클론하고자 하는 디렉토리에서 아래 명령어를 수행

```bash
git clone <레포지토리 주소>
```


2. 클론한 디렉토리에서 backend 디렉토리로 들어가 아래 명령어를 통해 backend에서 필요한 module 설치

```bash
npm install
```


3. backend에서 필요한 `.env` 설정

```bash
MONGODB_URL=<몽고DB URL>
PORT=5000
JWT_SECERT_KEY=<랜덤 문자열>
```

4. express 앱을 실행

```bash
npm start
```

<br>

## 6. 버전
### 1.0.0

<br>

## 7. FAQ
<details><summary>1. 배포된 페이지는 어디에서 확인할 수 있나요?</summary>

  <p>
    프로젝트 기본 코드는 따로 배포하지 않았습니다, 레포지토리를 클론하여 직접 실행해보세요.
  </p>

</details>
<details><summary>2. env 파일이 보이지 않습니다.</summary>

  <p>
    해당 파일은 직접 만들어서 코드를 작성해야 합니다, DB를 비롯한 서비스의 계정 정보는 <b>절대로</b> Git에 함부로 공유하면 안되기 때문에 유의 바랍니다.
  </p>

</details>
