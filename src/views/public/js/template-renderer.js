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
}

function renderNav() {
  nav.innerHTML = getNaveHTML();
}

function getNaveHTML() {
  return `<div class="d-flex">
  <a class="navbar-brand me-5" href="/">개발세발네발🐶</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <div class="dropdown me-5">
      <button class="btn btn-secondary dropdown-toggle me-5 ms-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      카테고리별
      </button>
      <ul class="dropdown-menu" id="categoryFilter">
      </ul>
      </div>
      <div class="search-form me-5">
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
            <div class="ms-5">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-5">
            <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/login"
            >로그인</a
            >
            </li>
            <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/register"
            >회원가입</a
            >
            </li>
            <li class="nav-item">
            <a
            class="nav-link active position-relative"
            aria-current="page"
            href="/cart"
            id="cartNotification"
            >장바구니
            ${
              cartItemsTotalCount &&
              `
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
  return `<div class="row"><div class="w-100 d-flex justify-content-center align-items-center">
          <a class="mx-5 btn btn-dark opacity-75">회사소개</a>
                <a class="mx-5 btn btn-dark opacity-75">공지사항</a>
                <a class="mx-5 btn btn-dark opacity-75">입점 / 제휴문의</a>
                <a class="mx-5 btn btn-dark opacity-75">고객의 소리</a>
              </div></div>`;
}

async function handleSearchSubmit(event) {
  event.preventDefault();
  const input = document.getElemetById('search');
  const query = input.value;
  location.href = `/search?q=${query}`;
}
