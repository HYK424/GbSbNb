const itemList = document.querySelector('.itemList');
const itemCategory = document.querySelector('.form-select-sm');
const form = document.querySelector('#form');
const select = document.getElementById('select');



setCategory();
setItemList();
allEvents();


function allEvents() {
  select.addEventListener('change', handleSelect);
}


async function setCategory() {
  //카테고리 가져오기
  const setCategory = await (await fetch('/api/categories')).json();
  //카테고리에 option 추가
  itemCategory.insertAdjacentHTML('beforeend', setCategory.map((item) => {
    return `
    <option value="${item.name}">${item.name}</option>
    `
  }).join(''));
}



function productsTemplate(obj) {
  itemList.innerHTML = obj.map((products, i) => {
    return `
  <div class="posts" id="posts${i}">
  <a class="a" href="/products/${products._id}">
    <img src=${products.imageUrl} alt="">
      <ul>
        <li><span>제품명: ${products.title}</span> </li>
        <li>제조사: ${products.manufacturer}</li>
        <li><span>가격: <strong>${products.price}</strong> 원</span> </li>
        <li>수정 날짜: ${products.createdAt}</li>
        </a>
        <button type="button" class="btn ${products.view ? 'btn-outline-primary' : 'btn-outline-secondary'} vtn" id="${products._id}">
        ${products.view ? '공개' : '비공개'} </button>
       
        <a href="/admin/products/${products._id}"><button class="btn btn-outline-danger" id="itemUpdate${i}">수정</button>
        </a>
        <button class="btn btn-outline-light" id="itemMain${i}">대표 상품 등록</button>
        </ul>
  </div>
`
  }).join('');
  const vtn = document.querySelectorAll('.vtn');
  for (const btn of vtn) {
    btn.addEventListener('click', changeView); 
  }
}

async function setItemList() {
  const obj = (await (await fetch('/api/products/admin')).json()).products;
  //최초 1회 전체 상품 노출
  productsTemplate(obj)
}

async function handleSelect(event) {
  event.preventDefault();
  const selectItem = document.getElementById('select').options[select.selectedIndex].value;
  if (selectItem == 'all') {
    const obj = (await (await fetch('/api/products/admin')).json()).products;
    productsTemplate(obj)
  } else {
    const obj = (await (await fetch(`/api/products/admin?q=${selectItem}`)).json()).products;
    productsTemplate(obj)
  }
}

 async function changeView(event) {

  const viewId = event.target.id;
  const btn = document.getElementById(`${viewId}`);
  
  
  //요청을 보내면 버튼을 공개-비공개로 바뀌어야 함
  // console.log(btn.classList[1]);
  if(btn.classList[1] == 'btn-outline-primary'){
    btn.classList.replace('btn-outline-primary','btn-outline-secondary');
    btn.innerText='비공개';
    await fetch(`/api/products/${viewId}`, {
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        view: false
      })
    });
  }
  else{
    btn.classList.replace('btn-outline-secondary','btn-outline-primary');
    btn.innerText='공개';
    await fetch(`/api/products/${viewId}`, {
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        view: true
      })
    });
  }
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