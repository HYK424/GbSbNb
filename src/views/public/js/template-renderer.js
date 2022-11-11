let isAdmin = false;
let isLoggedIn = false;
if (sessionStorage.getItem('accessToken')) {
  isLoggedIn = true;
  const decode = atob(sessionStorage.getItem('accessToken')?.split('.')[1]);
  const payload = JSON.parse(decode);
  const role = payload.role;
  isAdmin = role !== 'basic-user';
}

const hostTitle = document.querySelector('title');
const favicon = document.createElement('link');
const nav = document.getElementById('nav');
const footer = document.getElementById('footer');

const cartItems = JSON.parse(localStorage.getItem('cart'));
const cartItemsTotalCount = cartItems?.length;

async function main() {
  setHead();
  renderNav();
  renderFooter();
  renderCategoryFilter();
  const searchForm = document.getElementById('searchForm');
  searchForm.addEventListener('submit', handleSearchSubmit);
  addLogoutEvent();
}

async function handleGetCategories() {
  const categories = await (await fetch('/api/categories')).json();
  return categories;
}

main();

function setHead() {
  hostTitle.innerText = '개발세발네발';
  favicon.rel = 'icon';
  favicon.type = 'image/png';
  favicon.sizes = '16x16';
  favicon.href = '/public/img/favicon.png';
  document.head.appendChild(favicon);
  document.head.insertAdjacentHTML(
    'afterbegin',
    `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" /><link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,700;1,400&display=swap" rel="stylesheet"></link><link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poor+Story&family=Roboto:ital,wght@0,700;1,400&display=swap" rel="stylesheet">`,
  );
}

function renderNav() {
  nav.innerHTML = getNaveHTML();
}

function getNaveHTML() {
  return `<div class="d-flex">
  <a class="navbar-brand me-5" href="/" id="logo">개발세발네발🐶</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle me-5 ms-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      카테고리별
      </button>
      <ul class="dropdown-menu" id="categoryFilter">
      </ul>
      </div>
      <div class="search-form ms-3 me-5">
      <form class="d-flex" role="search" id="searchForm">
      <input
      class="form-control me-2"
      type="search"
      placeholder="상품명으로 검색"
      aria-label="Search"
            id="search"
            />
            <button class="btn btn-outline-success" type="submit" id="searchBtn">검색</button>
            </form>
            </div>
            <div class="">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-5">
            ${
              isLoggedIn
                ? `<li class="nav-item">
            <a class="nav-link active" aria-current="page" id="logout" class=""
            >로그아웃</a
            ><li class="nav-item">
            <a class="nav-link active" aria-current="page" id="logout" class="" href="/mypage"
            >마이페이지</a
            >`
                : `<li class="nav-item">
            <a class="nav-link active ms-2" aria-current="page" href="/login"
            >로그인</a
            >
            </li>
            <li class="nav-item">
            <a class="nav-link active ms-2" aria-current="page" href="/register"
            >회원가입</a
            >
            </li>`
            }
            <li class="nav-item">
            <a
            class="nav-link active position-relative"
            aria-current="page"
            href="/cart"
            id="cartNotification"
            >장바구니
            ${
              !cartItemsTotalCount
                ? ''
                : `
                  <span
                    class="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-danger"
                    id="cart-notification"
                  >
                    ${cartItemsTotalCount}
                    <span class="visually-hidden">unread messages</span>
                  </span>`
            }
            </a
            >
            ${
              isAdmin
                ? `<li class="nav-item">
            <a class="nav-link active ms-2" aria-current="page" href="/admin"
            >ADMIN</a
            >`
                : ``
            }
          </li>
          </ul>
          </div>
          </div>
          </div>`;
}

async function renderCategoryFilter() {
  const categories = await handleGetCategories();
  const categoryFilter = document.getElementById('categoryFilter');
  categories.forEach((category) => {
    let content = `<li><a class="dropdown-item" href="/?q=${category.name}">${category.name}</a></li>`;
    categoryFilter.insertAdjacentHTML('beforeend', content);
  });
}

function renderFooter() {
  footer.innerHTML = getFooterHTML();
}

function getFooterHTML() {
  return `<div class="d-flex justify-content-center align-items-center footerItem">
          <a class="mx-5 btn btn-dark opacity-75" href='https://kdt-gitlab.elice.io/sw_track/class_03/web_project/team15/project'>프로젝트 소개</a>
                <a href = '/notice' class="mx-5 btn btn-dark opacity-75">공지사항</a>
                <a class="mx-5 btn btn-dark opacity-75">입점 문의</a>
                <a class="mx-5 btn btn-dark opacity-75">관리자 문의</a>
                <a  href = '/orderLookup'
                 class="mx-5 btn btn-dark opacity-75">비회원 주문조회</a>
              </div>`;
}

async function handleSearchSubmit(event) {
  event.preventDefault();
  const input = document.getElementById('search');
  const query = input.value;
  location.href = `/search?keyword=${query}`;
}

async function addLogoutEvent() {
  const logout = document.getElementById('logout');
  if (!logout) {
    return;
  }
  logout.addEventListener('click', () => {
    sessionStorage.clear();
    location.href = '/';
  });
}
