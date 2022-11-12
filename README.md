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

![image](/uploads/60bcfef8a9c4316016ccd7161d7013c7/Animation.gif)
   
</details>

<details><summary>페이지별 화면</summary>
<table>
  <tr>
    <td>![image](/uploads/5d3bae9349c82eb1c5acc80114a262fe/이미지_24.png)</td>
    <td>![image](/uploads/613954179682f320baa87ad2ba6c55e8/이미지_27.png)</td>
  </tr>
  <tr>
    <td>메인 페이지</td>
    <td>카테고리별 보기</td>
  </tr>
  <td>![image](/uploads/b60ffc832495e3459ca3cb4daaca3838/이미지_29.png)</td>
    <td>![image](/uploads/8a63d878e137fe14bbee3cba164f69ea/이미지_34.png)</td>
  </tr>
  <tr>
    <td>검색 결과 페이지</td>
    <td>검색 결과 없음</td>
  </tr>
</table>
</details>

<br>

### 2-2. 사용자 회원가입, 로그인

| 기능 | 설명 |
| ------ | ------ |
| 회원가입 | 주소, 이메일 등의 정보를 입력받아 회원가입함 |
| 회원가입 (추가) | 다음 API와 연결해 주소를 입력함 |
| 로그인 | 사용자의 ID와 비밀번호를 확인 후 로그인 |
| 로그인 (추가)  | 사용자가 비밀번호를 잃어버렸을 시 이메일, 전화번호를 입력하여 재발급 |


<details><summary>데모 영상</summary>

![register_A](/uploads/93f69c8806ab1de396a5e404880b978a/register_A.gif)
   
</details>

<details><summary>페이지별 화면</summary>
<table>
  <tr>
    <td>![register](/uploads/9fdbc96fcd1fc2bb787c07a1ad04a7b8/register.png)</td>
    <td>![login](/uploads/596348eaf0dfe645f88abafcb4033477/login.png)</td>
  </tr>
  <tr>
    <td>회원가입</td>
    <td>로그인</td>
  </tr>
</table>
</details>

<br>

### 2-3. 제품 상세 정보 확인

| 기능 | 설명 |
| ------ | ------ |
| 제품 상세 정보 | 사용자는 제품의 상세정보를 보고 장바구니에 추가할 수 있음 |
| 제품 상세 정보 (추가) | 장바구니에 추가시 수량 지정 가능 |

<details><summary>데모 영상</summary>

![product_detail_A](/uploads/5892f729d809c6609f11cba20fda3567/product_detail_A.gif)
   
</details>

<details><summary>페이지별 화면</summary>
<table>
  <tr>
    <td>![product_detail](/uploads/a429b4736e6128e34b35f23e232e64d5/product_detail.png)</td>
    <td></td>
  </tr>
  <tr>
    <td>제품 상세 정보</td>
    <td></td>
  </tr>
</table>
</details>

<br>

### 2-4. 장바구니 기능

| 기능 | 설명 |
| ------ | ------ |
| 장바구니 | 추가한 물건을 자유롭게 빼고 수량 수정 가능 |
| 장바구니 (추가) | 장바구니 Item 갯수가 nav에서 보임 |

<details><summary>데모 영상</summary>

![cart_A](/uploads/165fe2d2120c5e52b558bd253196c4d7/cart_A.gif)
   
</details>

<details><summary>페이지별 화면</summary>
<table>
  <tr>
    <td>![cart](/uploads/f8d35be6d21411f3c2a31af6e6e1a81b/cart.png)</td>
    <td></td>
  </tr>
  <tr>
    <td>장바구니</td>
    <td></td>
  </tr>
</table>
</details>

<br>

### 2-5. 주문 및 주문 확인, 비회원 주문 조회

| 기능 | 설명 |
| ------ | ------ |
| 주문 | 카트에서 받아와 주문 시행 |
| 주문 확인 | 비회원을 위해 주문 ID를 사용자에게 줌 |
| 비회원 주문 조회 (추가) | ID와 전화번호 입력시 주문 상세 결과 확인 가능 |

<details><summary>데모 영상</summary>

![order_A](/uploads/ebc3cee36076dce7f08cfffd1bdd1ba9/order_A.gif)

![order_check_A](/uploads/3c5156955158c82dc07113612bbf0564/order_check_A.gif)
   
</details>

<details><summary>페이지별 화면</summary>
<table>
  <tr>
    <td>![order](/uploads/2349fea00e808306a3b0b60d89142a5a/order.png)</td>
    <td>![order_fin](/uploads/48289b551ed5bb6818c8e9ba0ee0b0ac/order_fin.png)</td>
  </tr>
  <tr>
    <td>주문</td>
    <td>주문 확인</td>
  </tr>
  <tr>
    <td>)![order_check](/uploads/42772cbeecbbd36d1e5118fe055ba718/order_check.png)</td>
    <td></td>
  </tr>
  <tr>
    <td>비회원 주문 조회</td>
    <td></td>
  </tr>
</table>
</details>
<br />
### 2-5. 마이 페이지

| 기능 | 설명 |
| ------ | ------ |
| 회원정보 수정 | 정보 수정, 비밀번호 변경, 비밀번호 삭제 |
| 회원 주문 조회 | 주문을 조회하고 주문 취소 가능 |

<details><summary>데모 영상</summary>

![order_A](/uploads/ebc3cee36076dce7f08cfffd1bdd1ba9/order_A.gif)

![order_check_A](/uploads/3c5156955158c82dc07113612bbf0564/order_check_A.gif)
   
</details>

<details><summary>페이지별 화면</summary>
<table>
  <tr>
    <td>![order](/uploads/2349fea00e808306a3b0b60d89142a5a/order.png)</td>
    <td>![order_fin](/uploads/48289b551ed5bb6818c8e9ba0ee0b0ac/order_fin.png)</td>
  </tr>
  <tr>
    <td>주문</td>
    <td>주문 확인</td>
  </tr>
  <tr>
    <td>)![order_check](/uploads/42772cbeecbbd36d1e5118fe055ba718/order_check.png)</td>
    <td></td>
  </tr>
  <tr>
    <td>비회원 주문 조회</td>
    <td></td>
  </tr>
</table>
</details>

<br>

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
