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
  const obj = (await i).products;
  const setCategory = new Set(
    obj.map((e) => {
      return e.category;
    }),
  );

  //카테고리 option 추가
  for (let item of setCategory) {
    itemCategory.insertAdjacentHTML('beforeend', `
    <option value="${item}">${item}</option>
    `);
  }

  obj.forEach((products, i) => {
    console.log(products.title);
    console.log(i);
  });


  obj.forEach((products, i) => {
    itemList.insertAdjacentHTML(
      'beforeend',
      `
      <div class="posts" id="posts${i}">
      <a class="a" href="/products/${products._id}">
        <img src=${products.imageUrl} alt="">
          <ul>
            <li><span>제품명: ${products.title}</span> </li>
            <li>제조사: ${products.manufacturer}</li>
            <li><span>가격: <strong>${products.price}</strong> 원</span> </li>
            <li>수정 날짜: ${products.createdAt}</li>
            </a>
            <button type="button" class="btn btn-outline-primary" id="itemView${i}" > </button>
           
            <a href="/admin/products/${products._id}"><button class="btn btn-outline-danger" id="itemUpdate${i}">수정</button>
            </a>
            <button class="btn btn-outline-light" id="itemMain${i}">대표 상품 등록</button>
            </ul>
      </div>
`,
    );
    if (products.view) {
      document.getElementById(`itemView${i}`).innerText = '공개';
    } else {
      document.getElementById(`itemView${i}`).innerText = '비공개';
      document.getElementById(`itemView${i}`).classList.replace('btn-outline-primary', 'btn-outline-secondary');
    }
    // deleteItem(products, i);
  })

  //3. 이후 카테고리 선택마다 렌더링
  select.addEventListener('change', async (event) => {
    event.preventDefault();

    const selectItem = document.getElementById('select').options[select.selectedIndex].value;

    itemList.innerHTML = '';

    if (selectItem == 'full') {
      obj.forEach((products, i) => {
        itemList.insertAdjacentHTML(
          'beforeend',
          `
            <div class="posts" id="posts${i}">
            <a class="a" href="/products/${products._id}">
              <img src=${products.imageUrl} alt="">
                <ul>
                  <li><span>제품명: ${products.title}</span> </li>
                  <li>제조사: ${products.manufacturer}</li>
                  <li><span>가격: <strong>${products.price}</strong> 원</span> </li>
                  <li>수정 날짜: ${products.createdAt}</li>
                  </a>
                  <button type="button" class="btn btn-outline-primary" id="itemView${i}" > </button>
                 
                  <a href="/admin/products/${products._id}"><button class="btn btn-outline-danger" id="itemUpdate${i}">수정</button>
                  </a>
                  <button class="btn btn-outline-light" id="itemMain${i}">대표 상품 등록</button>
                  </ul>
            </div>
      `,
        );
        if (products.view) {
          document.getElementById(`itemView${i}`).innerText = '공개';
        } else {
          document.getElementById(`itemView${i}`).innerText = '비공개';
          document.getElementById(`itemView${i}`).classList.replace('btn-outline-primary', 'btn-outline-secondary');
        }
        // deleteItem(products, i);
      });
    } else {
      //상품 조회(카테고리)에서 실행
      const objItem = (await (await fetch(`/api/products?q=${selectItem}`)).json()).products;


      objItem.forEach((products, i) => {
        itemList.insertAdjacentHTML(
          'beforeend',
          `
            <div class="posts" id="posts${i}">
            <a class="a" href="/products/${products._id}">
              <img src=${products.imageUrl} alt="">
                <ul>
                  <li><span>제품명: ${products.title}</span> </li>
                  <li>제조사: ${products.manufacturer}</li>
                  <li><span>가격: <strong>${products.price}</strong> 원</span> </li>
                  <li>수정 날짜: ${products.createdAt}</li>
                  </a>
                  <button type="button" class="btn btn-outline-primary" id="itemView${i}" > </button>
                 
                  <a href="/admin/products/${products._id}"><button class="btn btn-outline-danger" id="itemUpdate${i}">수정</button>
                  </a>
                  <button class="btn btn-outline-light" id="itemMain${i}">대표 상품 등록</button>
                  </ul>
            </div>
      `,
        );
        if (products.view) {
          document.getElementById(`itemView${i}`).innerText = '공개';
        } else {
          document.getElementById(`itemView${i}`).innerText = '비공개';
          document.getElementById(`itemView${i}`).classList.replace('btn-outline-primary', 'btn-outline-secondary');
        }
        // deleteItem(products, i);
      })

    }
  });
}


//삭제 기능 막아놓음/ PUT으로 보냄
// <button class="btn btn-outline-danger" id="itemDelete${i}">삭제</button>
//
// function deleteItem(obj, i) {
//   const btn = document.querySelector(`#itemDelete${i}`);
//   const deleteitem = document.querySelector(`#posts${i}`);
//   btn.addEventListener('click', async () => {
// deleteitem.remove();
//     await fetch(`/api/products/${obj._id}`, {
//       method: 'PUT',
//       body: JSON.stringify({ delete: 'yes' }),
//       headers: { 'Content-Type': 'application/json' },
//     });
//   });
// }

function goPost() {
  const login = '/admin/post';
  location.href = login;
}
