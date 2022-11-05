const hostTitle = document.querySelector('title');
const favicon = document.createElement('link');
const nav = document.querySelector('#nav');
const footer = document.querySelector('#footer');

const cartItems = JSON.parse(localStorage.getItem('cart'));
const cartItemsTotalCount = cartItems?.length;

async function main() {
  setHeader();
  nav.innerHTML = renderNav();
  footer.innerHTML = renderFooter();
  const searchForm = document.querySelector('#searchForm');
  searchForm.addEventListener('submit', handleSearchSubmit);
  handleGetCategories();
}

function setHeader() {
  hostTitle.innerText = '개발세발네발';
  favicon.rel = 'icon';
  favicon.type = 'image/png';
  favicon.sizes = '16x16';
  favicon.href = '/public/img/favicon.png';
  document.head.appendChild(favicon);
}

function renderNav() {
  return `<div class="d-flex ms-5">
        <a class="navbar-brand ms-3" href="/">개발세발네발🐶</a>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">홈으로</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              카테고리별
            </a>
            <ul class="dropdown-menu" id="categoryFilter">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider" /></li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="search-form">
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
      <div class="me-5">
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
          </li>
        </ul>
      </div>`;
}

function renderFooter() {
  return `<div class="w-100 d-flex justify-content-center align-items-center">
        <a class="mx-5 btn btn-dark opacity-75">회사소개</a>
        <a class="mx-5 btn btn-dark opacity-75">공지사항</a>
        <a class="mx-5 btn btn-dark opacity-75">입점 / 제휴문의</a>
        <a class="mx-5 btn btn-dark opacity-75">고객의 소리</a>
      </div>`;
}

async function handleSearchSubmit(event) {
  event.preventDefault();
  const input = document.querySelector('#search');
  const query = input.value;
  const res = await fetch(`/api/products/?q=${query}`, {
    method: 'GET',
  });
  console.log(await res.json());
  input.value = '';
}

async function handleGetCategories() {
  const res = await fetch(`/api/categories`, {
    method: 'GET',
  });
  const categories = await res.json();

  categories.forEach((category) => {
    console.log(category);
  });
  // <li>
  //   <a class="dropdown-item" href="#">
  //     Action
  //   </a>
  // </li>;
}

main();
