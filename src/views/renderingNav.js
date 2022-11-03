const nav = document.querySelector('#nav');

const renderingNav = () => {
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
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a class="dropdown-item" href="/">전체 상품 보기</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="search-form">
        <form class="d-flex" role="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder="상품명으로 검색"
            aria-label="Search"
            id="search"
          />
          <button class="btn btn-outline-success" type="submit">검색</button>
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
              >장바구니
              <span
                class="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-danger"
                id="cart-notification"
              >
                4
                <span class="visually-hidden">unread messages</span>
              </span></a
            >
          </li>
        </ul>
      </div>`;
};

nav.innerHTML = renderingNav();
