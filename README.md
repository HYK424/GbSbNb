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
#### http://kdt-sw3-team15.elicecoding.com/
🙏 반응형 디자인은 아직 적용하지 못했습니다. 가능하시다면 최대한 PC로 접속 부탁드려요!
<div>
<img alt="개발세발네발 QR코드" src="./docs/images/qr.jpg" width="300px">
</div>

### 1-2. 테스트용 비밀번호
#### 일반 유저
| 이메일 | 비밀번호 |
| ------ | ------ |
| user@elice.com | 비밀번호(영문으로) |

#### 관리자 유저
| 이메일 | 비밀번호 |
| ------ | ------ |
| admin@elice.com | 관리자(영문으로) |

<br>

### 1-3. API 문서
#### GBSBNB API 문서 COMMONS
[**▶ 바로가기**](https://valuable-sunspot-015.notion.site/a3e118ba48d34ba6ada2be02196b0190?v=5124a7fc4a1b4206afa95f0f830e5953)

#### GBSBNB API 문서 ADMIN
[**▶ 바로가기**](https://valuable-sunspot-015.notion.site/eab7c845744e40198e8ba52063bb26af?v=ee9abbec8b3f41a4bb42d90408fd3324)

#### POSTMAN API 문서
[**▶ 바로가기**](https://documenter.getpostman.com/view/23971901/2s8YRmKDSB)

<br>

## 2. 페이지별 상세 설명

### 2-1. 홈 화면, 카테고리별 보기, 검색


| 기능 | 설명 |
| ------ | ------ |
| 홈 | 제품 목록 그리드형으로 보기 가능, 페이지네이션 |
| 카테고리 조회 | 사용자가 카테고리를 확인하고, 카테고리별로 제품을 확인 |
| 검색  | 사용자가 검색어를 입력하면 해당 검색어의 제품을 확인 |

<details><summary>데모 영상</summary>

![image](./docs/gifs/Animation.gif)
   
</details>

<details><summary>페이지별 화면</summary>
<table>
  <tr>
    <td>![image](./docs/images/image24.png)</td>
    <td>![image](./docs/images/image-27.png)</td>
  </tr>
  <tr>
    <td>메인 페이지</td>
    <td>카테고리별 보기</td>
  </tr>
  <td>![image](./docs/images/image-29.png)</td>
    <td>![image](./docs/images/image-34.png)</td>
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
| 로그인 (추가)  | AccessToken, RefreshToken을 나눔 |
| 로그인 (예정)  | 사용자가 비밀번호를 잃어버렸을 시 이메일, 전화번호를 입력하여 재발급 |


<details><summary>데모 영상</summary>

![register_A](./docs/images/register-A.gif)
   
</details>

<details><summary>페이지별 화면</summary>
<table>
  <tr>
    <td>![register](./docs/images/register.png)</td>
    <td>![login](./docs/images/login.png)</td>
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

![product-detail_A](./docs/gifs/product-detail-A.gif)
   
</details>

<details><summary>페이지별 화면</summary>
<table>
  <tr>
    <td>![product_detail](./docs/images/product-detail.png)</td>
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

![cart_A](./docs/gifs/cart-A.gif)
   
</details>

<details><summary>페이지별 화면</summary>
<table>
  <tr>
    <td>![cart](./docs/images/cart.png)</td>
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
| 주문 | 카트에서 받아와 주문 시행, 회원일 때는 회원정보 불러옴 |
| 주문 확인 | 비회원을 위해 주문 ID를 사용자에게 줌 |
| 비회원 주문 조회 (추가) | ID와 전화번호 입력시 주문 상세 결과 확인 가능 |

<details><summary>데모 영상</summary>

![order_A](./docs/gifs/order-A.gif)

![order_check_A](./docs/gifs/order-check-A.gif)
   
</details>

<details><summary>페이지별 화면</summary>
<table>
  <tr>
    <td>![order](./docs/images/order.png)</td>
    <td>![order_fin](./docs/images/order-fin.png)</td>
  </tr>
  <tr>
    <td>주문</td>
    <td>주문 확인</td>
  </tr>
  <tr>
    <td>)![order_check](./docs/images/order-check.png)</td>
    <td></td>
  </tr>
  <tr>
    <td>비회원 주문 조회</td>
    <td></td>
  </tr>
</table>
</details>

<br>

### 2-6. 마이 페이지

| 기능 | 설명 |
| ------ | ------ |
| 회원정보 수정 | 정보 수정, 비밀번호 변경, 계정 삭제(softdelete) |
| 회원 주문 조회 | 주문을 조회하고 주문 취소 가능 |

<details><summary>데모 영상</summary>

![mypage_info_A](./docs/gifs/mypage-info_A.gif)

![mypage_order_A](./docs/gifs/mypage-order-A.gif)
   
</details>

<details><summary>페이지별 화면</summary>
<table>
  <tr>
    <td>![mypage_enter](./docs/images/mypage-enter.png)</td>
    <td>![mypage_info](./docs/images/mypage-info.png)</td>
  </tr>
  <tr>
    <td>마이페이지 홈</td>
    <td>내 정보 확인</td>
  </tr>
  <tr>
    <td>![mypage_info_modal](./docs/images/mypage-info-modal.png)</td>
    <td>![mypage_info_edit](./docs/images/mypage-info-edit.png)</td>
  </tr>
  <tr>
    <td>정보 수정시 모달</td>
    <td>내 정보 수정</td>
  </tr>
  <tr>
    <td>![mypage_info_password](./docs/images/mypage-info-password.png)</td>
    <td>![mypage_order_new](./docs/images/mypage-order-new.png)</td>
  </tr>
  <tr>
    <td>비밀번호 수정</td>
    <td>내 주문내역 수정</td>
  </tr>
</table>
</details>

<br>

### 2-7. 어드민

| 기능 | 설명 |
| ------ | ------ |
| 상품 조회 | 상품 확인, 공개/비공개, 상품 정보 수정 |
| 회원 관리 | 회원 확인, 어드민/일반 역할 수정 |
| 상품/카테고리 관리 | 카테고리 및 상품 수정, 카테고리 추가/삭제 |
| 주문 배송 관리 | 주문 확인, 배송현황 변경 |

<details><summary>데모 영상</summary>

![admin_item_A](./docs/gifs/admin-item-A.gif)

![admin_role_A](./docs/gifs/admin-role-A.gif)

![admin_add_A](./docs/gifs/admin-add-A.gif)
   
![admin_order_A](./docs/gifs/admin-order-A.gif)
</details>

<details><summary>페이지별 화면</summary>
<table>
  <tr>
    <td>![admin_main](./docs/images/admin-main.png)</td>
    <td>![admin_item](./docs/images/admin-item.png)</td>
  </tr>
  <tr>
    <td>어드민 홈</td>
    <td>상품 조회</td>
  </tr>
  <tr>
    <td>![admin_item_edit](./docs/images/admin-item-edit.png)</td>
    <td>![admin_role](./docs/images/admin-role.png)</td>
  </tr>
  <tr>
    <td>상품 수정</td>
    <td>회원 관리</td>
  </tr>
  <tr>
    <td>![admin_add](./docs/images/admin-add.png)</td>
    <td>![admin_order](./docs/images/admin-order.png)</td>
  </tr>
  <tr>
    <td>상품/카테고리 관리</td>
    <td>주문 배송 관리</td>
  </tr>
</table>
</details>

<br>

### 2-8. 공지사항

| 기능 | 설명 |
| ------ | ------ |
| 공지사항 | 게시판, 어드민이 공지사항 추가/수정/삭제 |

<details><summary>데모 영상</summary>

![notice_A](./docs/gifs/notice-A.gif)

</details>

<details><summary>페이지별 화면</summary>
<table>
  <tr>
    <td>![notice_see](./docs/images/notice-see.png)</td>
    <td>![notice_ceate](./docs/images/notice-ceate.png)</td>
  </tr>
  <tr>
    <td>공지사항 홈</td>
    <td>공지사항 생성</td>
  </tr>
  <tr>
    <td>![notice_edit](./docs/images/notice-edit.png)</td>
    <td></td>
  </tr>
  <tr>
    <td>공지사항 수정</td>
    <td></td>
  </tr>
</table>
</details>

<br>

### 2-9. 404

| 기능 | 설명 |
| ------ | ------ |
| 404 | 404 오류시 띄우는 페이지 |

<details><summary>페이지별 화면</summary>
<table>
  <tr>
    <td>![404](./docs/images/404.png)</td>
    <td></td>
  </tr>
  <tr>
    <td>404</td>
    <td></td>
  </tr>
</table>
</details>

<br>

## 3. 기술 스택

![image__1_](./docs/images/team-15-tech-stack.png)

<br>

### 3-1. 프론트엔드

- **Vanilla javascript**, html, css (**Bootstrap**)
- Font-awesome 
- Daum 도로명 주소 api 

### 3-2. 백엔드 

- **express** (nodemon, babel-node로 실행됩니다.)
- express vaildator
- Cloudinary
- Mongodb, Mongoose
- cors
- 이외



## 4. 인프라 구조

![image](docs/images/infra-structure.png)<br />

### 4-1. 폴더 구조
- 프론트: `src/views` 폴더 전체
- 백: 3계층 구조(Router - Controller - Service - Model)
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

### 1. Git Flow

- 각 브랜치는 dev 브랜치로부터 feature/{파트명}-{기능명}으로 통일해요😀
    - feature/BE-productAPI 등
- 충돌 해결은 다 같이!

### 2. 커밋 컨벤션

- fix: 코드베이스에서 버그를 패치하는 fix 타입의 커밋
    - ex) fix: 모달 창 버그 수정
- feaf: 코드베이스에서 새 기능이 추가되는 feat 타입의 커밋
    - ex) feat: 로그아웃 기능 구현
- chore: 기능과는 별개로 prettier, gitignore 등의 설정 관련 커밋
    - ex) chore: eslint 설정
- docs: 문서화 또는 오탈자 수정 등의 커밋
    - ex) docs: README 수정
- 참고 자료: [https://www.conventionalcommits.org/ko/v1.0.0/](https://www.conventionalcommits.org/ko/v1.0.0/)

### 3. 네이밍 컨벤션

#### 1. 클래스 ➡ 파스칼 표기법(UserSchema)

#### 2. 함수 & 변수 ➡ 카멜 표기법(newPost, isEmailVaild)

- 함수는 동사를 가장 앞에 쓴다 ➡ createPost, finishLogin, sendEmail 등
- Boolean은 is, has로 표기한다 ➡ isLoggedIn, hasToken 등

#### 3. 상수 ➡ 대문자 + 언더스코어(PI, DB_URL, TOKEN_SECRET)

#### 4. 패키지 & 모듈 ➡ 소문자(user-router, user-controller)

<br>

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
PORT=<3000 || 5000 || 8080 포트>
ACCESS_KEY=<랜덤 문자열>
REFRESH_KEY=<랜덤 문자열>
MONGODB_URL=<몽고DB URL>
ACCESS_EXPIRE=<최대한 짧게>
REFRESH_EXPIRE=<적당히 길게>
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
```

4. express 앱을 실행

```bash
npm start
```

<br>

## 6. 버전
### 1.0.0 <'22.11.11 배포>

<br>
