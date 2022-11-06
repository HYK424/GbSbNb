const itemList = document.querySelector('.itemList');
const itemCategory = document.querySelector('.form-select-sm');
const form = document.querySelector('#form');

innerItemCategory(getItems());

async function getItems() {
  const posts = await fetch('/api/products');
  const itemLists = await posts.json();
  return itemLists;
}

async function innerItemCategory(i) {
  //1. 카테고리 만들기
  const obj = await i;
  const setCategory = new Set(
    obj.products.map((e) => {
      return e.category;
    }),
  );

  //카테고리 option 추가
  for (let item of setCategory) {
    itemCategory.insertAdjacentHTML('beforeend', `
    <option value="${item}">${item}</option>
    `);
  }

  for (let i = 0; i < obj.products.length; i++) {
    itemList.insertAdjacentHTML(
      'beforeend',
      `
      <div class="posts" id="posts${i}">
      <a class="a" href="/products/${obj.products[i]._id}">
        <img src=${obj.products[i].imageUrl} alt="">
          <ul>
            <li><span>제품명: ${obj.products[i].title}</span> </li>
            <li>제조사: ${obj.products[i].manufacturer}</li>
            <li><span>가격: <strong>${obj.products[i].price}</strong> 원</span> </li>
            <li>수정 날짜: ${obj.products[i].createdAt}</li>
            </a>
            <button class="btn btn-outline-danger" id="itemDelete${i}">삭제</button>
            <a href="/admin/products/${obj.products[i]._id}"><button class="btn btn-outline-danger" id="itemUpdate${i}">수정</button>
            </a>
            <button class="btn btn-outline-light" id="itemMain${i}">대표 상품 등록</button>
            </ul>
      </div>
`,
    );
    deleteItem(obj.products[i], i);
  }

  //3. 이후 카테고리 선택마다 렌더링
  select.addEventListener('change', async (event) => {
    event.preventDefault();
    const select = document.querySelector('#select');
    const selectItem = select.options[select.selectedIndex].value;

    itemList.innerHTML = '';

    if (selectItem == 'full') {
      for (let i = 0; i < obj.products.length; i++) {
        itemList.insertAdjacentHTML(
          'beforeend',
          `
            <div class="posts" id="posts${i}">
            <a class="a" href="/products/${obj.products[i]._id}">
              <img src=${obj.products[i].imageUrl} alt="">
                <ul>
                  <li><span>제품명: ${obj.products[i].title}</span> </li>
                  <li>제조사: ${obj.products[i].manufacturer}</li>
                  <li><span>가격: <strong>${obj.products[i].price}</strong> 원</span> </li>
                  <li>수정 날짜: ${obj.products[i].createdAt}</li>
                  </a>
                  <button class="btn btn-outline-danger" id="itemDelete${i}">삭제</button>
                  <a href="/admin/products/${obj.products[i]._id}"><button class="btn btn-outline-danger" id="itemUpdate${i}">수정</button>
                  </a>
                  <button class="btn btn-outline-light" id="itemMain${i}">대표 상품 등록</button>
                  </ul>
            </div>
      `,
        );
        deleteItem(obj.products[i], i);
      }
    } else {
      //상품 조회(카테고리)에서 실행
      const categoryItems = await fetch(`/api/categories/${selectItem}`);
      const objItem = await categoryItems.json();

      for (let i = 0; i < objItem.products.length; i++) {
        itemList.insertAdjacentHTML(
          'beforeend',
          `
            <div class="posts" id="posts${i}">
            <a class="a" href="/products/${objItem.products[i]._id}">
              <img src=${objItem.products[i].imageUrl} alt="">
                <ul>
                  <li><span>제품명: ${objItem.products[i].title}</span> </li>
                  <li>제조사: ${objItem.products[i].manufacturer}</li>
                  <li><span>가격: <strong>${objItem.products[i].price}</strong> 원</span> </li>
                  <li>수정 날짜: ${objItem.products[i].createdAt}</li>
                  </a>
                  <button class="btn btn-outline-danger" id="itemDelete${i}">삭제</button>
                  <a href="/admin/products/${objItem.products[i]._id}"><button class="btn btn-outline-danger" id="itemUpdate${i}">수정</button>
                  </a>
                  <button class="btn btn-outline-light" id="itemMain${i}">대표 상품 등록</button>
                  </ul>
            </div>
      `,
        );
        deleteItem(objItem.products[i], i);
      }
    }
  });
}

function deleteItem(obj, i) {
  const btn = document.querySelector(`#itemDelete${i}`);
  const div = document.querySelector(`#posts${i}`);
  btn.addEventListener('click', async () => {
    div.remove();
    await fetch(`http://localhost:3000/api/products/${obj._id}`, {
      method: 'PUT',
      body: JSON.stringify({ delete: 'yes' }),
      headers: { 'Content-Type': 'application/json' },
    });
  });
}

function goPost() {
  const login = '/admin/post';
  location.href = login;
}
