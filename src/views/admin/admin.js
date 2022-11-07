const itemList = document.querySelector('.itemList');
const itemCategory = document.querySelector('.form-select-sm');
const form = document.querySelector('#form');

innerItemCategory();

async function innerItemCategory(i) {
  //상품들 가져오기
  const obj = await (await fetch('/api/products')).json();
  //카테고리 가져오기
  const setCategory = await (await fetch('/api/categories')).json();

   //카테고리에 option 추가
  itemCategory.innerHTML=setCategory.map((item)=>{
    return `
    <option value="${item.name}">${item.name}</option>
    `
  }).join('');

  console.log(setCategory.map((item)=>{
    return `
    <option value="${item.name}">${item.name}</option>
    `
  }).join(''));
debugger
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

  //3. 카테고리 선택마다 렌더링
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
